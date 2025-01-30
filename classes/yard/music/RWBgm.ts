import { RWUtils } from "../../utils/RWUtils";
import { RWAudio } from "./RWAudio";

export class RWBgm {
  bgm: RWAudio[];

  constructor() {
    this.bgm = [];

    Object.values(RWUtils.getSoundSourceData()).forEach((soundSource) => {
      if (soundSource.cueSheet.includes("main:BGM/")) {
        this.bgm.push(new RWAudio(soundSource));
      }
    });
  }
}
