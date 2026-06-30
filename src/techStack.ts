import fs from "node:fs/promises";
import path from "node:path";

async function exists(rootDir: string, fileName: string): Promise<boolean> {
  try {
    await fs.access(path.join(rootDir, fileName));
    return true;
  } catch {
    return false;
  }
}

async function hasMatchingFile(rootDir: string, pattern: RegExp): Promise<boolean> {
  const entries = await fs.readdir(rootDir);
  return entries.some((entry) => pattern.test(entry));
}

export async function detectTechStack(rootDir: string): Promise<string[]> {
  const stack = new Set<string>();

  if (await exists(rootDir, "package.json")) stack.add("Node.js");
  if (await exists(rootDir, "tsconfig.json")) stack.add("TypeScript");
  if (await hasMatchingFile(rootDir, /^vite\.config\./)) stack.add("Vite");
  if (await hasMatchingFile(rootDir, /^next\.config\./)) stack.add("Next.js");
  if (await exists(rootDir, "pyproject.toml")) stack.add("Python");
  if (await exists(rootDir, "requirements.txt")) stack.add("Python");
  if (await exists(rootDir, "Cargo.toml")) stack.add("Rust");
  if (await exists(rootDir, "go.mod")) stack.add("Go");
  if (await exists(rootDir, "pom.xml")) stack.add("Java / Maven");
  if (await exists(rootDir, "build.gradle")) stack.add("Java / Gradle");
  if (await exists(rootDir, "composer.json")) stack.add("PHP / Composer");
  if (await exists(rootDir, "Gemfile")) stack.add("Ruby");

  return stack.size > 0 ? [...stack] : ["Unknown / not detected"];
}
