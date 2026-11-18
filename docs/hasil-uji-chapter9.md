# HASIL UJI CHAPTER 9

### Tujuan Pengujian

Pengujian Chapter 9 bertujuan memastikan antarmuka aplikasi SisaBaik berbasis Vue dapat dibangun, dijalankan, dan ditampilkan dengan baik. Pengujian juga bertujuan memeriksa struktur komponen, komunikasi data antarkomponen, katalog penawaran makanan, fitur pencarian, filter kategori, formulir penawaran, validasi input, serta proses pembuatan production build.

### Hasil Persiapan Lingkungan Pengembangan

| No. | Komponen yang Diperiksa | Hasil |
|---|---|---|
| 1 | Node.js versi 24.21.0 | Berhasil |
| 2 | Instalasi dependensi frontend | Berhasil |
| 3 | Konfigurasi package.json | Berhasil |
| 4 | Konfigurasi Vite | Berhasil |
| 5 | Integrasi plugin Vue | Berhasil |
| 6 | Struktur folder frontend | Berhasil |
| 7 | Development server Vite | Berhasil |
| 8 | Production build | Berhasil |
| 9 | Production preview | Berhasil |

### Struktur Komponen yang Dikembangkan

| No. | Nama File | Fungsi |
|---|---|---|
| 1 | `App.vue` | Mengelola halaman utama, data, dan interaksi aplikasi |
| 2 | `Ikon.vue` | Menampilkan ikon antarmuka |
| 3 | `KartuPenawaran.vue` | Menampilkan informasi penawaran makanan |
| 4 | `FilterPenawaran.vue` | Menangani pencarian dan filter kategori |
| 5 | `FormPenawaran.vue` | Menangani input dan validasi penawaran |
| 6 | `penawaran-latihan.js` | Menyediakan data fixture penawaran |
| 7 | `tampilan.js` | Menyediakan fungsi format rupiah, waktu, dan ketersediaan |
| 8 | `visual.js` | Mengelola ilustrasi kategori, label status, dan sisa waktu |
| 9 | `form-penawaran.js` | Mengelola validasi data formulir |
| 10 | `style.css` | Mengatur tampilan dan tata letak antarmuka |

### Hasil Pengujian Tampilan Katalog

Pengujian tampilan awal pada mode pembeli menghasilkan:

| No. | Komponen yang Diperiksa | Hasil |
|---|---|---|
| 1 | Jumlah kartu penawaran awal | 3 kartu |
| 2 | Total stok awal | 15 unit |
| 3 | Jumlah penyedia | 2 penyedia |
| 4 | Tampilan nama penawaran | Berhasil |
| 5 | Tampilan harga penawaran | Berhasil |
| 6 | Tampilan harga normal | Berhasil |
| 7 | Tampilan kategori makanan | Berhasil |
| 8 | Tampilan jumlah stok | Berhasil |
| 9 | Tampilan status penawaran | Berhasil |
| 10 | Tampilan waktu berakhir | Berhasil |
| 11 | Ilustrasi kategori makanan SVG | Berhasil |
| 12 | Logo SisaBaik | Berhasil |

### Pengujian Komunikasi Antarkomponen

Komunikasi antarkomponen dilakukan menggunakan mekanisme props dan emits.

| No. | Komponen | Mekanisme | Fungsi |
|---|---|---|---|
| 1 | App.vue ke KartuPenawaran.vue | Props | Mengirim data penawaran dan waktu |
| 2 | App.vue ke FilterPenawaran.vue | Props | Mengirim pencarian, kategori, dan daftar kategori |
| 3 | FilterPenawaran.vue ke App.vue | Emits | Mengirim perubahan pencarian |
| 4 | FilterPenawaran.vue ke App.vue | Emits | Mengirim perubahan kategori |
| 5 | FilterPenawaran.vue ke App.vue | Emits | Mengirim perintah reset |
| 6 | KartuPenawaran.vue ke App.vue | Emits | Mengirim pilihan penawaran |
| 7 | FormPenawaran.vue ke App.vue | Emits | Mengirim data penawaran yang valid |

### Pengujian Fungsi Pencarian dan Filter

| No. | Skenario Pengujian | Hasil |
|---|---|---|
| 1 | Menampilkan katalog awal | Berhasil |
| 2 | Pencarian berdasarkan nama makanan | Berhasil |
| 3 | Pencarian berdasarkan nama penyedia | Berhasil |
| 4 | Pencarian dengan kata kunci yang tidak ditemukan | Berhasil |
| 5 | Filter berdasarkan kategori makanan | Berhasil |
| 6 | Reset filter | Berhasil |

### Pengujian Formulir dan Validasi

