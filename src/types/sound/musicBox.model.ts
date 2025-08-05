import { RewardItem } from "src/types/base.model";
import { Audio } from "src/types/sound/audio.model";

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
