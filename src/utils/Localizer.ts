import { logger } from "src/utils/logger";

export type LocalizerLocale = "en" | "jp" | "ch" | "kr";

export class Localizer {
  private local: Record<string, string>;
  public readonly locale: LocalizerLocale;

  constructor(locale: LocalizerLocale, local: Record<string, string> = {}) {
    this.local = local;
    this.locale = locale;
  }

  addLocalization(local: Record<string, string>): void {
    const duplicateKeys = Object.keys(local).filter((key) => key in this.local);
    if (duplicateKeys.length > 0) {
      logger.warn(`Duplicate localization keys found: ${duplicateKeys.join(", ")}`);
    }
    this.local = { ...this.local, ...local };
  }

  addRawLocalization(local: Record<string, { id: number; text: string }>): void {
    const newLocal: Record<string, string> = {};
    for (const [key, value] of Object.entries(local)) {
      newLocal[key] = value.text;
    }
    this.addLocalization(newLocal);
  }

  localize(key?: string | number): string | null {
    if (typeof key === "number") {
      key = key.toString();
    }
    return key ? this.local[key] ?? null : null;
  }

  localizeArray(keys: string[]): (string | null)[] {
    return keys.map((key) => this.localize(key));
  }
}
