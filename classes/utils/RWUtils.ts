import {
  ICharacterConfig,
  ICharacterElementData,
  ICharacterHandbook,
  ICharacterRaceConfig,
  ICharacterRarityConfig,
  ICharacterVocationData,
  CImagePath,
  ItemData,
  IHeadPhotoConfigData,
  ICharacterFavourPresentTypeData,
  ICEquipItemData,
  ICEquipHandbookData,
  ICEquipSuitData,
  ICItemClassToLoadData,
  ICAttrEffectIdNameData,
  ICUniqueEquipItemData,
  ICUniqueEquipConfigData,
  ICFurnitureItemData,
  ICFurnitureGroupData,
  ICFurnitureTypeData,
  ICAudioPlayerCellData,
  ICAudioPlayerAlbumData,
  ICSoundSourceData,
  ICLightTrainingCourseData,
  ICLightTrainingRarityData,
  ICAchieveMissionConfigData,
  ICAchieveBadgeGroupData,
  ICAchieveBadgeConfigData,
  ICAchieveLevelConfigData,
  ICDailyMissonConfigData,
  ICDailyMissionAwardData,
  ICAlchemyFormulaData,
  ICAlchemyLvData,
  ICAlchemyFormulaTypeData,
  ItemAmount,
  ItemWithAmount,
  ICharacterVoiceSourceData,
} from "src/interfaces/CharacterInterfaces";
import { getImageUrl } from "src/hooks/getImage";
import { RWItem } from "../item/RWItem";
import characterConfigJson from "src/data/characters/role/roleconfig.json";
import characterCardConfigJson from "src/data/characters/handbook/ccardroleconfig_handbook.json";
import characterRarityJson from "src/data/characters/role/croleraritycfg.json";
import imagePathJson from "src/data/characters/ui/cimagepath.json";
import characterFramesJson from "src/data/characters/manual/characterframes.json";
import characterVocationConfigJson from "src/data/characters/role/cvocationcfg.json";
import characterElementConfigJson from "src/data/characters/role/celementcfg.json";
import cRaceConfig from "src/data/characters/role/cracecfg.json";
import cItemAttr from "src/data/characters/item/citemattr.json";
import cHeadPhotoFrameConfigJson from "src/data/characters/headphoto/cheadphotoframeconfig.json";
import cHeadPhotoConfigJson from "src/data/characters/headphoto/cheadphotoconfig.json";
import cFavourPresentTypeJson from "src/data/characters/role/cfavourpresenttype.json";
import cEquipItemJson from "src/data/characters/item/cequipitem.json";
import cEquipHandbookJson from "src/data/characters/handbook/cequip_handbook.json";
import cEquipSuitJson from "src/data/characters/equip/cequipsuit.json";
import cItemClassToLoadJson from "src/data/characters/item/citemclasstoload.json";
import cAttrEffectIdNameJson from "src/data/characters/role/cattreffectidname.json";
import cUniqueEquipItemJson from "src/data/characters/item/cuniqueequipitem.json";
import cUniqueEquipConfigJson from "src/data/characters/equip/cuniqueequipcfg.json";
import cFurnitureItemJson from "src/data/characters/item/cfurnitureitem.json";
import cFurnitureGroupJson from "src/data/characters/courtyard/cdormfurnituregroup.json";
import cFurnitureTypeJson from "src/data/characters/courtyard/cdormfurnituretype.json";
import cAudioPlayerCellJson from "src/data/characters/courtyard/caudioplayercell.json";
import cAudioPlayerAlbumJson from "src/data/characters/courtyard/caudioplayeralbum.json";
import cSoundSourceJson from "src/data/characters/sound/csoundsource.json";
import cLightTrainingCourseJson from "src/data/characters/courtyard/clighttrainingcourse.json";
import cLightTrainingRarityJson from "src/data/characters/courtyard/clighttrainingrarity.json";
import cAchieveMissionConfigJson from "src/data/characters/mission/cachievemissionconfig.json";
import cAchieveBadgeGroupJson from "src/data/characters/mission/cachievebadgegroup.json";
import cAchieveBadgeConfigJson from "src/data/characters/mission/cachievebadgeconfig.json";
import cAchieveLevelConfigJson from "src/data/characters/mission/cachievelevelconfig.json";
import cDailyMissionConfigJson from "src/data/characters/mission/cdailymissionconfig.json";
import cDailyMissionAwardJson from "src/data/characters/mission/cdailymissionaward.json";
import cAlchemyFormulaJson from "src/data/characters/courtyard/calchemyformula.json";
import cAlchemyFormulaTypeJson from "src/data/characters/courtyard/calchemyformulatype.json";
import cAlchemyLvJson from "src/data/characters/courtyard/calchemylv.json";
import enCVoiceSourceJson from "src/data/characters/sound/cvoicesource_ja_jp_overseas_en.json";

