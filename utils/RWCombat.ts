import {
  ICharacterAttrEffectIdNameData,
  ICharacterEvolutionData,
  ICharacterSkill,
  ICharacterSkillData,
  ICharacterSkillShowRoleData,
  ICharacterSkillShowSoulData,
  ICharacterSpecialEquip,
  ICharacterSpecialEquipData,
  ICharacterStats,
  ItemData,
} from "src/interfaces/CharacterInterfaces";
import { RWCUtils } from "./RWUtils";
import { RWCTexts } from "./RWTexts";
import cSkillShowRoleJson from "src/data/characters/skill/cskillshow_role.json";
import characterSkillJson from "src/data/characters/skill/cskill.json";
import cItemAttr from "src/data/characters/item/citemattr.json";
import cUniqueEquipConfig from "src/data/characters/equip/cuniqueequipcfg.json";
import cSkillShowSoulJson from "src/data/characters/skill/cskillshow_soul.json";
import { getImageUrl } from "src/hooks/getImage";
import cRoleEvolutionConfig from "src/data/characters/role/croleevolutioncfg.json";
import cAttrEffectIdNameJson from "src/data/characters/role/cattreffectidname.json";

const STATS = ["hp", "attack", "atkspeed", "def", "magicDef", "speed"];
const STATS_ICON = {
  hp: 10150,
  attack: 10153,
  magicAttack: 10151,
  def: 10154,
  magicDef: 10152,
};

const itemAttrData: { [key: string]: ItemData } = cItemAttr.Data;
const skillShowRoleData: {
  [key: string]: ICharacterSkillShowRoleData | undefined;
} = cSkillShowRoleJson.Data;
const skillShowSoulData: {
  [key: string]: ICharacterSkillShowSoulData | undefined;
} = cSkillShowSoulJson.Data;
const skillData: { [key: string]: ICharacterSkillData | undefined } =
  characterSkillJson.Data;
const equipConfigData: {
  [key: string]: ICharacterSpecialEquipData | undefined;
} = cUniqueEquipConfig.Data;
const roleEvolutionConfigData: { [key: string]: ICharacterEvolutionData } =
  cRoleEvolutionConfig.Data;
const attrEffectIdNameData: { [key: string]: ICharacterAttrEffectIdNameData } =
  cAttrEffectIdNameJson.Data;

const getSkillAttributes = (
  skillId: number,
  skillShowData: any,
  changeIndex: number,
  max?: number,
) => {
  let skillAttributes: string[][] = [];
  for (let i = 0; i < skillShowData[skillId + 1].attr.length; i++) {
    skillAttributes[i] = [];
  }

  let index = 1;
  while (true) {
    const newSkillId = skillId + index;
    const skillIdStr = skillId.toString();
    const newSkillIdStr = newSkillId.toString();

    if (
      skillIdStr.substring(0, changeIndex + 1) !==
        newSkillIdStr.substring(0, changeIndex + 1) ||
      (max && index > max)
    ) {
      return skillAttributes;
    }

    const attributes = skillShowData[newSkillId]?.attr;
    if (attributes) {
      attributes.forEach((element: string, parameterIndex: number) => {
        skillAttributes[parameterIndex].push(element);
      });
    }

    index++;
  }
};

const replaceDescriptionParameters = (
  description: string,
  skillAttributes: string[][],
) => {
  if (!description) return description;

  const usageCounts = new Array(skillAttributes.length).fill(0);

  for (let i = 0; i < skillAttributes.length; i++) {
    const colorRegex = new RegExp(
      `(<color=#[0-9A-Fa-f]{6}>)?\\$parameter${i + 1}\\$?(</color>)?`,
      "g",
    );

    description = description.replace(colorRegex, (_, startColor, endColor) => {
      const usageIndex = usageCounts[i]++;
      const partsForThisParam = skillAttributes[i].map((item) => {
        const splitItem = item.split(";");
        return splitItem[usageIndex] ?? splitItem[splitItem.length - 1];
      });

      const joinedParts = partsForThisParam.join("/");
      if (startColor) {
        return `${startColor}${joinedParts}${endColor || ""}`;
      }
      return `<color=#82C65D>${joinedParts}</color>`;
    });
  }

  return description;
};

