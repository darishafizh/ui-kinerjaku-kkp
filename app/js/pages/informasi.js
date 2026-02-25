/* ============================================
   KinerjaKu Next — Informasi Lainnya
   ============================================ */

const InformasiPage = {
  activeTab: 'unit_kerja',

  render() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Informasi Lainnya</h1>
          <p class="text-muted" style="margin-top:4px">Unit kerja, pengguna, panduan, dan profil akun</p>
        </div>
      </div>
      <div id="info-content">${this.renderContent()}</div>`;
  },

  switchTab(tabId) { this.activeTab = tabId; App.renderPage(); },

  renderContent() {
    switch (this.activeTab) {
      case 'unit_kerja': return this.renderUnitKerja();
      case 'pengguna': return this.renderPengguna();
      case 'panduan': return this.renderPanduan();
      case 'profil': return this.renderProfil();
      case 'log': return this.renderLog();
      default: return this.renderUnitKerja();
    }
  },

  renderUnitKerja() {
    return `
      ${UI.toolbar('Cari unit kerja...', [
      { label: '＋ Tambah Unit', class: 'btn-primary', action: 'InformasiPage.showAddUnit()' }
    ])}
      ${UI.table([
      { label: 'Kode', key: 'code' },
      { label: 'Nama Unit Kerja', key: 'name' },
      { label: 'Level', render: r => `<span class="badge badge-draft">${r.level}</span>` },
      { label: 'Pimpinan', key: 'head' },
      { label: 'Status', render: r => r.active ? UI.badge('approved', 'Aktif') : UI.badge('draft', 'Nonaktif') },
      {
        label: 'Aksi', render: r => `
          <button class="btn btn-ghost btn-sm" title="Edit" onclick="InformasiPage.showEditUnit('${r.id}')">✏️</button>
          <button class="btn btn-ghost btn-sm" title="Hapus" onclick="InformasiPage.confirmDeleteUnit('${r.id}')">🗑️</button>`
      }
    ], MockData.units)}`;
  },

  showAddUnit() {
    const parentOptions = MockData.units.filter(u => u.level <= 1).sort((a, b) => a.code.localeCompare(b.code)).map(u =>
      `<option value="${u.id}">${u.code} - ${u.name}</option>`
    ).join('');
    const fS = 'display:flex;align-items:center;margin-bottom:16px';
    const lS = 'width:150px;font-weight:600;font-size:13px;color:#333;flex-shrink:0';
    const content = `
      <div style="${fS}">
        <label style="${lS}">Kode Unit</label>
        <input id="add-unit-code" class="form-input" placeholder="Contoh: 0101000000" style="flex:1">
      </div>
      <div style="${fS}">
        <label style="${lS}">Nama Unit Kerja</label>
        <input id="add-unit-name" class="form-input" placeholder="Nama lengkap unit kerja" style="flex:1">
      </div>
      <div style="${fS}">
        <label style="${lS}">Level</label>
        <select id="add-unit-level" class="form-select" style="flex:1">
          <option value="0">0 — Kementerian</option>
          <option value="1" selected>1 — Eselon I</option>
          <option value="2">2 — Eselon II</option>
          <option value="3">3 — Eselon III</option>
        </select>
      </div>
      <div style="${fS}">
        <label style="${lS}">Unit Kerja Atasan</label>
        <select id="add-unit-parent" class="form-select" style="flex:1">
          <option value="">— Tidak ada —</option>
          ${parentOptions}
        </select>
      </div>
      <div style="${fS}">
        <label style="${lS}">Pimpinan</label>
        <input id="add-unit-head" class="form-input" placeholder="Jabatan pimpinan unit" style="flex:1">
      </div>
      <div style="${fS}">
        <label style="${lS}">Status</label>
        <select id="add-unit-status" class="form-select" style="flex:1">
          <option value="true">Aktif</option>
          <option value="false">Non-Aktif</option>
        </select>
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="InformasiPage.saveAddUnit()">💾 Simpan</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Tambah Unit Kerja', content, footer);
  },

  saveAddUnit() {
    const code = document.getElementById('add-unit-code')?.value?.trim();
    const name = document.getElementById('add-unit-name')?.value?.trim();
    const level = parseInt(document.getElementById('add-unit-level')?.value || '1');
    const parentId = document.getElementById('add-unit-parent')?.value || null;
    const head = document.getElementById('add-unit-head')?.value?.trim() || '';
    const active = document.getElementById('add-unit-status')?.value === 'true';
    if (!code || !name) {
      const el = !code ? document.getElementById('add-unit-code') : document.getElementById('add-unit-name');
      if (el) { el.style.border = '2px solid #e74c3c'; el.focus(); el.onfocus = () => el.style.border = ''; }
      return;
    }
    MockData.units.push({
      id: 'unit-' + Date.now(),
      code, name, level, parentId, head, active
    });
    try { localStorage.setItem('kinerjaku_units', JSON.stringify(MockData.units)); } catch (e) { }
    MockData.pushActivityLog('create', 'Informasi', `Menambah unit kerja baru "${name}"`);
    MockData.pushNotification('info', 'Unit kerja ditambahkan', `Unit kerja "${name}" berhasil ditambahkan.`);
    App.closeModal();
    App.renderPage();
  },

  showEditUnit(unitId) {
    const u = MockData.getUnit(unitId);
    if (!u) return;
    const parentOptions = MockData.units.filter(x => x.level <= 1 && x.id !== unitId).sort((a, b) => a.code.localeCompare(b.code)).map(x =>
      `<option value="${x.id}" ${u.parentId === x.id ? 'selected' : ''}>${x.code} - ${x.name}</option>`
    ).join('');
    const fS = 'display:flex;align-items:center;margin-bottom:16px';
    const lS = 'width:150px;font-weight:600;font-size:13px;color:#333;flex-shrink:0';
    const content = `
      <div style="${fS}"><label style="${lS}">Kode</label><input id="edit-u-code" class="form-input" value="${u.code}" style="flex:1"></div>
      <div style="${fS}"><label style="${lS}">Nama Unit</label><input id="edit-u-name" class="form-input" value="${u.name}" style="flex:1"></div>
      <div style="${fS}"><label style="${lS}">Level</label>
        <select id="edit-u-level" class="form-select" style="flex:1">
          ${[0, 1, 2, 3].map(l => `<option value="${l}" ${u.level === l ? 'selected' : ''}>${l}</option>`).join('')}
        </select></div>
      <div style="${fS}"><label style="${lS}">Unit Kerja Atasan</label>
        <select id="edit-u-parent" class="form-select" style="flex:1"><option value="">— Tidak ada —</option>${parentOptions}</select></div>
      <div style="${fS}"><label style="${lS}">Pimpinan</label><input id="edit-u-head" class="form-input" value="${u.head || ''}" style="flex:1"></div>
      <div style="${fS}"><label style="${lS}">Status</label>
        <select id="edit-u-status" class="form-select" style="flex:1">
          <option value="true" ${u.active !== false ? 'selected' : ''}>Aktif</option>
          <option value="false" ${u.active === false ? 'selected' : ''}>Non-Aktif</option>
        </select></div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="InformasiPage.saveEditUnit('${unitId}')">💾 Simpan</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Edit Unit Kerja', content, footer);
  },

  saveEditUnit(unitId) {
    const u = MockData.getUnit(unitId);
    if (!u) return;
    const name = document.getElementById('edit-u-name')?.value?.trim();
    if (!name) { document.getElementById('edit-u-name').style.border = '2px solid #e74c3c'; return; }
    u.code = document.getElementById('edit-u-code')?.value?.trim() || u.code;
    u.name = name;
    u.level = parseInt(document.getElementById('edit-u-level')?.value) || 0;
    u.parentId = document.getElementById('edit-u-parent')?.value || null;
    u.head = document.getElementById('edit-u-head')?.value?.trim() || '';
    u.active = document.getElementById('edit-u-status')?.value === 'true';
    try { localStorage.setItem('kinerjaku_units', JSON.stringify(MockData.units)); } catch (e) { }
    MockData.pushActivityLog('edit', 'Informasi', `Mengubah unit kerja "${name}"`);
    App.closeModal();
    App.renderPage();
  },

  confirmDeleteUnit(unitId) {
    const u = MockData.getUnit(unitId);
    if (!u) return;
    if (u.level === 0) { alert('Unit kerja level 0 tidak dapat dihapus!'); return; }
    const content = `
      <div style="text-align:center;padding:20px 0">
        <div style="font-size:3rem;margin-bottom:12px">⚠️</div>
        <p style="font-size:15px;color:#333;margin:0 0 8px">Apakah Anda yakin ingin menghapus unit kerja <strong>"${u.name}"</strong>?</p>
        <p style="font-size:13px;color:#718096;margin:0">Tindakan ini tidak dapat dibatalkan.</p>
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn" style="background:#dc2626;color:#fff;border:none;padding:6px 20px" onclick="InformasiPage.deleteUnit('${unitId}')">🗑️ Hapus</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Konfirmasi Hapus', content, footer);
  },

  deleteUnit(unitId) {
    const idx = MockData.units.findIndex(u => u.id === unitId);
    const name = idx >= 0 ? MockData.units[idx].name : '';
    if (idx >= 0) MockData.units.splice(idx, 1);
    try { localStorage.setItem('kinerjaku_units', JSON.stringify(MockData.units)); } catch (e) { }
    MockData.pushActivityLog('delete', 'Informasi', `Menghapus unit kerja "${name}"`);
    App.closeModal();
    App.renderPage();
  },

  renderPengguna() {
    const roles = [
      { id: 'admin_pusat', name: 'Administrator', desc: 'Full access — kelola semua data, konfigurasi sistem, dan manajemen pengguna.' },
      { id: 'unit_level0', name: 'Operator Level 0', desc: 'Kelola data level Kementerian (Perencanaan, Pengukuran, Pelaporan, Evaluasi, Dokumen).' },
      { id: 'unit_level1', name: 'Operator Level I', desc: 'Kelola data unit Eselon I (Perencanaan, Pengukuran, Pelaporan, Dokumen).' },
      { id: 'unit_level2', name: 'Operator Level II', desc: 'Kelola data unit Eselon II (Perencanaan, Pengukuran, Dokumen).' },
      { id: 'unit_level3', name: 'Operator Level III', desc: 'Kelola data unit Eselon III (Perencanaan, Pengukuran, Dokumen terbatas).' },
      { id: 'auditor', name: 'Auditor', desc: 'Monitoring dan evaluasi — Evaluasi, Pelaporan, Dokumen (read-only).' },
      { id: 'tamu', name: 'Viewer', desc: 'Hanya melihat (view-only) — Dashboard, Dokumen, dan Informasi.' },
    ];
    const modules = ['Dashboard', 'Perencanaan', 'Pengukuran', 'Pelaporan', 'Evaluasi', 'Dokumen', 'Informasi', 'Pengguna'];
    const matrix = {
      admin_pusat: ['✅', '✅', '✅', '✅', '✅', '✅', '✅', '✅'],
      unit_level0: ['✅', '✅', '✅', '✅', '✅', '✅', '✅', '—'],
      unit_level1: ['✅', '✅', '✅', '✅', '—', '✅', '✅', '—'],
      unit_level2: ['✅', '✅', '✅', '—', '—', '✅', '✅', '—'],
      unit_level3: ['✅', '✅', '✅', '—', '—', '📄', '✅', '—'],
      auditor: ['✅', '—', '—', '👁', '✅', '👁', '✅', '—'],
      tamu: ['👁', '—', '—', '—', '—', '👁', '📄', '—'],
    };

    const allRows = LoginPage.accounts.map(a => ({
      name: a.username,
      unit: a.unitName ? a.unitName.toUpperCase() : 'KEMENTERIAN KELAUTAN DAN PERIKANAN'
    }));
    const thS = 'padding:8px 10px;font-weight:700;font-size:12px;border:1px solid #dee2e6;background:#f8f9fa;text-align:left;vertical-align:middle';
    const tdS = 'padding:8px 10px;font-size:13px;border:1px solid #eee;vertical-align:middle';
    const thM = 'padding:6px 8px;font-weight:700;font-size:11px;border:1px solid #dee2e6;background:#f8f9fa;text-align:center;vertical-align:middle';
    const tdM = 'padding:6px 8px;font-size:13px;border:1px solid #eee;text-align:center;vertical-align:middle';

    return `
      <div class="card mb-lg">
        <div class="card-header" style="padding:16px 20px;border-bottom:1px solid #e5e7eb">
          <h3 style="margin:0;font-size:16px;font-weight:700;color:#0C4A6E">
            <em>User Roles</em> dan <em>Access Permissions</em>
            <span style="font-weight:400;color:#64748b;font-size:13px;margin-left:8px">(Role-Based Access Control / RBAC)</span>
          </h3>
        </div>
        <div style="padding:20px">

          <h4 style="font-size:14px;font-weight:700;color:#0C4A6E;margin:0 0 8px">Daftar <em>User Roles</em></h4>
          <p style="font-size:13px;color:#475569;margin:0 0 12px">Daftar <em>User Roles</em> yang dibutuhkan beserta deskripsi tugas dan tanggung jawab masing-masing peran: <strong>Administrator, Operator, Auditor, Viewer,</strong> dan sebagainya.</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:28px">
            <thead><tr>
              <th style="${thS};width:40px">No</th>
              <th style="${thS};width:180px">Role</th>
              <th style="${thS}">Deskripsi Tugas & Tanggung Jawab</th>
            </tr></thead>
            <tbody>
              ${roles.map((r, i) => '<tr>' +
      '<td style="' + tdS + ';text-align:center">' + (i + 1) + '</td>' +
      '<td style="' + tdS + ';font-weight:600;color:#0C4A6E">' + r.name + '</td>' +
      '<td style="' + tdS + '">' + r.desc + '</td></tr>').join('')}
            </tbody>
          </table>

          <h4 style="font-size:14px;font-weight:700;color:#0C4A6E;margin:0 0 8px">Matriks <em>Access Permissions</em></h4>
          <p style="font-size:13px;color:#475569;margin:0 0 12px">Siapa yang bisa <em>Create, Read, Update, Delete, Approve,</em> dan <em>View-Only</em> pada modul/fitur tertentu.</p>
          <div style="overflow-x:auto;margin-bottom:8px">
            <table style="width:100%;border-collapse:collapse">
              <thead><tr>
                <th style="${thM};text-align:left;min-width:140px">Role \\ Modul</th>
                ${modules.map(m => '<th style="' + thM + ';min-width:80px">' + m + '</th>').join('')}
              </tr></thead>
              <tbody>
                ${roles.map(r => '<tr>' +
        '<td style="' + tdM + ';text-align:left;font-weight:600;color:#334155">' + r.name + '</td>' +
        matrix[r.id].map(v => '<td style="' + tdM + '">' + v + '</td>').join('') +
        '</tr>').join('')}
              </tbody>
            </table>
          </div>
          <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:12px;color:#64748b;margin-bottom:28px">
            <span>✅ = CRUD (Full)</span>
            <span>👁 = View-Only</span>
            <span>📄 = Akses Terbatas</span>
            <span>— = Tidak ada akses</span>
          </div>

          <h4 style="font-size:14px;font-weight:700;color:#0C4A6E;margin:0 0 8px">Catatan Aktivitas & Pembatasan Akses</h4>
          <ul style="font-size:13px;color:#475569;line-height:2;margin:0 0 0 20px;padding:0">
            <li>Kebutuhan fitur catatan aktivitas (<em>Log</em>), dan pembatasan akses per unit kerja.</li>
            <li>Setiap operator hanya dapat melihat dan mengelola data unit kerjanya sendiri.</li>
            <li>Administrator memiliki akses lintas unit dan dapat mengelola seluruh pengguna.</li>
            <li>Auditor memiliki akses <em>read-only</em> ke seluruh data untuk monitoring dan evaluasi.</li>
          </ul>
        </div>
      </div>

      <div style="border:1px solid #dee2e6;border-radius:4px;padding:16px 20px;margin-bottom:16px;background:#fff;display:flex;align-items:center;justify-content:space-between">
        <h2 style="font-size:18px;font-weight:700;margin:0">Daftar Pengguna</h2>
        <div style="display:flex;gap:6px">
          ${['admin_pusat'].includes(MockData.currentUser.roleId) ? '<button style="padding:6px 16px;font-size:13px;background:#5cb85c;border:1px solid #5cb85c;color:#fff;cursor:pointer;border-radius:4px" onclick="InformasiPage.showAddPengguna()">Tambah Pengguna</button>' : ''}
        </div>
      </div>
      <div style="border:1px solid #dee2e6;border-radius:4px;overflow-x:auto;background:#fff">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-bottom:1px solid #eee">
          <div style="font-size:13px;color:#555"><select style="padding:3px 6px;font-size:12px;border:1px solid #ccc;border-radius:3px;margin-right:4px" onchange="UI.paginateTable(this)"><option>25</option><option>50</option><option>100</option></select> records per page</div>
          <div style="font-size:13px;color:#555">Search: <input type="text" style="padding:3px 8px;font-size:12px;border:1px solid #ccc;border-radius:3px;width:150px" oninput="InformasiPage.filterPenggunaTable(this.value)" /></div>
        </div>
        <table style="width:100%;border-collapse:collapse">
          <thead><tr>
            <th style="${thS};width:50px">No ↕</th>
            <th style="${thS}">Nama User ↕</th>
            <th style="${thS}">Unit Kerja ↕</th>
            <th style="${thS};width:260px;text-align:center">Aksi ↕</th>
          </tr></thead>
          <tbody>
            ${allRows.map((r, i) => '<tr>' +
          '<td style="' + tdS + '">' + (i + 1) + '</td>' +
          '<td style="' + tdS + '">' + r.name + '</td>' +
          '<td style="' + tdS + '">' + r.unit + '</td>' +
          '<td style="' + tdS + ';text-align:center">' +
          (['admin_pusat'].includes(MockData.currentUser.roleId) ?
            '<button style="padding:3px 10px;font-size:11px;background:#5bc0de;border:1px solid #5bc0de;color:#fff;cursor:pointer;border-radius:3px;margin-right:4px" onclick="InformasiPage.showAksesMenu(\'' + r.name + '\')">' + 'Akses Menu</button>' +
            '<button style="padding:3px 10px;font-size:11px;background:#f0ad4e;border:1px solid #f0ad4e;color:#fff;cursor:pointer;border-radius:3px;margin-right:4px" onclick="InformasiPage.showEditUser(\'' + r.name + '\',\'' + r.unit.replace(/'/g, '') + '\')">' + 'Edit</button>' +
            '<button style="padding:3px 10px;font-size:11px;background:#d9534f;border:1px solid #d9534f;color:#fff;cursor:pointer;border-radius:3px" onclick="InformasiPage.confirmDeleteUser(\'' + r.name + '\')">' + 'Hapus</button>'
            : '<span style="font-size:12px;color:#94a3b8">\u2014</span>') +
          '</td></tr>').join('')}
          </tbody>
        </table>
        <div style="padding:10px 16px;font-size:12px;color:#888;border-top:1px solid #eee">Showing 1 to ${allRows.length} of ${allRows.length} entries</div>
      </div>`;
  },

  showAksesMenu(username) {
    const menuGroups = [
      { group: 'Informasi Lainnya', items: ['Informasi Unit Kerja', 'Informasi Pengguna', 'Skor Kinerja'] },
      { group: 'Perencanaan', items: ['Perspektif', 'Sasaran', 'Indikator Kinerja', 'Pohon Kinerja', 'Dokumen Kinerja', 'Rencana Aksi'] },
      { group: 'Pengukuran dan Penilaian', items: ['Pengukuran Kinerja', 'Status Pengukuran', 'Validasi Capaian Kinerja', 'Verifikasi Capaian Kinerja', 'Realisasi Rencana Aksi', 'Kinerja Dekon/TP', 'Laporan Kinerja'] },
      { group: 'Evaluasi', items: ['Komponen/Sub Komponen/Kriteria', 'LKE', 'LKE Gabungan', 'Rekomendasi & Tindak Lanjut'] }
    ];
    // Load saved permissions
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem('kinerjaku_access_' + username)) || {}; } catch (e) { }
    const isAdminUser = username === 'admin' || username === 'auditor';
    const thS = 'padding:8px 12px;font-weight:700;font-size:12px;border-bottom:2px solid #dee2e6;text-align:center';
    const tdS = 'padding:8px 12px;font-size:13px;border-bottom:1px solid #f1f5f9';
    const sel = (itemKey, perm, defaultVal) => {
      const val = saved[itemKey] ? (saved[itemKey][perm] || defaultVal) : defaultVal;
      return `<select data-item="${itemKey}" data-perm="${perm}" style="padding:3px 6px;font-size:12px;border:1px solid #d1d5db;border-radius:4px;background:${val === 'Iya' ? '#e8f5e9' : '#fff5e6'};color:#333;min-width:60px"><option ${val === 'Iya' ? 'selected' : ''}>Iya</option><option ${val === 'Tidak' ? 'selected' : ''}>Tidak</option></select>`;
    };
    let rows = '';
    menuGroups.forEach(g => {
      rows += `<tr><td colspan="5" style="${tdS};font-weight:700;color:#0C4A6E;background:#f8fafc;padding:10px 12px">${g.group}</td></tr>`;
      g.items.forEach(item => {
        const key = item.replace(/[^a-zA-Z0-9]/g, '_');
        const defaultAccess = isAdminUser || !['Skor Kinerja', 'Perspektif'].includes(item);
        const hasAccess = saved[key] ? saved[key].access : defaultAccess;
        const defaultDelete = isAdminUser || !['Informasi Unit Kerja', 'Skor Kinerja', 'Perspektif'].includes(item);
        rows += `<tr>
          <td style="${tdS};padding-left:28px">${item}</td>
          <td style="${tdS};text-align:center"><input type="checkbox" data-item="${key}" data-perm="access" ${hasAccess ? 'checked' : ''} style="width:16px;height:16px;accent-color:#3b82f6"></td>
          <td style="${tdS};text-align:center">${sel(key, 'tambah', 'Iya')}</td>
          <td style="${tdS};text-align:center">${sel(key, 'hapus', defaultDelete ? 'Iya' : 'Tidak')}</td>
          <td style="${tdS};text-align:center">${sel(key, 'edit', 'Iya')}</td>
        </tr>`;
      });
    });
    const content = `
      <div style="margin-bottom:16px"><strong>User :</strong> ${username.toUpperCase()}</div>
      <div id="akses-table" style="max-height:60vh;overflow-y:auto;border:1px solid #dee2e6;border-radius:4px">
        <table style="width:100%;border-collapse:collapse">
          <thead><tr>
            <th style="${thS};text-align:left;width:auto">Menu</th>
            <th style="${thS};width:70px">Akses</th>
            <th style="${thS};width:80px">Tambah</th>
            <th style="${thS};width:80px">Hapus</th>
            <th style="${thS};width:80px">Edit</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
    const footer = `
      <button class="btn" style="background:#d9534f;color:#fff;border:none;padding:6px 20px" onclick="App.closeModal()">Tutup</button>
      <button class="btn" style="background:#337ab7;color:#fff;border:none;padding:6px 20px" onclick="InformasiPage.saveAksesMenu('${username}')">Simpan</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Akses User', content, footer, 'lg');
  },

  saveAksesMenu(username) {
    const container = document.getElementById('akses-table');
    if (!container) return;
    const perms = {};
    // Read checkboxes
    container.querySelectorAll('input[type="checkbox"][data-item]').forEach(cb => {
      const key = cb.getAttribute('data-item');
      if (!perms[key]) perms[key] = {};
      perms[key].access = cb.checked;
    });
    // Read selects
    container.querySelectorAll('select[data-item]').forEach(sel => {
      const key = sel.getAttribute('data-item');
      const perm = sel.getAttribute('data-perm');
      if (!perms[key]) perms[key] = {};
      perms[key][perm] = sel.value;
    });
    try { localStorage.setItem('kinerjaku_access_' + username, JSON.stringify(perms)); } catch (e) { }
    MockData.pushActivityLog('edit', 'Informasi', `Mengubah akses menu pengguna "${username}"`);
    MockData.pushNotification('info', 'Akses diperbarui', `Akses menu pengguna "${username}" berhasil disimpan.`);
    App.closeModal();
  },

  showEditUser(username, unitName) {
    const account = LoginPage.accounts.find(a => a.username === username);
    const currentPass = account ? account.password : 's4k1pKKP';
    const currentUnitName = account ? (account.unitName || unitName) : unitName;
    const roleMap = {
      'admin_pusat': 'Admin', 'unit_level0': 'Operator Level 0', 'unit_level1': 'Operator Level I',
      'unit_level2': 'Operator Level II', 'unit_level3': 'Operator Level III', 'auditor': 'Auditor',
      'operator_unit': 'Operator Level I', 'tamu': 'Viewer'
    };
    const currentTipe = account ? (roleMap[account.roleId] || 'Viewer') : 'Viewer';
    const lingkupOptions = MockData.units.filter(u => u.level <= 1).sort((a, b) => a.code.localeCompare(b.code)).map(u =>
      `<option value="${u.id}" ${u.name === unitName ? 'selected' : ''}>${u.code} - ${u.name}</option>`
    ).join('');
    const tipeOptions = ['Admin', 'Operator Level 0', 'Operator Level I', 'Operator Level II', 'Operator Level III', 'Auditor', 'Viewer'].map(t =>
      `<option ${t === currentTipe ? 'selected' : ''}>${t}</option>`
    ).join('');
    const fS = 'display:flex;align-items:center;margin-bottom:16px';
    const lS = 'width:150px;font-weight:600;font-size:13px;color:#333;flex-shrink:0';
    const content = `
      <div style="${fS}">
        <label style="${lS}">Unit Kerja Lingkup</label>
        <select id="edit-lingkup" class="form-select" style="flex:1">${lingkupOptions}</select>
      </div>
      <div style="${fS}">
        <label style="${lS}">Unit Kerja</label>
        <input id="edit-unit" class="form-input" value="${currentUnitName}" style="flex:1">
      </div>
      <div style="${fS}">
        <label style="${lS}">Nama User</label>
        <input id="edit-username" class="form-input" value="${username}" style="flex:1">
      </div>
      <div style="${fS}">
        <label style="${lS}">Password</label>
        <input id="edit-password" class="form-input" value="${currentPass}" style="flex:1">
      </div>
      <div style="${fS}">
        <label style="${lS}">Tipe User</label>
        <select id="edit-tipe" class="form-select" style="flex:1">${tipeOptions}</select>
      </div>
      <div style="${fS}">
        <label style="${lS}">Status</label>
        <select id="edit-status" class="form-select" style="flex:1">
          <option>Aktif</option>
          <option>Non-Aktif</option>
        </select>
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn" style="background:#337ab7;color:#fff;border:none;padding:6px 20px" onclick="InformasiPage.saveEditUser('${username}')">Submit</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Edit Data Pengguna', content, footer);
  },

  saveEditUser(originalUsername) {
    const newUsername = document.getElementById('edit-username')?.value?.trim();
    const newPass = document.getElementById('edit-password')?.value?.trim();
    const newTipe = document.getElementById('edit-tipe')?.value;
    if (!newUsername) { const el = document.getElementById('edit-username'); el.style.border = '2px solid #e74c3c'; el.focus(); el.onfocus = () => el.style.border = ''; return; }
    if (!newPass) { const el = document.getElementById('edit-password'); el.style.border = '2px solid #e74c3c'; el.focus(); el.onfocus = () => el.style.border = ''; return; }
    if (newUsername !== originalUsername && LoginPage.accounts.find(a => a.username === newUsername)) { alert('Username sudah digunakan!'); return; }
    const account = LoginPage.accounts.find(a => a.username === originalUsername);
    if (account) {
      account.username = newUsername;
      account.password = newPass;
      account.unitName = document.getElementById('edit-unit')?.value?.trim() || account.unitName;
      account.unitId = document.getElementById('edit-lingkup')?.value || account.unitId;
      const tipeMap = { 'Admin': 'admin_pusat', 'Operator Level 0': 'unit_level0', 'Operator Level I': 'unit_level1', 'Operator Level II': 'unit_level2', 'Operator Level III': 'unit_level3', 'Auditor': 'auditor', 'Viewer': 'tamu' };
      if (tipeMap[newTipe]) account.roleId = tipeMap[newTipe];
      try { localStorage.setItem('kinerjaku_accounts', JSON.stringify(LoginPage.accounts)); } catch (e) { }
    }
    MockData.pushActivityLog('edit', 'Informasi', `Mengubah data pengguna "${originalUsername}"${newUsername !== originalUsername ? ` → "${newUsername}"` : ''}`);
    MockData.pushNotification('info', 'Data pengguna diubah', `Data pengguna "${newUsername}" berhasil diperbarui.`);
    App.closeModal();
    App.renderPage();
  },

  showAddPengguna() {
    const lingkupOptions = MockData.units.filter(u => u.level <= 1).sort((a, b) => a.code.localeCompare(b.code)).map(u =>
      `<option value="${u.id}" data-name="${u.name}">${u.code} - ${u.name}</option>`
    ).join('');
    const tipeOptions = ['Admin', 'Operator Level 0', 'Operator Level I', 'Operator Level II', 'Operator Level III', 'Auditor', 'Viewer'].map(t =>
      `<option>${t}</option>`
    ).join('');
    const fS = 'display:flex;align-items:center;margin-bottom:16px';
    const lS = 'width:150px;font-weight:600;font-size:13px;color:#333;flex-shrink:0';
    const content = `
      <div style="${fS}">
        <label style="${lS}">Lingkup Unit Kerja</label>
        <select id="new-lingkup" class="form-select" style="flex:1" onchange="InformasiPage.updateUnitDropdown(this.value)">${lingkupOptions}</select>
      </div>
      <div style="${fS}">
        <label style="${lS}">Unit Kerja</label>
        <input id="new-unit" class="form-input" placeholder="Nama unit kerja" style="flex:1">
      </div>
      <div style="${fS}">
        <label style="${lS}">Username</label>
        <input id="new-username" class="form-input" placeholder="Username login" style="flex:1">
      </div>
      <div style="${fS}">
        <label style="${lS}">Password</label>
        <input id="new-password" class="form-input" value="s4k1pKKP" style="flex:1">
      </div>
      <div style="${fS}">
        <label style="${lS}">Tipe User</label>
        <select id="new-tipe" class="form-select" style="flex:1">${tipeOptions}</select>
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="InformasiPage.saveAddPengguna()">💾 Simpan</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Tambah Pengguna Baru', content, footer);
    // Auto-populate unit dropdown for first lingkup
    const firstLingkup = MockData.units.filter(u => u.level <= 1).sort((a, b) => a.code.localeCompare(b.code))[0];
    if (firstLingkup) this.updateUnitDropdown(firstLingkup.id);
  },

  updateUnitDropdown(lingkupId) {
    const unitSel = document.getElementById('new-unit');
    if (!unitSel) return;
    const children = MockData.units.filter(u => u.parentId === lingkupId).sort((a, b) => a.code.localeCompare(b.code));
    const parent = MockData.getUnit(lingkupId);
    let opts = parent ? `<option value="${parent.id}" data-name="${parent.name}">${parent.code} - ${parent.name}</option>` : '';
    opts += children.map(u => `<option value="${u.id}" data-name="${u.name}">${u.code} - ${u.name}</option>`).join('');
    unitSel.innerHTML = opts;
  },

  saveAddPengguna() {
    const username = document.getElementById('new-username')?.value?.trim();
    const password = document.getElementById('new-password')?.value?.trim();
    const tipe = document.getElementById('new-tipe')?.value;
    const lingkupSel = document.getElementById('new-lingkup');
    const unitId = lingkupSel?.value || '';
    const unitName = document.getElementById('new-unit')?.value?.trim() || '';
    if (!username) { const el = document.getElementById('new-username'); el.style.border = '2px solid #e74c3c'; el.focus(); el.onfocus = () => el.style.border = ''; return; }
    if (!password) { const el = document.getElementById('new-password'); el.style.border = '2px solid #e74c3c'; el.focus(); el.onfocus = () => el.style.border = ''; return; }
    if (LoginPage.accounts.find(a => a.username === username)) { alert('Username sudah digunakan!'); return; }
    const tipeMap = { 'Admin': 'admin_pusat', 'Operator Level 0': 'unit_level0', 'Operator Level I': 'unit_level1', 'Operator Level II': 'unit_level2', 'Operator Level III': 'unit_level3', 'Auditor': 'auditor', 'Viewer': 'tamu' };
    const roleId = tipeMap[tipe] || 'tamu';
    const newAccount = { username, password, unitId, unitName, roleId, role: tipe, fullName: unitName, avatar: username.substring(0, 2).toUpperCase(), nip: '-', email: username + '@kkp.go.id' };
    LoginPage.accounts.push(newAccount);
    try { localStorage.setItem('kinerjaku_accounts', JSON.stringify(LoginPage.accounts)); } catch (e) { }
    MockData.pushActivityLog('create', 'Informasi', `Menambah pengguna baru "${username}"`);
    MockData.pushNotification('success', 'Pengguna ditambahkan', `Pengguna "${username}" berhasil ditambahkan.`);
    App.closeModal();
    App.renderPage();
  },

  confirmDeleteUser(username) {
    if (username === 'admin') { alert('Akun admin tidak dapat dihapus!'); return; }
    const content = `
      <div style="text-align:center;padding:20px 0">
        <div style="font-size:3rem;margin-bottom:12px">⚠️</div>
        <p style="font-size:15px;color:#333;margin:0 0 8px">Apakah Anda yakin ingin menghapus pengguna <strong>"${username}"</strong>?</p>
        <p style="font-size:13px;color:#718096;margin:0">Tindakan ini tidak dapat dibatalkan.</p>
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn" style="background:#dc2626;color:#fff;border:none;padding:6px 20px" onclick="InformasiPage.deletePengguna('${username}')">🗑️ Hapus</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Konfirmasi Hapus', content, footer);
  },

  deletePengguna(username) {
    const idx = LoginPage.accounts.findIndex(a => a.username === username);
    if (idx >= 0) LoginPage.accounts.splice(idx, 1);
    try { localStorage.setItem('kinerjaku_accounts', JSON.stringify(LoginPage.accounts)); } catch (e) { }
    MockData.pushActivityLog('delete', 'Informasi', `Menghapus pengguna "${username}"`);
    MockData.pushNotification('warning', 'Pengguna dihapus', `Pengguna "${username}" berhasil dihapus.`);
    App.closeModal();
    App.renderPage();
  },

  filterPenggunaTable(term) {
    const tables = document.querySelectorAll('.main-content table');
    const table = tables[tables.length - 1]; // last table is the pengguna table
    if (!table) return;
    const rows = table.querySelectorAll('tbody tr');
    const search = (term || '').toLowerCase();
    rows.forEach(row => {
      row.style.display = !search || row.textContent.toLowerCase().includes(search) ? '' : 'none';
    });
  },

  renderPanduan() {
    return `
      <div class="search-bar mb-lg" style="max-width:400px">
        <span class="search-bar-icon">🔍</span>
        <input type="text" placeholder="Cari panduan atau FAQ..." />
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:var(--space-md);margin-bottom:var(--space-xl)">
        ${MockData.panduan.map(p => `
          <div class="card" style="cursor:pointer">
            <div class="card-body">
              <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-sm)">
                <span class="badge badge-submitted">${p.category}</span>
              </div>
              <h3 style="margin-bottom:var(--space-sm)">${p.title}</h3>
              <p style="font-size:0.8125rem;color:var(--neutral-600)">${p.summary}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <h2 class="mb-md">❓ FAQ (Pertanyaan Umum)</h2>
      ${UI.accordion([
      { title: 'Bagaimana cara menginput capaian kinerja?', content: '<p>Navigasi ke modul Pengukuran Kinerja → tab "Input Capaian". Pilih indikator terkait, isi nilai capaian, narasi, dan upload evidence. Simpan sebagai draft atau langsung submit.</p>' },
      { title: 'Apa yang harus dilakukan jika capaian ditolak?', content: '<p>Buka modul Pengukuran → tab "Riwayat". Cari capaian berstatus Rejected, baca catatan reviewer, perbaiki data/evidence, lalu re-submit.</p>' },
      { title: 'Bagaimana cara melihat pohon kinerja?', content: '<p>Buka modul Dokumen → tab "Pohon Kinerja". Navigasi secara drill-down dari Level 0 (Kementerian) hingga Level III.</p>' },
      { title: 'Siapa yang dapat meng-generate laporan PDF?', content: '<p>Hanya Admin Pusat dan Reviewer Biro Perencanaan yang memiliki akses generate laporan setelah laporan berstatus Approved.</p>' },
    ])}`;
  },

  renderProfil() {
    const u = MockData.currentUser;
    return `
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3 class="card-title">👤 Informasi Profil</h3></div>
          <div class="card-body">
            <div style="display:flex;align-items:center;gap:var(--space-lg);margin-bottom:var(--space-lg)">
              <div style="width:80px;height:80px;background:linear-gradient(135deg,var(--primary-500),var(--accent-500));border-radius:50%;display:flex;align-items:center;justify-content:center;font:700 1.75rem/1 var(--font-family);color:white">${u.avatar}</div>
              <div>
                <h2>${u.fullName}</h2>
                <p class="text-muted">${u.role} — ${u.unitName}</p>
              </div>
            </div>
            <table>
              <tbody>
                <tr><td style="font-weight:600;width:150px">Unit Kerja</td><td>${u.unitName}</td></tr>
                <tr><td style="font-weight:600">Username</td><td>${u.username}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  },

  // ── Activity Log (Audit Trail) ─────────────
  renderLog() {
    const logs = MockData.activityLog || [];
    const actionIcons = { login: '🔑', edit: '✏️', create: '➕', submit: '📨', approve: '✅', reject: '❌', review: '📋', view: '👁️', export: '📥', upload: '📤', delete: '🗑️' };
    const actionLabels = { login: 'Login', edit: 'Edit', create: 'Create', submit: 'Submit', approve: 'Approve', reject: 'Reject', review: 'Review', view: 'View', export: 'Export', upload: 'Upload', delete: 'Delete' };
    const actionColors = { login: '#64748b', edit: '#f59e0b', create: '#22c55e', submit: '#3b82f6', approve: '#15803d', reject: '#dc2626', review: '#8b5cf6', view: '#6b7280', export: '#0ea5e9', upload: '#0d9488', delete: '#ef4444' };

    // Stats
    const totalActions = logs.length;
    const uniqueUsers = [...new Set(logs.map(l => l.user))].length;
    const todayStr = new Date().toISOString().split('T')[0];
    const todayCount = logs.filter(l => l.timestamp.startsWith(todayStr)).length;
    const actionBreakdown = {};
    logs.forEach(l => { actionBreakdown[l.action] = (actionBreakdown[l.action] || 0) + 1; });

    const thS = 'padding:10px 12px;font-weight:700;font-size:12px;border-bottom:2px solid #e2e8f0;background:#f8fafc;text-align:left;vertical-align:middle';
    const tdS = 'padding:10px 12px;font-size:13px;border-bottom:1px solid #f1f5f9;vertical-align:middle';

    return `
      <!-- Stats Cards -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px">
        <div class="card" style="padding:20px;text-align:center">
          <div style="font-size:2rem;font-weight:800;color:#0C4A6E">${totalActions}</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px">Total Aktivitas</div>
        </div>
        <div class="card" style="padding:20px;text-align:center">
          <div style="font-size:2rem;font-weight:800;color:#0d9488">${uniqueUsers}</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px">Pengguna Aktif</div>
        </div>
        <div class="card" style="padding:20px;text-align:center">
          <div style="font-size:2rem;font-weight:800;color:#f59e0b">${todayCount}</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px">Aktivitas Hari Ini</div>
        </div>
        <div class="card" style="padding:20px;text-align:center">
          <div style="font-size:2rem;font-weight:800;color:#8b5cf6">${Object.keys(actionBreakdown).length}</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px">Jenis Aksi</div>
        </div>
      </div>

      <!-- Log Table -->
      <div class="card">
        <div style="padding:16px 20px;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between">
          <h3 style="margin:0;font-size:16px;font-weight:700;color:#0C4A6E">📋 Riwayat Aktivitas (Audit Trail)</h3>
          <div style="display:flex;gap:8px">
            <select style="padding:6px 10px;font-size:12px;border:1px solid #e2e8f0;border-radius:6px;color:#475569">
              <option>Semua Aksi</option>
              ${Object.keys(actionLabels).map(k => '<option>' + actionLabels[k] + '</option>').join('')}
            </select>
            <select style="padding:6px 10px;font-size:12px;border:1px solid #e2e8f0;border-radius:6px;color:#475569">
              <option>Semua Modul</option>
              ${[...new Set(logs.map(l => l.module))].map(m => '<option>' + m + '</option>').join('')}
            </select>
          </div>
        </div>
        <div class="table-container">
          <table style="width:100%;border-collapse:collapse">
            <thead><tr>
              <th style="${thS};width:160px">Waktu</th>
              <th style="${thS};width:150px">Pengguna</th>
              <th style="${thS};width:120px">Role</th>
              <th style="${thS};width:90px;text-align:center">Aksi</th>
              <th style="${thS};width:100px">Modul</th>
              <th style="${thS}">Detail</th>
              <th style="${thS};width:110px">IP Address</th>
            </tr></thead>
            <tbody>
              ${logs.map(l => '<tr style="transition:background 0.15s"' +
      ' onmouseenter="this.style.background=\'#f8fafc\'"' +
      ' onmouseleave="this.style.background=\'\'\'">' +
      '<td style="' + tdS + ';color:#94a3b8;font-size:12px;white-space:nowrap">' + l.timestamp + '</td>' +
      '<td style="' + tdS + ';font-weight:600;color:#334155">' + l.user + '</td>' +
      '<td style="' + tdS + '"><span style="font-size:11px;padding:2px 8px;border-radius:10px;background:#f1f5f9;color:#475569">' + l.role + '</span></td>' +
      '<td style="' + tdS + ';text-align:center"><span style="display:inline-flex;align-items:center;gap:4px;font-size:12px;padding:3px 10px;border-radius:12px;background:' + (actionColors[l.action] || '#64748b') + '15;color:' + (actionColors[l.action] || '#64748b') + ';font-weight:600">' + (actionIcons[l.action] || '📝') + ' ' + (actionLabels[l.action] || l.action) + '</span></td>' +
      '<td style="' + tdS + '">' + l.module + '</td>' +
      '<td style="' + tdS + ';color:#475569">' + l.detail + '</td>' +
      '<td style="' + tdS + ';font-family:monospace;font-size:11px;color:#94a3b8">' + l.ip + '</td>' +
      '</tr>').join('')}
            </tbody>
          </table>
        </div>
        <div style="padding:12px 20px;border-top:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#94a3b8">
          <span>Menampilkan ${logs.length} dari ${logs.length} entri</span>
          <span>Data disimpan selama 90 hari</span>
        </div>
      </div>`;
  }
};
