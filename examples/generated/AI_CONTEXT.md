# AI Context Pack

## Project

- Name: repo2prompt
- Source path: /Users/macos/Desktop/repo2prompt
- Generated at: 2026-06-30T18:34:53.298Z
- Approx token count: 9713

## Detected Tech Stack

- Node.js
- TypeScript

## Important Files

- examples/sample-project/package.json
- examples/sample-project/tsconfig.json
- package.json
- README.md
- tsconfig.json

## Compact File Tree

```text
repo2prompt/
  .github/
    workflows/
      ci.yml
  examples/
    sample-project/
      src/
        index.ts
      package.json
      tsconfig.json
  src/
    agents.ts
    cli.ts
    fileTree.ts
    filters.ts
    generator.ts
    glob.ts
    index.ts
    packageMetadata.ts
    renderMarkdown.ts
    scanner.ts
    techStack.ts
    tokenEstimator.ts
    types.ts
  tests/
    fileTree.test.ts
    filters.test.ts
    generator.test.ts
    renderMarkdown.test.ts
    tokenEstimator.test.ts
  .gitignore
  CHANGELOG.md
  CONTRIBUTING.md
  LICENSE
  package.json
  README.md
  tsconfig.json
```

## Package Metadata

- name: repo2prompt
- version: 0.1.0
- scripts:
  - dev: `tsx src/cli.ts`
  - build: `tsc -p tsconfig.json`
  - test: `vitest run`
  - lint: `tsc --noEmit -p tsconfig.json`
- dependencies: None
- devDependencies: @types/node, tsx, typescript, vitest

## Selected Source Files

### .github/workflows/ci.yml

```yml
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    name: Build and test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Test
        run: npm test

      - name: Lint
        run: npm run lint

      - name: Compiled CLI smoke test
        run: node dist/cli.js . --output ./tmp-smoke --max-files 80

```

### .gitignore

```gitignore
node_modules/
dist/
coverage/
.DS_Store
*.log

# Default local CLI output when running `repo2prompt .` from the repo root.
/AI_CONTEXT.md
/FILE_TREE.md
/AGENTS.md

# Local editor and environment noise.
.env
.env.*
.idea/
.vscode/
.npm-cache/
tmp-smoke/

```

### CHANGELOG.md

```md
# Changelog

All notable changes to Repo2Prompt will be documented in this file.

## 0.1.0 - Initial MVP

### Added

- TypeScript CLI project structure.
- `repo2prompt [target-dir]` command for generating AI-ready context packs.
- Output files: `AI_CONTEXT.md`, `FILE_TREE.md`, and `AGENTS.md`.
- CLI options for output directory, maximum files, include globs, exclude globs, and agent instructions.
- Recursive project scanner with default ignore rules for noisy folders, binary files, media files, archives, lock files, and large files.
- Lightweight tech stack detection for common project indicators.
- Package metadata extraction from `package.json`.
- Compact file tree generation.
- Approximate token estimation using a simple character-count heuristic.
- Basic test coverage for filters, file tree generation, Markdown rendering, token estimation, and the generation flow.

### Notes

- This release is prepared for GitHub launch.
- The package is not published to npm yet.

```

### CONTRIBUTING.md

```md
# Contributing

Thanks for helping improve Repo2Prompt.

## Development Setup

```bash
npm install
npm run build
npm test
npm run lint
```

## Contribution Rules

- Keep changes small and focused.
- Preserve the existing CLI behavior unless the change is intentional.
- Do not add a backend or web UI.
- Avoid unnecessary dependencies.
- Add or update tests for behavior changes.
- Keep generated output files out of the repository root.
- Run build, tests, and lint before opening a pull request.

## Pull Request Checklist

- The change has a clear purpose.
- `npm run build` passes.
- `npm test` passes.
- `npm run lint` passes.
- Documentation is updated when behavior or usage changes.

## Reporting Issues

When reporting an issue, include:

- Your Node.js version.
- The command you ran.
- The expected behavior.
- The actual behavior.
- A small example repository or file tree when possible.

```

### examples/sample-project/package.json

```json
{
  "name": "repo2prompt-sample-project",
  "version": "0.0.0",
  "scripts": {
    "test": "echo sample"
  }
}

```

### examples/sample-project/src/index.ts

