# G. Arsitektur Solusi (High Level)

---

## G.1 Rekomendasi Arsitektur: Modular Monolith

### Pilihan: **Modular Monolith** (direkomendasikan untuk Fase 1/MVP)

### Alasan Pemilihan

| Aspek | Modular Monolith | Microservices |
|-------|:----------------:|:-------------:|
| Kompleksitas deployment | Rendah ✅ | Tinggi ❌ |
| Kecepatan pengembangan MVP | Cepat ✅ | Lambat ❌ |
| Kebutuhan tim DevOps | Minimal ✅ | Signifikan ❌ |
| Konsistensi data (transaksi) | Mudah (single DB) ✅ | Kompleks (distributed tx) ❌ |
| Skalabilitas jangka panjang | Cukup untuk 200-300 concurrent ✅ | Sangat tinggi ✅ |
| Migrasi ke microservices | Mudah (sudah modular) ✅ | N/A |

**Kesimpulan:** Modular Monolith memberikan keseimbangan optimal antara kecepatan pengembangan, kemudahan operasional, dan kesiapan untuk evolusi arsitektur di masa depan. Pemisahan modul secara logis (bounded context) memungkinkan migrasi bertahap ke microservices jika diperlukan setelah Fase 1.

---

## G.2 Komponen Arsitektur

### Diagram Arsitektur (Teks)

```
┌──────────────────────────────────────────────────────────┐
│                    PENGGUNA / BROWSER                     │
└──────────────┬───────────────────────────┬───────────────┘
               │ HTTPS                     │ HTTPS
┌──────────────▼───────────────────────────▼───────────────┐
│              REVERSE PROXY / LOAD BALANCER                │
│                    (Nginx / Traefik)                       │
└──────────────┬───────────────────────────┬───────────────┘
               │                           │
┌──────────────▼──────────┐  ┌─────────────▼──────────────┐
│    FRONTEND WEB APP     │  │      BACKEND API SERVER     │
│  (SPA: React/Vue/Next)  │  │    (Node.js / Go / Java)    │
│                         │  │                             │
│  • Dashboard            │  │  ┌─── Auth Module ────────┐ │
│  • Perencanaan          │  │  │  JWT, RBAC, Session     │ │
│  • Pengukuran           │  │  └────────────────────────┘ │
│  • Pelaporan            │  │  ┌─── Perencanaan Module ─┐ │
│  • Evaluasi             │  │  │  Sasaran, Indikator,   │ │
│  • Dokumen              │  │  │  Target, RencanaAksi   │ │
│  • Info Lainnya         │  │  └────────────────────────┘ │
│                         │  │  ┌─── Pengukuran Module ──┐ │
│  Komponen Shared:       │  │  │  Capaian, Evidence,    │ │
│  • Sidebar (7 modul)    │  │  │  Verifikasi            │ │
│  • Topbar filter        │  │  └────────────────────────┘ │
│  • Breadcrumb           │  │  ┌─── Pelaporan Module ──┐  │
│  • Notifikasi           │  │  │  Laporan, Reviu,      │  │
│                         │  │  │  Generate Doc          │  │
│                         │  │  └────────────────────────┘ │
│                         │  │  ┌─── Evaluasi Module ───┐  │
│                         │  │  │  Evaluasi, Rekomendasi│  │
│                         │  │  │  Tindak Lanjut        │  │
│                         │  │  └────────────────────────┘ │
│                         │  │  ┌─── Dokumen Module ────┐  │
│                         │  │  │  Dokumen, Pohon       │  │
│                         │  │  │  Manual Indikator     │  │
│                         │  │  └────────────────────────┘ │
│                         │  │  ┌─── Admin Module ──────┐  │
│                         │  │  │  User, Unit, Panduan  │  │
│                         │  │  │  Profil, AuditLog     │  │
│                         │  │  └────────────────────────┘ │
│                         │  │  ┌─── Shared Services ──┐   │
│                         │  │  │  Workflow Engine      │   │
│                         │  │  │  Notification Service │   │
│                         │  │  │  File Service         │   │
│                         │  │  │  Audit Log Service    │   │
│                         │  │  │  Report Generator     │   │
│                         │  │  └────────────────────────┘ │
└─────────────────────────┘  └─────┬──────────┬───────────┘
                                   │          │
                    ┌──────────────▼──┐ ┌─────▼──────────────┐
                    │   DATABASE       │ │  OBJECT STORAGE    │
                    │  (PostgreSQL)    │ │  (MinIO / S3)      │
                    │                  │ │                    │
                    │  • Master data   │ │  • Evidence files  │
                    │  • Transactional │ │  • Laporan PDF     │
                    │  • Audit log     │ │  • Dokumen kinerja │
                    │  • Workflow state│ │  • Manual indikator│
                    └──────────────────┘ └────────────────────┘
                           │
                    ┌──────▼──────────────┐
                    │    CACHE LAYER       │
                    │    (Redis)           │
                    │  • Session store     │
                    │  • Dashboard cache   │
                    │  • Master data cache │
                    └─────────────────────┘
                           │
                    ┌──────▼──────────────┐
                    │   OBSERVABILITY      │
                    │  • Application Log   │
                    │    (ELK/Loki)        │
                    │  • Metrics           │
                    │    (Prometheus)      │
                    │  • Uptime Monitor    │
                    └─────────────────────┘
```

