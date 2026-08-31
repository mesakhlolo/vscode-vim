# Migrating from VS Code → Zed (Vim + PHP/Laravel + JavaScript)

This guide translates your **VS Code + vscode-vim** setup into **Zed**, following the
official Zed documentation. It covers:

1. Where your config files live on Windows
2. The vim mode settings (from `vim.normalModeKeyBindingsNonRecursive` etc.)
3. The `settings.json` equivalents (font, theme, formatting)
4. The `keymap.json` equivalents (your custom keybindings)
5. PHP / Laravel / Blade and JavaScript setup (extensions + language servers + formatting)
6. What does NOT map 1:1 (so you know what to expect)

Everything below is based on the official Zed docs and the official/listed extensions
from the Zed extension gallery. Where I could not verify something exists, I say so
explicitly instead of guessing.

---

## 0. Where your config files live (Windows)

On Windows, Zed stores config in the **Roaming** directory:

| File     | Path                          |
| -------- | ----------------------------- |
| Settings | `%APPDATA%\Zed\settings.json` |
| Keymap   | `%APPDATA%\Zed\keymap.json`   |

For you that is:
`C:\Users\mesakhlolo\AppData\Roaming\Zed\settings.json` and
`C:\Users\mesakhlolo\AppData\Roaming\Zed\keymap.json`

- `Zed` uses **JSONC** (JSON with `//` comments) for both files, so your `//` comments work as in VS Code.
- You can open these from inside Zed via the command palette:
  - `zed: open settings` / `zed: open settings file` (<kbd>ctrl-,</kbd> opens settings UI)
  - `zed: open keymap` / `zed: open keymap file` (<kbd>ctrl-k ctrl-s</kbd>)
- After editing, run `zed: reload settings and keymap`, or just restart Zed.
- Extensions are installed via the Extension Gallery: <kbd>ctrl-shift-x</kbd> or the
  `zed: extensions` command. Installed extensions live in `%LOCALAPPDATA%\Zed\extensions`.

---

## 1. Enabling Vim mode

In VS Code you enabled vscode-vim. In Zed, vim mode is **built in** — no extension needed.

### 1.1 Turn it on

Either:

- Toggle it via the command palette: `workspace: toggle vim mode`, **or**
- Add this to `settings.json`:

```jsonc
{
  "vim_mode": true,
}
```

### 1.2 "vim is not a second class citizen"

Zed's vim mode uses the editor's native features (semantic motions, multi-cursor,
macros, real project search). Several things you'd install plugins for in VS Code
are built in:

| vscode-vim setting / plugin   | Zed equivalent                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `vim.surround`                | Built in: `ys` (surround), `cs` (change surrounding), `ds` (delete surrounding) |
| comment/uncomment             | Built in: `gc` (visual), `gcc` (normal)                                         |
| `vim.easymotion`              | Zed's **Sneak** motion (two-char jump) — enable in keymap (see §4)              |
| `vim.highlightedyank.enable`  | `vim.highlight_on_yank_duration` (see §1.4)                                     |
| vscode-vim `g d` / `g .` etc. | Built in (`g .` = code actions, `g d` = go to definition)                       |

> Source: https://zed.dev/docs/vim — "Zed's vim mode ... replicates the behavior of motions and commands ... includes support for semantic navigation, multiple cursors, or other features usually provided by plugins like surrounding text."

### 1.3 vim mode settings

Your VS Code `vim.*` settings map to Zed's `vim` object in `settings.json`:

| VS Code                            | Zed                                                                                          | Notes                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `vim.useSystemClipboard: true`     | `"vim": { "use_system_clipboard": "always" }`                                                | `"always"` = use system clipboard for all operations         |
| `vim.smartRelativeLine: true`      | `"vim": { "toggle_relative_line_numbers": true }` (and `"relative_line_numbers": "enabled"`) | Relative in normal, absolute in insert                       |
| `vim.highlightedyank.enable: true` | `"vim": { "highlight_on_yank_duration": 200 }`                                               | ms of highlight; `0` disables                                |
| `vim.hlsearch` / `vim.incsearch`   | `"vim": { "use_regex_search": true }`                                                        | Zed's search is realtime; `use_regex_search` uses regex mode |
| `vim.useCtrlKeys: true`            | `vim_mode: true` (already global)                                                            | N/A in Zed                                                   |

> Source: https://zed.dev/docs/vim (Changing vim mode settings table).

### 1.4 About `:nohl` / `<Esc>` to clear search highlight

