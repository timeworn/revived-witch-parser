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
import { RWCUtils } from "./RWUtils";
import { RWCTexts } from "./RWTexts";

const RW_CDN = "rw/cdn/GLOBAL";

const roleSkinData: { [key: string]: ICharacterRoleSkinData | undefined } =
  cRoleSkinJson.Data;
const skinData: { [key: string]: ICharacterSkinData | undefined } =
  cskinJson.Data;
const shapeData: { [key: string]: ICharacterShapeData | undefined } =
  nNpcShapeJson.Data;
const thumbnailData = RWCUtils.getConfigJson().AllIds.reduce(
  (acc, id) => {
    acc[id] = getImageUrl(`${RW_CDN}/thumbnails/${id}.webp`);
    return acc;
  },
  {} as { [key: string]: string | undefined },
);

export namespace RWCAppearance {
  export const getSkins = (id: number) => {
    const skinIds = roleSkinData[id];
    const cardConfig = RWCUtils.getCardConfig(id);
    let characterSkins: ICharacterSkins = { list: [] };

    if (skinIds?.skinID?.length && cardConfig) {
      const { artistTextID, overseasArtistTextID, cvTextIDJpn } = cardConfig;
      const getText = (id: number) => {
        const text = RWCTexts.getWordHandbook(id);
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
            thumbnail: thumbnailData[id],
            square: RWCUtils.getRWAssetImage(skinShape.littleHeadID),
            card: RWCUtils.getRWAssetImage(skinShape.lihuiID),
            name: RWCTexts.geWordRole(skin.skinNameTextID),
            l2d: skin.ifLive
              ? {
                  path: RWCUtils.getRWL2DImage(skinShape.live2DAssetBundleName),
                  name: getAssetName(skinShape.live2DAssetBundleName),
                }
              : undefined,
            pixelAnims: pixelAnims,
            id: skinId,
          });
        }
      });
    }

    return characterSkins;
  };

  export const getFrame = (id: number) => {
    const characterConfig = RWCUtils.getConfig(id);
    if (!characterConfig) return undefined;

    const rarityConfig = RWCUtils.getRarityConfig(characterConfig.rarity);
    return RWCUtils.getRWAssetImage(rarityConfig?.charframesmall);
  };
}

const getAssetName = (asset: string) =>
  asset.split("/").pop()?.split(".")[0] ?? "";
