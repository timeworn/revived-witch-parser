import { getAssetImage } from "src/utils/utils";
import { BaseParser } from "src/utils/BaseParser";
import { AvatarFrame, RawAvatarFrame } from "src/types/avatarFrame.model";
import cHeadPhotoFrameConfigJson from "src/data/headphoto/cheadphotoframeconfig.json";

export class AvatarFrameParser extends BaseParser<RawAvatarFrame, AvatarFrame> {
  static getRaws(): RawAvatarFrame[] {
    return Object.values(cHeadPhotoFrameConfigJson.Data);
  }

  static getRaw(id: number): RawAvatarFrame | undefined {
    const raws = AvatarFrameParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  transform(raw: RawAvatarFrame): AvatarFrame {
    return {
      id: raw.id,
      name: this.localizer.localize(raw.nameTextID.toString()),
      description: this.localizer.localize(raw.descriptionTextID.toString()),
      image: getAssetImage(raw.photoid),
      order: raw.order,
      unlockCondition: raw.unlockcondition !== 0 ? this.localizer.localize(raw.unlockcondition.toString()) : null,
    };
  }
}
