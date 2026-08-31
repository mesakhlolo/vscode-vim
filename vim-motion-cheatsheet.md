# Vim Motion Cheatsheet — Beginner → Intermediate

Reference singkat untuk belajar vim motion dari nol sampai intermediate.

---

## Cara Belajar Vim

1. **Vimtutor** — jalankan `vimtutor` di terminal (sudah include di Vim). ~30 menit.
2. **Tonton Ben Awad** — [Vim Tutorial](https://www.youtube.com/watch?v=IiwGbcd8S7I), 1 jam, covers basic sampai intermediate (moving, deleting, macros, refactoring, block commands).
3. **Langsung pakai** — activate vim mode di VS Code / Zed, pakai untuk daily coding.
4. **Ulangi** — setiap hari ingat 1-2 motion baru, lalu pakai sampai jadi habit.

---

## 1. Modes

| Mode | Tombol | Fungsi |
|------|--------|--------|
| Normal | `Esc` | Default, navigasi & editing |
| Insert | `i` | Mengetik teks |
| Visual | `v` | Select teks |
| Visual Block | `Ctrl+v` | Select kolom/vertikal |
| Command | `:` | Jalankan command (`:w`, `:q`, dll) |

---

## 2. Basic Movement

| Key | Aksi | Catatan |
|-----|------|---------|
| `h` | Kiri | |
| `j` | Bawah | |
| `k` | Atas | |
| `l` | Kanan | |

---

## 3. Word Motions

| Key | Aksi | Catatan |
|-----|------|---------|
| `w` | Next word (awal) | |
| `b` | Back word (awal) | |
| `e` | End of word | |
| `W` | Next WORD (whitespace) | Lebih agresif |
| `B` | Back WORD | |
| `E` | End of WORD | |

> **word** = `hello-world` = 2 word (`hello`, `word`)
> **WORD** = `hello-world` = 1 WORD (sampai spasi/tab baru)

---

## 4. Line Motions

| Key | Aksi |
|-----|------|
| `0` | Awal baris (kolom 0) |
| `^` | Awal non-kosong pertama |
| `$` | Akhir baris |
| `|` | Kolom spesifik (contoh: `10\|`) |

---

## 5. File Motions

| Key | Aksi |
|-----|------|
| `gg` | Awal file |
| `G` | Akhir file |
| `10G` | Baris ke-10 |
| `:10` | Baris ke-10 (command mode) |

---

## 6. Scrolling

| Key | Aksi |
|-----|------|
| `Ctrl+d` | Half page **down** |
| `Ctrl+u` | Half page **up** |
| `Ctrl+e` | Scroll down 1 line (cursor tetap) |
| `Ctrl+y` | Scroll up 1 line (cursor tetap) |
| `zz` | Center screen ke cursor |
| `zt` | Taruh cursor di top |
| `zb` | Taruh cursor di bottom |

---

## 7. Search

| Key | Aksi |
|-----|------|
| `/pattern` | Cari ke depan |
| `?pattern` | Cari ke belakang |
| `n` | Next match |
| `N` | Previous match |
| `*` | Cari word di bawah cursor |
| `#` | Cari word di bawah cursor (ke belakang) |

---

## 8. Operators + Motions (ini kuncinya!)

Vim = **operator** + **motion**. Kombinasinya unlimited.

| Operator | Fungsi |
|----------|--------|
| `d` | Delete |
| `c` | Change (delete + masuk insert mode) |
| `y` | Yank (copy) |
| `v` | Visual select |

Contoh:

| Combo | Aksi |
|-------|------|
| `dw` | Delete word |
| `d$` | Delete sampai akhir baris |
| `ciw` | Change entire word |
| `ci"` | Change isi dalam quotes |
| `yy` | Yank baris |
| `yG` | Yank sampai akhir file |
| `dG` | Delete sampai akhir file |
| `dt)` | Delete sampai sebelum `)` |
| `ct;` | Change sampai sebelum `;` |

---

## 9. Text Objects (intermediate)

Text objects pakai format: `i/a` + `object`

- `i` = inner (di dalam, tanpa delimiter)
- `a` = around (termasuk delimiter)

| Object | Fungsi |
|--------|--------|
| `w` | Word |
| `s` | Sentence |
| `p` | Paragraph |
| `"` | Quotes |
| `'` | Single quotes |
| `` ` `` | Backticks |
| `(` atau `)` | Parentheses |
| `[` atau `]` | Brackets |
| `{` atau `}` | Braces |
| `<` atau `>` | Angle brackets |
| `t` | HTML/XML tag |

Contoh:

| Combo | Aksi |
|-------|------|
| `diw` | Delete isi word |
| `daw` | Delete word + spasi |
| `ci"` | Ganti isi quotes |
| `da(` | Hapus termasuk parentheses |
| `dit` | Hapus isi tag HTML |
| `dat` | Hapus tag HTML + isinya |
| `yiw` | Yank word |
| `vi"` | Select isi quotes |

---

## 10. Repeat & Undo

| Key | Aksi |
|-----|------|
| `.` | **Repeat** action terakhir |
| `u` | Undo |
| `Ctrl+r` | Redo |

> `.` adalah satu-satunya macro paling powerful di Vim.
> Edit sekali, repeat berkali-kali.

---

## 11. Marks & Jumps

| Key | Aksi |
|-----|------|
| `m{a-z}` | Set mark di lokasi (contoh: `ma`) |
| `'{a-z}` | Jump ke mark |
| `Ctrl+o` | Jump ke lokasi sebelumnya |
| `Ctrl+i` | Jump ke lokasi berikutnya |

---

## 12. Useful Commands

| Key | Aksi |
|-----|------|
| `>>` | Indent baris |
| `<<` | Unindent baris |
| `~` | Toggle case |
| `J` | Gabung baris dengan baris bawah |
| `o` | Buka baris baru (insert, di bawah) |
| `O` | Buka baris baru (insert, di atas) |
| `A` | Append di akhir baris |
| `I` | Insert di awal baris |
| `x` | Hapus karakter di cursor |
| `r{char}` | Ganti karakter dengan char |

---

## 13. Visual Mode + Operators

| Key | Aksi |
|-----|------|
| `v` | Visual mode (character) |
| `V` | Visual mode (baris) |
| `Ctrl+v` | Visual mode (block/kolom) |
| `d` (di visual) | Delete selection |
| `y` (di visual) | Yank selection |
| `>` (di visual) | Indent selection |
| `<` (di visual) | Unindent selection |

---

## 14. Tips & Tricks

### The Holy Grail: `ciw`, `ci"`, `dit`

Paling sering dipakai untuk refactor/rename:
- `ciw` → ganti word saat ini
- `ci"` → ganti isi quotes
- `dit` → ganti isi tag HTML

### Dot command loop

1. Lakukan edit pertama: `ciw` → ketik baru → `Esc`
2. Pindah ke word berikutnya: `w`
3. Repeat: `.`
4. Ulangi sampai selesai

### Bukan cuma text

`d`, `c`, `y` bukan cuma buat text. Ini general purpose:
- `d/TODO` → delete sampai kata TODO berikutnya
- `ct;` → change sampai sebelum `;`
- `y$` → yank sampai akhir baris

### Jangan lupa visual block

`Ctrl+v` → select kolom → `I` atau `A` → ketik → `Esc`
Sangat powerful untuk edit multiple lines sekaligus.

---

## 15. Cheat Sheet Cepat (Print This!)

```
NAVIGASI
  h j k l         Basic movement
  w b e            Word forward/back/end
  0 ^ $            Line start/first-char/end
  gg G             File start/end
  H M L            Screen top/mid/bottom
  Ctrl+d/u         Half page down/up

EDITING
  i a I A o O      Insert modes
  x r ~            Delete char/replace/toggle case
  dd yy cc         Delete/yank/change line
  dw cw yw         Delete/yank/change word
  di" ci" yi"      Inside quotes
  dit cit yit      Inside tag
  .                Repeat last action
  u Ctrl+r         Undo/redo

SEARCH
  / ? n N          Search forward/back/next/prev
  * #              Word under cursor

VISUAL
  v V Ctrl+v       Visual line/block select
  d y > <          Delete/yank/indent in visual

TEXT OBJECTS
  i/a + w " ( { t
  diw ci" da( dit
```

---

## 16. Resource Belajar Gratis

| Resource | Link | Fungsi |
|----------|------|--------|
| **Vimtutor** | `vimtutor` di terminal | Tutorial interaktif bawaan Vim (~30 menit) |
| **Ben Awad — Vim Tutorial** | [YouTube](https://www.youtube.com/watch?v=IiwGbcd8S7I) | 1 jam, basic → intermediate (moving, macros, refactoring, block commands) |
| **Vim Master** | [vimmaster.net](https://vimmaster.net) | Latihan interactive online, newer |
| **OpenVim** | [openvim.com](https://openvim.com) | Tutorial interaktif visual |
| **Vim Genius** | [vimgenius.com](https://vimgenius.com) | Speed drill untuk hafalkan motion |
| **Vim Golf** | [vimgolf.com](https://vimgolf.com) | Challenges: solve editing tasks in fewest keystrokes |
| **Vim Training (practice files)** | [GitHub](https://github.com/AustinWongParker/Vim_Training) | Practice files dari Ben Awad's video |

### Rekomendasi Learning Path

```
Week 1:
  └─ Jalankan vimtutor (ulangi sampai nyaman)
  └─ Tonton Ben Awad's Vim Tutorial (YouTube)
  └─ Activate vim mode di VS Code / Zed

Week 2:
  └─ Fokus: h j k l, w b e, i a, dd yy cc, dw cw yw
  └─ Jangan pakai mouse sama sekali

Week 3:
  └─ Tambah: text objects (di", ciw, dit)
  └─ Latihan di vimgenius.com

Week 4+:
  └─ Mulai pakai dot command (.) untuk repeat
  └─ Coba vim golf challenges
  └─ Motion akan jadi muscle memory
```

---

## Referensi

- `:h motion` di Vim
- `:h text-objects` di Vim
- [Ben Awad — Vim Tutorial (YouTube)](https://www.youtube.com/watch?v=IiwGbcd8S7I)
- [Vim Cheat Sheet](https://vim.rtorr.com/)

---

*Last updated: August 2026*
