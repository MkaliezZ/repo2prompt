import fs from "node:fs/promises";
import path from "node:path";
import {
  isLikelyBinary,
  maxFileSizeBytes,
  parseSimpleGitignore,
  shouldIgnoreFileByPath,
  shouldIgnoreName,
  shouldIncludeByGlobs
} from "./filters.js";
import { matchesAnyGlob } from "./glob.js";
import type { ScanResult, ScannedFile } from "./types.js";

interface ScanOptions {
  includeGlobs: string[];
  excludeGlobs: string[];
  maxFiles: number;
}

async function loadGitignoreGlobs(rootDir: string): Promise<string[]> {
  try {
    const gitignore = await fs.readFile(path.join(rootDir, ".gitignore"), "utf8");
    return parseSimpleGitignore(gitignore);
  } catch {
    return [];
  }
}

export async function scanFiles(rootDir: string, options: ScanOptions): Promise<ScanResult> {
  const absoluteRoot = path.resolve(rootDir);
  const gitignoreGlobs = await loadGitignoreGlobs(absoluteRoot);
  const files: ScannedFile[] = [];
  let filesScanned = 0;

  async function walk(currentDir: string): Promise<void> {
    if (files.length >= options.maxFiles) {
      return;
    }

    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
      if (files.length >= options.maxFiles) {
        break;
      }

      if (shouldIgnoreName(entry.name)) {
        continue;
      }

      const absolutePath = path.join(currentDir, entry.name);
      const relativePath = path.relative(absoluteRoot, absolutePath).replace(/\\/g, "/");

      if (gitignoreGlobs.length > 0 && matchesAnyGlob(relativePath, gitignoreGlobs)) {
        continue;
      }

      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      filesScanned += 1;

      if (
        shouldIgnoreFileByPath(relativePath) ||
        !shouldIncludeByGlobs(relativePath, options.includeGlobs, options.excludeGlobs)
      ) {
        continue;
      }

      const stat = await fs.stat(absolutePath);
      if (stat.size > maxFileSizeBytes) {
        continue;
      }

      const buffer = await fs.readFile(absolutePath);
      if (isLikelyBinary(buffer)) {
        continue;
      }

      files.push({
        path: relativePath,
        absolutePath,
        content: buffer.toString("utf8"),
        size: stat.size
      });
    }
  }

  await walk(absoluteRoot);

  return {
    files,
    filesScanned,
    filesIncluded: files.length
  };
}
