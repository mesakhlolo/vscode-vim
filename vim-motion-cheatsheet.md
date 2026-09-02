# Vim Motion Cheatsheet - Beginner → Intermediate

Reference singkat untuk belajar vim motion dari nol sampai intermediate.

---

## Cara Belajar Vim

1. **Vimtutor** - jalankan `vimtutor` di terminal (sudah include di Vim). ~30 menit.
2. **Tonton Ben Awad** - [Vim Tutorial](https://www.youtube.com/watch?v=IiwGbcd8S7I), 1 jam, covers basic sampai intermediate (moving, deleting, macros, refactoring, block commands).
3. **Langsung pakai** - activate vim mode di VS Code / Zed, pakai untuk daily coding.
4. **Ulangi** - setiap hari ingat 1-2 motion baru, lalu pakai sampai jadi habit.

---

## 1. Modes

| Mode         | Tombol   | Fungsi                             |
| ------------ | -------- | ---------------------------------- |
| Normal       | `Esc`    | Default, navigasi & editing        |
| Insert       | `i`      | Mengetik teks                      |
| Visual       | `v`      | Select teks                        |
| Visual Block | `Ctrl+v` | Select kolom/vertikal              |
| Command      | `:`      | Jalankan command (`:w`, `:q`, dll) |

---

## 2. Basic Movement

| Key | Aksi  | Catatan |
| --- | ----- | ------- |
| `h` | Kiri  |         |
| `j` | Bawah |         |
| `k` | Atas  |         |
| `l` | Kanan |         |

---

## 3. Word Motions

| Key | Aksi                   | Catatan       |
| --- | ---------------------- | ------------- |
| `w` | Next word (awal)       |               |
| `b` | Back word (awal)       |               |
| `e` | End of word            |               |
| `W` | Next WORD (whitespace) | Lebih agresif |
| `B` | Back WORD              |               |
| `E` | End of WORD            |               |

> **word** = `hello-world` = 2 word (`hello`, `word`)
> **WORD** = `hello-world` = 1 WORD (sampai spasi/tab baru)

---

## 4. Line Motions

| Key | Aksi                    |
| --- | ----------------------- |
| `0` | Awal baris (kolom 0)    |
| `^` | Awal non-kosong pertama |
| `$` | Akhir baris             |
| `   | `                       | Kolom spesifik (contoh: `10\|`) |

---

## 5. File Motions

| Key   | Aksi                       |
| ----- | -------------------------- |
| `gg`  | Awal file                  |
| `G`   | Akhir file                 |
| `10G` | Baris ke-10                |
| `:10` | Baris ke-10 (command mode) |

---

## 6. Character Find Motions

Cari karakter spesifik **dalam satu baris**. Super berguna untuk skip langsung ke posisi tertentu.

| Key        | Aksi                              |
| ---------- | --------------------------------- |
| `f{char}`  | Cari ke depan (termasuk char)     |
| `F{char}`  | Cari ke belakang (termasuk char)  |
| `t{char}`  | Cari ke depan (sebelum char)      |
| `T{char}`  | Cari ke belakang (sebelum char)   |
| `;`        | Repeat find terakhir              |
| `,`        | Repeat find terakhir (arah lain)  |

Contoh:
- `fx` → loncat ke `x` berikutnya di baris ini
- `dt)` → delete sampai sebelum `)` (sama dengan `df)` tapi inklusif)
- `ct,` → change sampai sebelum koma

> **Tips:** Pakai `t` lebih sering dari `f` — posisi cursor tepat sebelum target, lebih natural untuk editing.

---

## 7. Screen Motions

Loncat ke posisi relatif terhadap **layar**, bukan file.

| Key | Aksi                          |
| --- | ----------------------------- |
| `H` | Ke baris **paling atas** layar   |
| `M` | Ke baris **tengah** layar        |
| `L` | Ke baris **paling bawah** layar  |

> Berguna saat sudah pakai `Ctrl+d`/`Ctrl+u` untuk navigate. Misal: `H` → `dG` = delete dari atas layar sampai akhir file.

---

## 8. Scrolling

| Key      | Aksi                              |
| -------- | --------------------------------- |
| `Ctrl+d` | Half page **down**                |
| `Ctrl+u` | Half page **up**                  |
| `Ctrl+e` | Scroll down 1 line (cursor tetap) |
| `Ctrl+y` | Scroll up 1 line (cursor tetap)   |
| `zz`     | Center screen ke cursor           |
| `zt`     | Taruh cursor di top               |
| `zb`     | Taruh cursor di bottom            |

---

## 9. Search

| Key        | Aksi                                    |
| ---------- | --------------------------------------- |
| `/pattern` | Cari ke depan                           |
| `?pattern` | Cari ke belakang                        |
| `n`        | Next match                              |
| `N`        | Previous match                          |
| `*`        | Cari word di bawah cursor               |
| `#`        | Cari word di bawah cursor (ke belakang) |

---

## 10. Operators + Motions (ini kuncinya!)

Vim = **operator** + **motion**. Kombinasinya unlimited.

| Operator | Fungsi                              |
| -------- | ----------------------------------- |
| `d`      | Delete                              |
| `c`      | Change (delete + masuk insert mode) |
| `y`      | Yank (copy)                         |
| `v`      | Visual select                       |

Contoh (dengan konteks JS/PHP):

| Combo | Aksi                                             |
| ----- | ------------------------------------------------ |
| `dw`  | Delete word                                      |
| `d$`  | Delete sampai akhir baris                        |
| `ciw` | Change entire word (rename variabel)             |
| `ci"` | Change isi dalam quotes (string di JS)           |
| `ci(` | Change isi function call/argumen                 |
| `yy`  | Yank baris                                       |
| `yG`  | Yank sampai akhir file                           |
| `dG`  | Delete sampai akhir file                         |
| `dt)` | Delete sampai sebelum `)` (sisa argumen)         |
| `ct{` | Change sampai sebelum `{` (ganti nama method)    |
| `ci[` | Change isi array (`[$foo, $bar]`)                |

> Di PHP/JS, `ci(` dan `ci[` adalah senjata utama — ganti argumen function / isi array dalam satu keystroke.

---

## 11. Text Objects (intermediate)

Text objects pakai format: `i/a` + `object`

- `i` = inner (di dalam, tanpa delimiter)
- `a` = around (termasuk delimiter)

| Object       | Fungsi         |
| ------------ | -------------- |
| `w`          | Word           |
| `s`          | Sentence       |
| `p`          | Paragraph      |
| `"`          | Quotes         |
| `'`          | Single quotes  |
| `` ` ``      | Backticks      |
| `(` atau `)` | Parentheses    |
| `[` atau `]` | Brackets       |
| `{` atau `}` | Braces         |
| `<` atau `>` | Angle brackets |
| `t`          | HTML/XML tag   |

> Yang **paling sering dipakai di JS/PHP**: `(`, `[`, `{`, `"`, dan di Blade template pakai `t`. Sisanya jarang.

Contoh (dengan konteks JS/PHP/Laravel):

| Combo | Aksi                                          |
| ----- | --------------------------------------------- |
| `diw` | Delete isi word                               |
| `daw` | Delete word + spasi                           |
| `ci"` | Ganti isi quote (string JS)                   |
| `da(` | Hapus termasuk parentheses                    |
| `ci(` | Ganti isi function call / method chain        |
| `ci[` | Ganti isi array                               |
| `ci{` | Ganti isi block/objek literals                |
| `dit` | Hapus isi tag HTML (di blade template)        |
| `dat` | Hapus tag HTML + isinya                       |
| `yiw` | Yank word                                    |
| `vi"` | Select isi quotes                             |

> **Perhatian khusus untuk Laravel (Blade):** tag HTML berpasangan bukanlah "tag" vim standar. Untuk ganti isi `@if ... @endif` atau `<div>...</div>`, di VS Code pakai `dit`/`dat` tetap jalan untuk tag HTML. Untuk struktur Blade (`@foreach`, `@if`, `@section`), gunakan motion biasa + visual mode.

> **JS/TSX/React:** `ci>` ganti isi komponen/JSX, `cip` ganti isi paragraf.

---

## 12. Repeat & Undo

| Key      | Aksi                       |
| -------- | -------------------------- |
| `.`      | **Repeat** action terakhir |
| `u`      | Undo                       |
| `Ctrl+r` | Redo                       |

> `.` adalah satu-satunya macro paling powerful di Vim.
> Edit sekali, repeat berkali-kali.

---

## 13. Marks & Jumps

| Key      | Aksi                              |
| -------- | --------------------------------- |
| `m{a-z}` | Set mark di lokasi (contoh: `ma`) |
| `'{a-z}` | Jump ke mark                      |
| `Ctrl+o` | Jump ke lokasi sebelumnya         |
| `Ctrl+i` | Jump ke lokasi berikutnya         |

---

## 14. Useful Commands

| Key       | Aksi                               |
| --------- | ---------------------------------- |
| `>>`      | Indent baris                       |
| `<<`      | Unindent baris                     |
| `~`       | Toggle case                        |
| `J`       | Gabung baris dengan baris bawah    |
| `o`       | Buka baris baru (insert, di bawah) |
| `O`       | Buka baris baru (insert, di atas)  |
| `A`       | Append di akhir baris              |
| `I`       | Insert di awal baris               |
| `x`       | Hapus karakter di cursor           |
| `r{char}` | Ganti karakter dengan char         |
| `D`       | Delete sisa baris (sama dg `d$`)   |
| `C`       | Change sisa baris (sama dg `c$`)   |

---

## 15. Visual Mode + Operators

| Key             | Aksi                      |
| --------------- | ------------------------- |
| `v`             | Visual mode (character)   |
| `V`             | Visual mode (baris)       |
| `Ctrl+v`        | Visual mode (block/kolom) |
| `d` (di visual) | Delete selection          |
| `y` (di visual) | Yank selection            |
| `>` (di visual) | Indent selection          |
| `<` (di visual) | Unindent selection        |

---

## 16. Daily Workflow (JS & PHP/Laravel)

Contoh nyata yang sering dipakai saat ngoding:

### Rename variabel / property

```
ciw → ketik nama baru → Esc
```

### Ganti argumen function

```
ci( → ketik argumen baru → Esc
```

Contoh: `foo("old", 1)` → posisi cursor di dalam → `ci(` → ketik `user.id` → `foo(user.id)`

### Ganti isi string / query

```
ci"  → ganti isi string di JS
ci'  → ganti isi string di PHP
ci`  → ganti isi template literal (JS)
```

### Ganti isi method / function body

```
ci{  → ganti isi block di PHP/JS
```

### Rename method di Laravel Controller

```
ct{  → berhenti sebelum {  lalu ketik nama method baru
```

### Ganti isi tag HTML di Blade

```
cit  → ganti isi dalam <div>...</div>
```

### Tambah/modif beberapa baris sekaligus (visual block)

Contoh: tambahkan `$` di akhir beberapa baris PHP:

```
Ctrl+v → block select → $ → Esc
```

Contoh: tambahkan koma di akhir beberapa array item.

### Hapus blok if/else dengan aman

```
V d   → select baris lalu delete
```

---

## 17. Power Combos (editing cepat)

Kombinasi yang paling sering dipakai "para pro" di dunia nyata saat ngoding. Fokus ke **repetisi** dan **irama**, bukan hafalan.

### The Dot Command Loop (paling powerful!)

Ulangi edit yang sama berkali-kali di banyak tempat:

```
ciw → ketik baru → Esc → n (cari match) → . → n → . → ...
```

**Use case (JS):** rename local variabel `foo` → `bar`.
1. `*` → cari word `foo` di bawah cursor
2. `ciw` → ketik `bar` → `Esc`
3. `n` → lompat match berikutnya
4. `.` → ulangi `ciw bar` otomatis
5. Ulangi `n` `.` sampai selesai

### Dot + J to gabung baris

```
J . . .     → gabung beberapa baris berurutan jadi satu
```

**Use case (PHP/Laravel):** gabungkan query chain yang terpecah:
```php
$users = User::where('active', true)
    ->where('role', 'admin')
    ->limit(10)
    ->get();
```
Cursor di baris pertama → `J` → `.` → `.` → `.` → jadi satu baris.

### Visual mode + repeat

```
V j j > . .    → indent seleksi, lalu repeat
```

**Use case (Blade template):** tambahkan indent di beberapa block sekaligus.

### `ci(` di dalam method chain

Ganti isi call tanpa nyentuh paren:

```js
// Before: formatDate(new Date(), 'dd-MM-yyyy')
// cursor di dalam (), tekan ci( → ketik:
formatDate(user.createdAt)
```

### Block edit (visual block) — non-negotiable buat pro

**Use case (PHP):** tambahkan `$` di depan beberapa variabel sekaligus:
```php
name     = $request->name;
email    = $request->email;
password = $request->password;
```
Cursor di atas huruf `n` di `name` → `Ctrl+v` → `j j` → `I` → ketik `$` → `Esc` → jadi `$name`, `$email`, `$password`.

**Use case (JS):** tambahkan koma `,` di akhir beberapa baris array/object sekaligus.

**Use case (Laravel/Blade):** tambahkan `:` prefix di beberapa binding blade (`:isAdmin`, `:items`).

### Yank + paste dengan register (bukan cuma 1 clipboard)

```
"ayy        → yank baris ke register a
"bp         → paste isi register b
:reg        → lihat semua register
```

**Use case:** simpan beberapa snippet/teks terpisah, paste saat dibutuhkan tanpa timpa clipboard utama.

### Jumps & marks cepat bolak-balik

```
Ctrl+o  → balik ke posisi sebelumnya
Ctrl+i  → maju lagi
m{letter} → anchor posisi, contoh: mf di function
'f        → loncat balik ke anchor itu
```

**Use case (JS/PHP):** lagi edit di file controller, tiba-tiba perlu cek definisi helper di file lain → `Ctrl+o` balik lagi. Atau set mark `mf` di atas 1 function, edit di tempat lain, `'f` balik ke situ.

### Modifier: numeric count

Jangan klik berulang, kasih angka:

```
3w      → maju 3 word
d3w     → delete 3 word
5dd     → delete 5 baris
2ci"    → (jarang, tapi hafalkan pola angkanya)
```

**Use case (PHP):** `d3w` hapus persis 3 token, `5dd` hapus blok 5 baris tanpa visual select.

### Format / dedent buruk yang common

```
>>      → indent baris
3>>     → indent 3 baris
<<      → unindent
=G      → auto-format (indent solid) sampai akhir file
```

**Use case (PHP/Laravel):** setelah paste kode dari internet yang acak indentasi → `=G` biar rapi sekali jalan (di VS Code pakai formatter aktif).

### Move/blok baris cepat

```
:10,20m30   → pindah baris 10-20 ke setelah baris 30
:5,10d      → delete baris 5-10
```

**Use case (PHP/Laravel):** pindahkan urutan middleware/route/array sama-sama tanpa scroll & select manual.

---

## 18. Tips & Tricks

### The Holy Grail: `ciw`, `ci"`, `ci(`, `dit`

Paling sering dipakai untuk refactor/rename:

- `ciw` → ganti word saat ini (rename variabel)
- `ci"` → ganti isi quotes (string JS)
- `ci(` → ganti isi function call / argumen (JS/PHP)
- `cit` → ganti isi tag HTML (Blade)

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

## 19. Cheat Sheet Cepat (Print This!)

```
NAVIGASI
  h j k l         Basic movement
  w b e            Word forward/back/end
  0 ^ $            Line start/first-char/end
  f t ; ,          Find char / before char / repeat
  H M L            Screen top/mid/bottom
  gg G             File start/end
  Ctrl+d/u         Half page down/up

EDITING
  i a I A o O      Insert modes
  x r ~            Delete char/replace/toggle case
  D C              Delete/change rest of line
  dd yy cc         Delete/yank/change line
  dw cw yw         Delete/yank/change word
  di" ci" yi"      Inside quotes
  ci( ci[ ci{      Change args/array/block (JS/PHP)
  dit cit yit      Inside tag (HTML/Blade)
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

POWER COMBO
  ciw > n . n .   Rename var berulang
  J . .           Gabung baris berurutan
  ci( ci[         Ganti args / array
  =G              Auto-format sampai akhir file
  Ctrl+v block    Edit banyak baris sekali
```

---

## 20. Resource Belajar Gratis

| Resource                    | Link                                                      | Fungsi                                                                    |
| --------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Vimtutor**                | `vimtutor` di terminal                                    | Tutorial interaktif bawaan Vim (~30 menit)                                |
| **Ben Awad - Vim Tutorial** | [YouTube](https://www.youtube.com/watch?v=IiwGbcd8S7I)    | 1 jam, basic → intermediate (moving, macros, refactoring, block commands) |
| **Vim Master**              | [vim-master.com](https://renzorlive.github.io/vimmaster/) | Latihan interactive online, newer                                         |
| **OpenVim**                 | [openvim.com](https://openvim.com)                        | Tutorial interaktif visual                                                |
| **Vim Genius**              | [vimgenius.com](https://vimgenius.com)                    | Speed drill untuk hafalkan motion                                         |
| **Vim Golf**                | [vimgolf.com](https://vimgolf.com)                        | Challenges: solve editing tasks in fewest keystrokes                      |

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
- [Ben Awad - Vim Tutorial (YouTube)](https://www.youtube.com/watch?v=IiwGbcd8S7I)
- [Vim Cheat Sheet](https://vim.rtorr.com/)

---

_Last updated: September 2026_
