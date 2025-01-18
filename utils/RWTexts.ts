import { TextData } from "src/interfaces/CharacterInterfaces";
import enRoleJson from "src/data/characters/word/cwordrole_en.json";
import enWordHandbookJson from "src/data/characters/word/cwordhandbook_en.json";
import enHandbookJson from "src/data/characters/handbook/cwordhandbook_en.json";
import enCRoleWordJson from "src/data/characters/role/cwordrole_en.json";
import enCWordItemJson from "src/data/characters/word/cworditem_en.json";
import enCWordSkillJson from "src/data/characters/word/cwordskill_en.json";
import enCWordEquipJson from "src/data/characters/word/cwordequip_en.json";
import enCWordRoleJson from "src/data/characters/word/cwordrole_en.json";

const enRoleData: { [key: string]: TextData | undefined } = enRoleJson.Data;
const enHandbookData: { [key: string]: TextData | undefined } =
  enHandbookJson.Data;
const enCRoleWordData: { [key: string]: TextData | undefined } =
  enCRoleWordJson.Data;
const enWordHandbookData: { [key: string]: TextData | undefined } =
  enWordHandbookJson.Data;
const enWordItemData: { [key: string]: TextData | undefined } =
  enCWordItemJson.Data;
const enWordSkillData: { [key: string]: TextData | undefined } =
  enCWordSkillJson.Data;
const enWordEquipData: { [key: string]: TextData | undefined } =
  enCWordEquipJson.Data;
const enCWordRoleData: { [key: string]: TextData | undefined } =
  enCWordRoleJson.Data;

export namespace RWCTexts {
  export const geWordRole = (textId: number) => enRoleData[textId]?.text;

  export const getHandbookWord = (textId: number) =>
    enHandbookData[textId]?.text;

  export const getRoleWord = (textId: number) => enCRoleWordData[textId]?.text;

  export const getWordRole = (textId: number) => enCWordRoleData[textId]?.text;

  export const getWordHandbook = (textId: number) =>
    enWordHandbookData[textId]?.text;

  export const getWordItem = (textId: number) => enWordItemData[textId]?.text;

  export const getWordSkill = (textId: number) => enWordSkillData[textId]?.text;

  export const getWordEquip = (textId: number) => enWordEquipData[textId]?.text;
}
