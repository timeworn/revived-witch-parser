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
