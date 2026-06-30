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
