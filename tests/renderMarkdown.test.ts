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
