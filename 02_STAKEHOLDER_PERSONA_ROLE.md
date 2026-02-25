# B. Stakeholder, Persona, dan Role

## B.1 Daftar Role

| No | Role | Deskripsi Singkat |
|----|------|-------------------|
| 1 | Admin Pusat (Biro Perencanaan) | Pengelola utama sistem, master data, konfigurasi periode, dan koordinator pelaporan tingkat kementerian |
| 2 | Operator Unit (Level I/II/III) | Pelaksana input data kinerja (sasaran, indikator, target, capaian, rencana aksi) di unit kerja masing-masing |
| 3 | Verifikator Unit | Petugas verifikasi capaian dan evidence di tingkat unit kerja sebelum diajukan ke tahap approval |
| 4 | Reviewer Biro Perencanaan | Pejabat/staf Biro Perencanaan yang melakukan reviu lintas unit, menyetujui/menolak laporan kinerja |
| 5 | Inspektorat Jenderal | Pejabat Itjen yang memantau dan mengevaluasi kinerja lintas seluruh unit; akses read lintas unit |
| 6 | Tamu/Eksternal | Pihak luar (auditor eksternal, stakeholder) dengan akses view-only terbatas |

---

## B.2 Detail Persona per Role

### B.2.1 Admin Pusat (Biro Perencanaan)

| Aspek | Keterangan |
|-------|-----------|
| **Tujuan** | Mengonfigurasi dan mengelola master data organisasi, periode kinerja, dan struktur pohon kinerja tingkat kementerian; memastikan konsistensi data lintas unit |
| **Kebutuhan Informasi** | Daftar seluruh unit kerja dan hierarkinya; status kelengkapan data per unit; rekap capaian kinerja seluruh kementerian; log perubahan kritis |
| **Kewenangan** | Mengelola master data (unit kerja, periode, pengguna, role assignment); mengonfigurasi pohon kinerja Level 0; mereviu dan menyetujui laporan kinerja kementerian; menghasilkan laporan konsolidasi; mengelola template dokumen |
| **Batas Akses Unit** | Akses lintas seluruh unit kerja (kementerian-wide) |

### B.2.2 Operator Unit (Level I/II/III)

| Aspek | Keterangan |
|-------|-----------|
| **Tujuan** | Menyusun perencanaan kinerja (sasaran, indikator, target, rencana aksi) dan menginput capaian kinerja secara periodik di unit kerja yang ditugaskan |
| **Kebutuhan Informasi** | Sasaran dan indikator yang berlaku untuk unit kerjanya; target yang harus dicapai per periode; status workflow (draft/submitted/revisi); panduan pengisian |
| **Kewenangan** | Membuat dan mengedit draft sasaran, indikator, target, rencana aksi; menginput capaian dan mengunggah evidence; mengajukan (submit) data untuk verifikasi; melihat hasil reviu/verifikasi |
| **Batas Akses Unit** | Hanya unit kerja yang ditugaskan (single unit assignment, atau multi jika ditugaskan secara eksplisit oleh Admin Pusat) |

### B.2.3 Verifikator Unit

| Aspek | Keterangan |
|-------|-----------|
| **Tujuan** | Memverifikasi kelengkapan dan kebenaran data capaian serta evidence yang diinput oleh Operator Unit sebelum diajukan ke level approval berikutnya |
| **Kebutuhan Informasi** | Daftar capaian yang menunggu verifikasi (inbox); detail indikator, target, dan capaian; evidence yang diunggah; riwayat revisi |
| **Kewenangan** | Melihat seluruh data capaian unit yang ditugaskan; memverifikasi atau menolak (reject) capaian dengan catatan; mengembalikan data ke Operator untuk perbaikan |
| **Batas Akses Unit** | Unit kerja yang ditugaskan sebagai verifikator |

### B.2.4 Reviewer Biro Perencanaan

| Aspek | Keterangan |
|-------|-----------|
| **Tujuan** | Melakukan reviu kualitas laporan kinerja dari unit-unit kerja; menyetujui atau mengembalikan laporan; menyusun laporan konsolidasi tingkat kementerian |
| **Kebutuhan Informasi** | Daftar laporan yang menunggu reviu; ringkasan capaian per unit; tren capaian; perbandingan target vs realisasi; catatan evaluasi sebelumnya |
| **Kewenangan** | Mereviu dan menyetujui/menolak laporan kinerja unit; memberikan catatan reviu; mengoordinasikan penyusunan LKjIP; menghasilkan laporan kinerja konsolidasi |
| **Batas Akses Unit** | Akses lintas seluruh unit kerja untuk keperluan reviu dan pelaporan |

### B.2.5 Inspektorat Jenderal

| Aspek | Keterangan |
|-------|-----------|
| **Tujuan** | Memantau dan mengevaluasi kinerja seluruh unit kerja; mengisi lembar kerja evaluasi; memberikan rekomendasi perbaikan; memantau tindak lanjut rekomendasi |
| **Kebutuhan Informasi** | Seluruh data kinerja lintas unit (read-only untuk perencanaan/pengukuran/pelaporan); lembar kerja evaluasi; status tindak lanjut rekomendasi; audit log |
| **Kewenangan** | Membaca seluruh data kinerja lintas unit; membuat dan mengedit lembar kerja evaluasi; membuat rekomendasi; memantau tindak lanjut; mengakses audit log |
| **Batas Akses Unit** | Akses baca lintas seluruh unit kerja (kementerian-wide); akses tulis hanya pada modul Evaluasi Kinerja |

### B.2.6 Tamu/Eksternal

| Aspek | Keterangan |
|-------|-----------|
| **Tujuan** | Melihat informasi kinerja yang telah dipublikasikan (laporan final, dashboard publik) untuk keperluan audit eksternal atau transparansi |
| **Kebutuhan Informasi** | Dashboard ringkasan capaian kinerja; laporan kinerja yang telah disetujui/final; pohon kinerja (read-only) |
| **Kewenangan** | View-only pada data yang telah dipublikasikan; tidak dapat mengedit, mengajukan, atau menyetujui data apa pun |
| **Batas Akses Unit** | Hanya data yang secara eksplisit dipublikasikan oleh Admin Pusat; tidak memiliki akses ke data draft atau proses internal |

---

## B.3 Matriks Ringkasan Role

| Aspek | Admin Pusat | Operator Unit | Verifikator | Reviewer | Itjen | Tamu |
|-------|:-----------:|:-------------:|:-----------:|:--------:|:-----:|:----:|
| Kelola master data | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Input sasaran/indikator | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Input capaian | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Verifikasi capaian | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Reviu laporan | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Evaluasi kinerja | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Akses lintas unit | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ |
| View-only | — | — | — | — | — | ✅ |