export namespace RWCCombat {
  export const getSkills = (id: number) => {
    const characterConfig = RWCUtils.getConfig(id);
    if (!characterConfig) return [];

    const skillIds = [
      characterConfig.contractskillid,
      characterConfig.contractskillid2,
    ];

    let skills = skillIds.map((skillId) => {
      skillId = skillId * 100;

      const characterSkillShow = skillShowRoleData[skillId + 1];
      const characterSkill = skillData[skillId + 1];
      if (!characterSkillShow) return [];

      let description =
        RWCTexts.getWordSkill(characterSkillShow.exDiscribeTextID) ?? "";

      const skillAttributes = getSkillAttributes(skillId, skillShowRoleData, 4);
      description = replaceDescriptionParameters(description, skillAttributes);

      const skill: ICharacterSkill = {
        id: skillId,
        name: RWCTexts.getWordSkill(characterSkillShow.nameTextID),
        icon: RWCUtils.getRWAssetImage(characterSkill?.icon),
        description: description,
      };

      return skill;
    });

    const passiveSkillId = characterConfig.contractskillid3 - 1;
    const characterSkillShow = skillShowSoulData[passiveSkillId + 1];
    if (!characterSkillShow) return skills as ICharacterSkill[];

    let description =
      RWCTexts.getWordSkill(characterSkillShow.exDiscribeTextID) ?? "";

    let skillAttributes: string[][] = [];

    if (characterSkillShow.attr.length === 0) {
      const regex = /<color=#[0-9A-Fa-f]{6}>([^<]+)<\/color>/g;

      for (let index = 1; index <= 2; index++) {
        const characterSkillShow = skillShowSoulData[passiveSkillId + index];
        let description = characterSkillShow
          ? (RWCTexts.getWordSkill(characterSkillShow.exDiscribeTextID) ?? "")
          : "";

        let match;
        while ((match = regex.exec(description)) !== null) {
          const [_, parameter] = match;
          const parameterValue = parameter.replace("%", "");
          skillAttributes.push([parameterValue]);
        }
      }

      for (let i = 0; i < skillAttributes.length; i++) {
        const regex = new RegExp(
          `<color=#[0-9A-Fa-f]{6}>${skillAttributes[i][0]}%?</color>`,
          "g",
        );
        const replacement = skillAttributes.map((attr) => `${attr}`).join("/");
        description = description.replace(
          regex,
          `<color=#82C65D>${replacement}</color>`,
        );
      }
    } else {
      skillAttributes = getSkillAttributes(
        passiveSkillId,
        skillShowSoulData,
        3,
      );
    }

    description = replaceDescriptionParameters(description, skillAttributes);

    const passiveSkill: ICharacterSkill = {
      id: passiveSkillId,
      name: RWCTexts.getWordSkill(characterSkillShow.nameTextID),
      icon: getImageUrl(
        "rw/assets/GLOBAL/ui/imagesets/CharDetailPassiveSkill0.png",
      ),
      description: description,
    };

    skills.push(passiveSkill);

    return skills as ICharacterSkill[];
  };

  export const getEquipment = (id: number) => {
    const characterConfig = RWCUtils.getConfig(id);
    if (!characterConfig) return [];

    const item = itemAttrData[characterConfig.uniqueequipid];
    const skillId = id * 100 + 300000;
    const skillShowSoul = skillShowSoulData[skillId + 1];
    if (!item) return [];

    const skillAttributes = getSkillAttributes(
      skillId,
      skillShowSoulData,
      3,
      6,
    );
    const effectText = RWCTexts.getWordSkill(
      skillShowSoul?.exDiscribeTextID ?? -1,
    );
    const effect = effectText
      ? replaceDescriptionParameters(effectText, skillAttributes)
      : undefined;

    const uniqueEquip = getUniqueEquipConfig(id);
    let evolution = undefined;

    if (uniqueEquip) {
      const evolutionText = RWCTexts.getWordEquip(uniqueEquip.evolutiontext);
      evolution = evolutionText
        ? replaceDescriptionParameters(evolutionText, [
            uniqueEquip.evolutionnum,
          ])
        : undefined;
    }

    const equipment: ICharacterSpecialEquip = {
      id: item.id,
      icon: RWCUtils.getRWAssetImage(item.icon),
      name: RWCTexts.getWordItem(item.nameTextID),
      description: RWCTexts.getWordItem(item.destribeTextID),
      effect: effect,
      evolution: evolution,
    };

    return equipment;
  };

  export const getUniqueEquipConfig = (id: number) => {
    const characterConfig = RWCUtils.getConfig(id);
    if (!characterConfig) return undefined;

    const uniqueEquipId = characterConfig.uniqueequipid;
    const uniqueEquip = Object.values(equipConfigData).find(
      (equip) => equip && equip.UniqueEquipid === uniqueEquipId,
    );
    return uniqueEquip;
  };

  export const getStat = (id: number) => {
    const characterStats: ICharacterStats = {
      list: [],
      evolutions: [],
    };
    const characterConfig = RWCUtils.getConfig(id);
    if (!characterConfig) return characterStats;

    STATS.forEach((stat) => {
      const baseValue = characterConfig[
        stat as keyof typeof characterConfig
      ] as number;
      const addValue = characterConfig[
        `add${stat}` as keyof typeof characterConfig
      ] as number;

      let statIcon = STATS_ICON[stat as keyof typeof STATS_ICON];
      if (characterConfig.damagetype === 1 && stat === "attack") {
        statIcon = STATS_ICON["magicAttack"];
      }

      characterStats.list.push({
        icon: RWCUtils.getRWAssetImage(statIcon),
        name: stat,
        baseValue: baseValue,
        addValue: addValue,
      });
    });

    for (let level = 1; level <= characterConfig.evolutionLimit; level++) {
      const evolutionData = Object.values(roleEvolutionConfigData).find(
        (data) =>
          data &&
          data.evolutionType === characterConfig.evolutionType &&
          data.evolutionLevel === level,
      );
      if (!evolutionData) continue;

      let attrEffect: ICharacterAttrEffectIdNameData;
      if (evolutionData.addProperty === 31) {
        if (characterConfig.damagetype === 1) {
          attrEffect = attrEffectIdNameData[evolutionData.addProperty - 1];
        } else {
          attrEffect = attrEffectIdNameData[evolutionData.addProperty + 9];
        }
      } else {
        attrEffect = attrEffectIdNameData[evolutionData.addProperty - 1];
      }

      characterStats.evolutions.push({
        level: level,
        icon: RWCUtils.getRWAssetImage(attrEffect.classIcon),
        name: attrEffect.attrname,
        addValue: evolutionData.addPropertyValue,
      });
    }

    return characterStats;
  };
}
