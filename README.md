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

## Dokumentasi

- `docs/API.md`: dokumentasi endpoint API.
- `docs/hasil-uji-chapter8.md`: dokumentasi hasil pengujian API dan autentikasi.

## Menjalankan Proyek

Pastikan Node.js dan PostgreSQL telah terpasang.

1. Instal dependensi:

   ```bash
   npm install
   ```

2. Siapkan konfigurasi lingkungan dengan menyalin `.env.example` menjadi `.env`, kemudian sesuaikan konfigurasi database dan JWT secret.

3. Pastikan database PostgreSQL telah tersedia dan migrasi database telah dijalankan sesuai kebutuhan proyek.

4. Jalankan server:

   ```bash
   npm start
   ```

5. Aplikasi dapat diakses melalui:

   `http://localhost:3000`

## Keamanan

- Password disimpan dalam bentuk hash menggunakan bcryptjs.
- Autentikasi menggunakan JWT.
- Hak akses dibatasi berdasarkan peran pengguna.
- Pembatasan percobaan autentikasi diterapkan.
- Status akun pengguna diperiksa dalam proses autentikasi.

## Integritas Akademik

Pengerjaan proyek berkembang mengikuti kebijakan mata kuliah. Mahasiswa wajib memahami dan mampu menjelaskan setiap elemen, atribut, kode, serta mekanisme yang digunakan dalam pengembangan aplikasi.