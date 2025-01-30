import { ICharacterFavourPresentTypeData } from "src/interfaces/CharacterInterfaces";
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

  toString() {
    return [`+ ${this.favour} Intimacy`, `+ ${this.exfavour} Bonus`];
  }
}
