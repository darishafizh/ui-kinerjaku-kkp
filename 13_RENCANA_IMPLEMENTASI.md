# M. Rencana Implementasi (Roadmap)

---

## M.1 Ringkasan Timeline

**Durasi total: ~4 bulan (16 minggu) — realistis untuk Fase 1/MVP**

```
Minggu 1–3     │ Tahap 1: Analisis & Desain
Minggu 4–10    │ Tahap 2: Pembangunan Modul Inti
Minggu 11–12   │ Tahap 3: Integrasi Opsional (SSO)
Minggu 13–14   │ Tahap 4: Uji Internal + UAT
Minggu 15–16   │ Tahap 5: Pilot + Perluasan Awal
```

---

## M.2 Detail per Tahap

### Tahap 1: Analisis & Desain (Minggu 1–3)

| Minggu | Kegiatan | Deliverables |
|--------|----------|-------------|
| 1 | Kick-off project; finalisasi requirement; review dokumen PRD bersama stakeholder (Biro Perencanaan, Pusdatin, Itjen) | Notulen kick-off; PRD final (dokumen ini) disetujui |
| 2 | Desain arsitektur detail; desain data model; setup infrastruktur dev (repository, CI/CD, database, object storage) | Dokumen arsitektur detail; environment dev siap |
| 3 | Desain UI/UX high-fidelity (mockup/prototype Figma); review dengan pengguna kunci; finalisasi design system | Mockup UI/prototype; style guide; design system |

**Milestone:** ✅ PRD & Desain disetujui stakeholder.

---

### Tahap 2: Pembangunan Modul Inti (Minggu 4–10)

| Minggu | Modul/Fitur | Deliverables |
|--------|-------------|-------------|
| 4 | **Foundation:** Auth (login lokal, RBAC, session), User management, Unit Kerja, Audit Log | Modul autentikasi & otorisasi berjalan; manajemen user & unit |
| 5 | **Modul 2 – Perencanaan (bagian 1):** Sasaran, Indikator (CRUD + metadata), Target Periodik | Form perencanaan + validasi + workflow draft/submit |
| 6 | **Modul 2 – Perencanaan (bagian 2):** Cascading/Pohon Kinerja, Rencana Aksi, Milestone | Cascading navigable; rencana aksi + milestone tracking |
| 7 | **Modul 3 – Pengukuran (bagian 1):** Input Capaian, Upload Evidence, Draft/Submit | Form capaian + file upload + validasi |
| 8 | **Modul 3 – Pengukuran (bagian 2):** Verifikasi & Approval workflow; inbox verifikasi | Workflow berjenjang + inbox reviewer |
| 9 | **Modul 4 – Pelaporan:** Draft laporan, reviu, versioning, generate PDF/DOCX | Laporan + generate dokumen + version history |
| 9–10 | **Modul 5 – Evaluasi:** Lembar kerja evaluasi, rekomendasi, tindak lanjut (tracking) | Evaluasi end-to-end oleh Itjen |
| 10 | **Modul 1 – Dashboard:** Widget analitik, traffic-light, tren, heatmap, top-gap | Dashboard MVP fungsional |
| 10 | **Modul 6 – Dokumen:** Pohon kinerja view, manual indikator, dokumen kinerja (CRUD + versioning) | Repository dokumen |
| 10 | **Modul 7 – Informasi Lainnya:** Pengguna, unit kerja, panduan, profil akun | Modul pendukung selesai |

**Milestone:** ✅ Seluruh 7 modul berjalan di environment development.

---

### Tahap 3: Integrasi Opsional – SSO (Minggu 11–12)

| Minggu | Kegiatan | Deliverables |
|--------|----------|-------------|
| 11 | Implementasi adapter SSO (jika SSO KKP tersedia); konfigurasi OAuth2/SAML; user mapping | Integrasi SSO berfungsi di environment staging |
| 12 | Pengujian integrasi SSO; fallback scenario testing; finalisasi placeholder integrasi lainnya | SSO tested; placeholder API terdokumentasi |

**Catatan:** Jika SSO KKP belum tersedia, minggu 11–12 digunakan untuk hardening, bug fixing, dan optimasi performa.

**Milestone:** ✅ SSO terintegrasi (atau placeholder siap).

---

### Tahap 4: Uji Internal + UAT (Minggu 13–14)

| Minggu | Kegiatan | Deliverables |
|--------|----------|-------------|
| 13 | **Uji internal:** testing fungsional seluruh modul, security testing (RBAC, injection), performance testing (load test 200 concurrent) | Laporan uji internal; bug list; perbaikan |
| 14 | **UAT:** Uji oleh perwakilan Biro Perencanaan, Operator Unit (2-3 unit pilot), Itjen; skenario uji (Bagian N) | Laporan UAT; sign-off pengguna; bug fixes |

**Milestone:** ✅ UAT sign-off dari stakeholder.

---

### Tahap 5: Pilot & Perluasan Awal (Minggu 15–16)

| Minggu | Kegiatan | Deliverables |
|--------|----------|-------------|
| 15 | **Go-live pilot:** Deploy ke environment produksi; pilot untuk 1-2 unit kerja (Eselon I + Eselon II terpilih); pelatihan pengguna pilot | Sistem live di produksi; pelatihan selesai |
| 16 | **Monitoring & stabilisasi:** Monitor penggunaan, performa, bug report dari pilot; quick fixes; dokumentasi lessons learned; rencana perluasan | Laporan pilot; rencana perluasan ke seluruh unit |

**Milestone:** ✅ Pilot berhasil; rencana perluasan disetujui.

---

## M.3 Ringkasan Milestone

| No | Milestone | Target Minggu |
|----|-----------|--------------|
| 1 | PRD & Desain disetujui | Minggu 3 |
| 2 | Seluruh modul berjalan di dev | Minggu 10 |
| 3 | SSO terintegrasi / placeholder siap | Minggu 12 |
| 4 | UAT sign-off | Minggu 14 |
| 5 | Pilot go-live | Minggu 15 |
| 6 | Laporan pilot & rencana perluasan | Minggu 16 |

---

## M.4 Asumsi & Prasyarat

1. Tim pengembang tersedia penuh (minimal 2 backend dev, 1 frontend dev, 1 QA, 1 PM/BA).
2. Infrastruktur (server, database, object storage) disediakan oleh Pusdatin KKP.
3. Stakeholder tersedia untuk review dan UAT sesuai jadwal.
4. SSO KKP — ketersediaan dan dokumentasi teknis diserahkan paling lambat Minggu 10.
5. Template laporan (LKjIP) disediakan oleh Biro Perencanaan dalam format editable (DOCX/template engine compatible).
