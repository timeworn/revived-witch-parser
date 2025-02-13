import { RWCharacter } from "./classes/character/RWCharacter";
import { RWAvatar } from "./classes/avatar/RWAvatar";
import { RWAvatarFrame } from "./classes/avatar/RWAvatarFrame";
import { RWEquipmentItem } from "./classes/item/RWEquipmentItem";
import { RWUniqueEquipmentItem } from "./classes/item/RWUniqueEquipmentItem";
import { RWFurnitureItem } from "./classes/item/RWFurnitureItem";
import { RWGiftItem } from "./classes/item/RWGiftItem";
import { RWAccountLevel } from "./classes/other/RWAccountLevel";
import { RWStickers } from "./classes/other/RWSticker";
import { RWAchievement } from "./classes/task/RWAchievement";
import { RWBadge } from "./classes/task/RWBadge";
import { DataSource } from "./index";
import { RWDailyMission } from "./classes/task/RWDailyMission";
import { RWDailyMissionAward } from "./classes/task/RWDailyMissionAward";
import { RWLevelReward } from "./classes/task/RWLevelReward";
import { RWLightTraining } from "./classes/yard/RWLightTraining";
import { RWAlchemyFormula } from "./classes/yard/alchemy/RWAlchemyFormula";
import { RWAlchemyFormulaType } from "./classes/yard/alchemy/RWAlchemyFormulaType";
import { RWAlchemyLvl } from "./classes/yard/alchemy/RWAlchemyLv";
import { RWBgm } from "./classes/yard/music/RWBgm";
import { RWMusicBox } from "./classes/yard/music/RWMusicBox";
import { RWSoundEffects } from "./classes/yard/music/RWSoundEffects";
import { RWVoice } from "./classes/yard/music/RWVoice";

export const DATA_SOURCES: DataSource[] = [
  { name: "characters", getData: () => RWCharacter.getCharacters() },
  { name: "elements", getData: () => RWCharacter.getElements() },
  { name: "vocations", getData: () => RWCharacter.getVocations() },
  { name: "avatars", getData: () => RWAvatar.getAvatars().map((avatar) => avatar.toJson()) },
  { name: "avatarFrames", getData: () => RWAvatarFrame.getAvatarFrames().map((frame) => frame.toJson()) },
  { name: "equipmentItems", getData: () => RWEquipmentItem.getEquipments().map((equip) => equip.toJson()) },
  {
    name: "uniqueEquipmentItems",
    getData: () => RWUniqueEquipmentItem.getUniqueEquipments().map((equip) => equip.toJson()),
  },
  { name: "furnitureItems", getData: () => RWFurnitureItem.getFurniture().map((furniture) => furniture.toJson()) },
  { name: "giftItems", getData: () => RWGiftItem.getGifts().map((gift) => gift.toJson()) },
  { name: "accountLevels", getData: () => RWAccountLevel.getLevels() },
  { name: "stickers", getData: () => RWStickers.getStickers() },
  { name: "achievements", getData: () => RWAchievement.getAchievements().map((achievement) => achievement.toJson()) },
  { name: "badges", getData: () => RWBadge.getBadges().map((badge) => badge.toJson()) },
  { name: "dailyMissions", getData: () => RWDailyMission.getDailyMissions().map((mission) => mission.toJson()) },
  {
    name: "dailyMissionAwards",
    getData: () => RWDailyMissionAward.getDailyMissionAwards().map((award) => award.toJson()),
  },
  { name: "levelRewards", getData: () => RWLevelReward.getLevelRewards().map((reward) => reward.toJson()) },
  { name: "alchemyFormulas", getData: () => RWAlchemyFormula.getFormulas().map((formula) => formula.toJson()) },
  { name: "alchemyFormulaTypes", getData: () => RWAlchemyFormulaType.getFormulaTypes().map((type) => type.toJson()) },
  { name: "alchemyLevels", getData: () => RWAlchemyLvl.getAlchemyLvls().map((lvl) => lvl.toJson()) },
  { name: "backgroundMusic", getData: () => new RWBgm().toJson() },
  { name: "musicBox", getData: () => RWMusicBox.getMusic().map((music) => music.toJson()) },
  { name: "soundEffects", getData: () => new RWSoundEffects().toJson() },
  { name: "voicelines", getData: () => new RWVoice().toJson() },
  { name: "lightTrainings", getData: () => RWLightTraining.getLightTrainings().map((training) => training.toJson()) },
];
