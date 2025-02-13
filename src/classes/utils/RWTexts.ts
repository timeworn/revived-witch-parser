import { TextData } from "../../interfaces/CharacterInterfaces";
import enRoleJson from "../../data/characters/word/cwordrole_en.json";
import enWordHandbookJson from "../../data/characters/word/cwordhandbook_en.json";
import enHandbookJson from "../../data/characters/handbook/cwordhandbook_en.json";
import enCRoleWordJson from "../../data/characters/role/cwordrole_en.json";
import enCWordItemJson from "../../data/characters/word/cworditem_en.json";
import enCWordSkillJson from "../../data/characters/word/cwordskill_en.json";
import enCWordEquipJson from "../../data/characters/word/cwordequip_en.json";
import enCWordRoleJson from "../../data/characters/word/cwordrole_en.json";
import enWordYardJson from "../../data/characters/word/cwordyard_en.json";
import enWordHeadJson from "../../data/characters/word/cwordhead_en.json";
import enWordTaskJson from "../../data/characters/word/cwordtask_en.json";

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
const enWordYardData: { [key: string]: TextData | undefined } =
  enWordYardJson.Data;
const enWordHeadData: { [key: string]: TextData | undefined } =
  enWordHeadJson.Data;
const enWordTaskData: { [key: string]: TextData | undefined } =
  enWordTaskJson.Data;

export namespace RWTexts {
  export const fixFormatting = (text: string | undefined) =>
    text?.replace(/\$B\$/g, " ");

  export const geWordRole = (textId: number | undefined) =>
    textId ? enRoleData[textId]?.text : undefined;

  export const getHandbookWord = (textId: number | undefined) =>
    textId ? enHandbookData[textId]?.text : undefined;

  export const getRoleWord = (textId: number | undefined) =>
    textId ? enCRoleWordData[textId]?.text : undefined;

  export const getWordRole = (textId: number | undefined) =>
    textId ? enCWordRoleData[textId]?.text : undefined;

  export const getWordHandbook = (textId: number | undefined) =>
    textId ? enWordHandbookData[textId]?.text : undefined;

  export const getWordItem = (textId: number | undefined) =>
    textId ? enWordItemData[textId]?.text : undefined;

  export const getWordSkill = (textId: number | undefined) =>
    textId ? enWordSkillData[textId]?.text : undefined;

  export const getWordEquip = (textId: number | undefined) =>
    textId ? enWordEquipData[textId]?.text : undefined;

  export const getWordYard = (textId: number | undefined) =>
    textId ? enWordYardData[textId]?.text : undefined;

  export const getWordHead = (textId: number | undefined) =>
    textId ? enWordHeadData[textId]?.text : undefined;

  export const getWordTask = (textId: number | undefined) =>
    textId ? enWordTaskData[textId]?.text : undefined;
}
