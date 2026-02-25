# C. Proses Bisnis (As-Is vs To-Be)

## C.1 Proses 1: Penyusunan Sasaran & Indikator Kinerja (Perencanaan)

### As-Is (Kondisi Saat Ini)
- Sasaran dan indikator disusun dalam dokumen Word/Excel oleh masing-masing unit kerja.
- Koordinasi melalui email dan rapat fisik dengan Biro Perencanaan.
- Cascading/pohon kinerja digambar manual dalam PowerPoint.
- Tidak ada validasi otomatis terhadap kelengkapan metadata indikator.
- Riwayat perubahan tidak terdokumentasi secara sistematis.

### To-Be (Kondisi dengan KinerjaKu Next)
- Seluruh penyusunan dilakukan dalam aplikasi dengan form terstruktur dan validasi otomatis.
- Pohon kinerja dikelola secara digital dengan relasi cascading otomatis.
- Workflow berjenjang (Draft → Submit → Verified → Approved → Locked) dengan audit trail.

### Detail Proses To-Be

| Komponen | Keterangan |
|----------|-----------|
| **Aktor** | Operator Unit (penyusun), Verifikator Unit, Reviewer Biro Perencanaan, Admin Pusat |
| **Trigger** | Pembukaan periode perencanaan kinerja oleh Admin Pusat |
| **Input** | Renstra/Renja, IKU level atas (dari pohon kinerja), kebijakan periode berjalan |
| **Langkah** | 1. Admin Pusat membuka periode perencanaan dan mengonfigurasi pohon kinerja Level 0. 2. Operator Unit menyusun sasaran dan indikator (mengisi metadata: definisi, formula, satuan, polaritas, baseline, sumber data). 3. Operator Unit menentukan target periodik (bulanan/triwulanan/semesteran/tahunan). 4. Operator Unit memetakan cascading ke indikator level atas. 5. Operator Unit mengajukan (submit) draft. 6. Verifikator Unit memeriksa kelengkapan dan konsistensi → Verified atau Reject (dengan catatan). 7. Reviewer Biro Perencanaan mereviu kualitas dan kesesuaian → Approved atau Reject. 8. Setelah Approved, data ter-lock untuk periode tersebut. |
| **Output** | Dokumen perencanaan kinerja digital (sasaran & indikator ter-approve), pohon kinerja terupdate |
| **Status Workflow** | Draft → Submitted → Verified → Approved → Locked |
| **SLA** | Penyusunan: 14 hari kerja; Verifikasi: 5 hari kerja; Approval: 5 hari kerja |
| **Risiko** | Keterlambatan input oleh unit → Mitigasi: notifikasi otomatis dan eskalasi ke atasan. Inkonsistensi cascading → Mitigasi: validasi relasi cascading saat submit. |

---

## C.2 Proses 2: Penyusunan Rencana Aksi (PIC, Timeline, Milestone)

### As-Is
- Rencana aksi disusun dalam format tabel Excel tanpa standar baku.
- PIC dicatat secara informal; tidak ada tracking milestone.
- Monitoring progres dilakukan secara manual melalui rapat koordinasi.

### To-Be
- Form rencana aksi terstruktur terkait dengan indikator kinerja.
- Milestone, PIC, dan timeline tercatat; progres dapat diupdate secara berkala.
- Dashboard memantau keterlambatan secara otomatis.

### Detail Proses To-Be

| Komponen | Keterangan |
|----------|-----------|
| **Aktor** | Operator Unit (penyusun), Verifikator Unit |
| **Trigger** | Indikator kinerja telah disetujui (status Approved) |
| **Input** | Indikator yang telah ter-approve, informasi PIC, jadwal kegiatan |
| **Langkah** | 1. Operator Unit membuat rencana aksi terkait indikator. 2. Mengisi detail: nama kegiatan, PIC, tanggal mulai, tanggal target selesai, milestone. 3. Menyimpan sebagai draft atau langsung submit. 4. Verifikator Unit memeriksa kesesuaian rencana aksi dengan target → Verified atau Reject. 5. Operator memperbarui progres milestone secara periodik. |
| **Output** | Daftar rencana aksi terstruktur per indikator dengan status milestone |
| **Status Workflow** | Draft → Submitted → Verified → In Progress → Completed / Delayed |
| **SLA** | Penyusunan rencana aksi: 7 hari kerja setelah indikator approved |
| **Risiko** | PIC tidak update progres → Mitigasi: notifikasi pengingat otomatis. Milestone tidak realistis → Mitigasi: review oleh verifikator. |

