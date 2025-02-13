import { RWUtils } from "../../utils/RWUtils";
import { RWAudio } from "./RWAudio";

export class RWSoundEffects {
  se: RWAudio[];

  constructor() {
    this.se = [];

    Object.values(RWUtils.getSoundSourceData()).forEach((soundSource) => {
      if (soundSource.cueSheet.includes("main:SE/")) {
        this.se.push(new RWAudio(soundSource));
      }
    });
  }

  toJson() {
    return this.se.map((se) => se.toJson());
  }
}
