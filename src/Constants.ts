import * as path from "path";
import { Localizer, LocalizerLocale } from "src/utils/Localizer";

export const LOCALES = ["en", "ch", "jp", "kr"];
export const BUILD_DIR = path.join(process.cwd(), "build");
export const localizers: Localizer[] = [];
