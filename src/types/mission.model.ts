import { RewardItem } from "src/types/base.model";

export interface RawBaseMission {
  UIjumpvalue: number;
  id: number;
  jumptype: number;
  jumpvalue: number[];
  missiontype: number;
}

export interface RawBaseMissionName {
  missionname: string;
  missionnameTextID: number;
}

export interface RawBaseMissionDescription {
  description: string;
  descriptionTextID: number;
}

export interface RawBaseMissionReward {
  rewardid?: number;
  rewardID?: number; // inconsistent naming in RawDailyTaskMission
  rewarditem: number[];
  rewardquantity: number[];
}

export interface RawMission
  extends RawBaseMission,
    RawBaseMissionName,
    RawBaseMissionDescription,
    RawBaseMissionReward {
  accept_mission: number;
  backgroundtype: number;
  branchmission_item: number;
  chapter: number;
  endevent: number;
  jumpAim: number;
  lastchapter: string;
  loadevent: string;
  loadtag: number;
  location: string;
  locationTextID: number;
  progressname: string[];
  progressnameTextID: number[];
  rewardtype: number;
  short_description: string;
  short_descriptionTextID: number;
  startevent: number;
  toptip: number[];
  unlockcondition: string;
  worldimg: number;
  worldname: number;
}

export interface RawActiveMission extends RawBaseMission, RawBaseMissionReward {
  descriptionTextID: number;
  endevent: number;
  jumpAim: number;
  unlockcondition: string;
  unlockid: number;
  worldname: number;
}

export interface RawDailyMission
  extends RawBaseMission,
    RawBaseMissionName,
    RawBaseMissionDescription,
    RawBaseMissionReward {
  activevalue: number;
  endevent: number;
  instruction: string;
  instructionTextID: number;
  progressname: string[];
  progressnameTextID: number[];
  sortid: number;
  targettype: number;
  toptip: number[];
  unlockcondition: string;
  unlockid: number;
}

export interface RawWeekMission
  extends RawBaseMission,
    RawBaseMissionName,
    RawBaseMissionDescription,
    RawBaseMissionReward {
  activevalue: number;
  endevent: number;
  instruction: string;
  instructionTextID: number;
  progressname: string[];
  progressnameTextID: number[];
  targettype: number;
  toptip: number[];
  unlockcondition: string;
}

export interface RawDailyTaskMission extends RawBaseMission, RawBaseMissionReward {
  endEvent: number;
  orderID: number;
  randomType: number;
  targetType: number;
  taskTextID: number;
  typeID: number;
  unlockcondition: number;
  unlockid: number;
}

export interface RawActiveMissionMod
  extends RawBaseMission,
    RawBaseMissionName,
    RawBaseMissionDescription,
    RawBaseMissionReward {
  activeID: number;
  endevent: number;
  missionImg: number;
  progresspath: string[];
  refreshType: number;
  sortid: number;
}

export interface RawBackMission extends RawBaseMission, RawBaseMissionReward {
  descriptionTextID: number;
  endevent: number;
  jumpAim: number;
  unlockcondition: string;
  unlockid: number;
  worldname: number;
}

export interface RawCharacterMission {}

export interface RawChildrensDayMission
  extends RawBaseMission,
    RawBaseMissionName,
    RawBaseMissionDescription,
    RawBaseMissionReward {
  endevent: number;
  progresspath: string[];
  sortid: number;
}

export interface RawCoinMission extends RawBaseMission, RawBaseMissionName, RawBaseMissionDescription {
  endevent: number;
  itemid: number;
  itemnum: number;
  jumpAim: number;
  missiontype: number;
  progresspath: string[];
  targettype: number;
}

export interface RawDailyGoldenMission {}

export interface RawElevenMission
  extends RawBaseMission,
    RawBaseMissionName,
    RawBaseMissionDescription,
    RawBaseMissionReward {
  endevent: number;
  jumpAim: number;
  missiontype: number;
  progresspath: string[];
  refreshType: number;
  sortid: number;
}

export interface RawFirstAnniversaryMission
  extends RawBaseMission,
    RawBaseMissionName,
    RawBaseMissionDescription,
    RawBaseMissionReward {
  endevent: number;
  missiontype: number;
  progresspath: string[];
  sortid: number;
}

export interface RawHalloweenMission
  extends RawBaseMission,
    RawBaseMissionName,
    RawBaseMissionDescription,
    RawBaseMissionReward {
  endevent: number;
  missiontype: number;
  progresspath: string[];
  sortid: number;
}

export interface RawJigsawMisson
  extends RawBaseMission,
    RawBaseMissionName,
    RawBaseMissionDescription,
    RawBaseMissionReward {
  endevent: number;
  missiontype: number;
  progresspath: string[];
  sortid: number;
}

export interface RawLoginMission extends RawBaseMission {
  UIjumpvalue: number;
  description: string[];
  descriptionTextID: number[];
  endevent: number;
  id: number;
  itemid: number;
  itemnum: number;
  jumpAim: number;
  jumptype: number;
  jumpvalue: number[];
  missionnameTextID: number;
  missiontype: number;
  progresspath: string[];
}

// this is a horrible workaround
type UnionKeys<T> = T extends any ? keyof T : never;

type UnionValues<T, K extends PropertyKey> = T extends any ? (K extends keyof T ? T[K] : never) : never;

type UnionToObject<T> = {
  [K in UnionKeys<T>]?: UnionValues<T, K>;
};

export interface RawAllMission
  extends UnionToObject<
    | RawActiveMission
    | RawActiveMissionMod
    | RawBackMission
    | RawCharacterMission
    | RawChildrensDayMission
    | RawCoinMission
    | RawDailyGoldenMission
    | RawDailyMission
    | RawDailyTaskMission
    | RawElevenMission
    | RawFirstAnniversaryMission
    | RawHalloweenMission
    | RawJigsawMisson
    | RawLoginMission
    | RawMission
    | RawWeekMission
  > {}

export interface BaseMission {
  id: number;
  name: string | null;
  description: string[] | string | null;
  shortDescription: string | null;
  missionType: number; // not using strings b/c english localization
  rewards: RewardItem[];
}
