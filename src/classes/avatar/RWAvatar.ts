import { IHeadPhotoConfigData } from "../../interfaces/CharacterInterfaces";
import { RWTexts } from "../utils/RWTexts";
import { RWUtils } from "../utils/RWUtils";

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

  static getAvatars(): RWAvatar[] {
    return RWUtils.getHeadPhotoJson().AllIds.map((id: number) => {
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

  toJson() {
    return {
      id: this.id,
      name: this.getName(),
      description: this.getDescription(),
      icon: this.getIcon(),
    };
  }
}
