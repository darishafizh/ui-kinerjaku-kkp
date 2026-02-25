# N. Skenario Uji (UAT)

---

## N.1 Daftar Test Case

### TC-01: Create Indikator Kinerja (Positif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Operator Unit |
| **Pre-condition** | User sudah login sebagai Operator Unit; sasaran kinerja sudah ada (status Draft/Approved); periode perencanaan terbuka |
| **Langkah** | 1. Navigasi ke Perencanaan Kinerja > Sasaran & Indikator. 2. Klik sasaran terkait → "＋ Tambah Indikator". 3. Isi semua field wajib: Nama Indikator, Definisi Operasional, Formula, Satuan ("Unit"), Polaritas ("Maximize"), Baseline (50), Sumber Data ("Survey Tahunan"). 4. Isi target periodik: TW I = 60, TW II = 70, TW III = 80, TW IV = 90. 5. Klik "Simpan Draft". |
| **Expected Result** | Indikator tersimpan dengan status "Draft"; muncul di daftar indikator sasaran terkait; semua metadata terisi sesuai input; tidak ada error. |

---

### TC-02: Submit Capaian Kinerja (Positif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Operator Unit |
| **Pre-condition** | Indikator berstatus Approved; target periodik sudah terisi; periode pengukuran terbuka |
| **Langkah** | 1. Navigasi ke Pengukuran Kinerja > Input Capaian. 2. Pilih periode TW I. 3. Klik "Input Capaian" pada indikator terkait. 4. Isi nilai capaian: 65. 5. Isi narasi pencapaian: "Tercapai melebihi target...". 6. Upload evidence: file PDF (2 MB). 7. Klik "Submit untuk Verifikasi". |
| **Expected Result** | Capaian berstatus "Submitted"; evidence terlampir; persentase capaian terhitung otomatis (65/60 × 100 = 108.33%); notifikasi terkirim ke Verifikator Unit. |

---

### TC-03: Verifikasi Capaian — Approve (Positif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Verifikator Unit |
| **Pre-condition** | Capaian berstatus "Submitted"; Verifikator di-assign ke unit yang sama |
| **Langkah** | 1. Navigasi ke Pengukuran Kinerja > Verifikasi Capaian. 2. Lihat inbox "Menunggu Verifikasi". 3. Klik capaian terkait. 4. Periksa nilai, narasi, dan evidence. 5. Isi komentar: "Data valid dan sesuai evidence". 6. Klik "Verifikasi ✓". |
| **Expected Result** | Status capaian berubah menjadi "Verified"; notifikasi terkirim ke Operator dan Reviewer; record verifikasi tercatat di audit log. |

---

### TC-04: Approval Capaian oleh Reviewer (Positif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Reviewer Biro Perencanaan |
| **Pre-condition** | Capaian berstatus "Verified" |
| **Langkah** | 1. Navigasi ke Pengukuran Kinerja > Verifikasi Capaian > Tab "Menunggu Approval". 2. Klik capaian terkait. 3. Reviu data dan riwayat verifikasi. 4. Klik "Approve ✓". |
| **Expected Result** | Status capaian berubah menjadi "Approved" (locked); data muncul di dashboard; audit log mencatat approval. |

---

### TC-05: Generate Laporan Kinerja (Positif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Admin Pusat |
| **Pre-condition** | Seluruh capaian indikator untuk periode TW I berstatus "Approved"; laporan berstatus "Approved" |
| **Langkah** | 1. Navigasi ke Pelaporan Kinerja. 2. Pilih laporan unit yang sudah Approved. 3. Klik "Generate PDF". 4. Tunggu loading indicator. 5. Klik "Download" setelah generate berhasil. |
| **Expected Result** | File PDF ter-generate dan tersimpan; link download aktif; file berisi data capaian yang benar; versi laporan tercatat. |

---

### TC-06: Evaluasi & Tindak Lanjut (Positif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Inspektorat Jenderal → Operator Unit |
| **Pre-condition** | Laporan kinerja unit telah dipublikasikan |
| **Langkah** | 1. (Itjen) Navigasi ke Evaluasi > Lembar Kerja Evaluasi > "＋ Buat Evaluasi Baru". 2. Pilih unit dan periode. 3. Isi skor per komponen dan catatan. 4. Klik "Finalisasi". 5. Buat rekomendasi: uraian, prioritas "Tinggi", due date 30 hari kedepan. 6. (Operator Unit) Login, lihat notifikasi rekomendasi. 7. Buat tindak lanjut: rencana, PIC, due date. 8. Update progres tindak lanjut. |
| **Expected Result** | Lembar evaluasi tersimpan dengan skor; rekomendasi tersimpan; notifikasi terkirim ke unit; tindak lanjut terlacak; status berubah sesuai progres. |

---

### TC-07: Evidence Wajib — Submit Tanpa Evidence (Negatif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Operator Unit |
| **Pre-condition** | Indikator dikonfigurasi dengan evidence wajib; capaian sudah diisi nilai |
| **Langkah** | 1. Input capaian dengan nilai 75 dan narasi. 2. **Tidak** mengunggah evidence. 3. Klik "Submit untuk Verifikasi". |
| **Expected Result** | Submit **ditolak** oleh sistem; pesan error: "Evidence wajib diunggah sebelum submit"; tombol submit ter-disable; form tetap terbuka untuk dilengkapi. |