```ts
export function greet(name: string): string {
  return `Hello, ${name}`;
}

```

### examples/sample-project/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true
  }
}

```

### LICENSE

```LICENSE
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

### package.json

```json
{
  "name": "repo2prompt",
  "version": "0.1.0",
  "description": "Turn any codebase into an AI-ready context pack for Claude Code, Codex, Cursor, Cline, Gemini CLI, and other AI coding agents.",
  "type": "module",
  "bin": {
    "repo2prompt": "./dist/cli.js"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],
  "scripts": {
    "dev": "tsx src/cli.ts",
    "build": "tsc -p tsconfig.json",
    "test": "vitest run",
    "lint": "tsc --noEmit -p tsconfig.json"
  },
  "keywords": [
    "ai",
    "ai-agents",
    "agent-context",
    "cli",
    "context",
    "codebase",
    "repo",
    "repository",
    "prompt",
    "codex",
    "claude",
    "cursor",
    "cline",
    "gemini",
    "copilot"
  ],
  "author": "TBD",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/MkaliezZ/repo2prompt.git"
  },
  "bugs": {
    "url": "https://github.com/MkaliezZ/repo2prompt/issues"
  },
  "homepage": "https://github.com/MkaliezZ/repo2prompt#readme",
  "engines": {
    "node": ">=20.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.10",
    "tsx": "^4.16.2",
    "typescript": "^5.5.3",
    "vitest": "^1.6.0"
  }
}

```

### README.md

```md
# Repo2Prompt

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/MkaliezZ/repo2prompt/actions/workflows/ci.yml/badge.svg)](https://github.com/MkaliezZ/repo2prompt/actions/workflows/ci.yml)

Turn any codebase into an AI-ready context pack for Claude Code, Codex, Cursor, Cline, Gemini CLI, GitHub Copilot, and other AI coding agents.

Repo2Prompt is a lightweight TypeScript CLI that scans a repository and generates a compact, structured set of Markdown files your coding agent can read before making changes.

## Quick Demo

```bash
npm install
npm run build
rm -rf examples/generated
node dist/cli.js . --output examples/generated --max-files 80
```

Generated files:

```text
examples/generated/
  AI_CONTEXT.md
  FILE_TREE.md
  AGENTS.md
```

See the checked-in demo output in [`examples/generated/`](examples/generated/).

## Before / After

Before Repo2Prompt, you often have to paste scattered files, explain the project structure manually, and hope the agent notices the important context.

After Repo2Prompt, you can hand your agent:

- A compact project overview.
- A filtered file tree.
- Detected tech stack and package metadata.
- Selected source excerpts.
- Default safe coding instructions.

That gives AI coding agents a cleaner starting point while keeping the repository itself unchanged.

## Features

- Generates `AI_CONTEXT.md`, `FILE_TREE.md`, and `AGENTS.md`.
- Scans local repositories recursively.
- Ignores noisy folders, binary files, lock files, archives, images, videos, and large generated files.
- Supports simple include and exclude glob filters.
- Detects common project stacks such as Node.js, TypeScript, Vite, Next.js, Python, Rust, Go, Java, PHP, and Ruby.
- Includes package metadata when `package.json` is present.
- Estimates approximate token count with a lightweight character-based heuristic.
- Runs without runtime dependencies.

## Installation

Repo2Prompt v0.1.0 is prepared for GitHub launch and is not published to npm yet.

Clone the repository, install dependencies, and build locally:

```bash
git clone https://github.com/MkaliezZ/repo2prompt.git
cd repo2prompt
npm install
npm run build
```

Run the built CLI:

```bash
node dist/cli.js .
```

During local development, run:

```bash
npm run dev -- .
```

After a future npm release, the intended global command will be:

```bash
repo2prompt .
```

## Usage

```bash
repo2prompt .
repo2prompt ./my-project
repo2prompt . --output ./context-pack
repo2prompt . --max-files 80
repo2prompt . --include "src/**/*.ts"
repo2prompt . --exclude "src/generated/**"
repo2prompt . --with-agents
```

Local source checkout equivalents:

```bash
npm run dev -- . --output ./context-pack
node dist/cli.js . --output ./context-pack
```

## CLI Options

| Option | Description | Default |
| --- | --- | --- |
| `--output <dir>` | Directory where output files are written. | `.` |
| `--max-files <number>` | Maximum number of selected files to include. | `120` |
| `--include <glob>` | Include only files matching the glob. Can be repeated. | none |
| `--exclude <glob>` | Exclude files matching the glob. Can be repeated. | none |
| `--with-agents` | Generate `AGENTS.md`. Enabled by default for the MVP. | enabled |

## Output Files

### `AI_CONTEXT.md`

The main context pack. It includes project metadata, detected tech stack, important files, compact file tree, package metadata, selected source excerpts, and suggested instructions for AI coding agents.

### `FILE_TREE.md`

A readable project tree that respects Repo2Prompt's ignore rules.

### `AGENTS.md`

Default safe coding instructions for agentic tools, including rules for focused edits, testing, and final reporting.

## Supported Agents

- Claude Code
- Codex
- Cursor
- Cline
- Gemini CLI
- GitHub Copilot
- Other AI coding agents

## Example Output

CLI summary:

```text
Generated:
- AI_CONTEXT.md
- FILE_TREE.md
- AGENTS.md