---

## C.3 Proses 3: Input Capaian Periodik + Evidence (Pengukuran)

### As-Is
- Capaian diinput ke dalam spreadsheet terpisah per unit.
- Evidence (dokumen pendukung) dikirim melalui email atau dikumpulkan fisik.
- Tidak ada validasi range nilai capaian.

### To-Be
- Input capaian langsung di aplikasi dengan form terstruktur.
- Evidence diunggah sebagai attachment (file/link).
- Validasi otomatis terhadap range nilai dan kelengkapan evidence wajib.

### Detail Proses To-Be

| Komponen | Keterangan |
|----------|-----------|
| **Aktor** | Operator Unit |
| **Trigger** | Periode pengukuran tiba (bulanan/triwulanan sesuai konfigurasi) |
| **Input** | Indikator & target periodik yang berlaku, data capaian, dokumen/evidence pendukung |
| **Langkah** | 1. Operator Unit memilih periode dan indikator yang akan diinput. 2. Mengisi nilai capaian, narasi penjelasan, kendala, dan solusi. 3. Mengunggah evidence/attachment (file PDF/gambar/link). 4. Sistem memvalidasi: nilai dalam range logis, evidence wajib terlampir. 5. Operator menyimpan sebagai draft atau submit untuk verifikasi. |
| **Output** | Data capaian periodik tersimpan dengan evidence; status "Submitted" siap diverifikasi |
| **Status Workflow** | Draft → Submitted |
| **SLA** | Input capaian: maksimal 10 hari kerja setelah akhir periode |
| **Risiko** | Keterlambatan input → Mitigasi: notifikasi deadline dan eskalasi. Data tidak akurat → Mitigasi: evidence wajib, validasi range. |

---

## C.4 Proses 4: Verifikasi & Approval Berjenjang (Pengukuran)

### As-Is
- Verifikasi dilakukan secara manual melalui tanda tangan fisik dan rapat.
- Catatan revisi melalui email yang sulit dilacak.
- Tidak ada mekanisme formal reject/revise yang terdokumentasi.

### To-Be
- Workflow verifikasi dan approval digital berjenjang.
- Setiap aksi (verify, reject, approve) tercatat dengan timestamp, aktor, dan komentar.
- Notifikasi otomatis ke pihak terkait.

### Detail Proses To-Be

| Komponen | Keterangan |
|----------|-----------|
| **Aktor** | Verifikator Unit, Reviewer Biro Perencanaan |
| **Trigger** | Capaian di-submit oleh Operator Unit |
| **Input** | Data capaian yang telah di-submit, evidence |
| **Langkah** | 1. Verifikator Unit menerima notifikasi (inbox verifikasi). 2. Memeriksa kelengkapan data, kesesuaian nilai dengan evidence, narasi. 3. Memberikan keputusan: Verified (lanjut ke Reviewer) / Reject (kembali ke Operator dengan catatan). 4. Reviewer Biro Perencanaan menerima data yang telah terverifikasi. 5. Reviewer melakukan reviu: Approved (data ter-lock) / Reject (kembali ke tahap sebelumnya). 6. Setiap aksi tercatat dalam audit log. |
| **Output** | Capaian dengan status Verified/Approved/Rejected; catatan reviu |
| **Status Workflow** | Submitted → Verified → Approved (locked) / Rejected → Revised → re-Submit |
| **SLA** | Verifikasi: 5 hari kerja; Approval: 5 hari kerja |
| **Risiko** | Bottleneck di verifikator → Mitigasi: eskalasi otomatis jika SLA terlampaui. Reject berulang → Mitigasi: catatan jelas wajib saat reject. |

---

## C.5 Proses 5: Penyusunan & Reviu Laporan Kinerja (Pelaporan)