In VS Code you bound `<Esc>` to `:nohl`. **Zed does not have `:nohl`/`nohlsearch`** as of
this writing. Search highlight in Zed is tied to the search bar and clears as you move.
This is a known gap with no config workaround — you'll lose this single binding.

---

## 2. `settings.json` — translations from your VS Code settings

Your current `settings.json` (Roaming) already has theme, icon theme, and font size.
Here are the translated values to add/adjust. The table is the "why", the final file
is below.

| VS Code                                      | Zed                                                                                    |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `editor.fontFamily: "Cascadia Code NF"`      | `"buffer_font_family": "Cascadia Code NF"`                                             |
| `editor.fontSize: 16`                        | `"buffer_font_size": 16`                                                               |
| `editor.fontLigatures: false`                | `"buffer_font_features": { "calt": false }`                                            |
| `editor.cursorBlinking: "solid"`             | `"cursor_blink": false`                                                                |
| `workbench.colorTheme: "One Dark Pro"`       | `"theme": "One Dark"` (or install the **One Dark Pro** extension from the gallery)     |
| `workbench.iconTheme: "material-icon-theme"` | `"icon_theme": "Material Theme Icons"` (install the **Material Icon Theme** extension) |
| `editor.formatOnSave: true`                  | `"format_on_save": "on"`                                                               |
| `ui font size`                               | `"ui_font_size": 16`                                                                   |

> Notes:
>
> - "One Dark" is a **built-in** Zed theme. The **One Dark Pro** theme is a separate
>   extension in the gallery if you want the exact VS Code look.
> - The Material icon theme is a separate extension (already in your gallery, 419k installs).
> - Zed's default formatter for web languages is **Prettier**, matching your
>   `editor.defaultFormatter: esbenp.prettier-vscode`.

### 2.1 Example merged `settings.json`

```jsonc
{
  // === VS Code general settings that still make sense ===
  "buffer_font_family": "Cascadia Code NF",
  "buffer_font_size": 16,
  "buffer_font_features": { "calt": false },
  "ui_font_size": 16,
  "cursor_blink": false,
  "theme": "One Dark",
  "icon_theme": "Material Theme Icons",

  // === Vim mode (from vscode-vim) ===
  "vim_mode": true,
  "vim": {
    "use_system_clipboard": "always",
    "toggle_relative_line_numbers": true,
    "highlight_on_yank_duration": 200,
    "use_regex_search": true,
  },
  "relative_line_numbers": "enabled",

  // === Formatting (from editor.formatOnSave) ===
  "format_on_save": "on",

  // === Your existing settings, kept ===
  "cli_default_open_behavior": "existing_window",
  "show_completions_on_input": false,
  "show_edit_predictions": false,
  "use_autoclose": false,
  "project_panel": { "dock": "left" },
  "outline_panel": { "dock": "left" },
  "collaboration_panel": { "dock": "left" },
  "agent": { "dock": "right", "favorite_models": [], "model_parameters": [] },
  "git_panel": { "dock": "left" },
  "agent_servers": {
    "github-copilot-cli": { "type": "registry" },
  },
}
```

> Important caveat about `format_on_save` and PHP: Zed does **not** use a PHP formatter
> like Prettier by default. For PHP you configure a formatter yourself (see §5). The
> global `"format_on_save": "on"` only matters where a formatter is configured.

---

## 3. `keymap.json` basics

- Zed keymaps are a JSON **array** of objects, each with a `bindings` map and optional
  `context`.
- Keys are written like `space w`, `ctrl-enter`, `alt-;`, `shift-tab`.
- Contexts are where the binding applies, e.g. `vim_mode == normal`, `Editor`, `Workspace`.
- Actions are strings like `workspace::Save`.
- The VSCode base keymap can be switched on in settings with `"base_keymap": "VSCode"`
  if you want Zed's _defaults_ to feel like VS Code — but since you have custom vim
  bindings, the custom keymap below is the important part.

> Source: https://zed.dev/docs/key-bindings and https://zed.dev/docs/vim (customizing key bindings).

### 3.1 Contexts you'll use (from the vim docs)

- `vim_mode == normal` — normal mode
- `vim_mode == visual` — visual mode
- `vim_mode == insert` — insert mode
- `VimControl` — alias for `normal || visual || operator`
- `Editor` — focused editor
- `!menu` — not inside a menu/picker

Note: vim contexts are set at the **Editor** level, so use `vim_mode == ...` (not
`Workspace && vim_mode == ...`).

---

## 4. `keymap.json` — translating your keybindings

Here is your full VS Code `keybindings.json` mapped to Zed. This is ready to paste
into `%APPDATA%\Zed\keymap.json`.

### 4.1 The mapping table

