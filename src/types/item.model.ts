import { Attribute } from "src/types/attribute.model";
import { RewardItem } from "src/types/base.model";

export interface RawItem {
  Rank: number;
  access: string[];
  destribe: string;
  destribeTextID: number;
  icon: number;
  id: number;
  itemtypeid: number;
  maxNum: number;
  name: string;
  nameTextID: number;
  page: number;
  pinJi: number;
  resolvegetitem: number[];
  resolvegetitemnum: number[];
  timeLimited: number;
}

export interface Item {
  id: number;
  name: string | null;
  description: string | null;
  icon: string | null;
  type: string | null;
  typeId: number;
  maxNum: number;
  limited: boolean;
  timeLimit: number;
  discardRewards: RewardItem[];
}

export interface RawUEItem {
  UniqueEquipid: number;
  attrid: number[];
  attrnum: number[];
  evolutionnum: string[];
  evolutiontext: number;
  id: number;
  itemId: number[];
  itemNum: number[];
  level: number;
  mana: number;
  noevolutiontext: number;
  skillid: number;
}

export type UEItem = Item & UEOnlyItem;

export interface UEOnlyItem {
  characterId: number | null;
  character: string | null;
  evolutions: UEItemEvolution;
  noEvolution: string | null;
  skills: UEItemSkill[];
  upgrades: UEItemUpgrade[];
  stats: UEItemStat[];
}

export interface UEItemUpgrade {
  id: number;
  level: number;
  mana: number;
  itemsNeeded: RewardItem[];
}

export interface UEItemStat {
  level: number;
  attributes: UEItemAttribute[];
}

export interface UEItemAttribute extends Pick<Attribute, "id" | "name" | "isDecimal"> {
  value: number;
}

export type UEItemEvolution = string | null;

export interface UEItemSkill {
  id: number;
  level: number;
  value: string | null;
}

export interface RawApItem {
  currencynums: number;
  dailyLimitNum: number;
  id: number;
  itemids: number;
  itemnums: number;
}

export type ApItem = Item & ApOnlyItem;

export interface ApOnlyItem {
  dailyLimit: number;
  currencyNeeded: number;
  itemGiven: RewardItem[];
}

export interface RawMaterialItem {
  id: number;
  ifEvolutionItem: number;
}

export interface MaterialOnlyItem {
  isEvolutionItem: boolean;
}

export type MaterialItem = Item & MaterialOnlyItem;

export interface RawDollItem {
  id: number;
  roleid: number;
}

export interface DollOnlyItem {
  characterId: number;
}

export type DollItem = Item & DollOnlyItem;