const RW_ASSETS = "rw/assets/GLOBAL";

const configData: { [key: string]: ICharacterConfig | undefined } =
  characterConfigJson.Data;
const cardConfigData: { [key: string]: ICharacterHandbook | undefined } =
  characterCardConfigJson.Data;
const rarityConfigData: { [key: number]: ICharacterRarityConfig | undefined } =
  characterRarityJson.Data;
const raceConfigData: { [key: number]: ICharacterRaceConfig | undefined } =
  cRaceConfig.Data;
const vocationConfigData: {
  [key: number]: ICharacterVocationData | undefined;
} = characterVocationConfigJson.Data;
const elementConfigData: { [key: number]: ICharacterElementData | undefined } =
  characterElementConfigJson.Data;
const imagePathData: { [key: string]: CImagePath | undefined } =
  imagePathJson.Data;
const characterFrames: { [key: string]: string | undefined } =
  characterFramesJson;
const itemAttrData: { [key: string]: ItemData } = cItemAttr.Data;
const headPhotoFrameConfigData = cHeadPhotoFrameConfigJson.Data;
const headPhotoConfigData: { [key: string]: IHeadPhotoConfigData | undefined } =
  cHeadPhotoConfigJson.Data;
const favourPresentTypeData: {
  [key: string]: ICharacterFavourPresentTypeData;
} = cFavourPresentTypeJson.Data;
const equipItemData: { [key: string]: ICEquipItemData } = cEquipItemJson.Data;
const equipHandbookData: { [key: string]: ICEquipHandbookData } =
  cEquipHandbookJson.Data;
const cEquipSuitData: ICEquipSuitData[] = cEquipSuitJson.Data;
const cItemClassToLoadData: { [key: string]: ICItemClassToLoadData } =
  cItemClassToLoadJson.Data;
const cAttrEffectIdNameData: { [key: string]: ICAttrEffectIdNameData } =
  cAttrEffectIdNameJson.Data;
const cUniqueEquipItemData: { [key: string]: ICUniqueEquipItemData } =
  cUniqueEquipItemJson.Data;
const cUniqueEquipConfigData: { [key: string]: ICUniqueEquipConfigData } =
  cUniqueEquipConfigJson.Data;
const cFurnitureItemData: { [key: string]: ICFurnitureItemData } =
  cFurnitureItemJson.Data;
const cFurnitureGroupData: { [key: string]: ICFurnitureGroupData } =
  cFurnitureGroupJson.Data;
const cFurnitureTypeData: ICFurnitureTypeData[] = cFurnitureTypeJson.Data;
const cAudioPlayerCellData: ICAudioPlayerCellData[] = cAudioPlayerCellJson.Data;
const cAudioPlayerAlbumData: { [key: string]: ICAudioPlayerAlbumData } =
  cAudioPlayerAlbumJson.Data;
const cSoundSourceData: { [key: string]: ICSoundSourceData } =
  cSoundSourceJson.Data;
const cLightTrainingCourseData: ICLightTrainingCourseData[] =
  cLightTrainingCourseJson.Data;
const cLightTrainingRarityData: ICLightTrainingRarityData[] =
  cLightTrainingRarityJson.Data;
const cAchieveMissionConfigData: { [key: string]: ICAchieveMissionConfigData } =
  cAchieveMissionConfigJson.Data;
const cAchieveBadgeGroupData: ICAchieveBadgeGroupData[] =
  cAchieveBadgeGroupJson.Data;
