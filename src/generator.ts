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
