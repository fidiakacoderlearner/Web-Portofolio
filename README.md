# Portofolio — Afdhal Fidi Ansori

Situs portofolio statis dengan konsep **ATLAS**: katalog pameran tempat project ditampilkan
sebagai plat katalog, sertifikat dan penghargaan sebagai dokumen pameran, catatan diri sebagai
lembar lapangan, dan kontak sebagai kartu pos.

Tidak ada build step, framework, AOS, Font Awesome, atau form kontak. Semua halaman adalah HTML,
satu stylesheet, dan satu file JavaScript. Situs bisa dibuka langsung dari `index.html` atau
di-hosting di GitHub Pages.

## Halaman

| File | Isi |
|---|---|
| `index.html` | Beranda: hero, Catatan Lapangan, Peralatan, Project (3 project unggulan), Sertifikat & Penghargaan (3 sertifikat dan penghargaan), Kontak |
| `projects.html` | Indeks lengkap 5 project yang ditampilkan |
| `certificates.html` | Sertifikat & Penghargaan — 5 sertifikat dan penghargaan dengan document viewer |
| `project/cassava-village.html` | Detail Cassava Village + galeri 3 gambar |
| `project/mathbiz-riau.html` | Detail Mathbiz Riau + galeri 3 gambar |
| `project/cooking-number.html` | Detail Cooking Number + galeri 3 gambar |
| `project/taro-quest.html` | Detail Taro Quest (tanpa galeri) |
| `project/watchwatch.html` | Detail WatchWatch (tanpa galeri) |
| `project/smartqueue.html` | Detail SmartQueue — **tidak ditautkan dari indeks**, hanya bisa dibuka lewat URL langsung |

SmartQueue sengaja belum dimasukkan ke `projects.html` dan beranda. Halaman detailnya tetap
dipertahankan sebagai halaman terpisah.

## Struktur File

```
Web-Portofolio/
├── index.html
├── projects.html
├── certificates.html
├── style.css
├── script.js
├── README.md
├── project/
│   ├── cassava-village.html
│   ├── mathbiz-riau.html
│   ├── cooking-number.html
│   ├── taro-quest.html
│   ├── watchwatch.html
│   └── smartqueue.html
└── assets/
    ├── favicon.svg
    └── img/
        ├── profile.jpg          # foto latar penuh section hero
        ├── about.jpg            # tidak dipakai lagi; disimpan sebagai aset lama
        ├── project1.jpg         # Cassava Village
        ├── project2.jpg         # Mathbiz Riau
        ├── project3.jpg         # Cooking Number
        ├── project5.jpg         # Taro Quest
        ├── project6.jpg         # WatchWatch
        ├── cert-lidm.jpg
        ├── cert-lkti.jpg
        ├── cert-media.jpg
        ├── cert-esai.jpg
        ├── cert-game.jpg        # DMGC 2026
        ├── placeholder.svg      # cadangan lama; saat ini tidak direferensikan
        ├── cassava/1–3.jpg
        ├── mathbiz/1–3.jpg
        └── cooking/1–3.jpg
```

`project4.jpg`, `assets/img/taro-quest/`, `assets/img/watchwatch/`, dan
`assets/img/smartqueue/` belum ada. Karena itu SmartQueue tidak masuk indeks, dan halaman Taro
Quest serta WatchWatch hanya memakai gambar hero.

## Sistem Desain

### Warna

| Token | Nilai | Pemakaian |
|---|---|---|
| `--paper` | `#f1eadc` | latar utama |
| `--paper-2` | `#e7decb` | panel, kartu sertifikat, kontak |
| `--ink` | `#17140f` | teks utama |
| `--ink-soft` | `#4a4438` | teks sekunder |
| `--muted` | `#5f584b` | metadata |
| `--vermilion` | `#c0442b` | aksen, garis, seleksi |
| `--vermilion-ink` | `#a3331e` | teks aksen |
| `--teal` | `#14524b` | aksen dingin |
| `--ochre` | `#7a5510` | nomor, label, detail sertifikat |

Warna teks sudah dipilih agar tetap terbaca di atas `--paper` dan `--paper-2`. Aksen ochre
memakai versi yang lebih gelap dari sekadar hiasan agar lolos kontras untuk teks kecil.

### Tipografi

- **Fraunces** — judul, nama, kutipan. Variabel optik dan italic dipakai untuk aksen.
- **Work Sans** — teks isi dan antarmuka.
- **IBM Plex Mono** — metadata, nomor, label, jam.

Font dimuat dari Google Fonts di setiap halaman. Ada fallback sistem jika font gagal dimuat.

### Aturan Visual

