# Repo2Prompt

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![CI](https://github.com/MkaliezZ/repo2prompt/actions/workflows/ci.yml/badge.svg)](https://github.com/MkaliezZ/repo2prompt/actions/workflows/ci.yml)

Turn any codebase into an AI-ready context pack for Claude Code, Codex, Cursor, Cline, Gemini CLI, GitHub Copilot, and other AI coding agents.

Repo2Prompt is a lightweight TypeScript CLI that scans a repository and generates a compact, structured set of Markdown files your coding agent can read before making changes.

Latest release: https://github.com/MkaliezZ/repo2prompt/releases/tag/v0.1.0

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
