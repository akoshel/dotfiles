# Dotfiles

macOS setup for a new machine. Captured from a MacBook running macOS 26.6
(Apple Silicon), Homebrew 6.

```bash
git clone <this-repo> ~/codebase/dotfiles
cd ~/codebase/dotfiles
./install
```

`./install` is idempotent — re-run it any time. Run individual steps with
`./install firefox vscode`, and list them with `./install --list`.

## What is in here

| Path | Description |
|---|---|
| `Brewfile` | Taps, formulae, casks, Go tools, npm globals, VS Code extensions |
| `vscode/` | Settings, keybindings, extension list |
| `firefox/` | Preferences, containers, protocol handlers, extensions, bookmarks |
| `git/` | Global gitignore |
| `claude/` | Claude Code global `CLAUDE.md` |
| `pre-zshenv`, `pre-zprofile`, `pre-zshrc` | zsh config, split by startup file |
| `install` | Bootstrap script |

Config is symlinked back to this repo, with any existing file moved aside to
`*.backup` first.

## Not in this repo

**Identity and machine state.** `~/.gitconfig` (name and email) and `htoprc`
are not tracked — set the first by hand, and htop rewrites the second anyway.

**Agent settings.** `~/.claude/settings.json` and `~/.codex/config.toml` are not
tracked — both tools rewrite them as you approve permissions and trust repos, so
they fill up with project paths and internal repo references. Only the global
`CLAUDE.md` is versioned.

**Shell secrets.** The `pre-zsh*` files are tracked, but `~/.zshenv.local` —
which they source, and which holds every API token — is not. Recreate it from
Enpass on a new machine.

**Personal browser data.** `firefox/bookmarks.json` is gitignored (it contains
internal hostnames). `bash firefox/export` regenerates it; copy it to the new
machine by hand and `firefox/apply` will point you at the restore dialog.

**MDM-managed apps.** Anything the work device-management agent installs
(security tooling, Office, VPN clients, remote support) is deliberately absent
from the `Brewfile`, so `brew` and the MDM agent do not fight over the same
app bundles. Those arrive on their own once the machine is enrolled.

## zsh

Three files, because zsh reads them at different times and it matters:

| File | Read when | Holds |
|---|---|---|
| `pre-zshenv` → `~/.zshenv` | **every** zsh, including non-interactive | env vars, build flags, and the `source` of `~/.zshenv.local` |
| `pre-zprofile` → `~/.zprofile` | login shells, after `path_helper` | `PATH` via `brew shellenv` |
| `pre-zshrc` → `~/.zshrc` | interactive shells only | Oh My Zsh, theme, completion |

Copy them into place by hand — `./install` deliberately does not, so it can
never overwrite a shell that still has credentials in it:

```bash
cp pre-zshenv ~/.zshenv && cp pre-zprofile ~/.zprofile && cp pre-zshrc ~/.zshrc
```

Two things that are easy to get wrong and are why the split looks like this:

- Tokens must be in `~/.zshenv`, not `~/.zshrc`. Only interactive shells read
  `.zshrc`, so `uv sync` from a script, a VS Code task or a pre-commit hook
  would not see `UV_INDEX_*_PASSWORD` and would fail against the private
  indexes with a 401 that looks unexplainable from a working terminal.
- `PATH` must be in `~/.zprofile`, not `~/.zshenv`. `/etc/zprofile` runs
  `path_helper`, which rebuilds `PATH` with the system directories first and
  everything else appended — putting `/opt/homebrew/bin` last.

## Homebrew and third-party taps

Homebrew 6 refuses to load formulae from untrusted taps, and — importantly —
`brew bundle dump` **silently omits them**. `terraform` (hashicorp/tap) and
`databricks` (databricks/tap) are therefore listed by hand in the `Brewfile`,
and `./install` runs `brew trust --tap` for both before bundling.

If you regenerate the `Brewfile` with `brew bundle dump`, check that both
survived before committing.

> On a machine that already has apps installed outside Homebrew (Docker, Firefox,
> Enpass, Tailscale…), `brew bundle install` will want to reinstall them under
> `brew` management. That is what you want on a clean machine; on an existing one,
> review the plan first.

## Firefox

`firefox/apply` (run by `./install firefox`) does the following, and **requires
Firefox to be closed** — Firefox rewrites `prefs.js` when it exits and would
undo the changes.

- symlinks `user.js` into the profile — behavioural preferences, reapplied at
  every launch: vertical tabs, sidebar tools, Claude as the AI sidebar provider,
  no new-tab widgets or sponsored content, Firefox password manager off (Enpass
  handles that), DoH pinned on
- merges `prefs-seed.js` into `prefs.js` **once** — toolbar and tab-strip
  layout. These are kept out of `user.js` on purpose, so rearranging your
  toolbar later actually persists. `FIREFOX_RESEED=1 bash firefox/apply` forces
  them back to the versioned state
- copies `containers.json` (Personal / Work / Banking / Shopping) and
  `handlers.json` (`mailto:` → Gmail, plus the `slack:`, `vscode:`, `claude:`,
  `msteams:` and `enpassauth:` handlers). These are copied rather than symlinked
  because Firefox replaces them atomically, which would break a symlink
- downloads each add-on in `extensions.txt` as a signed XPI from the AMO API and
  drops it into the profile. Firefox asks you to approve each one on first
  launch; that prompt is not scriptable

To push live changes back into the repo:

```bash
bash firefox/export     # then review with git diff
```

`firefox/mozlz4.py` decodes and encodes Firefox's `mozlz4` containers
(`bookmarks *.jsonlz4`, `search.json.mozlz4`). It is pure stdlib on purpose, so
it runs on a freshly imaged Mac with no `pip install` step.

Search engines are **not** versioned: the profile only had stock engines, and
the config embeds a profile-bound hash that will not transfer.

## Manual steps after ./install

- move `~/.zshrc` across and re-source it
- copy `firefox/bookmarks.json` over, then Firefox ▸ Bookmarks ▸ Manage
  Bookmarks ▸ Import and Backup ▸ Restore
- sign in: Enpass, Slack, Leapp/AWS, Tailscale, GitLab (`glab auth login`),
  Databricks
- SSH keys — generate fresh ones and register them, do not copy the old keys
- set your git identity: `git config --global user.name`/`user.email`

## License

[WTFPL](https://en.wikipedia.org/wiki/WTFPL) — do what you want.
