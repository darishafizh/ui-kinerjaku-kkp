/* ============================================
   KinerjaKu Next — Mock Data
   ============================================ */

const MockData = {
  // --- Current User Session ---
  currentUser: {
    id: 'usr-001',
    username: 'admin.pusat',
    fullName: 'Andy Artha Donny Oktopura',
    nip: '197505151999031002',
    email: 'andy.oktopura@kkp.go.id',
    role: 'Admin Pusat',
    roleId: 'admin_pusat',
    unitId: 'unit-001',
    unitName: 'Biro Perencanaan',
    avatar: 'AO'
  },

  users: [
    { id: 'usr-001', fullName: 'Andy Artha Donny Oktopura', nip: '197505151999031002', role: 'Admin Pusat', roleId: 'admin_pusat', unitId: 'unit-001', unitName: 'Biro Perencanaan', email: 'andy.oktopura@kkp.go.id', active: true, avatar: 'AO' },
    { id: 'usr-002', fullName: 'Siti Nurhaliza, S.Pi.', nip: '198801202015012001', role: 'Operator Unit', roleId: 'operator_unit', unitId: 'unit-003', unitName: 'Ditjen Perikanan Tangkap', email: 'siti.nurhaliza@kkp.go.id', active: true, avatar: 'SN' },
    { id: 'usr-003', fullName: 'Ahmad Fauzi, M.M.', nip: '198203102010011005', role: 'Verifikator Unit', roleId: 'verifikator', unitId: 'unit-003', unitName: 'Ditjen Perikanan Tangkap', email: 'ahmad.fauzi@kkp.go.id', active: true, avatar: 'AF' },
    { id: 'usr-004', fullName: 'Dewi Kartika, S.E., M.Ak.', nip: '198507222012012003', role: 'Reviewer Biro Perencanaan', roleId: 'reviewer', unitId: 'unit-001', unitName: 'Biro Perencanaan', email: 'dewi.kartika@kkp.go.id', active: true, avatar: 'DK' },
    { id: 'usr-005', fullName: 'Ir. Hendra Wijaya, M.Sc.', nip: '197803152005011003', role: 'Inspektorat Jenderal', roleId: 'itjen', unitId: 'unit-007', unitName: 'Inspektorat Jenderal', email: 'hendra.wijaya@kkp.go.id', active: true, avatar: 'HW' },
    { id: 'usr-006', fullName: 'Rina Marlina, S.Kel.', nip: '199004102018012002', role: 'Operator Unit', roleId: 'operator_unit', unitId: 'unit-004', unitName: 'Ditjen Perikanan Budidaya', email: 'rina.marlina@kkp.go.id', active: true, avatar: 'RM' },
    { id: 'usr-007', fullName: 'Tamu Eksternal', nip: '-', role: 'Tamu', roleId: 'tamu', unitId: null, unitName: '-', email: 'tamu@external.go.id', active: true, avatar: 'TE' },
  ],

  roles: [
    { id: 'admin_pusat', name: 'Admin Pusat', description: 'Biro Perencanaan' },
    { id: 'operator_unit', name: 'Operator Unit', description: 'Level I/II/III' },
    { id: 'verifikator', name: 'Verifikator Unit', description: 'Verifikasi capaian' },
    { id: 'reviewer', name: 'Reviewer Biro Perencanaan', description: 'Reviu laporan' },
    { id: 'itjen', name: 'Inspektorat Jenderal', description: 'Monitoring & evaluasi' },
    { id: 'tamu', name: 'Tamu/Eksternal', description: 'View-only' },
  ],

  // --- Organization Units (Hierarchy) ---
  units: [
    // Level 0
    { id: 'unit-000', code: '0000000000', name: 'KEMENTERIAN KELAUTAN DAN PERIKANAN', level: 0, parentId: null, head: 'Menteri KKP', active: true },
    // Level 1 — Eselon I
    { id: 'unit-002', code: '0100000000', name: 'SEKRETARIAT JENDERAL', level: 1, parentId: 'unit-000', head: 'Sekretaris Jenderal', active: true },
    { id: 'unit-006', code: '0200000000', name: 'DIREKTORAT JENDERAL PENGELOLAAN KELAUTAN DAN RUANG LAUT', level: 1, parentId: 'unit-000', head: 'Direktur Jenderal', active: true },
    { id: 'unit-003', code: '0300000000', name: 'DIREKTORAT JENDERAL PERIKANAN TANGKAP', level: 1, parentId: 'unit-000', head: 'Direktur Jenderal', active: true },
    { id: 'unit-004', code: '0400000000', name: 'DIREKTORAT JENDERAL PERIKANAN BUDI DAYA', level: 1, parentId: 'unit-000', head: 'Direktur Jenderal', active: true },
    { id: 'unit-005', code: '0500000000', name: 'DIREKTORAT JENDERAL PENGUATAN DAYA SAING PRODUK KELAUTAN DAN PERIKANAN', level: 1, parentId: 'unit-000', head: 'Direktur Jenderal', active: true },
    { id: 'unit-psdkp', code: '0600000000', name: 'DIREKTORAT JENDERAL PENGAWASAN SUMBER DAYA KELAUTAN DAN PERIKANAN', level: 1, parentId: 'unit-000', head: 'Direktur Jenderal', active: true },
    { id: 'unit-007', code: '0700000000', name: 'INSPEKTORAT JENDERAL', level: 1, parentId: 'unit-000', head: 'Inspektur Jenderal', active: true },
    { id: 'unit-008', code: '0800000000', name: 'BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN', level: 1, parentId: 'unit-000', head: 'Kepala Badan', active: true },
    { id: 'unit-brsdm', code: '0900000000', name: 'BADAN RISET DAN SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN', level: 1, parentId: 'unit-000', head: 'Kepala Badan', active: true },
    { id: 'unit-bppmhkp', code: '1000000000', name: 'BADAN PENGENDALIAN DAN PENGAWASAN MUTU HASIL KELAUTAN DAN PERIKANAN', level: 1, parentId: 'unit-000', head: 'Kepala Badan', active: true },
    { id: 'unit-djprl2', code: '1100000000', name: 'DIREKTORAT JENDERAL PENATAAN RUANG LAUT', level: 1, parentId: 'unit-000', head: 'Direktur Jenderal', active: true },
    { id: 'unit-djpk', code: '1200000000', name: 'DIREKTORAT JENDERAL PENGELOLAAN KELAUTAN', level: 1, parentId: 'unit-000', head: 'Direktur Jenderal', active: true },
    // Level 2 — Sekretariat Jenderal sub-units
    { id: 'unit-001', code: '0101000000', name: 'BIRO PERENCANAAN', level: 2, parentId: 'unit-002', head: 'Kepala Biro', active: true },
    { id: 'unit-0102', code: '0102000000', name: 'BIRO SUMBER DAYA MANUSIA APARATUR DAN ORGANISASI', level: 2, parentId: 'unit-002', head: 'Kepala Biro', active: true },
    { id: 'unit-0103', code: '0103000000', name: 'BIRO HUKUM', level: 2, parentId: 'unit-002', head: 'Kepala Biro', active: true },
    { id: 'unit-0104', code: '0104000000', name: 'BIRO HUBUNGAN MASYARAKAT DAN KERJA SAMA LUAR NEGERI', level: 2, parentId: 'unit-002', head: 'Kepala Biro', active: true },
    { id: 'unit-0105', code: '0105000000', name: 'BIRO KEUANGAN DAN BARANG MILIK NEGARA', level: 2, parentId: 'unit-002', head: 'Kepala Biro', active: true },
    { id: 'unit-0106', code: '0106000000', name: 'BIRO UMUM DAN PENGADAAN BARANG/JASA', level: 2, parentId: 'unit-002', head: 'Kepala Biro', active: true },
    { id: 'unit-0107', code: '0107000000', name: 'PUSAT DATA DAN INFORMASI', level: 2, parentId: 'unit-002', head: 'Kepala Pusat', active: true },
    { id: 'unit-0109', code: '0109000000', name: 'BIRO UMUM', level: 2, parentId: 'unit-002', head: 'Kepala Biro', active: true },
    { id: 'unit-0110', code: '0110000000', name: 'LEMBAGA PENGELOLA MODAL USAHA KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-002', head: 'Kepala', active: true },
    { id: 'unit-0120', code: '0120000000', name: 'BIRO PENGADAAN BARANG DAN JASA', level: 2, parentId: 'unit-002', head: 'Kepala Biro', active: true },
    { id: 'unit-0130', code: '0130000000', name: 'PUSAT KEBIJAKAN STRATEGIS', level: 2, parentId: 'unit-002', head: 'Kepala Pusat', active: true },
    // Level 2 — DJPRL sub-units (0200000000)
    { id: 'djprl-sek', code: '0201000000', name: 'SEKRETARIAT DIREKTORAT JENDERAL PENGELOLAAN KELAUTAN DAN RUANG LAUT', level: 2, parentId: 'unit-006', head: 'Sekretaris Ditjen', active: true },
    { id: 'djprl-prl', code: '0202000000', name: 'DIREKTORAT PENATAAN RUANG LAUT', level: 2, parentId: 'unit-006', head: 'Direktur', active: true },
    { id: 'djprl-ppk', code: '0203000000', name: 'DIREKTORAT PENDAYAGUNAAN PESISIR DAN PULAU-PULAU KECIL', level: 2, parentId: 'unit-006', head: 'Direktur', active: true },
    { id: 'djprl-jk', code: '0204000000', name: 'DIREKTORAT JASA KELAUTAN', level: 2, parentId: 'unit-006', head: 'Direktur', active: true },
    { id: 'djprl-keb', code: '0205000000', name: 'DIREKTORAT KONSERVASI EKOSISTEM DAN BIOTA PERAIRAN', level: 2, parentId: 'unit-006', head: 'Direktur', active: true },
    // Level 9 — Dinas under DJPRL
    { id: 'djprl-d01', code: '029071', name: 'DINAS PERIKANAN DAN KELAUTAN KAB. INDRAMAYU', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d02', code: '029092', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d03', code: '029447', name: 'DINAS KELAUTAN DAN PERIKANAN KAB. CIREBON', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d04', code: '039019', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TENGAH', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d05', code: '039062', name: 'DINAS KELAUTAN DAN PERIKANAN KAB. REMBANG', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d06', code: '039485', name: 'DINAS KELAUTAN DAN PERIKANAN KAB. BREBES', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d07', code: '039495', name: 'DINAS KELAUTAN DAN PERIKANAN KAB. PATI', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d08', code: '049035', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI YOGYAKARTA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d09', code: '059034', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TIMUR', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d10', code: '059481', name: 'DINAS PERIKANAN KABUPATEN SAMPANG', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d11', code: '059490', name: 'DINAS PERIKANAN KAB. PAMEKASAN', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d12', code: '059496', name: 'DINAS PERIKANAN KABUPATEN SUMENEP', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d13', code: '069024', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI NANGGROE ACEH DARUSSALAM', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d14', code: '079035', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA UTARA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d15', code: '089006', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d16', code: '099041', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI RIAU', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d17', code: '109037', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAMBI', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d18', code: '119040', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA SELATAN', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d19', code: '129036', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI LAMPUNG', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d20', code: '139027', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d21', code: '149032', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN TENGAH', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d22', code: '159039', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN SELATAN', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d23', code: '169036', name: 'DINAS PERIKANAN DAN KELAUTAN KALIMANTAN TIMUR', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d24', code: '179057', name: 'DINAS KELAUTAN DAN PERIKANAN DAERAH PROPINSI SULAWESI UTARA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d25', code: '189038', name: 'DINAS KELAUTAN DAN PERIKANAN PROPINSI SULAWESI TENGAH', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d26', code: '199037', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI SELATAN', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d27', code: '199056', name: 'DINAS KELAUTAN DAN PERIKANAN KAB. JENEPONTO', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d28', code: '199060', name: 'DINAS KELAUTAN DAN PERIKANAN KAB. PANGKAJENE KEPULAUAN', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d29', code: '219032', name: 'DINAS PERIKANAN DAN KELAUTAN PROVINSI MALUKU', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d30', code: '229057', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI BALI', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d31', code: '230340', name: 'DINAS KELAUTAN DAN PERIKANAN KAB. LOMBOK TIMUR', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d32', code: '239050', name: 'DINAS KELAUTAN DAN PERIKANAN KAB BIMA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d33', code: '239069', name: 'DINAS KELAUTAN DAN PERIKANAN PROV. NUSA TENGGARA BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d34', code: '249088', name: 'DINAS PERIKANAN DAN KELAUTAN PROV. NUSA TENGGARA TIMUR', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d35', code: '259040', name: 'DINAS KELAUTAN DAN PERIKANAN DAERAH PROVINSI PAPUA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d36', code: '269035', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI BENGKULU', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d37', code: '289031', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI MALUKU UTARA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d38', code: '299038', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI BANTEN', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d39', code: '309041', name: 'DINAS KELAUTAN DAN PERIKANAN PROV. KEPULAUAN BANGKA BELITUNG', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d40', code: '319035', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI GORONTALO', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d41', code: '329013', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KEPULAUAN RIAU', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d42', code: '339154', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI PAPUA BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d43', code: '340066', name: 'DINAS KELAUTAN DAN PERIKANAN PROV. SULAWESI BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d44', code: '417744', name: 'DINAS KELAUTAN DAN PERIKANAN PROPINSI KALIMANTAN UTARA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d45', code: '603201', name: 'DINAS KETAHANAN PANGAN, KELAUTAN DAN PERTANIAN PROVINSI DKI JAKARTA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d46', code: '691046', name: '691046 - DINAS KETAHANAN PANGAN, KELAUTAN DAN PERTANIAN PROVINSI DKI JAKARTA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d47', code: '691047', name: '691047 - DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d48', code: '691048', name: '691048 - DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TENGAH', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d49', code: '691049', name: '691049 - DINAS KELAUTAN DAN PERIKANAN PROVINSI DI YOGYAKARTA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d50', code: '691050', name: '691050 - DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TIMUR', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d51', code: '691051', name: '691051 - DINAS KELAUTAN DAN PERIKANAN PROVINSI NANGGROE ACEH DARUSSALAM', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d52', code: '691052', name: '691052 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA UTARA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d53', code: '691053', name: '691053 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d54', code: '691054', name: '691054 - DINAS KELAUTAN DAN PERIKANAN PROVINSI RIAU', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d55', code: '691055', name: '691055 - DINAS KELAUTAN DAN PERIKANAN PROVINSI JAMBI', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d56', code: '691056', name: '691056 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA SELATAN', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d57', code: '691057', name: '691057 - DINAS KELAUTAN DAN PERIKANAN PROVINSI LAMPUNG', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d58', code: '691058', name: '691058 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d59', code: '691059', name: '691059 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN TENGAH', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d60', code: '691060', name: '691060 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN SELATAN', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d61', code: '691061', name: '691061 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN TIMUR', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d62', code: '691062', name: '691062 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI UTARA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d63', code: '691063', name: '691063 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI TENGAH', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d64', code: '691064', name: '691064 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI SELATAN', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d65', code: '691065', name: '691065 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI TENGGARA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d66', code: '691066', name: '691066 - DINAS KELAUTAN DAN PERIKANAN PROVINSI MALUKU', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d67', code: '691067', name: '691067 - DINAS KELAUTAN DAN PERIKANAN PROVINSI BALI', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d68', code: '691068', name: '691068 - DINAS KELAUTAN DAN PERIKANAN PROVINSI NUSA TENGGARA BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d69', code: '691069', name: '691069 - DINAS KELAUTAN DAN PERIKANAN PROVINSI NUSA TENGGARA TIMUR', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d70', code: '691070', name: '691070 - DINAS KELAUTAN DAN PERIKANAN DAERAH PROVINSI PAPUA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d71', code: '691071', name: '691071 - DINAS KELAUTAN DAN PERIKANAN PROVINSI BENGKULU', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d72', code: '691072', name: '691072 - DINAS KELAUTAN DAN PERIKANAN PROVINSI MALUKU UTARA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d73', code: '691073', name: '691073 - DINAS KELAUTAN DAN PERIKANAN PROVINSI BANTEN', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d74', code: '691074', name: '691074 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KEPULAUAN BANGKA BELITUNG', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d75', code: '691075', name: '691075 - DINAS KELAUTAN DAN PERIKANAN PROVINSI GORONTALO', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d76', code: '691076', name: '691076 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KEPULAUAN RIAU', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d77', code: '691077', name: '691077 - DINAS KELAUTAN DAN PERIKANAN PROVINSI PAPUA BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d78', code: '691078', name: '691078 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI BARAT', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d79', code: '691079', name: '691079 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN UTARA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d80', code: '209036', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI TENGGARA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d81', code: '239050b', name: 'DINAS KELAUTAN DAN PERIKANAN KAB. BIMA', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    { id: 'djprl-d82', code: '199060b', name: 'DINAS KELAUTAN DAN PERIKANAN KAB. PANGKAJENE KEPULAUAN', level: 9, parentId: 'unit-006', head: 'Kepala Dinas', active: true },
    // Level 2 — DJPDSPKP sub-units (0500000000)
    { id: 'djpdspkp-01', code: '0501000000', name: 'SEKRETARIAT DITJEN PENGUATAN DAYA SAING PRODUK KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-005', head: 'Sekretaris Ditjen', active: true },
    { id: 'djpdspkp-02', code: '0502000000', name: 'DIREKTORAT LOGISTIK', level: 2, parentId: 'unit-005', head: 'Direktur', active: true },
    { id: 'djpdspkp-03', code: '0503000000', name: 'DIREKTORAT PENGOLAHAN', level: 2, parentId: 'unit-005', head: 'Direktur', active: true },
    { id: 'djpdspkp-04', code: '0504000000', name: 'DIREKTORAT PEMASARAN', level: 2, parentId: 'unit-005', head: 'Direktur', active: true },
    { id: 'djpdspkp-05', code: '0505000000', name: 'DIREKTORAT PEMBERDAYAAN USAHA', level: 2, parentId: 'unit-005', head: 'Direktur', active: true },
    { id: 'djpdspkp-06', code: '0506000000', name: 'DIREKTORAT PRASARANA DAN SARANA PDSPKP', level: 2, parentId: 'unit-005', head: 'Direktur', active: true },
    { id: 'djpdspkp-07', code: '0507000000', name: 'BALAI BESAR PENGUJIAN PENERAPAN PRODUK KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-005', head: 'Kepala Balai', active: true },
    { id: 'djpdspkp-08', code: '0508000000', name: 'DIREKTORAT AKSES DAN PROMOSI', level: 2, parentId: 'unit-005', head: 'Direktur', active: true },
    // Level 2 — DJPK sub-units (1200000000) — Direktorat Jenderal Pengelolaan Kelautan
    { id: 'djpk-01', code: '1201000000', name: 'SEKRETARIAT DIREKTORAT JENDERAL PENGELOLAAN KELAUTAN', level: 2, parentId: 'unit-djpk', head: 'Sekretaris Ditjen', active: true },
    { id: 'djpk-02', code: '1202000000', name: 'DIREKTORAT KONSERVASI EKOSISTEM', level: 2, parentId: 'unit-djpk', head: 'Direktur', active: true },
    { id: 'djpk-03', code: '1203000000', name: 'DIREKTORAT KONSERVASI SPESIES DAN GENETIK', level: 2, parentId: 'unit-djpk', head: 'Direktur', active: true },
    { id: 'djpk-04', code: '1204000000', name: 'DIREKTORAT PESISIR DAN PULAU-PULAU KECIL', level: 2, parentId: 'unit-djpk', head: 'Direktur', active: true },
    { id: 'djpk-05', code: '1205000000', name: 'DIREKTORAT JASA BAHARI', level: 2, parentId: 'unit-djpk', head: 'Direktur', active: true },
    { id: 'djpk-06', code: '1206000000', name: 'DIREKTORAT SUMBER DAYA KELAUTAN', level: 2, parentId: 'unit-djpk', head: 'Direktur', active: true },
    // Level 3 — Balai Pengelolaan SDPL
    { id: 'djpk-b01', code: '0207000000', name: 'BALAI PENGELOLAAN SUMBER DAYA PESISIR DAN LAUT PADANG', level: 3, parentId: 'unit-djpk', head: 'Kepala Balai', active: true },
    { id: 'djpk-b02', code: '0208000000', name: 'BALAI PENGELOLAAN SUMBER DAYA PESISIR DAN LAUT PONTIANAK', level: 3, parentId: 'unit-djpk', head: 'Kepala Balai', active: true },
    { id: 'djpk-b03', code: '0209000000', name: 'BALAI PENGELOLAAN SUMBER DAYA PESISIR DAN LAUT MAKASSAR', level: 3, parentId: 'unit-djpk', head: 'Kepala Balai', active: true },
    { id: 'djpk-b04', code: '0210000000', name: 'BALAI PENGELOLAAN SUMBER DAYA PESISIR DAN LAUT DENPASAR', level: 3, parentId: 'unit-djpk', head: 'Kepala Balai', active: true },
    { id: 'djpk-b05', code: '0212000000', name: 'BALAI KAWASAN KONSERVASI PERAIRAN NASIONAL KUPANG', level: 3, parentId: 'unit-djpk', head: 'Kepala Balai', active: true },
    // Level 4 — Loka
    { id: 'djpk-l01', code: '0211000000', name: 'LOKA PENGELOLAAN SUMBER DAYA PESISIR DAN LAUT SORONG', level: 4, parentId: 'unit-djpk', head: 'Kepala', active: true },
    { id: 'djpk-l02', code: '0213000000', name: 'LOKA KAWASAN KONSERVASI PERAIRAN NASIONAL PEKANBARU', level: 4, parentId: 'unit-djpk', head: 'Kepala', active: true },
    { id: 'djpk-l03', code: '0214000000', name: 'LOKA PENGELOLAAN SUMBER DAYA PESISIR DAN LAUT SERANG', level: 4, parentId: 'unit-djpk', head: 'Kepala', active: true },
    // Level 2 — DJPRL2 sub-units (1100000000) — Direktorat Jenderal Penataan Ruang Laut
    { id: 'djprl2-01', code: '1101000000', name: 'SEKRETARIAT DIREKTORAT JENDERAL PENATAAN RUANG LAUT', level: 2, parentId: 'unit-djprl2', head: 'Sekretaris Ditjen', active: true },
    { id: 'djprl2-02', code: '1102000000', name: 'DIREKTORAT PERENCANAAN RUANG PERAIRAN', level: 2, parentId: 'unit-djprl2', head: 'Direktur', active: true },
    { id: 'djprl2-03', code: '1103000000', name: 'DIREKTORAT PEMANFAATAN RUANG PESISIR DAN PULAU-PULAU KECIL', level: 2, parentId: 'unit-djprl2', head: 'Direktur', active: true },
    { id: 'djprl2-04', code: '1104000000', name: 'DIREKTORAT PEMANFAATAN RUANG KOLOM PERAIRAN DAN DASAR LAUT', level: 2, parentId: 'unit-djprl2', head: 'Direktur', active: true },
    { id: 'djprl2-05', code: '1105000000', name: 'DIREKTORAT PEMBINAAN PENATAAN RUANG LAUT', level: 2, parentId: 'unit-djprl2', head: 'Direktur', active: true },
    { id: 'djprl2-06', code: '1106000000', name: 'DIREKTORAT PENGENDALIAN PEMANFAATAN RUANG LAUT', level: 2, parentId: 'unit-djprl2', head: 'Direktur', active: true },
    // Level 2 — BPPMHKP sub-units (1000000000)
    { id: 'bppmhkp-01', code: '1001000000', name: 'SEKRETARIAT BADAN PENGENDALIAN DAN PENGAWASAN MUTU HASIL KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-bppmhkp', head: 'Sekretaris Badan', active: true },
    { id: 'bppmhkp-02', code: '1002000000', name: 'PUSAT KARANTINA IKAN', level: 2, parentId: 'unit-bppmhkp', head: 'Kepala Pusat', active: true },
    { id: 'bppmhkp-03', code: '1003000000', name: 'PUSAT PENGENDALIAN MUTU', level: 2, parentId: 'unit-bppmhkp', head: 'Kepala Pusat', active: true },
    { id: 'bppmhkp-04', code: '1004000000', name: 'PUSAT MANAJEMEN MUTU', level: 2, parentId: 'unit-bppmhkp', head: 'Kepala Pusat', active: true },
    { id: 'bppmhkp-05', code: '1005000000', name: 'PUSAT MUTU PRODUKSI PRIMER', level: 2, parentId: 'unit-bppmhkp', head: 'Kepala Pusat', active: true },
    { id: 'bppmhkp-06', code: '1006000000', name: 'PUSAT MUTU PASCA PANEN', level: 2, parentId: 'unit-bppmhkp', head: 'Kepala Pusat', active: true },
    { id: 'bppmhkp-07', code: '1007000000', name: 'PUSAT MUTU PRODUKSI PRIMER', level: 2, parentId: 'unit-bppmhkp', head: 'Kepala Pusat', active: true },
    { id: 'bppmhkp-08', code: '1008000000', name: 'PUSAT MUTU PASCAPANEN', level: 2, parentId: 'unit-bppmhkp', head: 'Kepala Pusat', active: true },
    { id: 'bppmhkp-09', code: '1011000000', name: 'BALAI BESAR KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN JAKARTA I', level: 2, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-10', code: '1012000000', name: 'BALAI BESAR KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN MAKASSAR', level: 2, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    // Level 3 — Balai Karantina Ikan
    { id: 'bppmhkp-b01', code: '1013000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN DENPASAR', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b02', code: '1014000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN SURABAYA I', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b03', code: '1015000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN MEDAN I', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b04', code: '1016000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN BALIKPAPAN', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b05', code: '1017000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN JAYAPURA', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b06', code: '1018000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN JAKARTA II', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b07', code: '1019000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN SURABAYA II', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b08', code: '1020000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN MATARAM', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b09', code: '1021000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN MANADO', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b10', code: '1022000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN SEMARANG', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b11', code: '1023000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN BANJARMASIN', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b12', code: '1024000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN LAMPUNG', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b13', code: '1025000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN AMBON', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b14', code: '1026000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN ENTIKONG', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b15', code: '1027000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN TANJUNG PINANG', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b16', code: '1028000000', name: 'BALAI KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN TARAKAN', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    { id: 'bppmhkp-b17', code: '1057000000', name: 'BALAI UJI STANDAR KARANTINA IKAN, PENGENDALIAN MUTU, DAN KEAMANAN HASIL PERIKANAN', level: 3, parentId: 'unit-bppmhkp', head: 'Kepala Balai', active: true },
    // Level 4 — Stasiun KIPM
    { id: 'bppmhkp-s01', code: '1029000000', name: 'STASIUN KIPM PALEMBANG', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s02', code: '1030000000', name: 'STASIUN KIPM BANDUNG', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s03', code: '1031000000', name: 'STASIUN KIPM MERAUKE', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s04', code: '1032000000', name: 'STASIUN KIPM PONTIANAK', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s05', code: '1033000000', name: 'STASIUN KIPM KENDARI', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s06', code: '1034000000', name: 'STASIUN KIPM BATAM', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s07', code: '1035000000', name: 'STASIUN KIPM PADANG', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s08', code: '1036000000', name: 'STASIUN KIPM JAMBI', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s09', code: '1037000000', name: 'STASIUN KIPM PALU', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s10', code: '1038000000', name: 'STASIUN KIPM PALANGKARAYA', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s11', code: '1039000000', name: 'STASIUN KIPM KUPANG', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s12', code: '1040000000', name: 'STASIUN KIPM PANGKAL PINANG', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s13', code: '1041000000', name: 'STASIUN KIPM TERNATE', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s14', code: '1042000000', name: 'STASIUN KIPM YOGYAKARTA', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s15', code: '1043000000', name: 'STASIUN KIPM ACEH', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s16', code: '1044000000', name: 'STASIUN KIPM GORONTALO', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s17', code: '1045000000', name: 'STASIUN KIPM PEKANBARU', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s18', code: '1046000000', name: 'STASIUN KIPM MEDAN II', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s19', code: '1047000000', name: 'STASIUN KIPM SORONG', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s20', code: '1048000000', name: 'STASIUN KIPM BENGKULU', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s21', code: '1049000000', name: 'STASIUN KIPM CIREBON', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s22', code: '1050000000', name: 'STASIUN KIPM LUWUK BANGGAI', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s23', code: '1051000000', name: 'STASIUN KIPM TANJUNG BALAI ASAHAN', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s24', code: '1052000000', name: 'STASIUN KIPM BIMA', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s25', code: '1053000000', name: 'STASIUN KIPM TAHUNA', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s26', code: '1054000000', name: 'STASIUN KIPM BAU-BAU', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s27', code: '1055000000', name: 'STASIUN KIPM MERAK', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    { id: 'bppmhkp-s28', code: '1056000000', name: 'STASIUN KIPM MAMUJU', level: 4, parentId: 'unit-bppmhkp', head: 'Kepala', active: true },
    // Level 2 — BPPSDMKP sub-units (0800000000)
    { id: 'bppsdm-01', code: '0801000000', name: 'SEKRETARIAT BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-008', head: 'Sekretaris Badan', active: true },
    { id: 'bppsdm-02', code: '0802000000', name: 'PUSAT RISET KELAUTAN KP', level: 2, parentId: 'unit-008', head: 'Kepala Pusat', active: true },
    { id: 'bppsdm-03', code: '0803000000', name: 'PUSAT RISET PERIKANAN', level: 2, parentId: 'unit-008', head: 'Kepala Pusat', active: true },
    { id: 'bppsdm-04', code: '0803300000', name: 'BALAI BESAR RISET SOSIAL EKONOMI KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-008', head: 'Kepala Balai', active: true },
    { id: 'bppsdm-05', code: '0803400000', name: 'BALAI BESAR RISET PENGOLAHAN PRODUK DAN BIOTEKNOLOGI KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-008', head: 'Kepala Balai', active: true },
    { id: 'bppsdm-06', code: '0804000000', name: 'PUSAT PENDIDIKAN KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-008', head: 'Kepala Pusat', active: true },
    { id: 'bppsdm-07', code: '0805000000', name: 'PUSAT PELATIHAN DAN PENYULUHAN KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-008', head: 'Kepala Pusat', active: true },
    { id: 'bppsdm-08', code: '0807000000', name: 'PUSAT PELATIHAN KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-008', head: 'Kepala Pusat', active: true },
    { id: 'bppsdm-09', code: '0808000000', name: 'PUSAT PENYULUHAN KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-008', head: 'Kepala Pusat', active: true },
    { id: 'bppsdm-10', code: '0809000000', name: 'PUSAT STANDARDISASI DAN SERTIFIKASI SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-008', head: 'Kepala Pusat', active: true },
    // Level 2 — Inspektorat Jenderal sub-units (0700000000)
    { id: 'itjen-01', code: '0701000000', name: 'SEKRETARIAT INSPEKTORAT JENDERAL', level: 2, parentId: 'unit-007', head: 'Sekretaris Itjen', active: true },
    { id: 'itjen-02', code: '0702000000', name: 'INSPEKTORAT I', level: 2, parentId: 'unit-007', head: 'Inspektur', active: true },
    { id: 'itjen-03', code: '0703000000', name: 'INSPEKTORAT II', level: 2, parentId: 'unit-007', head: 'Inspektur', active: true },
    { id: 'itjen-04', code: '0704000000', name: 'INSPEKTORAT III', level: 2, parentId: 'unit-007', head: 'Inspektur', active: true },
    { id: 'itjen-05', code: '0705000000', name: 'INSPEKTORAT IV', level: 2, parentId: 'unit-007', head: 'Inspektur', active: true },
    { id: 'itjen-06', code: '0706000000', name: 'INSPEKTORAT V', level: 2, parentId: 'unit-007', head: 'Inspektur', active: true },
    // Level 2 — DJPSDKP sub-units (0600000000)
    { id: 'djpsdkp-01', code: '0601000000', name: 'SEKRETARIAT DITJEN PENGAWASAN SUMBER DAYA KELAUTAN DAN PERIKANAN', level: 2, parentId: 'unit-psdkp', head: 'Sekretaris Ditjen', active: true },
    { id: 'djpsdkp-02', code: '0602000000', name: 'DIREKTORAT PENGENDALIAN OPERASI ARMADA', level: 2, parentId: 'unit-psdkp', head: 'Direktur', active: true },
    { id: 'djpsdkp-03', code: '0603800000', name: 'DIREKTORAT PENGAWASAN SUMBER DAYA KELAUTAN', level: 2, parentId: 'unit-psdkp', head: 'Direktur', active: true },
    { id: 'djpsdkp-04', code: '0604000000', name: 'DIREKTORAT PENGAWASAN SUMBER DAYA PERIKANAN', level: 2, parentId: 'unit-psdkp', head: 'Direktur', active: true },
    { id: 'djpsdkp-05', code: '0605000000', name: 'DIREKTORAT PENANGANAN PELANGGARAN', level: 2, parentId: 'unit-psdkp', head: 'Direktur', active: true },
    { id: 'djpsdkp-06', code: '0606000000', name: 'DIREKTORAT PRASARANA DAN SARANA PENGAWASAN', level: 2, parentId: 'unit-psdkp', head: 'Direktur', active: true },
    // Level 3 — Pangkalan PSDKP
    { id: 'djpsdkp-p01', code: '0602100000', name: 'PANGKALAN PSDKP LAMPULO', level: 3, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-p02', code: '0602200000', name: 'PANGKALAN PSDKP BATAM', level: 3, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-p03', code: '0602300000', name: 'PANGKALAN PSDKP JAKARTA', level: 3, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-p04', code: '0602400000', name: 'PANGKALAN PSDKP BENOA', level: 3, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-p05', code: '0602500000', name: 'PANGKALAN PSDKP BITUNG', level: 3, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-p06', code: '0602600000', name: 'PANGKALAN PSDKP TUAL', level: 3, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    // Level 4 — Stasiun PSDKP
    { id: 'djpsdkp-s01', code: '0602700000', name: 'STASIUN PSDKP CILACAP', level: 4, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-s02', code: '0602800000', name: 'STASIUN PSDKP BELAWAN', level: 4, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-s03', code: '0602900000', name: 'STASIUN PSDKP KUPANG', level: 4, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-s04', code: '0603000000', name: 'STASIUN PSDKP PONTIANAK', level: 4, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-s05', code: '0603100000', name: 'STASIUN PENGAWASAN SUMBER DAYA KELAUTAN DAN PERIKANAN TARAKAN', level: 4, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-s06', code: '0603200000', name: 'STASIUN PSDKP TAHUNA', level: 4, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-s07', code: '0603300000', name: 'STASIUN PSDKP AMBON', level: 4, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    { id: 'djpsdkp-s08', code: '0603400000', name: 'STASIUN PSDKP BIAK', level: 4, parentId: 'unit-psdkp', head: 'Kepala', active: true },
    // Level 2 — DJPT sub-units (0300000000)
    { id: 'djpt-01', code: '0301000000', name: 'SEKRETARIAT DITJEN PERIKANAN TANGKAP', level: 2, parentId: 'unit-003', head: 'Sekretaris Ditjen', active: true },
    { id: 'djpt-02', code: '0302000000', name: 'DIREKTORAT PENGELOLAAN SUMBER DAYA IKAN', level: 2, parentId: 'unit-003', head: 'Direktur', active: true },
    { id: 'djpt-03', code: '0303000000', name: 'DIREKTORAT KAPAL PERIKANAN DAN ALAT PENANGKAPAN IKAN', level: 2, parentId: 'unit-003', head: 'Direktur', active: true },
    { id: 'djpt-04', code: '0304000000', name: 'DIREKTORAT KEPELABUHANAN PERIKANAN', level: 2, parentId: 'unit-003', head: 'Direktur', active: true },
    { id: 'djpt-05', code: '0305000000', name: 'DIREKTORAT PERIZINAN DAN KENELAYANAN', level: 2, parentId: 'unit-003', head: 'Direktur', active: true },
    { id: 'djpt-06', code: '0306100000', name: 'BALAI BESAR PENANGKAPAN IKAN', level: 2, parentId: 'unit-003', head: 'Kepala Balai', active: true },
    { id: 'djpt-07', code: '0307000000', name: 'PELABUHAN PERIKANAN SAMUDERA NIZAM ZACHMAN JAKARTA', level: 2, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-08', code: '0308000000', name: 'PELABUHAN PERIKANAN SAMUDERA KENDARI', level: 2, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-09', code: '0309000000', name: 'PELABUHAN PERIKANAN SAMUDERA CILACAP', level: 2, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-10', code: '0310000000', name: 'PELABUHAN PERIKANAN SAMUDERA BUNGUS', level: 2, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-11', code: '0311000000', name: 'PELABUHAN PERIKANAN SAMUDERA BELAWAN', level: 2, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-12', code: '0311100000', name: 'PELABUHAN PERIKANAN SAMUDERA BITUNG', level: 2, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-13', code: '0314000000', name: 'DIREKTORAT PERLINDUNGAN DAN PEMBERDAYAAN NELAYAN', level: 2, parentId: 'unit-003', head: 'Direktur', active: true },
    { id: 'djpt-14', code: '0315000000', name: 'DIREKTORAT USAHA PENANGKAPAN IKAN', level: 2, parentId: 'unit-003', head: 'Direktur', active: true },
    // Level 3 — PPN (Pelabuhan Perikanan Nusantara)
    { id: 'djpt-ppn01', code: '0312010000', name: 'PELABUHAN PERIKANAN NUSANTARA AMBON', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn02', code: '0312020000', name: 'PELABUHAN PERIKANAN NUSANTARA PALABUHANRATU', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn03', code: '0312030000', name: 'PELABUHAN PERIKANAN NUSANTARA TERNATE', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn04', code: '0312040000', name: 'PELABUHAN PERIKANAN NUSANTARA PRIGI', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn05', code: '0312050000', name: 'PELABUHAN PERIKANAN NUSANTARA PEMANGKAT', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn06', code: '0312060000', name: 'PELABUHAN PERIKANAN NUSANTARA SIBOLGA', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn07', code: '0312070000', name: 'PELABUHAN PERIKANAN NUSANTARA TUAL', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn08', code: '0312080000', name: 'PELABUHAN PERIKANAN NUSANTARA KEJAWANAN', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn09', code: '0312090000', name: 'PELABUHAN PERIKANAN NUSANTARA PEKALONGAN', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn10', code: '0312100000', name: 'PELABUHAN PERIKANAN NUSANTARA BRONDONG', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn11', code: '0312110000', name: 'PELABUHAN PERIKANAN NUSANTARA TANJUNG PANDAN', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn12', code: '0312120000', name: 'PELABUHAN PERIKANAN NUSANTARA SUNGAILIAT', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn13', code: '0312130000', name: 'PELABUHAN PERIKANAN NUSANTARA PENGAMBENGAN', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn14', code: '0312140000', name: 'PELABUHAN PERIKANAN NUSANTARA KARANGANTU', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    { id: 'djpt-ppn15', code: '0312150000', name: 'PELABUHAN PERIKANAN NUSANTARA KWANDANG', level: 3, parentId: 'unit-003', head: 'Kepala', active: true },
    // Level 4 — PPP (Pelabuhan Perikanan Pantai)
    { id: 'djpt-ppp01', code: '0313010000', name: 'PELABUHAN PERIKANAN PANTAI TELUK BATANG', level: 4, parentId: 'unit-003', head: 'Kepala', active: true },
    // Level 9 — Dinas under DJPT
    { id: 'djpt-d01', code: '019020', name: 'DINAS KETAHANAN PANGAN, KELAUTAN DAN PERTANIAN PROVINSI DKI JAKARTA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d02', code: '019062', name: 'DINAS KETAHANAN PANGAN, KELAUTAN DAN PERTANIAN PROVINSI DKI JAKARTA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d03', code: '029088', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d04', code: '029172', name: 'DINAS PERIKANAN DAN KELAUTAN PROVINSI JAWA BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d05', code: '039015', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TENGAH', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d06', code: '039163', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TENGAH', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d07', code: '049031', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI YOGYAKARTA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d08', code: '049097', name: '049097 - DINAS KELAUTAN DAN PERIKANAN PROVINSI YOGYAKARTA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d09', code: '059030', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TIMUR', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d10', code: '059190', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TIMUR', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d11', code: '069020', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI NANGGROE ACEH DARUSSALAM', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d12', code: '069145', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI NANGGROE ACEH DARUSSALAM', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d13', code: '079031', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA UTARA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d14', code: '079136', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA UTARA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d15', code: '089000', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d16', code: '089143', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d17', code: '099037', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI RIAU', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d18', code: '099325', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI RIAU', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d19', code: '109033', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAMBI', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d20', code: '109131', name: '109131 - DINAS KELAUTAN DAN PERIKANAN PROVINSI JAMBI', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d21', code: '119036', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA SELATAN', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d22', code: '119114', name: '119114 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA SELATAN', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d23', code: '129032', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI LAMPUNG', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d24', code: '139023', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d25', code: '149028', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN TENGAH', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d26', code: '159035', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN SELATAN', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d27', code: '169032', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN TIMUR', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d28', code: '179053', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI UTARA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d29', code: '189034', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI TENGAH', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d30', code: '199033', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI SELATAN', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d31', code: '209032', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI TENGGARA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d32', code: '219028', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI MALUKU', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d33', code: '229053', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI BALI', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d34', code: '239046', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI NUSA TENGGARA BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d35', code: '249084', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI NUSA TENGGARA TIMUR', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d36', code: '259036', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI PAPUA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d37', code: '269031', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI BENGKULU', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d38', code: '289027', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI MALUKU UTARA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d39', code: '299034', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI BANTEN', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d40', code: '309037', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KEPULAUAN BANGKA BELITUNG', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d41', code: '319031', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI GORONTALO', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d42', code: '329009', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KEPULAUAN RIAU', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d43', code: '339150', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI PAPUA BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d44', code: '340062', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d45', code: '417740', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN UTARA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d46', code: '079136', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA UTARA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d47', code: '129123', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI LAMPUNG', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d48', code: '139138', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d49', code: '149124', name: '149124 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN TENGAH', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d50', code: '169124', name: 'DINAS PERIKANAN DAN KELAUTAN PROVINSI KALIMANTAN TIMUR', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d51', code: '179113', name: 'DINAS KELAUTAN DAN PERIKANAN PROPINSI SULAWESI UTARA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d52', code: '189143', name: 'DINAS PERIKANAN DAN KELAUTAN PROPINSI SULAWESI TENGAH', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d53', code: '199137', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI SELATAN', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d54', code: '209117', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI TENGGARA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d55', code: '219098', name: 'DINAS PERIKANAN DAN KELAUTAN PROVINSI MALUKU', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d56', code: '229110', name: '229110 - DINAS KELAUTAN DAN PERIKANAN PROVINSI BALI', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d57', code: '239065', name: 'DINAS KELAUTAN DAN PERIKANAN PROV. NUSA TENGGARA BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d58', code: '239138', name: 'DINAS KELAUTAN DAN PERIKANAN PROV. NUSA TENGGARA BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d59', code: '249169', name: 'DINAS PERIKANAN DAN KELAUTAN PROV. NUSA TENGGARA TIMUR', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d60', code: '259107', name: 'DINAS KELAUTAN DAN PERIKANAN DAERAH PROVINSI PAPUA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d61', code: '269120', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI BENGKULU', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d62', code: '289112', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI MALUKU UTARA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d63', code: '299391', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI BANTEN', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d64', code: '309170', name: '309170 - DINAS KELAUTAN DAN PERIKANAN PROV. KEPULAUAN BANGKA BELITUNG', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d65', code: '319098', name: 'DINAS PERIKANAN DAN KELAUTAN PROVINSI GORONTALO', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d66', code: '329087', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KEPULAUAN RIAU', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d67', code: '339096', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI PAPUA BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d68', code: '340150', name: 'DINAS KELAUTAN DAN PERIKANAN PROV. SULAWESI BARAT', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    { id: 'djpt-d69', code: '632335', name: '632335 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN UTARA', level: 9, parentId: 'unit-003', head: 'Kepala Dinas', active: true },
    // Level 2 — DJPB sub-units (0400000000)
    { id: 'djpb-01', code: '0401000000', name: 'SEKRETARIAT DITJEN PERIKANAN BUDI DAYA', level: 2, parentId: 'unit-004', head: 'Sekretaris Ditjen', active: true },
    { id: 'djpb-02', code: '0402000000', name: 'DIREKTORAT IKAN AIR LAUT', level: 2, parentId: 'unit-004', head: 'Direktur', active: true },
    { id: 'djpb-03', code: '0403000000', name: 'DIREKTORAT RUMPUT LAUT', level: 2, parentId: 'unit-004', head: 'Direktur', active: true },
    { id: 'djpb-04', code: '0404000000', name: 'DIREKTORAT IKAN AIR TAWAR', level: 2, parentId: 'unit-004', head: 'Direktur', active: true },
    { id: 'djpb-05', code: '0405000000', name: 'DIREKTORAT IKAN AIR PAYAU', level: 2, parentId: 'unit-004', head: 'Direktur', active: true },
    { id: 'djpb-06', code: '0406000000', name: 'DIREKTORAT PRASARANA DAN SARANA PERIKANAN BUDIDAYA', level: 2, parentId: 'unit-004', head: 'Direktur', active: true },
    { id: 'djpb-07', code: '0410000000', name: 'BALAI BESAR PERIKANAN BUDI DAYA AIR PAYAU JEPARA', level: 2, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-08', code: '0411000000', name: 'BALAI BESAR PERIKANAN BUDI DAYA LAUT LAMPUNG', level: 2, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-09', code: '0412000000', name: 'BALAI BESAR PERIKANAN BUDI DAYA AIR TAWAR SUKABUMI', level: 2, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    // Level 3 — Balai Perikanan Budi Daya
    { id: 'djpb-b01', code: '0413010000', name: 'BALAI PERIKANAN BUDI DAYA AIR PAYAU SITUBONDO', level: 3, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-b02', code: '0413020000', name: 'BALAI PERIKANAN BUDI DAYA AIR PAYAU TAKALAR', level: 3, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-b03', code: '0413030000', name: 'BALAI PERIKANAN BUDI DAYA AIR TAWAR JAMBI', level: 3, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-b04', code: '0413040000', name: 'BALAI PERIKANAN BUDI DAYA AIR TAWAR MANDIANGIN', level: 3, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-b05', code: '0413050000', name: 'BALAI PERIKANAN BUDI DAYA LAUT BATAM', level: 3, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-b06', code: '0413060000', name: 'BALAI PERIKANAN BUDI DAYA LAUT LOMBOK', level: 3, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-b07', code: '0413070000', name: 'BALAI PERIKANAN BUDI DAYA LAUT AMBON', level: 3, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-b08', code: '0413080000', name: 'BALAI PERIKANAN BUDI DAYA AIR PAYAU UJUNG BATEE', level: 3, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-b09', code: '0413090000', name: 'BALAI PERIKANAN BUDI DAYA AIR TAWAR TATELU', level: 3, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-b10', code: '0413100000', name: 'BALAI LAYANAN USAHA PRODUKSI PERIKANAN BUDI DAYA', level: 3, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    { id: 'djpb-b11', code: '0413200000', name: 'BALAI PRODUKSI INDUK UDANG UNGGUL DAN KEKERANGAN', level: 3, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    // Level 4 — Balai Pengujian
    { id: 'djpb-bp01', code: '0413300000', name: 'BALAI PENGUJIAN KESEHATAN IKAN DAN LINGKUNGAN, SERANG', level: 4, parentId: 'unit-004', head: 'Kepala Balai', active: true },
    // Level 9 — Dinas under DJPB
    { id: 'djpb-d01', code: '019022', name: 'DINAS KETAHANAN PANGAN, KELAUTAN DAN PERTANIAN PROVINSI DKI JAKARTA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d02', code: '019063', name: '019063 - DINAS KELAUTAN DAN PERTANIAN PROVINSI DKI JAKARTA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d03', code: '029089', name: 'Dinas Kelautan dan Perikanan Provinsi Jawa Barat', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d04', code: '029173', name: '029173 - DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA BARAT', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d05', code: '039016', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TENGAH', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d06', code: '039164', name: '039164 - DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TENGAH', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d07', code: '049032', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI YOGYAKARTA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d08', code: '049098', name: '049098 - DINAS KELAUTAN DAN PERIKANAN PROVINSI DI YOGYAKARTA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d09', code: '059031', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TIMUR', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d10', code: '059191', name: '059191 - DINAS KELAUTAN DAN PERIKANAN PROVINSI JAWA TIMUR', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d11', code: '069021', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI NANGGROE ACEH DARUSSALAM', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d12', code: '069146', name: '069146 - DINAS KELAUTAN DAN PERIKANAN PROVINSI NANGGROE ACEH DARUSSALAM', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d13', code: '079032', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA UTARA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d14', code: '079137', name: '079137 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA UTARA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d15', code: '089003', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA BARAT', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d16', code: '089144', name: '089144 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA BARAT', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d17', code: '099038', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI RIAU', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d18', code: '099326', name: '099326 - DINAS KELAUTAN DAN PERIKANAN PROVINSI RIAU', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d19', code: '109034', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI JAMBI', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d20', code: '109132', name: '109132 - DINAS KELAUTAN DAN PERIKANAN PROVINSI JAMBI', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d21', code: '119037', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA SELATAN', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d22', code: '119142', name: '119142 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SUMATERA SELATAN', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d23', code: '129033', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI LAMPUNG', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d24', code: '129124', name: '129124 - DINAS KELAUTAN DAN PERIKANAN PROVINSI LAMPUNG', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d25', code: '139024', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN BARAT', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d26', code: '139139', name: '139139 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN BARAT', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d27', code: '149029', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN TENGAH', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d28', code: '149125', name: '149125 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN TENGAH', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d29', code: '159036', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN SELATAN', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d30', code: '169033', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN TIMUR', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d31', code: '169125', name: '169125 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN TIMUR', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d32', code: '179054', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI UTARA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d33', code: '179114', name: '179114 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI UTARA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d34', code: '189035', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI TENGAH', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d35', code: '189144', name: '189144 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI TENGAH', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d36', code: '199034', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI SELATAN', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d37', code: '199138', name: '199138 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI SELATAN', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d38', code: '209033', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI TENGGARA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d39', code: '209118', name: '209118 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI TENGGARA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d40', code: '219029', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI MALUKU', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d41', code: '219099', name: '219099 - DINAS KELAUTAN DAN PERIKANAN PROVINSI MALUKU', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d42', code: '229054', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI BALI', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d43', code: '229111', name: '229111 - DINAS KELAUTAN DAN PERIKANAN PROVINSI BALI', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d44', code: '239047', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI NUSA TENGGARA BARAT', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d45', code: '239139', name: '239139 - DINAS KELAUTAN DAN PERIKANAN PROVINSI NUSA TENGGARA BARAT', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d46', code: '249085', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI NUSA TENGGARA TIMUR', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d47', code: '249170', name: '249170 - DINAS KELAUTAN DAN PERIKANAN PROVINSI NUSA TENGGARA TIMUR', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d48', code: '259037', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI PAPUA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d49', code: '259108', name: '259108 - DINAS KELAUTAN DAN PERIKANAN PROVINSI PAPUA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d50', code: '269032', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI BENGKULU', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d51', code: '269121', name: '269121 - DINAS KELAUTAN DAN PERIKANAN PROVINSI BENGKULU', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d52', code: '289028', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI MALUKU UTARA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d53', code: '289113', name: '289113 - DINAS KELAUTAN DAN PERIKANAN PROVINSI MALUKU UTARA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d54', code: '299035', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI BANTEN', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d55', code: '299392', name: '299392 - DINAS KELAUTAN DAN PERIKANAN PROVINSI BANTEN', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d56', code: '309038', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KEPULAUAN BANGKA BELITUNG', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d57', code: '309171', name: '309171 - DINAS KELAUTAN DAN PERIKANAN PROV. KEPULAUAN BANGKA BELITUNG', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d58', code: '319032', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI GORONTALO', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d59', code: '319099', name: '319099 - DINAS KELAUTAN DAN PERIKANAN PROVINSI GORONTALO', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d60', code: '329010', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KEPULAUAN RIAU', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d61', code: '329088', name: '329088 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KEPULAUAN RIAU', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d62', code: '339017', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI PAPUA BARAT', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d63', code: '339097', name: '339097 - DINAS KELAUTAN DAN PERIKANAN PROVINSI PAPUA BARAT', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d64', code: '340063', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI BARAT', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d65', code: '340151', name: '340151 - DINAS KELAUTAN DAN PERIKANAN PROVINSI SULAWESI BARAT', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d66', code: '417741', name: 'DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN UTARA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
    { id: 'djpb-d67', code: '632336', name: '632336 - DINAS KELAUTAN DAN PERIKANAN PROVINSI KALIMANTAN UTARA', level: 9, parentId: 'unit-004', head: 'Kepala Dinas', active: true },
  ],

  periods: [
    { year: 2026, quarter: 'TW I', label: '2026 — TW I' },
    { year: 2026, quarter: 'TW II', label: '2026 — TW II' },
    { year: 2026, quarter: 'TW III', label: '2026 — TW III' },
    { year: 2026, quarter: 'TW IV', label: '2026 — TW IV' },
    { year: 2025, quarter: 'Tahunan', label: '2025 — Tahunan' },
  ],

  activePeriod: { year: 2026, quarter: 'TW I' },

  // --- Sasaran ---
  sasaran: [
    { id: 'ss-001', code: 'SS.01', name: 'Meningkatnya Produksi Perikanan Nasional', unitId: 'unit-000', level: 'Kementerian', year: 2026, parentId: null, status: 'approved', indikatorCount: 3 },
    { id: 'ss-002', code: 'SS.02', name: 'Meningkatnya Daya Saing dan Nilai Tambah Produk Kelautan dan Perikanan', unitId: 'unit-000', level: 'Kementerian', year: 2026, parentId: null, status: 'approved', indikatorCount: 2 },
    { id: 'ss-003', code: 'SS.01.01', name: 'Meningkatnya Produksi Perikanan Tangkap', unitId: 'unit-003', level: 'Eselon I', year: 2026, parentId: 'ss-001', status: 'approved', indikatorCount: 3 },
    { id: 'ss-004', code: 'SS.01.02', name: 'Meningkatnya Produksi Perikanan Budidaya', unitId: 'unit-004', level: 'Eselon I', year: 2026, parentId: 'ss-001', status: 'verified', indikatorCount: 2 },
    { id: 'ss-005', code: 'SS.02.01', name: 'Meningkatnya Mutu dan Keamanan Hasil Perikanan', unitId: 'unit-005', level: 'Eselon I', year: 2026, parentId: 'ss-002', status: 'draft', indikatorCount: 2 },
    { id: 'ss-006', code: 'SS.01.01.01', name: 'Meningkatnya Jumlah Kapal Perikanan Beroperasi', unitId: 'unit-009', level: 'Eselon II', year: 2026, parentId: 'ss-003', status: 'approved', indikatorCount: 2 },
    // Sekretariat Jenderal
    { id: 'ss-007', code: 'SP.01', name: 'Terwujudnya Tata Kelola Pemerintahan yang Baik dan Bersih di Lingkungan KKP', unitId: 'unit-002', level: 'Eselon I', year: 2026, parentId: null, status: 'approved', indikatorCount: 1 },
    { id: 'ss-008', code: 'SP.02', name: 'Meningkatnya Kualitas Perencanaan dan Penganggaran KKP', unitId: 'unit-002', level: 'Eselon I', year: 2026, parentId: null, status: 'approved', indikatorCount: 1 },
    { id: 'ss-009', code: 'SP.03', name: 'Meningkatnya Pengelolaan Keuangan dan Barang Milik Negara yang Akuntabel', unitId: 'unit-002', level: 'Eselon I', year: 2026, parentId: null, status: 'verified', indikatorCount: 0 },
    // Ditjen Perikanan Tangkap extras
    { id: 'ss-010', code: 'SS.01.02', name: 'Meningkatnya Tata Kelola Perikanan Tangkap yang Berkelanjutan', unitId: 'unit-003', level: 'Eselon I', year: 2026, parentId: 'ss-001', status: 'approved', indikatorCount: 1 },
    { id: 'ss-011', code: 'SS.01.03', name: 'Meningkatnya Kesejahteraan Nelayan dan Pelaku Usaha Perikanan Tangkap', unitId: 'unit-003', level: 'Eselon I', year: 2026, parentId: 'ss-002', status: 'draft', indikatorCount: 0 },
    // Ditjen Perikanan Budidaya extras
    { id: 'ss-012', code: 'SS.01.03', name: 'Meningkatnya Ketersediaan Benih dan Induk Unggul untuk Budidaya', unitId: 'unit-004', level: 'Eselon I', year: 2026, parentId: 'ss-001', status: 'approved', indikatorCount: 1 },
    // DJPRL
    { id: 'ss-013', code: 'SS.03.01', name: 'Terwujudnya Pengelolaan Ruang Laut yang Berkelanjutan', unitId: 'unit-006', level: 'Eselon I', year: 2026, parentId: null, status: 'approved', indikatorCount: 1 },
    { id: 'ss-014', code: 'SS.03.02', name: 'Meningkatnya Konservasi dan Keanekaragaman Hayati Laut', unitId: 'unit-006', level: 'Eselon I', year: 2026, parentId: null, status: 'verified', indikatorCount: 0 },
    // Biro Perencanaan
    { id: 'ss-015', code: 'SP.01.01', name: 'Meningkatnya Kualitas Dokumen Perencanaan dan Penganggaran', unitId: 'unit-001', level: 'Eselon II', year: 2026, parentId: 'ss-008', status: 'approved', indikatorCount: 1 },
    { id: 'ss-016', code: 'SP.01.02', name: 'Meningkatnya Kualitas Monitoring dan Evaluasi Kinerja', unitId: 'unit-001', level: 'Eselon II', year: 2026, parentId: 'ss-008', status: 'approved', indikatorCount: 0 },
  ],

  // --- Indikator ---
  indikator: [
    { id: 'ik-001', code: 'IK.01.01', name: 'Volume Produksi Perikanan Tangkap', definition: 'Jumlah total produksi perikanan tangkap dalam satuan ton per tahun', formula: 'Total volume tangkapan ikan (ton)', unit: 'Juta Ton', polarity: 'maximize', baseline: 7.2, dataSource: 'Statistik Perikanan Tangkap', sasaranId: 'ss-003', cascadingParentId: null, status: 'approved', targetTahunan: 8.5 },
    { id: 'ik-002', code: 'IK.01.02', name: 'Nilai Tukar Nelayan (NTN)', definition: 'Rasio indeks harga yang diterima nelayan terhadap indeks harga yang dibayar nelayan', formula: 'NTN = (It/Ib) x 100', unit: 'Indeks', polarity: 'maximize', baseline: 104.2, dataSource: 'BPS, Survei NTN', sasaranId: 'ss-003', cascadingParentId: null, status: 'approved', targetTahunan: 108 },
    { id: 'ik-003', code: 'IK.01.03', name: 'Persentase Kapal Berlisensi', definition: 'Persentase kapal penangkap ikan yang memiliki izin operasi valid', formula: '(Kapal berlisensi / Total kapal terdaftar) x 100%', unit: '%', polarity: 'maximize', baseline: 72, dataSource: 'Sistem Perizinan KKP', sasaranId: 'ss-003', cascadingParentId: null, status: 'verified', targetTahunan: 85 },
    { id: 'ik-004', code: 'IK.02.01', name: 'Volume Produksi Perikanan Budidaya', definition: 'Jumlah total produksi perikanan budidaya', formula: 'Total volume budidaya (ton)', unit: 'Juta Ton', polarity: 'maximize', baseline: 5.8, dataSource: 'Statistik Perikanan Budidaya', sasaranId: 'ss-004', cascadingParentId: null, status: 'verified', targetTahunan: 6.5 },
    { id: 'ik-005', code: 'IK.02.02', name: 'Luas Areal Budidaya Baru', definition: 'Total luas lahan baru yang dikembangkan untuk budidaya perikanan', formula: 'Luas areal (Ha)', unit: 'Ribu Ha', polarity: 'maximize', baseline: 12.5, dataSource: 'Data Spasial DJPB', sasaranId: 'ss-004', cascadingParentId: null, status: 'draft', targetTahunan: 15 },
    { id: 'ik-006', code: 'IK.03.01', name: 'Nilai Ekspor Hasil Perikanan', definition: 'Total nilai ekspor komoditas perikanan', formula: 'Total nilai (USD Miliar)', unit: 'USD Miliar', polarity: 'maximize', baseline: 5.2, dataSource: 'Badan Pusat Statistik', sasaranId: 'ss-002', cascadingParentId: null, status: 'approved', targetTahunan: 6.0 },
    { id: 'ik-007', code: 'IK.01.01.01', name: 'Jumlah Kapal > 30 GT Beroperasi', definition: 'Kapal penangkap ikan berukuran > 30 GT yang aktif beroperasi', formula: 'Jumlah kapal aktif (unit)', unit: 'Unit', polarity: 'maximize', baseline: 4500, dataSource: 'Sistem Pemantauan Kapal', sasaranId: 'ss-006', cascadingParentId: 'ik-001', status: 'approved', targetTahunan: 5200 },
  ],

  // --- Target Periodik ---
  targetPeriodik: [
    { indikatorId: 'ik-001', periodType: 'quarterly', periodNumber: 1, value: 1.8 },
    { indikatorId: 'ik-001', periodType: 'quarterly', periodNumber: 2, value: 3.8 },
    { indikatorId: 'ik-001', periodType: 'quarterly', periodNumber: 3, value: 6.0 },
    { indikatorId: 'ik-001', periodType: 'quarterly', periodNumber: 4, value: 8.5 },
    { indikatorId: 'ik-002', periodType: 'quarterly', periodNumber: 1, value: 105 },
    { indikatorId: 'ik-003', periodType: 'quarterly', periodNumber: 1, value: 76 },
    { indikatorId: 'ik-004', periodType: 'quarterly', periodNumber: 1, value: 1.4 },
    { indikatorId: 'ik-005', periodType: 'quarterly', periodNumber: 1, value: 3.0 },
    { indikatorId: 'ik-006', periodType: 'quarterly', periodNumber: 1, value: 1.3 },
    { indikatorId: 'ik-007', periodType: 'quarterly', periodNumber: 1, value: 4600 },
  ],

  // --- Capaian Periodik ---
  capaian: [
    { id: 'cap-001', indikatorId: 'ik-001', periodType: 'quarterly', periodNumber: 1, value: 1.95, pct: 108.3, narrative: 'Produksi tangkap TW I melebihi target berkat cuaca yang mendukung dan peningkatan armada.', obstacles: 'Beberapa pelabuhan di wilayah timur mengalami kerusakan fasilitas.', solutions: 'Koordinasi perbaikan dengan Ditjen PRL dan Pemda setempat.', status: 'approved', submittedBy: 'usr-002', submittedAt: '2026-04-05', evidenceCount: 2 },
    { id: 'cap-002', indikatorId: 'ik-002', periodType: 'quarterly', periodNumber: 1, value: 106.8, pct: 101.7, narrative: 'NTN sedikit di atas target, menunjukkan daya beli nelayan membaik.', obstacles: 'Harga BBM masih fluktuatif.', solutions: 'Subsidi BBM nelayan diperluas.', status: 'approved', submittedBy: 'usr-002', submittedAt: '2026-04-06', evidenceCount: 1 },
    { id: 'cap-003', indikatorId: 'ik-003', periodType: 'quarterly', periodNumber: 1, value: 74, pct: 97.4, narrative: 'Masih di bawah target karena proses perizinan online masih dalam tahap sosialisasi.', obstacles: 'Sosialisasi di daerah terpencil terhambat.', solutions: 'Penambahan tenaga penyuluh perikanan di daerah.', status: 'verified', submittedBy: 'usr-002', submittedAt: '2026-04-07', evidenceCount: 3 },
    { id: 'cap-004', indikatorId: 'ik-004', periodType: 'quarterly', periodNumber: 1, value: 1.5, pct: 107.1, narrative: 'Produksi budidaya naik signifikan, terutama dari udang vaname.', obstacles: '-', solutions: '-', status: 'submitted', submittedBy: 'usr-006', submittedAt: '2026-04-08', evidenceCount: 2 },
    { id: 'cap-005', indikatorId: 'ik-006', periodType: 'quarterly', periodNumber: 1, value: 1.25, pct: 96.2, narrative: 'Nilai ekspor sedikit di bawah target karena penurunan harga komoditas global.', obstacles: 'Harga tuna dan udang turun di pasar internasional.', solutions: 'Diversifikasi pasar ekspor ke negara-negara baru.', status: 'approved', submittedBy: 'usr-002', submittedAt: '2026-04-04', evidenceCount: 1 },
    { id: 'cap-006', indikatorId: 'ik-007', periodType: 'quarterly', periodNumber: 1, value: 4650, pct: 101.1, narrative: 'Jumlah kapal beroperasi meningkat berkat program revitalisasi kapal.', obstacles: 'Ketersediaan BBM di beberapa pelabuhan terbatas.', solutions: 'Koordinasi dengan Pertamina untuk penambahan SPBN.', status: 'approved', submittedBy: 'usr-002', submittedAt: '2026-04-03', evidenceCount: 2 },
  ],

  // --- Rencana Aksi ---
  rencanaAksi: [
    { id: 'ra-001', indikatorId: 'ik-001', indikatorName: 'Volume Produksi Perikanan Tangkap', activity: 'Revitalisasi 50 Pelabuhan Perikanan', picUserId: 'usr-002', picName: 'Siti Nurhaliza', startDate: '2026-01-15', targetEndDate: '2026-09-30', progress: 35, status: 'in_progress', unitName: 'Ditjen Perikanan Tangkap' },
    { id: 'ra-002', indikatorId: 'ik-001', indikatorName: 'Volume Produksi Perikanan Tangkap', activity: 'Pembangunan Cold Storage di 20 Lokasi', picUserId: 'usr-002', picName: 'Siti Nurhaliza', startDate: '2026-02-01', targetEndDate: '2026-08-31', progress: 20, status: 'in_progress', unitName: 'Ditjen Perikanan Tangkap' },
    { id: 'ra-003', indikatorId: 'ik-003', indikatorName: 'Persentase Kapal Berlisensi', activity: 'Sosialisasi Perizinan Online ke 34 Provinsi', picUserId: 'usr-002', picName: 'Siti Nurhaliza', startDate: '2026-01-10', targetEndDate: '2026-03-31', progress: 60, status: 'delayed', unitName: 'Ditjen Perikanan Tangkap' },
    { id: 'ra-004', indikatorId: 'ik-004', indikatorName: 'Volume Produksi Perikanan Budidaya', activity: 'Distribusi 10 Juta Benih Ikan Unggul', picUserId: 'usr-006', picName: 'Rina Marlina', startDate: '2026-01-20', targetEndDate: '2026-06-30', progress: 45, status: 'in_progress', unitName: 'Ditjen Perikanan Budidaya' },
    { id: 'ra-005', indikatorId: 'ik-006', indikatorName: 'Nilai Ekspor Hasil Perikanan', activity: 'Fasilitasi Pameran Internasional Seafood Expo', picUserId: 'usr-002', picName: 'Siti Nurhaliza', startDate: '2026-03-01', targetEndDate: '2026-05-15', progress: 80, status: 'in_progress', unitName: 'Ditjen Penguatan Daya Saing' },
  ],

  // --- Laporan ---
  laporan: [
    { id: 'lap-001', unitId: 'unit-003', unitName: 'Ditjen Perikanan Tangkap', periodType: 'quarterly', periodLabel: 'TW I 2026', version: 2, status: 'approved', updatedAt: '2026-04-15', createdBy: 'Siti Nurhaliza' },
    { id: 'lap-002', unitId: 'unit-004', unitName: 'Ditjen Perikanan Budidaya', periodType: 'quarterly', periodLabel: 'TW I 2026', version: 1, status: 'submitted', updatedAt: '2026-04-12', createdBy: 'Rina Marlina' },
    { id: 'lap-003', unitId: 'unit-005', unitName: 'Ditjen Penguatan Daya Saing', periodType: 'quarterly', periodLabel: 'TW I 2026', version: 1, status: 'draft', updatedAt: '2026-04-10', createdBy: 'Operator DJPDSPKP' },
    { id: 'lap-004', unitId: 'unit-002', unitName: 'Sekretariat Jenderal', periodType: 'quarterly', periodLabel: 'TW I 2026', version: 1, status: 'under_review', updatedAt: '2026-04-14', createdBy: 'Operator Setjen' },
  ],

  // --- Evaluasi ---
  evaluasi: [
    { id: 'ev-001', unitId: 'unit-003', unitName: 'Ditjen Perikanan Tangkap', periodYear: 2025, periodSemester: 2, component: 'Perencanaan Kinerja', score: 22.5, maxScore: 30, notes: 'Perencanaan sudah baik namun cascading belum optimal.', evaluator: 'Ir. Hendra Wijaya', status: 'completed' },
    { id: 'ev-002', unitId: 'unit-003', unitName: 'Ditjen Perikanan Tangkap', periodYear: 2025, periodSemester: 2, component: 'Pengukuran Kinerja', score: 18.0, maxScore: 25, notes: 'Evidence masih perlu diperkuat.', evaluator: 'Ir. Hendra Wijaya', status: 'completed' },
    { id: 'ev-003', unitId: 'unit-003', unitName: 'Ditjen Perikanan Tangkap', periodYear: 2025, periodSemester: 2, component: 'Pelaporan Kinerja', score: 10.0, maxScore: 15, notes: 'Laporan tepat waktu, narasi baik.', evaluator: 'Ir. Hendra Wijaya', status: 'completed' },
    { id: 'ev-004', unitId: 'unit-004', unitName: 'Ditjen Perikanan Budidaya', periodYear: 2025, periodSemester: 2, component: 'Perencanaan Kinerja', score: 20.0, maxScore: 30, notes: 'Perlu perbaikan definisi indikator.', evaluator: 'Ir. Hendra Wijaya', status: 'completed' },
  ],

  // --- Rekomendasi ---
  rekomendasi: [
    { id: 'rek-001', worksheetId: 'ev-001', unitId: 'unit-003', unitName: 'Ditjen Perikanan Tangkap', description: 'Memperbaiki cascading indikator dari level Eselon I ke Eselon II agar lebih terstruktur dan measurable.', priority: 'high', dueDate: '2026-06-30', status: 'in_progress' },
    { id: 'rek-002', worksheetId: 'ev-002', unitId: 'unit-003', unitName: 'Ditjen Perikanan Tangkap', description: 'Menyediakan evidence yang lebih kuat berupa data primer dan dokumen resmi untuk setiap indikator.', priority: 'medium', dueDate: '2026-05-31', status: 'open' },
    { id: 'rek-003', worksheetId: 'ev-004', unitId: 'unit-004', unitName: 'Ditjen Perikanan Budidaya', description: 'Merevisi definisi operasional indikator agar lebih spesifik dan terukur.', priority: 'high', dueDate: '2026-04-30', status: 'overdue' },
  ],

  // --- Tindak Lanjut ---
  tindakLanjut: [
    { id: 'tl-001', rekomendasiId: 'rek-001', unitName: 'Ditjen Perikanan Tangkap', plan: 'Workshop cascading bersama seluruh unit Eselon II', picUserId: 'usr-002', picName: 'Siti Nurhaliza', dueDate: '2026-06-15', status: 'in_progress', progress: 'Sudah dilaksanakan workshop 1 dari 3 yang direncanakan.' },
    { id: 'tl-002', rekomendasiId: 'rek-003', unitName: 'Ditjen Perikanan Budidaya', plan: 'Revisi seluruh definisi operasional indikator DJPB', picUserId: 'usr-006', picName: 'Rina Marlina', dueDate: '2026-04-30', status: 'overdue', progress: 'Baru 3 dari 8 indikator yang direvisi.' },
  ],

  // --- Dokumen ---
  dokumen: [
    { id: 'dok-001', title: 'Perjanjian Kinerja KKP 2026', type: 'PK', unitName: 'Kementerian (Level 0)', year: 2026, version: 1, status: 'published', uploadedBy: 'Admin Pusat' },
    { id: 'dok-002', title: 'Indikator Kinerja Utama (IKU) KKP 2026', type: 'IKU', unitName: 'Kementerian (Level 0)', year: 2026, version: 2, status: 'published', uploadedBy: 'Admin Pusat' },
    { id: 'dok-003', title: 'Rencana Strategis KKP 2025-2029', type: 'Renstra', unitName: 'Kementerian (Level 0)', year: 2025, version: 1, status: 'published', uploadedBy: 'Admin Pusat' },
    { id: 'dok-004', title: 'LAKIP Ditjen Perikanan Tangkap 2025', type: 'LAKIP', unitName: 'Ditjen Perikanan Tangkap', year: 2025, version: 1, status: 'published', uploadedBy: 'Siti Nurhaliza' },
  ],

  // --- Notifikasi ---
  notifications: [
    { id: 'notif-001', title: 'Capaian diajukan oleh Siti Nurhaliza', message: 'Indikator "Volume Produksi Perikanan Tangkap" TW I telah disubmit.', createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), unread: true, type: 'submit' },
    { id: 'notif-002', title: 'Laporan menunggu reviu', message: 'Ditjen Perikanan Budidaya mengajukan laporan TW I 2026.', createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), unread: true, type: 'review' },
    { id: 'notif-003', title: 'Tindak lanjut overdue', message: 'Revisi definisi indikator DJPB telah melewati batas waktu.', createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), unread: true, type: 'overdue' },
    { id: 'notif-004', title: 'Capaian disetujui', message: 'Indikator "NTN" TW I telah disetujui oleh Reviewer.', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), unread: false, type: 'approved' },
    { id: 'notif-005', title: 'Rencana aksi terlambat', message: 'Sosialisasi Perizinan Online ke 34 Provinsi melewati target selesai.', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), unread: false, type: 'delayed' },
  ],

  // --- Komentar Laporan (Discussion Thread) ---
  laporanComments: [
    { id: 'cmt-001', laporanId: 'lap-001', user: 'Biro Perencanaan', role: 'Reviewer', avatar: 'BP', time: '15 Apr 2026, 14:20', text: 'Laporan sudah lengkap dan akurat. Data capaian volume produksi sesuai dengan evidence yang dilampirkan. Approved! ✅' },
    { id: 'cmt-002', laporanId: 'lap-001', user: 'Siti Nurhaliza', role: 'Operator DJPT', avatar: 'SN', time: '14 Apr 2026, 10:30', text: 'Terima kasih reviewnya. Sudah diperbaiki sesuai catatan reviewer pada versi sebelumnya.' },
    { id: 'cmt-003', laporanId: 'lap-001', user: 'Biro Perencanaan', role: 'Reviewer', avatar: 'BP', time: '13 Apr 2026, 16:15', text: 'Mohon perbaiki narasi analisis pada bagian kendala — perlu ditambahkan data kuantitatif pendukung.' },
    { id: 'cmt-004', laporanId: 'lap-002', user: 'Rina Marlina', role: 'Operator DJPB', avatar: 'RM', time: '12 Apr 2026, 09:00', text: 'Laporan TW I telah disubmit. Mohon direview.' },
    { id: 'cmt-005', laporanId: 'lap-004', user: 'Operator Setjen', role: 'Operator', avatar: 'OS', time: '14 Apr 2026, 16:30', text: 'Laporan sedang dalam proses review. Mohon ditunggu.' },
  ],

  // --- Panduan ---
  panduan: [
    { id: 'pdn-001', title: 'Cara Menyusun Sasaran & Indikator Kinerja', category: 'Perencanaan', summary: 'Panduan langkah demi langkah menyusun sasaran dan indikator kinerja di KinerjaKu Next.' },
    { id: 'pdn-002', title: 'Cara Input Capaian & Upload Evidence', category: 'Pengukuran', summary: 'Tata cara menginput capaian periodik dan mengunggah dokumen pendukung.' },
    { id: 'pdn-003', title: 'Proses Verifikasi dan Approval', category: 'Pengukuran', summary: 'Alur verifikasi berjenjang dan tata cara approve/reject capaian.' },
    { id: 'pdn-004', title: 'Menyusun Laporan Kinerja', category: 'Pelaporan', summary: 'Panduan penyusunan draft laporan hingga generate dokumen final.' },
  ],

  // --- Activity Log (Audit Trail) ---
  activityLog: [
    { id: 'log-001', timestamp: '2026-04-15 14:32', user: 'Siti Nurhaliza', role: 'Operator Level I', action: 'approve', module: 'Pelaporan', detail: 'Menyetujui Laporan Kinerja TW I — Ditjen Perikanan Tangkap (v2)', ip: '10.10.1.45' },
    { id: 'log-002', timestamp: '2026-04-15 14:10', user: 'admin', role: 'Admin Pusat', action: 'review', module: 'Pelaporan', detail: 'Mereview Laporan Kinerja TW I — Sekretariat Jenderal', ip: '10.10.1.10' },
    { id: 'log-003', timestamp: '2026-04-14 16:45', user: 'Operator Setjen', role: 'Operator Level I', action: 'submit', module: 'Pelaporan', detail: 'Mensubmit Laporan Kinerja TW I — Sekretariat Jenderal', ip: '10.10.2.33' },
    { id: 'log-004', timestamp: '2026-04-14 10:20', user: 'admin', role: 'Admin Pusat', action: 'create', module: 'Pengguna', detail: 'Membuat akun pengguna baru: verifikator', ip: '10.10.1.10' },
    { id: 'log-005', timestamp: '2026-04-13 09:15', user: 'Rina Marlina', role: 'Operator Level I', action: 'submit', module: 'Pelaporan', detail: 'Mensubmit Laporan Kinerja TW I — Ditjen Perikanan Budidaya', ip: '10.10.3.21' },
    { id: 'log-006', timestamp: '2026-04-12 11:30', user: 'Siti Nurhaliza', role: 'Operator Level I', action: 'edit', module: 'Pengukuran', detail: 'Mengubah capaian indikator "Volume Produksi Perikanan Tangkap" TW I', ip: '10.10.1.45' },
    { id: 'log-007', timestamp: '2026-04-12 08:05', user: 'admin', role: 'Admin Pusat', action: 'export', module: 'Dokumen', detail: 'Export Laporan Kinerja DJPT ke PDF', ip: '10.10.1.10' },
    { id: 'log-008', timestamp: '2026-04-11 15:42', user: 'Operator DJPDSPKP', role: 'Operator Level I', action: 'create', module: 'Pelaporan', detail: 'Membuat draft Laporan Kinerja TW I — Ditjen PDSPKP', ip: '10.10.4.18' },
    { id: 'log-009', timestamp: '2026-04-11 13:00', user: 'admin', role: 'Admin Pusat', action: 'edit', module: 'Perencanaan', detail: 'Mengubah sasaran strategis "Peningkatan Produksi Perikanan"', ip: '10.10.1.10' },
    { id: 'log-010', timestamp: '2026-04-10 09:30', user: 'auditor', role: 'Auditor', action: 'view', module: 'Evaluasi', detail: 'Melihat Lembar Kerja Evaluasi TW I 2026', ip: '10.10.5.12' },
    { id: 'log-011', timestamp: '2026-04-09 16:10', user: 'admin', role: 'Admin Pusat', action: 'login', module: 'Sistem', detail: 'Login ke sistem KinerjaKu', ip: '10.10.1.10' },
    { id: 'log-012', timestamp: '2026-04-09 14:22', user: 'Siti Nurhaliza', role: 'Operator Level I', action: 'upload', module: 'Pengukuran', detail: 'Upload evidence "Laporan_Produksi_TW1.pdf" untuk IKU Volume Produksi', ip: '10.10.1.45' },
    { id: 'log-013', timestamp: '2026-04-08 10:15', user: 'admin', role: 'Admin Pusat', action: 'edit', module: 'Pengguna', detail: 'Mengubah hak akses pengguna: level3 → Operator Level III', ip: '10.10.1.10' },
    { id: 'log-014', timestamp: '2026-04-07 08:45', user: 'tamu', role: 'Viewer', action: 'view', module: 'Dashboard', detail: 'Melihat Dashboard Kinerja', ip: '192.168.1.100' },
    { id: 'log-015', timestamp: '2026-04-06 11:00', user: 'admin', role: 'Admin Pusat', action: 'login', module: 'Sistem', detail: 'Login ke sistem KinerjaKu', ip: '10.10.1.10' },
  ],

  // --- Helper functions ---
  getUnit(id) { return this.units.find(u => u.id === id); },
  getUser(id) { return this.users.find(u => u.id === id); },
  getIndikator(id) { return this.indikator.find(i => i.id === id); },
  getSasaran(id) { return this.sasaran.find(s => s.id === id); },
  getTarget(indikatorId, periodNumber) {
    return this.targetPeriodik.find(t => t.indikatorId === indikatorId && t.periodNumber === periodNumber);
  },
  getCapaian(indikatorId, periodNumber) {
    return this.capaian.find(c => c.indikatorId === indikatorId && c.periodNumber === periodNumber);
  },
  getIndikatorBySasaran(sasaranId) {
    return this.indikator.filter(i => i.sasaranId === sasaranId);
  },

  // --- Relative Time Helper ---
  timeAgo(isoString) {
    if (!isoString) return '-';
    const now = Date.now();
    const then = new Date(isoString).getTime();
    const diffMs = now - then;
    if (diffMs < 0) return 'Baru saja';
    const seconds = Math.floor(diffMs / 1000);
    if (seconds < 60) return 'Baru saja';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + ' menit lalu';
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + ' jam lalu';
    const days = Math.floor(hours / 24);
    if (days < 7) return days + ' hari lalu';
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return weeks + ' minggu lalu';
    const months = Math.floor(days / 30);
    if (months < 12) return months + ' bulan lalu';
    return Math.floor(days / 365) + ' tahun lalu';
  },

  // --- Notification Helper ---
  pushNotification(type, title, message, targetUnitId = null) {
    const id = 'notif-' + Date.now();
    this.notifications.unshift({
      id, type, title, message, targetUnitId,
      createdAt: new Date().toISOString(),
      unread: true
    });
    // Keep max 20
    if (this.notifications.length > 20) this.notifications.pop();
    this.saveNotifications();
  },

  // --- Activity Log Helper ---
  pushActivityLog(action, module, detail, unitId = null) {
    const u = this.currentUser || {};
    const now = new Date();
    const ts = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    const ip = '10.10.' + Math.floor(Math.random() * 9 + 1) + '.' + Math.floor(Math.random() * 200 + 10);
    this.activityLog.unshift({
      id: 'log-' + Date.now(),
      timestamp: ts,
      user: u.fullName || u.username || 'System',
      role: u.role || '-',
      action, module, detail, ip, unitId
    });
    if (this.activityLog.length > 50) this.activityLog = this.activityLog.slice(0, 50);
    this.saveActivityLog();
  },

  // --- LocalStorage Persistence ---
  saveLaporan() {
    try { localStorage.setItem('kinerjaku_laporan', JSON.stringify(this.laporan)); } catch (e) { }
  },
  saveNotifications() {
    try { localStorage.setItem('kinerjaku_notif', JSON.stringify(this.notifications)); } catch (e) { }
  },
  saveComments() {
    try { localStorage.setItem('kinerjaku_comments', JSON.stringify(this.laporanComments)); } catch (e) { }
  },
  saveIndikator() {
    try {
      localStorage.setItem('kinerjaku_indikator', JSON.stringify(this.indikator));
      localStorage.setItem('kinerjaku_target', JSON.stringify(this.targetPeriodik));
      localStorage.setItem('kinerjaku_capaian', JSON.stringify(this.capaian));
    } catch (e) { }
  },
  saveSasaran() {
    try { localStorage.setItem('kinerjaku_sasaran', JSON.stringify(this.sasaran)); } catch (e) { }
  },
  saveActivityLog() {
    try { localStorage.setItem('kinerjaku_actlog', JSON.stringify(this.activityLog)); } catch (e) { }
  },
  loadPersisted() {
    try {
      const lap = localStorage.getItem('kinerjaku_laporan');
      if (lap) this.laporan = JSON.parse(lap);
      const notif = localStorage.getItem('kinerjaku_notif');
      if (notif) {
        this.notifications = JSON.parse(notif);
        let migrated = false;
        this.notifications.forEach(n => {
          if (!n.createdAt) {
            n.createdAt = new Date().toISOString();
            migrated = true;
          }
        });
        if (migrated) this.saveNotifications();
      }
      const cmt = localStorage.getItem('kinerjaku_comments');
      if (cmt) this.laporanComments = JSON.parse(cmt);
      const ik = localStorage.getItem('kinerjaku_indikator');
      if (ik) this.indikator = JSON.parse(ik);
      const tgt = localStorage.getItem('kinerjaku_target');
      if (tgt) this.targetPeriodik = JSON.parse(tgt);
      const cap = localStorage.getItem('kinerjaku_capaian');
      if (cap) this.capaian = JSON.parse(cap);
      const sas = localStorage.getItem('kinerjaku_sasaran');
      if (sas) this.sasaran = JSON.parse(sas);
      const alog = localStorage.getItem('kinerjaku_actlog');
      if (alog) this.activityLog = JSON.parse(alog);
      const units = localStorage.getItem('kinerjaku_units');
      if (units) this.units = JSON.parse(units);
    } catch (e) { }
  },
  resetData() {
    ['kinerjaku_laporan', 'kinerjaku_notif', 'kinerjaku_comments', 'kinerjaku_indikator', 'kinerjaku_target', 'kinerjaku_capaian', 'kinerjaku_sasaran', 'kinerjaku_actlog', 'kinerjaku_units'].forEach(k => localStorage.removeItem(k));
    location.reload();
  }
};

// Load persisted data on startup
MockData.loadPersisted();
