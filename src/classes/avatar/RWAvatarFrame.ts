import { RWUtils } from "../utils/RWUtils";
import { RWTexts } from "../utils/RWTexts";

export class RWAvatarFrame {
  id: number;
  name: number;
  description: number;
  icon: number;

  constructor(id: number) {
    const frameConfig = RWUtils.getHeadPhotoFrameConfig(id);
    this.id = frameConfig.id;
    this.name = frameConfig.nameTextID;
    this.description = frameConfig.descriptionTextID;
    this.icon = frameConfig.photoid;
  }

  static getAvatarFrames(): RWAvatarFrame[] {
    return RWUtils.getHeadPhotoFrameJson().AllIds.map((id: number) => {
      return new RWAvatarFrame(id);
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
