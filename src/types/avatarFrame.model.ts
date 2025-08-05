export interface RawAvatarFrame {
  description: string;
  descriptionTextID: number;
  id: number;
  name: string;
  nameTextID: number;
  order: number;
  photoid: number;
  unlockTime: string;
  unlockcondition: number;
  unlockvisibleornot: number;
}

export interface AvatarFrame {
  id: number;
  name: string | null;
  description: string | null;
  image: string | null;
  order: number;
  unlockCondition: string | null;
}
