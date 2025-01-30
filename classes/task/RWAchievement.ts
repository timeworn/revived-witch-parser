import {
  ICAchieveMissionConfigData,
  ItemAmount,
} from "src/interfaces/CharacterInterfaces";
import { RWUtils } from "../utils/RWUtils";
import { RWTexts } from "../utils/RWTexts";

const ACHIEVEMENT_TABS: readonly string[] = [
  "Progress",
  "Bond",
  "Growth",
  "Social",
];

export class RWAchievement {
  id: number;
  name: number;
  description: number;
  group: number;
  points: number;
  rewards: ItemAmount[];

  constructor(achievementData: ICAchieveMissionConfigData) {
    this.id = achievementData.badgeID;
    this.name = achievementData.missionnameTextID;
    this.description = achievementData.descriptionTextID;
    this.group = achievementData.tabID;
    this.points = achievementData.achievePoint;
    this.rewards = achievementData.rewarditem.map((itemId, index) => ({
      itemId: itemId,
      amount: achievementData.rewardquantity[index],
    }));
  }

  static getAchievements() {
    return Object.values(RWUtils.getAchieveMissionConfigData()).map(
      (achievementData) => new RWAchievement(achievementData),
    );
  }

  static getGroups() {
    return ACHIEVEMENT_TABS;
  }

  getName() {
    return RWTexts.getWordTask(this.name) ?? "?";
  }

  getDescription() {
    return RWTexts.getWordTask(this.description) ?? "?";
  }

  getRewards() {
    return RWUtils.createItemWithAmount(this.rewards);
  }

  getGroup() {
    return ACHIEVEMENT_TABS[this.group - 1];
  }

  toString() {
    return [this.getDescription(), `+${this.points} Points`] as string[];
  }
}