| VS Code binding | VS Code command                 | Zed binding  | Zed action                                           |
| --------------- | ------------------------------- | ------------ | ---------------------------------------------------- |
| `alt+;`         | cursorEnd + type `;`            | `alt-;`      | `["workspace::SendKeystrokes", "end ;"]`             |
| `ctrl+enter`    | `editor.action.insertLineAfter` | `ctrl-enter` | `editor::NewlineBelow`                               |
| `ctrl+0`        | `workbench.action.zoomReset`    | `ctrl-0`     | `["zed::ResetBufferFontSize", { "persist": false }]` |
| `space w`       | save + format                   | `space w`    | `workspace::Save` (formatting happens on save)       |
| `space q`       | close active editor             | `space q`    | `pane::CloseActiveItem`                              |
| `space f f`     | quick open (find file)          | `space f f`  | `file_finder::Toggle`                                |
| `space f g`     | find in files                   | `space f g`  | `pane::DeploySearch`                                 |
| `space e`       | toggle explorer                 | `space e`    | `workspace::ToggleLeftDock`                          |
| `space g d`     | go to definition                | `space g d`  | `editor::GoToDefinition`                             |
| `space c a`     | code action                     | `space c a`  | `editor::ToggleCodeActions`                          |
| `space r n`     | rename symbol                   | `space r n`  | `editor::Rename`                                     |
| `space s`       | split right                     | `space s`    | `pane::SplitRight`                                   |
| `space v`       | split down                      | `space v`    | `pane::SplitDown`                                    |
| `space k w`     | close all editors               | `space k w`  | `pane::CloseAllItems`                                |
| `tab`           | next editor in group            | `tab`        | `pane::ActivateNextItem`                             |
| `shift+tab`     | previous editor in group        | `shift-tab`  | `pane::ActivatePreviousItem`                         |

> `space w`: In VS Code you chained "save" then "format". In Zed, `format_on_save`
> already formats when you save, so `space w → workspace::Save` gives you the same result.

### 4.2 Example `keymap.json`

```jsonc
[
  {
    "context": "Editor && mode == full",
    "bindings": {
      "alt-;": ["workspace::SendKeystrokes", "end ;"],
      "ctrl-enter": "editor::NewlineBelow",
      "ctrl-0": ["zed::ResetBufferFontSize", { "persist": false }],
    },
  },
  {
    "context": "vim_mode == normal && !menu",
    "bindings": {
      "space w": "workspace::Save",
      "space q": "pane::CloseActiveItem",
      "space f f": "file_finder::Toggle",
      "space f g": "pane::DeploySearch",
      "space e": "workspace::ToggleLeftDock",
      "space g d": "editor::GoToDefinition",
      "space c a": "editor::ToggleCodeActions",
      "space r n": "editor::Rename",
      "space s": "pane::SplitRight",
      "space v": "pane::SplitDown",
      "space k w": "pane::CloseAllItems",
      "tab": "pane::ActivateNextItem",
      "shift-tab": "pane::ActivatePreviousItem",
    },
  },
  {
    // Optional: enable Sneak (easiest easymotion/2-char jump equivalent)
    "context": "vim_mode == normal || vim_mode == visual",
    "bindings": {
      "s": "vim::PushSneak",
    },
  },
]
```

> `tab`/`shift-tab` in vim normal mode override the default snippet/completion tab
> behavior; if you find `tab` conflicts while typing in insert mode, move those two
> lines into `vim_mode == normal` only (as shown here) or to an `Editor && !showing_completions` context.

---

## 5. PHP / Laravel / Blade setup

This is the part where Zed differs most from VS Code: **languages are extensions** in
Zed, and PHP needs PHP installed on your `PATH`.

### 5.1 Install PHP

The PHP extension requires PHP in your `PATH`. Verify with `where php` (Windows).
The official PHP page shows the install per-OS:

- macOS: `brew install php`
- Debian/Ubuntu: `sudo apt-get install php-cli`

### 5.2 Extensions to install (from the Zed extension gallery)

Open the gallery (<kbd>ctrl-shift-x</kbd> or `zed: extensions`) and install:

| Extension              | What it gives you                                                                                          | Install id / repo                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **PHP**                | PHP syntax + language servers (Phpactor default, Intelephense, PHP Tools, PHPantom) + Xdebug debug adapter | `zed-extensions/php`                                       |
| **Laravel Blade**      | Blade directive syntax highlighting + Blade-aware language servers                                         | `bajrangCoder/zed-laravel-blade`                           |
| **Laravel (Official)** | Laravel LSP: completions, hover, diagnostics, code actions for PHP & Blade                                 | `zed.dev/extensions/laravel-official` (Laravel team, 2026) |
| **Emmet**              | Emmet support (abbreviations)                                                                              | `zed-extensions/emmet`                                     |
| **Tailwind CSS**       | Tailwind IntelliSense in HTML/JSX/Blade                                                                    | Tailwind CSS extension                                     |

