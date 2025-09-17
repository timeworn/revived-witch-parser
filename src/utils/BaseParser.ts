import { localizers } from "src/Constants";
import { Localizer } from "src/utils/Localizer";
import { logger } from "src/utils/logger";

export abstract class BaseParser<TRaw, TTransformed> {
  protected localizer: Localizer;

  constructor(localizer?: Localizer) {
    this.localizer = localizer || localizers[0];
  }

  static getRaws(): any[] {
    throw new Error("getRaws() is not implemented");
  }

  static getRaw(id: number): any | undefined {
    throw new Error("getRaw() is not implemented");
  }

  parse(id: number): TTransformed | null {
    logger.debug(`Parsing ${this.constructor.name.replace("Parser", "").toLowerCase()} with ID: ${id}`);

    const rawData = (this.constructor as any).getRaw(id);
    if (!rawData) {
      logger.warn(`${this.constructor.name.replace("Parser", "")} with ID ${id} not found`);
      return null;
    }

    return this.transform(rawData);
  }

  parseAll(): TTransformed[] {
    logger.debug(`Parsing all ${this.constructor.name.replace("Parser", "").toLowerCase()}s`);

    const rawData = (this.constructor as any).getRaws();
    return rawData.map((raw: TRaw) => this.transform(raw));
  }

  findAndParse(predicate: (raw: TRaw) => boolean): TTransformed | null {
    const rawData = (this.constructor as any).getRaws();
    const raw = rawData.find(predicate);
    if (!raw) return null;
    return this.transform(raw);
  }

  abstract transform(raw: TRaw): TTransformed;

  setLocalizer(localizer: Localizer): void {
    this.localizer = localizer;
  }
}
