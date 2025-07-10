export interface RawCharacter {
  addatkspeed: number;
  addattack: number;
  adddef: number;
  addhp: number;
  addmagicDef: number;
  addspeed: number;
  assistSkillid: number;
  atkspeed: number;
  attack: number;
  attackID: number;
  breakMultiple: number[];
  breakType: number;
  breakaddattack: number;
  breakadddef: number;
  breakaddhp: number;
  breakaddmagicDef: number;
  comborate1: number;
  comborate2: number;
  contractskillid: number;
  contractskillid2: number;
  contractskillid3: number;
  damagetype: number;
  def: number;
  defaultBuff: string;
  element: number;
  evolutionLimit: number;
  evolutionType: number;
  favourgift: number;
  hitornothit: number;
  hitproportion: number;
  hp: number;
  id: number;
  magicDef: number;
  name: string;
  nameTextID: number;
  rarity: number;
  roleEquipType: string;
  roleLine: string;
  roleLineTextID: number;
  shapeID: number;
  silentFraps: number;
  slackoffproportion: number;
  speed: string;
  titleTextID: number;
  uniqueequipid: number;
  uniqueequipidunlocktime: string;
  victoryTalk: string;
  victoryTalkTextID: number;
  vocation: number;
  yardskillid: number[];
}

export interface CharacterStats {
  atkspeed: number;
  attack: number;
  def: number;
  hp: number;
  magicDef: number;
  speed: number;
}

export interface CharacterSkill {
  id: number;
  type: "assist" | "contract" | "yard";
}

export interface CharacterPixelAnim {
  id: number;
  name: string;
  url: string;
}

export interface CharacterSkin {
  id: number;
  name: string | null;
  description: string | null;
  artist: string | null;
  overseasArtist: string | null;
  card: string | null;
  diamond: string | null;
  gacha: string | null;
  longCard: string | null;
  round: string | null;
  square: string | null;
  stone: string | null;
  team: string | null;
  pixelAnims: CharacterPixelAnim[];
  l2d: {
    name: string;
    url: string | null;
  } | null;
}

export interface CharacterBuildBase {
  id: number;
  name: string | null;
  element: number | null;
  rarity: number | null;
  title: string | null;
  vocation: number | null;
}

export interface CharacterBuildHandbook {
  affiliation: number | null;
  age: string | null;
  artist: string | null;
  artistOverseas: string | null;
  backstories: string[];
  birthday: string | null;
  height: string | null;
  hobby: string | null;
  race: string | null;
  sex: string | null;
  unlockCondition: string[];
  weight: string | null;
}

export interface CharacterBuildAppearance {
  skins: CharacterSkin[];
  roleLine: string | null;
  victoryTalk: string | null;
}

export interface CharacterBuildCombat {
  damageType: number | null;
  evolutionLimit: number | null;
  baseStats: CharacterStats;
  growthStats: CharacterStats;
  breakStats: Pick<CharacterStats, "attack" | "def" | "hp" | "magicDef">;
  skills: CharacterSkill[];
  uniqueEquipment: number | null;
}

export interface CharacterBuildOther {
  gifts: number[];
  roleEquipType: string | null;
  shapeID: number | null;
}

export interface Character
  extends CharacterBuildBase,
    CharacterBuildHandbook,
    CharacterBuildAppearance,
    CharacterBuildCombat,
    CharacterBuildOther {}
