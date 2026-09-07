# Homebrew manifest. Install with `brew bundle --file=Brewfile`, or via ./install
# which also trusts the third-party taps first (Homebrew 6 refuses to load them
# otherwise, and `brew bundle dump` silently omits their formulae).

# --- Taps -----------------------------------------------------------------
tap "hashicorp/tap"
tap "databricks/tap"

# --- Languages & runtimes -------------------------------------------------
brew "go"
brew "node"
brew "openjdk@21"
brew "python@3.14"

# --- Python tooling -------------------------------------------------------
brew "uv"
brew "poetry"
brew "pre-commit"
brew "cookiecutter"
brew "jupyterlab"
brew "docutils"

# --- Cloud, Kubernetes, IaC -----------------------------------------------
brew "ansible"
brew "awscli"
brew "helm"
brew "kind"
brew "kustomize"
brew "minikube"
brew "terraform-docs"
brew "tflint"
brew "hashicorp/tap/terraform"
brew "databricks/tap/databricks"

# --- Git & CLI ------------------------------------------------------------
brew "git"
brew "git-lfs"
brew "glab"
brew "herdr"
brew "htop"
brew "jq"
brew "wget"
brew "yarn"
brew "cloc"
brew "zsh-autocomplete"

# --- Data, media, codegen -------------------------------------------------
brew "asyncapi"
brew "ffmpeg"
brew "graphviz"
brew "librdkafka"
brew "protobuf"
brew "tesseract"

# --- Libraries (also pulled in as dependencies; pinned for reproducibility) --
brew "cffi"
brew "glib"
brew "gnutls"
brew "harfbuzz"
brew "libass"
brew "libmicrohttpd"
brew "librist"
brew "pango"
brew "pkgconf"
brew "pycparser"

# --- Casks: GUI apps ------------------------------------------------------
cask "claude"
cask "claude-code"
cask "codex"
cask "chatgpt"
cask "dbeaver-community"
cask "docker-desktop"
cask "enpass"
cask "firefox"
cask "hazeover"
cask "iterm2"
cask "leapp"
cask "lens"
cask "notunes"
cask "slack"
cask "sublime-text"
cask "tailscale-app"
cask "visual-studio-code"
cask "amneziavpn"
cask "yandex-music"

# Apps the work device-management agent installs (security tooling, Office,
# VPN and remote-support clients) are left out on purpose — brew and the MDM
# agent would otherwise fight over the same app bundles.

# --- Go tools -------------------------------------------------------------
go "github.com/go-delve/delve/cmd/dlv"
go "github.com/fatih/gomodifytags"
go "github.com/haya14busa/goplay/cmd/goplay"
go "golang.org/x/tools/gopls"
go "github.com/cweill/gotests/gotests"
go "github.com/josharian/impl"
go "google.golang.org/protobuf/cmd/protoc-gen-go"
go "google.golang.org/grpc/cmd/protoc-gen-go-grpc"
go "honnef.co/go/tools/cmd/staticcheck"

# --- npm globals ----------------------------------------------------------
npm "@elevenlabs/cli"

# --- VS Code extensions ---------------------------------------------------
vscode "anthropic.claude-code"
vscode "bierner.markdown-mermaid"
vscode "claudineyqr.plantuml-snippets"
vscode "docker.docker"
vscode "donjayamanne.githistory"
vscode "eamodio.gitlens"
vscode "esbenp.prettier-vscode"
vscode "gitlab.gitlab-workflow"
vscode "golang.go"
vscode "graphql.vscode-graphql"
vscode "graphql.vscode-graphql-syntax"
vscode "hashicorp.terraform"
vscode "jebbs.plantuml"
vscode "k--kato.intellij-idea-keybindings"
vscode "kevinrose.vsc-python-indent"
vscode "leetcode.vscode-leetcode"
vscode "mhutchie.git-graph"
vscode "ms-azuretools.vscode-azureterraform"
vscode "ms-azuretools.vscode-containers"
vscode "ms-azuretools.vscode-docker"
vscode "ms-python.debugpy"
vscode "ms-python.python"
vscode "ms-python.vscode-pylance"
vscode "ms-python.vscode-python-envs"
vscode "ms-toolsai.jupyter"
vscode "ms-toolsai.jupyter-keymap"
vscode "ms-toolsai.jupyter-renderers"
vscode "ms-toolsai.vscode-jupyter-cell-tags"
vscode "ms-toolsai.vscode-jupyter-slideshow"
vscode "ms-vscode-remote.remote-containers"
vscode "ms-vscode-remote.remote-ssh"
vscode "ms-vscode-remote.remote-ssh-edit"
vscode "ms-vscode.cpptools-extension-pack"
vscode "ms-vscode.makefile-tools"
vscode "ms-vscode.remote-explorer"
vscode "njpwerner.autodocstring"
vscode "openai.chatgpt"
vscode "redhat.vscode-yaml"
vscode "vscjava.migrate-java-to-azure"
vscode "whitespots.whitespots-application-security"
vscode "zxh404.vscode-proto3"
