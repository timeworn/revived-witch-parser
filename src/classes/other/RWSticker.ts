import { getImageUrl } from "../../hooks/getImage";

const RW_CDN = "rw/cdn/GLOBAL";

const stickers: string[] = [];

for (let index = 1; index <= 23; index++) {
  stickers.push(getImageUrl(`${RW_CDN}/stickers/${index}.webp`));
}

export namespace RWStickers {
  export const getStickers = () => stickers;

  export const getSticker = (id: number) => stickers[id - 1];
}
