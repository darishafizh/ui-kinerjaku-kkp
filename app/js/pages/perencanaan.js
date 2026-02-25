/* ============================================
   KinerjaKu Next — Perencanaan Kinerja
   Two-level flow: Unit List → Sasaran Detail
   ============================================ */

const PerencanaanPage = {
  activeTab: 'sasaran',

  /* ── Sasaran sub-view state ─────────────── */
  sasaranView: 'unit_list',   // 'unit_list' | 'sasaran_detail'
  selectedUnitId: null,
  selectedYear: 2026,
  filterUnitId: null,         // filter override on detail page
  lingkupUnitId: 'unit-000',  // Unit Kerja Lingkup filter (default: Kementerian)
  indikatorLingkupUnitId: 'unit-000', // Unit Kerja Lingkup filter for Indikator tab
  indikatorView: 'unit_list', // 'unit_list' | 'indikator_detail'
  rencanaAksiLingkupUnitId: 'unit-000', // Unit Kerja Lingkup filter for Rencana Aksi tab
  rencanaAksiSearch: '',

  // Helper: get a unit and its direct children
  getUnitAndChildrenIds(unitId) {
    const ids = [unitId];
    MockData.units.filter(u => u.parentId === unitId).forEach(c => ids.push(c.id));
    return ids;
  },

  render() {
    const titles = {
      sasaran: this.sasaranView === 'sasaran_detail' ? 'Daftar Sasaran Unit Kerja' : 'Sasaran Kinerja',
      indikator: 'Indikator Kinerja',
      rencana_aksi: 'Rencana Aksi'
    };
    const subtitles = {
      sasaran: this.sasaranView === 'sasaran_detail' ? this._getSelectedUnitName() : 'Pilih unit kerja untuk melihat daftar sasaran',
      indikator: 'Pengelolaan indikator kinerja seluruh unit',
      rencana_aksi: 'Pengelolaan rencana aksi dan milestone'
    };

    const showHeader = this.activeTab !== 'sasaran' || this.sasaranView === 'sasaran_detail';

    return `
      ${showHeader ? `<div class="page-header">
        <div>
          <h1 class="page-title">${titles[this.activeTab]}</h1>
          <p class="text-muted" style="margin-top:4px">${subtitles[this.activeTab]}</p>
        </div>
      </div>` : ''}
      <div id="perencanaan-content">${this.renderContent()}</div>`;
  },

  renderContent() {
    switch (this.activeTab) {
      case 'sasaran':
        return this.sasaranView === 'sasaran_detail'
          ? this.renderSasaranDetail()
          : this.renderUnitList();
      case 'indikator':
        return this.indikatorView === 'indikator_detail'
          ? this.renderIndikatorDetail()
          : this.renderIndikatorAll();
      case 'rencana_aksi': return this.renderRencanaAksi();
      default: return this.renderUnitList();
    }
  },

  switchTab(tabId) {
    this.activeTab = tabId;
    if (tabId === 'sasaran') this.sasaranView = 'unit_list'; // reset
    if (tabId === 'indikator') this.indikatorView = 'unit_list'; // reset
    if (tabId === 'rencana_aksi') this.rencanaAksiSearch = ''; // reset search
    const routeMap = { sasaran: 'perencanaan_sasaran', indikator: 'perencanaan_indikator', rencana_aksi: 'perencanaan_rencana_aksi' };
    App.navigate(routeMap[tabId] || 'perencanaan_sasaran');
  },

  /* ═══════════════════════════════════════════
     LEVEL 1: Unit List (Sasaran tab default)
     ═══════════════════════════════════════════ */
  renderUnitList() {
    // Get units to display based on lingkup filter
    // Sync with global unit filter if set
    if (App.activeUnitFilter && App.activeUnitFilter !== 'all') {
      this.lingkupUnitId = App.activeUnitFilter;
    }
    const lingkupId = this.lingkupUnitId || 'unit-000';
    const visibleIds = this.getUnitAndChildrenIds(lingkupId);
    const filteredUnits = MockData.units
      .filter(u => visibleIds.includes(u.id))
      .sort((a, b) => a.code.localeCompare(b.code));

    // Build Unit Kerja Lingkup options (only Level 0 + Level 1, sorted by code)
    const lingkupUnits = MockData.units.filter(u => u.level <= 1).sort((a, b) => a.code.localeCompare(b.code));
    const lingkupOptions = `<option value="" disabled>Belum di pilih...</option>` + lingkupUnits.map(u =>
      `<option value="${u.id}" ${u.id === lingkupId ? 'selected' : ''}>${u.code} - ${u.name}</option>`
    ).join('');

    const isTutupActive = lingkupId !== 'unit-000';

    return `
      <!-- ── Filter Panel ───────────────────────── -->
      <div class="sasaran-filter-panel">
        <div class="sasaran-filter-fields">
          <div class="form-group" style="margin-bottom:0;min-width:320px">
            <label class="form-label" style="color:var(--neutral-600);margin-bottom:6px">Unit Kerja Lingkup</label>
            <select class="form-select" onchange="PerencanaanPage.lingkupUnitId=this.value;App.renderPage()">${lingkupOptions}</select>
          </div>
          <div class="form-group" style="margin-bottom:0;min-width:90px">
            <label class="form-label" style="color:var(--neutral-600);margin-bottom:6px">Tahun</label>
            <select class="form-select">
              <option value="2026" selected>2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
        <div class="sasaran-filter-actions">
          <button class="btn ${isTutupActive ? 'btn-accent' : 'btn-secondary'}" ${isTutupActive ? '' : 'disabled style="opacity:0.5"'} onclick="PerencanaanPage.lingkupUnitId='unit-000';App.renderPage()">✕ Tutup</button>
        </div>
      </div>

      <!-- ── Unit Table (flat, like reference) ─────────────────────── -->
      <div class="table-container" style="font-size:13px;border:1px solid #dee2e6;border-radius:4px;overflow-x:auto">
          <table style="min-width:1000px">
            <thead>
              <tr>
                <th style="width:35px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">No</th>
                <th style="width:45px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Level</th>
                <th style="width:90px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Kode</th>
                <th style="text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Unit Kerja</th>
                <th style="width:220px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Unit Kerja Atasan</th>
                <th style="width:70px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Jumlah Sasaran</th>
                <th style="width:75px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Jumlah<br>Sasaran<br>Tidak<br>Digunakan</th>
                <th style="width:140px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${filteredUnits.map((u, i) => {
      const parent = u.parentId ? MockData.getUnit(u.parentId) : null;
      const sasaranCount = MockData.sasaran.filter(s => s.unitId === u.id).length;
      const unusedCount = MockData.sasaran.filter(s => s.unitId === u.id && s.status !== 'approved' && s.status !== 'verified').length;
      return `
                <tr style="border-bottom:1px solid #eee">
                  <td style="text-align:center;padding:10px 6px">${i + 1}</td>
                  <td style="text-align:center;padding:10px 6px">${u.level}</td>
                  <td style="padding:10px 6px">${u.code}</td>
                  <td style="padding:10px 6px">${u.name}</td>
                  <td style="padding:10px 6px">${parent ? parent.name : ''}</td>
                  <td style="text-align:center;padding:10px 6px">${sasaranCount}</td>
                  <td style="text-align:center;padding:10px 6px">${unusedCount}</td>
                  <td style="text-align:center;padding:10px 6px;white-space:nowrap">
                    <button class="btn btn-success btn-sm" style="font-size:11px;padding:3px 8px;margin-right:4px" onclick="PerencanaanPage.openSasaranDetail('${u.id}')">Lihat</button>
                    <button class="btn btn-sm" style="font-size:11px;padding:3px 8px;background:#fff;border:1px solid #ccc;color:#333" onclick="PerencanaanPage.openPohonKinerja('${u.id}')">Pohon Kinerja</button>
                  </td>
                </tr>`;
    }).join('')}
            </tbody>
          </table>
      </div>`;
  },

  openPohonKinerja(unitId) {
    App.navigate('dokumen_pohon');
  },

  openSasaranDetail(unitId) {
    this.selectedUnitId = unitId;
    this.filterUnitId = unitId;
    this.sasaranView = 'sasaran_detail';
    App.renderPage();
    window.scrollTo(0, 0);
  },

  closeSasaranDetail() {
    this.sasaranView = 'unit_list';
    this.selectedUnitId = null;
    App.renderPage();
    window.scrollTo(0, 0);
  },

  _getSelectedUnitName() {
    const u = MockData.getUnit(this.filterUnitId || this.selectedUnitId);
    return u ? u.name : '';
  },

  /* ═══════════════════════════════════════════
     LEVEL 2: Daftar Sasaran Unit Kerja
     ═══════════════════════════════════════════ */
  renderSasaranDetail() {
    const activeUnit = this.filterUnitId || this.selectedUnitId;
    const unit = MockData.getUnit(activeUnit);
    const sasaranList = MockData.sasaran.filter(s => s.unitId === activeUnit && s.year === this.selectedYear);
    const isEditor = ['admin_pusat', 'operator_unit', 'auditor', 'unit_level0', 'unit_level1', 'unit_level2', 'unit_level3'].includes(MockData.currentUser.roleId);
    const isAdmin = ['admin_pusat', 'auditor'].includes(MockData.currentUser.roleId);

    // Build unit dropdown options (scoped by RBAC)
    const unitOptions = MockData.units.filter(u => u.level !== 0).map(u =>
      `<option value="${u.id}" ${u.id === activeUnit ? 'selected' : ''}>${u.name}</option>`
    ).join('');

    return `
      <!-- ── Filter Panel ───────────────────────── -->
      <div class="sasaran-filter-panel">
        <div class="sasaran-filter-fields">
          <div class="form-group" style="margin-bottom:0;min-width:280px">
            <label class="form-label" style="color:var(--neutral-600);margin-bottom:6px">Unit Kerja Lingkup</label>
            <select class="form-select" onchange="PerencanaanPage.filterUnitId=this.value;App.renderPage()">
              ${unitOptions}
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0;min-width:120px">
            <label class="form-label" style="color:var(--neutral-600);margin-bottom:6px">Tahun</label>
            <select class="form-select" onchange="PerencanaanPage.selectedYear=parseInt(this.value);App.renderPage()">
              <option value="2026" ${this.selectedYear === 2026 ? 'selected' : ''}>2026</option>
              <option value="2025" ${this.selectedYear === 2025 ? 'selected' : ''}>2025</option>
            </select>
          </div>
        </div>
        <div class="sasaran-filter-actions">
          ${isEditor ? `<button class="btn btn-primary" onclick="PerencanaanPage.showAddSasaran()">＋ Tambah</button>` : ''}
          <button class="btn btn-secondary" onclick="PerencanaanPage.closeSasaranDetail()">✕ Tutup</button>
        </div>
      </div>

      <!-- ── Unit Info Banner ─────────────────── -->
      <div class="sasaran-unit-banner">
        <div class="sasaran-unit-banner-icon">🏢</div>
        <div>
          <div style="font-weight:700;font-size:1rem;color:var(--neutral-900)">${unit ? unit.name : ''}</div>
          <div style="font-size:0.8125rem;color:var(--neutral-600)">${unit ? unit.level + ' • ' + unit.head : ''} • Tahun ${this.selectedYear}</div>
        </div>
        <div style="margin-left:auto;display:flex;align-items:center;gap:var(--space-sm)">
          <div style="text-align:center">
            <div style="font-weight:700;font-size:1.5rem;color:var(--primary-600)">${sasaranList.length}</div>
            <div style="font-size:0.6875rem;color:var(--neutral-500);text-transform:uppercase;letter-spacing:0.05em">Sasaran</div>
          </div>
        </div>
      </div>

      <!-- ── Table Daftar Sasaran ─────────────── -->
      ${this._renderSasaranTable(sasaranList, isAdmin, isEditor)}
    `;
  },

  _renderSasaranTable(sasaranList, isAdmin, isEditor) {
    if (!sasaranList.length) {
      return `
        <div class="card">
          <div class="empty-state">
            <div class="empty-state-icon">📋</div>
            <div class="empty-state-title">Belum Ada Sasaran</div>
            <div class="empty-state-text">Belum ada sasaran untuk unit kerja ini pada tahun yang dipilih. ${isEditor ? 'Klik <strong>Tambah</strong> untuk membuat sasaran baru.' : ''}</div>
            ${isEditor ? '<button class="btn btn-primary" onclick="PerencanaanPage.showAddSasaran()">＋ Tambah Sasaran</button>' : ''}
          </div>
        </div>`;
    }

    return `
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="width:50px">No</th>
                <th style="width:90px">Kode</th>
                <th>Sasaran</th>
                <th>Sasaran Atasan</th>
                <th style="width:120px">Status</th>
                <th style="width:90px">Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${sasaranList.map((s, i) => {
      const parent = s.parentId ? MockData.getSasaran(s.parentId) : null;
      const statusClass = s.status === 'approved' || s.status === 'verified' ? 'badge-approved' : 'badge-draft';
      const statusLabel = s.status === 'approved' || s.status === 'verified' ? 'Digunakan' : 'Tidak Digunakan';
      return `
                  <tr>
                    <td style="text-align:center;color:var(--neutral-500);font-weight:500">${i + 1}</td>
                    <td><span style="font-weight:600;color:var(--primary-700)">${s.code}</span></td>
                    <td style="line-height:1.5">${s.name}</td>
                    <td style="color:var(--neutral-600);line-height:1.5">${parent ? `<span style="font-weight:500;color:var(--primary-600)">${parent.code}</span> — ${parent.name}` : '<span class="text-muted">—</span>'}</td>
                    <td><span class="badge badge-dot ${statusClass}">${statusLabel}</span></td>
                    <td>
                      <div style="display:flex;gap:4px">
                        ${isEditor ? '<button class="btn btn-accent btn-sm" onclick="PerencanaanPage.showEditSasaran(\x27' + s.id + '\x27)" title="Edit Sasaran">✏️ Edit</button>' : ''}
                        ${isAdmin ? '<button class="btn btn-sm" style="background:#dc2626;color:#fff;border:none" onclick="PerencanaanPage.deleteSasaran(\'' + s.id + '\')" title="Hapus">🗑️</button>' : ''}
                      </div>
                    </td>
                  </tr>`;
    }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  deleteSasaran(id) {
    const s = MockData.getSasaran(id);
    if (!s) return;
    const relatedIK = MockData.indikator.filter(ik => ik.sasaranId === id);
    const content = `
      <div style="text-align:center;padding:var(--space-xl)">
        <div style="font-size:4rem;margin-bottom:var(--space-md)">⚠️</div>
        <h2 style="color:#dc2626;margin-bottom:var(--space-sm)">Hapus Sasaran?</h2>
        <p class="text-muted"><strong>${s.code}</strong> — ${s.name}</p>
        ${relatedIK.length ? '<p style="font-size:13px;color:#dc2626;margin-top:8px">' + relatedIK.length + ' indikator terkait juga akan dihapus.</p>' : ''}
        <p style="font-size:13px;color:#dc2626;margin-top:4px">Tindakan ini tidak dapat dibatalkan.</p>
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn" style="background:#dc2626;color:#fff;border:none" onclick="PerencanaanPage.confirmDeleteSasaran('${id}')">🗑️ Ya, Hapus</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Konfirmasi Hapus', content, footer);
  },

  confirmDeleteSasaran(id) {
    const relatedIKIds = MockData.indikator.filter(ik => ik.sasaranId === id).map(ik => ik.id);
    MockData.sasaran = MockData.sasaran.filter(s => s.id !== id);
    MockData.indikator = MockData.indikator.filter(ik => ik.sasaranId !== id);
    MockData.targetPeriodik = MockData.targetPeriodik.filter(t => !relatedIKIds.includes(t.indikatorId));
    MockData.capaian = MockData.capaian.filter(c => !relatedIKIds.includes(c.indikatorId));
    MockData.saveSasaran();
    MockData.saveIndikator();
    MockData.pushNotification('info', 'Sasaran dihapus', `Sasaran "${s.code}" beserta ${relatedIKIds.length} indikator terkait telah dihapus.`);
    MockData.pushActivityLog('delete', 'Perencanaan', `Menghapus sasaran "${s.code}" beserta ${relatedIKIds.length} indikator terkait`);
    App.closeModal();
    App.renderPage();
  },

  /* ═══════════════════════════════════════════
     FORM: Tambah Sasaran (Modal)
     ═══════════════════════════════════════════ */
  showAddSasaran() {
    const unit = MockData.getUnit(this.filterUnitId || this.selectedUnitId);
    const unitLevel = unit ? unit.level : '';
    const needParent = unitLevel !== 0;

    // Possible parent sasaran (from parent units)
    const parentSasaranOptions = MockData.sasaran
      .filter(s => s.year === this.selectedYear)
      .map(s => {
        const u = MockData.getUnit(s.unitId);
        return { value: s.id, label: `${s.code} — ${s.name} (${u ? u.name : ''})` };
      });

    const content = `
      <div style="background:var(--primary-50);padding:var(--space-md);border-radius:var(--radius-sm);margin-bottom:var(--space-lg);border-left:3px solid var(--primary-500)">
        <div style="font-weight:600;color:var(--primary-800)">Unit Kerja: ${unit ? unit.name : ''}</div>
        <div style="font-size:0.8125rem;color:var(--neutral-600)">Tahun: ${this.selectedYear} • ${unitLevel}</div>
      </div>

      ${UI.formGroup('Kode Sasaran', UI.formInput('kode_sasaran', 'Contoh: SP.01, SS.01.01', ''), 'Kode harus unik per unit kerja dan tahun.', true)}

      ${UI.formGroup('Sasaran', `<textarea class="form-textarea" name="nama_sasaran" placeholder="Tuliskan uraian sasaran kinerja..." rows="3" maxlength="500" oninput="document.getElementById('sasaran-charcount').textContent=this.value.length"></textarea><div class="form-helper"><span id="sasaran-charcount">0</span>/500 karakter</div>`, '', true)}

      ${UI.formGroup('Sasaran Atasan',
      UI.formSelect('sasaran_atasan', [
        { value: '', label: needParent ? '— Pilih Sasaran Atasan —' : '— Tidak ada (Level Puncak) —' },
        ...parentSasaranOptions
      ]),
      needParent ? 'Wajib dipilih karena unit kerja bukan Level 0.' : 'Opsional untuk unit kerja level puncak.',
      needParent
    )}

      ${UI.formGroup('Status',
      UI.formSelect('status_sasaran', [
        { value: 'active', label: 'Digunakan' },
        { value: 'inactive', label: 'Tidak Digunakan' }
      ], 'active')
    )}

      ${UI.formGroup('Catatan / Deskripsi (Opsional)', UI.formTextarea('catatan', 'Catatan tambahan mengenai sasaran ini...'))}

      <div id="sasaran-form-errors" style="display:none" class="form-error mt-md"></div>
    `;

    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="PerencanaanPage.validateAndSave('add')">💾 Simpan</button>
    `;

    document.getElementById('modal-container').innerHTML = UI.modal('Tambah Sasaran Kinerja', content, footer, 'lg');
  },

  /* ═══════════════════════════════════════════
     FORM: Edit Sasaran (Modal)
     ═══════════════════════════════════════════ */
  showEditSasaran(sasaranId) {
    const s = MockData.getSasaran(sasaranId);
    if (!s) return;
    const unit = MockData.getUnit(s.unitId);
    const unitLevel = unit ? unit.level : '';
    const needParent = unitLevel !== 0;

    const parentSasaranOptions = MockData.sasaran
      .filter(ss => ss.year === s.year && ss.id !== s.id)
      .map(ss => {
        const u = MockData.getUnit(ss.unitId);
        return { value: ss.id, label: `${ss.code} — ${ss.name} (${u ? u.name : ''})` };
      });

    const statusVal = (s.status === 'approved' || s.status === 'verified') ? 'active' : 'inactive';

    const content = `
      <div style="background:var(--primary-50);padding:var(--space-md);border-radius:var(--radius-sm);margin-bottom:var(--space-lg);border-left:3px solid var(--accent-500)">
        <div style="font-weight:600;color:var(--primary-800)">Edit Sasaran — ${unit ? unit.name : ''}</div>
        <div style="font-size:0.8125rem;color:var(--neutral-600)">Tahun: ${s.year} • ${unitLevel}</div>
      </div>

      ${UI.formGroup('Kode Sasaran', UI.formInput('kode_sasaran', '', s.code), 'Kode harus unik per unit kerja dan tahun.', true)}

      ${UI.formGroup('Sasaran', `<textarea class="form-textarea" name="nama_sasaran" rows="3" maxlength="500" oninput="document.getElementById('sasaran-charcount').textContent=this.value.length">${s.name}</textarea><div class="form-helper"><span id="sasaran-charcount">${s.name.length}</span>/500 karakter</div>`, '', true)}

      ${UI.formGroup('Sasaran Atasan',
      UI.formSelect('sasaran_atasan', [
        { value: '', label: needParent ? '— Pilih Sasaran Atasan —' : '— Tidak ada (Level Puncak) —' },
        ...parentSasaranOptions
      ], s.parentId || ''),
      needParent ? 'Wajib dipilih karena unit kerja bukan Level 0.' : '',
      needParent
    )}

      ${UI.formGroup('Status',
      UI.formSelect('status_sasaran', [
        { value: 'active', label: 'Digunakan' },
        { value: 'inactive', label: 'Tidak Digunakan' }
      ], statusVal)
    )}

      ${UI.formGroup('Catatan / Deskripsi (Opsional)', UI.formTextarea('catatan', 'Catatan tambahan...'))}

      <div id="sasaran-form-errors" style="display:none" class="form-error mt-md"></div>
    `;

    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="PerencanaanPage.validateAndSave('edit','${s.id}')">💾 Simpan Perubahan</button>
    `;

    document.getElementById('modal-container').innerHTML = UI.modal('Edit Sasaran Kinerja', content, footer, 'lg');
  },

  /* ── Validation ────────────────────────────── */
  validateAndSave(mode, editId) {
    const kode = document.querySelector('[name="kode_sasaran"]');
    const nama = document.querySelector('[name="nama_sasaran"]');
    const atasan = document.querySelector('[name="sasaran_atasan"]');
    const status = document.querySelector('[name="status_sasaran"]');
    const catatan = document.querySelector('[name="catatan"]');
    const errBox = document.getElementById('sasaran-form-errors');
    const errors = [];

    if (!kode || !kode.value.trim()) errors.push('Kode Sasaran wajib diisi.');
    if (!nama || !nama.value.trim()) errors.push('Sasaran wajib diisi.');

    // Check parent requirement
    const unit = MockData.getUnit(this.filterUnitId || this.selectedUnitId);
    if (unit && unit.level !== 0 && atasan && !atasan.value) {
      errors.push('Sasaran Atasan wajib dipilih untuk unit kerja bukan Level 0.');
    }

    if (errors.length) {
      errBox.style.display = 'block';
      errBox.innerHTML = errors.map(e => `⚠️ ${e}`).join('<br>');
      if (kode && !kode.value.trim()) kode.classList.add('error');
      if (nama && !nama.value.trim()) nama.classList.add('error');
      return;
    }

    if (mode === 'add') {
      const unitId = this.filterUnitId || this.selectedUnitId;
      MockData.sasaran.push({
        id: 'ss-' + Date.now(),
        code: kode.value.trim(),
        name: nama.value.trim(),
        unitId: unitId,
        level: unit ? (unit.level === 0 ? 'Kementerian' : 'Unit') : 'Unit',
        year: this.selectedYear,
        parentId: atasan ? atasan.value : '',
        status: status && status.value === 'active' ? 'approved' : 'inactive',
        notes: catatan ? catatan.value.trim() : ''
      });
    } else if (mode === 'edit' && editId) {
      const s = MockData.getSasaran(editId);
      if (s) {
        s.code = kode.value.trim();
        s.name = nama.value.trim();
        s.parentId = atasan ? atasan.value : '';
        s.status = status && status.value === 'active' ? 'approved' : 'inactive';
        s.notes = catatan ? catatan.value.trim() : '';
      }
    }

    MockData.saveSasaran();
    if (mode === 'add') {
      MockData.pushNotification('info', 'Sasaran baru ditambahkan', `Sasaran "${kode.value.trim()}" berhasil ditambahkan.`);
      MockData.pushActivityLog('create', 'Perencanaan', `Menambah sasaran baru "${kode.value.trim()}"`);
    }
    App.closeModal();
    App.renderPage();
  },

  /* ═══════════════════════════════════════════
     Tab: Indikator Kinerja — Unit List View
     ═══════════════════════════════════════════ */
  renderIndikatorAll() {
    const lingkupId = this.indikatorLingkupUnitId || 'unit-000';
    const visibleIds = this.getUnitAndChildrenIds(lingkupId);
    const filteredUnits = MockData.units
      .filter(u => visibleIds.includes(u.id))
      .sort((a, b) => a.code.localeCompare(b.code));

    // Build Unit Kerja Lingkup options (Level 0 + Level 1)
    const lingkupUnits = MockData.units.filter(u => u.level <= 1).sort((a, b) => a.code.localeCompare(b.code));
    const lingkupOptions = `<option value="" disabled>Belum di pilih...</option>` + lingkupUnits.map(u =>
      `<option value="${u.id}" ${u.id === lingkupId ? 'selected' : ''}>${u.code} - ${u.name}</option>`
    ).join('');

    const isTutupActive = lingkupId !== 'unit-000';

    return `
      <!-- ── Filter Panel ───────────────────────── -->
      <div class="sasaran-filter-panel">
        <div class="sasaran-filter-fields">
          <div class="form-group" style="margin-bottom:0;min-width:320px">
            <label class="form-label" style="color:var(--neutral-600);margin-bottom:6px">Unit Kerja Lingkup</label>
            <select class="form-select" onchange="PerencanaanPage.indikatorLingkupUnitId=this.value;App.renderPage()">${lingkupOptions}</select>
          </div>
          <div class="form-group" style="margin-bottom:0;min-width:90px">
            <label class="form-label" style="color:var(--neutral-600);margin-bottom:6px">Tahun</label>
            <select class="form-select">
              <option value="2026" selected>2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
        <div class="sasaran-filter-actions">
          <button class="btn ${isTutupActive ? 'btn-accent' : 'btn-secondary'}" ${isTutupActive ? '' : 'disabled style="opacity:0.5"'} onclick="PerencanaanPage.indikatorLingkupUnitId='unit-000';App.renderPage()">✕ Tutup</button>
        </div>
      </div>

      <!-- ── Unit Table for Indikator Kinerja ─────────────────────── -->
      <div class="table-container" style="font-size:13px;border:1px solid #dee2e6;border-radius:4px;overflow-x:auto">
          <table style="min-width:1000px">
            <thead>
              <tr>
                <th style="width:35px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">No</th>
                <th style="width:45px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Level</th>
                <th style="width:90px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Kode</th>
                <th style="text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Unit Kerja</th>
                <th style="width:220px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Unit Kerja Atasan</th>
                <th style="width:80px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Jumlah IK<br>Digunakan</th>
                <th style="width:85px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Jumlah IK<br>Tidak<br>digunakan</th>
                <th style="width:160px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${filteredUnits.map((u, i) => {
      const parent = u.parentId ? MockData.getUnit(u.parentId) : null;
      // Count IK for this unit: indikators linked via sasaran that belongs to this unit
      const unitSasaranIds = MockData.sasaran.filter(s => s.unitId === u.id).map(s => s.id);
      const unitIKs = MockData.indikator.filter(ik => unitSasaranIds.includes(ik.sasaranId));
      const ikUsedCount = unitIKs.filter(ik => ik.status === 'approved' || ik.status === 'verified').length;
      const ikUnusedCount = unitIKs.length - ikUsedCount;
      const hasSasaran = unitSasaranIds.length > 0;
      const totalIK = unitIKs.length;

      // Determine Aksi column
      let aksiHtml;
      if (!hasSasaran) {
        aksiHtml = '<span style="color:#999;font-size:12px">Belum Input Sasaran</span>';
      } else if (totalIK === 0) {
        aksiHtml = '<span style="color:#999;font-size:12px">Belum Input Sasaran</span>';
      } else {
        aksiHtml = `
          <button class="btn btn-success btn-sm" style="font-size:11px;padding:3px 8px;margin-right:4px" onclick="PerencanaanPage.openIndikatorDetail('${u.id}')">Lihat</button>
          <button class="btn btn-sm" style="font-size:11px;padding:3px 8px;background:#f0ad4e;border:1px solid #eea236;color:#fff" onclick="PerencanaanPage.showIndikatorStatusForUnit('${u.id}')">Status IK</button>`;
      }

      return `
                <tr style="border-bottom:1px solid #eee">
                  <td style="text-align:center;padding:10px 6px">${i + 1}</td>
                  <td style="text-align:center;padding:10px 6px">${u.level}</td>
                  <td style="padding:10px 6px">${u.code}</td>
                  <td style="padding:10px 6px">${u.name}</td>
                  <td style="padding:10px 6px">${parent ? parent.name : ''}</td>
                  <td style="text-align:center;padding:10px 6px">${totalIK > 0 ? ikUsedCount + ' <span style="color:#3c8dbc;cursor:pointer" title="Info">ⓘ</span>' : '0 <span style="color:#3c8dbc;cursor:pointer" title="Info">ⓘ</span>'}</td>
                  <td style="text-align:center;padding:10px 6px">${ikUnusedCount}</td>
                  <td style="text-align:center;padding:10px 6px;white-space:nowrap">${aksiHtml}</td>
                </tr>`;
    }).join('')}
            </tbody>
          </table>
      </div>`;
  },

  openIndikatorDetail(unitId) {
    this.selectedUnitId = unitId;
    this.indikatorView = 'indikator_detail';
    App.renderPage();
    window.scrollTo(0, 0);
  },

  closeIndikatorDetail() {
    this.indikatorView = 'unit_list';
    this.selectedUnitId = null;
    App.renderPage();
    window.scrollTo(0, 0);
  },

  showIndikatorStatusForUnit(unitId) {
    const unit = MockData.getUnit(unitId);
    const unitSasaranIds = MockData.sasaran.filter(s => s.unitId === unitId).map(s => s.id);
    const unitIKs = MockData.indikator.filter(ik => unitSasaranIds.includes(ik.sasaranId));
    const content = `
      <p style="margin-bottom:16px"><strong>Unit Kerja:</strong> ${unit ? unit.name : unitId}</p>
      <table>
        <thead><tr><th>Kode</th><th>Nama Indikator</th><th>Status</th></tr></thead>
        <tbody>
          ${unitIKs.map(ik => `
            <tr>
              <td>${ik.code}</td>
              <td>${ik.name}</td>
              <td>${UI.badge(ik.status)}</td>
            </tr>`).join('')}
          ${unitIKs.length === 0 ? '<tr><td colspan="3" style="text-align:center;color:#999">Tidak ada indikator</td></tr>' : ''}
        </tbody>
      </table>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Status Indikator Kinerja', content, `<button class="btn btn-ghost" onclick="App.closeModal()">Tutup</button>`, 'lg');
  },

  renderIndikatorDetail() {
    const activeUnit = this.selectedUnitId;
    const unit = MockData.getUnit(activeUnit);
    const unitSasaranIds = MockData.sasaran.filter(s => s.unitId === activeUnit).map(s => s.id);
    const unitIKs = MockData.indikator.filter(ik => unitSasaranIds.includes(ik.sasaranId));
    const isEditor = ['admin_pusat', 'operator_unit', 'auditor', 'unit_level0', 'unit_level1', 'unit_level2', 'unit_level3'].includes(MockData.currentUser.roleId);
    const isAdmin = ['admin_pusat', 'auditor'].includes(MockData.currentUser.roleId);

    return `
      <div class="sasaran-filter-panel">
        <div class="sasaran-filter-fields">
          <div style="font-weight:700;font-size:0.9375rem;color:var(--neutral-800)">${unit ? unit.name : ''}</div>
        </div>
        <div class="sasaran-filter-actions">
          ${isEditor ? `<button class="btn btn-primary" onclick="PerencanaanPage.showAddIndikator('${unitSasaranIds[0] || 'ss-003'}')">＋ Tambah Indikator</button>` : ''}
          <button class="btn btn-secondary" onclick="PerencanaanPage.closeIndikatorDetail()">✕ Tutup</button>
        </div>
      </div>

      ${UI.toolbar('Cari indikator...', [
      { label: '📥 Export Excel', class: 'btn-secondary', action: 'PerencanaanPage.exportIndikatorExcel()' }
    ])}
      ${UI.table([
      { label: 'Kode', key: 'code' },
      { label: 'Nama Indikator', render: r => '<span title="' + r.name + '" class="truncate" style="max-width:250px;display:inline-block">' + r.name + '</span>' },
      { label: 'Sasaran', render: r => { const s = MockData.getSasaran(r.sasaranId); return s ? s.code : '-'; } },
      { label: 'Satuan', key: 'unit' },
      { label: 'Polaritas', render: r => '<span style="text-transform:capitalize">' + r.polarity + '</span>' },
      { label: 'Target Tahunan', render: r => '<strong>' + r.targetTahunan + '</strong> ' + r.unit },
      { label: 'Status', render: r => UI.badge(r.status) },
      {
        label: 'Aksi', render: r => `
          <div style="display:flex;gap:2px">
            <button class="btn btn-ghost btn-sm" onclick="PerencanaanPage.showIndikatorDetail('${r.id}')" title="Lihat">👁️</button>
            ${isEditor ? '<button class="btn btn-ghost btn-sm" onclick="PerencanaanPage.showEditIndikator(\'' + r.id + '\')" title="Edit">✏️</button>' : ''}
            ${isAdmin ? '<button class="btn btn-ghost btn-sm" onclick="PerencanaanPage.deleteIndikator(\'' + r.id + '\')" title="Hapus" style="color:#dc2626">🗑️</button>' : ''}
          </div>`
      }
    ], unitIKs)}`;
  },

  /* ═══════════════════════════════════════════
     Tab: Rencana Aksi — Unit List View
     ═══════════════════════════════════════════ */
  renderRencanaAksi() {
    if (App.activeUnitFilter && App.activeUnitFilter !== 'all') {
      this.rencanaAksiLingkupUnitId = App.activeUnitFilter;
    }
    const lingkupId = this.rencanaAksiLingkupUnitId || 'unit-000';
    const visibleIds = this.getUnitAndChildrenIds(lingkupId);
    let filteredUnits = MockData.units
      .filter(u => visibleIds.includes(u.id))
      .sort((a, b) => a.code.localeCompare(b.code));

    // Apply search filter
    const searchTerm = (this.rencanaAksiSearch || '').toLowerCase();
    if (searchTerm) {
      filteredUnits = filteredUnits.filter(u =>
        u.name.toLowerCase().includes(searchTerm) ||
        u.code.toLowerCase().includes(searchTerm)
      );
    }

    // Build Unit Kerja Lingkup options (Level 0 + Level 1)
    const lingkupUnits = MockData.units.filter(u => u.level <= 1).sort((a, b) => a.code.localeCompare(b.code));
    const lingkupOptions = `<option value="" disabled>Belum di pilih...</option>` + lingkupUnits.map(u =>
      `<option value="${u.id}" ${u.id === lingkupId ? 'selected' : ''}>${u.code} - ${u.name}</option>`
    ).join('');

    const isTutupActive = lingkupId !== 'unit-000';
    const totalEntries = filteredUnits.length;

    return `
      <!-- ── Filter Panel ───────────────────────── -->
      <div class="sasaran-filter-panel">
        <div class="sasaran-filter-fields">
          <div class="form-group" style="margin-bottom:0;min-width:320px">
            <label class="form-label" style="color:var(--neutral-600);margin-bottom:6px">Unit Kerja Lingkup</label>
            <select class="form-select" onchange="PerencanaanPage.rencanaAksiLingkupUnitId=this.value;App.renderPage()">${lingkupOptions}</select>
          </div>
          <div class="form-group" style="margin-bottom:0;min-width:90px">
            <label class="form-label" style="color:var(--neutral-600);margin-bottom:6px">Tahun</label>
            <select class="form-select">
              <option value="2026" selected>2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
        <div class="sasaran-filter-actions">
          <button class="btn ${isTutupActive ? 'btn-accent' : 'btn-secondary'}" ${isTutupActive ? '' : 'disabled style="opacity:0.5"'} onclick="PerencanaanPage.rencanaAksiLingkupUnitId='unit-000';App.renderPage()">✕ Tutup</button>
        </div>
      </div>

      <!-- ── Records & Search ─────────────────────── -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:13px">
        <div style="display:flex;align-items:center;gap:6px">
          <select class="form-select" style="width:60px;padding:4px 6px;font-size:12px">
            <option>25</option><option>50</option><option>100</option>
          </select>
          <span style="color:var(--neutral-600)">records per page</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="color:var(--neutral-600)">Search:</span>
          <input class="form-input" type="text" style="width:160px;padding:4px 8px;font-size:12px" value="${this.rencanaAksiSearch || ''}" oninput="PerencanaanPage.rencanaAksiSearch=this.value;App.renderPage()" />
        </div>
      </div>

      <!-- ── Unit Table ─────────────────────── -->
      <div class="table-container" style="font-size:13px;border:1px solid #dee2e6;border-radius:4px;overflow-x:auto">
          <table style="min-width:800px">
            <thead>
              <tr>
                <th style="width:40px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle;cursor:pointer">No ↕</th>
                <th style="width:50px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle;cursor:pointer">Level ↕</th>
                <th style="width:100px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle;cursor:pointer">Kode ↕</th>
                <th style="text-align:left;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle;cursor:pointer">Unit Kerja ↕</th>
                <th style="width:100px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle;cursor:pointer">Jml Renaksi ↕</th>
                <th style="width:80px;text-align:center;padding:10px 8px;border-bottom:1px solid #dee2e6;font-weight:700;vertical-align:middle">Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${filteredUnits.map((u, i) => {
      // Count rencana aksi for this unit
      const raCount = MockData.rencanaAksi.filter(r => r.unitName && r.unitName.toLowerCase().includes(u.name.toLowerCase().substring(0, 15))).length;
      return `
                <tr style="border-bottom:1px solid #eee">
                  <td style="text-align:center;padding:10px 6px">${i + 1}</td>
                  <td style="text-align:center;padding:10px 6px">${u.level}</td>
                  <td style="padding:10px 6px">${u.code}</td>
                  <td style="padding:10px 6px">${u.name}</td>
                  <td style="text-align:center;padding:10px 6px">${raCount}</td>
                  <td style="text-align:center;padding:10px 6px;white-space:nowrap">
                    <button class="btn btn-sm" style="font-size:11px;padding:3px 12px;background:#fff;border:1px solid #ccc;color:#333" onclick="PerencanaanPage.showRADetail('${u.id}')">Lihat</button>
                  </td>
                </tr>`;
    }).join('')}
            </tbody>
          </table>
      </div>

      <!-- ── Pagination ─────────────────────── -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;font-size:13px">
        <span style="color:var(--neutral-600)">Showing 1 to ${totalEntries} of ${totalEntries} entries</span>
        <div style="display:flex;gap:4px">
          <button class="btn btn-sm" style="font-size:11px;padding:3px 10px;background:#fff;border:1px solid #ccc;color:#333" disabled>Previous</button>
          <button class="btn btn-sm" style="font-size:11px;padding:3px 10px;background:var(--primary-600);border:1px solid var(--primary-600);color:#fff">1</button>
          <button class="btn btn-sm" style="font-size:11px;padding:3px 10px;background:#fff;border:1px solid #ccc;color:#333" disabled>Next</button>
        </div>
      </div>`;
  },

  showRADetail(unitId) {
    const unit = MockData.getUnit(unitId);
    if (!unit) return;
    // Get all indikator for this unit via sasaran
    const unitSasaranIds = MockData.sasaran.filter(s => s.unitId === unitId).map(s => s.id);
    const unitIKs = MockData.indikator.filter(ik => unitSasaranIds.includes(ik.sasaranId));
    const unitRA = MockData.rencanaAksi.filter(r => r.unitName && r.unitName.toLowerCase().includes(unit.name.toLowerCase().substring(0, 15)));

    const content = `
      <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;margin-bottom:20px;padding:16px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0">
        <div style="flex:1;min-width:200px">
          <label style="font-size:12px;color:#64748b;font-weight:600;display:block;margin-bottom:4px">Unit Kerja Lingkup</label>
          <div style="padding:8px 12px;background:#fff;border:1px solid #d1d5db;border-radius:6px;font-size:13px;font-weight:500">${unit.name}</div>
        </div>
        <div style="min-width:80px">
          <label style="font-size:12px;color:#64748b;font-weight:600;display:block;margin-bottom:4px">Tahun</label>
          <div style="padding:8px 12px;background:#fff;border:1px solid #d1d5db;border-radius:6px;font-size:13px">2026</div>
        </div>
        <div style="min-width:150px">
          <label style="font-size:12px;color:#64748b;font-weight:600;display:block;margin-bottom:4px">Indikator Kinerja</label>
          <div style="padding:8px 12px;background:#fff;border:1px solid #d1d5db;border-radius:6px;font-size:13px;color:#94a3b8">Semua IKU...</div>
        </div>
      </div>

      <table style="width:100%">
        <thead>
          <tr style="background:#f1f5f9">
            <th style="width:40px;padding:10px 8px;text-align:center;font-weight:700;font-size:13px">No</th>
            <th style="padding:10px 8px;text-align:left;font-weight:700;font-size:13px">Indikator Kinerja</th>
            <th style="width:160px;padding:10px 8px;text-align:center;font-weight:700;font-size:13px">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${unitIKs.length > 0 ? unitIKs.map((ik, i) => {
      const ikRA = unitRA.filter(r => r.indikatorName && r.indikatorName.toLowerCase().includes(ik.name.toLowerCase().substring(0, 15)));
      return `
            <tr style="border-bottom:1px solid #e2e8f0">
              <td style="text-align:center;padding:12px 8px;font-size:13px;vertical-align:top">${i + 1}</td>
              <td style="padding:12px 8px;font-size:13px;line-height:1.6;vertical-align:top">
                <div style="font-weight:500">${ik.name}</div>
                ${ikRA.length > 0 ? `<div style="margin-top:8px;padding:8px 12px;background:#f0fdf4;border-radius:6px;border-left:3px solid #22c55e">
                  ${ikRA.map(r => `<div style="font-size:12px;margin-bottom:4px"><span style="color:#16a34a;font-weight:600">✓</span> ${r.activity} <span style="color:#94a3b8">(${r.progress}%)</span></div>`).join('')}
                </div>` : ''}
              </td>
              <td style="text-align:center;padding:12px 8px;vertical-align:top">
                <button class="btn btn-sm" style="background:#22c55e;color:#fff;border:none;font-size:12px;padding:5px 14px;border-radius:4px" onclick="PerencanaanPage.showAddRA('${ik.id}')">Tambah Renaksi</button>
              </td>
            </tr>`;
    }).join('') : `
            <tr><td colspan="3" style="text-align:center;padding:24px;color:#94a3b8;font-size:13px">Belum ada indikator kinerja untuk unit kerja ini.</td></tr>`}
        </tbody>
      </table>`;

    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Tutup</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Rencana Aksi — ' + unit.name, content, footer, 'xl');
  },

  /* ═══════════════════════════════════════════
     Shared Modals: Indikator + Rencana Aksi
     ═══════════════════════════════════════════ */
  showAddIndikator(sasaranId) {
    const s = MockData.getSasaran(sasaranId);
    const content = `
      <p class="text-muted mb-md">Sasaran: <strong>${s ? s.name : sasaranId}</strong></p>
      ${UI.formGroup('Nama Indikator', UI.formInput('nama_ik', 'Nama indikator kinerja'), '', true)}
      ${UI.formGroup('Definisi Operasional', UI.formTextarea('definisi', 'Penjelasan detail indikator...'), '', true)}
      ${UI.formGroup('Formula / Cara Perhitungan', UI.formTextarea('formula', 'Rumus atau metode perhitungan...'), '', true)}
      <div class="form-row-3">
        ${UI.formGroup('Satuan', UI.formInput('satuan', 'Contoh: %, ton, Rp'), '', true)}
        ${UI.formGroup('Polaritas', UI.formSelect('polaritas', ['Maximize', 'Minimize', 'Stabilize']), '', true)}
        ${UI.formGroup('Baseline', UI.formInput('baseline', '0', '', 'number'))}
      </div>
      ${UI.formGroup('Sumber Data', UI.formInput('sumber', 'Asal data capaian'))}
      ${UI.formGroup('Target Tahunan', UI.formInput('target_tahunan', '0', '', 'number'))}
      <h3 style="margin:var(--space-lg) 0 var(--space-md)">Target Periodik</h3>
      <table>
        <thead><tr><th>Periode</th><th>Nilai Target</th></tr></thead>
        <tbody>
          ${['TW I', 'TW II', 'TW III', 'TW IV'].map((tw, i) => `
            <tr><td>${tw}</td><td><input class="form-input" type="number" id="target-tw-${i + 1}" placeholder="0" style="max-width:150px" /></td></tr>
          `).join('')}
        </tbody>
      </table>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="PerencanaanPage.saveAddIndikator('${sasaranId}')">💾 Simpan Indikator</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Tambah Indikator Kinerja', content, footer, 'lg');
  },

  saveAddIndikator(sasaranId) {
    const nama = document.querySelector('[name=nama_ik]')?.value?.trim();
    const definisi = document.querySelector('[name=definisi]')?.value?.trim();
    const formula = document.querySelector('[name=formula]')?.value?.trim();
    const satuan = document.querySelector('[name=satuan]')?.value?.trim();
    const polaritas = document.querySelector('[name=polaritas]')?.value;
    const baseline = parseFloat(document.querySelector('[name=baseline]')?.value) || 0;
    const sumber = document.querySelector('[name=sumber]')?.value?.trim();
    const targetTahunan = parseFloat(document.querySelector('[name=target_tahunan]')?.value) || 0;
    if (!nama || !satuan) { alert('Nama Indikator dan Satuan wajib diisi!'); return; }

    const id = 'ik-' + Date.now();
    const code = 'IK.' + (MockData.indikator.length + 1);
    MockData.indikator.push({
      id, code, name: nama, sasaranId,
      definition: definisi || '-', formula: formula || '-',
      unit: satuan, polarity: (polaritas || 'maximize').toLowerCase(),
      baseline, dataSource: sumber || '-',
      targetTahunan, status: 'draft'
    });
    for (let tw = 1; tw <= 4; tw++) {
      const val = parseFloat(document.getElementById('target-tw-' + tw)?.value) || 0;
      if (val > 0) {
        MockData.targetPeriodik.push({ indikatorId: id, periodNumber: tw, value: val });
      }
    }
    MockData.saveIndikator();
    MockData.pushNotification('info', 'Indikator baru ditambahkan', `Indikator "${nama}" berhasil ditambahkan.`);
    MockData.pushActivityLog('create', 'Perencanaan', `Menambah indikator baru "${nama}"`);
    App.closeModal();
    App.renderPage();
  },

  showEditIndikator(id) {
    const ik = MockData.getIndikator(id);
    if (!ik) return;
    const targets = MockData.targetPeriodik.filter(t => t.indikatorId === id);
    const getTarget = (tw) => { const t = targets.find(x => x.periodNumber === tw); return t ? t.value : ''; };
    const content = `
      ${UI.formGroup('Nama Indikator', '<input class="form-input" name="edit_nama" value="' + ik.name + '">', '', true)}
      ${UI.formGroup('Definisi Operasional', '<textarea class="form-textarea" name="edit_definisi">' + (ik.definition || '') + '</textarea>')}
      ${UI.formGroup('Formula', '<textarea class="form-textarea" name="edit_formula">' + (ik.formula || '') + '</textarea>')}
      <div class="form-row-3">
        ${UI.formGroup('Satuan', '<input class="form-input" name="edit_satuan" value="' + ik.unit + '">', '', true)}
        ${UI.formGroup('Polaritas', UI.formSelect('edit_polaritas', [{ value: 'maximize', label: 'Maximize' }, { value: 'minimize', label: 'Minimize' }, { value: 'stabilize', label: 'Stabilize' }]))}
        ${UI.formGroup('Baseline', '<input class="form-input" name="edit_baseline" type="number" value="' + ik.baseline + '">')}
      </div>
      ${UI.formGroup('Sumber Data', '<input class="form-input" name="edit_sumber" value="' + (ik.dataSource || '') + '">')}
      ${UI.formGroup('Target Tahunan', '<input class="form-input" name="edit_target_tahunan" type="number" value="' + (ik.targetTahunan || 0) + '">')}
      <h3 style="margin:var(--space-lg) 0 var(--space-md)">Target Periodik</h3>
      <table>
        <thead><tr><th>Periode</th><th>Nilai Target</th></tr></thead>
        <tbody>
          ${['TW I', 'TW II', 'TW III', 'TW IV'].map((tw, i) => `
            <tr><td>${tw}</td><td><input class="form-input" type="number" id="edit-tw-${i + 1}" value="${getTarget(i + 1)}" style="max-width:150px" /></td></tr>
          `).join('')}
        </tbody>
      </table>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="PerencanaanPage.saveEditIndikator('${id}')">💾 Simpan Perubahan</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Edit Indikator — ' + ik.code, content, footer, 'lg');
    // Set polaritas dropdown
    setTimeout(() => { const sel = document.querySelector('[name=edit_polaritas]'); if (sel) sel.value = ik.polarity; }, 50);
  },

  saveEditIndikator(id) {
    const ik = MockData.getIndikator(id);
    if (!ik) return;
    ik.name = document.querySelector('[name=edit_nama]')?.value?.trim() || ik.name;
    ik.definition = document.querySelector('[name=edit_definisi]')?.value?.trim() || ik.definition;
    ik.formula = document.querySelector('[name=edit_formula]')?.value?.trim() || ik.formula;
    ik.unit = document.querySelector('[name=edit_satuan]')?.value?.trim() || ik.unit;
    ik.polarity = document.querySelector('[name=edit_polaritas]')?.value || ik.polarity;
    ik.baseline = parseFloat(document.querySelector('[name=edit_baseline]')?.value) || ik.baseline;
    ik.dataSource = document.querySelector('[name=edit_sumber]')?.value?.trim() || ik.dataSource;
    ik.targetTahunan = parseFloat(document.querySelector('[name=edit_target_tahunan]')?.value) || ik.targetTahunan;
    for (let tw = 1; tw <= 4; tw++) {
      const val = parseFloat(document.getElementById('edit-tw-' + tw)?.value) || 0;
      const existing = MockData.targetPeriodik.find(t => t.indikatorId === id && t.periodNumber === tw);
      if (existing) { existing.value = val; }
      else if (val > 0) { MockData.targetPeriodik.push({ indikatorId: id, periodNumber: tw, value: val }); }
    }
    MockData.saveIndikator();
    App.closeModal();
    App.renderPage();
  },

  deleteIndikator(id) {
    const ik = MockData.getIndikator(id);
    if (!ik) return;
    const content = `
      <div style="text-align:center;padding:var(--space-xl)">
        <div style="font-size:4rem;margin-bottom:var(--space-md)">⚠️</div>
        <h2 style="color:#dc2626;margin-bottom:var(--space-sm)">Hapus Indikator?</h2>
        <p class="text-muted"><strong>${ik.code}</strong> — ${ik.name}</p>
        <p style="font-size:13px;color:#dc2626;margin-top:8px">Semua target dan capaian terkait juga akan dihapus.</p>
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn" style="background:#dc2626;color:#fff;border:none" onclick="PerencanaanPage.confirmDeleteIndikator('${id}')">🗑️ Ya, Hapus</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Konfirmasi Hapus', content, footer);
  },

  confirmDeleteIndikator(id) {
    MockData.indikator = MockData.indikator.filter(i => i.id !== id);
    MockData.targetPeriodik = MockData.targetPeriodik.filter(t => t.indikatorId !== id);
    MockData.capaian = MockData.capaian.filter(c => c.indikatorId !== id);
    MockData.saveIndikator();
    MockData.pushNotification('info', 'Indikator dihapus', `Indikator "${ik.code}" telah dihapus.`);
    MockData.pushActivityLog('delete', 'Perencanaan', `Menghapus indikator "${ik.code}"`);
    App.closeModal();
    App.renderPage();
  },

  showIndikatorDetail(id) {
    const ik = MockData.getIndikator(id);
    if (!ik) return;
    const target = MockData.targetPeriodik.filter(t => t.indikatorId === id);
    const cap = MockData.capaian.filter(c => c.indikatorId === id);
    const content = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);margin-bottom:var(--space-lg)">
        <div><strong>Kode:</strong> ${ik.code}</div>
        <div><strong>Satuan:</strong> ${ik.unit}</div>
        <div><strong>Polaritas:</strong> ${ik.polarity}</div>
        <div><strong>Baseline:</strong> ${ik.baseline}</div>
        <div style="grid-column:1/-1"><strong>Definisi:</strong> ${ik.definition}</div>
        <div style="grid-column:1/-1"><strong>Formula:</strong> ${ik.formula}</div>
        <div style="grid-column:1/-1"><strong>Sumber Data:</strong> ${ik.dataSource}</div>
      </div>
      <h3 class="mb-md">Target & Capaian</h3>
      <table>
        <thead><tr><th>Periode</th><th>Target</th><th>Capaian</th><th>%</th><th>Status</th></tr></thead>
        <tbody>
          ${target.map(t => {
      const c = cap.find(x => x.periodNumber === t.periodNumber);
      return `<tr>
              <td>TW ${t.periodNumber}</td>
              <td>${t.value} ${ik.unit}</td>
              <td>${c ? c.value + ' ' + ik.unit : '—'}</td>
              <td>${c ? UI.pctDisplay(c.pct) : '—'}</td>
              <td>${c ? UI.badge(c.status) : UI.badge('draft', 'Belum Input')}</td>
            </tr>`;
    }).join('')}
        </tbody>
      </table>`;
    document.getElementById('modal-container').innerHTML = UI.modal(ik.name, content, `<button class="btn btn-ghost" onclick="App.closeModal()">Tutup</button>`, 'lg');
  },

  showAddRA() {
    const content = `
      ${UI.formGroup('Indikator', UI.formSelect('indikator', MockData.indikator.map(i => ({ value: i.id, label: i.code + ' — ' + i.name }))), '', true)}
      ${UI.formGroup('Nama Kegiatan', UI.formInput('kegiatan', 'Uraian rencana aksi'), '', true)}
      ${UI.formGroup('PIC', UI.formSelect('pic', MockData.users.filter(u => u.roleId === 'operator_unit').map(u => ({ value: u.id, label: u.fullName }))), '', true)}
      <div class="form-row">
        ${UI.formGroup('Tanggal Mulai', UI.formInput('start', '', '', 'date'), '', true)}
        ${UI.formGroup('Target Selesai', UI.formInput('end', '', '', 'date'), '', true)}
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="App.closeModal()">Simpan</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Tambah Rencana Aksi', content, footer);
  },

  exportIndikatorExcel() {
    const iks = MockData.indikator;
    let csv = '\uFEFFNo,Kode,Nama Indikator,Sasaran,Satuan,Polaritas,Target Tahunan,Status\n';
    iks.forEach((ik, i) => {
      const s = MockData.getSasaran(ik.sasaranId);
      csv += `${i + 1},"${ik.code}","${ik.name}","${s ? s.name : '-'}","${ik.unit}","${ik.polarity}","${ik.targetTahunan}","${ik.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Indikator_Kinerja.csv'; a.click();
    URL.revokeObjectURL(url);
    MockData.pushActivityLog('export', 'Perencanaan', 'Export data indikator kinerja ke Excel/CSV');
  }
};
