# Portofolio — Afdhal Fidi Ansori

Website portofolio dengan tema **navy + off-white**, gaya *editorial minimalis*.
Halaman utama berupa satu halaman (single page), ditambah **halaman daftar project**,
**halaman detail** tiap project, dan **halaman daftar sertifikat**.

- Tipografi: **Playfair Display** (judul) · **Plus Jakarta Sans** (teks) · **JetBrains Mono** (meta)
- Tanpa gradasi, tanpa warna putih pekat (off-white `#f6f7fb`), aksen navy `#1e3a8a`

## Struktur File

```
Web-Portofolio/
├── index.html              # Halaman utama (semua section jadi satu)
├── projects.html           # Halaman daftar semua project
├── certificates.html       # Halaman daftar semua sertifikat
├── style.css               # Seluruh styling (dipakai semua halaman)
├── script.js               # Interaksi (navbar, back-to-top, lightbox, animasi)
├── README.md               # File ini
├── project/                # Halaman detail tiap project
│   ├── cassava-village.html
│   ├── mathbiz-riau.html
│   ├── cooking-number.html
│   ├── smartqueue.html    # halaman detail disimpan, kartunya belum tampil
│   ├── taro-quest.html
│   └── watchwatch.html
└── assets/
    └── img/
        ├── profile.jpg     # Foto profil (hero)
        ├── about.jpg       # Foto About
        ├── project1.jpg    # Thumbnail Cassava Village
        ├── project2.jpg    # Thumbnail Mathbiz Riau
        ├── project3.jpg    # Thumbnail Cooking Number
        ├── project4.jpg    # Thumbnail SmartQueue (belum dipakai)
        ├── project5.jpg    # Thumbnail Taro Quest
        ├── project6.jpg    # Thumbnail WatchWatch
        ├── cert-lidm.jpg   # Sertifikat LIDM
        ├── cert-lkti.jpg   # Sertifikat LKTI IKON
        ├── cert-media.jpg  # Sertifikat Media Pembelajaran
        ├── cert-esai.jpg   # Sertifikat Esai Olimpiade & Milad Pendidikan Ekonomi (Harapan 1)
        ├── placeholder.svg # Fallback otomatis kalau gambar belum ada
        ├── cassava/        # Galeri Cassava Village (1.jpg, 2.jpg, 3.jpg)
        ├── mathbiz/        # Galeri Mathbiz Riau (1.jpg, 2.jpg, 3.jpg)
        ├── cooking/        # Galeri Cooking Number (1.jpg, 2.jpg, 3.jpg)
        ├── smartqueue/     # Galeri SmartQueue (isi sendiri, belum dipakai)
        ├── taro-quest/     # Galeri Taro Quest (isi sendiri)
        └── watchwatch/     # Galeri WatchWatch (isi sendiri)
```

## Cara Menjalankan

Buka `index.html` di browser (klik dua kali). Tidak perlu instalasi apa pun.

> Kalau sudah pernah buka sebelumnya, lakukan **hard refresh** (`Ctrl + Shift + R`) supaya perubahan tampil.

---

## Alur Navigasi

```
index.html
   ├──(tombol "Lihat Selengkapnya" di section Projects)────►  projects.html
   │                                                              │
   │         └──(klik salah satu kartu project)───────────────────┘
   │                       │
   │                       ▼
   │           project/<nama-project>.html   (halaman detail)
   │
   └──(tombol "Lihat Selengkapnya" di section Achievements)──►  certificates.html
```

- **Klik kartu project** (di `index.html` maupun `projects.html`) → masuk ke halaman detail.
- Tombol **"Lihat Selengkapnya"** di bawah section My Projects → ke `projects.html`.
- Tombol **"Lihat Selengkapnya"** di bawah section Achievements & Certificates → ke `certificates.html`.
- **Klik kartu sertifikat** (di `index.html` maupun `certificates.html`) → muncul preview besar (lightbox). Sertifikat **tidak** punya halaman detail.
- Di halaman detail project ada tombol **"Semua Project"** untuk kembali ke `projects.html`.

---

## Daftar Gambar

Semua gambar sudah terisi, **kecuali gambar untuk 2 project baru yang tampil** (`project5.jpg`,
`project6.jpg` dan galeri `taro-quest/`, `watchwatch/`) — itu diisi sendiri oleh pemilik.
`project4.jpg` dan galeri `smartqueue/` juga belum ada, tapi keduanya **belum dipakai** karena kartu
SmartQueue ditarik sementara dari `projects.html` (halaman detailnya tetap ada).
Selama file belum ada, otomatis tampil **placeholder** (`assets/img/placeholder.svg`) — jadi tidak akan
muncul ikon rusak. Cukup simpan file dengan **nama persis** seperti tabel di bawah.

