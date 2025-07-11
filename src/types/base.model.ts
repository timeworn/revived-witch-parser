import { BaseParser } from "src/utils/BaseParser";
import { Localizer } from "src/utils/Localizer";

export type BaseParserConstructor<TRaw = any, TTransformed = any> = {
  new (localizer: Localizer): BaseParser<TRaw, TTransformed>;
  getRaws(): TRaw[];
  getRaw(id: number): TRaw | undefined;
};
