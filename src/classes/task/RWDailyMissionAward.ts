import { ICDailyMissionAwardData, ItemAmount } from "../../interfaces/CharacterInterfaces";
import { RWUtils } from "../utils/RWUtils";

export class RWDailyMissionAward {
  id: number;
  points: number;
  reward: ItemAmount[];

  constructor(awardData: ICDailyMissionAwardData) {
    this.id = awardData.id;
    this.points = awardData.id;
    this.reward = RWUtils.createItemAmount(awardData.awardid, awardData.num);
  }

  static getDailyMissionAwards() {
    return Object.values(RWUtils.getDailyMissionAwardData()).map((awardData) => new RWDailyMissionAward(awardData));
  }

  getReward() {
    return RWUtils.createItemWithAmount(this.reward)[0];
  }

  toString() {
    return [] as string[];
  }

  toJson() {
    return {
      id: this.id,
      points: this.points,
      reward: this.getReward(),
    };
  }
}
