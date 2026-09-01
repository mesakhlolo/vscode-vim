# vscode-lazyvim

Setup VSCode + [VSCodeVim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) agar shortcut & keybinding semirip mungkin dengan [LazyVim](https://www.lazyvim.org/keymaps).

## Cara Pakai (tinggal copy-paste)

1. **Install VSCodeVim** di VSCode.
2. **settings.json** → buka Command Palette (`Ctrl+Shift+P`) → `Preferences: Open User Settings (JSON)`, lalu salin isi `settings.json` ini ke file tersebut (gabungkan dengan setting lain yang sudah ada, jangan timpa seluruhnya jika sudah ada pengaturan lain).
3. **keybindings.json** → buka Command Palette → `Preferences: Open Keyboard Shortcuts (JSON)`, lalu salin isi `keybindings.json` ini ke dalam array tersebut.

> Catatan: kedua file ini adalah snippet. Jika `settings.json`/`keybindings.json` kamu sudah terisi, gabungkan (merge) — terutama untuk object-type setting seperti `vim.handleKeys` / `vim.normalModeKeyBindings`, dan tambahkan ke array untuk keybindings.

> **Catatan pendekatan:** SEMUA binding (termasuk leader `<space>`) didefinisikan di `keybindings.json` sebagai chord + `when` clause (pola dotfiles leviFrosty). Keunggulan: leader tetap bekerja di luar fokus editor (mis. preview README/wiki, panel, dsb) karena `when` memakai `vim.mode == 'Normal' && (editorTextFocus || !inputFocus)`. `settings.json` hanya berisi opsi `vim.*`. Format `keybindings.json` mengikuti docs [VSCode configure/keybindings](https://code.visualstudio.com/docs/configure/keybindings) (chord dipisah spasi, `when` clause). Setting VSCodeVim mengikuti docs [VSCodeVim README](https://github.com/VSCodeVim/Vim).

## Prasyarat

- Extension **VSCodeVim** (`vscodevim.vim`)
- Extension **Git** bawaan VSCode (untuk command `git.*` seperti `git.openChange`, `git.blame`, `git.log`) — sudah termasuk default.

## Leader Key

- Leader = `<space>` (semua mapping dimulai `<space>`)
- `vim.leader` = `<space>` dan `vim.timeout` = `500` (ms) — jeda melihat key kedua setelah chord, supaya tidak langsung trigger.
- Mapping ditulis literal sebagai chord di `keybindings.json` (contoh `"key": "space f f"`), dengan `when: vim.mode == 'Normal'`. Command yang bisa jalan di luar editor memakai `(editorTextFocus || !inputFocus)`.

## Daftar Keymap

### LSP (jalan otomatis via VSCodeVim / native vim)

Total `gd`, `gr`, `gI`, `gy`, `gD`, `K`, `gK`, `]]`, `[[`, `gc`, `gco`, `gs` (surround) — sudah tersedia di VSCodeVim, tidak perlu konfigurasi.

### Window (`<space>w`)

| Key         | Aksi          | VSCode command                        |
| ----------- | ------------- | ------------------------------------- |
| `<space>-`  | split below   | `workbench.action.splitEditorDown`    |
| `<space>\|` | split right   | `workbench.action.splitEditorRight`   |
| `<space>wd` | delete window | `workbench.action.closeGroup`         |
| `<space>wm` | toggle zoom   | `workbench.action.editorLayoutSingle` |

### Buffer (`<space>b`)

| Key                 | Aksi                | VSCode command                                                |
| ------------------- | ------------------- | ------------------------------------------------------------- |
| `<space>bb`         | switch buffer       | `workbench.action.quickOpenPreviousRecentlyUsedEditorInGroup` |
| `<space>bd`         | delete buffer       | `workbench.action.closeActiveEditor`                          |
| `<space>bo`         | close other buffers | `workbench.action.closeOtherEditors`          |

### File (`<space>f`)

| Key         | Aksi                      | VSCode command                               |
| ----------- | ------------------------- | -------------------------------------------- |
| `<space>ff` | find files                | `workbench.action.quickOpen`                 |
| `<space>fg` | git-files (modified)      | `git.openChange`                             |
| `<space>fr` | recent files              | `workbench.action.openRecent`                |
| `<space>fn` | new file                  | `workbench.action.files.newUntitledFile`     |
| `<space>ft` | terminal                  | `workbench.action.terminal.new`              |
| `<space>e`  | explorer (toggle sidebar) | `runCommands` (toggle sidebar + focus files) |

### Search (`<space>s`)

| Key         | Aksi                 | VSCode command                           |
| ----------- | -------------------- | ---------------------------------------- |
| `<space>sg` | grep / find in files | `workbench.action.findInFiles`           |
| `<space>sd` | diagnostics          | `workbench.actions.view.problems`        |
| `<space>sk` | show keymaps         | `workbench.action.openGlobalKeybindings` |
| `<space>ss` | LSP symbols          | `workbench.action.gotoSymbol`            |

### Git (`<space>g`)

| Key         | Aksi       | VSCode command                   |
| ----------- | ---------- | -------------------------------- |
| `<space>gs` | git status | `runCommands` (SCM view + focus) |
| `<space>gd` | git diff   | `git.openChange`                 |
| `<space>gb` | git blame  | `git.blame`                      |
| `<space>gl` | git log    | `git.log`                        |

### LSP / Code (`<space>c`)

| Key         | Aksi             | VSCode command                  |
| ----------- | ---------------- | ------------------------------- |
| `<space>ca` | code action      | `editor.action.codeAction`      |
| `<space>cr` | rename           | `editor.action.rename`          |
| `<space>cf` | format           | `editor.action.formatDocument`  |
| `<space>co` | organize imports | `editor.action.organizeImports` |
| `<space>cs` | symbols          | `workbench.action.gotoSymbol`   |

### Quit (`<space>q`)

| Key         | Aksi     | VSCode command                 |
| ----------- | -------- | ------------------------------ |
| `<space>qq` | quit all | `workbench.action.closeWindow` |

## Konflik yang Di-resolve

| Kombinasi   | LazyVim          | VS Code default     | Solusi                                                           |
| ----------- | ---------------- | ------------------- | ---------------------------------------------------------------- |
| `<C-a>`     | Increment (dial) | Select All          | `<C-a>: false` di handleKeys → Select All native (lebih berguna) |
| `<C-s>`     | Save             | Save (sama)         | `<C-s>: false` di handleKeys → Save native                       |
| `<space>w`  | window-prefix    | —                   | save pindah ke `<C-s>`, `<space>w` jadi window ops               |
| `<space>s`  | search-prefix    | —                   | split pindah ke `<space>-`/`<space>\|`, `<space>s` jadi search   |
| `<space>gd` | git diff         | —                   | go-to-def pakai `gd` native, `<space>gd` jadi git diff           |

## Catatan Perbedaan yang Disengaja

- **Ctrl+Space** dibiarkan native (Trigger Suggest / code completion), karena di VS Code lebih berguna daripada incremental selection LazyVim. Find files tetap di `<space>ff`.
- **`<C-h/j/k/l>`** window navigation LazyVim **tidak** diterapkan (dilewati) karena `<C-h>` di VS Code default = Replace/find. Navigator antar editor/buffer tetap bisa via `<space>bb`.
- Beberapa plugin LazyVim (noice scroll `<C-f>`/`<C-b>`, flash `<C-space>`, terminal `<C-/>`, Tab buffer nav) tidak dipetakan karena tidak relevan / ingin dihindari / sudah diganti pendekatan lain.
