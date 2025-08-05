import { BaseParser } from "src/utils/BaseParser";
import { PlayerLevel, RawPlayerLevel } from "src/types/playerLevel.model";
import cPlayerLevelJson from "src/data/role/cplayerlevel.json";
import { logger } from "src/utils/logger";

export class PlayerLevelParser extends BaseParser<RawPlayerLevel, PlayerLevel> {
  static getRaws(): RawPlayerLevel[] {
    return Object.values(cPlayerLevelJson.Data);
  }

  static getRaw(id: number): RawPlayerLevel | undefined {
    const raws = PlayerLevelParser.getRaws();
    return raws.find((raw) => raw.id === id);
  }

  transform(raw: RawPlayerLevel): PlayerLevel {
    return {
      id: raw.id,
      exp: raw.exp,
      expTotal: this.getExpTotal(raw.id),
      charMaxLv: raw.roleMaxLv,
      strengthGet: raw.strengthGet,
      strengthLimit: raw.strengthLimit,
      typeId: raw.typeid,
      unlockAfter: raw.unlockAfter !== 0 ? this.localizer.localize(raw.unlockAfter.toString()) : null,
      unlockDungeon: raw.unlockDungeon,
    };
  }

  private getExpTotal(target: number): number {
    let expTotal = 0;

    for (let level = 1; level < target; level++) {
      const previousRaw = cPlayerLevelJson.Data[level - 1];
      if (previousRaw) {
        expTotal += previousRaw.exp;
      }
    }

    return expTotal;
  }
}