Formulir penawaran dikembangkan untuk menerima data nama penawaran, kategori, harga normal, harga penawaran, jumlah stok, satuan, status, dan waktu berakhir. Validasi yang diterapkan mencakup:

- Nama penawaran harus memenuhi batas panjang karakter.
- Kategori dan satuan wajib diisi.
- Harga normal harus berupa bilangan bulat positif.
- Harga penawaran dapat bernilai nol.
- Harga penawaran tidak boleh melebihi harga normal.
- Jumlah stok harus berupa bilangan bulat dan tidak negatif.
- Status hanya menerima pilihan draft atau aktif.
- Waktu berakhir harus berada di masa depan.

Hasil pengujian:

| No. | Skenario Pengujian | Hasil |
|---|---|---|
| 1 | Formulir dalam keadaan kosong | Berhasil |
| 2 | Harga penawaran melebihi harga normal | Berhasil |
| 3 | Harga penawaran bernilai nol | Berhasil |
| 4 | Stok berupa bilangan pecahan | Berhasil |
| 5 | Harga tidak diisi | Berhasil |
| 6 | Tanggal berakhir sudah lewat | Berhasil |
| 7 | Nama kurang dari tiga karakter | Berhasil |
| 8 | Pengiriman data formulir valid | Berhasil |

### Hasil Production Build

Proses production build dijalankan melalui perintah:

```bash
npm run build
```

Hasil proses build:

```text
> sisabaik-frontend@1.0.1 build
> vite build

vite v8.3.3 building client environment for production...
✓ 23 modules transformed.
computing gzip size...

dist/assets/brand-mark-CygknmpB.svg    0.51 kB │ gzip:  0.30 kB
dist/index.html                        0.71 kB │ gzip:  0.43 kB
dist/assets/index-Do9ApoBZ.css        11.72 kB │ gzip:  3.25 kB
dist/assets/index-D-z3JKGH.js        100.48 kB │ gzip: 35.79 kB

✓ built in 6.86s
```
**Hasil:** Production build berhasil tanpa error.
Production preview dijalankan menggunakan:

```bash
npm run preview
```

Alamat preview:
`http://127.0.0.1:4173/`
Server preview berhasil dijalankan.

### Pengujian Aset Visual

| No. | Aset | Format | Hasil |
|---|---|---|---|
| 1 | Logo SisaBaik | SVG | Berhasil |
| 2 | Ilustrasi roti dan kue | SVG | Berhasil |
| 3 | Ilustrasi makanan siap saji | SVG | Berhasil |
| 4 | Ilustrasi bahan segar | SVG | Berhasil |

Aset visual berhasil ditampilkan melalui struktur import pada aplikasi Vue.

### Dokumentasi Bukti Pengujian

Bukti pengujian yang dilampirkan:

1. Screenshot halaman katalog penawaran.
2. Screenshot hasil pencarian kosong.
3. Screenshot formulir dengan input tidak valid.
4. Screenshot formulir dengan input valid.
5. Screenshot tampilan aplikasi pada perangkat mobile.
6. Screenshot terminal ketika production build berhasil.

### Batasan Implementasi

Pada Chapter 9, aplikasi frontend masih menggunakan data fixture yang disimpan sementara di memori browser. Batasan implementasi pada tahap ini:

- Data penawaran belum disimpan secara permanen.
- Refresh halaman mengembalikan data ke kondisi fixture awal.
- Frontend belum melakukan pemanggilan API.
- Data belum terhubung dengan PostgreSQL.
- Pemilihan kartu belum menghasilkan transaksi pemesanan.
- Pemilihan kartu belum mengurangi stok makanan.

Backend pada Chapter 8 tetap memiliki fitur pendaftaran mandiri, verifikasi penyedia, autentikasi, dan otorisasi. Integrasi frontend dengan backend direncanakan pada pertemuan 11.

### Kesimpulan Pengujian

Pengembangan antarmuka aplikasi SisaBaik menggunakan Vue pada Chapter 9 telah mencapai tahap production build dan production preview. Struktur komponen, komunikasi props dan emits, data fixture, helper, aset SVG, serta formulir validasi telah disiapkan sesuai materi pembelajaran. Proses kompilasi berhasil menghasilkan direktori `frontend/dist` beserta berkas HTML, CSS, JavaScript, dan aset visual. Berdasarkan hasil pengujian, fungsi utama antarmuka, pencarian, filter, formulir, validasi, dan tampilan aplikasi dinyatakan berhasil sesuai skenario pengujian. Dengan demikian, pengembangan frontend SisaBaik pada Chapter 9 telah mencapai tahap implementasi dan build, sebelum dilanjutkan ke tahap integrasi API.