| File | Bagian | Ukuran file |
|---|---|---|
| `assets/img/profile.jpg` | Foto profil (hero) | ±140 KB |
| `assets/img/about.jpg` | Foto bagian About | ±140 KB |
| `assets/img/project1.jpg` | Thumbnail Cassava Village | ±170 KB |
| `assets/img/project2.jpg` | Thumbnail Mathbiz Riau | ±50 KB |
| `assets/img/project3.jpg` | Thumbnail Cooking Number | ±40 KB |
| `assets/img/project4.jpg` | Thumbnail SmartQueue | ⚠️ **belum dipakai** (kartunya belum tampil) |
| `assets/img/project5.jpg` | Thumbnail Taro Quest | ⚠️ **isi sendiri** (ada gambar sementara) |
| `assets/img/project6.jpg` | Thumbnail WatchWatch | ⚠️ **isi sendiri** (ada gambar sementara) |
| `assets/img/cert-lidm.jpg` | Sertifikat LIDM | ±260 KB |
| `assets/img/cert-lkti.jpg` | Sertifikat LKTI IKON | ±210 KB |
| `assets/img/cert-media.jpg` | Sertifikat Media Pembelajaran | ±230 KB |
| `assets/img/cert-esai.jpg` | Sertifikat Esai Olimpiade & Milad Pendidikan Ekonomi (Harapan 1) | ±320 KB |
| `assets/img/cassava/1–3.jpg` | Galeri Cassava Village | ±160–210 KB |
| `assets/img/mathbiz/1–3.jpg` | Galeri Mathbiz Riau | ±80–90 KB |
| `assets/img/cooking/1–3.jpg` | Galeri Cooking Number | ±50–80 KB |
| `assets/img/smartqueue/1–3.jpg` | Galeri SmartQueue | ⚠️ **isi sendiri** |
| `assets/img/taro-quest/1–3.jpg` | Galeri Taro Quest | ⚠️ **isi sendiri** |
| `assets/img/watchwatch/1–3.jpg` | Galeri WatchWatch | ⚠️ **isi sendiri** |

> **Catatan ukuran:** semua gambar sudah dioptimalkan (maks lebar **1600 px**, JPEG kualitas ±82).
> Total folder `assets/img` ± **2,7 MB**.

### Catatan Penting

- **Nama harus sama persis** (huruf kecil semua, termasuk `.jpg`).
- Format didukung: **JPG, PNG, atau WebP**. Kalau beda format, samakan namanya atau ubah `src` di HTML.
- Ukuran disarankan hanya panduan; **rasio** lebih penting supaya tidak terpotong aneh.
- **Optimalkan gambar** (idealnya < 300 KB) supaya web cepat dibuka.
- Semua gambar bisa **diklik untuk diperbesar** (lightbox): gambar di halaman detail, gambar
  galeri, dan sertifikat di kartu Achievements (klik di mana saja pada kartunya).

### Ukuran Gambar (biar tidak terpotong)

Tiap tempat menampilkan gambar dengan rasio tertentu. Supaya **tidak terpotong**, samakan
rasio file gambar dengan tabel di bawah:

| Tempat tampil | Rasio tampil | Ukuran disarankan |
|---|---|---|
| Thumbnail project (kartu) | 16 : 9 (`cover`) | 1600 × 900 px |
| Hero halaman detail project | 16 : 9 (`cover`) | 1600 × 900 px |
| Galeri halaman detail project | 4 : 3 (`cover`) | 1200 × 900 px |
| Thumbnail sertifikat (kartu) | 16 : 10 (`cover`) | 1600 × 1131 px |
| Foto profil (hero) | potret (4:5) | 1000 × 1250 px |
| Foto About | potret (4:5) | 800 × 1000 px |

> **Preview (lightbox) TIDAK memotong gambar.** Gambar tampil utuh dengan rasio aslinya,
> hanya dibatasi maksimum **1100 px lebar** dan **86% tinggi layar**. Jadi di preview semua
> bagian pasti kelihatan. Yang memotong hanya *thumbnail* (kartu), karena memakai `object-fit: cover`.

**Mau ubah ukuran maksimum preview?** Edit variabel di `style.css` bagian `:root`:

```css
--preview-max-w: 1100px;   /* lebar maksimum gambar preview */
--preview-max-h: 86vh;     /* tinggi maksimum (persen dari tinggi layar) */
```

### Cara Menaruh Gambar