Files scanned: <number>
Files included: <number>
Approx tokens: <number>
Output directory: /path/to/context-pack
```

Example `AI_CONTEXT.md` section:

```md
# AI Context Pack

## Project

- Name: repo2prompt
- Source path: /path/to/repo2prompt
- Generated at: 2026-07-01T00:00:00.000Z
- Approx token count: <number>

## Detected Tech Stack

- Node.js
- TypeScript
```

Full demo output lives in [`examples/generated/`](examples/generated/).

## Development

```bash
npm install
npm run build
npm test
npm run lint
node dist/cli.js . --output /tmp/repo2prompt-smoke --max-files 80
```

## Roadmap

- Better .gitignore support
- Token budget mode
- Language-specific summaries
- Multiple output templates
- JSON output
- GitHub issue to agent prompt mode
- npm package release

## FAQ

### Is Repo2Prompt published to npm?

Not yet. v0.1.0 is prepared for GitHub launch first.

### Does Repo2Prompt send my code anywhere?

No. The CLI reads local files and writes local Markdown output.

### Does it modify my source files?

No. It only writes the generated output files to the selected output directory.

### Does it fully support `.gitignore`?

It supports simple `.gitignore` patterns for the MVP. Full Git-compatible ignore behavior is on the roadmap.

### How accurate is the token count?

It is approximate. The MVP uses `Math.ceil(characterCount / 4)` instead of a heavy tokenizer dependency.

### Can I limit what gets included?

Yes. Use `--max-files`, `--include`, and `--exclude`.

## License

MIT

```

### src/agents.ts

```ts
export function renderAgentsMarkdown(): string {
  return `# Agent Instructions

## Project Overview

Use this repository's file tree, package metadata, and selected source excerpts to understand the project before making changes.

## Coding Rules

- Prefer small, focused changes.
- Keep code readable.
- Preserve existing behavior unless explicitly asked to change it.
- Follow the style already present in nearby files.

## Testing Rules

- Run tests when possible.
- Add or update focused tests for behavior changes.
- Report any test failures honestly.

## Safety Rules

- Do not remove existing functionality unless explicitly requested.
- Do not introduce unrelated dependencies.
- Do not commit secrets, credentials, or local machine paths.

## File Modification Rules

- Do not modify unrelated files.
- Keep generated files separate from source files when possible.
- Explain any broad or risky changes before making them.

## Final Response Format

- Summarize changes clearly.
- Report commands used.
- Report test/build results.
- Note any remaining risks or follow-up work.
`;
}

```

### src/cli.ts

```ts
#!/usr/bin/env node
import path from "node:path";
import { generateContextPack } from "./generator.js";
import type { CliOptions } from "./types.js";

function printHelp(): void {
  console.log(`repo2prompt

Turn any codebase into a clean AI-ready context pack for Claude Code, Codex, Cursor, Cline, Gemini CLI, and other AI coding agents.

Usage:
  repo2prompt [target-dir] [options]

Options:
  --output <dir>       Output directory for generated files
  --max-files <number> Maximum number of files to include
  --include <glob>     Include only files matching the glob
  --exclude <glob>     Exclude files matching the glob
  --with-agents        Generate AGENTS.md (enabled by default)
  --help               Show this help message
