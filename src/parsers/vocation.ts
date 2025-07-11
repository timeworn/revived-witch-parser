import { getAssetImage } from "src/utils/utils";
import { BaseParser } from "src/utils/BaseParser";
import { RawVocation, Vocation } from "src/types/vocation.model";
import cVocationCfgJson from "src/data/role/cvocationcfg.json";

export class VocationParser extends BaseParser<RawVocation, Vocation> {
  static getRaws(): RawVocation[] {
    return Object.values(cVocationCfgJson.Data);
  }

  static getRaw(id: number): RawVocation | undefined {
    const rawCs = VocationParser.getRaws();
    return rawCs.find((character) => character.id === id);
  }

  transform(raw: RawVocation): Vocation {
    return {
      id: raw.id,
      name: this.localizer.localize(raw.nameTextID.toString()),
      description: this.localizer.localize(raw.vocationDescribeTextID.toString()),
      imgBackground: getAssetImage(raw.imgBackground),
      imgDescribe: getAssetImage(raw.imgDescribe),
      imgDescribeBlue: getAssetImage(raw.imgDescribeBlue),
      imgDraw: getAssetImage(raw.imgDraw),
      imgEX: getAssetImage(raw.imgEX),
      imgR: getAssetImage(raw.imgR),
      imgSR: getAssetImage(raw.imgSR),
      imgSSR: getAssetImage(raw.imgSSR),
      imgUR: getAssetImage(raw.imgUR),
      imgWhite: getAssetImage(raw.imgWhite),
    };
  }
}
