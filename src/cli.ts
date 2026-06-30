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
