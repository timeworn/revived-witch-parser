import {
  RawItem,
  RawUEItem,
  UEOnlyItem,
  UEItemStat,
  UEItemUpgrade,
  UEItemAttribute,
  UEItemEvolution,
  UEItemSkill,
} from "src/types/item.model";
import { BaseParser } from "src/utils/BaseParser";
import { CharacterParser } from "src/parsers/character";
import { createRewardItems } from "src/utils/utils";
import { AttributeParser } from "src/parsers/attribute";
import { logger } from "src/utils/logger";
import { ItemParser } from "src/parsers/item/item";
import cUniqueEquipCfgJson from "src/data/equip/cuniqueequipcfg.json";
import cSkillShowSoulJson from "src/data/skill/cskillshow_soul.json";

const characterParser = new CharacterParser();
const attributeParser = new AttributeParser();

export class UEItemParser extends BaseParser<RawItem, UEOnlyItem> {
  static getRaws(): RawItem[] {
    const raws: RawItem[] = [];
    Object.values(cUniqueEquipCfgJson.Data).forEach((ue) => {
      const rawItem = ItemParser.getRaw(ue.UniqueEquipid);
      if (rawItem) raws.push(rawItem);
    });
    return raws;
  }

  static getRaw(id: number): RawItem | undefined {
    const raws = UEItemParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  transform(raw: RawItem): UEOnlyItem {
    const rawUEItems: RawUEItem[] = Object.values(cUniqueEquipCfgJson.Data).filter(
      (item) => item.UniqueEquipid === raw.id
    );
    if (!rawUEItems || rawUEItems.length === 0) return {} as UEOnlyItem;

    characterParser.setLocalizer(this.localizer);
    attributeParser.setLocalizer(this.localizer);

    const rawUEItem = rawUEItems[0];
    const character = characterParser.findAndParse((char) => char.uniqueequipid === rawUEItem.UniqueEquipid);
    const evolutionText = this.localizer.localize(rawUEItem.evolutiontext);

    const upgrades: UEItemUpgrade[] = [];
    const stats: UEItemStat[] = [];
    const skills: UEItemSkill[] = [];
    let evolutions: UEItemEvolution = null;

    rawUEItems.forEach((rawUEItem) => {
      upgrades.push({
        id: rawUEItem.id,
        level: rawUEItem.level,
        mana: rawUEItem.mana,
        itemsNeeded: createRewardItems(rawUEItem.itemId, rawUEItem.itemNum),
      });

      const attributes: UEItemAttribute[] = [];

      rawUEItem.attrid.forEach((attributeId, index) => {
        const attributeNum = rawUEItem.attrnum[index];
        const attribute = attributeParser.parse(attributeId);

        if (!attribute) {
          logger.debug(`Attribute with id ${attributeId} not found for unique equipment ${rawUEItem.UniqueEquipid}`);
          return;
        }

        attributes.push({
          id: attributeId,
          name: attribute.name,
          value: attributeNum,
          isDecimal: attribute.isDecimal,
        });
      });

      stats.push({
        level: rawUEItem.level,
        attributes,
      });

      if (rawUEItem.skillid > 0) {
        const skillShowSoul = this.getSkillShowSoul(rawUEItem.skillid);
        skills.push({
          id: rawUEItem.skillid,
          level: rawUEItem.level,
          value: skillShowSoul?.description ?? null,
        });
      }
    });

    if (evolutionText && rawUEItem.evolutionnum.length > 0) {
      evolutions = this.fillDescParameters(evolutionText, rawUEItem.evolutionnum);
    }

    return {
      owner: character?.name ?? null,
      ownerId: character?.id ?? null,
      evolutions,
      noEvolution: this.localizer.localize(rawUEItem.noevolutiontext),
      skills,
      upgrades: upgrades.sort((a, b) => a.level - b.level),
      stats: stats.sort((a, b) => a.level - b.level),
    };
  }

  private fillDescParameters(desc: string, params: string[]): string {
    const splitParams = params.map((p) => p.split(";"));

    return desc.replace(/\$parameter(\d+)\$/g, (_match, p1) => {
      const idx = parseInt(p1, 10) - 1;
      const values = splitParams.map((arr) => (arr.length === 1 ? arr[0] : arr[idx] ?? arr[0]));
      return values.join("/");
    });
  }

  private fillSkillDescParameters(desc: string, params: string[]): string {
    return desc.replace(/\$parameter(\d+)\$/g, (match, p1) => {
      const idx = parseInt(p1, 10) - 1;
      return params[idx] !== undefined ? params[idx] : match;
    });
  }

  private getSkillShowSoul(id: number) {
    const skillShowSoul = cSkillShowSoulJson.Data[id.toString() as keyof typeof cSkillShowSoulJson.Data];
    if (!skillShowSoul) return null;

    const descText = this.localizer.localize(skillShowSoul.exDiscribeTextID);
    const description = descText ? this.fillSkillDescParameters(descText, skillShowSoul.attr) : null;

    return {
      id: id,
      name: this.localizer.localize(skillShowSoul.nameTextID),
      description,
      type: this.localizer.localize(skillShowSoul.typeTextID),
    };
  }
}
