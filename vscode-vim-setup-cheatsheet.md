# Vim Motion di VSCode/VSCodium — TL;DR Cheatsheet

Terinspirasi dari dotfiles: <https://github.com/leviFrosty/dotfiles/tree/main/Library/Application%20Support>

---

## Vim settings kunci

`vim.useSystemClipboard` (clipboard nyambung, `y`/`p` lintas app) · `vim.useCtrlKeys` · `vim.smartRelativeLine` (nomor hybrid) · `vim.surround` (`ys/cs/ds`) · `vim.easymotion` (`\f`).

`vim.handleKeys`: `<C-a>` / `<C-f>` / `<C-j>` / `<C-p>` = `false` → biar VSCode yang pegang tombol ini. `Esc` di normal = bersihkan highlight search.

## Leader `space` (chord cepat)

| Keys                  | Aksi                 |
| --------------------- | -------------------- |
| `space w`             | Save + format        |
| `space q`             | Close editor         |
| `space f f`           | Find file            |
| `space f g`           | Find in files (grep) |
| `space e`             | Toggle explorer      |
| `space g d`           | Go to definition     |
| `space c a`           | Code action          |
| `space r n`           | Rename               |
| `space s` / `space v` | Split kanan / bawah  |
| `space k w`           | close all tabs       |

## Ctrl shortcuts

| Keys                | Aksi                        |
| ------------------- | --------------------------- |
| `ctrl+j`            | Buka/tutup terminal         |
| `ctrl+p`            | Find file                   |
| `ctrl+shift+o`      | Find function               |
| `ctrl+a`            | Select all                  |
| `ctrl+f`            | Find                        |
| `ctrl+s`            | Save (semua mode)           |
| `tab` / `shift+tab` | Tab berikutnya / sebelumnya |

## Ctrl yang dimakan vim (ubah ke `vim.handleKeys` untuk passthrough)

`ctrl+d` (scrolldown) · `ctrl+e` · `ctrl+r` (redo) · `ctrl+u` (page up) · `ctrl+y` · `ctrl+c` (arah ke normal mode) · `ctrl+v` (visual block di normal mode).

> **Copy-paste**: di insert mode `ctrl+c`/`ctrl+v` jalan biasa. Di normal mode pakai `y`/`p` (use system clipboard). `ctrl+shift+c`/`ctrl+shift+v` selalu jalan.

## Keybinding custom VSCode (ikut terbawa)

`alt+;` (tambah `;` di akhir) · `alt+i`/`alt+o`/`alt+a` (emmet) · `shift+alt+g` & `ctrl+alt+enter` (copilot — dimatikan) · `ctrl+enter` (insert line after) · `ctrl+0` (reset zoom).
