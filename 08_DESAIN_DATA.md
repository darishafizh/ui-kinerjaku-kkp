# H. Desain Data (Data Model)

---

## H.1 Entitas & Relasi

### Diagram Relasi (ER - Teks)

```
OrganizationUnit (hirarki L0-L3)
  ├── 1:N → User (via UserUnitMapping)
  ├── 1:N → Sasaran
  └── 1:N → LaporanKinerja

User
  ├── N:M → Role (via UserRole)
  ├── N:M → OrganizationUnit (via UserUnitMapping)
  └── 1:N → AuditLog

Role
  └── N:M → Permission (via RolePermission)

Sasaran
  ├── self-ref → Parent Sasaran (cascading)
  ├── 1:N → Indikator
  └── FK → OrganizationUnit, Periode

Indikator
  ├── self-ref → CascadingParent (link ke indikator level atas)
  ├── 1:N → TargetPeriodik
  ├── 1:N → RencanaAksi
  ├── 1:N → CapaianPeriodik
  └── FK → Sasaran

TargetPeriodik
  └── FK → Indikator

RencanaAksi
  ├── 1:N → Milestone
  └── FK → Indikator, PIC (User)

CapaianPeriodik
  ├── 1:N → Evidence/Attachment
  ├── 1:N → VerifikasiCapaian/ApprovalRecord
  └── FK → Indikator

LaporanKinerja
  ├── 1:N → output files (generated PDF/DOCX)
  └── FK → OrganizationUnit, Periode

EvaluationWorksheet
  ├── 1:N → Rekomendasi
  └── FK → OrganizationUnit, Evaluator (User)

Rekomendasi
  ├── 1:N → TindakLanjut
  └── FK → EvaluationWorksheet

TindakLanjut
  └── FK → Rekomendasi, PIC (User)

DokumenKinerja (versioning)
ManualIndikator (versioning)
AuditLog (immutable)
```

---

## H.2 Definisi Entitas

### OrganizationUnit

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | Primary key |
| code | VARCHAR(20) | Kode unit kerja |
| name | VARCHAR(255) | Nama unit kerja |
| level | ENUM | Level_0 (Kementerian), Level_I (Eselon I), Level_II (Eselon II), Level_III (Eselon III) |
| parent_id | UUID (FK, nullable) | Self-referencing FK untuk hierarki |
| head_name | VARCHAR(255) | Nama pimpinan unit |
| is_active | BOOLEAN | Status aktif/nonaktif |
| created_at | TIMESTAMP | Waktu pembuatan |
| updated_at | TIMESTAMP | Waktu update terakhir |

### User

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | Primary key |
| username | VARCHAR(100) | Unique |
| email | VARCHAR(255) | Email resmi |
| full_name | VARCHAR(255) | Nama lengkap |
| nip | VARCHAR(20) | NIP (untuk PNS) |
| password_hash | VARCHAR(255) | Bcrypt/Argon2 hash |
| sso_id | VARCHAR(255, nullable) | ID SSO [PLACEHOLDER] |
| is_active | BOOLEAN | Status aktif |
| last_login | TIMESTAMP | Login terakhir |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### Role & Permission

**Role:**
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| name | VARCHAR(50) | admin_pusat, operator_unit, verifikator, reviewer, itjen, tamu |
| description | TEXT | Deskripsi role |

**Permission:**
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| module | VARCHAR(50) | Nama modul |
| action | VARCHAR(50) | create, read, update, delete, submit, verify, approve, export, manage |
| scope | ENUM | own_unit, all_units, published_only |

**UserRole:** user_id (FK), role_id (FK)
**RolePermission:** role_id (FK), permission_id (FK)
**UserUnitMapping:** user_id (FK), unit_id (FK), is_primary (BOOLEAN)

### Sasaran

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| code | VARCHAR(30) | Auto-generated |
| name | TEXT | Uraian sasaran |
| unit_id | UUID (FK) | Unit kerja pemilik |
| period_year | INTEGER | Tahun anggaran |
| level | ENUM | kementerian, eselon_i, eselon_ii, eselon_iii |
| parent_id | UUID (FK, nullable) | Cascading ke sasaran level atas |
| status | ENUM | draft, submitted, verified, approved, locked |
| created_by | UUID (FK) | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### Indikator

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| code | VARCHAR(30) | Auto-generated |
| name | TEXT | Nama indikator |
| definition | TEXT | Definisi operasional |
| formula | TEXT | Rumus/cara perhitungan |
| unit_measure | VARCHAR(50) | Satuan (%, unit, Rp, dll.) |
| polarity | ENUM | maximize, minimize, stabilize |
| baseline | DECIMAL(15,4) | Nilai baseline |
| data_source | TEXT | Sumber data capaian |
| sasaran_id | UUID (FK) | Relasi ke Sasaran |
| cascading_parent_id | UUID (FK, nullable) | Link ke indikator level atas |
| status | ENUM | draft, submitted, verified, approved, locked |
| created_by | UUID (FK) | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### TargetPeriodik

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| indikator_id | UUID (FK) | |
| period_type | ENUM | monthly, quarterly, semesterly, yearly |
| period_number | INTEGER | 1-12 / 1-4 / 1-2 / 1 |
| target_value | DECIMAL(15,4) | Nilai target |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### RencanaAksi & Milestone

