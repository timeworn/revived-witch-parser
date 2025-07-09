import { CharacterParser } from "src/parsers/character";
import { Localizer } from "src/utils/localizer";
import * as fs from "fs/promises";
import * as fsSync from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { logger } from "src/utils/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES = ["en", "ch", "jp", "kr"];

const buildDir = path.join(process.cwd(), "build");

const loadLocalizationFiles = async (locale: string): Promise<Localizer> => {
  const localizer = new Localizer(locale);
  const suffix = "_" + locale;
  const wordDataPath = path.join(__dirname, "data", "word");

  const files = await fs.readdir(wordDataPath);

  const localeFiles = files.filter((file: string) => file.endsWith(`${suffix}.json`));

  await Promise.all(
    localeFiles.map(async (file: string) => {
      try {
        const filePath = path.join(wordDataPath, file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(fileContent);

        if (jsonData.Data) {
          localizer.addRawLocalization(jsonData.Data);
        }
      } catch (error) {
        logger.warn(`Failed to load localization file ${file}:`, error);
      }
    })
  );

  return localizer;
};

const createFolder = async (folderPath: string): Promise<void> => {
  if (!fsSync.existsSync(folderPath)) {
    await fs.mkdir(folderPath, { recursive: true });
  }
};

const parseCharacters = async () => {
  const charactersDir = path.join(buildDir, "characters");
  await createFolder(charactersDir);

  logger.info("Getting characters");
  const rawCharacters = CharacterParser.getRawCharacters();
  logger.info(`Found ${rawCharacters.length} characters`);

  logger.info("Loading localization files");
  const localizers = await Promise.all(LOCALES.map(async (locale) => await loadLocalizationFiles(locale)));
  logger.info(`Loaded ${localizers.length} localizers for ${LOCALES.length} locales`);

  logger.info("Parsing characters...");
  await Promise.all(
    rawCharacters.map(async (rawCharacter) => {
      const characterParser = new CharacterParser(await loadLocalizationFiles(LOCALES[0]));
      const firstLocaleCharacter = characterParser.transform(rawCharacter);
      const characterName = firstLocaleCharacter.name || firstLocaleCharacter.id.toString();
      const characterDir = path.join(charactersDir, characterName);
      await createFolder(characterDir);

      await Promise.all(
        localizers.map(async (localizer) => {
          characterParser.setLocalizer(localizer);
          const localizedCharacter = characterParser.transform(rawCharacter);

          const outputPath = path.join(characterDir, `${localizer.locale}.json`);
          await fs.writeFile(outputPath, JSON.stringify(localizedCharacter, null, 2));
        })
      );

      logger.info(`Wrote ${characterName} with ${localizers.length} locales`);
    })
  );

  logger.info(`Successfully wrote ${rawCharacters.length} characters with ${LOCALES.length} locales each`);
};

if (fsSync.existsSync(buildDir)) {
  fsSync.rmSync(buildDir, { recursive: true, force: true });
}

parseCharacters().catch((error) => {
  logger.error("Failed to parse characters:", error);
  process.exit(1);
});
