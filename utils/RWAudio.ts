import {
  ICharacterSoundCatalogData,
  ICharacterSoundHandbookData,
  ICharacterSoundLinesData,
  ICharacterSoundTitleData,
  ICharacterVoiceline,
  ICharacterVoiceSourceData,
} from "src/interfaces/CharacterInterfaces";
import { RWCUtils } from "./RWUtils";
import cSoundLinesJson from "src/data/characters/sound/csoundlines.json";
import cSoundTitleJson from "src/data/characters/sound/csoundtitle.json";
import cSoundCatalogJson from "src/data/characters/sound/csoundcatalog.json";
import cSoundHandbookJson from "src/data/characters/sound/csoundhandbook.json";
import enCVoiceSourceJson from "src/data/characters/sound/cvoicesource_ja_jp_overseas_en.json";
import { RWCTexts } from "./RWTexts";
import { getImageUrl } from "src/hooks/getImage";

const RW_AUDIO = "rw/audio/GLOBAL";

const cSoundLinesData: { [key: string]: ICharacterSoundLinesData | undefined } =
  cSoundLinesJson.Data;
const cSoundTitleData: { [key: string]: ICharacterSoundTitleData | undefined } =
  cSoundTitleJson.Data;
const cSoundCatalogData: {
  [key: string]: ICharacterSoundCatalogData | undefined;
} = cSoundCatalogJson.Data;
const cSoundHandbookData: {
  [key: string]: ICharacterSoundHandbookData | undefined;
} = cSoundHandbookJson.Data;
const enCVoiceSourceData: {
  [key: string]: ICharacterVoiceSourceData | undefined;
} = enCVoiceSourceJson.Data;

export namespace RWCAudio {
  export const getVoiceSource = (voiceId: number) =>
    enCVoiceSourceData[voiceId];

  export const getVoiceline = (id: number) => {
    const characterConfig = RWCUtils.getConfig(id);
    const voicelines: ICharacterVoiceline[] = [];
    if (!characterConfig) return voicelines;

    const soundLines = cSoundLinesData[id];
    if (!soundLines) return voicelines;

    const soundTitle = cSoundTitleData[id];
    if (!soundTitle) return voicelines;

    const soundHandbook = cSoundHandbookData[id];
    if (!soundHandbook) return voicelines;

    // const voiceSource = enCVoiceSourceData[id];
    // if (!voiceSource) return voicelines;

    const soundCatalog = cSoundCatalogData[id];
    if (!soundCatalog) return voicelines;

    const processVoiceEntry = (
      voiceId: number,
      title: string | undefined,
      catalogKey: string | undefined,
      arrayIndex?: number,
    ) => {
      const line = catalogKey
        ? RWCTexts.getWordHandbook(
            arrayIndex !== undefined
              ? soundLines[catalogKey]?.[arrayIndex]
              : soundLines[catalogKey],
          )
        : "?";

      const voiceSource = getVoiceSource(voiceId);
      const voiceFolder = voiceSource?.cueSheet.split(":")[1];
      const voiceName = voiceSource?.cueName;
      const volume = voiceSource?.volume ?? 100;

      voicelines.push({
        name: title ?? "?",
        description: line ?? "?",
        url: getImageUrl(`${RW_AUDIO}/${voiceFolder}/${voiceName}.ogg`),
        volume: volume,
      });
    };

    soundHandbook.otherVoice.forEach((voiceId, index) => {
      if (voiceId === 0) return;

      const title = RWCTexts.getWordHandbook(soundTitle.otherTitle[index]);

      for (const [key, value] of Object.entries(soundCatalog)) {
        if (Array.isArray(value)) {
          const arrayIndex = value.indexOf(voiceId);
          if (arrayIndex !== -1) {
            processVoiceEntry(voiceId, title, key, arrayIndex);
            break;
          }
        } else if (value === voiceId) {
          processVoiceEntry(voiceId, title, key);
          break;
        }
      }
    });

    return voicelines;
  };
}
