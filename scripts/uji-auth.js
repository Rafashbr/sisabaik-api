import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { pool } from "../src/db/pool.js";
import { verifikasiPenyedia } from "../src/lib/verifikasi-penyedia.js";
const base = process.argv[2] ?? "http://127.0.0.1:3000";
const tujuan = new URL(base);
if (tujuan.protocol !== "http:" ||
    !["localhost", "127.0.0.1"].includes(tujuan.hostname) ||
    (!["localhost", "127.0.0.1"].includes(process.env.PGVHOST) ||
     process.env.PGDATABASE !== "sisabaik_dev")) {
  throw new Error("Uji ini hanya untuk HTTP dan database praktikum lokal.");
}
const password = randomBytes(18).toString("hex");
const marker = `Uji Auth ${Date.now()}-${randomBytes(5).toString("hex")}`;
const suffix = marker.replace(/[^a-z0-9]/gi, "").toLowerCase();
const emailRina = `rina.${suffix}@example.test`;
const emailBudi = `budi.${suffix}@example.test`;
const emailSiti = `siti.${suffix}@example.test`;
const emailDudi = `dudi.${suffix}@example.test`;
let checks = 0;
async function api(path, method = "GET", body, token) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  const r = await fetch(new URL(path, base), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return {
    status: r.status,
    headers: r.headers,
    body: r.status === 204 ? null : await r.json(),
  };
}
function status(r, expected) {
  assert.equal(
    r.status,
    expected,
    `HTTP ${r.status}: code=${r.body?.error?.code ?? "-"}`,
  );
  checks++;
}
async function login(email) {
  const r = await api("/api/auth/login", "POST", {
    email,
    kataSandi: password,
  });
  status(r, 200);
  return r.body.data;
}
try {
  status(await api("/api/pesanan", 401));
  status(await api("/api/auth/saya", "GET", undefined, "rusak"), 401);
  assert.equal(
    (await pool.query("SELECT current_database() AS nama")).rows[0].nama,
    "sisabaik_dev",
  );
  const { rows: akun } = await pool.query(
    `SELECT current_database() AS nama`,
  );
  assert.equal(akun[0].nama, "sisabaik_dev");
  const daftar = {
    namaLengkap: "Pembeli Uji",
    email: emailSiti,
    kataSandi: password,
  };
  const rina = {
    namaLengkap: "Penyedia Uji Rina",
    email: emailRina,
    kataSandi: password,
    namaUsaha: "Toko Roti Uji",
    alamat: "Jl. Dr. Hamka No. 8, Padang",
    nomorTelepon: "+6281234567890",
  };
  status(await api("/api/auth/registrasi-penyedia", "POST", rina), 201);
  status(await api("/api/auth/registrasi-penyedia", "POST", rina), 409);
  const pending = await login(emailRina);
  assert.equal(pending.pengguna.peran, "penyedia");
  assert.equal(pending.pengguna.statusVerifikasi, "menunggu");
  status(await api("/api/penawaran", "POST", {
    nama: "Uji Penawaran",
    kategori: "Roti",
    hargaNormal: 10000,
    hargaPenawaran: 5000,
    stok: 5,
    satuan: "paket",
    status: "aktif",
    berakhirPada: new Date(Date.now() + 86400000).toISOString(),
  }, pending.accessToken), 403);
  status(await api("/api/auth/saya", "GET", undefined, pending.accessToken), 200);
  await verifikasiPenyedia(pool, emailRina, "terverifikasi");
  const rinaLogin = await login(emailRina);
  assert.equal(rinaLogin.pengguna.statusVerifikasi, "terverifikasi");
  const budi = {
    namaLengkap: "Penyedia Uji Budi",
    email: emailBudi,
    kataSandi: password,
    namaUsaha: "Toko Buah Uji",
    alamat: "Jl. Dr. Hamka No. 8, Padang",
    nomorTelepon: "+6281234567891",
  };
  const dudi = {
    namaLengkap: "Pembeli Uji Dudi",
    email: emailDudi,
    kataSandi: password,
  };
  status(await api("/api/auth/registrasi", "POST", daftar), 201);
  status(await api("/api/auth/registrasi", "POST", daftar), 409);
  status(await api("/api/auth/registrasi-penyedia", "POST", budi), 201);
  status(await api("/api/auth/registrasi", "POST", dudi), 201);
  const siti = await login(emailSiti);
  const dudiLogin = await login(emailDudi);
  const budiLogin = await login(emailBudi);
  status(await api("/api/penawaran", "POST", {
    nama: marker,
    kategori: "roti",
    hargaNormal: 10000,
    hargaPenawaran: 5000,
    stok: 5,
    satuan: "paket",
    status: "aktif",
    berakhirPada: new Date(Date.now() + 86400000).toISOString(),
  }, rinaLogin.accessToken), 201);
  const penawaran = await api(
    "/api/penawaran",
    "GET",
    undefined,
    rinaLogin.accessToken,
  );
  status(penawaran, 200);
  const payload = {
    items: [{ penawaranId: penawaran.body.data[0].id, kuantitas: 1 }],
  };
  status(await api("/api/penawaran", "POST", payload, dudiLogin.accessToken), 403);
  status(await api("/api/penawaran", "POST", {
    ...payload, penyediaId: budiLogin.pengguna.penyediaId,
  }, rinaLogin.accessToken), 400);
  const buat = await api(
    "/api/pesanan",
    "POST",
    payload,
    siti.accessToken,
  );
  status(buat, 201);
  const orderId = buat.body.data.id;
  assert.equal(buat.body.data.pembeliId, siti.pengguna.id);
  assert.equal(buat.body.data.penyediaId, rinaLogin.pengguna.penyediaId);
  status(await api(
    `/api/pesanan/${orderId}`,
    "GET",
    undefined,
    siti.accessToken,
  ), 200);
  status(await api(
    `/api/pesanan/${orderId}`,
    "GET",
    undefined,
    budiLogin.accessToken,
  ), 404);
  status(await api(
    `/api/pesanan/${orderId}`,
    "GET",
    undefined,
    rinaLogin.accessToken,
  ), 200);
  const list = await api(
    "/api/penawaran?limit=50",
    "GET",
    undefined,
    siti.accessToken,
  );
  status(list, 200);
  assert.ok(list.body.data.every((p) => p.pembeliId === undefined));
  const milik = await api(
    "/api/penawaran/milik-saya?limit=50",
    "GET",
    undefined,
    budi.accessToken,
  );
  status(milik, 200);
  assert.ok(milik.body.data.every((p) => p.penyediaId === budi.pengguna.penyediaId));
  status(await api(
    `/api/penawaran/${penawaran.body.data[0].id}`,
    "PUT",
    { ...payload, stok: 4, hargaPenawaran: 6000 },
    rina.accessToken,
  ), 200);
  const snapshot = await api(
    `/api/penawaran/${penawaran.body.data[0].id}`,
    "GET",
    undefined,
    siti.accessToken,
  );
  status(snapshot, 200);
  assert.equal(snapshot.body.data.items[0].hargaSatuan, 5000);
  await api(
    `/api/penawaran/${penawaran.body.data[0].id}`,
    "PUT",
    { ...payload, stok: 4 },
    rina.accessToken,
  );
  const draft = await api(
    "/api/penawaran",
    "POST",
    { ...payload, nama: marker + " draft", status: "draft" },
    rina.accessToken,
  );
  status(draft, 201);
  status(await api(
    `/api/penawaran/${draft.body.data.id}`,
    "DELETE",
    undefined,
    budi.accessToken,
  ), 404);
  status(await api(
    `/api/penawaran/${draft.body.data.id}`,
    "DELETE",
    undefined,
    rina.accessToken,
  ), 204);
  status(await api("/api/auth/logout", "POST", {}, siti.accessToken), 204);
  status(await api("/api/auth/saya", "GET", undefined, siti.accessToken), 401);
  status(await api("/api/auth/saya", "GET", undefined, "rusak"), 401);
  console.log(`PASS: ${checks} pemeriksaan HTTP dan assertion kepemilikan/snapshot.`);
  console.log("Bukti: penawaran 5, pesanan 5 (fixture dipertahankan).");
  console.log("Catatan: akun uji dibuat dengan email unik yang tidak dibatalkan.");
  console.log("Jalankan skrip ini hanya dengan aman untuk pengujian lokal.");
} catch (error) {
  console.error("FAIL:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}