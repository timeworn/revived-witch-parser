import { RewardItem } from "src/types/base.model";

export interface RawAudio {
  cueName: string;
  cueSheet: string;
  id: number;
  required: number;
  volume: number;
}

export interface Audio {
  id: number;
  cueName: string | null;
  cueSheet: string | null;
  url: string | null;
  volume: number;
}

export interface RawAudioPlayerCell {
  album: number;
  albumImg: number;
  audioID: number;
  audioName: number;
  author: number;
  id: number;
  itemsAmount: number[];
  unlockItems: number[];
}

export interface AudioPlayerCell extends Audio {
  name: string | null;
  album: string | null;
  albumImage: string | null;
  artist: string | null;
  itemsNeeded: RewardItem[];
}
