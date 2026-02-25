# D. Kebutuhan Fungsional (PRD) – per Modul (Bagian 2)

---

## D.4 Modul 4: Pelaporan Kinerja

### Objective
Memfasilitasi penyusunan, reviu, dan penerbitan laporan kinerja dengan versioning, serta kemampuan generate dokumen otomatis (PDF/DOCX).

### User Stories

| ID | User Story |
|----|-----------|
| US-L01 | Sebagai Operator Unit, saya ingin menyusun draft laporan kinerja berdasarkan data capaian yang telah ter-approve. |
| US-L02 | Sebagai Operator Unit, saya ingin menambahkan narasi analisis, kendala umum, dan rencana perbaikan pada laporan. |
| US-L03 | Sebagai Operator Unit, saya ingin mengajukan draft laporan untuk reviu Biro Perencanaan. |
| US-L04 | Sebagai Reviewer Biro Perencanaan, saya ingin mereviu laporan unit dan memberikan catatan/komentar per bagian. |
| US-L05 | Sebagai Reviewer Biro Perencanaan, saya ingin menyetujui atau menolak laporan dengan alasan. |
| US-L06 | Sebagai Operator Unit, saya ingin merevisi laporan yang ditolak dan re-submit sebagai versi baru. |
| US-L07 | Sebagai Admin Pusat, saya ingin meng-generate dokumen laporan final dalam format PDF atau DOCX. |
| US-L08 | Sebagai pengguna, saya ingin melihat histori versi laporan dan membandingkan perubahan antar versi. |
| US-L09 | Sebagai Admin Pusat, saya ingin mengonsolidasikan laporan seluruh unit menjadi laporan kementerian. |
| US-L10 | Sebagai pengguna, saya ingin mengunduh (download) laporan yang telah dipublikasikan. |

### Field & Metadata Utama

| Field | Tipe | Keterangan |
|-------|------|-----------|
| Unit Kerja | FK | Unit penyusun |
| Periode Laporan | Enum + Tahun | Triwulanan/Semesteran/Tahunan + tahun |
| Versi | Integer | Nomor versi (auto-increment saat revisi) |
| Status | Enum | Draft/Submitted/Under Review/Approved/Published/Rejected |
| Konten Narasi | Text (rich) | Isi laporan: analisis, kendala, rencana perbaikan |
| Catatan Reviu | Text | Komentar dari reviewer |
| Output File | FK | Relasi ke generated file (PDF/DOCX) |
| Created By | FK | Penyusun |
| Reviewed By | FK | Reviewer |
| Approved At | Timestamp | Waktu approval |

### Validasi & Aturan Bisnis
- Laporan hanya dapat di-generate jika seluruh capaian indikator untuk periode terkait sudah berstatus Approved.
- Setiap revisi menghasilkan versi baru; versi lama tetap tersimpan (tidak ditimpa).
- Generate PDF/DOCX menggunakan template standar yang dikelola Admin Pusat.
- Laporan Published menjadi read-only dan dapat diakses oleh Tamu/Eksternal.

### Workflow Status
```
Draft → Submitted → Under Review → Approved → Published
                         |              |
                    Rejected ──→ Revised (v+1)
```

### Notifikasi & Eskalasi
- Notifikasi ke reviewer saat laporan di-submit.
- Notifikasi ke operator saat approved/rejected.
- Eskalasi jika SLA reviu terlewati (7 hari kerja).

---

## D.5 Modul 5: Evaluasi Kinerja

### Objective
Memfasilitasi Inspektorat Jenderal dalam melakukan evaluasi kinerja, memberikan rekomendasi, serta tracking tindak lanjut rekomendasi oleh unit kerja.

### User Stories

| ID | User Story |
|----|-----------|
| US-E01 | Sebagai Itjen, saya ingin membuat lembar kerja evaluasi untuk unit tertentu pada periode tertentu. |
| US-E02 | Sebagai Itjen, saya ingin mengisi skor dan catatan per komponen evaluasi. |
| US-E03 | Sebagai Itjen, saya ingin melihat data kinerja unit (capaian, evidence, laporan) sebagai bahan evaluasi. |
| US-E04 | Sebagai Itjen, saya ingin menyusun rekomendasi berdasarkan temuan evaluasi. |
| US-E05 | Sebagai Itjen, saya ingin menetapkan batas waktu (due date) untuk setiap rekomendasi. |
| US-E06 | Sebagai Operator Unit, saya ingin melihat rekomendasi yang ditujukan ke unit saya. |
| US-E07 | Sebagai Operator Unit, saya ingin menyusun rencana tindak lanjut dengan PIC dan jadwal. |
| US-E08 | Sebagai Operator Unit, saya ingin memperbarui progres tindak lanjut secara periodik. |
| US-E09 | Sebagai Itjen, saya ingin memantau status tindak lanjut seluruh rekomendasi lintas unit. |
| US-E10 | Sebagai Itjen, saya ingin menerima notifikasi jika tindak lanjut melewati batas waktu. |
| US-E11 | Sebagai Admin Pusat, saya ingin melihat ringkasan evaluasi dan status tindak lanjut seluruh kementerian. |
| US-E12 | Sebagai pengguna, saya ingin mengekspor lembar kerja evaluasi ke format Excel/PDF. |

### Field & Metadata Utama

**Lembar Kerja Evaluasi:**
| Field | Tipe | Keterangan |
|-------|------|-----------|
| Unit Kerja | FK | Unit yang dievaluasi |
| Periode Evaluasi | Tahun + Semester | Periode yang dievaluasi |
| Komponen Evaluasi | String | Nama komponen (misal: Perencanaan, Pengukuran, Pelaporan, Evaluasi, Capaian) |
| Skor | Decimal | Nilai skor komponen |
| Catatan | Text | Temuan dan keterangan |
| Evaluator | FK | User Itjen |

