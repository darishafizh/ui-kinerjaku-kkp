# I. Sumber Data & Integrasi (Placeholder)

---

## I.1 Daftar Integrasi Potensial

| No | Sistem Eksternal | Status | Prioritas |
|----|-----------------|--------|-----------|
| 1 | SSO KKP | PLACEHOLDER (disarankan untuk Fase 1) | Tinggi |
| 2 | Sistem Perencanaan/Penganggaran KKP | PLACEHOLDER | Sedang |
| 3 | Sistem Kepegawaian KKP | PLACEHOLDER | Sedang |
| 4 | Portal Data Internal KKP | PLACEHOLDER | Rendah |

---

## I.2 Detail per Integrasi

### I.2.1 SSO KKP [PLACEHOLDER – Disarankan]

| Aspek | Keterangan |
|-------|-----------|
| **Data yang Dibaca** | Identitas pengguna (username, nama, email, NIP, unit kerja), token autentikasi |
| **Data yang Ditulis** | Tidak ada (SSO sebagai identity provider) |
| **Frekuensi** | Real-time (setiap login/validasi token) |
| **Metode Integrasi** | OAuth2 / SAML 2.0 via API; fallback login lokal jika SSO tidak tersedia |
| **Kontrol Kualitas** | Validasi token signature; mapping user SSO ke role KinerjaKu Next oleh Admin Pusat; auto-provisioning user baru opsional |
| **Catatan** | Jika SSO belum tersedia, sistem menggunakan autentikasi lokal (username + password). Endpoint SSO adapter sudah disiapkan sebagai placeholder. |

### I.2.2 Sistem Perencanaan/Penganggaran KKP [PLACEHOLDER]

| Aspek | Keterangan |
|-------|-----------|
| **Data yang Dibaca** | Data Renja/RKA: program, kegiatan, output, alokasi anggaran per unit kerja |
| **Data yang Ditulis** | Tidak ada (read-only dari sisi KinerjaKu Next) |
| **Frekuensi** | Batch harian atau on-demand (saat periode perencanaan) |
| **Metode Integrasi** | REST API [PLACEHOLDER]; alternatif: import file CSV/Excel secara manual |
| **Kontrol Kualitas** | Validasi kode program/kegiatan; reconciliation terhadap data master unit kerja; flag jika data tidak sesuai |

### I.2.3 Sistem Kepegawaian KKP [PLACEHOLDER]

| Aspek | Keterangan |
|-------|-----------|
| **Data yang Dibaca** | Data pegawai: NIP, nama, jabatan, unit kerja, status aktif |
| **Data yang Ditulis** | Tidak ada (read-only) |
| **Frekuensi** | Batch mingguan atau on-demand |
| **Metode Integrasi** | REST API [PLACEHOLDER]; alternatif: import file CSV/Excel |
| **Kontrol Kualitas** | Validasi NIP unik; sinkronisasi unit kerja dengan master data OrganizationUnit; alert jika pegawai tidak ditemukan |

### I.2.4 Portal Data Internal KKP [PLACEHOLDER]

| Aspek | Keterangan |
|-------|-----------|
| **Data yang Dibaca** | Data statistik kelautan/perikanan yang relevan sebagai sumber data indikator kinerja |
| **Data yang Ditulis** | Opsional: publish ringkasan capaian kinerja ke portal |
| **Frekuensi** | On-demand |
| **Metode Integrasi** | REST API [PLACEHOLDER]; alternatif: manual entry / link referensi |
| **Kontrol Kualitas** | Validasi format dan satuan data; timestamp sumber data dicatat |

---

## I.3 Strategi Implementasi Integrasi

1. **Adapter Pattern** — Setiap integrasi diakses melalui adapter/service layer tersendiri. Jika sistem eksternal belum tersedia, adapter mengembalikan data kosong atau data mock.
2. **Feature Flag** — Integrasi diaktifkan/dinonaktifkan melalui konfigurasi (environment variable / admin panel) tanpa perlu deployment ulang.
3. **Fallback** — Jika integrasi gagal, sistem tetap berfungsi dengan mode manual (input data oleh operator).
4. **Logging** — Setiap panggilan integrasi dicatat (request/response/error) untuk troubleshooting.
