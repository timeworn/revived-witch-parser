import { Localizer } from "src/utils/Localizer";
import {
  Character,
  CharacterBuildAppearance,
  CharacterBuildBase,
  CharacterBuildCombat,
  CharacterBuildHandbook,
  CharacterBuildOther,
  CharacterSkin,
  RawCharacter,
} from "src/types/character.model";
import { logger } from "src/utils/logger";
import roleConfigJson from "src/data/role/roleconfig.json";
import { getAssetImage, getAssetName, getL2DImage } from "src/utils/utils";
import cCardRoleConfigJson from "src/data/handbook/ccardroleconfig_handbook.json";
import cRoleSkinJson from "src/data/role/croleskin.json";
import cSkinJson from "src/data/role/cskin.json";
import nNpcShapeJson from "src/data/npc/cnpcshape.json";
import cFavourPresentTypeJson from "src/data/role/cfavourpresenttype.json";
import { BaseParser } from "src/utils/BaseParser";

// Override specific character names
const NAMES: Record<string, string> = {
  $heroine$: "Witch",
};

// There is no mention of races anywhere in the archive
const RACES = [
  "Human",
  "Elf",
  "Beast",
  "Demon",
  "Giant",
  "Slime",
  "?",
  "Ancient God",
  "Holy Spirit",
  "Dragon",
  "Renditionist",
  "Machinery",
  "Werewolf",
  "Fallen Angel",
  "Angel",
  "Vampire",
  "Void",
];

const getCardRoleConfig = (
  id: number
): (typeof cCardRoleConfigJson.Data)[keyof typeof cCardRoleConfigJson.Data] | undefined => {
  return cCardRoleConfigJson.Data[id as unknown as keyof typeof cCardRoleConfigJson.Data];
};

export class CharacterParser extends BaseParser<RawCharacter, Character> {
  static getRaw(id: number): RawCharacter | undefined {
    const raws = CharacterParser.getRaws();
    return raws.find((character) => character.id === id);
  }

  static getRaws(): RawCharacter[] {
    return Object.values(roleConfigJson.Data);
  }

  transform(raw: RawCharacter): Character {
    logger.debug(`Transforming character: ${raw.id} (${this.localizer.localize(raw.nameTextID.toString())})`);
    return {
      ...this.getBase(raw),
      ...this.getHandbook(raw),
      ...this.getAppearance(raw),
      ...this.getCombat(raw),
      ...this.getOther(raw),
    };
  }

  private getBase(raw: RawCharacter): CharacterBuildBase {
    const name = this.localizer.localize(raw.nameTextID.toString());
    return {
      id: raw.id,
      name: name !== null ? NAMES[name] || name : name,
      title: this.localizer.localize(raw.titleTextID),
      rarity: raw.rarity ?? null,
      element: raw.element ?? null,
      vocation: raw.vocation ?? null,
    };
  }

  private getHandbook(raw: RawCharacter): CharacterBuildHandbook {
    const handbook = getCardRoleConfig(raw.id);

    return {
      affiliation: handbook?.affiliation ?? null,
      age: handbook?.age ?? null,
      artist: this.localizer.localize(handbook?.artistTextID),
      artistOverseas: this.localizer.localize(handbook?.overseasArtistTextID),
      backstories: handbook ? this.getBackstories(handbook) : [],
      birthday: this.localizer.localize(handbook?.birthday),
      height: handbook?.height ?? null,
      hobby: this.localizer.localize(handbook?.hobbyTextID),
      race: this.getRace(handbook?.race),
      sex: this.localizer.localize(handbook?.sexTextID),
      unlockCondition: [],
      weight: handbook?.weight ?? null,
    };
  }

  private getAppearance(raw: RawCharacter): CharacterBuildAppearance {
    const skinIds = cRoleSkinJson.Data[raw.id as unknown as keyof typeof cRoleSkinJson.Data];

    const skins = skinIds.skinID
      .map((skinId) => this.createSkin(raw, skinId))
      .filter((skin): skin is CharacterSkin => skin !== null);

    return {
      skins,
      roleLine: this.localizer.localize(raw.roleLineTextID),
      victoryTalk: this.localizer.localize(raw.victoryTalkTextID),
    };
  }