**Rekomendasi:**
| Field | Tipe | Keterangan |
|-------|------|-----------|
| Lembar Kerja Evaluasi | FK | Relasi ke evaluasi |
| Uraian Rekomendasi | Text | Detail rekomendasi |
| Prioritas | Enum | Tinggi/Sedang/Rendah |
| Due Date | Date | Batas waktu penyelesaian |
| Status | Enum | Open/In Progress/Completed/Overdue |

**Tindak Lanjut:**
| Field | Tipe | Keterangan |
|-------|------|-----------|
| Rekomendasi | FK | Relasi ke rekomendasi |
| Rencana Tindak Lanjut | Text | Uraian rencana |
| PIC | FK | Penanggung jawab |
| Due Date | Date | Target penyelesaian |
| Status | Enum | Planned/In Progress/Completed/Overdue |
| Catatan Progres | Text | Update progres terbaru |
| Evidence | FK (nullable) | Bukti penyelesaian |

### Validasi & Aturan Bisnis
- Hanya role Itjen yang dapat membuat dan mengisi lembar kerja evaluasi.
- Rekomendasi wajib memiliki due date.
- Tindak lanjut yang melewati due date otomatis berstatus Overdue.
- History lengkap (audit trail) untuk setiap perubahan skor dan status.

### Workflow Status
**Evaluasi:** Open → In Evaluation → Completed
**Rekomendasi:** Open → In Progress → Completed / Overdue
**Tindak Lanjut:** Planned → In Progress → Completed / Overdue

### Notifikasi & Eskalasi
- Notifikasi ke unit saat rekomendasi diterbitkan.
- Reminder periodik untuk tindak lanjut mendekati due date (H-7, H-3, H-1).
- Eskalasi otomatis ke pimpinan unit jika status Overdue.

---

## D.6 Modul 6: Dokumen

### Objective
Menyediakan repository digital untuk dokumen kinerja (Perjanjian Kinerja, IKU, Renstra, dsb.), pohon kinerja navigable, dan manual indikator dengan versioning.

### User Stories

| ID | User Story |
|----|-----------|
| US-K01 | Sebagai Admin Pusat, saya ingin mengunggah dokumen kinerja resmi (PK, IKU, Renstra) dengan metadata. |
| US-K02 | Sebagai pengguna, saya ingin mencari dan melihat dokumen kinerja berdasarkan jenis, periode, atau unit. |
| US-K03 | Sebagai pengguna, saya ingin melihat pohon kinerja dalam tampilan hierarki interaktif (Level 0 → I → II → III). |
| US-K04 | Sebagai pengguna, saya ingin melakukan navigasi drill-down pada pohon kinerja untuk melihat detail cascading. |
| US-K05 | Sebagai Admin Pusat, saya ingin mengelola manual indikator (definisi, formula, cara pengukuran) secara terpusat dengan versioning. |
| US-K06 | Sebagai Operator Unit, saya ingin mengakses manual indikator sebagai panduan saat menyusun perencanaan. |
| US-K07 | Sebagai Admin Pusat, saya ingin mengunggah versi terbaru dokumen tanpa menghapus versi sebelumnya. |
| US-K08 | Sebagai pengguna, saya ingin mengunduh dokumen kinerja untuk keperluan offline. |

### Validasi & Aturan Bisnis
- Hanya Admin Pusat dan user dengan kewenangan khusus yang dapat mengunggah/mengedit dokumen.
- Versioning otomatis: setiap upload baru pada dokumen yang sama menghasilkan versi baru.
- Pohon kinerja bersumber dari data sasaran/indikator di Modul Perencanaan (read-only visualization).

### Workflow Status
Dokumen: Draft → Published → Archived (untuk versioning)

---

## D.7 Modul 7: Informasi Lainnya

### Objective
Menyediakan informasi pendukung: data unit kerja, pengguna, panduan penggunaan aplikasi, dan profil akun.

### User Stories

| ID | User Story |
|----|-----------|
| US-I01 | Sebagai Admin Pusat, saya ingin mengelola data unit kerja (nama, level, induk, kode, pimpinan). |
| US-I02 | Sebagai Admin Pusat, saya ingin mengelola data pengguna (tambah, edit, nonaktifkan, assign role & unit). |
| US-I03 | Sebagai pengguna, saya ingin melihat struktur organisasi dan hierarki unit kerja. |
| US-I04 | Sebagai pengguna, saya ingin mengakses panduan penggunaan aplikasi yang jelas dan terstruktur. |
| US-I05 | Sebagai pengguna, saya ingin mengelola profil akun saya (ubah password, update info kontak). |
| US-I06 | Sebagai Admin Pusat, saya ingin melihat log aktivitas pengguna untuk monitoring keamanan. |
| US-I07 | Sebagai pengguna, saya ingin melihat FAQ dan panduan troubleshooting. |

### Validasi & Aturan Bisnis
- Hanya Admin Pusat yang dapat mengelola master data unit kerja dan pengguna.
- Pengguna hanya dapat mengedit profil akun sendiri.
- Password wajib memenuhi kebijakan keamanan (minimal 8 karakter, kombinasi huruf besar, kecil, angka, spesial).
- Pengguna yang dinonaktifkan tidak dapat login tetapi datanya tetap tersimpan.

### Export/Import
- Export daftar pengguna dan unit kerja ke Excel (Admin Pusat).
- Import bulk pengguna dari file Excel/CSV (Admin Pusat) dengan validasi format.