1. Siapkan filenya, rename sesuai nama di tabel (contoh: `about.jpg`).
2. Pindahkan ke folder yang sesuai (`assets/img/` atau subfolder `cassava/`, `mathbiz/`, `cooking/`, `smartqueue/`, `taro-quest/`, `watchwatch/`).
3. Refresh browser.

---

## Bagian Halaman (index.html)

| Section | Isi |
|---|---|
| Hero | Nama, foto profil, tombol, sosial media |
| About | Perkenalan diri |
| Skills | Daftar kemampuan (Core, Frontend, Backend, Database, Design & CMS, Soft Skills) |
| Projects | **3 project unggulan** + tombol "Lihat Selengkapnya" → `projects.html` (semua project) |
| Achievements | Prestasi lomba + sertifikat (klik kartu = preview besar) + tombol "Lihat Selengkapnya" |
| Contact | Kontak & form |

## Daftar Project

| Project | Deskripsi Singkat | Repo | Demo |
|---|---|---|---|
| **Cassava Village** | LKPD interaktif materi komposisi fungsi | [GitHub](https://github.com/fidiakacoderlearner/cassava-village) | [Demo](https://cassava-village.vercel.app) |
| **Mathbiz Riau** | Simulasi bisnis edukasi (matematika + kewirausahaan) | [GitHub](https://github.com/fidiakacoderlearner/great-riau-mathbiz) | [Demo](https://great-riau-mathbiz.vercel.app) |
| **Cooking Number** | Game edukasi matematika untuk siswa SMP | [GitHub](https://github.com/fidiakacoderlearner/cooking_number) | [Demo](https://cookingnumber.vercel.app) |
| **SmartQueue** | Aplikasi desktop JavaFX untuk sistem antrian asistensi real-time | [GitHub](https://github.com/fidiakacoderlearner/smartqueue) | — |
| **Taro Quest** | LKPD interaktif materi komposisi fungsi (2 bahasa) | [GitHub](https://github.com/fidiakacoderlearner/taro-quest) | [Demo](https://taro-quest.vercel.app) |
| **WatchWatch** | Portal review jam tangan berbasis WordPress | — | [Demo](https://watchwatch.biz.id/) |

> **SmartQueue** masih didata di sini, tapi kartunya **belum ditampilkan** di `projects.html`
> (ditarik sementara). Halaman detailnya (`project/smartqueue.html`) tetap ada — untuk
> menampilkannya lagi cukup menambahkan kembali satu kartu di `projects.html`.

## Kontak

- GitHub: [fidiakacoderlearner](https://github.com/fidiakacoderlearner)
- Instagram: [@3.14di](https://www.instagram.com/3.14di/)
- LinkedIn: [afdhal-fidi-ansori](https://www.linkedin.com/in/afdhal-fidi-ansori)
- Email: afdhalfidi.ansori015@gmail.com

---

## Menambah Project Baru

1. Buat file baru di `project/`, mis. `project/nama-baru.html` (copy salah satu halaman yang ada, lalu ubah isinya).
2. Tambahkan kartu baru di `projects.html` (copy blok `<article class="project-card">`) dan arahkan `href`-nya ke `project/nama-baru.html`.
3. Kartu **tidak wajib** ditambahkan di `index.html` — section My Projects sengaja hanya menampilkan **3 project unggulan**. Tambahkan di `index.html` hanya kalau project itu memang mau dijadikan unggulan (kalau begitu, keluarkan salah satu yang lama supaya tetap 3).
4. (Opsional) Buat folder galeri `assets/img/nama-baru/` berisi `1.jpg`, `2.jpg`, `3.jpg`.

## Menambah Sertifikat Baru

1. Simpan gambar sertifikatnya di `assets/img/`.
2. Tambahkan kartu baru di **`certificates.html`** — copy blok `<article class="achievement-card">` dan
   taruh **paling akhir**. Grid-nya 3 kolom, jadi sertifikat baru otomatis duduk di baris berikutnya.
3. Ubah `src` gambar, judul, badge, dan keterangannya. Badge yang sudah ada di `style.css`:
   `finalis`, `juara1`, `juara3`, `harapan1`.
4. **Homepage sengaja hanya 3 kartu** (section Achievements). Kalau sertifikat barunya mau tampil di
   homepage juga, **ganti** salah satu dari 3 kartu yang ada — jangan ditambah jadi 4.

## Kustomisasi Cepat

- **Warna**: ubah variabel di awal `style.css` (bagian `:root`), mis. `--primary` untuk warna navy.
- **Font**: di-`import` pada bagian `<head>` di tiap halaman.
- **Teks halaman utama**: `index.html`.
- **Teks halaman detail**: file di folder `project/`.
