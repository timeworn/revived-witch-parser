import { ICFurnitureItemData } from "../../interfaces/CharacterInterfaces";
import { RWItem } from "./RWItem";
import { RWUtils } from "../utils/RWUtils";
import { RWTexts } from "../utils/RWTexts";

export class RWFurnitureItem extends RWItem {
  furnitureType: number;
  level: number;
  cover: string;
  comfortPoint: number;

  constructor(itemData: ICFurnitureItemData) {
    const itemAttr = RWUtils.getItemAttr(itemData.id);

    super(itemAttr);
    this.furnitureType = itemData.type;
    this.level = itemData.level;
    this.cover = itemData.cover;
    this.comfortPoint = itemData.comfortPoint;
    this.attributes = {
      comfortPoint: itemData.comfortPoint,
      cover: itemData.cover,
      level: itemData.level,
    };
  }

  static getFurniture() {
    return Object.values(RWUtils.getFurnitureItemData()).map((itemData) => new RWFurnitureItem(itemData));
  }

  getFurnitureType() {
    const furnitureType = RWUtils.getFurnitureType(this.furnitureType);
    return {
      id: furnitureType.id,
      name: RWTexts.getWordYard(furnitureType.nameTextID) ?? "?",
      icon: RWUtils.getRWAssetImage(furnitureType.imagenorm),
    };
  }

  toString() {
    return [`Size: ${this.attributes.cover}`, `Comfort: ${this.attributes.comfortPoint}`];
  }

  toJson() {
    return {
      ...super.toJson(),
      furnitureType: this.getFurnitureType(),
      level: this.level,
      cover: this.cover,
      comfortPoint: this.comfortPoint,
    };
  }
}
