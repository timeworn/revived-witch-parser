export interface RawVocation {
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

export interface Vocation {
  id: number;
  name: string | null;
  description: string | null;
  imgBackground: string | null;
  imgDescribe: string | null;
  imgDescribeBlue: string | null;
  imgDraw: string | null;
  imgEX: string | null;
  imgR: string | null;
  imgSR: string | null;
  imgSSR: string | null;
  imgUR: string | null;
  imgWhite: string | null;
}