### As-Is
- Laporan disusun manual dalam format Word, disatukan dari data di berbagai spreadsheet.
- Proses bolak-balik revisi memakan waktu berminggu-minggu.
- Versioning tidak terkelola.

### To-Be
- Laporan disusun otomatis dari data capaian yang telah ter-approve dalam sistem.
- Workflow reviu digital dengan versioning.
- Generate dokumen (PDF/DOCX) langsung dari sistem.

### Detail Proses To-Be

| Komponen | Keterangan |
|----------|-----------|
| **Aktor** | Operator Unit (penyusun draft), Reviewer Biro Perencanaan (reviu & approve), Admin Pusat (konsolidasi) |
| **Trigger** | Seluruh capaian periodik telah ter-approve atau periode pelaporan tiba |
| **Input** | Data capaian ter-approve, narasi, analisis, tren |
| **Langkah** | 1. Sistem meng-compile data capaian yang telah approve menjadi draft laporan. 2. Operator Unit melengkapi narasi analisis, kendala umum, dan rencana perbaikan. 3. Operator Unit submit draft laporan. 4. Reviewer Biro Perencanaan mereviu: Approve / Reject (dengan catatan). 5. Jika reject, Operator merevisi dan re-submit (versi baru). 6. Setelah approved, Admin Pusat dapat meng-generate dokumen final (PDF/DOCX). 7. Dokumen final tersimpan dengan versioning. |
| **Output** | Laporan kinerja final (PDF/DOCX) dengan versioning; histori reviu |
| **Status Workflow** | Draft → Submitted → Under Review → Approved → Published / Rejected → Revised |
| **SLA** | Penyusunan draft: 10 hari kerja; Reviu: 7 hari kerja |
| **Risiko** | Data capaian belum lengkap saat periode pelaporan → Mitigasi: alert otomatis data belum complete. Revisi berulang → Mitigasi: panduan penyusunan laporan yang jelas. |

---

## C.6 Proses 6: Evaluasi Kinerja → Rekomendasi → Tindak Lanjut (Evaluasi)

### As-Is
- Evaluasi dilakukan oleh Itjen menggunakan lembar kerja fisik/Excel.
- Rekomendasi dicatat dalam laporan teks; tindak lanjut dimonitor secara manual.
- Sulit melacak status tindak lanjut rekomendasi tahun-tahun sebelumnya.

### To-Be
- Lembar kerja evaluasi digital dalam aplikasi.
- Rekomendasi terdokumentasi dan terkait langsung dengan tindak lanjut.
- Tracking tindak lanjut hingga selesai (PIC, due date, status).

### Detail Proses To-Be

| Komponen | Keterangan |
|----------|-----------|
| **Aktor** | Inspektorat Jenderal (evaluator), Operator Unit (pelaksana tindak lanjut), Admin Pusat (monitoring) |
| **Trigger** | Periode evaluasi (biasanya setelah laporan kinerja final tersedia) |
| **Input** | Laporan kinerja yang telah disetujui, data capaian, pohon kinerja |
| **Langkah** | 1. Itjen membuat lembar kerja evaluasi untuk unit yang dievaluasi. 2. Mengisi skor dan catatan per komponen evaluasi. 3. Itjen menyusun rekomendasi berdasarkan hasil evaluasi. 4. Rekomendasi disampaikan ke unit terkait (notifikasi otomatis). 5. Operator Unit/pejabat unit menentukan rencana tindak lanjut dengan PIC dan due date. 6. Tindak lanjut diupdate progresnya secara periodik oleh Operator Unit. 7. Itjen memantau status tindak lanjut; eskalasi jika overdue. |
| **Output** | Lembar kerja evaluasi terisi, rekomendasi terdokumentasi, tracking tindak lanjut aktif |
| **Status Workflow** | Open → In Evaluation → Recommendations Issued → Follow-up In Progress → Completed / Overdue |
| **SLA** | Evaluasi: 15 hari kerja; Rencana tindak lanjut: 10 hari kerja; Pelaksanaan sesuai due date |
| **Risiko** | Tindak lanjut tidak dikerjakan → Mitigasi: eskalasi otomatis dan dashboard overdue. Skor evaluasi subjektif → Mitigasi: rubrik/panduan evaluasi terstandar. |
