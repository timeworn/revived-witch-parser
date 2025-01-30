import { RWItem } from "./RWItem";
import { RWUtils } from "../utils/RWUtils";
import { RWTexts } from "../utils/RWTexts";
import { RWCharacter } from "../character/RWCharacter";

// IGNORE_START
let uniqueEquipments: RWUniqueEquipmentItem[] | null = null;
// IGNORE_END

export class RWUniqueEquipmentItem extends RWItem {
  owner: string;
  effect: string;
  evolution: string;
  attributes: {
    baseStat: number;
    id: number;
    name: string;
    isDecimal: boolean;
  }[];

  constructor(character: RWCharacter) {
    const equipment = character.equipment;
    const itemAttr = RWUtils.getItemAttr(equipment.id as number);
    const equipConfigs = RWUtils.getUniqueEquipConfig(equipment.id as number);
    const maxEquipConfig = equipConfigs[equipConfigs.length - 1];

    super(itemAttr);
    this.owner = character.name as string;
    this.effect = equipment.effect as string;
    this.evolution = equipment.evolution as string;
    this.attributes = [];

    maxEquipConfig.attrid.forEach((id, index) => {
      const attrEffect = RWUtils.getAttrEffectIdName(id);
      const name = RWTexts.getWordRole(attrEffect.classnameTextID);
      const stat = maxEquipConfig.attrnum[index];

      this.attributes.push({
        id: id,
        name: name ?? "?",
        baseStat: stat,
        isDecimal: attrEffect.isDecimal === 1,
      });
    });
  }

  static async getUniqueEquipments() {
    if (!uniqueEquipments) {
      const equipments: RWUniqueEquipmentItem[] = [];
      const characters = RWCharacter.getCharacters();

      for (const character of characters) {
        if (character.equipment.id) {
          // await character.init();
          if (character.unknown === false) {
            equipments.push(new RWUniqueEquipmentItem(character));
          }
        }
      }
      uniqueEquipments = equipments;
    }

    return uniqueEquipments;
  }

  toString() {
    return this.attributes.map((attribute) => {
      const stat = attribute.isDecimal
        ? Math.floor(attribute.baseStat / 10) + "%"
        : attribute.baseStat;
      return `${attribute.name}: ${stat}`;
    });
  }
}
