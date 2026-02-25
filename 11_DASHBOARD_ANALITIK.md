# K. Dashboard & Analitik (MVP)

---

## K.1 Komponen Dashboard Wajib

### K.1.1 Status Input/Verifikasi per Periode

| Aspek | Keterangan |
|-------|-----------|
| **Visualisasi** | Heatmap atau tabel berwarna |
| **Dimensi** | Baris: Unit Kerja; Kolom: Periode (TW I, II, III, IV atau Bulan 1-12) |
| **Warna** | Abu: belum diinput; Biru: draft; Kuning: submitted; Teal: verified; Hijau: approved |
| **Metrik** | Jumlah indikator per sel; persentase kelengkapan |
| **Rumus** | Kelengkapan (%) = (Jumlah Capaian berstatus ≥ Submitted / Total Indikator Aktif) × 100 |
| **Interaksi** | Klik sel → navigasi ke daftar indikator unit/periode terkait |

### K.1.2 Indikator Traffic-Light (Merah/Kuning/Hijau)

| Aspek | Keterangan |
|-------|-----------|
| **Visualisasi** | Tabel dengan badge warna + ringkasan card (total merah/kuning/hijau) |
| **Threshold (configurable)** | Hijau: Capaian ≥ 90% target; Kuning: 60% ≤ Capaian < 90%; Merah: Capaian < 60% |
| **Rumus Capaian (%)** | Polaritas Maximize: (Realisasi / Target) × 100; Polaritas Minimize: (Target / Realisasi) × 100 (cap 100%); Polaritas Stabilize: 100 - \|Realisasi - Target\| / Target × 100 (cap 0%) |
| **Interaksi** | Filter: hanya merah, hanya kuning; klik indikator → detail capaian |

### K.1.3 Capaian vs Target + Tren

| Aspek | Keterangan |
|-------|-----------|
| **Visualisasi 1** | Grafik bar horizontal: top/bottom 10 indikator berdasarkan gap (target - capaian) |
| **Visualisasi 2** | Line chart: tren capaian per triwulan (1 line per indikator yang dipilih / rata-rata) |
| **Metrik** | Nilai capaian (%), Nilai target, Gap = Target - Capaian |
| **Filter** | Indikator tertentu, unit kerja, periode range |

### K.1.4 Keterlambatan Rencana Aksi & Tindak Lanjut

| Aspek | Keterangan |
|-------|-----------|
| **Visualisasi** | Tabel daftar, diurutkan berdasarkan jumlah hari overdue (terbanyak di atas) |
| **Kolom Rencana Aksi** | Nama Kegiatan, Indikator, PIC, Target Selesai, Overdue (hari), Unit |
| **Kolom Tindak Lanjut** | Rekomendasi, PIC, Due Date, Overdue (hari), Status, Unit |
| **Metrik** | Overdue (hari) = TODAY - Target_End_Date (jika status ≠ Completed dan TODAY > Target_End_Date) |
| **Filter** | Unit kerja, rentang overdue |

### K.1.5 Top Gap (Indikator Gap Terbesar, Unit Paling Lambat)

| Aspek | Keterangan |
|-------|-----------|
| **Visualisasi 1** | Grafik bar: 10 indikator dengan gap terbesar (Target - Capaian, dalam % atau nilai absolut) |
| **Visualisasi 2** | Tabel: Unit Kerja dengan rata-rata capaian terendah / kelengkapan input terendah |
| **Metrik Gap** | Gap (%) = ((Target - Realisasi) / Target) × 100 |
| **Metrik Kelambatan Unit** | Avg Capaian Unit (%) = Rata-rata Capaian(%) seluruh indikator unit; Kelengkapan Input (%) = Indikator sudah diinput / Total indikator × 100 |
| **Interaksi** | Klik → navigasi ke detail indikator atau unit terkait |

---

## K.2 Ringkasan Metrik & Rumus

| Metrik | Rumus |
|--------|-------|
| Capaian (%) — Maximize | (Realisasi / Target) × 100 |
| Capaian (%) — Minimize | (Target / Realisasi) × 100, capped at 100% |
| Capaian (%) — Stabilize | 100 - (\|Realisasi - Target\| / Target × 100), min 0% |
| Gap (%) | ((Target - Realisasi) / Target) × 100 |
| Kelengkapan Input (%) | (Jumlah capaian ≥ Submitted / Total indikator aktif) × 100 |
| Overdue (hari) | MAX(0, TODAY - Due_Date) jika status ≠ Completed |
| Avg Capaian Unit (%) | SUM(Capaian_i%) / COUNT(Indikator) per unit |
| Traffic-Light | Hijau ≥ 90%, 60% ≤ Kuning < 90%, Merah < 60% — threshold configurable |
