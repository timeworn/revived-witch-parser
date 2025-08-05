import { getAssetImage } from "src/utils/utils";
import { BaseParser } from "src/utils/BaseParser";
import { Rarity, RawRarity } from "src/types/rarity.model";
import cRoleRarityCfgJson from "src/data/role/croleraritycfg.json";

const RARITY_NAME_IDS = [501833, 501832, 501831, 501834, 502614];

export class RarityParser extends BaseParser<RawRarity, Rarity> {
  static getRaws(): RawRarity[] {
    return Object.values(cRoleRarityCfgJson.Data);
  }

  static getRaw(id: number): RawRarity | undefined {
    const raws = RarityParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  transform(raw: RawRarity): Rarity {
    return {
      id: raw.id,
      name: this.localizer.localize(RARITY_NAME_IDS[raw.id - 1].toString()),
      ueCharCellLarge: getAssetImage(raw.UEcharcelllarge),
      ueCharFrame: getAssetImage(raw.UEcharframe),
      ueCharFrameSmall: getAssetImage(raw.UEcharframesmall),
      ueDownBack: getAssetImage(raw.UEdownback),
      ueFrameId: getAssetImage(raw.UEframeid),
      ueFrameIdSmall: getAssetImage(raw.UEframeidsmall),
      breakLevelBackPolygon: getAssetImage(raw.breakLevelBackPolygon),
      breakLevelBackTriangle: getAssetImage(raw.breakLevelBackTriangle),
      charCellLarge: getAssetImage(raw.charcelllarge),
      charFrame: getAssetImage(raw.charframe),
      charFrameSmall: getAssetImage(raw.charframesmall),
      downBack: getAssetImage(raw.downback),
      drawInfo: getAssetImage(raw.drawinfo),
      evolutionEffect: null,
      frameId: getAssetImage(raw.frameid),
      frameIdSmall: getAssetImage(raw.frameidsmall),
      imgBigId: getAssetImage(raw.imgbigid),
      imgId: getAssetImage(raw.imgid),
      imgRoleId: getAssetImage(raw.imgroleid),
      ranklLarge: getAssetImage(raw.rankllarge),
      triangle: getAssetImage(raw.triangle),
      triangleLarge: getAssetImage(raw.trianglelarge),
      yardCell: getAssetImage(raw.yardCell),
    };
  }
}