`);
}

export function parseArgs(argv: string[]): CliOptions {
  let targetDir = ".";
  let outputDir = ".";
  let maxFiles = 120;
  const includeGlobs: string[] = [];
  const excludeGlobs: string[] = [];
  let withAgents = true;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    if (arg === "--output") {
      outputDir = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (arg === "--max-files") {
      maxFiles = Number.parseInt(argv[index + 1] ?? "", 10);
      index += 1;
      continue;
    }

    if (arg === "--include") {
      includeGlobs.push(argv[index + 1] ?? "");
      index += 1;
      continue;
    }

    if (arg === "--exclude") {
      excludeGlobs.push(argv[index + 1] ?? "");
      index += 1;
      continue;
    }

    if (arg === "--with-agents") {
      withAgents = true;
      continue;
    }

    if (arg.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    }

    targetDir = arg;
  }

  if (!outputDir) {
    throw new Error("--output requires a directory");
  }

  if (!Number.isFinite(maxFiles) || maxFiles < 1) {
    throw new Error("--max-files must be a positive number");
  }

  if (includeGlobs.some((glob) => glob.length === 0)) {
    throw new Error("--include requires a glob");
  }

  if (excludeGlobs.some((glob) => glob.length === 0)) {
    throw new Error("--exclude requires a glob");
  }

  return {
    targetDir,
    outputDir: path.resolve(process.cwd(), outputDir),
    maxFiles,
    includeGlobs,
    excludeGlobs,
    withAgents
  };
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const result = await generateContextPack(options);

  console.log(`Generated:
${result.generatedFiles.map((file) => `- ${file}`).join("\n")}

Files scanned: ${result.filesScanned}
Files included: ${result.filesIncluded}
Approx tokens: ${result.approxTokens}
Output directory: ${result.outputDir}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`repo2prompt failed: ${message}`);
    process.exit(1);
  });
}

```

### src/fileTree.ts

```ts
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

```

### src/filters.ts

```ts
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

```

### src/generator.ts

```ts
import fs from "node:fs/promises";
import path from "node:path";
import { renderAgentsMarkdown } from "./agents.js";
import { generateFileTree } from "./fileTree.js";
import { readPackageMetadata } from "./packageMetadata.js";
import { renderAiContextMarkdown } from "./renderMarkdown.js";
import { scanFiles } from "./scanner.js";
import { detectTechStack } from "./techStack.js";
import { estimateTokens } from "./tokenEstimator.js";
import type { CliOptions, GenerateResult } from "./types.js";

const importantFileNames = new Set([
  "README.md",
  "package.json",
  "tsconfig.json",
  "vite.config.ts",
  "vite.config.js",
  "next.config.ts",
  "next.config.js",
  "pyproject.toml",
  "requirements.txt",
  "Cargo.toml",
  "go.mod",
  "pom.xml",
  "build.gradle",
  "composer.json",
  "Gemfile",
  "AGENTS.md"
]);

export async function generateContextPack(options: CliOptions): Promise<GenerateResult> {
  const sourcePath = path.resolve(options.targetDir);
  const outputDir = path.resolve(options.outputDir);

  const [scanResult, compactFileTree, detectedStack, packageMetadata] = await Promise.all([
    scanFiles(sourcePath, {
      includeGlobs: options.includeGlobs,
      excludeGlobs: options.excludeGlobs,
      maxFiles: options.maxFiles
    }),
    generateFileTree(sourcePath),
    detectTechStack(sourcePath),
    readPackageMetadata(sourcePath)
  ]);

  const projectName = packageMetadata?.name ?? path.basename(sourcePath);
  const agentsMarkdown = renderAgentsMarkdown();
  const selectedContent = scanResult.files.map((file) => file.content).join("\n");
  const approxTokens = estimateTokens(`${compactFileTree}\n${selectedContent}\n${agentsMarkdown}`);
  const importantFiles = scanResult.files
    .map((file) => file.path)
    .filter((filePath) => importantFileNames.has(path.basename(filePath)));

  const aiContext = renderAiContextMarkdown({
    projectName,
    sourcePath,
    generatedAt: new Date().toISOString(),
    approxTokens,
    detectedStack,
    importantFiles,
    compactFileTree,
    packageMetadata,
    selectedFiles: scanResult.files,
    agentsMarkdown
  });

  await fs.mkdir(outputDir, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(outputDir, "AI_CONTEXT.md"), aiContext, "utf8"),
    fs.writeFile(path.join(outputDir, "FILE_TREE.md"), `# File Tree\n\n\`\`\`text\n${compactFileTree}\n\`\`\`\n`, "utf8"),
    fs.writeFile(path.join(outputDir, "AGENTS.md"), agentsMarkdown, "utf8")
  ]);

  return {
    outputDir,
    filesScanned: scanResult.filesScanned,
    filesIncluded: scanResult.filesIncluded,
    approxTokens,
    generatedFiles: ["AI_CONTEXT.md", "FILE_TREE.md", "AGENTS.md"]
  };
}

