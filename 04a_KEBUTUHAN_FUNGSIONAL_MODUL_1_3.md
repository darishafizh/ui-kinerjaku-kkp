# D. Kebutuhan Fungsional (PRD) – per Modul (Bagian 1)

---

## D.1 Modul 1: Dashboard

### Objective
Menyediakan tampilan ringkasan kinerja organisasi secara real-time yang dapat difilter berdasarkan periode dan unit kerja, disesuaikan per role pengguna.

### User Stories

| ID | User Story |
|----|-----------|
| US-D01 | Sebagai pimpinan, saya ingin melihat ringkasan capaian kinerja seluruh unit di dashboard agar dapat memantau progres secara cepat. |
| US-D02 | Sebagai operator unit, saya ingin melihat dashboard khusus unit saya agar fokus pada kinerja yang menjadi tanggung jawab saya. |
| US-D03 | Sebagai pengguna, saya ingin memfilter dashboard berdasarkan periode (bulanan/triwulanan/tahunan) agar dapat membandingkan capaian antar periode. |
| US-D04 | Sebagai pengguna, saya ingin melihat indikator dengan traffic-light (merah/kuning/hijau) agar dapat segera mengetahui indikator bermasalah. |
| US-D05 | Sebagai pimpinan, saya ingin melihat grafik tren capaian vs target agar dapat menganalisis perkembangan kinerja. |
| US-D06 | Sebagai pengguna, saya ingin melihat status input/verifikasi per periode dalam bentuk heatmap/tabel agar mengetahui kelengkapan data. |
| US-D07 | Sebagai pengguna, saya ingin melihat daftar indikator dengan gap terbesar agar dapat memprioritaskan perhatian. |

### Komponen UI & Data
- Widget capaian vs target (grafik bar/line)
- Tabel status kelengkapan input per unit/periode
- Traffic-light indikator (threshold configurable)
- Daftar top-gap indikator
- Filter: periode, unit kerja, level
- Ringkasan rencana aksi terlambat
- Ringkasan tindak lanjut overdue

### Validasi & Aturan Bisnis
- Dashboard menampilkan data sesuai hak akses unit pengguna.
- Data yang ditampilkan bersumber dari capaian yang telah ter-approve (bukan draft).
- Tamu/Eksternal hanya melihat data yang telah dipublikasikan.

---

## D.2 Modul 2: Perencanaan Kinerja

### Objective
Memfasilitasi penyusunan sasaran strategis, indikator kinerja (beserta metadata lengkap), target periodik, dan rencana aksi secara digital dengan workflow approval dan cascading.

### User Stories

| ID | User Story |
|----|-----------|
| US-P01 | Sebagai Operator Unit, saya ingin membuat sasaran kinerja baru untuk unit saya agar perencanaan terdokumentasi. |
| US-P02 | Sebagai Operator Unit, saya ingin menambahkan indikator kinerja pada sasaran dengan mengisi metadata lengkap (definisi, formula, satuan, polaritas, baseline, sumber data). |
| US-P03 | Sebagai Operator Unit, saya ingin menetapkan target periodik (bulanan/triwulanan/semesteran/tahunan) untuk setiap indikator. |
| US-P04 | Sebagai Operator Unit, saya ingin memetakan indikator unit saya ke indikator level atas (cascading) agar pohon kinerja terhubung. |
| US-P05 | Sebagai Operator Unit, saya ingin mengajukan (submit) perencanaan untuk diverifikasi setelah yakin data lengkap. |
| US-P06 | Sebagai Verifikator Unit, saya ingin memverifikasi kelengkapan sasaran dan indikator yang diajukan Operator. |
| US-P07 | Sebagai Reviewer Biro Perencanaan, saya ingin menyetujui atau menolak perencanaan unit dengan memberikan catatan. |
| US-P08 | Sebagai Operator Unit, saya ingin menyusun rencana aksi per indikator dengan PIC, timeline, dan milestone. |
| US-P09 | Sebagai Admin Pusat, saya ingin mengonfigurasi periode perencanaan dan membuka/menutup masa input. |
| US-P10 | Sebagai pengguna, saya ingin melihat riwayat perubahan indikator dan target agar dapat menelusuri audit trail. |
| US-P11 | Sebagai Operator Unit, saya ingin menduplikasi perencanaan tahun sebelumnya sebagai baseline tahun berikutnya. |
| US-P12 | Sebagai Operator Unit, saya ingin mengekspor daftar indikator dan target ke format Excel untuk keperluan offline. |

### Field & Metadata Utama

**Sasaran:**
| Field | Tipe | Keterangan |
|-------|------|-----------|
| Kode Sasaran | String | Auto-generated, unik per unit/periode |
| Nama Sasaran | Text | Uraian sasaran strategis |
| Unit Kerja | FK | Relasi ke OrganizationUnit |
| Periode | FK | Tahun anggaran |
| Level | Enum | Kementerian/Eselon I/II/III |
| Parent Sasaran | FK (nullable) | Untuk cascading |
| Status | Enum | Draft/Submitted/Verified/Approved/Locked |

**Indikator Kinerja:**
| Field | Tipe | Keterangan |
|-------|------|-----------|
| Kode Indikator | String | Auto-generated |
| Nama Indikator | Text | Uraian indikator |
| Definisi Operasional | Text | Penjelasan detail |
| Formula/Cara Perhitungan | Text | Rumus atau metode |
| Satuan | String | %, unit, rupiah, dll. |
| Polaritas | Enum | Maximize / Minimize / Stabilize |
| Baseline | Decimal | Nilai awal/referensi |
| Sumber Data | Text | Asal data capaian |
| Sasaran | FK | Relasi ke Sasaran |
| Cascading Parent | FK (nullable) | Link ke indikator level atas |

