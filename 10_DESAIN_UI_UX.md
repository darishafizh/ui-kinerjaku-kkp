# J. Desain UI/UX – Tema KKP (Detail)

---

## J.1 Identitas Visual & Branding KKP

### Tema Maritim
- **Nuansa utama:** Elemen gelombang halus (*subtle wave patterns*) pada header/footer sebagai aksen dekoratif, bukan dominan.
- **Garis kontur laut:** Pola topografi laut tipis sebagai background accent pada panel kosong dan login page.
- **Ikon perikanan:** Digunakan secukupnya pada logo area, empty-state, dan elemen dekoratif — tidak berlebihan agar tampilan tetap profesional dan bersih.

### Warna
- **Warna utama:** Biru laut dan turunannya (biru tua untuk header/sidebar, biru sedang untuk tombol utama, biru muda untuk hover/selected state).
- **Warna aksen:** Hijau/teal sebagai aksen sekunder (digunakan pada badge status positif, success indicator, tombol sekunder).
- **Warna netral:** Abu-abu terang untuk background, putih untuk card/panel konten, abu-abu gelap untuk teks.
- **Warna status:** Merah untuk alert/rejected/overdue, kuning/amber untuk warning/in-progress, hijau untuk success/approved/completed.

### Tipografi
- **Font:** Modern, sans-serif, bersih, dan mudah dibaca (contoh: Inter, Roboto, atau Outfit).
- **Hierarki:**
  - H1: 24-28px, bold → Judul halaman
  - H2: 18-22px, semibold → Sub-judul/section
  - H3: 16px, medium → Label card
  - Body: 14-15px, regular → Teks utama
  - Caption: 12-13px → Helper text, metadata
- **Kontras:** Teks gelap di atas background terang; rasio kontras ≥ 4.5:1.

### Komponen Wajib Global
1. **Header Global** — Logo KKP (placeholder), nama aplikasi "KinerjaKu Next", nama pengguna + role, notifikasi bell icon, profil dropdown.
2. **Sidebar Navigasi** — 7 modul utama dengan ikon, collapsible, active state highlight biru.
3. **Breadcrumb** — Di setiap halaman, menunjukkan hierarki navigasi.
4. **Topbar Filter** — Filter periode (tahun, triwulan/bulan) dan unit kerja; sticky di bawah header.
5. **Tombol Aksi** — Primary (biru), Secondary (teal/outline), Danger (merah); ukuran konsisten; label jelas.
6. **Status Badge** — Chip/badge berwarna sesuai status (Draft: abu, Submitted: biru, Verified: teal, Approved: hijau, Rejected: merah, Locked: abu gelap).

### Aksesibilitas
- Kontras warna minimal WCAG AA.
- Font minimal 14px untuk body.
- Navigasi keyboard (tab order logis, focus ring visible).
- Label form yang jelas; aria-label pada ikon tanpa teks.

---

## J.2 Wireframe Deskriptif — Screen-by-Screen

### Screen 1: Login (SSO/Fallback) + Pilih Unit/Peran

**Layout:**
- Background: pola kontur laut halus, gradien biru tua ke biru sedang.
- Panel login di tengah (card putih, shadow):
  - Logo KKP (placeholder) + judul "KinerjaKu Next".
  - **Opsi 1:** Tombol "Login dengan SSO KKP" (primary, biru).
  - **Separator:** "atau login manual".
  - **Opsi 2:** Form username + password + tombol "Masuk".
  - Link "Lupa Password?" di bawah tombol.
- **Setelah autentikasi berhasil (jika user memiliki >1 role/unit):**
  - Dialog/overlay: "Pilih Unit Kerja & Peran".
  - Dropdown unit kerja (search-enabled).
  - Dropdown role (jika user memiliki >1 role).
  - Tombol "Lanjutkan".
- **Empty-state:** Pesan error jika login gagal ("Username atau password salah").

---

### Screen 2: Dashboard (Berbeda per Role)

