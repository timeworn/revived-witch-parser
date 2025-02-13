import { RWCharacter } from "../classes/character/RWCharacter";
import { RWItem } from "../classes/item/RWItem";

export interface ICharacterConfig {
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

export interface ICharacterHandbook {
  affiliation: number;
  age: string;
  artistTextID: number;
  backStoryTextID: number[];
  birthday: number;
  cvTextIDChs: number;
  cvTextIDJpn: number;
  height: string;
  hobbyTextID: number;
  id: number;
  isShow: number;
  overseasArtistTextID: number;
  race: number;
  sexTextID: number;
  sortID: number;
  sortText: string;
  titleTextID: number[];
  unlockCondition: number[];
  unlockTime: string;
  vocal: number;
  weight: string;
}

export interface ICharacterSkillShowRoleData {
  attr: string[];
  exDiscribeTextID: number;
  id: number;
  nameTextID: number;
  rangeTextID: number;
  typeTextID: number;
}

export interface ICharacterSkillShowSoulData extends Omit<ICharacterSkillShowRoleData, "rangeTextID"> {}

export interface ICharacterSkillData {
  attackOrderToEmery: number;
  attackOrderToOur: number;
  attr: number;
  collideTime: number;
  colliderOrNot: number;
  effecttype: number;
  enemybuffValues: string;
  enemybuffid: string;
  friendbuffValues: string;
  friendbuffid: string;
  icon: number;
  id: number;
  skillLevel: number;
  skillStrength: number;
  spellTime: number;
  spellType: number;
  targetNumberToEmery: number;
  targetNumberToOur: number;
  type: number;
}

export interface ICharacterSkill {
  id: number;
  name?: string;
  icon?: string;
  description?: string;
}

export interface ICharacterRarityConfig {
  UEcharcelllarge: number;
  UEcharframe: number;
  UEcharframesmall: number;
  UEdownback: number;
  UEframeid: number;
  UEframeidsmall: number;
  breakLevelBackPolygon: number;
  breakLevelBackTriangle: number;
  charcelllarge: number;
  charframe: number;
  charframesmall: number;
  downback: number;
  drawinfo: number;
  evolutionEffect: number;
  frameid: number;
  frameidsmall: number;
  id: number;
  imgbigid: number;
  imgid: number;
  imgroleid: number;
  rankllarge: number;
  triangle: number;
  trianglelarge: number;
  yardCell: number;
}

export interface ICharacterRaceConfig {
  id: number;
  nameTextID: number;
  nameid: number;
}

export interface TextData {
  id: number;
  text: string;
}

export interface ICharacterProps {
  className?: string;
  character: RWCharacter;
}

export interface CImagePath {
  assetBundle: string;
  assetName: string;
  id: number;
}

export interface ICharacterAffiliationData {
  icon: number;
  id: number;
  name: string;
  nameTextID: number;
  unlockCondition: number;
}

export interface ICharacterAffiliation {
  icon?: string;
  id: number;
  name: string;
}

export interface ICharacterElementData {
  id: number;
  image: number;
  nameid: number;
}

export interface ICharacterElement {
  id: number;
  image?: string;
  name?: string;
}

export interface ICharacterVocationData {
  id: number;
  imgBackground: number;
  imgDescribe: number;
  imgDescribeBlue: number;
  imgDraw: number;
  imgEX: number;
  imgR: number;
  imgSR: number;
  imgSSR: number;
  imgUR: number;
  imgWhite: number;
  imgresource: number;
  nameTextID: number;
  nameid: number;
  vocationDescribe: string;
  vocationDescribeTextID: number;
}

export interface ICharacterVocation {
  id: number;
  imgDescribe?: string;
  name?: string;
}

export interface ICharacterRoleSkinData {
  id: number;
  skinID: number[];
}

export interface ICharacterSkinData {
  EffectTextID: number;
  action: number[];
  artistTextID: number;
  discribeTextID: number;
  getwayID: number;
  id: number;
  ifLive: number;
  overseasArtistTextID: number;
  roleid: number;
  shapeID: number;
  shapeType: number;
  skinItemID: number;
  skinNameTextID: number;
  skinType: number;
  year: number;
}

export interface ICharacterSkinCVData {
  cvTextIDChs: number;
  cvTextIDJpn: number;
  id: number;
}

export interface ICharacterShapeData {
  DiamondHeadID: number;
  SteadyState: number;
  assetBundleName: string;
  battleEmotion: string;
  bigbustID: number;
  bustID: number;
  dormPrefabName: string;
  drawShowID: number;
  headID: number;
  id: number;
  lihuiID: number;
  littleHeadID: number;
  live2DAssetBundleName: string;
  live2DPrefabName: string;
  live2DScale: number;
  mapPrefabName: string;
  photoLocation: number[];
  photoScale: number;
  prefabName: string;
  prefabNameUI: string;
  skillHeadID: number;
  type: number;
  yardPrefabName: string;
}

export interface ICharacterPixelAnimations {
  path: string;
  name: string;
}

export interface ICharacterSkin {
  id: number;
  name?: string;
  description?: string;
  thumbnail?: string;
  square?: string;
  card?: string;
  l2d?: {
    path?: string;
    name?: string;
  };
  pixelAnims?: ICharacterPixelAnimations[];
  artist?: string;
  overseasArtist?: string;
}

export interface ICharacterSkins {
  list: ICharacterSkin[];
  artist?: string;
  overseasArtist?: string;
  jpnCV?: string;
  chsCV?: string;
}

export interface ICharacterRarity {
  id?: number;
  icon?: string;
  name?: string;
}

export interface ItemData {
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

export interface ICharacterSpecialEquipData {
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

export interface ICharacterSpecialEquip {
  id?: number;
  icon?: string;
  name?: string;
  description?: string;
  effect?: string;
  evolution?: string;
}

export interface ICharacterL2DMotion {
  _fadeInSeconds: number;
  _fadeOutSeconds: number;
  _weight: number;
  _offsetSeconds: number;
  _firedEventValues: [];
  _eyeBlinkParameterIds: [];
  _lipSyncParameterIds: [];
  _sourceFrameRate: number;
  _loopDurationSeconds: number;
  _isLoop: boolean;
  _isLoopFadeIn: boolean;
  _lastWeight: number;
  _motionData: {
    duration: number;
    loop: boolean;
    curveCount: number;
    eventCount: number;
    fps: number;
    curves: [
      {
        id: string;
        type: number;
        segmentCount: number;
        baseSegmentIndex: number;
        fadeInTime: number;
        fadeOutTime: number;
      }
    ];
    segments: [
      {
        basePointIndex: number;
        segmentType: number;
      }
    ];
    points: [
      {
        time: number;
        value: number;
      }
    ];
    events: [
      {
        fireTime: number;
        value: string;
      }
    ];
  };
}

export interface ICharacterFavourExpData {
  EXfavourexp: number;
  Rfavourexp: number;
  SRfavourexp: number;
  SSRfavourexp: number;
  URfavourexp: number;
  favournameText: string;
  heartnum: number;
  id: number;
}

export interface ICharacterFavourPresentData {
  id: number;
  levelRewardID: number[];
  levelRewardType: number[];
  lvlmax: number;
  lvlupsound: number;
  lvluptxtid: number;
  storynumtxtid: number[];
}

export interface ICharacterFavourGiftTypeData {
  id: number;
  storyandlineid: number[];
}

export interface ICharacterFavourSkillData {
  id: number;
  skillattribution: string;
  skillattributiontxt: number;
}

export interface ICharacterBond {
  level: number;
  reward: string;
  exp: number;
}

export interface ICharacterStat {
  icon?: string;
  name: string;
  baseValue: number;
  addValue: number;
}

export interface ICharacterEvolutionData {
  addProperty: number;
  addPropertyValue: number;
  currentItem: string;
  evolutionLevel: number;
  evolutionType: number;
  exclusiveItem: string;
  id: number;
}

export interface ICharacterAttrEffectIdNameData {
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

export interface ICharacterEvolution {
  level: number;
  icon?: string;
  name: string;
  addValue: number;
}

export interface ICharacterStats {
  list: ICharacterStat[];
  evolutions: ICharacterEvolution[];
}

export interface ICharacterSoundLinesData {
  [key: string]: any;
  Adventure: number;
  Attacked: number[];
  BattleKill: number;
  BattleStart: number;
  Conversation: number[];
  Defeat: number;
  Dispatch: number;
  Emotion: number[];
  FavoriteGift: number;
  Formation: number;
  Impression: number[];
  Introduction: number;
  LevelUp: number;
  LifeHealing: number;
  LimitUp: number;
  Login: number;
  ManaTree: number;
  NormalGift: number;
  OpenBox: number;
  PosterGirlWelcome: number;
  PosterGirlWelcomeNewYear: number;
  RareUp: number;
  Revive: number;
  SkillCV: number[];
  Standby: number;
  Summory: number;
  Victory: number;
  Withdraw: number;
  YardTouch: number[];
  id: number;
  touch: number[];
}

export interface ICharacterSoundTitleData {
  id: number;
  otherTitle: number[];
  relationLevel: number[];
  relationTitle: number[];
}

export interface ICharacterSoundCatalogData extends ICharacterSoundLinesData {}

export interface ICharacterSoundHandbookData {
  Touchreactvoice: number[];
  id: number;
  otherVoice: number[];
  relationVoice: number[];
}

export interface ICharacterVoiceline extends ICSoundSourceData {
  name: string;
  description: string;
}

export interface ICharacterFavourPresentTypeData {
  exfavour: number;
  favour: number;
  id: number;
  presenttype: number;
  presenttypename: string;
  presentuplevel: number;
}

export interface ICharacterGift {
  id: number;
  name: string;
  description: string;
  icon?: string;
  favour: number;
  exfavour: number;
}

export interface ICharacterYardSkillData {
  alchemyProbability: number;
  alchemyType: string;
  desc: string;
  descTextID: number;
  dormEmotion: number;
  exploreSecondary: number;
  functionID: number;
  id: number;
  image: number;
  name: string;
  nameTextID: number;
}

export interface ICharacterYardSkill {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

export interface IHeadPhotoConfigData {
  description: string;
  descriptionTextID: number;
  id: number;
  name: string;
  nameTextID: number;
  order: number;
  photoid: number;
  unlockTime: string;
}

export interface ICEquipItemData {
  abilityID: number[];
  abilityValue: number[];
  abilitylookRange: string[];
  baseScore: number;
  equipAttrib: number;
  equipSkill: string;
  equipSuitid: number;
  handbook: number;
  id: number;
  initMagnify: number;
  lookRange: string[];
  randomAbility: number[];
  roleLimit: string;
}

export interface ICEquipHandbookData {
  abilityID: number[];
  abilityValue: number[];
  destribeTextID: number;
  equipNumber: string;
  equipSuitid: number;
  icon: number;
  id: number;
  initMagnify: number;
  isShow: number;
  itemType: number;
  nameTextID: number;
  randomAbility: number[];
  rarity: number;
}

export interface ICEquipSuitData {
  id: number;
  suitImg: number;
  suitName: number;
  suitSkillID: number[];
}

export interface ICItemClassToLoadData {
  id: number;
  name: string;
  nameTextID: number;
}

export interface ICAttrEffectIdNameData {
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

export interface ICUniqueEquipItemData {
  abilityID: number[];
  abilityValue: number[];
  id: number;
  initMagnify: number;
  roleid: number;
  unlockjump: number;
}

export interface ICUniqueEquipConfigData {
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

export interface ItemType {
  id: number;
  name?: string;
}

export interface ICFurnitureItemData {
  assetBundle: string;
  comfortPoint: number;
  cover: string;
  id: number;
  level: number;
  prefabName: string;
  putRange: string[];
  putRangeShow: number;
  type: number;
}

export interface ICFurnitureGroupData {
  description: string;
  descriptiontxtID: number;
  id: number;
  image: number;
  imageBig: number;
  imageBigBuy: number;
  items: number[];
  location: string[];
  name: string;
  nameTextID: number;
  showornot: number;
  timetxtID: number;
}

export interface ICFurnitureTypeData {
  id: number;
  imagenorm: number;
  imageselect: number;
  name: string;
  nameTextID: number;
  num: number;
}

export interface ICAudioPlayerCellData {
  album: number;
  albumImg: number;
  audioID: number;
  audioName: number;
  author: number;
  id: number;
  itemsAmount: number[];
  unlockItems: number[];
}

export interface ICAudioPlayerAlbumData {
  album: number;
  albumName: number;
  id: number;
}

export interface ICSoundSourceData {
  cueName: string;
  cueSheet: string;
  id: number;
  required: number;
  volume: number;
}

export interface ICLightTrainingCourseData {
  appearproportion: number;
  id: number;
  lightcostitem: number;
  lightcostnum: number;
  trainingexpgain: number;
  trainingnametxtid: number;
  trainingrarity: number;
  trainingtime: number;
}

export interface ICLightTrainingRarityData {
  id: number;
  manatransfer: number;
  trainingraritypicid: number;
  trainingraritytxtid: number;
  trainingunlocklvl: number;
}

export interface ICAchieveMissionConfigData {
  UIjumpvalue: number;
  achievePoint: number;
  badgeID: number;
  description: string;
  descriptionTextID: number;
  endevent: number;
  groupID: number;
  id: number;
  jumptype: number;
  jumpvalue: number[];
  missionname: string;
  missionnameTextID: number;
  missiontype: number;
  rewardid: number;
  rewarditem: number[];
  rewardquantity: number[];
  tabID: number;
  unlockcondition: string;
  unlockid: number;
}

export interface ICAchieveLevelConfigData {
  achievePoint: number;
  id: number;
  itemNum: number;
  rewardID: number;
  rewardItem: number;
}

export interface ICAchieveBadgeGroupData {
  badgeIDList: number[];
  id: number;
  nameTextID: number;
}

export interface ICAchieveBadgeConfigData {
  colorID: number;
  description: string;
  descriptionTextID: number;
  id: number;
  imageID: number;
  name: string;
  nameTextID: number;
}

export interface ICDailyMissonConfigData {
  UIjumpvalue: number;
  activevalue: number;
  description: string;
  descriptionTextID: number;
  endevent: number;
  id: number;
  instruction: string;
  instructionTextID: number;
  jumptype: number;
  jumpvalue: number[];
  missionname: string;
  missionnameTextID: number;
  missiontype: number;
  progressname: string[];
  progressnameTextID: number[];
  rewardid: number;
  rewarditem: number[];
  rewardquantity: number[];
  sortid: number;
  targettype: number;
  toptip: number[];
  unlockcondition: string;
  unlockid: number;
}

export interface ICDailyMissionAwardData {
  awardid: number[];
  id: number;
  num: number[];
}

export interface ICAlchemyFormulaData {
  emotionCost: number;
  getExp: number;
  id: number;
  items: number[];
  num: number[];
  outcome: number;
  outcomeNum: number;
  type: number;
  unlockLv: number;
}

export interface ICAlchemyFormulaTypeData {
  byproduct: number;
  id: number;
  image: number;
  typeName: string;
  typeNameTextID: number;
}

export interface ICAlchemyLvData {
  alchemyexplimit: number;
  alchemystage: number;
  byproductProbability: number;
  exp: number;
  id: number;
}

export interface ItemWithAmount {
  item: ReturnType<RWItem["toJson"]>;
  amount: number;
}

export interface ItemAmount {
  itemId: number;
  amount: number;
}