- Tanpa gradient, tanpa glassmorphism, tanpa bayangan kartu yang tebal.
- Sudut tajam, garis rambut, ruang kosong besar, dan komposisi asimetris.
- Tekstur kertas halus dibuat dengan lapisan CSS, bukan gambar.
- Foto hero dipakai sebagai latar penuh section hero: `cover` di tengah, blur halus, dan lapisan
  warna kertas agar teks tetap terbaca. Tidak ada pelat foto atau avatar terpisah.
- Bagian About sepenuhnya tipografis; tidak ada foto About.

### Gerak

- Nama di hero muncul dengan mask reveal per baris.
- Elemen `[data-reveal]` muncul saat masuk viewport.
- Ada cursor-following project preview di desktop (hanya untuk pointer halus).
- Progress baca, penanda chapter aktif, jam WIB, dan tombol kembali ke atas.
- Semua animasi dihentikan atau disederhanakan saat `prefers-reduced-motion: reduce`.

## Interaksi dan JavaScript

`script.js` tidak memakai library. Perilaku utama:

- **Jam WIB** — memakai `Intl.DateTimeFormat` dengan zona `Asia/Jakarta`, diperbarui tiap 30 detik.
- **Menu seluler** — dropdown ringkas di bawah topbar, memakai label yang sama dengan navbar.
  Bisa ditutup dengan tombol hamburger, klik di luar, `Escape`, atau setelah memilih tautan.
  Tidak mengunci scroll dan tidak membuka halaman baru.
- **Document viewer** — `<dialog>` native untuk sertifikat dan gambar project. Panah kiri/kanan
  berpindah dokumen, `Escape` menutup. Jumlah dokumen dihitung otomatis dari elemen
  `[data-viewer]`, jadi tidak perlu mengubah angka manual saat menambah gambar.
- **Salin email** — tombol utama kontak; memakai Clipboard API dan jatuh ke `execCommand("copy")`
  bila perlu. Label berubah menjadi “Tersalin” selama 2,2 detik. Tautan `mailto:` tetap ada
  sebagai jalur sekunder untuk perangkat yang punya aplikasi email.
- **Cursor preview** — gambar project mengikuti kursor saat item indeks di-hover. Nonaktif di
  perangkat sentuh dan saat reduced motion.
- **Navigasi chapter** — `IntersectionObserver` menandai chapter yang sedang dibaca.
- **Reveal** — `IntersectionObserver` menambahkan `.is-visible`; tanpa JavaScript konten tetap
  terlihat karena kelas `.js` hanya ditambahkan lewat script.
- **Progress baca dan to-top** — dihitung dari posisi scroll.

Footer memakai tahun statis `2026` dan logo A dalam lingkaran yang sama dengan header.

Fallback tanpa JavaScript: semua konten tetap terbaca, tautan sertifikat mengarah langsung ke
file gambar, dan navigasi utama tetap tampil sebagai baris tautan (dropdown hanya dipakai saat
JavaScript aktif).

## Menjalankan Secara Lokal

Buka `index.html` langsung di browser sudah cukup untuk melihat halaman. Untuk pengalaman yang
paling konsisten (terutama Clipboard API dan dialog), gunakan server lokal:

```bash
python -m http.server 8000
```

atau, jika Node.js tersedia:

```bash
npx serve .
```

Lalu buka `http://localhost:8000`.

Font Google memerlukan koneksi internet. Jika offline, browser memakai fallback font dan layout
tetap berjalan.

## Deploy ke GitHub Pages

1. Push perubahan ke branch `main`.
2. Buka **Settings → Pages** di repository.
3. Pilih **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Situs tersedia di `https://fidiakacoderlearner.github.io/Web-Portofolio/`.

Navigasi dan aset memakai path relatif, jadi strukturnya bisa dipindahkan ke subfolder lain.
Namun `canonical` dan `og:url` memakai URL absolut GitHub Pages; perbarui keduanya jika situs
pindah domain.

## Mengedit Konten

### Beranda

Edit `index.html`. Chapter ditandai dengan `data-chapter` dan `id` yang sesuai:

- `#about` — Catatan Lapangan
- `#skills` — Peralatan
- `#projects` — Project
- `#achievements` — Sertifikat & Penghargaan
- `#contact` — Kontak

Navigasi desktop dan dropdown mobile memakai `data-nav`; jangan hapus atribut itu jika ingin
penanda chapter aktif tetap bekerja.

### Indeks Project

Edit `projects.html`. Setiap project adalah satu `<li class="index-item">` dengan:

- `data-preview` — gambar yang muncul di cursor preview.
- `href` — halaman detail di `project/`.
- `.index-thumb` — thumbnail untuk mobile.
- Nomor, judul, deskripsi, dan stack.

Untuk menambah project:

1. Buat halaman detail baru di `project/` (copy salah satu halaman yang ada, lalu ubah isi,
   `title`, `description`, `og:image`, dan `canonical`).
