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
