import { ApItem, ApOnlyItem, MaterialOnlyItem, RawItem, UEOnlyItem } from "src/types/item.model";
import { BaseParser } from "src/utils/BaseParser";
import { createRewardItems } from "src/utils/utils";
import cApItemConfigJson from "src/data/item/capitemconfig.json";
import cMaterialItemJson from "src/data/item/cmaterialitem.json";

export class DollItemParser extends BaseParser<RawItem, ApOnlyItem | MaterialOnlyItem> {
  transform(raw: RawItem): ApOnlyItem | MaterialOnlyItem {
    if (raw.itemtypeid === 42 || raw.itemtypeid === 138) {
      return this.transformAp(raw);
    }

    if (raw.itemtypeid !== 26) return {} as any;

    return {
      ...this.transformMaterial(raw),
    };
  }

  private transformAp(raw: RawItem): ApOnlyItem {
    const rawAp = cApItemConfigJson.Data[raw.id.toString() as keyof typeof cApItemConfigJson.Data];

    return {
      dailyLimit: rawAp.dailyLimitNum,
      currencyNeeded: rawAp.currencynums,
      itemGiven: createRewardItems([rawAp.itemids], [rawAp.itemnums]),
    };
  }

  private transformMaterial(raw: RawItem): MaterialOnlyItem {
    const rawMaterial = cMaterialItemJson.Data[raw.id.toString() as keyof typeof cMaterialItemJson.Data];
    if (rawMaterial?.ifEvolutionItem) return {} as any;
    return { isEvolutionItem: rawMaterial.ifEvolutionItem === 1 };
  }
}