2. Tambahkan `<li>` baru di `projects.html` dan arahkan `href`-nya.
3. Tambahkan thumbnail ke `assets/img/`.
4. Jika ingin tampil di beranda, tambahkan juga item di bagian `#projects` pada `index.html`
   (beranda sengaja hanya menampilkan 3 project unggulan).
5. Jika ada galeri, tambahkan gambar ke `assets/img/<nama-project>/` dan tambahkan
   `data-viewer` pada setiap gambar.

### Sertifikat

Edit `certificates.html` dan bagian `#achievements` di `index.html`. Satu sertifikat adalah satu
`<a class="stamp" data-viewer>`:

- `href` — file gambar sertifikat.
- `data-caption` — caption di viewer.
- `data-alt` — alt text untuk gambar viewer.
- `.stamp-thumb img` — thumbnail kartu.

Jumlah dokumen di viewer dihitung otomatis. Jika menambah sertifikat ke halaman sertifikat,
tambahkan kartunya di akhir grid; grid sertifikat memakai dua kolom di desktop dan satu kolom di
layar kecil.

### SmartQueue

Untuk menampilkan SmartQueue lagi:

1. Tambahkan `project4.jpg` ke `assets/img/`.
2. Tambahkan satu `<li class="index-item">` di `projects.html` dengan nomor yang sesuai.
3. Opsional: tambahkan ke beranda jika ingin dijadikan unggulan.
4. Jika nanti ada screenshot, tambahkan galeri ke `project/smartqueue.html` dengan pola yang sama
   seperti project lain.

## Gambar

### Spesifikasi

| Tempat | Rasio tampil | Ukuran disarankan |
|---|---|---|
| Foto hero (latar) | `cover` | 1000 × 1000 px atau lebih |
| Thumbnail project / hero detail | 16:9 (`cover`) | 1600 × 900 px |
| Galeri detail | 4:3 (`cover`) | 1200 × 900 px |
| Thumbnail sertifikat | 16:10 (`cover`) | 1600 × 1131 px (A4; crop 16:10) |
| Document viewer | rasio asli (`contain`) | maksimal 1600 px sisi terpanjang |

Thumbnail memakai `object-fit: cover`, jadi bagian tepi bisa terpotong. Viewer menampilkan gambar
utuh dengan `object-fit: contain`.

### Catatan Teknis

- Gambar konten (foto, thumbnail, galeri) memiliki `width` dan `height` untuk mengurangi layout
  shift.
- CSS memakai `img { height: auto; }`; jangan menambahkan `height` tetap pada gambar yang memakai
  `aspect-ratio`.
- Foto hero dimuat lewat `preload`; gambar pertama yang terlihat di halaman indeks/sertifikat
  memakai `fetchpriority="high"`; gambar lain memakai `loading="lazy"`.
- `profile.jpg` saat ini berukuran 1000 × 1000 dan dipakai sebagai latar hero dengan `cover`.
  Gunakan foto yang lebih besar jika ingin hasil lebih tajam di layar beresolusi tinggi.
- `about.jpg` tidak lagi dipakai. File dibiarkan agar tidak menghapus aset lama.
- `placeholder.svg` juga tidak direferensikan lagi.

## Aksesibilitas dan Performa

- Skip link ke `#main` di setiap halaman.
- Struktur heading hierarkis, landmark `header`, `nav`, `main`, `footer`, dan `aside` berlabel.
- Dialog native untuk menu dan viewer, dengan focus trap bawaan browser.
- Tombol viewer dan menu memiliki `aria-label`; kartu sertifikat memakai `data-alt`.
- Navigasi keyboard: `Tab`, `Enter`, `Escape`, panah kiri/kanan di viewer.
- `prefers-reduced-motion` menonaktifkan animasi masuk dan cursor preview.
- Tanpa JavaScript, konten tetap terlihat, navigasi utama tetap tampil, dan tautan gambar tetap
  berfungsi.
- Tidak ada framework atau library JavaScript; hanya satu stylesheet dan satu script.
- Font eksternal dari Google Fonts; gambar JPEG sudah dikompresi.

### Pemeriksaan Cepat

Jika Node.js tersedia, validasi opsional:

```bash
npx --yes html-validate --rule void-style:off --rule no-trailing-whitespace:off index.html projects.html certificates.html project/*.html
npx --yes csstree-validator style.css
node --check script.js
```

Untuk audit performa dan aksesibilitas, jalankan Lighthouse dari Chrome DevTools pada server lokal.

## Kontak

- GitHub: [fidiakacoderlearner](https://github.com/fidiakacoderlearner)
- Instagram: [@3.14di](https://www.instagram.com/3.14di/)
- LinkedIn: [afdhal-fidi-ansori](https://www.linkedin.com/in/afdhal-fidi-ansori)
- Email: afdhalfidi.ansori015@gmail.com
- Lokasi: Pekanbaru, Riau, Indonesia
