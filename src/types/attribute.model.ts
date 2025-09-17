export interface RawAttribute {
  ablEffctId: number;
  ablEffctName: string;
  ablLimit: number;
  attrname: string;
  basicattr: string;
  classIcon: number;
  classgrowthname: string;
  classgrowthnameTextID: number;
  classname: string;
  classnameTextID: number;
  id: number;
  initValue: number;
  isDecimal: number;
  pctEffctId: number;
  pctEffctName: string;
  pctLimit: number;
}

export interface Attribute {
  id: number;
  name: string | null;
  growthName: string | null;
  icon: string | null;
  isDecimal: boolean;
  initialValue: number;
  attrName: string | null;
  basicAttr: string | null;
  ablEffectId: number;
  ablEffectName: string | null;
  ablLimit: number;
  pctEffectId: number;
  pctEffectName: string | null;
  pctLimit: number;
}
