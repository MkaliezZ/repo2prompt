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
