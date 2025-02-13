import { RWUtils } from "../../utils/RWUtils";

export class RWAlchemyLvl {
  id: number;
  exp: number;
  alchemyexplimit: number;
  alchemystage: number;
  byproductProbability: number;

  constructor(lvlId: number) {
    const lvlData = RWUtils.getAlchemyLv(lvlId);

    this.id = lvlData.id;
    this.exp = lvlData.exp;
    this.alchemyexplimit = lvlData.alchemyexplimit;
    this.alchemystage = lvlData.alchemystage;
    this.byproductProbability = lvlData.byproductProbability;
  }

  static getAlchemyLvls() {
    return RWUtils.getAlchemyLvData().map((value) => new RWAlchemyLvl(value.id));
  }

  getAlchemyLvl() {
    return RWUtils.getAlchemyLv(this.id);
  }

  toString() {
    return [] as string[];
  }

  toJson() {
    return {
      id: this.id,
      exp: this.exp,
      alchemyexplimit: this.alchemyexplimit,
      alchemystage: this.alchemystage,
      byproductProbability: this.byproductProbability,
    };
  }
}
