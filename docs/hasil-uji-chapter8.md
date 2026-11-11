# Hasil Pengujian SisaBaik API - Chapter 8

## 1. Pengujian Akun

Empat akun pengujian berhasil didaftarkan:

| Nama | Email | Peran |
|---|---|---|
| Rina Baru | rina.baru@example.test | Penyedia |
| Budi Baru | budi.baru@example.test | Penyedia |
| Siti Baru | siti.baru@example.test | Pembeli |
| Dudi Baru | dudi.baru@example.test | Pembeli |

Seluruh akun telah diperiksa melalui database dan berstatus aktif pada pemeriksaan akhir.

## 2. Verifikasi Penyedia

- Rina Baru berhasil diverifikasi melalui CLI.
- Budi Baru berhasil diverifikasi melalui CLI.
- Pengujian penolakan verifikasi Budi berhasil dilakukan.
- Status Budi kemudian dipulihkan menjadi terverifikasi.

## 3. Pengujian Penawaran dan Pesanan

- Rina berhasil membuat penawaran Roti Cokelat.
- Budi berhasil membuat penawaran Jeruk Manis.
- Siti berhasil melihat katalog dan membuat pesanan.
- Pesanan Siti tercatat pada penyedia Rina.
- Pesanan Rina tidak dapat diakses oleh Budi.

Terdapat tiga pesanan Roti Cokelat yang tercatat akibat pengulangan klik saat pengujian.

## 4. Pengujian Hak Akses

| Pengujian | Hasil |
|---|---|
| Pembeli membuat penawaran | Ditolak, HTTP 403 |
| Pembeli melihat pesanan | Berhasil, HTTP 200 |
| Penyedia lain mengakses pesanan | Ditolak, HTTP 404 |
| Token tidak valid | Ditolak, HTTP 401 |

## 5. Pengujian Masa Berlaku dan Token

- Masa berlaku token yang diterima adalah 900 detik.
- Token yang dimodifikasi ditolak dengan HTTP 401.
- Pengujian kedaluwarsa token setelah 900 detik belum dilakukan secara terpisah.

## 6. Pengujian Penonaktifan Akun

- Akun Siti berhasil dinonaktifkan melalui database.
- Percobaan login menghasilkan HTTP 401.
- Akun Siti berhasil diaktifkan kembali.
- Status akhir akun Siti adalah aktif.

## 7. Pengujian Pagination

Endpoint katalog diuji menggunakan parameter `limit=50` dan mengembalikan dua penawaran dengan metadata pagination.

Pengujian halaman berikutnya belum dilakukan secara terpisah.

## 8. Catatan Pengujian

Skrip `npm run auth:test` belum berhasil dijalankan karena ditemukan kesalahan impor modul `src/lib/verifikasi-penyedia.js` yang tidak ditemukan.

Pengujian manual melalui browser dan database tetap dilakukan untuk memeriksa autentikasi, hak akses, transaksi, serta status akun.

## 9. Kesimpulan

Implementasi autentikasi, pembatasan hak akses berbasis peran, verifikasi penyedia, dan pengelolaan pesanan telah melalui pengujian manual. Beberapa pengujian otomatis dan pengujian lanjutan masih memerlukan perbaikan serta verifikasi.