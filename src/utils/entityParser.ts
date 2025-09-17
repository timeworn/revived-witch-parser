import path from "path";
import { BaseParserConstructor, RawEntity } from "src/types/base.model";
import { Localizer } from "src/utils/Localizer";
import { logger } from "src/utils/logger";
import { createFolder } from "src/utils/utils";
import * as fs from "fs/promises";
import { BUILD_DIR } from "src/Constants";

interface EntityProcessingResult {
  written: number;
  total: number;
  successRate: string;
}

interface EntityLocaleData {
  localizer: Localizer;
  entities: RawEntity[];
}

const getRawEntitiesForAllLocales = (
  ParserClass: BaseParserConstructor,
  localizers: Localizer[]
): EntityLocaleData[] => {
  const hasLocaleMethod = typeof ParserClass.getRawsByLocale === "function";

  if (hasLocaleMethod && ParserClass.getRawsByLocale) {
    return localizers
      .map((localizer) => ({
        localizer,
        entities: ParserClass.getRawsByLocale!(localizer.locale) || [],
      }))
      .filter((data) => data.entities.length > 0);
  } else {
    const rawEntities = ParserClass.getRaws();
    return rawEntities.length > 0 ? [{ localizer: localizers[0], entities: rawEntities }] : [];
  }
};

const processEntityForLocale = async (
  entity: RawEntity,
  localizer: Localizer,
  ParserClass: BaseParserConstructor,
  entitiesDir: string,
  entityType: string
): Promise<boolean> => {
  try {
    const parser = new ParserClass(localizer);
    const entityDir = path.join(entitiesDir, entity.id.toString());
    await createFolder(entityDir);

    const localizedEntity = parser.transform(entity);
    const outputPath = path.join(entityDir, `${localizer.locale}.json`);
    await fs.writeFile(outputPath, JSON.stringify(localizedEntity, null, 2));

    logger.debug(`Wrote ${entity.id} for locale ${localizer.locale}`);
    return true;
  } catch (error) {
    logger.error(`Failed to parse ${entityType} ${entity.id} for locale ${localizer.locale}:`);
    logger.error(error);
    return false;
  }
};

const processEntities = async (
  entityLocaleData: EntityLocaleData[],
  localizers: Localizer[],
  ParserClass: BaseParserConstructor,
  entitiesDir: string,
  entityType: string
): Promise<EntityProcessingResult> => {
  const hasLocaleMethod = typeof ParserClass.getRawsByLocale === "function";
  let totalProcessed = 0;
  let totalSuccess = 0;

  if (hasLocaleMethod) {
    const writeTasks: Promise<boolean>[] = [];

    for (const { localizer, entities } of entityLocaleData) {
      for (const entity of entities) {
        writeTasks.push(processEntityForLocale(entity, localizer, ParserClass, entitiesDir, entityType));
        totalProcessed++;
      }
    }

    const results = await Promise.all(writeTasks);
    totalSuccess = results.filter(Boolean).length;
  } else {
    const [{ entities: rawEntities }] = entityLocaleData;

    const entityTasks = rawEntities.map(async (entity) => {
      const localeTasks = localizers.map(async (localizer) => {
        totalProcessed++;
        return processEntityForLocale(entity, localizer, ParserClass, entitiesDir, entityType);
      });

      const results = await Promise.all(localeTasks);
      const successCount = results.filter(Boolean).length;

      if (successCount === localizers.length) {
        logger.debug(`Wrote ${entity.id} with ${localizers.length} locales`);
      }

      return successCount;
    });

    const entityResults = await Promise.all(entityTasks);
    totalSuccess = entityResults.reduce((sum, count) => sum + count, 0);
  }

  const successRate = totalProcessed > 0 ? ((totalSuccess / totalProcessed) * 100).toFixed(2) : "0.00";

  return {
    written: totalSuccess,
    total: totalProcessed,
    successRate,
  };
};

export const parseEntities = async (
  localizers: Localizer[],
  entityType: string,
  ParserClass: BaseParserConstructor
) => {
  const entitiesDir = path.join(BUILD_DIR, entityType);
  await createFolder(entitiesDir);

  logger.info(`Getting ${entityType}`);

  const entityLocaleData = getRawEntitiesForAllLocales(ParserClass, localizers);

  if (entityLocaleData.length === 0) {
    logger.warn(`No ${entityType} found for any locale`);
    return;
  }

  const allEntityIds = new Set<number>();
  let totalEntities = 0;

  entityLocaleData.forEach(({ entities }) => {
    entities.forEach((entity) => allEntityIds.add(entity.id));
    totalEntities += entities.length;
  });

  const hasLocaleMethod = typeof ParserClass.getRawsByLocale === "function";

  if (hasLocaleMethod) {
    logger.info(
      `Found ${allEntityIds.size} unique ${entityType} out of ${totalEntities} total across ${entityLocaleData.length} locales`
    );
  } else {
    logger.info(`Found ${allEntityIds.size} ${entityType}`);
  }

  logger.info(`Parsing ${entityType}...`);

  const result = await processEntities(entityLocaleData, localizers, ParserClass, entitiesDir, entityType);
  const missed = result.total - result.written;

  logger.info(`Finished writing ${entityType}: ${result.written} written, ${missed} missed (${result.successRate}%)`);
};
