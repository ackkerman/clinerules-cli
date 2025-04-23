# clinerules-cli

```
$ clinerules
Usage: clinerules [options] [command]

Generate & manage .clinerules

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  build           assemble .clinerules (XX_*.md auto-merge)
  init [options]  copy templates (XX_*.md) into .cline/rules/
  help [command]  display help for command
```

- Self-build
  ```bash
  pnpm install
  pnpm run build
  npm link
  ```

## LICENSE

MIT License