**Layout:**
- **Header:** Logo KKP, "KinerjaKu Next", unit kerja aktif, nama user, bell notif, profil dropdown.
- **Sidebar kiri:** 7 modul (Dashboard aktif/highlighted), collapsible.
- **Topbar filter:** Dropdown periode (Tahun: 2026, Triwulan: TW I/II/III/IV), Dropdown unit kerja (untuk Admin/Reviewer/Itjen).
- **Konten utama (grid/card layout):**

  **Baris 1 (Summary Cards):**
  - Card 1: "Total Indikator" — angka besar + ikon.
  - Card 2: "Capaian Rata-rata" — persentase + progress ring.
  - Card 3: "Indikator On Track (Hijau)" — angka + badge hijau.
  - Card 4: "Indikator Kritis (Merah)" — angka + badge merah.

  **Baris 2:**
  - **Grafik bar horizontal:** "Capaian vs Target per Indikator" (top 10 / bottom 10, selectable).
  - **Heatmap/tabel:** "Status Input per Unit per Periode" (warna: belum input, draft, submitted, approved).

  **Baris 3:**
  - **Line chart:** "Tren Capaian per Triwulan" (line per indikator/kelompok).
  - **Daftar tabel:** "Rencana Aksi Terlambat" — kolom: nama kegiatan, PIC, due date, overdue days, unit.

  **Baris 4:**
  - **Daftar tabel:** "Tindak Lanjut Overdue" — kolom: rekomendasi, PIC, due date, status.
  - **Grafik donut:** "Komposisi Status Capaian" (Draft/Submitted/Verified/Approved).

- **Role-specific:**
  - *Admin Pusat/Reviewer:* Melihat semua unit, card tambahan "Unit Paling Lambat Input".
  - *Operator Unit:* Hanya data unit sendiri.
  - *Itjen:* Card tambahan "Status Evaluasi" dan "Tindak Lanjut Overdue".
  - *Tamu:* Dashboard ringkas, hanya data published.

- **Empty-state:** "Belum ada data capaian untuk periode ini. Silakan input capaian di modul Pengukuran."

---

### Screen 3: Perencanaan — Daftar Sasaran & Indikator + Form Indikator

**Layout:**
- **Breadcrumb:** Dashboard > Perencanaan Kinerja > Sasaran & Indikator.
- **Topbar filter:** Tahun, Unit Kerja.
- **Konten:**
  - **Tabel utama: Daftar Sasaran**
    - Kolom: Kode Sasaran, Nama Sasaran, Level, Jumlah Indikator, Status, Aksi.
    - Tombol "＋ Tambah Sasaran" (primary) di atas tabel.
    - Filter/search bar di atas tabel.
    - Status badge per baris.
    - Klik baris → expand accordion → Daftar Indikator di bawahnya.

  - **Sub-tabel: Daftar Indikator (per Sasaran)**
    - Kolom: Kode, Nama Indikator, Satuan, Polaritas, Target Tahunan, Status, Aksi (Edit/Lihat/Hapus).
    - Tombol "＋ Tambah Indikator" per sasaran.

  - **Form Indikator (modal/slide-over panel):**
    - Field: Nama Indikator (text), Definisi Operasional (textarea), Formula/Cara Perhitungan (textarea), Satuan (select/text), Polaritas (radio: Maximize/Minimize/Stabilize), Baseline (number), Sumber Data (text), Cascading Parent (searchable dropdown — opsional).
    - Section: **Target Periodik** — tabel inline dengan kolom: Jenis Periode, Periode Ke, Nilai Target. Tombol "+ Tambah Target."
    - Tombol: "Simpan Draft", "Submit untuk Verifikasi" (primary), "Batal".
    - Validasi real-time: field wajib ditandai merah jika kosong saat submit.

- **Empty-state tabel:** "Belum ada sasaran untuk periode ini. Klik '＋ Tambah Sasaran' untuk memulai."

---

### Screen 4: Perencanaan — Rencana Aksi

**Layout:**
- **Breadcrumb:** Dashboard > Perencanaan Kinerja > Rencana Aksi.
- **Topbar filter:** Tahun, Unit Kerja, Indikator (dropdown).
- **Konten:**
  - **Tabel: Daftar Rencana Aksi**
    - Kolom: Nama Kegiatan, Indikator Terkait, PIC, Mulai, Target Selesai, Progres (%), Status, Aksi.
    - Tombol "＋ Tambah Rencana Aksi" (primary).
    - Filter: indikator, status, PIC.
    - Progress bar mini per baris.
    - Status badge: Draft (abu), In Progress (kuning), Completed (hijau), Delayed (merah).

  - **Detail Rencana Aksi (expand/modal):**
    - Info kegiatan + PIC + timeline.
    - **Sub-tabel: Milestone**
      - Kolom: Nama Milestone, Target Date, Actual Date, Status (checkbox completed), Notes.
      - Tombol "+ Milestone."

  - **Form Rencana Aksi (modal):**
    - Field: Indikator (select), Nama Kegiatan (text), PIC (searchable user select), Tanggal Mulai (datepicker), Tanggal Target Selesai (datepicker).
    - Tombol: "Simpan", "Submit", "Batal".

