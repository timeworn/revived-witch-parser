import characterConfigJson from "src/data/characters/role/roleconfig.json";
import characterCardConfigJson from "src/data/characters/handbook/ccardroleconfig_handbook.json";
import characterRarityJson from "src/data/characters/role/croleraritycfg.json";
import { getImageUrl } from "src/hooks/getImage";
import {
  ICharacterConfig,
  ICharacterElementData,
  ICharacterHandbook,
  ICharacterRaceConfig,
  ICharacterRarityConfig,
  ICharacterVocationData,
  CImagePath,
} from "src/interfaces/CharacterInterfaces";
import imagePathJson from "src/data/characters/ui/cimagepath.json";
import characterFramesJson from "src/data/characters/manual/characterframes.json";
import characterVocationConfigJson from "src/data/characters/role/cvocationcfg.json";
import characterElementConfigJson from "src/data/characters/role/celementcfg.json";
import cRaceConfig from "src/data/characters/role/cracecfg.json";

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

export namespace RWCUtils {
  export const getRWAssetImage = (id: number | undefined) => {
    if (!id) return undefined;

    const imagePath = imagePathData[id];
    if (!imagePath) return undefined;

    const frame = characterFrames[id];
    if (frame) return getImageUrl(frame);

    const { assetBundle, assetName } = imagePath;
    let modifiedAssetBundle = assetBundle;

    if (!assetBundle.includes(assetName)) {
      const assetBundleParts = assetBundle.split(".assetbundle");
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

  export const getRarityConfig = (rarity: number) =>
    rarityConfigData[rarity - 1];

  export const getConfig = (id: number) => configData[id];

  export const getConfigs = () => configData;

  export const getCardConfig = (id: number) => cardConfigData[id];

  export const getVocationConfig = (id: number) => vocationConfigData[id];

  export const getElementConfig = (id: number) => elementConfigData[id];

  export const getElementConfigJson = () => characterElementConfigJson;

  export const getVocationConfigJson = () => characterVocationConfigJson;

  export const getConfigJson = () => characterConfigJson;

  export const getRaceConfig = (id: number) => raceConfigData[id - 1];
}
