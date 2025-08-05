import imagePathJson from "src/data/ui/cimagepath.json";
import { Localizer, LocalizerLocale } from "src/utils/Localizer";
import * as fs from "fs/promises";
import * as fsSync from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { logger } from "src/utils/logger";
import { BaseParserConstructor, RewardItem } from "src/types/base.model";
import { BUILD_DIR } from "src/Constants";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, "..");

export const getAssetImage = (id: number | undefined) => {
  if (!id) return null;

  const imagePath = imagePathJson.Data[id as unknown as keyof typeof imagePathJson.Data];
  if (!imagePath) return null;

  // const frame = characterFrames[id];
  // if (frame) return `/${frame}`;

  const { assetBundle, assetName } = imagePath;
  let modifiedAssetBundle = assetBundle;

  if (!assetBundle.toLowerCase().includes(assetName.toLowerCase())) {
    const assetBundleParts = assetBundle.split(".assetbundle");
    modifiedAssetBundle = `${assetBundleParts[0]}.${assetName}.assetbundle`;
  } else {
    const escapedAssetName = assetName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const assetBundleParts = assetBundle.split(new RegExp(escapedAssetName, "i"));
    modifiedAssetBundle = `${assetBundleParts[0]}.${assetName}.assetbundle`;
  }

  const formattedPath = modifiedAssetBundle.replace(/\./g, "/").replace(/\/assetbundle$/, ".png");

  return `/${formattedPath}`;
};

export const getL2DImage = (assetBundle: string | undefined) => {
  if (!assetBundle) return null;

  const formattedPath = assetBundle.replace(/\./g, "/").replace(/\/assetbundle$/, "");

  return `/${formattedPath}`;
};

export const getAssetName = (asset: string) => asset.split("/").pop()?.split(".")[0] ?? null;

export const loadLocalizationFiles = async (locale: LocalizerLocale): Promise<Localizer> => {
  const localizer = new Localizer(locale);
  const suffix = "_" + locale;
  const wordDataPath = path.join(srcDir, "data", "word");

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

export const createFolder = async (folderPath: string): Promise<void> => {
  if (!fsSync.existsSync(folderPath)) {
    await fs.mkdir(folderPath, { recursive: true });
  }
};

export const reCreateFolder = async (folderPath: string): Promise<void> => {
  if (fsSync.existsSync(folderPath)) {
    fsSync.rmSync(folderPath, { recursive: true, force: true });
  }
};

export const parseEntities = async (
  localizers: Localizer[],
  entityType: string,
  ParserClass: BaseParserConstructor
) => {
  const entitiesDir = path.join(BUILD_DIR, entityType);
  await createFolder(entitiesDir);

  logger.info(`Getting ${entityType}`);

  const isMultiFile = typeof ParserClass.getRawsByLocale === "function";

  if (isMultiFile && ParserClass.getRawsByLocale) {
    const rawEntitiesByLocale = new Map<string, any[]>();
    const allEntityIds = new Set<string>();

    for (const localizer of localizers) {
      const rawEntities = ParserClass.getRawsByLocale!(localizer.locale);
      rawEntitiesByLocale.set(localizer.locale, rawEntities);

      rawEntities.forEach((rawEntity: any) => {
        allEntityIds.add(rawEntity.id.toString());
      });
    }

    const totalUniqueEntities = allEntityIds.size;
    logger.info(`Found ${totalUniqueEntities} unique ${entityType} across ${localizers.length} locales`);

    await Promise.all(
      Array.from(allEntityIds).map(async (entityId) => {
        const entityDir = path.join(entitiesDir, entityId);
        await createFolder(entityDir);

        await Promise.all(
          localizers.map(async (localizer) => {
            const parser = new ParserClass(localizer);
            const rawEntities = rawEntitiesByLocale.get(localizer.locale) || [];
            const rawEntity = rawEntities.find((entity: any) => entity.id.toString() === entityId);

            const localizedEntity = parser.transform(rawEntity);
            const outputPath = path.join(entityDir, `${localizer.locale}.json`);
            await fs.writeFile(outputPath, JSON.stringify(localizedEntity, null, 2));
          })
        );

        logger.debug(`Wrote ${entityId} with ${localizers.length} locales`);
      })
    );

    logger.info(`Wrote ${totalUniqueEntities} ${entityType} with ${localizers.length} locales each`);
  } else if (!isMultiFile) {
    const rawEntities = ParserClass.getRaws();
    logger.info(`Found ${rawEntities.length} ${entityType}`);

    logger.info(`Parsing ${entityType}...`);
    await Promise.all(
      rawEntities.map(async (rawEntity: any) => {
        const parser = new ParserClass(localizers[0]);
        // const entity = parser.transform(rawEntity);
        const entityName = rawEntity.id.toString();
        const entityDir = path.join(entitiesDir, entityName);
        await createFolder(entityDir);

        await Promise.all(
          localizers.map(async (localizer) => {
            parser.setLocalizer(localizer);
            const localizedEntity = parser.transform(rawEntity);

            const outputPath = path.join(entityDir, `${localizer.locale}.json`);
            await fs.writeFile(outputPath, JSON.stringify(localizedEntity, null, 2));
          })
        );

        logger.debug(`Wrote ${entityName} with ${localizers.length} locales`);
      })
    );

    logger.info(`Wrote ${rawEntities.length} ${entityType} with ${localizers.length} locales each`);
  } else {
    logger.error(`${ParserClass.toString()} parser for ${entityType} does not support any localization`);
  }
};

export const createRewardItems = (ids: number[] = [], quantities: number[] = []): RewardItem[] => {
  return ids
    .map((id, index) => ({
      id,
      quantity: quantities[index] || 0,
    }))
    .filter((item) => !(item.id === 0 && item.quantity === 0)); // filter out empty reward items
};