const cAchieveBadgeConfigData: { [key: string]: ICAchieveBadgeConfigData } =
  cAchieveBadgeConfigJson.Data;
const cAchieveLevelConfigData: ICAchieveLevelConfigData[] =
  cAchieveLevelConfigJson.Data;
const cDailyMissionConfigData: { [key: string]: ICDailyMissonConfigData } =
  cDailyMissionConfigJson.Data;
const cDailyMissionAwardData: { [key: string]: ICDailyMissionAwardData } =
  cDailyMissionAwardJson.Data;
const cAlchemyFormulaData: { [key: string]: ICAlchemyFormulaData } =
  cAlchemyFormulaJson.Data;
const cAlchemyFormulaTypeData: ICAlchemyFormulaTypeData[] =
  cAlchemyFormulaTypeJson.Data;
const cAlchemyLvData: ICAlchemyLvData[] = cAlchemyLvJson.Data;
const enCVoiceSourceData: {
  [key: string]: ICharacterVoiceSourceData;
} = enCVoiceSourceJson.Data;

export namespace RWUtils {
  export const getRWAssetImage = (id: number | undefined) => {
    if (!id) return undefined;

    const imagePath = imagePathData[id];
    if (!imagePath) return undefined;

    const frame = characterFrames[id];
    if (frame) return getImageUrl(frame);

    const { assetBundle, assetName } = imagePath;
    let modifiedAssetBundle = assetBundle;

    if (!assetBundle.toLowerCase().includes(assetName.toLowerCase())) {
      const assetBundleParts = assetBundle.split(".assetbundle");
      modifiedAssetBundle = `${assetBundleParts[0]}.${assetName}.assetbundle`;
    } else {
      const escapedAssetName = assetName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const assetBundleParts = assetBundle.split(
        new RegExp(escapedAssetName, "i"),
      );
      modifiedAssetBundle = `${assetBundleParts[0]}.${assetName}.assetbundle`;
    }

    const formattedPath = modifiedAssetBundle
      .replace(/\./g, "/")
      .replace(/\/assetbundle$/, ".png");

    return getImageUrl(`${RW_ASSETS}/${formattedPath}`);
  };

  export const getRWL2DImage = (assetBundle: string | undefined) => {
    if (!assetBundle) return undefined;

    const formattedPath = assetBundle
      .replace(/\./g, "/")
      .replace(/\/assetbundle$/, "");

    return getImageUrl(`${RW_ASSETS}/${formattedPath}`);
  };

  export const getSkillAttributes = (
    skillId: number,
    skillShowData: any,
    changeIndex: number,
    max?: number,
  ) => {
    let skillAttributes: string[][] = [];
    for (let i = 0; i < skillShowData[skillId + 1].attr.length; i++) {
      skillAttributes[i] = [];
    }

    let index = 1;
    while (true) {
      const newSkillId = skillId + index;
      const skillIdStr = skillId.toString();
      const newSkillIdStr = newSkillId.toString();

      if (
        skillIdStr.substring(0, changeIndex + 1) !==
          newSkillIdStr.substring(0, changeIndex + 1) ||
        (max && index > max)
      ) {
        return skillAttributes;
      }

      const attributes = skillShowData[newSkillId]?.attr;
      if (attributes) {
        attributes.forEach((element: string, parameterIndex: number) => {
          skillAttributes[parameterIndex].push(element);
        });
      }

      index++;
    }
  };

  export const replaceDescriptionParameters = (
    description: string,
    skillAttributes: string[][],
  ) => {
    if (!description) return description;

    const usageCounts = new Array(skillAttributes.length).fill(0);

    for (let i = 0; i < skillAttributes.length; i++) {
      const colorRegex = new RegExp(
        `(<color=#[0-9A-Fa-f]{6}>)?\\$parameter${i + 1}\\$?(</color>)?`,
        "g",
      );

      description = description.replace(
        colorRegex,
        (_, startColor, endColor) => {
          const usageIndex = usageCounts[i]++;
          const partsForThisParam = skillAttributes[i].map((item) => {
            const splitItem = item.split(";");
            return splitItem[usageIndex] ?? splitItem[splitItem.length - 1];
          });

          const joinedParts = partsForThisParam.join("/");
          if (startColor) {
            return `${startColor}${joinedParts}${endColor || ""}`;
          }
          return `<color=#82C65D>${joinedParts}</color>`;
        },
      );
    }

    return description;
  };

