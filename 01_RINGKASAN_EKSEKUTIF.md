# A. Ringkasan Eksekutif

## A.1 Latar Belakang

Kementerian Kelautan dan Perikanan (KKP) sebagai salah satu kementerian strategis dalam pembangunan nasional memiliki kewajiban untuk menyelenggarakan Sistem Akuntabilitas Kinerja Instansi Pemerintah (SAKIP) sesuai dengan Peraturan Presiden Nomor 29 Tahun 2014 tentang SAKIP serta Peraturan Menteri PAN-RB terkait evaluasi akuntabilitas kinerja instansi pemerintah.

Dalam pelaksanaannya, siklus SAKIP mencakup empat tahapan utama: **Perencanaan Kinerja**, **Pengukuran Kinerja**, **Pelaporan Kinerja**, dan **Evaluasi Kinerja**. Saat ini, proses pengelolaan kinerja di lingkungan KKP masih dilakukan secara semi-manual dengan menggunakan berbagai aplikasi terpisah (spreadsheet, dokumen fisik, dan sistem informasi parsial) yang tidak terintegrasi. Kondisi ini menimbulkan sejumlah kendala:

1. **Fragmentasi data** — indikator, target, dan capaian tersebar di berbagai dokumen dan format.
2. **Proses verifikasi lambat** — tidak ada workflow digital berjenjang untuk approval dan verifikasi capaian.
3. **Keterbatasan monitoring real-time** — pimpinan sulit memantau progres capaian kinerja secara berkala.
4. **Inkonsistensi cascading** — pohon kinerja (cascading) dari level kementerian hingga unit eselon III tidak terdokumentasi secara sistematis.
5. **Beban penyusunan laporan** — kompilasi Laporan Kinerja Instansi Pemerintah (LKjIP/LAKIP) memerlukan waktu lama dan rawan kesalahan.

## A.2 Tujuan

Aplikasi **KinerjaKu Next** dirancang sebagai platform digital terintegrasi untuk mendukung siklus SAKIP end-to-end di lingkungan KKP. Tujuan utama Fase 1/MVP:

1. **Mendigitalisasi** seluruh siklus pengelolaan kinerja (Perencanaan → Pengukuran → Pelaporan → Evaluasi) dalam satu platform terpadu.
2. **Menyediakan workflow berjenjang** dengan audit trail untuk setiap perubahan data kinerja.
3. **Mendukung cascading kinerja** dari level Kementerian (Level 0) hingga Unit Eselon III secara terstruktur.
4. **Mempercepat proses verifikasi dan pelaporan** melalui workflow digital dan fitur generate dokumen otomatis.
5. **Memberikan dashboard analitik** yang memungkinkan pimpinan memantau capaian kinerja secara real-time.
6. **Membangun fondasi integrasi** dengan sistem-sistem KKP lainnya (SSO, sistem perencanaan, dsb.) melalui arsitektur API-ready.

## A.3 Hasil yang Diharapkan

| No | Hasil | Indikator Keberhasilan |
|----|-------|----------------------|
| 1 | Seluruh proses SAKIP terdigitalisasi | 100% proses perencanaan, pengukuran, pelaporan, dan evaluasi berjalan dalam aplikasi |
| 2 | Peningkatan kecepatan verifikasi | Waktu verifikasi capaian berkurang minimal 50% dibandingkan proses manual |
| 3 | Pohon kinerja tercatat sistematis | Cascading dari Level 0 hingga Level III terdokumentasi dan dapat ditelusuri |
| 4 | Laporan kinerja dihasilkan otomatis | Generate LKjIP dalam format PDF/DOCX langsung dari sistem |
| 5 | Transparansi dan akuntabilitas | Audit trail lengkap untuk setiap perubahan indikator, target, dan capaian |
| 6 | Aksesibilitas informasi kinerja | Dashboard tersedia untuk setiap level unit kerja dan pimpinan |

## A.4 Benefit untuk SAKIP KKP

- **Efisiensi operasional** — Mengurangi duplikasi kerja dan mempercepat alur birokrasi pengelolaan kinerja.
- **Akurasi data** — Validasi data terotomatisasi dan evidence berbasis dokumen digital.
- **Akuntabilitas** — Setiap transaksi tercatat dengan riwayat perubahan yang tidak dapat dihapus (immutable audit log).
- **Kesiapan evaluasi** — Data terstruktur memudahkan evaluasi oleh Inspektorat Jenderal dan Kementerian PAN-RB.
- **Kepatuhan SPBE** — Arsitektur berbasis API mendukung interoperabilitas sesuai standar Sistem Pemerintahan Berbasis Elektronik.

## A.5 Scope Modul Fase 1/MVP

| No | Modul | Sub-fitur Utama |
|----|-------|-----------------|
| 1 | Dashboard | Ringkasan capaian, status verifikasi, tren, alert, filter periode & unit |
| 2 | Perencanaan Kinerja | Sasaran, Indikator Kinerja (metadata lengkap), Target Periodik, Rencana Aksi, Milestone |
| 3 | Pengukuran Kinerja | Input Capaian Periodik, Upload Evidence, Verifikasi & Approval Berjenjang |
| 4 | Pelaporan Kinerja | Penyusunan Laporan, Reviu, Generate Dokumen (PDF/DOCX), Versioning |
| 5 | Evaluasi Kinerja | Lembar Kerja Evaluasi, Skor & Catatan, Rekomendasi, Tindak Lanjut (tracking) |
| 6 | Dokumen | Dokumen Kinerja, Pohon Kinerja (navigasi hirarki), Manual Indikator |
| 7 | Informasi Lainnya | Informasi Unit Kerja, Informasi Pengguna, Panduan Aplikasi, Profil Akun |

## A.6 Batasan & Out of Scope Fase 1

| Kategori | Keterangan |
|----------|-----------|
| **Dalam Scope** | 7 modul sebagaimana tercantum di atas; workflow & audit trail; RBAC; cascading/pohon kinerja |
| **Opsional/Placeholder** | Integrasi SSO KKP, integrasi sistem perencanaan/penganggaran, integrasi sistem kepegawaian |
| **Out of Scope** | Modul penganggaran terpisah; modul kepegawaian; modul penggajian; mobile native app; integrasi penuh dengan BAPPENAS/Kementerian PAN-RB; notifikasi SMS; business intelligence advanced (OLAP/data warehouse) |

> **Catatan:** Integrasi sistem eksternal disediakan dalam bentuk endpoint API placeholder yang siap diaktivasi ketika sistem mitra tersedia, tanpa menambah modul baru.