---

## G.3 Alur Request Utama

### Alur 1: Request Standar (Read/Write Data)
```
Browser → Reverse Proxy → Frontend SPA → API Call (HTTPS)
  → Backend API → Auth Middleware (JWT validation + RBAC check)
  → Module Handler → Business Logic → Database Query
  → Response (JSON) → Frontend renders → User sees result

Audit: setiap mutasi (POST/PUT/DELETE) dicatat ke AuditLog table
```

### Alur 2: Upload Evidence
```
Operator Unit mengisi form capaian + memilih file evidence
  → Frontend: validasi client-side (tipe file, ukuran ≤ 10MB)
  → API: POST /api/v1/capaian/{id}/evidence (multipart/form-data)
  → Backend: validasi server-side (MIME type, ukuran, scan opsional)
  → File disimpan ke Object Storage (MinIO/S3) → metadata disimpan ke DB
  → Response: URL file + metadata → Frontend menampilkan daftar evidence
  → Audit log: "Evidence uploaded by [User] for Capaian [ID]"
```

### Alur 3: Generate Laporan (PDF/DOCX)
```
Admin Pusat/Reviewer klik "Generate Laporan"
  → API: POST /api/v1/laporan/{id}/generate?format=pdf
  → Backend: validasi seluruh capaian sudah Approved untuk periode
  → Report Generator: query data capaian, narasi, indikator, target
  → Template engine: populate template dokumen (predefined layout)
  → Generate file PDF/DOCX → simpan ke Object Storage
  → Update DB: status laporan = Published, link ke file output
  → Response: download URL → Frontend menyediakan tombol download
  → Audit log: "Laporan [ID] generated as PDF by [User]"
```

---

## G.4 Integrasi Eksternal (Placeholder)

```
┌───────────────────┐     API/SSO     ┌──────────────────────┐
│   KinerjaKu Next  │ ◄──────────────►│  SSO KKP             │
│                   │   [PLACEHOLDER]  │  [PLACEHOLDER]       │
│                   │ ◄───────────────►│  Sistem Perencanaan  │
│                   │   [PLACEHOLDER]  │  [PLACEHOLDER]       │
│                   │ ◄───────────────►│  Sistem Kepegawaian  │
│                   │   [PLACEHOLDER]  │  [PLACEHOLDER]       │
└───────────────────┘                  └──────────────────────┘
```

Integrasi dirancang sebagai API endpoint placeholder (adapter pattern) sehingga dapat diaktivasi tanpa perubahan signifikan pada arsitektur inti.