  export const createItemAmount = (
    itemIds: number[] | number,
    amounts: number[] | number,
  ) => {
    if (typeof itemIds === "number") {
      return [{ itemId: itemIds, amount: amounts as number }];
    }

    return itemIds.map((itemId, index) => {
      const amount = Array.isArray(amounts) ? amounts[index] : amounts;
      return { itemId, amount };
    });
  };

  export const createItemWithAmount = (
    itemAmount: ItemAmount | ItemAmount[],
  ): ItemWithAmount[] => {
    if (Array.isArray(itemAmount)) {
      return itemAmount.map((itemAmount) => ({
        item: new RWItem(getItemAttr(itemAmount.itemId)),
        amount: itemAmount.amount,
      }));
    }

    return [
      {
        item: new RWItem(getItemAttr(itemAmount.itemId)),
        amount: itemAmount.amount,
      },
    ];
  };

  export const getRarityConfig = (rarity: number) =>
    rarityConfigData[rarity - 1];

  export const getConfig = (id: number) => configData[id];
  export const getConfigs = () => configData;
  export const getConfigJson = () => characterConfigJson;

  export const getCardConfig = (id: number) => cardConfigData[id];

  export const getVocationConfig = (id: number) => vocationConfigData[id];
  export const getVocationConfigJson = () => characterVocationConfigJson;

  export const getElementConfig = (id: number) => elementConfigData[id];
  export const getElementConfigJson = () => characterElementConfigJson;

  export const getRaceConfig = (id: number) => raceConfigData[id - 1];

  export const getItemAttr = (id: number) => itemAttrData[id];

  export const getHeadPhotoFrameConfig = (id: number) =>
    headPhotoFrameConfigData[id - 1];
  export const getHeadPhotoFrameJson = () => cHeadPhotoFrameConfigJson;

  export const getHeadPhotoConfig = (id: number) => headPhotoConfigData[id];
  export const getHeadPhotoJson = () => cHeadPhotoConfigJson;

  export const getFavourPresentType = (id: number) => favourPresentTypeData[id];
  export const getFavourPresentTypeData = () => favourPresentTypeData;
  export const getFavourPresentTypeJson = () => cFavourPresentTypeJson;

  export const getEquipItem = (id: number) => equipItemData[id];
  export const getEquipItemData = () => equipItemData;
  export const getEquipItemJson = () => cEquipItemJson;

  export const getEquipHandbook = (id: number) => equipHandbookData[id];
  export const getEquipHandbookData = () => equipHandbookData;
  export const getEquipHandbookJson = () => cEquipHandbookJson;

  export const getEquipSuit = (id: number): ICEquipSuitData | undefined =>
    cEquipSuitData[id - 1];
  export const getEquipSuitData = () => cEquipSuitData;
  export const getEquipSuitJson = () => cEquipSuitJson;

  export const getItemClassToLoad = (id: number) => cItemClassToLoadData[id];

  export const getAttrEffectIdName = (id: number) => cAttrEffectIdNameData[id];

  export const getUniqueEquipItem = (id: number) => cUniqueEquipItemData[id];
  export const getUniqueEquipItemData = () => cUniqueEquipItemData;
  export const getUniqueEquipItemJson = () => cUniqueEquipItemJson;

  export const getUniqueEquipConfig = (id: number) =>
    Object.values(cUniqueEquipConfigData).filter(
      (config) => config.UniqueEquipid === id,
    );
  export const getUniqueEquipConfigData = () => cUniqueEquipConfigData;
  export const getUniqueEquipConfigJson = () => cUniqueEquipConfigJson;

  export const getFurnitureItem = (id: number) => cFurnitureItemData[id];
  export const getFurnitureItemData = () => cFurnitureItemData;
  export const getFurnitureItemJson = () => cFurnitureItemJson;

  export const getFurnitureGroup = (id: number) => cFurnitureGroupData[id];
  export const getFurnitureGroupData = () => cFurnitureGroupData;
  export const getFurnitureGroupJson = () => cFurnitureGroupJson;

