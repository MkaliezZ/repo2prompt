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
