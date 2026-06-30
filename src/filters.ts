import path from "node:path";
import { matchesAnyGlob } from "./glob.js";

const ignoredNames = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  ".next",
  ".vite",
  "turbo",
  "coverage",
  ".venv",
  "venv",
  "__pycache__",
  ".cache",
  ".DS_Store"
]);

const ignoredExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".ico",
  ".mp4",
  ".mov",
  ".avi",
  ".zip",
  ".tar",
  ".gz",
  ".rar",
  ".7z",
  ".pdf",
  ".exe",
  ".dll",
  ".dmg"
]);

const ignoredLockFiles = new Set([
  "package-lock.json",
  "npm-shrinkwrap.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "bun.lockb",
  "Cargo.lock",
  "Pipfile.lock",
  "poetry.lock",
  "composer.lock",
  "Gemfile.lock"
]);

export const maxFileSizeBytes = 120_000;

export function shouldIgnoreName(name: string): boolean {
  return ignoredNames.has(name);
}

export function shouldIgnoreFileByPath(relativePath: string): boolean {
  const baseName = path.basename(relativePath);
  const extension = path.extname(baseName).toLowerCase();
  return (
    ignoredLockFiles.has(baseName) ||
    ignoredExtensions.has(extension) ||
    relativePath.split("/").some((part) => ignoredNames.has(part))
  );
}

export function isLikelyBinary(buffer: Buffer): boolean {
  const sample = buffer.subarray(0, Math.min(buffer.length, 8000));
  return sample.includes(0);
}

export function shouldIncludeByGlobs(
  relativePath: string,
  includeGlobs: string[],
  excludeGlobs: string[]
): boolean {
  if (excludeGlobs.length > 0 && matchesAnyGlob(relativePath, excludeGlobs)) {
    return false;
  }

  if (includeGlobs.length === 0) {
    return true;
  }

  return matchesAnyGlob(relativePath, includeGlobs);
}

export function parseSimpleGitignore(content: string): string[] {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#") && !line.startsWith("!"))
    .map((line) => line.replace(/^\//, ""))
    .map((line) => (line.endsWith("/") ? `${line}**` : line));
}