```

### src/glob.ts

```ts
function escapeRegex(value: string): string {
  return value.replace(/[.+^${}()|[\]\\]/g, "\\$&");
}

export function globToRegExp(glob: string): RegExp {
  const normalized = glob.replace(/\\/g, "/").replace(/^\.\//, "");
  let pattern = "";

  for (let index = 0; index < normalized.length; index += 1) {
    const char = normalized[index];
    const next = normalized[index + 1];

    if (char === "*" && next === "*") {
      const after = normalized[index + 2];
      if (after === "/") {
        pattern += "(?:.*/)?";
        index += 2;
      } else {
        pattern += ".*";
        index += 1;
      }
      continue;
    }

    if (char === "*") {
      pattern += "[^/]*";
      continue;
    }

    if (char === "?") {
      pattern += "[^/]";
      continue;
    }

    pattern += escapeRegex(char);
  }

  return new RegExp(`^${pattern}$`);
}

export function matchesAnyGlob(path: string, globs: string[]): boolean {
  const normalized = path.replace(/\\/g, "/").replace(/^\.\//, "");
  return globs.some((glob) => globToRegExp(glob).test(normalized));
}

```

### src/index.ts

```ts
export { generateContextPack } from "./generator.js";
export { parseArgs } from "./cli.js";
export { estimateTokens } from "./tokenEstimator.js";

```

### src/packageMetadata.ts

```ts
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

```

### src/renderMarkdown.ts

```ts
import type { PackageMetadata, ProjectContext, ScannedFile } from "./types.js";

const agentInstructions = `You are working inside this codebase.
Use the file tree and selected source excerpts as context.
Do not modify unrelated files.
Preserve existing behavior unless explicitly asked to change it.
Run relevant tests after changes.
Summarize changes clearly.`;

function renderList(items: string[]): string {
  if (items.length === 0) {
    return "- None";
  }

  return items.map((item) => `- ${item}`).join("\n");
}

function renderPackageMetadata(metadata?: PackageMetadata): string {
  if (!metadata) {
    return "- package.json not found";
  }

  const scripts = metadata.scripts
    ? Object.entries(metadata.scripts)
        .map(([name, command]) => `  - ${name}: \`${command}\``)
        .join("\n")
    : "  - None";

  return [
    `- name: ${metadata.name ?? "Unknown"}`,
    `- version: ${metadata.version ?? "Unknown"}`,
    "- scripts:",
    scripts,
    `- dependencies: ${metadata.dependencies?.length ? metadata.dependencies.join(", ") : "None"}`,
    `- devDependencies: ${metadata.devDependencies?.length ? metadata.devDependencies.join(", ") : "None"}`
  ].join("\n");
}

function languageForPath(filePath: string): string {
  const extension = filePath.split(".").pop();
  return extension ?? "";
}

function excerptFile(file: ScannedFile): string {
  const maxChars = 6000;
  const excerpt =
    file.content.length > maxChars
      ? `${file.content.slice(0, maxChars)}\n\n[Excerpt truncated for readability]`
      : file.content;

  return `### ${file.path}

\`\`\`${languageForPath(file.path)}
${excerpt}
\`\`\``;
}

export function renderAiContextMarkdown(context: ProjectContext): string {
  return `# AI Context Pack

## Project

- Name: ${context.projectName}
- Source path: ${context.sourcePath}
- Generated at: ${context.generatedAt}
- Approx token count: ${context.approxTokens}

## Detected Tech Stack

${renderList(context.detectedStack)}

## Important Files

${renderList(context.importantFiles)}

## Compact File Tree

\`\`\`text
${context.compactFileTree}
\`\`\`

## Package Metadata

${renderPackageMetadata(context.packageMetadata)}

## Selected Source Files

${context.selectedFiles.length > 0 ? context.selectedFiles.map(excerptFile).join("\n\n") : "- No source files selected"}

## Suggested Instructions for AI Coding Agents

\`\`\`text
${agentInstructions}
\`\`\`
`;
}

```

### src/scanner.ts

```ts
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

```

### src/techStack.ts

```ts
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

```

### src/tokenEstimator.ts

```ts
export function estimateTokens(input: string): number {
  return Math.ceil(input.length / 4);
}

```

### src/types.ts

```ts
export interface CliOptions {
  targetDir: string;
  outputDir: string;
  maxFiles: number;
  includeGlobs: string[];
  excludeGlobs: string[];
  withAgents: boolean;
}

export interface ScannedFile {
  path: string;
  absolutePath: string;
  content: string;
  size: number;
}

export interface ScanResult {
  files: ScannedFile[];
  filesScanned: number;
  filesIncluded: number;
}

export interface PackageMetadata {
  name?: string;
  version?: string;
  scripts?: Record<string, string>;
  dependencies?: string[];
  devDependencies?: string[];
}

export interface ProjectContext {
  projectName: string;
  sourcePath: string;
  generatedAt: string;
  approxTokens: number;
  detectedStack: string[];
  importantFiles: string[];
  compactFileTree: string;
  packageMetadata?: PackageMetadata;
  selectedFiles: ScannedFile[];
  agentsMarkdown: string;
}

export interface GenerateResult {
  outputDir: string;
  filesScanned: number;
  filesIncluded: number;
  approxTokens: number;
  generatedFiles: string[];
}

```

### tests/fileTree.test.ts

```ts
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { generateFileTree } from "../src/fileTree.js";

async function makeTempProject(): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "repo2prompt-tree-"));
  await fs.mkdir(path.join(dir, "src"), { recursive: true });
  await fs.mkdir(path.join(dir, "node_modules"), { recursive: true });
  await fs.writeFile(path.join(dir, "src", "index.ts"), "export const ok = true;\n");
  await fs.writeFile(path.join(dir, "node_modules", "ignored.js"), "ignored\n");
  await fs.writeFile(path.join(dir, "logo.png"), "not really png\n");
  return dir;
}