---

### TC-08: Target Kosong — Submit Indikator Tanpa Target (Negatif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Operator Unit |
| **Pre-condition** | Indikator sudah dibuat dengan metadata lengkap; target periodik **belum** diisi |
| **Langkah** | 1. Navigasi ke indikator terkait. 2. Pastikan target periodik kosong. 3. Klik "Submit untuk Verifikasi". |
| **Expected Result** | Submit **ditolak**; pesan error: "Target periodik wajib diisi minimal untuk satu periode sebelum submit"; indikator tetap berstatus "Draft". |

---

### TC-09: Capaian di Luar Range — Nilai Negatif (Negatif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Operator Unit |
| **Pre-condition** | Indikator dengan satuan "%" (0–100 range logis); target TW I = 60 |
| **Langkah** | 1. Input capaian dengan nilai -10. 2. Klik "Simpan Draft". |
| **Expected Result** | Validasi client-side: pesan error "Nilai capaian tidak boleh negatif"; field capaian ditandai merah; data **tidak** tersimpan. |

---

### TC-10: Reject & Revisi Capaian (Negatif → Alur Revisi)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Verifikator Unit → Operator Unit |
| **Pre-condition** | Capaian berstatus "Submitted" |
| **Langkah** | 1. (Verifikator) Buka inbox verifikasi. 2. Reviu capaian → evidence tidak sesuai. 3. Isi komentar: "Evidence tidak relevan dengan indikator". 4. Klik "Tolak ✗". 5. (Operator) Login, lihat notifikasi rejection. 6. Buka capaian yang ditolak (status kembali ke Draft). 7. Upload evidence yang benar. 8. Re-submit. |
| **Expected Result** | Status berubah ke "Draft (Revised)"; komentar rejection tercatat; Operator dapat mengedit dan re-submit; riwayat rejection terlihat di audit log. |

---

### TC-11: Akses Ditolak — Operator Mengakses Unit Lain (Negatif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Operator Unit (Unit A) |
| **Pre-condition** | Operator di-assign ke Unit A; Unit B memiliki data kinerja |
| **Langkah** | 1. Coba akses URL langsung ke halaman capaian Unit B (manipulasi URL). 2. Atau coba mengubah filter unit ke Unit B. |
| **Expected Result** | Sistem menolak akses; halaman menampilkan "403 Forbidden" atau "Anda tidak memiliki akses ke unit kerja ini"; tidak ada data Unit B yang ditampilkan; kejadian tercatat di audit log. |

---

### TC-12: Akses Ditolak — Tamu Mencoba Edit Data (Negatif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Tamu/Eksternal |
| **Pre-condition** | Tamu login dengan credential view-only; ada data kinerja published |
| **Langkah** | 1. Navigasi ke Dashboard — data published terlihat. 2. Navigasi ke Perencanaan — tidak ada tombol "Tambah" / "Edit". 3. Coba akses API endpoint POST/PUT secara langsung (Postman/curl). |
| **Expected Result** | UI: tidak ada tombol aksi selain view/download; API: response "403 Forbidden"; tidak ada perubahan data; audit log mencatat attempted unauthorized access. |

---

### TC-13: Workflow Lock — Edit Indikator Setelah Approved (Negatif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Operator Unit |
| **Pre-condition** | Indikator berstatus "Approved" (locked) |
| **Langkah** | 1. Navigasi ke indikator yang sudah Approved. 2. Coba klik "Edit". |
| **Expected Result** | Tombol "Edit" tidak tersedia / disabled; jika akses via API → "403: Data sudah terkunci (Approved). Hubungi Admin Pusat untuk unlock."; data tidak berubah. |

---

### TC-14: Duplikasi Perencanaan Tahun Sebelumnya (Positif)

| Aspek | Keterangan |
|-------|-----------|
| **Role** | Operator Unit |
| **Pre-condition** | Perencanaan tahun sebelumnya (2025) sudah ada dan berstatus Locked; periode 2026 telah dibuka |
| **Langkah** | 1. Navigasi ke Perencanaan 2026. 2. Klik "Duplikasi dari Tahun Sebelumnya". 3. Pilih tahun 2025. 4. Konfirmasi. |
| **Expected Result** | Seluruh sasaran, indikator, dan metadata dari 2025 ter-copy ke 2026 dengan status "Draft"; target periodik harus diisi ulang; cascading parent direset; Operator dapat mengedit sesuai kebutuhan baru. |

---

## N.2 Ringkasan Coverage

| Kategori | Jumlah TC | ID |
|----------|:---------:|-----|
| Positif — Create & Submit | 2 | TC-01, TC-02 |
| Positif — Verify & Approve | 2 | TC-03, TC-04 |
| Positif — Generate Laporan | 1 | TC-05 |
| Positif — Evaluasi & Tindak Lanjut | 1 | TC-06 |
| Positif — Duplikasi | 1 | TC-14 |
| Negatif — Validasi Data | 3 | TC-07, TC-08, TC-09 |
| Negatif — Reject & Revisi | 1 | TC-10 |
| Negatif — Akses Ditolak (RBAC) | 3 | TC-11, TC-12, TC-13 |
| **Total** | **14** | |
