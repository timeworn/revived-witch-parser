// @ts-ignore
// const baseImageUrl = "https://cdn.timeworn.net/";

export const getImageUrl = (path: string | undefined): string => {
  return `/${path}`;
  // return new URL(`${baseImageUrl}${path}`, import.meta.url).href;
};