describe("generateFileTree", () => {
  it("generates a readable tree and respects ignore rules", async () => {
    const dir = await makeTempProject();
    const tree = await generateFileTree(dir);

    expect(tree).toContain("src/");
    expect(tree).toContain("index.ts");
    expect(tree).not.toContain("node_modules");
    expect(tree).not.toContain("logo.png");
  });
});

```

### tests/filters.test.ts

```ts
import { describe, expect, it } from "vitest";
import {
  parseSimpleGitignore,
  shouldIgnoreFileByPath,
  shouldIgnoreName,
  shouldIncludeByGlobs
} from "../src/filters.js";

describe("filters", () => {
  it("ignores noisy folders and files", () => {
    expect(shouldIgnoreName("node_modules")).toBe(true);
    expect(shouldIgnoreName("src")).toBe(false);
    expect(shouldIgnoreFileByPath("assets/logo.png")).toBe(true);
    expect(shouldIgnoreFileByPath("package-lock.json")).toBe(true);
    expect(shouldIgnoreFileByPath("src/index.ts")).toBe(false);
  });

  it("applies include and exclude globs", () => {
    expect(shouldIncludeByGlobs("src/index.ts", ["src/**/*.ts"], [])).toBe(true);
    expect(shouldIncludeByGlobs("README.md", ["src/**/*.ts"], [])).toBe(false);
    expect(shouldIncludeByGlobs("src/generated/client.ts", [], ["src/generated/**"])).toBe(false);
  });

  it("parses simple gitignore entries", () => {
    expect(parseSimpleGitignore("tmp/\n.env\n# comment\n!important.txt")).toEqual(["tmp/**", ".env"]);
  });
});