  private getCombat(raw: RawCharacter): CharacterBuildCombat {
    return {
      damageType: raw.damagetype,
      evolutionLimit: raw.evolutionLimit,
      baseStats: {
        atkspeed: raw.atkspeed,
        attack: raw.attack,
        def: raw.def,
        hp: raw.hp,
        magicDef: raw.magicDef,
        speed: parseFloat(raw.speed),
      },
      growthStats: {
        atkspeed: raw.addatkspeed,
        attack: raw.addattack,
        def: raw.adddef,
        hp: raw.addhp,
        magicDef: raw.addmagicDef,
        speed: raw.addspeed,
      },
      breakStats: {
        attack: raw.breakaddattack,
        def: raw.breakadddef,
        hp: raw.breakaddhp,
        magicDef: raw.breakaddmagicDef,
      },
      skills: [
        { id: raw.assistSkillid, type: "assist" },
        { id: raw.contractskillid, type: "contract" },
        { id: raw.contractskillid2, type: "contract" },
        { id: raw.contractskillid3, type: "contract" },
        ...raw.yardskillid.map((id) => ({ id, type: "yard" as const })),
      ],
      uniqueEquipmentId: raw.uniqueequipid,
    };
  }

  private getOther(raw: RawCharacter): CharacterBuildOther {
    const gifts = Object.values(cFavourPresentTypeJson.Data)
      .filter((present) => present.presenttype === raw.favourgift)
      .map((present) => present.id);

    return {
      gifts,
      roleEquipType: raw.roleEquipType,
      shapeID: raw.shapeID,
    };
  }

  private getBackstories = (handbook: NonNullable<ReturnType<typeof getCardRoleConfig>>): string[] => {
    if (!handbook.backStoryTextID) {
      return [];
    }

    return handbook.backStoryTextID
      .map((story) => this.localizer.localize(story.toString()))
      .filter((story): story is string => story !== null);
  };

  private getRace = (raceId?: number): string | null => {
    if (!raceId || raceId < 1 || raceId > RACES.length) return null;

    return RACES[raceId - 1];
  };

  private createSkin(raw: RawCharacter, skinId: number): CharacterSkin | null {
    const skinData = cSkinJson.Data[skinId as unknown as keyof typeof cSkinJson.Data];
    const skinShape = skinData && nNpcShapeJson.Data[skinData.shapeID as unknown as keyof typeof nNpcShapeJson.Data];

    if (!skinData || !skinShape) {
      logger.warn(`Skin or shape data not found for skinId: ${skinId} (${raw.id})`);
      return null;
    }

    const getL2dData = () => {
      const name = getAssetName(skinShape.live2DAssetBundleName);
      const url = getL2DImage(skinShape.live2DAssetBundleName);
      return name && url ? { name, url } : null;
    };

    return {
      id: skinData.id,
      name: this.localizer.localize(skinData.skinNameTextID),
      description: this.localizer.localize(skinData.discribeTextID),
      artist: this.localizer.localize(skinData.artistTextID),
      overseasArtist: this.localizer.localize(skinData.overseasArtistTextID.toString()),
      card: getAssetImage(skinShape.lihuiID),
      diamond: getAssetImage(skinShape.DiamondHeadID),
      gacha: getAssetImage(skinShape.drawShowID),
      longCard: getAssetImage(skinShape.bigbustID),
      round: getAssetImage(skinShape.skillHeadID),
      square: getAssetImage(skinShape.headID), // should be the same as littleHeadID
      stone: null, // citemattr
      team: getAssetImage(skinShape.bustID),
      pixelAnims: [], // https://github.com/lele394/Chronotower-s-library
      l2d: skinData.ifLive ? getL2dData() : null,
    };
  }
}
