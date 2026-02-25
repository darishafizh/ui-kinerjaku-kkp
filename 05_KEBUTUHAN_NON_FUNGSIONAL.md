# E. Kebutuhan Non-Fungsional

---

## E.1 Keamanan

| Aspek | Spesifikasi |
|-------|------------|
| **RBAC** | Role-Based Access Control dengan 6 role utama; assignment role per unit kerja; prinsip least privilege |
| **Audit Log** | Immutable audit log untuk setiap aksi Create/Update/Delete/Submit/Verify/Approve; mencatat user, timestamp, IP, perubahan (before/after) |
| **Enkripsi** | Data at-rest: AES-256; Data in-transit: TLS 1.2+; Password: bcrypt/argon2 hashing |
| **Session Management** | Session timeout: 30 menit idle; maksimal 1 session aktif per user (configurable); session invalidation saat logout |
| **Rate Limiting** | Login: maksimal 5 percobaan gagal per 15 menit → akun terkunci sementara (30 menit); API: 100 request/menit per user |
| **Input Validation** | Sanitasi input untuk mencegah XSS, SQL Injection; validasi tipe data dan panjang field |
| **File Upload Security** | Validasi MIME type; scan malware (opsional/placeholder); batas ukuran file 10 MB |

## E.2 Kinerja Sistem

| Aspek | Target |
|-------|--------|
| **Response Time** | Halaman biasa: < 2 detik; Dashboard dengan agregasi: < 5 detik; Generate laporan PDF/DOCX: < 30 detik |
| **Concurrent Users** | Asumsi: 200 concurrent users (dari ~2.000 pengguna terdaftar di lingkungan KKP); peak hour: 300 concurrent |
| **Database Query** | 95th percentile query time: < 500ms |
| **Caching Strategy** | Redis/in-memory cache untuk: data master (unit, periode), dashboard aggregation, session; cache invalidation saat data berubah; TTL: 5 menit (dashboard), 1 jam (master data) |
| **File Upload** | Upload evidence hingga 10 MB dengan progress indicator; chunked upload untuk file > 5 MB |

## E.3 Ketersediaan (Availability)

| Aspek | Target |
|-------|--------|
| **Uptime** | 99.5% (≈ 3.65 jam downtime per bulan) — target realistis untuk fase MVP |
| **Backup** | Database: daily automated backup dengan retensi 30 hari; Evidence/files: daily incremental backup |
| **Restore** | RPO (Recovery Point Objective): 24 jam; RTO (Recovery Time Objective): 4 jam |
| **DR Ringan** | Database replication ke secondary server (async); manual failover procedure terdokumentasi |
| **Maintenance Window** | Sabtu 22:00–02:00 WIB (planned downtime) |

## E.4 Auditabilitas

| Aspek | Spesifikasi |
|-------|------------|
| **Jejak Perubahan Indikator** | Setiap perubahan definisi, formula, satuan, polaritas tercatat (old value → new value) |
| **Jejak Perubahan Target** | Setiap perubahan nilai target tercatat, termasuk siapa yang mengubah dan alasan |
| **Jejak Perubahan Capaian** | Riwayat revision capaian, termasuk versi evidence yang diganti |
| **Jejak Evidence** | Upload, replace, dan delete evidence tercatat; file lama tidak dihapus fisik |
| **Jejak Workflow** | Setiap transisi status (submit, verify, approve, reject) tercatat penuh |
| **Retensi Log** | Audit log disimpan minimal 5 tahun sesuai ketentuan arsip pemerintah |

## E.5 Kepatuhan SPBE

| Aspek | Spesifikasi |
|-------|------------|
| **Interoperabilitas** | API RESTful mengikuti standar Open API 3.0; format data JSON; kode standar HTTP response |
| **Standar API** | Dokumentasi API lengkap (Swagger/OpenAPI); versioning API (v1, v2); autentikasi API via token (JWT/OAuth2) |
| **Dokumentasi** | Dokumentasi teknis sistem, API reference, dan panduan pengguna tersedia |
| **Keamanan Data** | Sesuai dengan Perpres No. 95 Tahun 2018 tentang SPBE dan pedoman keamanan informasi terkait |

## E.6 UX & Aksesibilitas

| Aspek | Spesifikasi |
|-------|------------|
| **Responsif** | Mendukung desktop (1280px+) dan tablet (768px+); mobile-friendly untuk view dashboard |
| **Konsistensi** | Design system terpadu: komponen tombol, form, tabel, badge, dialog konsisten di seluruh modul |
| **Kemudahan Pakai** | Navigasi maksimal 3 klik untuk aksi utama; breadcrumb di setiap halaman; search global |
| **Kontras** | Rasio kontras minimal 4.5:1 (WCAG AA) untuk teks utama |
| **Font** | Ukuran minimal 14px untuk body text; hierarki tipografi jelas (H1/H2/H3/body) |
| **Navigasi Keyboard** | Tab order logis pada form; fokus visible; shortcut keyboard untuk aksi umum |
| **Label & Helper** | Setiap field form memiliki label jelas; helper text/tooltip untuk field kompleks; pesan error kontekstual |
| **Empty State** | Setiap halaman daftar memiliki empty-state informatif dengan CTA yang jelas |
| **Loading State** | Skeleton loader untuk tabel dan dashboard; progress bar untuk proses panjang (generate laporan) |
