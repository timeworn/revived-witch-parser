import { ICAchieveLevelConfigData, ItemAmount } from "../../interfaces/CharacterInterfaces";
import { RWUtils } from "../utils/RWUtils";

export class RWLevelReward {
  id: number;
  level: number;
  points: number;
  reward: ItemAmount[];

  constructor(levelConfig: ICAchieveLevelConfigData) {
    this.id = levelConfig.id;
    this.level = this.id;
    this.points = levelConfig.achievePoint;
    this.reward = RWUtils.createItemAmount(levelConfig.rewardItem, levelConfig.itemNum);
  }

  static getLevelRewards() {
    return RWUtils.getAchieveLevelConfigData().map((levelConfig) => new RWLevelReward(levelConfig));
  }

  getReward() {
    return RWUtils.createItemWithAmount(this.reward)[0];
  }

  toString() {
    return [`Level: ${this.level}`, `${this.points} Points`];
  }

  toJson() {
    return {
      id: this.id,
      level: this.level,
      points: this.points,
      reward: this.getReward(),
    };
  }
}