- **Empty-state:** "Belum ada rencana aksi. Pastikan indikator sudah disetujui, lalu klik '＋ Tambah Rencana Aksi'."

---

### Screen 5: Pengukuran — Input Capaian + Upload Evidence

**Layout:**
- **Breadcrumb:** Dashboard > Pengukuran Kinerja > Input Capaian.
- **Topbar filter:** Tahun, Periode (TW I/II/III/IV atau Bulan), Unit Kerja.
- **Konten:**
  - **Tabel: Daftar Indikator — Status Capaian Periode Ini**
    - Kolom: Kode Indikator, Nama, Target Periode, Capaian, %, Status, Aksi (Input/Edit).
    - Warna baris: hijau jika approved, kuning jika draft/submitted, merah jika belum diinput.
    - Tombol "Input Capaian" per baris.

  - **Form Input Capaian (halaman detail/slide-over):**
    - Header: Nama Indikator, Target Periode, Formula.
    - Field: Nilai Capaian (number input), Narasi Pencapaian (textarea), Kendala (textarea), Solusi (textarea).
    - Section: **Upload Evidence**
      - Dropzone/file picker (drag & drop support).
      - Daftar file terunggah (nama, ukuran, aksi: hapus/preview).
      - Info: "Format: PDF, JPG, PNG, XLSX, DOCX. Maks: 10 MB."
    - Tombol: "Simpan Draft", "Submit untuk Verifikasi" (primary), "Batal".
    - Validasi: evidence wajib sebelum submit (jika dikonfigurasi); nilai capaian wajib.

- **Empty-state:** "Belum ada data capaian untuk periode ini. Silakan klik 'Input Capaian' pada indikator yang tersedia."

---

### Screen 6: Pengukuran — Inbox Verifikasi/Approval

**Layout:**
- **Breadcrumb:** Dashboard > Pengukuran Kinerja > Verifikasi Capaian.
- **Topbar filter:** Tahun, Periode, Unit Kerja (untuk Reviewer lintas unit).
- **Konten:**
  - **Tab:** "Menunggu Verifikasi" | "Menunggu Approval" | "Riwayat".
  - **Tabel inbox:**
    - Kolom: Indikator, Unit, Periode, Capaian, Evidence (jumlah file), Diajukan Oleh, Tanggal Submit, Aksi.
    - Badge jumlah pending di tab.

  - **Detail Review (halaman detail/slide-over):**
    - Info indikator: metadata, target, formula.
    - Data capaian: nilai, narasi, kendala, solusi.
    - Daftar evidence: preview/download per file.
    - Riwayat verifikasi: timeline (siapa, kapan, aksi, komentar).
    - **Area aksi:**
      - Textarea "Komentar/Catatan" (wajib jika reject).
      - Tombol: "Verifikasi ✓" (hijau), "Tolak ✗" (merah), "Kembali".

- **Empty-state:** "Tidak ada capaian yang menunggu verifikasi saat ini."

---

### Screen 7: Pelaporan — Draft → Reviu → Generate + Versioning

**Layout:**
- **Breadcrumb:** Dashboard > Pelaporan Kinerja.
- **Topbar filter:** Tahun, Jenis Laporan (TW/Semester/Tahunan), Unit Kerja.
- **Konten:**
  - **Tabel: Daftar Laporan Kinerja**
    - Kolom: Unit, Periode, Versi, Status, Terakhir Diupdate, Aksi (Edit/Reviu/Generate/Download).
    - Status badge: Draft, Submitted, Under Review, Approved, Published, Rejected.

  - **Detail/Edit Laporan (halaman penuh):**
    - Section atas: metadata laporan (unit, periode, versi, status).
    - Section konten: rich-text editor untuk narasi analisis, kendala, rencana perbaikan.
    - Section data: tabel ringkasan capaian yang di-autofill dari data approved.
    - Sidebar kanan: histori versi (v1, v2, v3...) — klik untuk lihat versi lama.
    - Tombol: "Simpan Draft", "Submit untuk Reviu" (primary).

  - **Reviu Laporan (untuk Reviewer):**
    - Tampilan laporan read-only.
    - Panel komentar per section.
    - Tombol: "Setujui ✓", "Tolak ✗" (dengan wajib komentar), "Kembali".

  - **Generate & Download:**
    - Tombol "Generate PDF" / "Generate DOCX" (untuk Admin Pusat/Reviewer setelah approved).
    - Loading indicator saat generate.
    - Link download setelah generate berhasil.

- **Empty-state:** "Belum ada laporan untuk periode ini. Pastikan seluruh capaian telah disetujui."

---

