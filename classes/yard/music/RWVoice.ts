import { RWUtils } from "../../utils/RWUtils";
import { RWAudio } from "./RWAudio";

export class RWVoice {
  voice: RWAudio[];

  constructor() {
    this.voice = Object.values(RWUtils.getEnVoiceSourceData()).map(
      (soundSource) => new RWAudio(soundSource),
    );
  }
}
