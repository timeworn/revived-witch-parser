import { getAssetImage } from "src/utils/utils";
import { BaseParser } from "src/utils/BaseParser";
import { Avatar, RawAvatar } from "src/types/avatar.model";
import cHeadPhotoConfigJson from "src/data/headphoto/cheadphotoconfig.json";

export class AvatarParser extends BaseParser<RawAvatar, Avatar> {
  static getRaws(): RawAvatar[] {
    return Object.values(cHeadPhotoConfigJson.Data);
  }

  static getRaw(id: number): RawAvatar | undefined {
    const raws = AvatarParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  transform(raw: RawAvatar): Avatar {
    return {
      id: raw.id,
      name: this.localizer.localize(raw.nameTextID),
      description: this.localizer.localize(raw.descriptionTextID),
      image: getAssetImage(raw.photoid),
      order: raw.order,
    };
  }
}
