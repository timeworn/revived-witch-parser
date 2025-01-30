import { ICEquipItemData } from "src/interfaces/CharacterInterfaces";
import { RWItem } from "./RWItem";
import { RWUtils } from "../utils/RWUtils";
import { RWTexts } from "../utils/RWTexts";

export class RWEquipmentItem extends RWItem {
  handbook: number;
  baseScore: number;
  abilityId: number[];
  equipSuitId: number;

  constructor(equipData: ICEquipItemData) {
    const itemAttr = RWUtils.getItemAttr(equipData.id);

    super(itemAttr);
    this.handbook = equipData.handbook;
    this.baseScore = equipData.baseScore;
    this.equipSuitId = equipData.equipSuitid;
    this.abilityId = equipData.abilityID;
  }

  static getEquipments() {
    return Object.values(RWUtils.getEquipItemData()).map(
      (equipData) => new RWEquipmentItem(equipData),
    );
  }

  getScore() {
    return this.baseScore * 10;
  }

  getEquipSuit() {
    const equipSuit = RWUtils.getEquipSuit(this.equipSuitId);
    return {
      id: this.equipSuitId,
      name: equipSuit?.suitName
        ? RWTexts.getWordEquip(equipSuit.suitName)
        : "None",
    };
  }

  getAttributes() {
    const equipHandbook = RWUtils.getEquipHandbook(this.handbook);

    return this.abilityId.map((id, index) => {
      const name = RWTexts.getWordRole(
        RWUtils.getAttrEffectIdName(id).classnameTextID,
      );

      const stat = equipHandbook.abilityValue[index];
      const baseStat = Math.ceil(stat * equipHandbook.initMagnify);

      return {
        id: id,
        name: name ?? "?",
        baseStat: baseStat,
        growth: stat,
      };
    });
  }

  toString() {
    const attr = [
      `Rating: ${this.getScore()}`,
      `Set: ${this.getEquipSuit().name}`,
    ];

    this.getAttributes().forEach((attribute) => {
      attr.push(`${attribute.name}: ${attribute.baseStat}`);
      attr.push(`Growth: ${Math.ceil(attribute.growth)} (${attribute.growth})`);
    });

    return attr;
  }
}