**RencanaAksi:**
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| indikator_id | UUID (FK) | |
| activity_name | TEXT | Nama kegiatan |
| pic_user_id | UUID (FK) | Penanggung jawab |
| start_date | DATE | Tanggal mulai |
| target_end_date | DATE | Target selesai |
| actual_end_date | DATE (nullable) | Aktual selesai |
| status | ENUM | draft, submitted, verified, in_progress, completed, delayed |
| progress_pct | DECIMAL(5,2) | Persentase progres |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

**Milestone:**
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| rencana_aksi_id | UUID (FK) | |
| name | VARCHAR(255) | Nama milestone |
| target_date | DATE | |
| actual_date | DATE (nullable) | |
| is_completed | BOOLEAN | |
| notes | TEXT | |

### CapaianPeriodik

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| indikator_id | UUID (FK) | |
| period_type | ENUM | |
| period_number | INTEGER | |
| achievement_value | DECIMAL(15,4) | Nilai realisasi |
| achievement_pct | DECIMAL(5,2) | Persentase capaian (computed) |
| narrative | TEXT | Narasi pencapaian |
| obstacles | TEXT | Kendala |
| solutions | TEXT | Solusi |
| status | ENUM | draft, submitted, verified, approved, rejected |
| submitted_by | UUID (FK) | |
| submitted_at | TIMESTAMP | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### Evidence/Attachment

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| capaian_id | UUID (FK) | |
| file_name | VARCHAR(255) | Nama asli file |
| mime_type | VARCHAR(100) | |
| file_size | INTEGER | Bytes |
| storage_path | VARCHAR(500) | Path di object storage |
| description | TEXT | Keterangan opsional |
| uploaded_by | UUID (FK) | |
| uploaded_at | TIMESTAMP | |
| is_deleted | BOOLEAN | Soft delete |

### VerifikasiCapaian / ApprovalRecord

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| capaian_id | UUID (FK) | |
| action | ENUM | verify, approve, reject |
| actor_id | UUID (FK) | User pelaku |
| comment | TEXT | Komentar/catatan |
| previous_status | ENUM | Status sebelum aksi |
| new_status | ENUM | Status setelah aksi |
| acted_at | TIMESTAMP | |

### LaporanKinerja

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| unit_id | UUID (FK) | |
| period_type | ENUM | quarterly, semesterly, yearly |
| period_year | INTEGER | |
| version | INTEGER | Auto-increment per revisi |
| status | ENUM | draft, submitted, under_review, approved, published, rejected |
| narrative_content | TEXT | Konten narasi laporan |
| review_notes | TEXT | Catatan reviewer |
| output_file_path | VARCHAR(500, nullable) | Path file generated |
| output_format | ENUM(nullable) | pdf, docx |
| created_by | UUID (FK) | |
| reviewed_by | UUID (FK, nullable) | |
| approved_at | TIMESTAMP(nullable) | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### EvaluationWorksheet

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| unit_id | UUID (FK) | Unit yang dievaluasi |
| period_year | INTEGER | |
| period_semester | INTEGER | |
| component_name | VARCHAR(100) | Komponen evaluasi |
| score | DECIMAL(5,2) | Skor |
| notes | TEXT | Temuan/catatan |
| evaluator_id | UUID (FK) | User Itjen |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### Rekomendasi

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| worksheet_id | UUID (FK) | |
| description | TEXT | Uraian rekomendasi |
| priority | ENUM | high, medium, low |
| due_date | DATE | |
| status | ENUM | open, in_progress, completed, overdue |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### TindakLanjut

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| rekomendasi_id | UUID (FK) | |
| plan_description | TEXT | Uraian rencana tindak lanjut |
| pic_user_id | UUID (FK) | |
| due_date | DATE | |
| status | ENUM | planned, in_progress, completed, overdue |
| progress_notes | TEXT | Catatan progres |
| evidence_id | UUID (FK, nullable) | Bukti penyelesaian |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### DokumenKinerja & ManualIndikator

**DokumenKinerja:**
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| title | VARCHAR(255) | Judul dokumen |
| doc_type | ENUM | pk, iku, renstra, renja, lakip, other |
| unit_id | UUID (FK, nullable) | |
| period_year | INTEGER | |
| version | INTEGER | Auto-increment |
| file_path | VARCHAR(500) | Path di object storage |
| status | ENUM | draft, published, archived |
| uploaded_by | UUID (FK) | |
| created_at | TIMESTAMP | |

**ManualIndikator:**
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | UUID (PK) | |
| indikator_id | UUID (FK, nullable) | Jika terkait indikator tertentu |
| title | VARCHAR(255) | |
| content | TEXT (rich) | Isi manual |
| version | INTEGER | |
| published_by | UUID (FK) | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

### AuditLog

| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | BIGSERIAL (PK) | Auto-increment |
| timestamp | TIMESTAMP | Waktu kejadian |
| user_id | UUID (FK) | Pelaku |
| user_ip | VARCHAR(45) | IP address |
| action | VARCHAR(50) | create, update, delete, submit, verify, approve, reject, login, logout |
| entity_type | VARCHAR(50) | Nama tabel/entitas |
| entity_id | UUID | ID entitas yang berubah |
| old_value | JSONB (nullable) | Nilai sebelum perubahan |
| new_value | JSONB (nullable) | Nilai setelah perubahan |
| description | TEXT | Ringkasan aksi |

> **Catatan:** Tabel AuditLog bersifat **append-only** (immutable). Tidak ada operasi UPDATE atau DELETE pada tabel ini.
