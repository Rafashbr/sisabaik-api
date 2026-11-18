# SisaBaik

SisaBaik adalah proyek berkembang pada mata kuliah Pengembangan Web. Aplikasi ini dirancang untuk membantu penyedia memulihkan nilai stok makanan berlebih melalui penjualan dengan harga khusus atau penyaluran, sekaligus membantu masyarakat memperoleh makanan yang lebih terjangkau dan mengurangi limbah pangan.

## Capaian Chapter 8

- Mempertahankan semantic HTML dan formulir aksesibel dari Chapter 2.
- Menerapkan CSS cascade, box model, dan custom properties.
- Menggunakan Flexbox untuk navigasi dan kelompok tombol.
- Menggunakan Grid untuk kartu penawaran dan bagian halaman.
- Membangun layout mobile-first dengan media queries.
- Memeriksa kontras, fokus keyboard, reflow, dan konsistensi visual.

## Pengembangan Backend dan API

- Menggunakan Node.js dan Express.js untuk membangun backend.
- Menggunakan PostgreSQL sebagai basis data.
- Mengimplementasikan registrasi dan login pengguna.
- Menerapkan autentikasi menggunakan JSON Web Token (JWT).
- Menerapkan hak akses berdasarkan peran pengguna (*Role-Based Access Control*).
- Mengembangkan verifikasi akun penyedia.
- Mengimplementasikan pengelolaan penawaran dan pemesanan makanan.
- Menerapkan pembatasan akses dan validasi status akun.

## Pengembangan Frontend dengan Vue (Chapter 9)

- Menggunakan Vue 3.5.43 untuk membangun antarmuka aplikasi.
- Menggunakan Vite 8.3.3 sebagai perangkat pengembangan dan build.
- Menggunakan komponen Vue untuk membangun kartu penawaran, filter, ikon, dan formulir.
- Menerapkan komunikasi antarkomponen menggunakan props dan emits.
- Menggunakan data fixture untuk simulasi katalog penawaran.
- Menerapkan pencarian dan filter kategori penawaran.
- Menerapkan validasi formulir penawaran.
- Menggunakan helper untuk format rupiah, waktu, status, dan kategori.
- Menggunakan ilustrasi kategori makanan dalam format SVG.
- Memeriksa tampilan dan aksesibilitas antarmuka.

**Catatan:** Pada Chapter 9, data penawaran masih menggunakan fixture di memori browser. Frontend belum memanggil API dan belum menyimpan data ke PostgreSQL. Integrasi frontend dengan backend dijadwalkan pada pertemuan 11.

## Halaman dan Struktur Proyek

- `index.html`: halaman informasi SisaBaik.
- `daftar-penyedia.html`: formulir pendaftaran penyedia.
- `tawarkan-makanan.html`: formulir penawaran makanan berlebih.
- `styles.css`: sistem visual dan layout responsif.
- `public/auth.html`: halaman autentikasi pengguna.
- `public/auth.css`: stylesheet halaman autentikasi.
- `public/auth.js`: JavaScript untuk autentikasi.
- `src/`: kode backend, konfigurasi, middleware, controller, repository, service, dan routes.
- `database/`: berkas SQL untuk kebutuhan basis data.
- `scripts/`: skrip pengujian dan verifikasi.
- `frontend/`: aplikasi antarmuka berbasis Vue dan Vite.
- `frontend/src/components/`: komponen antarmuka Vue.
- `frontend/src/data/`: data fixture latihan.
- `frontend/src/lib/`: helper format, visual, dan validasi.
- `frontend/src/assets/`: aset ilustrasi dan identitas visual dalam format SVG.

## Dokumentasi

- `docs/API.md`: dokumentasi endpoint API.
- `docs/hasil-uji-chapter8.md`: dokumentasi hasil pengujian API dan autentikasi.
- `docs/hasil-uji-chapter9.md`: dokumentasi hasil pengujian antarmuka Vue.

## Menjalankan Proyek

### Persyaratan

- Node.js versi 22.18.0 atau lebih baru pada jalur versi 24.12.0 ke atas, sesuai ketentuan konfigurasi frontend.
- PostgreSQL untuk kebutuhan backend.
- Visual Studio Code direkomendasikan untuk pengembangan.

### Menjalankan Backend

Pastikan berada di direktori utama repositori.

1. Instal dependensi:

   ```bash
   npm install
   ```

   Atau gunakan `npm ci` apabila tersedia `package-lock.json` yang sesuai.

2. Siapkan konfigurasi lingkungan dengan menyalin `.env.example` menjadi `.env`, kemudian sesuaikan konfigurasi database dan JWT secret.

3. Pastikan database PostgreSQL telah tersedia dan migrasi database telah dijalankan sesuai kebutuhan proyek.

4. Jalankan server:

   ```bash
   npm start
   ```

5. Backend dapat diakses melalui:

   `http://localhost:3000`

### Menjalankan Frontend Vue

Masuk ke direktori frontend:

```bash
cd frontend
```

Instal dependensi:

```bash
npm install
```

Atau gunakan:

```bash
npm ci
```

Jalankan development server:

```bash
npm run dev
```

Frontend dapat diakses melalui:

`http://127.0.0.1:5173/`

Membuat production build:

```bash
npm run build
```

Menjalankan preview hasil build:

```bash
npm run preview
```

Preview dapat diakses melalui:

`http://127.0.0.1:4173/`

Hasil production build disimpan dalam direktori `frontend/dist`.

## Keamanan

- Password disimpan dalam bentuk hash menggunakan bcryptjs.
- Autentikasi menggunakan JWT.
- Hak akses dibatasi berdasarkan peran pengguna.
- Pembatasan percobaan autentikasi diterapkan.
- Status akun pengguna diperiksa dalam proses autentikasi.

## Integritas Akademik

Pengerjaan proyek berkembang mengikuti kebijakan mata kuliah. Mahasiswa wajib memahami dan mampu menjelaskan setiap elemen, atribut, kode, serta mekanisme yang digunakan dalam pengembangan aplikasi.