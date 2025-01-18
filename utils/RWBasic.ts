import { RWCharacter } from "../RWCharacter";
import { RWCTexts } from "./RWTexts";
import { RWCUtils } from "./RWUtils";

export namespace RWCBasic {
  export const getName = (id: number) => {
    const characterConfig = RWCUtils.getConfig(id);
    const characterName = RWCTexts.geWordRole(
      characterConfig?.nameTextID ?? -1,
    );
    return characterName === "$heroine$" ? "Witch" : characterName;
  };

  export const getTitle = (id: number) => {
    const characterConfig = RWCUtils.getConfig(id);
    const title =
      RWCTexts.geWordRole(characterConfig?.titleTextID ?? -1) ?? "???";
    return title?.toLowerCase() === "null" ? "???" : title;
  };

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
    const characterCardConfig = RWCUtils.getCardConfig(id);
    if (!characterCardConfig) return [];

    const backstoryIds = characterCardConfig?.backStoryTextID;
    if (!backstoryIds) return [];

    return backstoryIds.map((id: number) =>
      RWCTexts.getWordHandbook(id)?.replace(/\$B\$/g, " "),
    );
  };

  export const getSex = (id: number) => {
    const sexTextID = RWCUtils.getCardConfig(id)?.sexTextID;
    return sexTextID ? RWCTexts.getWordHandbook(sexTextID) : undefined;
  };

  export const getBirthday = (id: number) => {
    const birthday = RWCUtils.getCardConfig(id)?.birthday;
    return birthday ? RWCTexts.getWordHandbook(birthday) : undefined;
  };

  export const getHeight = (id: number) => RWCUtils.getCardConfig(id)?.height;

  export const getWeight = (id: number) => RWCUtils.getCardConfig(id)?.weight;

  export const getHobby = (id: number) => {
    const hobbyTextID = RWCUtils.getCardConfig(id)?.hobbyTextID;
    return hobbyTextID ? RWCTexts.getWordHandbook(hobbyTextID) : undefined;
  };

  export const getRace = (id: number) => {
    const race = RWCUtils.getCardConfig(id)?.race;
    const raceConfig = race && RWCUtils.getRaceConfig(race);
    return raceConfig ? RWCTexts.getRoleWord(raceConfig.nameTextID) : undefined;
  };

  export const getAge = (id: number) => RWCUtils.getCardConfig(id)?.age;
}
