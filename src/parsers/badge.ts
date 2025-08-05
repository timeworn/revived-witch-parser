import { Badge, RawBadge } from "src/types/badge.model";
import { BaseParser } from "src/utils/BaseParser";
import { getAssetImage } from "src/utils/utils";
import cAchieveMissionConfig from "src/data/mission/cachievebadgeconfig.json";
import cAchieveBadgeGroup from "src/data/mission/cachievebadgegroup.json";

export class BadgeParser extends BaseParser<RawBadge, Badge> {
  static getRaws(): RawBadge[] {
    return Object.values(cAchieveMissionConfig.Data);
  }

  static getRaw(id: number): RawBadge | undefined {
    const raws = BadgeParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  transform(raw: RawBadge): Badge {
    return {
      id: raw.id,
      name: this.localizer.localize(raw.nameTextID.toString()),
      description: this.localizer.localize(raw.descriptionTextID.toString()),
      group: this.getGroup(raw),
      image: getAssetImage(raw.imageID),
      colorId: raw.colorID,
    };
  }

  private getGroup(raw: RawBadge) {
    const group = cAchieveBadgeGroup.Data.find((group) => group.badgeIDList.includes(raw.id));
    if (!group) return null;
    return this.localizer.localize(group.nameTextID.toString());
  }
}
