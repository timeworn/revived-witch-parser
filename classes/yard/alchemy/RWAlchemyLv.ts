import { RWUtils } from "../../utils/RWUtils";

export class RWAlchemyLvl {
  id: number;
  exp: number;
  alchemyexplimit: number;
  alchemystage: number;
  byproductProbability: number;

  constructor(lvlId: number) {
    const lvlData = RWUtils.getAlchemyLv(lvlId - 1);

    this.id = lvlData.id;
    this.exp = lvlData.exp;
    this.alchemyexplimit = lvlData.alchemyexplimit;
    this.alchemystage = lvlData.alchemystage;
    this.byproductProbability = lvlData.byproductProbability;
  }

  static getAlchemyLvls() {
    return RWUtils.getAlchemyLvData().map(
      (value) => new RWAlchemyLvl(value.id),
    );
  }

  getAlchemyLvl() {
    return RWUtils.getAlchemyLv(this.id);
  }

  toString() {
    return [] as string[];
  }
}