**Target Periodik:**
| Field | Tipe | Keterangan |
|-------|------|-----------|
| Indikator | FK | Relasi ke Indikator |
| Jenis Periode | Enum | Bulanan/Triwulanan/Semesteran/Tahunan |
| Periode Ke | Integer | 1-12 (bulan) / 1-4 (TW) / 1-2 (SM) / 1 (tahunan) |
| Nilai Target | Decimal | Angka target |

**Rencana Aksi:**
| Field | Tipe | Keterangan |
|-------|------|-----------|
| Indikator | FK | Relasi ke Indikator |
| Nama Kegiatan | Text | Uraian rencana aksi |
| PIC | FK | Relasi ke User |
| Tanggal Mulai | Date | Rencana mulai |
| Tanggal Target Selesai | Date | Target penyelesaian |
| Status | Enum | Draft/Submitted/Verified/In Progress/Completed/Delayed |
| Milestone | JSON/related | Daftar milestone |

### Validasi & Aturan Bisnis
- Indikator wajib memiliki minimal: nama, definisi operasional, formula, satuan, polaritas.
- Target periodik harus terisi sebelum indikator dapat di-submit.
- Cascading parent hanya boleh ke indikator level langsung di atasnya.
- Setelah status Approved/Locked, data tidak dapat diubah kecuali oleh Admin Pusat (dengan unlock khusus dan audit log).

### Workflow Status
```
Draft → Submitted → Verified → Approved → Locked
              ↑         |           |
              └─ Rejected ←─ Rejected
```

### Notifikasi & Eskalasi
- Notifikasi saat submit, verified, approved, rejected.
- Eskalasi jika SLA verifikasi/approval terlewati (5 hari kerja).

---

## D.3 Modul 3: Pengukuran Kinerja

### Objective
Memfasilitasi input capaian kinerja periodik, upload evidence, serta proses verifikasi dan approval berjenjang secara digital.

### User Stories

| ID | User Story |
|----|-----------|
| US-M01 | Sebagai Operator Unit, saya ingin menginput capaian kinerja per indikator per periode. |
| US-M02 | Sebagai Operator Unit, saya ingin mengisi narasi pencapaian, kendala, dan solusi terkait capaian. |
| US-M03 | Sebagai Operator Unit, saya ingin mengunggah evidence/dokumen pendukung capaian. |
| US-M04 | Sebagai Operator Unit, saya ingin menyimpan capaian sebagai draft sebelum submit. |
| US-M05 | Sebagai Operator Unit, saya ingin mengajukan (submit) capaian untuk diverifikasi. |
| US-M06 | Sebagai Verifikator Unit, saya ingin melihat inbox capaian yang menunggu verifikasi. |
| US-M07 | Sebagai Verifikator Unit, saya ingin memeriksa evidence dan memverifikasi atau menolak capaian dengan komentar. |
| US-M08 | Sebagai Reviewer Biro Perencanaan, saya ingin menyetujui capaian yang telah diverifikasi atau mengembalikannya. |
| US-M09 | Sebagai Operator Unit, saya ingin memperbaiki capaian yang ditolak berdasarkan catatan reviewer. |
| US-M10 | Sebagai pengguna, saya ingin melihat histori perubahan capaian dan verifikasi per indikator. |
| US-M11 | Sebagai pengguna, saya ingin melihat perbandingan capaian vs target secara periodik. |
| US-M12 | Sebagai Admin Pusat, saya ingin melihat status kelengkapan input capaian seluruh unit. |

### Field & Metadata Utama

**Capaian Periodik:**
| Field | Tipe | Keterangan |
|-------|------|-----------|
| Indikator | FK | Relasi ke Indikator |
| Periode | Enum + Int | Jenis + Periode Ke |
| Nilai Capaian | Decimal | Nilai realisasi |
| Persentase Capaian | Decimal (computed) | (Capaian/Target)×100 atau sebaliknya untuk polaritas minimize |
| Narasi Pencapaian | Text | Penjelasan capaian |
| Kendala | Text | Hambatan yang dihadapi |
| Solusi | Text | Langkah penyelesaian kendala |
| Status | Enum | Draft/Submitted/Verified/Approved/Rejected |
| Submitted By | FK | User yang submit |
| Submitted At | Timestamp | Waktu submit |

**Evidence/Attachment:**
| Field | Tipe | Keterangan |
|-------|------|-----------|
| Capaian Periodik | FK | Relasi ke capaian |
| Nama File | String | Nama asli file |
| Tipe File | String | MIME type |
| Ukuran File | Integer | Bytes |
| Path/URL | String | Lokasi penyimpanan (object storage) |
| Deskripsi | Text (optional) | Keterangan evidence |
| Uploaded By | FK | User pengunggah |
| Uploaded At | Timestamp | Waktu unggah |

### Validasi & Aturan Bisnis
- Nilai capaian wajib berupa angka (bisa desimal).
- Evidence minimal 1 file wajib diunggah saat submit (configurable per indikator).
- Ukuran file maksimal 10 MB per file; format yang diizinkan: PDF, JPG, PNG, XLSX, DOCX.
- Capaian hanya bisa di-submit jika target periodik terkait sudah ada.
- Reject harus disertai komentar/alasan.

### Workflow Status
```
Draft → Submitted → Verified → Approved (locked)
              ↑          |           |
              └── Rejected ←── Rejected
```

### Notifikasi & Eskalasi
- Notifikasi ke verifikator saat capaian di-submit.
- Notifikasi ke operator saat verified/rejected.
- Notifikasi ke reviewer saat verified.
- Eskalasi jika SLA terlampaui.
