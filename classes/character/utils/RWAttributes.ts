import {
  ICharacterAffiliation,
  ICharacterAffiliationData,
  ICharacterBond,
  ICharacterElement,
  ICharacterFavourExpData,
  ICharacterFavourGiftTypeData,
  ICharacterFavourPresentData,
  ICharacterFavourSkillData,
  ICharacterGift,
  ICharacterRarity,
  ICharacterVocation,
  ICharacterYardSkill,
  ICharacterYardSkillData,
} from "src/interfaces/CharacterInterfaces";
import characterVocationJson from "src/data/characters/manual/charactervocation.json";
import characterElementJson from "src/data/characters/manual/characterelements.json";
import characterAffiliationJson from "src/data/characters/handbook/caffiliation_handbook.json";
import { RWUtils } from "../../utils/RWUtils";
import { getImageUrl } from "src/hooks/getImage";
import { RWTexts } from "../../utils/RWTexts";
import cFavourExpJson from "src/data/characters/role/cfavourexp.json";
import cFavourPresentJson from "src/data/characters/role/cfavourpresent.json";
import cFavourGiftTypeJson from "src/data/characters/role/cfavourgifttype.json";
import cFavourSkillJson from "src/data/characters/role/cfavourskill.json";
import cYardSkillJson from "src/data/characters/courtyard/cyardskill.json";

const RW_CDN = "rw/cdn/GLOBAL";
const RARITY_NAMES = ["R", "SR", "SSR", "UR", "EX"];

const affiliationData: {
  [key: string]: ICharacterAffiliationData | undefined;
} = characterAffiliationJson.Data;
const characterVocations: { [key: string]: string | undefined } =
  characterVocationJson;
const characterElements: { [key: string]: string | undefined } =
  characterElementJson;
const favourExpData: { [key: string]: ICharacterFavourExpData | undefined } =
  cFavourExpJson.Data;
const favourPresentData: {
  [key: string]: ICharacterFavourPresentData | undefined;
} = cFavourPresentJson.Data;
const favourGiftTypeData: {
  [key: string]: ICharacterFavourGiftTypeData | undefined;
} = cFavourGiftTypeJson.Data;
const favourSkillData: {
  [key: string]: ICharacterFavourSkillData | undefined;
} = cFavourSkillJson.Data;
const yardSkillData: { [key: string]: ICharacterYardSkillData } =
  cYardSkillJson.Data;

export namespace RWCAttributes {
  export const getRarity = (id: number) => {
    const characterConfig = RWUtils.getConfig(id);
    if (!characterConfig) return undefined;

    const rarity: ICharacterRarity = {
      id: characterConfig.rarity,
      icon: getImageUrl(
        `${RW_CDN}/ranks/charRanks/LeftSmallRank${characterConfig.rarity - 1}.png`,
      ),
      name: RARITY_NAMES[characterConfig.rarity - 1],
    };

    return rarity;
  };

  export const getElement = (id: number) => {
    const characterConfig = RWUtils.getConfig(id);
    if (!characterConfig) return undefined;

    const elementConfig = RWUtils.getElementConfig(characterConfig.element - 1);
    const characterElement: ICharacterElement = {
      id: characterConfig.element,
      image: getImageUrl(characterElements[elementConfig?.image ?? -1]),
      name: RWTexts.geWordRole(elementConfig?.nameid ?? -1),
    };

    return characterElement;
  };

  export const getVocation = (id: number) => {
    const characterConfig = RWUtils.getConfig(id);
    if (!characterConfig) return undefined;

    const vocationConfig = RWUtils.getVocationConfig(
      characterConfig.vocation - 1,
    );
    const characterVocation: ICharacterVocation = {
      id: characterConfig.vocation,
      imgDescribe: getImageUrl(characterVocations[characterConfig.vocation]),
      name: vocationConfig
        ? RWTexts.geWordRole(vocationConfig.nameTextID)
        : undefined,
    };

    return characterVocation;
  };

  export const getAffiliation = (id: number) => {
    const cardConfig = RWUtils.getCardConfig(id);
    if (!cardConfig) return undefined;

    const affiliationId =
      cardConfig.affiliation === 0 ? 40000 : cardConfig.affiliation;
    const affiliationIds = affiliationData[affiliationId];

    const affiliationName = affiliationIds
      ? (RWTexts.getWordHandbook(affiliationIds.nameTextID) ?? "???")
      : "???";

    const characterAffiliation: ICharacterAffiliation = {
      icon: RWUtils.getRWAssetImage(affiliationIds?.icon),
      id: affiliationId,
      name: affiliationName.toLowerCase() === "null" ? "???" : affiliationName,
    };

    return characterAffiliation;
  };

  export const getVocations = () => characterVocations;

  export const getElements = () => characterElements;

  export const getBond = (id: number) => {
    const characterBonds: ICharacterBond[] = [];
    const rarity = RWCAttributes.getRarity(id);
    if (!rarity) return characterBonds;

    Object.keys(favourExpData).forEach((_, index) => {
      const data = favourExpData[index] as ICharacterFavourExpData;
      if (data.id === 10) return;

      const presentData = favourPresentData[id] as ICharacterFavourPresentData;
      const levelRewardID = presentData.levelRewardID[data.id];
      const levelRewardType = presentData.levelRewardType[data.id];

      let reward = undefined;

      if (levelRewardType === 2) {
        const favourSkill = favourSkillData[levelRewardID];
        reward = favourSkill
          ? RWTexts.getWordSkill(favourSkill.skillattributiontxt)
          : undefined;
      } else {
        const storyId =
          favourGiftTypeData[levelRewardType]?.storyandlineid[
            Math.max(levelRewardID - 1, 0)
          ];
        reward = storyId ? RWTexts.getWordRole(storyId) : undefined;
      }

      characterBonds.push({
        level: data.id + 1,
        reward: reward ?? "?",
        exp: data[
          `${rarity.name}favourexp` as keyof ICharacterFavourExpData
        ] as number,
      });
    });

    return characterBonds;
  };

  export const getGift = (id: number) => {
    const characterConfig = RWUtils.getConfig(id);
    const gifts: ICharacterGift[] = [];
    if (!characterConfig) return gifts;

    const favourPresentTypeData = RWUtils.getFavourPresentTypeData();

    Object.keys(favourPresentTypeData).forEach((key, _) => {
      const present = favourPresentTypeData[key];
      if (present.presenttype !== characterConfig.favourgift) return;

      const itemAttr = RWUtils.getItemAttr(present.id);

      gifts.push({
        id: itemAttr.id,
        name: RWTexts.getWordItem(itemAttr.nameTextID) ?? "?",
        description: RWTexts.getWordItem(itemAttr.destribeTextID) ?? "?",
        icon: RWUtils.getRWAssetImage(itemAttr.icon),
        favour: present.favour,
        exfavour: present.exfavour,
      });
    });

    return gifts;
  };

  export const getYardSkill = (id: number) => {
    const characterConfig = RWUtils.getConfig(id);
    const yardSkills: ICharacterYardSkill[] = [];
    if (!characterConfig) return yardSkills;

    characterConfig.yardskillid.forEach((skillId) => {
      const yardskill = yardSkillData[skillId];

      yardSkills.push({
        id: yardskill.id,
        name: RWTexts.getWordYard(yardskill.nameTextID) ?? "?",
        description: RWTexts.getWordYard(yardskill.descTextID) ?? "?",
        icon: RWUtils.getRWAssetImage(yardskill.image),
      });
    });

    return yardSkills;
  };
}
