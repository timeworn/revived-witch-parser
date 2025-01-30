import { RWUtils } from "../../utils/RWUtils";
import { RWTexts } from "src/classes/utils/RWTexts";

export class RWAlchemyFormulaType {
  id: number;
  typeNameTextID: number;
  image: number;
  byproduct: number;

  constructor(formulaTypeId: number) {
    const formulaTypeData = RWUtils.getAlchemyFormulaType(formulaTypeId - 1);

    this.id = formulaTypeData.id;
    this.typeNameTextID = formulaTypeData.typeNameTextID;
    this.image = formulaTypeData.image;
    this.byproduct = formulaTypeData.byproduct;
  }

  static getFormulaTypes() {
    return RWUtils.getAlchemyFormulaTypeData().map(
      (value) => new RWAlchemyFormulaType(value.id),
    );
  }

  getFormulaType() {
    return RWUtils.getAlchemyFormulaType(this.id);
  }

  getName() {
    return RWTexts.getWordYard(this.typeNameTextID) ?? "?";
  }

  getImage() {
    return RWUtils.getRWAssetImage(this.image);
  }

  toString() {
    return [] as string[];
  }
}
