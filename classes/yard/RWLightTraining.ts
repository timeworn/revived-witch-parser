import {
  ICLightTrainingCourseData,
  ItemAmount,
} from "src/interfaces/CharacterInterfaces";
import { RWUtils } from "../utils/RWUtils";
import { RWTexts } from "../utils/RWTexts";

export class RWLightTraining {
  id: number;
  name: number;
  time: number;
  expGain: number;
  rarity: number;
  itemNeeded: ItemAmount[];

  constructor(courseData: ICLightTrainingCourseData) {
    this.id = courseData.id;
    this.name = courseData.trainingnametxtid;
    this.time = courseData.trainingtime;
    this.expGain = courseData.trainingexpgain;
    this.rarity = courseData.trainingrarity;
    this.itemNeeded = RWUtils.createItemAmount(
      courseData.lightcostitem,
      courseData.lightcostnum,
    );
  }

  static getLightTrainings() {
    return RWUtils.getLightTrainingCourseData().map(
      (courseData: ICLightTrainingCourseData) =>
        new RWLightTraining(courseData),
    );
  }

  getName() {
    return RWTexts.getWordYard(this.name) ?? "?";
  }

  getTrainingCourse() {
    return RWUtils.getLightTrainingCourse(this.id);
  }

  getItemNeeded() {
    return RWUtils.createItemWithAmount(this.itemNeeded)[0];
  }

  toString() {
    return [] as string[];
  }

  timeToString() {
    const minutes = this.time;
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    const secs = Math.floor((minutes * 60) % 60);
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
}
