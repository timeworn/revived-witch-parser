import cAffiliationHandbookJson from "src/data/handbook/caffiliation_handbook.json";
import { Affiliation, RawAffiliation } from "src/types/affiliation.model";
import { getAssetImage } from "src/utils/utils";
import { BaseParser } from "src/utils/BaseParser";

export class AffiliationParser extends BaseParser<RawAffiliation, Affiliation> {
  static getRaws(): RawAffiliation[] {
    return Object.values(cAffiliationHandbookJson.Data);
  }

  static getRaw(id: number): RawAffiliation | undefined {
    const rawCs = AffiliationParser.getRaws();
    return rawCs.find((character) => character.id === id);
  }

  transform(raw: RawAffiliation): Affiliation {
    return {
      id: raw.id,
      name: this.localizer.localize(raw.nameTextID.toString()),
      icon: getAssetImage(raw.icon),
    };
  }
}