  export const getFurnitureType = (id: number) => cFurnitureTypeData[id - 1];
  export const getFurnitureTypeData = () => cFurnitureTypeData;
  export const getFurnitureTypeJson = () => cFurnitureTypeJson;

  export const getAudioPlayerCell = (id: number) =>
    cAudioPlayerCellData[id - 1];
  export const getAudioPlayerCellData = () => cAudioPlayerCellData;
  export const getAudioPlayerCellJson = () => cAudioPlayerCellJson;

  export const getAudioPlayerAlbum = (id: number) => cAudioPlayerAlbumData[id];
  export const getAudioPlayerAlbumData = () => cAudioPlayerAlbumData;
  export const getAudioPlayerAlbumJson = () => cAudioPlayerAlbumJson;

  export const getSoundSource = (id: number) => cSoundSourceData[id];
  export const getSoundSourceData = () => cSoundSourceData;
  export const getSoundSourceJson = () => cSoundSourceJson;

  export const getLightTrainingCourse = (id: number) =>
    cLightTrainingCourseData[id - 1];
  export const getLightTrainingCourseData = () => cLightTrainingCourseData;
  export const getLightTrainingCourseJson = () => cLightTrainingCourseJson;

  export const getLightTrainingRarity = (id: number) =>
    cLightTrainingRarityData[id - 1];
  export const getLightTrainingRarityData = () => cLightTrainingRarityData;
  export const getLightTrainingRarityJson = () => cLightTrainingRarityJson;

  export const getAchieveMissionConfig = (id: number) =>
    cAchieveMissionConfigData[id];
  export const getAchieveMissionConfigData = () => cAchieveMissionConfigData;
  export const getAchieveMissionConfigJson = () => cAchieveMissionConfigJson;

  export const getAchieveBadgeGroup = (id: number) =>
    cAchieveBadgeGroupData[id - 1];
  export const getAchieveBadgeGroupData = () => cAchieveBadgeGroupData;
  export const getAchieveBadgeGroupJson = () => cAchieveBadgeGroupJson;

  export const getAchieveBadgeConfig = (id: number) =>
    cAchieveBadgeConfigData[id];
  export const getAchieveBadgeConfigData = () => cAchieveBadgeConfigData;
  export const getAchieveBadgeConfigJson = () => cAchieveBadgeConfigJson;

  export const getAchieveLevelConfig = (id: number) =>
    cAchieveLevelConfigData[id - 1];
  export const getAchieveLevelConfigData = () => cAchieveLevelConfigData;
  export const getAchieveLevelConfigJson = () => cAchieveLevelConfigJson;

  export const getDailyMissionConfig = (id: number) =>
    cDailyMissionConfigData[id];
  export const getDailyMissionConfigData = () => cDailyMissionConfigData;
  export const getDailyMissionConfigJson = () => cDailyMissionConfigJson;

  export const getDailyMissionAward = (id: number) =>
    cDailyMissionAwardData[id];
  export const getDailyMissionAwardData = () => cDailyMissionAwardData;
  export const getDailyMissionAwardJson = () => cDailyMissionAwardJson;

  export const getAlchemyFormula = (id: number) => cAlchemyFormulaData[id];
  export const getAlchemyFormulaData = () => cAlchemyFormulaData;
  export const getAlchemyFormulaJson = () => cAlchemyFormulaJson;

  export const getAlchemyFormulaType = (id: number) =>
    cAlchemyFormulaTypeData[id - 1];
  export const getAlchemyFormulaTypeData = () => cAlchemyFormulaTypeData;
  export const getAlchemyFormulaTypeJson = () => cAlchemyFormulaTypeJson;

  export const getAlchemyLv = (id: number) => cAlchemyLvData[id - 1];
  export const getAlchemyLvData = () => cAlchemyLvData;
  export const getAlchemyLvJson = () => cAlchemyLvJson;

  export const getEnVoiceSource = (id: number) => enCVoiceSourceData[id];
  export const getEnVoiceSourceData = () => enCVoiceSourceData;
  export const getEnVoiceSourceJson = () => enCVoiceSourceJson;
}
