# vscode-lazyvim

Setup VSCode + [VSCodeVim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) dengan keybinding yang mengikuti [LazyVim](https://www.lazyvim.org/keymaps) — minimal, hanya yang paling sering dipakai.

## Cara Pakai (copy-paste)

1. **Install VSCodeVim** di VSCode.
2. **settings.json** → Command Palette (`Ctrl+Shift+P`) → `Preferences: Open User Settings (JSON)` → salin isi `settings.json`.
3. **keybindings.json** → Command Palette → `Preferences: Open Keyboard Shortcuts (JSON)` → salin isi `keybindings.json` ke dalam array `[]`.

> Kedua file adalah snippet. Jika sudah terisi, gabungkan (merge) — terutama setting object seperti `vim.handleKeys`, dan tambahkan ke array untuk keybindings.

> **Pendekatan:** SEMUA binding ditulis di `keybindings.json` sebagai chord + `when` clause (pola leviFrosty). Keunggulan: leader tetap bekerja di luar fokus editor (preview README/wiki, panel) karena `when: vim.mode == 'Normal' && (editorTextFocus || !inputFocus)`. `settings.json` hanya menampung opsi `vim.*`.

## Prasyarat

- Extension **VSCodeVim** (`vscodevim.vim`)

## Daftar Keymap (9)

### File & Window
| Key | Aksi | VSCode command |
|---|---|---|
| `<space>ff` | Find Files (Quick Open) | `workbench.action.quickOpen` |
| `<space>sg` | Search / Grep di project | `workbench.action.findInFiles` |
| `<space>w` | Save + Format | `runCommands` (save, formatDocument) |
| `<space>e` | Toggle Explorer (sidebar) | `workbench.action.toggleSidebarVisibility` |
| `gd` | Go to Definition | `editor.action.revealDefinition` |

### Buffer (Tab)
| Key | Aksi | VSCode command |
|---|---|---|
| `]b` | Next buffer (tab kanan) | `workbench.action.nextEditorInGroup` |
| `[b` | Prev buffer (tab kiri) | `workbench.action.previousEditorInGroup` |
| `<space>bd` | Delete buffer (close tab aktif) | `workbench.action.closeActiveEditor` |
| `<space>bo` | Delete other buffers (tutup semua tab lain) | `workbench.action.closeOtherEditors` |

## Catatan

- `gr` (go to references) dan LSP lain sudah tersedia native di VSCodeVim, tidak di-remap.
- Aman saat ngetik: di Insert mode `vim.mode == 'Insert'` ≠ `'Normal'`, jadi spasi untuk mengetik tetap normal.
- Simpel dan disengaja: tidak memetakan window split, git, terminal, dsb. — fokus ke navigasi + editing yang paling sering.

## Filosofi: Sedikit tapi Hafal

> **Cognitive Overload** — memasang 30–40 keybinding sekaligus bikin mikir 3 detik tiap kali mau bertindak: *"Duh, shortcut-nya apa ya?"*. Itu justru memperlambat ngoding dan bikin frustrasi.

> **Filosofi Pro:** *"Lebih baik punya 10 combo yang 100% sudah masuk memori otot (otomatis tanpa mikir), daripada hafal 50 combo tapi jarimu masih ragu-ragu."*

**Maka setup ini sengaja dibuat minimal (hanya 9 combo)** — semua yang paling sering dipakai. Bukan sekadar menyalin seluruh daftar keymap LazyVim.

**Cara pakai yang sehat:**
1. Mulai dari 9 combo ini sampai benar-benar otomatis (tanpa mikir).
2. Tambah keybinding baru **1–2 saja per kebutuhan** — hanya ketika kamu merasa kurang, bukan sekadar "biar lengkap".
3. Sering periksa: jika ada combo yang jarang terpakai, hapus/replace dengan yang lebih berguna.

Memori otot tumbuh dari **pengulangan**, bukan dari **banyaknya item**.