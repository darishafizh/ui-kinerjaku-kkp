# F. RBAC Matriks (Tabel Lengkap)

## F.1 Matriks Role × Aksi × Modul

> **Keterangan:** ✅ = Diizinkan | ❌ = Tidak diizinkan | 🔒 = Read-only | ⚙️ = Configurable
> **Pembatasan akses per unit kerja berlaku kecuali dinyatakan lain.**

---

### Modul 1: Dashboard

| Aksi | Admin Pusat | Operator Unit | Verifikator | Reviewer | Itjen | Tamu |
|------|:-----------:|:-------------:|:-----------:|:--------:|:-----:|:----:|
| Read (seluruh unit) | ✅ | ❌ | ❌ | ✅ | ✅ | 🔒* |
| Read (unit sendiri) | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Export dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Konfigurasi widget | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

*Tamu hanya melihat data yang dipublikasikan.

### Modul 2: Perencanaan Kinerja

| Aksi | Admin Pusat | Operator Unit | Verifikator | Reviewer | Itjen | Tamu |
|------|:-----------:|:-------------:|:-----------:|:--------:|:-----:|:----:|
| Create sasaran/indikator | ✅ | ✅ (unit sendiri) | ❌ | ❌ | ❌ | ❌ |
| Read | ✅ (semua) | ✅ (unit sendiri) | ✅ (unit sendiri) | ✅ (semua) | ✅ (semua) | 🔒* |
| Update (draft) | ✅ | ✅ (unit sendiri) | ❌ | ❌ | ❌ | ❌ |
| Delete (draft only) | ✅ | ✅ (unit sendiri) | ❌ | ❌ | ❌ | ❌ |
| Submit | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Verify | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Approve/Reject | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Manage master data (periode, pohon L0) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Export | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Unlock (override) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Modul 3: Pengukuran Kinerja

| Aksi | Admin Pusat | Operator Unit | Verifikator | Reviewer | Itjen | Tamu |
|------|:-----------:|:-------------:|:-----------:|:--------:|:-----:|:----:|
| Create capaian | ❌ | ✅ (unit sendiri) | ❌ | ❌ | ❌ | ❌ |
| Read | ✅ (semua) | ✅ (unit sendiri) | ✅ (unit sendiri) | ✅ (semua) | ✅ (semua) | ❌ |
| Update (draft) | ❌ | ✅ (unit sendiri) | ❌ | ❌ | ❌ | ❌ |
| Delete (draft only) | ❌ | ✅ (unit sendiri) | ❌ | ❌ | ❌ | ❌ |
| Submit | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Verify | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Approve/Reject | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Upload evidence | ❌ | ✅ (unit sendiri) | ❌ | ❌ | ❌ | ❌ |
| Export | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

### Modul 4: Pelaporan Kinerja

| Aksi | Admin Pusat | Operator Unit | Verifikator | Reviewer | Itjen | Tamu |
|------|:-----------:|:-------------:|:-----------:|:--------:|:-----:|:----:|
| Create laporan | ❌ | ✅ (unit sendiri) | ❌ | ❌ | ❌ | ❌ |
| Read | ✅ (semua) | ✅ (unit sendiri) | ✅ (unit sendiri) | ✅ (semua) | ✅ (semua) | 🔒* |
| Update (draft) | ❌ | ✅ (unit sendiri) | ❌ | ❌ | ❌ | ❌ |
| Submit | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Approve/Reject | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Generate report (PDF/DOCX) | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Download published | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Konsolidasi lintas unit | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Export | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

### Modul 5: Evaluasi Kinerja

| Aksi | Admin Pusat | Operator Unit | Verifikator | Reviewer | Itjen | Tamu |
|------|:-----------:|:-------------:|:-----------:|:--------:|:-----:|:----:|
| Create lembar evaluasi | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Read evaluasi | ✅ (semua) | ✅ (unit sendiri) | ❌ | ✅ (semua) | ✅ (semua) | ❌ |
| Update evaluasi | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Create rekomendasi | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Read rekomendasi | ✅ | ✅ (unit sendiri) | ❌ | ✅ | ✅ | ❌ |
| Create tindak lanjut | ❌ | ✅ (unit sendiri) | ❌ | ❌ | ❌ | ❌ |
| Update tindak lanjut | ❌ | ✅ (unit sendiri) | ❌ | ❌ | ✅ (monitor) | ❌ |
| Export evaluasi | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |

### Modul 6: Dokumen

| Aksi | Admin Pusat | Operator Unit | Verifikator | Reviewer | Itjen | Tamu |
|------|:-----------:|:-------------:|:-----------:|:--------:|:-----:|:----:|
| Create/Upload dokumen | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Read | ✅ | ✅ | ✅ | ✅ | ✅ | 🔒* |
| Update/Versioning | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Delete | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Download | ✅ | ✅ | ✅ | ✅ | ✅ | ✅* |
| Lihat pohon kinerja | ✅ | ✅ | ✅ | ✅ | ✅ | 🔒* |

### Modul 7: Informasi Lainnya

| Aksi | Admin Pusat | Operator Unit | Verifikator | Reviewer | Itjen | Tamu |
|------|:-----------:|:-------------:|:-----------:|:--------:|:-----:|:----:|
| Manage unit kerja (CRUD) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage pengguna (CRUD) | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Read unit & pengguna | ✅ | ✅ (unit sendiri) | ✅ (unit sendiri) | ✅ (semua) | ✅ (semua) | ❌ |
| Manage panduan | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Read panduan | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edit profil akun sendiri | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| View audit log | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Import/Export pengguna | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## F.2 Catatan Pembatasan Akses

| Pembatasan | Keterangan |
|-----------|-----------|
| **Per Unit Kerja** | Operator, Verifikator hanya mengakses data unit kerja yang di-assign. Tidak dapat melihat/mengedit data unit lain. |
| **Lintas Unit (Biro Perencanaan)** | Admin Pusat dan Reviewer memiliki akses baca-tulis (sesuai role) lintas seluruh unit untuk keperluan konsolidasi dan reviu. |
| **Lintas Unit (Itjen)** | Itjen memiliki akses baca lintas seluruh unit untuk modul Perencanaan, Pengukuran, Pelaporan; akses tulis hanya pada modul Evaluasi. |
| **Tamu/Eksternal** | Hanya akses baca pada data yang telah berstatus Published; tidak ada akses ke data draft atau proses internal. |
| **Least Privilege** | Setiap role hanya memiliki hak akses minimum yang diperlukan untuk menjalankan fungsinya. |
