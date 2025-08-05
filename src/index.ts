import { CharacterParser } from "src/parsers/character";
import { logger } from "src/utils/logger";
import { AffiliationParser } from "src/parsers/affiliation";
import { loadLocalizationFiles, parseEntities, reCreateFolder } from "src/utils/utils";
import { BUILD_DIR, LOCALES } from "src/Constants";
import { ElementParser } from "src/parsers/element";
import { VocationParser } from "src/parsers/vocation";
import { RarityParser } from "src/parsers/rarity";
import { PlayerLevelParser } from "src/parsers/playerLevel";
import { AvatarParser } from "src/parsers/avatar";
import { AvatarFrameParser } from "src/parsers/avatarFrame";
import { AchievementParser } from "src/parsers/achievement";
import { BadgeParser } from "src/parsers/badge";
import { MissionParser } from "src/parsers/mission";
import { MusicBoxParser } from "src/parsers/sound/musicBox";
import { AudioParser } from "src/parsers/sound/audio";
import { LocalizerLocale } from "src/utils/Localizer";
import { CharacterSoundParser } from "src/parsers/sound/characterSound";

logger.info("Loading localization files");
const localizers = await Promise.all(
  LOCALES.map(async (locale) => await loadLocalizationFiles(locale as LocalizerLocale))
);
logger.info(`Loaded ${localizers.length} localizers for ${LOCALES.length} locales`);

reCreateFolder(BUILD_DIR);

await parseEntities(localizers, "characters", CharacterParser);
await parseEntities(localizers, "affiliations", AffiliationParser);
await parseEntities(localizers, "elements", ElementParser);
await parseEntities(localizers, "vocations", VocationParser);
await parseEntities(localizers, "rarities", RarityParser);

await parseEntities(localizers, "playerLevels", PlayerLevelParser);
await parseEntities(localizers, "avatars", AvatarParser);
await parseEntities(localizers, "avatarFrames", AvatarFrameParser);

await parseEntities(localizers, "achievements", AchievementParser);
await parseEntities(localizers, "badges", BadgeParser);

await parseEntities(localizers, "missions", MissionParser);

await parseEntities(localizers, "sound", AudioParser);
await parseEntities(localizers, "sound", MusicBoxParser);
await parseEntities(localizers, "sound", CharacterSoundParser);
