import { RWUtils } from "../../utils/RWUtils";
import { ItemAmount } from "src/interfaces/CharacterInterfaces";

export class RWAlchemyFormula {
  id: number;
  unlockLv: number;
  type: number;
  emotionCost: number;
  getExp: number;
  itemsNeeded: ItemAmount[];
  itemsGiven: ItemAmount[];

  constructor(formulaId: number) {
    const formulaData = RWUtils.getAlchemyFormula(formulaId);

    this.id = formulaData.id;
    this.unlockLv = formulaData.unlockLv;
    this.type = formulaData.type;
    this.emotionCost = formulaData.emotionCost;
    this.getExp = formulaData.getExp;
    this.itemsNeeded = RWUtils.createItemAmount(
      formulaData.items,
      formulaData.num,
    );
    this.itemsGiven = RWUtils.createItemAmount(
      formulaData.outcome,
      formulaData.outcomeNum,
    );
  }

  static getFormulas() {
    return Object.values(RWUtils.getAlchemyFormulaData()).map(
      (value) => new RWAlchemyFormula(value.id),
    );
  }

  getFormula() {
    return RWUtils.getAlchemyFormula(this.id);
  }

  getFormulaType() {
    return RWUtils.getAlchemyFormulaType(this.type);
  }

  getItemsNeeded() {
    return RWUtils.createItemWithAmount(this.itemsNeeded);
  }

  getItemGiven() {
    return RWUtils.createItemWithAmount(this.itemsGiven)[0];
  }

  toString() {
    return [] as string[];
  }
}
