import {
  ICharacterPixelAnimations,
  ICharacterRoleSkinData,
  ICharacterShapeData,
  ICharacterSkinData,
  ICharacterSkins,
} from "src/interfaces/CharacterInterfaces";
import cRoleSkinJson from "src/data/characters/role/croleskin.json";
import cskinJson from "src/data/characters/role/cskin.json";
import nNpcShapeJson from "src/data/characters/npc/cnpcshape.json";
import { getImageUrl } from "src/hooks/getImage";
import { RWUtils } from "../../utils/RWUtils";
import { RWTexts } from "../../utils/RWTexts";

const RW_CDN = "rw/cdn/GLOBAL";

const roleSkinData: { [key: string]: ICharacterRoleSkinData | undefined } =
  cRoleSkinJson.Data;
const skinData: { [key: string]: ICharacterSkinData | undefined } =
  cskinJson.Data;
const shapeData: { [key: string]: ICharacterShapeData | undefined } =
  nNpcShapeJson.Data;
const thumbnailData = RWUtils.getConfigJson().AllIds.reduce(
  (acc, id) => {
    acc[id] = getImageUrl(`${RW_CDN}/thumbnails/${id}.webp`);
    return acc;
  },
  {} as { [key: string]: string | undefined },
);

export namespace RWCAppearance {
  export const getSkins = (id: number) => {
    const skinIds = roleSkinData[id];
    const cardConfig = RWUtils.getCardConfig(id);
    let characterSkins: ICharacterSkins = { list: [] };

    if (skinIds?.skinID?.length && cardConfig) {
      const { artistTextID, overseasArtistTextID, cvTextIDJpn } = cardConfig;
      const getText = (id: number) => {
        const text = RWTexts.getWordHandbook(id);
        return text === "Unavailable" ? "?" : text || "?";
      };

      characterSkins = {
        ...characterSkins,
        artist: getText(artistTextID),
        overseasArtist: getText(overseasArtistTextID),
        jpnCV: getText(cvTextIDJpn),
        chsCV: getText(cvTextIDJpn),
      };

      skinIds.skinID.forEach((skinId) => {
        const skin = skinData[skinId];
        const skinShape = skin && shapeData[skin.shapeID];

        if (skin && skinShape) {
          const pixelAnims: ICharacterPixelAnimations[] = [];

          characterSkins.list.push({
            id: skinId,
            name: RWTexts.geWordRole(skin.skinNameTextID),
            description: RWTexts.fixFormatting(
              RWTexts.getWordRole(skin.discribeTextID),
            ),
            thumbnail: thumbnailData[id],
            artist: RWTexts.getWordRole(skin.artistTextID),
            overseasArtist: RWTexts.getWordRole(skin.overseasArtistTextID),
            square: RWUtils.getRWAssetImage(skinShape.littleHeadID),
            card: RWUtils.getRWAssetImage(skinShape.lihuiID),
            l2d: skin.ifLive
              ? {
                  path: RWUtils.getRWL2DImage(skinShape.live2DAssetBundleName),
                  name: getAssetName(skinShape.live2DAssetBundleName),
                }
              : undefined,
            pixelAnims: pixelAnims,
          });
        }
      });
    }

    return characterSkins;
  };

  export const getFrame = (id: number) => {
    const characterConfig = RWUtils.getConfig(id);
    if (!characterConfig) return undefined;

    const rarityConfig = RWUtils.getRarityConfig(characterConfig.rarity);
    return RWUtils.getRWAssetImage(rarityConfig?.charframesmall);
  };
}

const getAssetName = (asset: string) =>
  asset.split("/").pop()?.split(".")[0] ?? "";
