import { RWCharacter } from "../RWCharacter";
import { RWTexts } from "../../utils/RWTexts";
import { RWUtils } from "../../utils/RWUtils";

const NAMES: Record<string, string> = {
  $heroine$: "Witch",
};

const RACES = [
  "Human",
  "Elf",
  "Beast",
  "Demon",
  "Giant",
  "Slime",
  "?",
  "Ancient God",
  "Holy Spirit",
  "Dragon",
  "Renditionist",
  "Machinery",
  "Werewolf",
  "Fallen Angel",
  "Angel",
  "Vampire",
  "Void",
];

export namespace RWCBasic {
  export const getName = (id: number) => {
    const characterConfig = RWUtils.getConfig(id);
    const characterName = RWTexts.geWordRole(characterConfig?.nameTextID ?? -1);
    return characterName
      ? (NAMES[characterName] ?? characterName)
      : characterName;
  };

  export const getTitle = (id: number) => {
    const characterConfig = RWUtils.getConfig(id);
    const title =
      RWTexts.geWordRole(characterConfig?.titleTextID ?? -1) ?? "???";
    return title?.toLowerCase() === "null" ? "???" : title;
  };

  // Do not use for production, see RWCharacter for the "unknown" array
  export const getUnknown = async (character: RWCharacter) => {
    if (character.unknown) {
      return true;
    }

    if (!character.skins.list[0]?.thumbnail) {
      character.unknown = true;
    } else {
      try {
        const imageUrl = new URL(
          character.skins.list[0]?.thumbnail,
          window.location.href,
        ).href;
        const response = await fetch(imageUrl);

        if (
          response.ok &&
          response.headers.get("Content-Type")?.startsWith("image/")
        ) {
          character.unknown = false;
        } else {
          character.unknown = true;
        }
      } catch (error) {
        character.unknown = true;
      }
    }

    return character.unknown;
  };

  export const getBackstories = (id: number) => {
    const characterCardConfig = RWUtils.getCardConfig(id);
    if (!characterCardConfig) return [];

    const backstoryIds = characterCardConfig?.backStoryTextID;
    if (!backstoryIds) return [];

    return backstoryIds.map((id: number) =>
      RWTexts.fixFormatting(RWTexts.getWordHandbook(id)),
    );
  };

  export const getSex = (id: number) => {
    const sexTextID = RWUtils.getCardConfig(id)?.sexTextID;
    return sexTextID ? RWTexts.getWordHandbook(sexTextID) : undefined;
  };

  export const getBirthday = (id: number) => {
    const birthday = RWUtils.getCardConfig(id)?.birthday;
    return birthday ? RWTexts.getWordHandbook(birthday) : undefined;
  };

  export const getHeight = (id: number) => RWUtils.getCardConfig(id)?.height;

  export const getWeight = (id: number) => RWUtils.getCardConfig(id)?.weight;

  export const getHobby = (id: number) => {
    const hobbyTextID = RWUtils.getCardConfig(id)?.hobbyTextID;
    return hobbyTextID ? RWTexts.getWordHandbook(hobbyTextID) : undefined;
  };

  export const getRace = (id: number) => {
    const race = RWUtils.getCardConfig(id)?.race;
    return race ? RACES[race - 1] : "?";
    // const raceConfig = race && RWUtils.getRaceConfig(race);
    // return raceConfig ? RWTexts.getRoleWord(raceConfig.nameTextID) : undefined;
  };

  export const getAge = (id: number) => RWUtils.getCardConfig(id)?.age;
}
