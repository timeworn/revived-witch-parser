import { RewardItem } from "src/types/base.model";

export interface RawAchievement {
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

export interface Achievement {
  id: number;
  name: string | null;
  description: string | null;
  missionType: number;
  tabId: number;
  groupId: number;
  badgeId: number;
  points: number;
  rewards: RewardItem[];
  unlockAfter: string | null;
}