> Sources:
>
> - https://zed.dev/docs/languages/php
> - https://zed.dev/extensions/blade
> - https://zed.dev/extensions/laravel (Community Edition) and the official Laravel Zed extension (Laravel News, 2026)
> - https://zed.dev/extensions/emmet

### 5.3 Make `.blade.php` open as Blade

`*.blade.php` would otherwise be treated as plain PHP. Add to `settings.json`
(recommended by the Blade extension's README):

```jsonc
{
  "file_types": {
    "Blade": ["*.blade.php"],
  },
}
```

### 5.4 Choose your PHP language server

The PHP extension uses **Phpactor by default**. If you used Intelephense in VS Code
(your old `bmewburn.vscode-intelephense-client`), you can switch the PHP language
server to Intelephense in `settings.json`:

```jsonc
{
  "languages": {
    "PHP": {
      "language_servers": [
        "intelephense",
        "!phpactor",
        "!phptools",
        "!phpantom",
        "...",
      ],
    },
  },
}
```

> Intelephense is **proprietary / freemium**. Some features need a premium license,
> which you put in `%USERPROFILE%\intelephense\licence.txt` (Windows), or pass via
> `lsp.intelephense.initialization_options.licenceKey`.

> ⚠️ **Important (from the Community Edition docs):** if you set an explicit
> `language_servers` list for PHP or Blade, that list **replaces** Zed's defaults —
> you must include `"laravel-lsp"` if you use the Laravel extension, or its features
> will go silent in `.php`/`.blade.php` files. Include all the servers you want active.

### 5.5 PHP formatting

Zed does **not** ship a PHP formatter. The common Laravel choice is **Pint**
(`composer require laravel/pint --dev`). Configure it as an external formatter for
PHP in `settings.json`:

```jsonc
{
  "languages": {
    "PHP": {
      "formatter": {
        "external": {
          "command": "vendor/bin/pint",
          "arguments": ["--stdin"],
        },
      },
    },
  },
}
```

> The exact `command`/`arguments` depend on your Pint version. Read Laravel Pint's docs
> for the stdin flag to use, and confirm `vendor/bin/pint` is reachable from your project.

### 5.6 Tailwind inside PHP / Blade / JSX

If you use Tailwind, configure the Tailwind language server so it finds classes in PHP,
Blade, and JavaScript attributes. From the official PHP page:

```jsonc
{
  "lsp": {
    "tailwindcss-language-server": {
      "settings": {
        "includeLanguages": {
          "php": "html",
          "blade": "html",
        },
        "experimental": {
          "classRegex": [
            "class=\"([^\"]*)\"",
            "class='([^']*)'",
            "class=\\\"([^\\\"]*)\\\"",
            "@class\\(\\[([^\\]]*)\\]\\)",
          ],
        },
      },
    },
  },
}
```

> The Blade `@class([...])` regex comes from the official PHP docs' "Laravel/Blade" section.

### 5.7 Debugging PHP (Xdebug)

The PHP extension ships an **Xdebug** debug adapter. You configure it in
`.zed/debug.json` (project-level) or via `debugger: start`. Example from the official docs:

```json
[
  {
    "label": "PHP: Listen to Xdebug",
    "adapter": "Xdebug",
    "request": "launch",
    "port": 9003
  }
]
```

> Relevance to you: only needed if you debug PHP. Laravel usually runs via `php artisan
serve` + browser; Zed can run tasks instead (see "Also useful" below).

---

## 6. JavaScript setup

### 6.1 Language server

JavaScript/TypeScript support is **native** — no extension needed. Zed uses **vtsls**
by default for JS/TS/TSX. JavaScript also works out of the box.

### 6.2 Formatting (Prettier)

Zed uses **Prettier** by default for web languages (HTML, JS, TS, CSS, and PHP-if-configured).
The official JavaScript page notes that **format-on-save is disabled by default for JS**
unless enabled. To enable it (matching your VS Code `formatOnSave`):

```jsonc
{
  "languages": {
    "JavaScript": { "format_on_save": "on" },
    "TypeScript": { "format_on_save": "on" },
  },
}
```

### 6.3 ESLint

If you want ESLint to auto-fix on save (like VS Code's eslint extension), use `code_actions_on_format`
with the **eslint** language server (from the official JS docs):

```jsonc
{
  "languages": {
    "JavaScript": {
      "code_actions_on_format": {
        "source.fixAll.eslint": true,
      },
    },
  },
}
```

To make ESLint the _only_ thing that runs on save (so Prettier doesn't overwrite it):

```jsonc
{
  "languages": {
    "JavaScript": {
      "formatter": [],
      "code_actions_on_format": {
        "source.fixAll.eslint": true,
      },
    },
  },
}
```

### 6.4 Optional: inlay hints & code lens

The TS docs show optional inlay hints (function param/return types) and code lens
(reference/implementation counts). Enable code lens with:

```jsonc
{
  "code_lens": "on",
}
```

### 6.5 Debugging JavaScript

Zed debugs JS out of the box via `vscode-js-debug`. `debugger: start` (<kbd>f4</kbd>)
shows predefined tasks from `package.json` and popular test frameworks (Jest, Vitest,
Node, Bun). `.vscode/launch.json` files also work. Custom configs go in `.zed/debug.json`.

---

## 7. What does NOT map 1:1

Be honest with yourself about these gaps so the switch isn't frustrating:

| VS Code feature                                                                         | Zed status                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:nohl` / clear search highlight via `<Esc>`                                            | **Not available** (search highlight tied to search bar)                                                                                                                                                                                                                           |
| Emmet **balance-in / balance-out / wrap-with-abbreviation** (`alt+i`, `alt+o`, `alt+a`) | The **Emmet** extension installs, but Zed's Emmet provides abbreviation expansion; dedicated balance/wrap _actions may not exist_. Verify actual actions with `zed: open keymap` / command palette before adding the bindings — do not assume the VS Code command names transfer. |
| `github.copilot.generate` & your Copilot enable config                                  | Replaced by Zed's **agent** (Copilot via `github-copilot-cli` agent server, already in your settings). No `github.copilot.generate` keybinding equivalent.                                                                                                                        |
| VS Code settings that have no Zed equivalent                                            | e.g. `editor.guides.bracketPairs`, `workbench.experimental.modernUI`, `chat.*`, `activityBar` — these are UI features with no direct setting in Zed.                                                                                                                              |
| `vim.normalModeKeyBindingsNonRecursive`                                                 | Zed handles leader bindings via keymap contexts (`vim_mode == normal`) instead.                                                                                                                                                                                                   |

---

## 8. "Also useful" (from the docs, they help with Laravel)

- **Run tasks / artisan** — Zed has a task system (`tasks.json` or `.zed/tasks.json`).
  You can define `php artisan serve`, `php artisan test`, `npm run dev` etc. and launch
  them from within the editor.
- **Terminal** — built-in terminal (<kbd>ctrl-`</kbd> to toggle / `terminal_panel::Toggle`).
- **Command aliases** — in `vim` mode you can add short ex-command aliases via
  `command_aliases` in settings (e.g. `"W": "w"`).

---

## 9. Final checklist

1. Set `"vim_mode": true` in `settings.json`. ✅
2. Paste the translated vim/editor settings (§2.1). ✅
3. Create/update `keymap.json` with your bindings (§4.2). ✅
4. Install extensions: **PHP**, **Laravel Blade**, **Laravel (Official)**, **Emmet**,
   **Tailwind CSS**, **Material Icon Theme** (if you want material icons). ✅
5. Add `file_types: { "Blade": ["*.blade.php"] }` (§5.3). ✅
6. Choose PHP language server — Phpactor (default) or Intelephense (§5.4). ✅
7. Configure PHP formatter (Pint) and enable JS/TS `format_on_save` (§5.5, §6.2). ✅
8. (Optional) Tailwind classRegex, ESLint on-save, debugging configs. ✅
9. Run `zed: reload settings and keymap` and test.

---

## References (all official)

- Zed Vim mode: https://zed.dev/docs/vim
- Zed all settings: https://zed.dev/docs/configuring-zed
- Zed key bindings: https://zed.dev/docs/key-bindings
- Zed PHP: https://zed.dev/docs/languages/php
- Zed JavaScript: https://zed.dev/docs/languages/javascript
- Zed TypeScript: https://zed.dev/docs/languages/typescript
- Zed HTML: https://zed.dev/docs/languages/html
- Zed installing extensions: https://zed.dev/docs/extensions/installing-extensions
- PHP extension: https://zed.dev/extensions/php
- Blade extension: https://zed.dev/extensions/blade
- Laravel (CE) extension: https://zed.dev/extensions/laravel
- Emmet extension: https://zed.dev/extensions/emmet
