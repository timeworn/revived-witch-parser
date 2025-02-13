import cPlayerLevelJson from "../../data/characters/role/cplayerlevel.json";

export namespace RWAccountLevel {
  export const getLevel = (level: number) => cPlayerLevelJson.Data[level - 1];

  export const getLevels = () => cPlayerLevelJson.Data;
}
