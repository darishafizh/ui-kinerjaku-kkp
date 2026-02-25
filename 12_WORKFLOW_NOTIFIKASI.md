# L. Workflow Status & Notifikasi

---

## L.1 State Machine Definitions

### L.1.1 Indikator / Target

```
          ┌──────────┐
          │  DRAFT   │
          └────┬─────┘
               │ submit
          ┌────▼─────┐
          │SUBMITTED │
          └────┬─────┘
               │ verify        ┌──────────┐
          ┌────▼─────┐   reject│          │
          │ VERIFIED ├─────────►  DRAFT   │
          └────┬─────┘         │(Revised) │
               │ approve       └──────────┘
          ┌────▼─────┐
          │ APPROVED │
          └────┬─────┘
               │ lock (otomatis/manual)
          ┌────▼─────┐
          │  LOCKED  │
          └──────────┘

Catatan:
- Reject di tahap Verified → kembali ke Draft (Operator revisi).
- Reject di tahap Approved → kembali ke Verified atau Draft.
- LOCKED hanya dapat di-unlock oleh Admin Pusat (dengan audit log).
```

### L.1.2 Rencana Aksi

```
          ┌──────────┐
          │  DRAFT   │
          └────┬─────┘
               │ submit
          ┌────▼──────┐
          │ SUBMITTED │
          └────┬──────┘
               │ verify
          ┌────▼──────┐     reject → DRAFT
          │ VERIFIED  ├────────────────┘
          └────┬──────┘
               │ start execution
          ┌────▼───────────┐
          │  IN PROGRESS   │
          └────┬───────┬───┘
               │       │ overdue (auto)
          ┌────▼──┐ ┌──▼──────┐
          │COMPLTD│ │ DELAYED │
          └───────┘ └─────────┘
```

### L.1.3 Capaian Periodik

```
          ┌──────────┐
          │  DRAFT   │
          └────┬─────┘
               │ submit
          ┌────▼──────┐
          │ SUBMITTED │
          └────┬──────┘
               │ verify           reject
          ┌────▼──────┐  ┌────────────────┐
          │ VERIFIED  ├──► DRAFT (Revised)│
          └────┬──────┘  └────────────────┘
               │ approve          reject
          ┌────▼──────┐  ┌────────────────┐
          │ APPROVED  ├──► VERIFIED/DRAFT │
          └───────────┘  └────────────────┘

Catatan: Approved = data ter-lock untuk periode tersebut.
```

### L.1.4 Laporan Kinerja

```
          ┌──────────┐
          │  DRAFT   │
          └────┬─────┘
               │ submit
          ┌────▼──────┐
          │ SUBMITTED │
          └────┬──────┘
               │ review starts
          ┌────▼────────────┐
          │  UNDER REVIEW   │
          └────┬────────┬───┘
               │approve │reject
          ┌────▼─────┐ ┌▼────────────────┐
          │ APPROVED │ │REJECTED→REVISED │
          └────┬─────┘ │(versi baru, v+1)│
               │       └─────────────────┘
          ┌────▼──────┐
          │ PUBLISHED │ (setelah generate dokumen)
          └───────────┘
```

### L.1.5 Evaluasi (Lembar Kerja)

```
          ┌──────────┐
          │  OPEN    │
          └────┬─────┘
               │ mulai evaluasi
          ┌────▼────────────┐
          │ IN EVALUATION   │
          └────┬────────────┘
               │ finalisasi
          ┌────▼──────┐
          │ COMPLETED │
          └───────────┘
```

### L.1.6 Tindak Lanjut

```
          ┌──────────┐
          │ PLANNED  │
          └────┬─────┘
               │ mulai eksekusi
          ┌────▼───────────┐
          │  IN PROGRESS   │
          └────┬───────┬───┘
               │       │ overdue (auto, jika > due date)
          ┌────▼──┐ ┌──▼──────┐
          │COMPLTD│ │ OVERDUE │
          └───────┘ └─────────┘
```

---

## L.2 Notifikasi

### L.2.1 Kanal Notifikasi

| Kanal | Status | Keterangan |
|-------|--------|-----------|
| **In-App** | Aktif (MVP) | Bell icon di header, daftar notifikasi, mark as read, link ke item terkait |
| **Email** | Placeholder (opsional) | Template email untuk notifikasi kritis; diaktifkan melalui konfigurasi |

### L.2.2 Daftar Event Notifikasi

| Event | Penerima | Pesan |
|-------|----------|-------|
| Capaian di-submit | Verifikator Unit | "[User] mengajukan capaian indikator [Nama] periode [X]" |
| Capaian diverifikasi | Operator Unit + Reviewer | "Capaian indikator [Nama] telah diverifikasi" |
| Capaian disetujui | Operator Unit | "Capaian indikator [Nama] telah disetujui" |
| Capaian ditolak | Operator Unit | "Capaian indikator [Nama] ditolak: [Komentar]" |
| Laporan di-submit | Reviewer Biro Perencanaan | "[Unit] mengajukan laporan kinerja periode [X]" |
| Laporan disetujui/ditolak | Operator Unit | "Laporan kinerja [Unit] periode [X]: [Status]" |
| Rekomendasi diterbitkan | Operator Unit terkait | "Rekomendasi evaluasi baru untuk unit Anda: [Uraian]" |
| Tindak lanjut mendekati due date | PIC Tindak Lanjut | "Tindak lanjut [Uraian] jatuh tempo dalam [N] hari" |
| Tindak lanjut overdue | PIC + Pimpinan Unit | "Tindak lanjut [Uraian] telah melewati batas waktu" |
| Rencana aksi terlambat | PIC + Pimpinan Unit | "Rencana aksi [Nama] telah melewati target penyelesaian" |
| SLA verifikasi terlampaui | Verifikator + Atasan | "Verifikasi [Nama] belum diselesaikan (SLA: 5 hari kerja)" |
| SLA approval terlampaui | Reviewer + Admin Pusat | "Approval [Nama] belum diselesaikan (SLA: 5 hari kerja)" |
| Periode perencanaan dibuka | Seluruh Operator | "Periode perencanaan [Tahun] telah dibuka. Silakan mulai menyusun sasaran & indikator." |
| Deadline input capaian | Operator Unit | "Batas waktu input capaian periode [X]: [Tanggal]" |

### L.2.3 Eskalasi

| Kondisi | Aksi Eskalasi |
|---------|--------------|
| SLA verifikasi terlampaui (>5 hari kerja) | Notifikasi ke pimpinan unit verifikator |
| SLA approval terlampaui (>5 hari kerja) | Notifikasi ke Admin Pusat |
| Tindak lanjut overdue >7 hari | Notifikasi ke pimpinan Eselon I unit terkait |
| Input capaian terlambat >10 hari | Notifikasi ke pimpinan unit + dashboard alert |
