/* ============================================
   KinerjaKu Next — Login Page
   ============================================ */

const LoginPage = {
  accounts: [
    // Admin & Level-based
    { username: 'admin', password: 'admin123', unitId: 'unit-001', unitName: 'Biro Perencanaan', roleId: 'admin_pusat', role: 'Admin Pusat', fullName: 'Biro Perencanaan', avatar: 'BP', nip: '199012152015011001', email: 'admin@kkp.go.id' },
    { username: 'level0', password: 'level0123', unitId: 'unit-001', unitName: 'Biro Perencanaan', roleId: 'unit_level0', role: 'Unit Level 0', fullName: 'Unit Level 0', avatar: 'L0', nip: '198507222012012003', email: 'level0@kkp.go.id' },
    { username: 'level1', password: 'level1123', unitId: 'unit-002', unitName: 'Sekretariat Jenderal', roleId: 'unit_level1', role: 'Unit Level I', fullName: 'Unit Level I', avatar: 'L1', nip: '197803102006041002', email: 'level1@kkp.go.id' },
    { username: 'level2', password: 'level2123', unitId: 'unit-001', unitName: 'Biro Perencanaan', roleId: 'unit_level2', role: 'Unit Level II', fullName: 'Unit Level II', avatar: 'L2', nip: '198801202015012001', email: 'level2@kkp.go.id' },
    { username: 'level3', password: 'level3123', unitId: 'unit-009', unitName: 'Bagian Perencanaan Umum', roleId: 'unit_level3', role: 'Unit Level III', fullName: 'Unit Level III', avatar: 'L3', nip: '198203102010011005', email: 'level3@kkp.go.id' },
    { username: 'auditor', password: 'auditor123', unitId: 'unit-008', unitName: 'Inspektorat Jenderal', roleId: 'auditor', role: 'Auditor (Itjen)', fullName: 'Auditor', avatar: 'AU', nip: '196805151993031003', email: 'auditor@kkp.go.id' },
    { username: 'tamu', password: 'tamu123', unitId: 'unit-000', unitName: 'Kementerian Kelautan dan Perikanan', roleId: 'tamu', role: 'Tamu / KemenPANRB', fullName: 'Tamu', avatar: 'TM', nip: '-', email: 'tamu@menpan.go.id' },
    // Per Ditjen / Biro
    { username: 'setjen', password: 'setjen123', unitId: 'unit-002', unitName: 'Sekretariat Jenderal', roleId: 'operator_unit', role: 'Operator Setjen', fullName: 'Sekretariat Jenderal', avatar: 'SJ', nip: '197505151999031010', email: 'setjen@kkp.go.id' },
    { username: 'djpt', password: 'djpt123', unitId: 'unit-003', unitName: 'Ditjen Perikanan Tangkap', roleId: 'operator_unit', role: 'Operator DJPT', fullName: 'Ditjen Perikanan Tangkap', avatar: 'PT', nip: '197505151999031011', email: 'djpt@kkp.go.id' },
    { username: 'djpb', password: 'djpb123', unitId: 'unit-004', unitName: 'Ditjen Perikanan Budi Daya', roleId: 'operator_unit', role: 'Operator DJPB', fullName: 'Ditjen Perikanan Budi Daya', avatar: 'PB', nip: '197505151999031012', email: 'djpb@kkp.go.id' },
    { username: 'djpkrl', password: 'djpkrl123', unitId: 'unit-006', unitName: 'Ditjen Pengelolaan Kelautan dan Ruang Laut', roleId: 'operator_unit', role: 'Operator DJPKRL', fullName: 'Ditjen Pengelolaan Kelautan & RL', avatar: 'KR', nip: '197505151999031013', email: 'djpkrl@kkp.go.id' },
    { username: 'djpdspkp', password: 'djpdspkp123', unitId: 'unit-005', unitName: 'Ditjen Penguatan Daya Saing Produk KP', roleId: 'operator_unit', role: 'Operator DJPDSPKP', fullName: 'Ditjen Penguatan Daya Saing', avatar: 'DS', nip: '197505151999031014', email: 'djpdspkp@kkp.go.id' },
    { username: 'djpsdkp', password: 'djpsdkp123', unitId: 'unit-psdkp', unitName: 'Ditjen Pengawasan SDKP', roleId: 'operator_unit', role: 'Operator DJPSDKP', fullName: 'Ditjen Pengawasan SDKP', avatar: 'SD', nip: '197505151999031015', email: 'djpsdkp@kkp.go.id' },
    { username: 'itjen', password: 'itjen123', unitId: 'unit-007', unitName: 'Inspektorat Jenderal', roleId: 'operator_unit', role: 'Operator Itjen', fullName: 'Inspektorat Jenderal', avatar: 'IJ', nip: '197505151999031016', email: 'itjen@kkp.go.id' },
    { username: 'brsdm', password: 'brsdm123', unitId: 'unit-brsdm', unitName: 'BRSDM Kelautan dan Perikanan', roleId: 'operator_unit', role: 'Operator BRSDM', fullName: 'BRSDM KP', avatar: 'BR', nip: '197505151999031017', email: 'brsdm@kkp.go.id' },
    { username: 'bppmhkp', password: 'bppmhkp123', unitId: 'unit-bppmhkp', unitName: 'BPPMHKP', roleId: 'operator_unit', role: 'Operator BPPMHKP', fullName: 'BPPMHKP', avatar: 'BM', nip: '197505151999031018', email: 'bppmhkp@kkp.go.id' },
  ],

  render() {
    return `
      <div class="login-page">
        <div class="login-bg-pattern"></div>
        <div class="login-contour"></div>
        <div class="login-particles">
          <div class="login-particle"></div>
          <div class="login-particle"></div>
          <div class="login-particle"></div>
          <div class="login-particle"></div>
          <div class="login-particle"></div>
          <div class="login-particle"></div>
        </div>

        <div class="login-branding">
          <h2 class="login-branding-line1">Sistem Aplikasi</h2>
          <h2 class="login-branding-line2">Pengelolaan <em>Kinerja</em></h2>
          <img src="assets/login-illustration.png" alt="Illustration" class="login-illustration" />
        </div>

        <div class="login-card">
          <div class="login-header">
            <div class="login-logo"><img src="assets/logo-kinerjaku.png" alt="Logo KKP" style="width:120px;height:120px;object-fit:contain"></div>
            <h1 class="login-title">KinerjaKu</h1>
            <p class="login-subtitle">Aplikasi Pengelolaan Kinerja Organisasi Terintegrasi</p>
            <p class="login-subtitle" style="margin-top:2px">Kementerian Kelautan dan Perikanan</p>
          </div>

          <div class="login-error" id="login-error">
            ⚠️ <span id="login-error-text">Username atau password salah.</span>
          </div>

          <form class="login-form" onsubmit="LoginPage.handleLogin(event)">
            <div class="form-group">
              <label class="form-label">Username</label>
              <input class="form-input" type="text" id="login-username" placeholder="Masukkan username" />
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input class="form-input" type="password" id="login-password" placeholder="Masukkan password" />
            </div>
            <button type="submit" class="login-submit">Masuk</button>
          </form>

          <div class="login-forgot">
            <a href="#">Lupa Password?</a>
          </div>
        </div>

        <div class="login-contact">
          <p><strong>Kontak Pengaduan Layanan Biro Perencanaan</strong></p>
          <p>Email : pusatlayananroren@kkp.go.id</p>
          <p>Telp : 0821-2495-3333</p>
        </div>
      </div>`;
  },

  handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const err = document.getElementById('login-error');

    if (!username || !password) {
      err.classList.add('show');
      document.getElementById('login-error-text').textContent = 'Username dan password wajib diisi.';
      return;
    }

    const account = this.accounts.find(a => a.username === username && a.password === password);
    if (!account) {
      err.classList.add('show');
      document.getElementById('login-error-text').textContent = 'Username atau password salah.';
      return;
    }

    Object.assign(MockData.currentUser, {
      unitId: account.unitId,
      unitName: account.unitName,
      roleId: account.roleId,
      role: account.role,
      fullName: account.fullName,
      avatar: account.avatar || 'U',
      username: account.username,
      nip: account.nip || '-',
      email: account.email || '-',
    });
    App.isLoggedIn = true;
    localStorage.setItem('kinerjaku_loggedIn', 'true');
    localStorage.setItem('kinerjaku_user', JSON.stringify(MockData.currentUser));
    MockData.pushActivityLog('login', 'Sistem', 'Login ke sistem KinerjaKu');
    App.navigate('dashboard');
  }
};

// Load persisted account changes (e.g. password updates by admin)
try {
  const savedAccounts = localStorage.getItem('kinerjaku_accounts');
  if (savedAccounts) LoginPage.accounts = JSON.parse(savedAccounts);
} catch (e) { }
