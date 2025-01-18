import {
  ICharacterAffiliation,
  ICharacterElement,
  ICharacterVocation,
  ICharacterVocationData,
  ICharacterElementData,
  ICharacterSkins,
  ICharacterRarity,
  ICharacterSkill,
  ICharacterSpecialEquip,
  ICharacterBond,
  ICharacterStats,
  ICharacterVoiceline,
} from "src/interfaces/CharacterInterfaces";

import { getImageUrl } from "src/hooks/getImage";
import { RWCUtils } from "./utils/RWUtils";
import { RWCTexts } from "./utils/RWTexts";
import { RWCAttributes } from "./utils/RWAttributes";
import { RWCBasic } from "./utils/RWBasic";
import { RWCAppearance } from "./utils/RWAppearance";
import { RWCCombat } from "./utils/RWCombat";
import { RWCAudio } from "./utils/RWAudio";

export class RWCharacter {
  id: number;
  name?: string;
  title?: string;
  skins: ICharacterSkins;
  frame?: string;
  skills: ICharacterSkill[];
  rarity?: ICharacterRarity;
  unknown: boolean;
  element?: ICharacterElement;
  vocation?: ICharacterVocation;
  equipment: ICharacterSpecialEquip;
  affiliation?: ICharacterAffiliation;
  backstories: string[];
  sex?: string;
  birthday?: string;
  height?: string;
  weight?: string;
  hobby?: string;
  race?: string;
  age?: string;
  bonds: ICharacterBond[];
  stats: ICharacterStats;
  voicelines: ICharacterVoiceline[] = [];
  visible: boolean = true;

  constructor(id: number) {
    this.id = id;
    this.name = RWCBasic.getName(id);
    this.title = RWCBasic.getTitle(id);
    this.skins = RWCAppearance.getSkins(id);
    this.frame = RWCAppearance.getFrame(id);
    this.skills = RWCCombat.getSkills(id);
    this.rarity = RWCAttributes.getRarity(id);
    this.unknown = false;
    this.element = RWCAttributes.getElement(id);
    this.vocation = RWCAttributes.getVocation(id);
    this.equipment = RWCCombat.getEquipment(id) as ICharacterSpecialEquip;
    this.affiliation = RWCAttributes.getAffiliation(id);
    this.backstories = RWCBasic.getBackstories(id) as string[];
    this.sex = RWCBasic.getSex(id);
    this.birthday = RWCBasic.getBirthday(id);
    this.height = RWCBasic.getHeight(id);
    this.weight = RWCBasic.getWeight(id);
    this.hobby = RWCBasic.getHobby(id);
    this.race = RWCBasic.getRace(id);
    this.age = RWCBasic.getAge(id);
    this.bonds = RWCAttributes.getBond(id);
    this.stats = RWCCombat.getStat(id);
    this.voicelines = RWCAudio.getVoiceline(id);
  }

  async init() {
    this.unknown = await RWCBasic.getUnknown(this);
  }

  static getCharacters() {
    return RWCUtils.getConfigJson().AllIds.map((id) => {
      return new RWCharacter(id);
    });
  }

  static getElements() {
    const elements = RWCAttributes.getElements();

    return RWCUtils.getElementConfigJson().AllIds.map((id) => {
      const elementConfig = RWCUtils.getElementConfig(
        id - 1,
      ) as ICharacterElementData;
      const element: ICharacterElement = {
        id,
        name: RWCTexts.geWordRole(elementConfig.nameid),
        image: getImageUrl(elements[elementConfig.image]),
      };

      return element;
    });
  }

  static getVocations() {
    const vocationJson = RWCUtils.getVocationConfigJson();
    const vocations = RWCAttributes.getVocations();

    return vocationJson.AllIds.map((id) => {
      const vocationConfig = RWCUtils.getVocationConfig(
        id - 1,
      ) as ICharacterVocationData;
      const vocation: ICharacterVocation = {
        id,
        name: RWCTexts.geWordRole(vocationConfig.nameTextID),
        imgDescribe: getImageUrl(vocations[id]),
      };

      return vocation;
    });
  }
}
