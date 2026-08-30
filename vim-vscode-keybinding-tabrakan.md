# Tabrakan Keybinding: VS Code ↔ Vim (VSCodeVim)

Analisis perbandingan keybinding **default VS Code** vs **keybinding Vim** (extension `vscodevim.vim`, setting utama `vim.useCtrlKeys: true`).

Fokus: kombinasi `Ctrl` yang dipakai **dua-duanya** dan saling bertabrakan. File ini **hanya penjelasan + perbandingan** — keputusan penggantian diserahkan ke kamu.

> Konvensi: mode di sini = **Normal mode Vim** (kecuali disebut lain).
> `vim.useCtrlKeys: true` (default) artinya VS Code **menyerahkan** seluruh `Ctrl+...` ke Vim selama editor punya fokus teks → **Vim yang menang** kecuali dikecualikan lewat `vim.handleKeys`.

---

## 🔴 A. Tabrakan Langsung (Ctrl sama dipakai, Vim menang default)

| `Ctrl+...`   | Default VS Code                                                  | Vim (normal mode)                              | Dampak                         |
| ------------ | ---------------------------------------------------------------- | ---------------------------------------------- | ------------------------------ |
| **`Ctrl+B`** | Toggle Sidebar                                                   | Scroll layar ke **atas** (half-page up)        | Sidebar VS Code hilang         |
| **`Ctrl+F`** | Find                                                             | Scroll layar ke **bawah** (page down)          | Find VS Code hilang            |
| **`Ctrl+V`** | Paste                                                            | **Visual Block** mode                          | Paste VS Code hilang           |
| **`Ctrl+C`** | Copy                                                             | **Cancel/masuk Normal** (bila `overrideCtrlC`) | Copy VS Code hilang            |
| **`Ctrl+Y`** | Redo                                                             | Scroll layar atas 1 baris                      | Redo VS Code hilang            |
| **`Ctrl+R`** | Replace (Find)                                                   | **Redo Vim**                                   | Replace VS Code hilang         |
| **`Ctrl+D`** | Add Selection to Next Match                                      | Scroll layar **bawah** setengah hal            | Multi-cursor VS Code hilang    |
| **`Ctrl+U`** | Undo Cursor Operation                                            | Scroll layar **atas** setengah hal             | Undo cursor VS Code hilang     |
| **`Ctrl+A`** | Select All                                                       | **Increment** angka di bawah kursor            | Select All VS Code hilang      |
| **`Ctrl+X`** | Cut                                                              | **Decrement** angka                            | Cut VS Code hilang             |
| **`Ctrl+W`** | Close Editor                                                     | Prefix **window Vim** (`w` + motion)           | Close tab VS Code hilang       |
| **`Ctrl+O`** | Open File                                                        | **Jump list mundur** (jump back)               | Open File VS Code hilang       |
| **`Ctrl+P`** | Quick Open / Go to File                                          | Autocomplete prev (insert mode)                | Quick Open VS Code hilang      |
| **`Ctrl+K`** | Prefix banyak perintah VS Code (`K S` save, `K C` komentar, dsb) | Insert digraph (insert) / `K`                  | Rangkaian chord VS Code hilang |
| **`Ctrl+L`** | Select Current Line                                              | Scroll layar ke kanan / navigate               | Select line VS Code hilang     |
| **`Ctrl+N`** | New File                                                         | Baris bawah / autocomplete next                | New File VS Code hilang        |
| **`Ctrl+T`** | Show All Symbols                                                 | Tab related                                    | Symbols VS Code hilang         |
| **`Ctrl+G`** | Go to Line                                                       | Info file / cari                               | Go to Line VS Code hilang      |
| **`Ctrl+M`** | Toggle Tab Focus                                                 | Sama dgn `Enter`                               | Tab focus VS Code hilang       |
| **`Ctrl+I`** | Inline Chat                                                      | **Jump list maju** (Tab char)                  | Inline Chat VS Code hilang     |

---

## 🟡 B. Tabrakan Sebagian / Sudah Di-Delegasikan (aman secara default)

Yang ini **bawaan** sudah diserahkan ke VS Code lewat `vim.handleKeys`, jadi **tidak** jadi masalah:

| `Ctrl+...`   | Default VS Code      | Catatan                                                               |
| ------------ | -------------------- | --------------------------------------------------------------------- |
| **`Ctrl+S`** | Save                 | Default `vim.handleKeys: "<C-s>": false` → milik VS Code ✅           |
| **`Ctrl+Z`** | Undo                 | Default `"<C-z>": false` → milik VS Code ✅ (Vim undo bisa lewat `u`) |
| **`Ctrl+E`** | Scroll bawah 1 baris | Vim pakai juga; tabrakan ringan                                       |

