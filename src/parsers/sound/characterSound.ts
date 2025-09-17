import { AudioParser } from "src/parsers/sound/audio";
import { Audio, RawAudio } from "src/types/sound.model";
import cVoiceSource_ZH_Hans from "src/data/sound/cvoicesource_zh_hans.json";
import cVoiceSource_JA_JP from "src/data/sound/cvoicesource_ja_jp_overseas_en.json";
import { LocalizerLocale } from "src/utils/Localizer";

export class CharacterSoundParser extends AudioParser {
  static getRawsByLocale(locale: LocalizerLocale): RawAudio[] {
    switch (locale) {
      case "ch":
        return Object.values(cVoiceSource_ZH_Hans.Data);
      case "jp":
        return Object.values(cVoiceSource_JA_JP.Data);
      default:
        return [];
    }
  }

  static getRaw(id: number): RawAudio | undefined {
    const raws = CharacterSoundParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }
}
