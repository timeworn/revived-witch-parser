import { getAssetImage } from "src/utils/utils";
import { BaseParser } from "src/utils/BaseParser";
import { Element, RawElement } from "src/types/element.model";
import cElementCfgJson from "src/data/role/celementcfg.json";

export class ElementParser extends BaseParser<RawElement, Element> {
  static getRaws(): RawElement[] {
    return Object.values(cElementCfgJson.Data);
  }

  static getRaw(id: number): RawElement | undefined {
    const rawCs = ElementParser.getRaws();
    return rawCs.find((character) => character.id === id);
  }

  transform(raw: RawElement): Element {
    return {
      id: raw.id,
      name: this.localizer.localize(raw.nameid.toString()),
      image: getAssetImage(raw.image),
    };
  }
}