```

### tests/generator.test.ts

```ts
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { generateContextPack } from "../src/generator.js";

async function makeSampleProject(): Promise<{ sourceDir: string; outputDir: string }> {
  const sourceDir = await fs.mkdtemp(path.join(os.tmpdir(), "repo2prompt-source-"));
  const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), "repo2prompt-output-"));
  await fs.mkdir(path.join(sourceDir, "src"), { recursive: true });
  await fs.writeFile(
    path.join(sourceDir, "package.json"),
    JSON.stringify({ name: "sample", version: "0.0.1", scripts: { test: "echo ok" } }, null, 2)
  );
  await fs.writeFile(path.join(sourceDir, "tsconfig.json"), "{}\n");
  await fs.writeFile(path.join(sourceDir, "src", "index.ts"), "export const value = 1;\n");
  await fs.writeFile(path.join(sourceDir, "image.png"), "ignored\n");
  return { sourceDir, outputDir };
}

describe("generateContextPack", () => {
  it("generates the MVP output files", async () => {
    const { sourceDir, outputDir } = await makeSampleProject();
    const result = await generateContextPack({
      targetDir: sourceDir,
      outputDir,
      maxFiles: 80,
      includeGlobs: [],
      excludeGlobs: [],
      withAgents: true
    });

    expect(result.generatedFiles).toEqual(["AI_CONTEXT.md", "FILE_TREE.md", "AGENTS.md"]);
    expect(result.filesIncluded).toBeGreaterThan(0);
    await expect(fs.access(path.join(outputDir, "AI_CONTEXT.md"))).resolves.toBeUndefined();
    await expect(fs.access(path.join(outputDir, "FILE_TREE.md"))).resolves.toBeUndefined();
    await expect(fs.access(path.join(outputDir, "AGENTS.md"))).resolves.toBeUndefined();

    const aiContext = await fs.readFile(path.join(outputDir, "AI_CONTEXT.md"), "utf8");
    expect(aiContext).toContain("Detected Tech Stack");
    expect(aiContext).toContain("Node.js");
    expect(aiContext).toContain("TypeScript");
  });
});

```

### tests/renderMarkdown.test.ts

```ts
import { describe, expect, it } from "vitest";
import { renderAiContextMarkdown } from "../src/renderMarkdown.js";

describe("renderAiContextMarkdown", () => {
  it("renders the expected major sections", () => {
    const markdown = renderAiContextMarkdown({
      projectName: "demo",
      sourcePath: "/tmp/demo",
      generatedAt: "2026-01-01T00:00:00.000Z",
      approxTokens: 42,
      detectedStack: ["Node.js", "TypeScript"],
      importantFiles: ["package.json"],
      compactFileTree: "demo/\n  package.json",
      packageMetadata: {
        name: "demo",
        version: "1.0.0",
        scripts: { test: "vitest run" },
        dependencies: [],
        devDependencies: ["vitest"]
      },
      selectedFiles: [
        {
          path: "src/index.ts",
          absolutePath: "/tmp/demo/src/index.ts",
          content: "export const demo = true;\n",
          size: 26
        }
      ],
      agentsMarkdown: "# Agent Instructions\n"
    });

    expect(markdown).toContain("# AI Context Pack");
    expect(markdown).toContain("## Detected Tech Stack");
    expect(markdown).toContain("## Package Metadata");
    expect(markdown).toContain("## Selected Source Files");
    expect(markdown).toContain("src/index.ts");
  });
});

```

### tests/tokenEstimator.test.ts

```ts
import { describe, expect, it } from "vitest";
import { estimateTokens } from "../src/tokenEstimator.js";

describe("estimateTokens", () => {
  it("estimates tokens from character count", () => {
    expect(estimateTokens("12345678")).toBe(2);
    expect(estimateTokens("12345")).toBe(2);
    expect(estimateTokens("")).toBe(0);
  });
});

```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "types": ["node"]
  },
  "include": ["src/**/*.ts"]
}

```

## Suggested Instructions for AI Coding Agents

```text
You are working inside this codebase.
Use the file tree and selected source excerpts as context.
Do not modify unrelated files.
Preserve existing behavior unless explicitly asked to change it.
Run relevant tests after changes.
Summarize changes clearly.
```
