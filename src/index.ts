import { CharacterParser } from "src/parsers/character";
import { logger } from "src/utils/logger";
import { AffiliationParser } from "src/parsers/affiliation";
import { loadLocalizationFiles, parseEntities, reCreateFolder } from "src/utils/utils";
import { BUILD_DIR, LOCALES } from "src/Constants";
import { ElementParser } from "src/parsers/element";
import { VocationParser } from "src/parsers/vocation";
import { RarityParser } from "src/parsers/rarity";
import { PlayerLevelParser } from "src/parsers/playerLevel";

logger.info("Loading localization files");
const localizers = await Promise.all(LOCALES.map(async (locale) => await loadLocalizationFiles(locale)));
logger.info(`Loaded ${localizers.length} localizers for ${LOCALES.length} locales`);

reCreateFolder(BUILD_DIR);

await parseEntities(localizers, "characters", CharacterParser);
await parseEntities(localizers, "affiliations", AffiliationParser);
await parseEntities(localizers, "elements", ElementParser);
await parseEntities(localizers, "vocations", VocationParser);
await parseEntities(localizers, "rarities", RarityParser);

await parseEntities(localizers, "playerLevels", PlayerLevelParser);
