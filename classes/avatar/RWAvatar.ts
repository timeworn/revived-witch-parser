import { RWUtils } from "../utils/RWUtils";
import { RWTexts } from "../utils/RWTexts";
import { IHeadPhotoConfigData } from "src/interfaces/CharacterInterfaces";

export class RWAvatar {
  id: number;
  name?: number;
  description: number;
  icon: number;

  constructor(id: number) {
    const photoConfig = RWUtils.getHeadPhotoConfig(id) as IHeadPhotoConfigData;
    this.id = photoConfig.id;
    this.name = photoConfig.nameTextID;
    this.description = photoConfig.descriptionTextID;
    this.icon = photoConfig.photoid;
  }

  static getAvatars() {
    return RWUtils.getHeadPhotoJson().AllIds.map((id) => {
      return new RWAvatar(id);
    });
  }

  getName() {
    return RWTexts.getWordHead(this.name);
  }

  getDescription() {
    return RWTexts.getWordHead(this.description);
  }

  getIcon() {
    return RWUtils.getRWAssetImage(this.icon);
  }
}
