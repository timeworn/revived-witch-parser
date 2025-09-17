import { BaseParser } from "src/utils/BaseParser";
import { Item, RawItem } from "src/types/item.model";
import cItemAttrJson from "src/data/item/citemattr.json";
import cItemClassToLoadJson from "src/data/item/citemclasstoload.json";
import { createRewardItems, getAssetImage } from "src/utils/utils";
import { UEItemParser } from "src/parsers/item/ueItem";

const ueItemParser = new UEItemParser();

/*
  For reference:
  18 - Main Story Stage Item
  19 - Quest Item
  26 / 42 / 138 - Normal Item
  27 - Doll
  58 - Avatar Frame
  74 - Furniture
  75 - Intimacy Item
  90 - Magic Quartz
  91 - Costume
  106 - undefined (cn: emoticons)
  107 - Unique Equipment
  122 - Avatar
  170 - Pack
  273 / 289 / 305 / 545 / 801 / 817 / 1057 / 1073 / 1329 - Currency
  299 - Weapon
  315 - Skill
  555 - Accessory
  561 - Dream Shard
  811 - Armor
*/

const typeToParser = {
  18: null,
  19: null,
  26: null,
  42: null,
  138: null,
  27: null,
  58: null,
  74: null,
  75: null,
  90: null,
  91: null,
  106: null,
  107: ueItemParser,
  122: null,
  170: null,
  273: null,
  289: null,
  305: null,
  545: null,
  801: null,
  817: null,
  1057: null,
  1073: null,
  1329: null,
  299: null,
  315: null,
  555: null,
  561: null,
  811: null,
};

export class ItemParser extends BaseParser<RawItem, Item> {
  static getRaws(): RawItem[] {
    return Object.values(cItemAttrJson.Data).filter((item) => item.itemtypeid === 107);
  }

  static getRaw(id: number): RawItem | undefined {
    const raws = ItemParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  transform(raw: RawItem): Item {
    let item = {
      id: raw.id,
      name: this.localizer.localize(raw.nameTextID),
      description: this.localizer.localize(raw.destribeTextID),
      icon: getAssetImage(raw.icon),
      type: this.getType(raw),
      typeId: raw.itemtypeid,
      maxNum: raw.maxNum,
      limited: raw.timeLimited === 1,
      discardRewards: createRewardItems(raw.resolvegetitem, raw.resolvegetitemnum),
    };

    const extraParser = typeToParser[raw.itemtypeid as unknown as keyof typeof typeToParser];
    if (extraParser) {
      extraParser.setLocalizer(this.localizer);
      const extraData = extraParser.transform(raw);
      item = { ...item, ...extraData };
    }

    return item;
  }

  private getType(raw: RawItem): string | null {
    const itemClass = cItemClassToLoadJson.Data[raw.itemtypeid as unknown as keyof typeof cItemClassToLoadJson.Data];
    if (!itemClass) return null;
    return this.localizer.localize(itemClass.nameTextID.toString());
  }
}
