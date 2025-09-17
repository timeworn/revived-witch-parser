import { Achievement, RawAchievement } from "src/types/achievement.model";
import { BaseParser } from "src/utils/BaseParser";
import { createRewardItems } from "src/utils/utils";
import cAchieveMissionConfig from "src/data/mission/cachievemissionconfig.json";

export class AchievementParser extends BaseParser<RawAchievement, Achievement> {
  static getRaws(): RawAchievement[] {
    return Object.values(cAchieveMissionConfig.Data);
  }

  static getRaw(id: number): RawAchievement | undefined {
    const raws = AchievementParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  transform(raw: RawAchievement): Achievement {
    return {
      id: raw.id,
      name: this.localizer.localize(raw.missionnameTextID),
      description: this.localizer.localize(raw.descriptionTextID),
      missionType: raw.missiontype, // not sure how to localize this cmissiontypeconfig.json
      tabId: raw.tabID,
      groupId: raw.groupID,
      badgeId: raw.badgeID,
      points: raw.achievePoint,
      rewards: createRewardItems(raw.rewarditem, raw.rewardquantity),
      unlockAfter: this.localizer.localize(raw.unlockid),
    };
  }
}
