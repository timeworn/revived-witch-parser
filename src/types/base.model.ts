import { BaseParser } from "src/utils/BaseParser";
import { Localizer, LocalizerLocale } from "src/utils/Localizer";

export type BaseParserConstructor<TRaw = any, TTransformed = any> = {
  new (localizer: Localizer): BaseParser<TRaw, TTransformed>;
  getRaws(): TRaw[];
  getRaw(id: number): TRaw | undefined;
  getRawsByLocale?(locale: LocalizerLocale): TRaw[];
};

export interface RawEntity {
  id: number;
}

export interface RewardItem {
  id: number;
  quantity: number;
}
