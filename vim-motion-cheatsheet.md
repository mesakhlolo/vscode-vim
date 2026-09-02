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

## 4. Line & Paragraph Motions

| Key | Aksi                    |
| --- | ----------------------- |
| `0` | Awal baris (kolom 0)    |
| `^` | Awal non-kosong pertama |
| `$` | Akhir baris             |
| `   | `                       | Kolom spesifik (contoh: `10\|`) |
| `{` | Loncat ke baris kosong sebelumnya (awal paragraph) |
| `}` | Loncat ke baris kosong berikutnya (awal paragraph berikut) |

> `{` dan `}` berguna untuk skip block kode yang dipisah baris kosong. Misal: skip antar function, antar section CSS, atau antar blok logika.

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
| `%`        | Loncat ke pasangan bracket terdekat (`()`, `{}`, `[]`) |

Contoh:
- `fx` → loncat ke `x` berikutnya di baris ini
- `dt)` → delete sampai sebelum `)` (sama dengan `df)` tapi inklusif)
- `ct,` → change sampai sebelum koma
- `%` → loncat ke `)` pasangan jika cursor di `(`, atau ke `{` jika di `}`, dst. Berguna untuk cek bracket balance.

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

## 13. Macros

Record dan playback sequence keystrokes. Powerful untuk repetitive tasks.

| Key         | Aksi                                    |
| ----------- | --------------------------------------- |
| `q{a-z}`    | Mulai **record** macro ke register      |
| `q`         | Stop recording                          |
| `@{a-z}`    | **Playback** macro dari register        |
| `@@`        | Ulangi macro terakhir yang diplay       |
| `5@a`       | Play macro `a` sebanyak 5 kali          |

**Cara pakai:**
1. Posisi cursor di tempat yang benar
2. `qa` → mulai record ke register `a`
3. Lakukan sequence editing (misal: `Iconst ` → `Esc` → `j`)
4. `q` → stop recording
5. `@a` → play macro sekali
6. `10@a` → play macro 10 kali

**Use case:** tambahkan `const ` di depan 20 variabel sekaligus:
```
qa → Iconst  → Esc → j → q
10@a
```

**Use case:** wrap setiap baris dengan console.log:
```
qq → Iconsole.log(' → Esc → A(') → Esc → j → q
```

> **Tips:** Macro sangat mirip dengan `.` (dot command). Bedanya: macro record **full sequence**, dot hanya repeat **action terakhir**. Pakai macro untuk complex multi-step, pakai dot untuk simple single-action repeat.

---

## 14. Marks & Jumps

| Key      | Aksi                              |
| -------- | --------------------------------- |
| `m{a-z}` | Set mark di lokasi (contoh: `ma`) |
| `'{a-z}` | Jump ke mark                      |
| `Ctrl+o` | Jump ke lokasi sebelumnya         |
| `Ctrl+i` | Jump ke lokasi berikutnya         |

---

## 15. Useful Commands

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

## 16. Visual Mode + Operators

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

## 17. Surround (Membungkus Teks)

> **Catatan:** Butuh plugin **vim-surround** (sudah default di VS Code Vim extension). Kalau belum ada, install dulu.

Rumus utama: **"Blok lalu Bungkus"** — alur pikirannya sama seperti pakai mouse, tapi tanpa mouse.

### Cara Pakai (Paling Intuitif)

```
ve → S]    → bungkus 1 kata dengan []
viw → S"   → bungkus kata di cursor dengan ""
v3e → S)   → bungkus 3 kata dengan ()
```

**Langkah:**
1. **Blok teksnya** — pakai `ve` (1 kata ke depan) atau `viw` (kata di cursor) atau `v3e` (3 kata)
2. **Ketik `S` + karakter pembungkus** — `S]`, `S"`, `S)`, `S}`, `S>`

### Contoh Lengkap

| Sebelum | Command | Sesudah |
|---------|---------|---------|
| `state` | `viw S"` | `"state"` |
| `state` | `ve S)` | `(state)` |
| `foo bar` | `v3e S[` | `[foo bar]` |
| `x + y` | `ve S}` | `{x + y}` |

### Semua Karakter Pembungkus

| Karakter | Hasil |
|----------|-------|
| `(` atau `)` | `(text)` |
| `[` atau `]` | `[text]` |
| `{` atau `}` | `{text}` |
| `<` atau `>` | `<text>` |
| `"` | `"text"` |
| `'` | `'text'` |
| `` ` `` | `` `text` `` |

### Kenapa Ini Paling Enak?

- **Gak perlu menghafal** kode aneh — cukup ingat `S = Surround`
- **Visual** — bisa lihat dulu teks yang mau dibungkus sebelum eksekusi
- **Buat banyak kata** — tinggal blok panjangnya, lalu `S` + pembungkus

> **Cover 90% kebutuhan** membungkus teks saat ngoding PHP, React, atau Laravel!

---

## 18. Daily Workflow (JS & PHP/Laravel)

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

## 19. Power Combos (editing cepat)

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

## 20. Tips & Tricks

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

## 21. Keybinding Recommendations

Remap keys di VS Code / editor untuk workflow lebih cepat. Setting di `keybindings.json` (VS Code).

### Escape Alternative (Paling Penting!)

Escape key terlalu jauh dari home row. Remap ke combo yang lebih dekat:

| Remap | Kelebihan | Kekurangan |
|-------|-----------|------------|
| `jj` | Paling umum, mudah diingat | Kadang interferensi jika mengetik "jj" |
| `jk` | Unik, hampir tidak pernah diketik | Sedikit lebih panjang dari `jj` |
| `kj` | Sama uniknya dengan `jk` | Beberapa orang lebih suka feel-nya |

**VS Code setting:**
```json
{
  "vim.insertModeKeybindings": [
    { "before": ["j", "j"], "after": ["<Esc>"] },
    { "before": ["j", "k"], "after": ["<Esc>"] }
  ]
}
```

> **Rekomendasi:** Pakai `jk` — paling aman karena hampir tidak ada kata "jk" di kode. `jj` juga bagus tapi kadang interferensi di comment/ string.

### Leader Key

Pakai `,` atau `<space>` sebagai leader key untuk custom shortcuts:

```json
{
  "vim.leader": ","
}
```

Contoh usage: `,w` untuk save, `,q` untuk quit, dll.

### Lainnya yang Berguna

| Remap | Fungsi |
|-------|--------|
| `jk` atau `jj` → `<Esc>` | Insert mode → Normal mode |
| `Ctrl+h` → `<BS>` | Delete char di insert mode (built-in di VS Code) |
| `Ctrl+j` → `<Enter>` | Newline di insert mode tanpa keluar insert |

---

## 22. Cheat Sheet Cepat (Print This!)

```
NAVIGASI
  h j k l         Basic movement
  w b e            Word forward/back/end
  W B E            WORD forward/back/end (whitespace)
  0 ^ $            Line start/first-char/end
  { }              Paragraph prev/next (skip block kosong)
  f t ; ,          Find char / before char / repeat
  %                Jump ke pasangan bracket
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

MACROS
  q{a-z}           Start record macro
  q                Stop record
  @{a-z}           Play macro
  @@               Repeat last macro

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

SURROUND (plugin vim-surround)
  ve S]           Bungkus kata dengan []
  viw S"          Bungkus kata dengan ""
  v3e S)          Bungkus 3 kata dengan ()

KEYBINDING
  jk / jj → Esc    Insert → Normal mode
```

---

## 23. Resource Belajar Gratis

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
