import cAttrEffectIdNameJson from "src/data/role/cattreffectidname.json";
import { Attribute, RawAttribute } from "src/types/attribute.model";
import { BaseParser } from "src/utils/BaseParser";
import { getAssetImage } from "src/utils/utils";

export class AttributeParser extends BaseParser<RawAttribute, Attribute> {
  static getRaws() {
    return Object.values(cAttrEffectIdNameJson.Data);
  }

  static getRaw(id: number) {
    const raws = AttributeParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  transform(raw: RawAttribute): Attribute {
    return {
      id: raw.id,
      name: this.localizer.localize(raw.classnameTextID),
      growthName: this.localizer.localize(raw.classgrowthnameTextID),
      icon: getAssetImage(raw.classIcon),
      isDecimal: raw.isDecimal === 1,
      initialValue: raw.initValue,
      attrName: this.localizer.localize(raw.attrname),
      basicAttr: this.localizer.localize(raw.basicattr),
      ablEffectId: raw.ablEffctId,
      ablEffectName: this.localizer.localize(raw.ablEffctName),
      ablLimit: raw.ablLimit,
      pctEffectId: raw.ablEffctId,
      pctEffectName: this.localizer.localize(raw.pctEffctName),
      pctLimit: raw.pctLimit,
    };
  }
}
