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
