import { ICAchieveBadgeConfigData } from "src/interfaces/CharacterInterfaces";
import { RWUtils } from "../utils/RWUtils";
import { RWTexts } from "../utils/RWTexts";

export class RWBadge {
  id: number;
  name: number;
  description: number;
  icon?: number;

  constructor(badgeData: ICAchieveBadgeConfigData) {
    this.id = badgeData.id;
    this.name = badgeData.nameTextID;
    this.description = badgeData.descriptionTextID;
    this.icon = badgeData.imageID;
  }

  static getBadges() {
    return Object.values(RWUtils.getAchieveBadgeConfigData()).map(
      (badgeData) => new RWBadge(badgeData),
    );
  }

  getName() {
    return RWTexts.getWordTask(this.name) ?? "?";
  }

  getDescription() {
    return RWTexts.getWordTask(this.description) ?? "?";
  }

  getIcon() {
    return RWUtils.getRWAssetImage(this.icon);
  }

  getGroup() {
    return (
      RWTexts.getWordTask(
        RWUtils.getAchieveBadgeGroupData().find((group) =>
          group.badgeIDList.find((badgeId) => badgeId === this.id),
        )?.nameTextID,
      ) ?? "?"
    );
  }

  toString() {
    return [this.getDescription()];
  }
}
