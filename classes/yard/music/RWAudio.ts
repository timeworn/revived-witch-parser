import { getImageUrl } from "src/hooks/getImage";
import { ICSoundSourceData } from "src/interfaces/CharacterInterfaces";

const RW_AUDIO = "rw/audio/GLOBAL";

export class RWAudio {
  id: number;
  cueName: string;
  cueSheet: string;
  volume: number;
  required: number;

  constructor(soundSource: ICSoundSourceData) {
    this.id = soundSource.id;
    this.cueName = soundSource.cueName;
    this.cueSheet = soundSource.cueSheet;
    this.volume = soundSource.volume;
    this.required = soundSource.required;
  }

  getName() {
    return this.cueName;
  }

  getUrl() {
    const soundFolder = this.cueSheet.split(":")[1];
    const soundName = this.cueName;
    return getImageUrl(`${RW_AUDIO}/${soundFolder}/${soundName}.ogg`);
  }
}
