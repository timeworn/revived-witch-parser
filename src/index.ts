import * as fs from "fs";
import * as path from "path";
import { DATA_SOURCES } from "./Constants";

export interface DataSource {
  name: string;
  getData: () => any[];
}

class DataExporter {
  private readonly distDir: string;

  constructor(baseDir: string) {
    this.distDir = path.join(baseDir, "../dist");
    this.cleanupAndInitialize();
  }

  private cleanupAndInitialize(): void {
    if (fs.existsSync(this.distDir)) {
      try {
        fs.rmSync(this.distDir, { recursive: true, force: true });
        console.log(`🗑️  Cleaned up existing dist directory at ${this.distDir}`);
      } catch (error) {
        console.error(`❌ Error cleaning up dist directory:`, error);
        throw error;
      }
    }

    try {
      fs.mkdirSync(this.distDir, { recursive: true });
      console.log(`📁 Created new dist directory at ${this.distDir}`);
    } catch (error) {
      console.error(`❌ Error creating dist directory:`, error);
      throw error;
    }
  }

  private writeDataToJsonFile(data: any[], fileName: string): void {
    const outputPath = path.join(this.distDir, fileName);
    const finalPath = outputPath.endsWith(".json") ? outputPath : `${outputPath}.json`;

    try {
      const jsonContent = JSON.stringify(data, null, 2);
      fs.writeFileSync(finalPath, jsonContent, "utf8");
      console.log(`✓ Data successfully written to ${finalPath}`);
    } catch (error) {
      console.error(`✗ Error writing to ${finalPath}:`, error);
      throw error;
    }
  }

  public exportData(dataSources: DataSource[]): void {
    console.log(`🚀 Starting data export at ${new Date().toISOString()}`);

    dataSources.forEach(({ name, getData }) => {
      try {
        const data = getData() ?? [];
        this.writeDataToJsonFile(data, name);
      } catch (error) {
        console.error(`✗ Error processing ${name}:`, error);
      }
    });

    console.log(`\n✨ Export completed at ${new Date().toISOString()}`);
  }
}

try {
  const exporter = new DataExporter(__dirname);
  exporter.exportData(DATA_SOURCES);
} catch (error) {
  console.error("❌ Fatal error during export process:", error);
  process.exit(1);
}
