import fs from "node:fs/promises";
import path from "node:path";
import { parseSimpleGitignore, shouldIgnoreFileByPath, shouldIgnoreName } from "./filters.js";
import { matchesAnyGlob } from "./glob.js";

async function readGitignoreGlobs(rootDir: string): Promise<string[]> {
  try {
    const content = await fs.readFile(path.join(rootDir, ".gitignore"), "utf8");
    return parseSimpleGitignore(content);
  } catch {
    return [];
  }
}

export async function generateFileTree(rootDir: string): Promise<string> {
  const absoluteRoot = path.resolve(rootDir);
  const rootName = path.basename(absoluteRoot);
  const gitignoreGlobs = await readGitignoreGlobs(absoluteRoot);
  const lines = [`${rootName}/`];

  async function walk(currentDir: string, depth: number): Promise<void> {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    entries.sort((left, right) => {
      if (left.isDirectory() && !right.isDirectory()) return -1;
      if (!left.isDirectory() && right.isDirectory()) return 1;
      return left.name.localeCompare(right.name);
    });

    for (const entry of entries) {
      if (shouldIgnoreName(entry.name)) {
        continue;
      }

      const absolutePath = path.join(currentDir, entry.name);
      const relativePath = path.relative(absoluteRoot, absolutePath).replace(/\\/g, "/");

      if (gitignoreGlobs.length > 0 && matchesAnyGlob(relativePath, gitignoreGlobs)) {
        continue;
      }

      if (entry.isFile() && shouldIgnoreFileByPath(relativePath)) {
        continue;
      }

      const indent = "  ".repeat(depth);
      lines.push(`${indent}${entry.name}${entry.isDirectory() ? "/" : ""}`);

      if (entry.isDirectory()) {
        await walk(absolutePath, depth + 1);
      }
    }
  }

  await walk(absoluteRoot, 1);
  return lines.join("\n");
}
