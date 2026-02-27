# Dotfiles

Personal dotfiles for macOS, managed with a simple install script.

Inspired by [sobolevn/dotfiles](https://github.com/sobolevn/dotfiles).

## Contents

| Path | Description |
|---|---|
| `Brewfile` | Homebrew taps, formulae, casks, Go tools & VS Code extensions |
| `vscode/` | VS Code settings, keybindings & extensions list |
| `install` | Bootstrap script — installs brew deps, symlinks configs |

## Installation

```bash
git clone https://github.com/<you>/dotfiles ~/dotfiles
cd ~/dotfiles
bash ./install
```

> The install script backs up any existing files before symlinking.

## VS Code

Configuration lives in `vscode/`:

- **settings.json** — editor settings (formatting, telemetry, Copilot, Docker, Terraform, etc.)
- **keybindings.json** — custom keybindings (`alt+1‑4` for panels, case transforms, etc.)
- **extensions.txt** — full list of installed extensions (installed automatically by `./install`)

### Manually export current state

```bash
# Update settings & keybindings (already symlinked, so they stay in sync)

# Re-export extensions list
code --list-extensions | sort > vscode/extensions.txt
```

## Adding more configs later

The `install` script is designed to grow. Add new `setup_*` functions for shell, git, Brew, macOS defaults, etc. — just like [sobolevn/dotfiles](https://github.com/sobolevn/dotfiles) does.

## License

[WTFPL](https://en.wikipedia.org/wiki/WTFPL) — do what you want.
