export interface RawAffiliation {
  icon: number;
  id: number;
  name: string;
  nameTextID: number;
  unlockCondition: number;
}

export interface Affiliation {
  id: number;
  name: string | null;
  icon: string | null;
}
