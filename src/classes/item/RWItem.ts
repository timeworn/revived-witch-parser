import { ItemData } from "../../interfaces/CharacterInterfaces";
import { RWUtils } from "../utils/RWUtils";
import { RWTexts } from "../utils/RWTexts";

export class RWItem {
  id: number;
  name: number;
  description: number;
  icon?: number;
  attributes: { [key: string]: any };
  type: number;
  private static itemCache: Map<number, RWItem> = new Map<number, RWItem>();

  constructor(itemData: ItemData) {
    this.id = itemData.id;
    this.name = itemData.nameTextID;
    this.description = itemData.destribeTextID;
    this.icon = itemData.icon;
    this.type = itemData.itemtypeid;
    this.attributes = {};
  }

  static getCachedItem(itemId: number) {
    if (!RWItem.itemCache.has(itemId)) {
      const item = new RWItem(RWUtils.getItemAttr(itemId));
      RWItem.itemCache.set(itemId, item);
    }
    return RWItem.itemCache.get(itemId)!;
  }

  getName() {
    return RWTexts.getWordItem(this.name) ?? "?";
  }

  getDescription() {
    return RWTexts.getWordItem(this.description) ?? "?";
  }

  getIcon() {
    return RWUtils.getRWAssetImage(this.icon);
  }

  getType() {
    return RWTexts.getWordItem(RWUtils.getItemClassToLoad(this.type).nameTextID) ?? "?";
  }

  toString() {
    return [] as string[];
  }

  toJson() {
    return {
      id: this.id,
      name: this.getName(),
      description: this.getDescription(),
      icon: this.getIcon(),
      type: this.getType(),
    };
  }
}
