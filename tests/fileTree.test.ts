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