---

## ⚪ C. Tidak Bertabrakan (Vim tidak ambil alih)

Vim **tidak** meng-override kombinasi `Ctrl+Shift+...`, jadi yang ini **aman** selalu:

- `Ctrl+Shift+P` Command Palette
- `Ctrl+Shift+E` Explorer
- `Ctrl+Shift+F` Search
- `Ctrl+Shift+X` Extensions
- `Ctrl+Shift+B` Build Task
- `Ctrl+Shift+K` Delete Line
- `Ctrl+Shift+L` Select All Occurrences
- `Ctrl+Shift+V` Markdown Preview
- `Ctrl+Shift+G` Source Control
- `Ctrl+Shift+D` Debug / Run
- `Ctrl+Shift+O` Go to Symbol
- `Ctrl+Shift+M` Problems
- `Ctrl+Shift+C` Terminal native

Juga aman (Vim tidak override di sebagian besar kasus):

- `Ctrl+,` Settings
- `Ctrl+/` Toggle Line Comment
- `Ctrl+.` Quick Fix
- `Ctrl+Tab` / `Ctrl+Shift+Tab`
- `Ctrl+`` ` Terminal
- `Ctrl+Enter` Insert Line After
- `Ctrl+Space` Trigger Suggest
- `Ctrl+1 / 2 / 3` Focus Editor Group

---

## 📊 D. Ringkasan Fokus (paling sering bikin bingung)

| Tombol   | VS Code      | Vim             | Verdict                |
| -------- | ------------ | --------------- | ---------------------- |
| `Ctrl+B` | Sidebar      | scroll atas     | ⚠️ Vim menang          |
| `Ctrl+F` | Find         | scroll bawah    | ⚠️ Vim menang          |
| `Ctrl+V` | Paste        | visual block    | ⚠️ Vim menang          |
| `Ctrl+C` | Copy         | cancel          | ⚠️ Vim (bila override) |
| `Ctrl+Y` | Redo         | scroll atas     | ⚠️ Vim menang          |
| `Ctrl+R` | Replace      | Vim-redo        | ⚠️ Vim menang          |
| `Ctrl+D` | multi-cursor | scroll bawah    | ⚠️ Vim menang          |
| `Ctrl+A` | Select All   | increment angka | ⚠️ Vim menang          |

---

## 🛠️ E. Cara Melepas Balik ke VS Code (referensi keputusan)

Tabrakan bisa dilepas ke VS Code satu per satu via `vim.handleKeys` di `settings.json`:

```json
"vim.handleKeys": {
  "<C-a>": false,   // Select All
  "<C-b>": false,   // Sidebar
  "<C-f>": false,   // Find
  "<C-v>": false,   // Paste
  "<C-c>": false,   // Copy
  "<C-y>": false,   // Redo
  "<C-r>": false,   // Replace
  "<C-d>": false,   // multi-cursor
  "<C-u>": false,   // undo cursor
  "<C-w>": false,   // Close Editor
  "<C-o>": false,   // Open File
  "<C-p>": false,   // Quick Open
  "<C-k>": false    // chord perintah VS Code
}
```

**Trade-off yang harus dipertimbangkan:**

- Melepas `<C-d>` / `<C-u>` juga menghilangkan gerakan Vim **setengah halaman** (jadi harus pakai `Ctrl+F`/`Ctrl+B` atau `zz`/`zb` untuk ganti).
- Melepas `<C-r>` → hilang **redo Vim**, ganti pakai VS Code Redo (`Ctrl+Shift+Z`).
- Melepas `<C-p>` → hilang autocomplete Vim prev di insert mode.

**Prinsip umum:** biarkan **Vim** menangani navigasi/editing teks, dan biarkan **VS Code** menangani fungsi editor global (sidebar, find, terminal, command palette). Kombinasi `Ctrl+Shift+...` sudah aman, jadi banyak fungsi VS Code tinggal pakai versi `Ctrl+Shift`-nya saja saat Vim aktif.

> **Catatan penting (mode):** `vim.handleKeys` berlaku terutama di **Normal mode**. Di **Insert mode**, beberapa `Ctrl` (mis. `<C-b>` untuk sidebar) tetap diteruskan ke VS Code walau setting `handleKeys` tidak diubah — perilaku bisa beda per mode.
