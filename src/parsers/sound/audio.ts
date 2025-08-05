import { BaseParser } from "src/utils/BaseParser";
import { Audio, RawAudio } from "src/types/sound/audio.model";
import cSoundSourceJson from "src/data/sound/csoundsource.json";

export class AudioParser extends BaseParser<RawAudio, Audio> {
  static getRaws(): RawAudio[] {
    return Object.values(cSoundSourceJson.Data);
  }

  static getRaw(id: number): RawAudio | undefined {
    const raws = AudioParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  transform(raw: RawAudio): Audio {
    return {
      id: raw?.id ?? -1,
      cueName: raw?.cueName ?? null,
      cueSheet: raw?.cueSheet ?? null,
      url: raw ? this.getUrl(raw) : null,
      volume: raw?.volume ?? -1,
    };
  }

  private getUrl(raw: RawAudio): string | null {
    try {
      const soundFolder = raw.cueSheet.split(":")[1];
      const soundName = raw.cueName;
      return `/audio/${soundFolder}/${soundName}.ogg`;
    } catch (error) {
      return null;
    }
  }
}
