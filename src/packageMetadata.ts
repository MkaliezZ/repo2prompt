import fs from "node:fs/promises";
import path from "node:path";
import type { PackageMetadata } from "./types.js";

interface RawPackageJson {
  name?: string;
  version?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export async function readPackageMetadata(rootDir: string): Promise<PackageMetadata | undefined> {
  try {
    const packageJsonPath = path.join(rootDir, "package.json");
    const raw = JSON.parse(await fs.readFile(packageJsonPath, "utf8")) as RawPackageJson;

    return {
      name: raw.name,
      version: raw.version,
      scripts: raw.scripts,
      dependencies: Object.keys(raw.dependencies ?? {}),
      devDependencies: Object.keys(raw.devDependencies ?? {})
    };
  } catch {
    return undefined;
  }
}
