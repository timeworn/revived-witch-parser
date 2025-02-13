import { ICDailyMissonConfigData } from "../../interfaces/CharacterInterfaces";
import { RWUtils } from "../utils/RWUtils";
import { RWTexts } from "../utils/RWTexts";

export class RWDailyMission {
  id: number;
  name: number;
  description: number;
  instruction: number;
  points: number;

  constructor(missionConfig: ICDailyMissonConfigData) {
    this.id = missionConfig.id;
    this.name = missionConfig.missionnameTextID;
    this.description = missionConfig.descriptionTextID;
    this.instruction = missionConfig.instructionTextID;
    this.points = missionConfig.activevalue;
  }

  static getDailyMissions() {
    return Object.values(RWUtils.getDailyMissionConfigData()).map((missionConfig) => new RWDailyMission(missionConfig));
  }

  getName() {
    return RWTexts.getWordTask(this.name) ?? "?";
  }

  getDescription() {
    return RWTexts.getWordTask(this.description) ?? "?";
  }

  getInstruction() {
    return RWTexts.getWordTask(this.instruction) ?? "?";
  }

  toString() {
    return [this.getDescription(), `+${this.points} Points`] as string[];
  }

  toJson() {
    return {
      id: this.id,
      name: this.getName(),
      description: this.getDescription(),
      instruction: this.getInstruction(),
      points: this.points,
    };
  }
}
