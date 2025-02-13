import { ICharacterFavourPresentTypeData } from "../../interfaces/CharacterInterfaces";
import { RWItem } from "./RWItem";
import { RWUtils } from "../utils/RWUtils";

export class RWGiftItem extends RWItem {
  favour: number;
  exfavour: number;

  constructor(presentType: ICharacterFavourPresentTypeData) {
    const itemAttr = RWUtils.getItemAttr(presentType.id);
    super(itemAttr);
    this.favour = presentType.favour;
    this.exfavour = presentType.exfavour;
  }

  static getGifts() {
    const gifts: RWGiftItem[] = [];
    Object.values(RWUtils.getFavourPresentTypeData()).forEach((present) => {
      const giftItem = new RWGiftItem(present);
      gifts.push(giftItem);
    });
    return gifts;
  }

  toString() {
    return [`+ ${this.favour} Intimacy`, `+ ${this.exfavour} Bonus`];
  }

  toJson() {
    return {
      ...super.toJson(),
      favour: this.favour,
      exfavour: this.exfavour,
    };
  }
}
