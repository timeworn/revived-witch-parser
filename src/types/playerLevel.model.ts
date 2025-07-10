export interface RawPlayerLevel {
  exp: number;
  id: number;
  roleMaxLv: number;
  strengthGet: number;
  strengthLimit: number;
  typeid: number;
  unlockAfter: number;
  unlockDungeon: number;
  unlockFunction: any[];
}

export interface PlayerLevel {
  id: number;
  exp: number;
  expTotal: number;
  charMaxLv: number;
  strengthGet: number;
  strengthLimit: number;
  typeId: number;
  unlockAfter: string | null;
  unlockDungeon: number;
}
