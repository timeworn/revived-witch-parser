import {
  ICharacterSoundCatalogData,
  ICharacterSoundHandbookData,
  ICharacterSoundLinesData,
  ICharacterSoundTitleData,
  ICharacterVoiceline,
} from "../../../interfaces/CharacterInterfaces";
import { RWUtils } from "../../utils/RWUtils";
import cSoundLinesJson from "../../../data/characters/sound/csoundlines.json";
import cSoundTitleJson from "../../../data/characters/sound/csoundtitle.json";
import cSoundCatalogJson from "../../../data/characters/sound/csoundcatalog.json";
import cSoundHandbookJson from "../../../data/characters/sound/csoundhandbook.json";
import { RWTexts } from "../../utils/RWTexts";

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

export namespace RWCAudio {
  export const getVoiceline = (id: number) => {
    const characterConfig = RWUtils.getConfig(id);
    const voicelines: ICharacterVoiceline[] = [];
    if (!characterConfig) return voicelines;

    const soundLines = cSoundLinesData[id];
    if (!soundLines) return voicelines;

    const soundTitle = cSoundTitleData[id];
    if (!soundTitle) return voicelines;

    const soundHandbook = cSoundHandbookData[id];
    if (!soundHandbook) return voicelines;

    const soundCatalog = cSoundCatalogData[id];
    if (!soundCatalog) return voicelines;

    const processVoiceEntry = (
      voiceId: number,
      title: string | undefined,
      catalogKey: string | undefined,
      arrayIndex?: number,
    ) => {
      const line = catalogKey
        ? RWTexts.getWordHandbook(
            arrayIndex !== undefined
              ? soundLines[catalogKey]?.[arrayIndex]
              : soundLines[catalogKey],
          )
        : "?";

      const voiceSource = RWUtils.getEnVoiceSource(voiceId);

      voicelines.push({
        name: title ?? "?",
        description: line ?? "?",
        ...voiceSource,
      });
    };

    soundHandbook.otherVoice.forEach((voiceId, index) => {
      if (voiceId === 0) return;

      const title = RWTexts.getWordHandbook(soundTitle.otherTitle[index]);

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

    soundHandbook.relationVoice.forEach((voiceId, index) => {
      if (voiceId === 0) {
        voiceId = soundHandbook.relationVoice[index - 1] + 1;
      }

      const title = RWTexts.getWordHandbook(soundTitle.relationTitle[index]);

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