### Screen 8: Evaluasi — Lembar Kerja → Skor → Rekomendasi → Tindak Lanjut

**Layout:**
- **Breadcrumb:** Dashboard > Evaluasi Kinerja.
- **Tab:** "Lembar Kerja Evaluasi" | "Rekomendasi" | "Tindak Lanjut".

  **Tab 1: Lembar Kerja Evaluasi**
  - Tabel: Unit, Periode, Komponen, Skor, Evaluator, Status, Aksi.
  - Tombol "＋ Buat Evaluasi Baru" (khusus Itjen).
  - Form evaluasi: pilih unit, periode, lalu tabel komponen evaluasi (tiap baris: komponen, skor input, catatan textarea).
  - Tombol: "Simpan", "Finalisasi".

  **Tab 2: Rekomendasi**
  - Tabel: ID, Unit, Uraian Rekomendasi, Prioritas (badge), Due Date, Status, Aksi.
  - Tombol "＋ Tambah Rekomendasi" (khusus Itjen).
  - Form: textarea rekomendasi, select prioritas, datepicker due date.

  **Tab 3: Tindak Lanjut**
  - Tabel: Rekomendasi, Unit, Rencana Tindak Lanjut, PIC, Due Date, Status, Progres, Aksi.
  - Status badge: Planned (abu), In Progress (kuning), Completed (hijau), Overdue (merah).
  - Tombol "Update Progres" per baris (untuk Operator Unit).
  - Form update: textarea progres, upload evidence opsional, update status.
  - Filter: status, unit, overdue only.

- **Empty-state per tab:** Pesan informatif sesuai konteks.

---

### Screen 9: Dokumen — Pohon Kinerja + Manual Indikator + Dokumen Kinerja

**Layout:**
- **Breadcrumb:** Dashboard > Dokumen.
- **Tab:** "Pohon Kinerja" | "Manual Indikator" | "Dokumen Kinerja".

  **Tab 1: Pohon Kinerja**
  - Tampilan tree/hirarki interaktif:
    - Level 0 (Kementerian) → Level I (Eselon I) → Level II → Level III.
    - Setiap node: nama sasaran/indikator, badge status, expand/collapse.
    - Klik node → slide-over detail indikator (metadata, target, capaian).
  - Filter: tahun, level, unit kerja.
  - Tombol: "Expand All", "Collapse All".

  **Tab 2: Manual Indikator**
  - Tabel: Judul Manual, Indikator Terkait, Versi, Terakhir Diupdate, Aksi (Lihat/Download).
  - Detail: tampilan konten manual (rich-text, read-only untuk non-admin).
  - Tombol "＋ Upload Manual Baru" (Admin Pusat).

  **Tab 3: Dokumen Kinerja**
  - Tabel: Judul, Jenis (PK/IKU/Renstra/LAKIP), Unit, Tahun, Versi, Status, Aksi (Lihat/Download).
  - Filter: jenis dokumen, tahun, unit.
  - Preview dokumen (embedded PDF viewer).
  - Tombol "＋ Upload Dokumen" (Admin Pusat).
  - Versioning: klik versi → daftar versi lama → download versi tertentu.

- **Empty-state:** "Belum ada dokumen untuk periode ini."

---

### Screen 10: Informasi Lainnya — Unit Kerja, Pengguna, Panduan, Profil

**Layout:**
- **Breadcrumb:** Dashboard > Informasi Lainnya.
- **Tab:** "Unit Kerja" | "Pengguna" | "Panduan" | "Profil Akun".

  **Tab 1: Unit Kerja**
  - Tabel: Kode, Nama Unit, Level, Pimpinan, Status, Aksi (Edit/Nonaktifkan).
  - Tampilan tree hierarki (alternatif).
  - Tombol "＋ Tambah Unit" (Admin Pusat).

  **Tab 2: Pengguna**
  - Tabel: NIP, Nama, Username, Email, Unit, Role, Status, Aksi (Edit/Nonaktifkan).
  - Tombol "＋ Tambah Pengguna", "Import dari CSV" (Admin Pusat).
  - Filter: unit, role, status.

  **Tab 3: Panduan**
  - Daftar artikel panduan (card layout).
  - Search bar.
  - Klik → halaman panduan detail (rich-text + screenshot/gambar).
  - FAQ section (accordion).

  **Tab 4: Profil Akun**
  - Card profil: nama, NIP, email, unit, role (read-only).
  - Form edit: email, nomor telepon.
  - Tombol "Ubah Password" → dialog: password lama, password baru, konfirmasi.

- **Empty-state per tab:** Pesan informatif.
