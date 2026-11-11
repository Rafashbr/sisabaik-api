# Dokumentasi API SisaBaik

## 1. Informasi Umum

SisaBaik API merupakan layanan backend berbasis Node.js, Express, dan PostgreSQL untuk mengelola pengguna, penyedia, penawaran makanan, dan pesanan.

**Base URL:** `http://localhost:3000/api`

Format pertukaran data menggunakan JSON.

## 2. Autentikasi

API menggunakan JSON Web Token (JWT) dengan skema Bearer Token.

Untuk endpoint yang memerlukan autentikasi, sertakan header:

`Authorization: Bearer <accessToken>`

Token memiliki masa berlaku sesuai konfigurasi aplikasi.

## 3. Endpoint Autentikasi

| Metode | Endpoint | Fungsi |
|---|---|---|
| POST | `/auth/registrasi` | Registrasi pembeli |
| POST | `/auth/registrasi-penyedia` | Registrasi penyedia |
| POST | `/auth/login` | Login pengguna |
| GET | `/auth/saya` | Melihat profil pengguna aktif |
| POST | `/auth/logout` | Logout dan pencabutan token |

## 4. Endpoint Penawaran

| Metode | Endpoint | Fungsi |
|---|---|---|
| GET | `/penawaran` | Melihat daftar penawaran |
| POST | `/penawaran` | Membuat penawaran |
| GET | `/penawaran/:id` | Melihat detail penawaran |
| PUT | `/penawaran/:id` | Memperbarui penawaran |
| DELETE | `/penawaran/:id` | Menghapus penawaran |

## 5. Endpoint Pesanan

| Metode | Endpoint | Fungsi |
|---|---|---|
| GET | `/pesanan` | Melihat daftar pesanan |
| POST | `/pesanan` | Membuat pesanan |
| GET | `/pesanan/:id` | Melihat detail pesanan |

## 6. Keamanan

- Password disimpan dalam bentuk hash menggunakan bcryptjs.
- Autentikasi menggunakan JWT.
- Middleware digunakan untuk memeriksa autentikasi dan hak akses berdasarkan peran.
- Akun tidak aktif tidak dapat login.
- Pembatasan permintaan diterapkan pada endpoint autentikasi.
- Proses transaksi pesanan menggunakan pengelolaan transaksi database.

## 7. Format Respons

Respons API menggunakan JSON dengan struktur umum:

`{ "success": true, "data": {} }`

Kode HTTP yang digunakan antara lain:

- `200`: Permintaan berhasil.
- `201`: Data berhasil dibuat.
- `204`: Berhasil tanpa isi respons.
- `401`: Autentikasi gagal.
- `403`: Akses ditolak.
- `404`: Data tidak ditemukan.
- `409`: Konflik data.

## 8. Menjalankan Server

Jalankan server menggunakan:

`npm start`

Server berjalan pada port yang ditentukan melalui konfigurasi `.env`.