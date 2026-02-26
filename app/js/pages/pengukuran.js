/* ============================================
   KinerjaKu Next — Pengukuran Kinerja
   Enhanced with unit-level scoping
   ============================================ */

const PengukuranPage = {
  activeTab: 'input',

  /* ── Sub-view state for Input Capaian ── */
  capaianView: 'indikator_list',  // 'indikator_list' | 'input_form'
  selectedIndikatorId: null,

  /* ── Filter state ── */
  filterLevel1Id: 'unit-000',
  filterLevel2Id: '',
  filterLevel3Id: '',

  render() {
    // Verifikasi Capaian is a standalone page — no tabs
    if (this.activeTab === 'verifikasi') {
      return `
        <div class="page-header">
          <div>
            <h1 class="page-title">Verifikasi Capaian Kinerja</h1>
            <p class="text-muted" style="margin-top:4px">Verifikasi capaian kinerja unit kerja</p>
          </div>
        </div>
        <div id="pengukuran-content">${this.renderVerifikasi()}</div>`;
    }

    const pendingVerif = MockData.capaian.filter(c => c.status === 'submitted').length;
    const pendingApproval = MockData.capaian.filter(c => c.status === 'verified').length;
    const titles = {
      input: this.capaianView === 'input_form' ? 'Input Capaian Indikator' : 'Input Capaian',
      approval: 'Approval Capaian',
      riwayat: 'Riwayat Capaian'
    };
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">${titles[this.activeTab]}</h1>
          <p class="text-muted" style="margin-top:4px">Input capaian, upload evidence, dan verifikasi berjenjang</p>
        </div>
      </div>
      ${UI.tabs([
      { id: 'input', label: '📝 Input Capaian' },
      { id: 'verifikasi', label: '✅ Verifikasi', count: pendingVerif },
      { id: 'approval', label: '🔓 Approval', count: pendingApproval },
      { id: 'riwayat', label: '📜 Riwayat' }
    ], this.activeTab, 'PengukuranPage.switchTab')}
      <div id="pengukuran-content">${this.renderContent()}</div>`;
  },

  switchTab(tabId) {
    this.activeTab = tabId;
    this.capaianView = 'indikator_list';
    App.renderPage();
  },

  renderContent() {
    switch (this.activeTab) {
      case 'input':
        return this.capaianView === 'input_form'
          ? this.renderInputForm()
          : this.renderInput();
      case 'verifikasi': return this.renderVerifikasi();
      case 'approval': return this.renderApproval();
      case 'riwayat': return this.renderRiwayat();
      default: return this.renderInput();
    }
  },

  /* ═══════════════════════════════════════════
     Shared: Filter panel builder
     ═══════════════════════════════════════════ */
  buildFilterPanel() {
    // Level-1 options: Kementerian (level 0) + Eselon I (level 1)
    const level1Units = MockData.units.filter(u => u.level <= 1).sort((a, b) => a.code.localeCompare(b.code));
    const level1Options = level1Units.map(u =>
      `<option value="${u.id}" ${u.id === this.filterLevel1Id ? 'selected' : ''}>${u.name}</option>`
    ).join('');

    // Level-2 options: direct children of selected Level-1
    const level2Units = MockData.units.filter(u => u.parentId === this.filterLevel1Id).sort((a, b) => a.code.localeCompare(b.code));
    const level2Options = `<option value="">Belum di pilih...</option>` + level2Units.map(u =>
      `<option value="${u.id}" ${u.id === this.filterLevel2Id ? 'selected' : ''}>${u.name}</option>`
    ).join('');

    // Level-3 options: direct children of selected Level-2
    const level3Units = this.filterLevel2Id
      ? MockData.units.filter(u => u.parentId === this.filterLevel2Id).sort((a, b) => a.code.localeCompare(b.code))
      : [];
    const level3Options = `<option value="">Belum di pilih...</option>` + level3Units.map(u =>
      `<option value="${u.id}" ${u.id === this.filterLevel3Id ? 'selected' : ''}>${u.name}</option>`
    ).join('');

    return `
      <div style="border:1px solid #dee2e6;border-radius:4px;padding:16px 20px;margin-bottom:20px;background:#fff">
        <div style="font-weight:700;font-size:14px;margin-bottom:12px">Verifikasi Capaian Unit Kerja</div>
        <div style="display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap">
          <div style="min-width:80px">
            <label style="display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px">Tahun</label>
            <select class="form-select" style="padding:5px 8px;font-size:13px;min-width:80px">
              <option value="2026" selected>2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div style="min-width:200px;flex:1">
            <label style="display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px">Level-1</label>
            <select class="form-select" style="padding:5px 8px;font-size:13px;width:100%" onchange="PengukuranPage.filterLevel1Id=this.value;PengukuranPage.filterLevel2Id='';PengukuranPage.filterLevel3Id='';App.renderPage()">
              ${level1Options}
            </select>
          </div>
          <div style="min-width:160px;flex:1">
            <label style="display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px">Level-2</label>
            <select class="form-select" style="padding:5px 8px;font-size:13px;width:100%" onchange="PengukuranPage.filterLevel2Id=this.value;PengukuranPage.filterLevel3Id='';App.renderPage()">
              ${level2Options}
            </select>
          </div>
          <div style="min-width:140px;flex:1">
            <label style="display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px">Level-3</label>
            <select class="form-select" style="padding:5px 8px;font-size:13px;width:100%" onchange="PengukuranPage.filterLevel3Id=this.value;App.renderPage()">
              ${level3Options}
            </select>
          </div>
          <div>
            <button class="btn" style="font-size:13px;padding:5px 16px;background:#fff;border:1px solid #ccc;color:#333;cursor:pointer">Panduan</button>
          </div>
        </div>
      </div>`;
  },

  /* ═══════════════════════════════════════════
     Tab: Input Capaian — Pengukuran Capaian Unit Kerja
     ═══════════════════════════════════════════ */
  renderInput() {
    // Get level-0 + level-1 units, sorted by code
    const allUnits = MockData.units
      .filter(u => u.level <= 1)
      .sort((a, b) => a.code.localeCompare(b.code));

    const thStyle = 'text-align:center;padding:8px 4px;font-weight:700;font-size:12px;border:1px solid #dee2e6;background:#f8f9fa';
    const tdStyle = 'text-align:center;padding:10px 4px;border:1px solid #eee';
    const plusBtn = App.isReadOnlyRole() ? `<span style="color:var(--neutral-400)">-</span>` : `<button style="font-size:15px;background:transparent;border:none;color:var(--primary-600);cursor:pointer;font-weight:700;padding:0" title="Tambah capaian">＋</button>`;

    return `
      ${this.buildFilterPanel()}

      <!-- ── TW Table ── -->
      <div style="border:1px solid #dee2e6;border-radius:4px;overflow-x:auto;background:#fff">
        <table style="width:100%;border-collapse:collapse;min-width:700px">
          <thead>
            <tr>
              <th colspan="2" style="${thStyle}">TW-1</th>
              <th colspan="2" style="${thStyle}">TW-2</th>
              <th colspan="2" style="${thStyle}">TW-3</th>
              <th colspan="2" style="${thStyle}">TW-4</th>
            </tr>
            <tr>
              <th style="${thStyle};width:12.5%">Capaian</th>
              <th style="${thStyle};width:12.5%">Verifikasi</th>
              <th style="${thStyle};width:12.5%">Capaian</th>
              <th style="${thStyle};width:12.5%">Verifikasi</th>
              <th style="${thStyle};width:12.5%">Capaian</th>
              <th style="${thStyle};width:12.5%">Verifikasi</th>
              <th style="${thStyle};width:12.5%">Capaian</th>
              <th style="${thStyle};width:12.5%">Verifikasi</th>
            </tr>
          </thead>
          <tbody>
            ${allUnits.map(unit => `
              <tr>
                <td colspan="8" style="padding:10px 12px;font-weight:700;font-size:13px;text-transform:uppercase;border:1px solid #eee;background:#fafafa">${unit.name}</td>
              </tr>
              <tr>
                <td style="${tdStyle}">${plusBtn}</td>
                <td style="${tdStyle}"></td>
                <td style="${tdStyle}">${plusBtn}</td>
                <td style="${tdStyle}"></td>
                <td style="${tdStyle}">${plusBtn}</td>
                <td style="${tdStyle}"></td>
                <td style="${tdStyle}">${plusBtn}</td>
                <td style="${tdStyle}"></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`;
  },

  /* ═══════════════════════════════════════════
     Input Capaian — Full Page Form
     ═══════════════════════════════════════════ */
  openInputForm(indikatorId) {
    this.selectedIndikatorId = indikatorId;
    this.capaianView = 'input_form';
    App.renderPage();
    window.scrollTo(0, 0);
  },

  closeInputForm() {
    this.capaianView = 'indikator_list';
    this.selectedIndikatorId = null;
    App.renderPage();
  },

  renderInputForm() {
    const ik = MockData.getIndikator(this.selectedIndikatorId);
    if (!ik) return '<p>Indikator tidak ditemukan.</p>';
    const target = MockData.getTarget(ik.id, 1);
    const existing = MockData.getCapaian(ik.id, 1);
    const sasaran = MockData.getSasaran(ik.sasaranId);
    const activePeriod = MockData.activePeriod;

    return `
      <!-- Back button & context -->
      <div style="margin-bottom:var(--space-md)">
        <button class="btn btn-ghost" onclick="PengukuranPage.closeInputForm()" style="margin-bottom:var(--space-md)">
          ← Kembali ke Daftar Indikator
        </button>
      </div>

      <!-- Indikator info card -->
      <div class="card" style="margin-bottom:var(--space-lg)">
        <div class="card-header">
          <h3>📊 ${ik.code} — ${ik.name}</h3>
        </div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--space-md)">
            <div>
              <div style="font-size:0.75rem;color:var(--neutral-500);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Sasaran</div>
              <div style="font-weight:500">${sasaran ? sasaran.name : '—'}</div>
            </div>
            <div>
              <div style="font-size:0.75rem;color:var(--neutral-500);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Satuan</div>
              <div style="font-weight:500">${ik.unit}</div>
            </div>
            <div>
              <div style="font-size:0.75rem;color:var(--neutral-500);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Polaritas</div>
              <div style="font-weight:500;text-transform:capitalize">${ik.polarity}</div>
            </div>
            <div>
              <div style="font-size:0.75rem;color:var(--neutral-500);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px">Target ${activePeriod.quarter}</div>
              <div style="font-weight:700;font-size:1.25rem;color:var(--primary-600)">${target ? `${target.value} ${ik.unit}` : '—'}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Target overview mini-table -->
      <div class="card" style="margin-bottom:var(--space-lg)">
        <div class="card-header"><h3>📈 Target & Realisasi Periodik</h3></div>
        <div class="card-body" style="padding:0">
          <div class="table-container">
            <table>
              <thead><tr><th>Periode</th><th>Target</th><th>Realisasi</th><th>%</th><th>Status</th></tr></thead>
              <tbody>
                ${[1, 2, 3, 4].map(q => {
      const t = MockData.getTarget(ik.id, q);
      const c = MockData.getCapaian(ik.id, q);
      const isActive = q === 1;
      return `
                    <tr style="${isActive ? 'background:var(--primary-50)' : ''}">
                      <td><span style="font-weight:${isActive ? '700' : '400'};color:${isActive ? 'var(--primary-700)' : 'inherit'}">TW ${q} ${isActive ? '(Aktif)' : ''}</span></td>
                      <td>${t ? `${t.value} ${ik.unit}` : '—'}</td>
                      <td style="font-weight:600">${c ? `${c.value} ${ik.unit}` : '—'}</td>
                      <td>${c ? `${UI.trafficLight(c.pct)} ${UI.pctDisplay(c.pct)}` : '—'}</td>
                      <td>${c ? UI.badge(c.status) : UI.badge('draft', 'Belum Input')}</td>
                    </tr>`;
    }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Input form -->
      <div class="card">
        <div class="card-header">
          <h3>📝 Input Capaian — ${activePeriod.quarter} ${activePeriod.year}</h3>
        </div>
        <div class="card-body">
          <div class="form-row">
            ${UI.formGroup('Nilai Capaian', UI.formInput('capaian', `Masukkan nilai (${ik.unit})`, existing ? existing.value : '', 'number'), `Target: ${target ? target.value : '—'} ${ik.unit}`, true)}
            ${UI.formGroup('Persentase Otomatis', `<div style="font-size:1.5rem;font-weight:700;color:var(--primary-600);padding:8px 0">${existing ? existing.pct + '%' : '—'}</div>`, 'Dihitung otomatis: (Capaian / Target) × 100%')}
          </div>

          ${UI.formGroup('Narasi Pencapaian', UI.formTextarea('narasi', 'Jelaskan pencapaian secara detail...', existing ? existing.narrative : ''), 'Jelaskan upaya dan hasil yang dicapai pada periode ini.', true)}

          ${UI.formGroup('Kendala dan Hambatan', UI.formTextarea('kendala', 'Hambatan yang dihadapi pada periode ini...', existing ? existing.obstacles : ''))}

          ${UI.formGroup('Solusi dan Tindak Lanjut', UI.formTextarea('solusi', 'Langkah penyelesaian yang diambil/direncanakan...', existing ? existing.solutions : ''))}

          <h3 style="margin:var(--space-xl) 0 var(--space-md)">📎 Upload Evidence / Dokumen Pendukung</h3>
          <p class="text-muted" style="margin-bottom:var(--space-md);font-size:0.8125rem">Upload file pendukung (PDF, Excel, gambar). Maksimal 5 file, ukuran per file maks 10 MB.</p>
          ${UI.dropzone()}
          ${existing && existing.evidenceCount > 0 ? `
            <div class="file-list" style="margin-top:var(--space-md)">
              <div style="font-weight:600;margin-bottom:var(--space-sm);font-size:0.875rem">File Terunggah:</div>
              ${UI.fileItem('Laporan_Statistik_TW1_2026.pdf', '2.4 MB')}
              ${existing.evidenceCount > 1 ? UI.fileItem('Data_Pendukung_Realisasi.xlsx', '1.1 MB') : ''}
              ${existing.evidenceCount > 2 ? UI.fileItem('Foto_Kegiatan_Lapangan.jpg', '3.2 MB') : ''}
            </div>` : ''}

          <div id="capaian-form-errors" style="display:none" class="form-error mt-md"></div>
        </div>
        <div class="card-footer" style="display:flex;justify-content:flex-end;gap:var(--space-sm)">
          <button class="btn btn-ghost" onclick="PengukuranPage.closeInputForm()">Batal</button>
          ${App.isReadOnlyRole() ? '' : `
          <button class="btn btn-secondary" onclick="PengukuranPage.closeInputForm()">💾 Simpan Draft</button>
          <button class="btn btn-primary" onclick="PengukuranPage.closeInputForm()">📤 Submit untuk Verifikasi</button>`}
        </div>
      </div>`;
  },

  /* ═══════════════════════════════════════════
     Tab: Verifikasi — Verifikasi Capaian Unit Kerja
     ═══════════════════════════════════════════ */
  renderVerifikasi() {
    // Get level-0 + level-1 units for table rows
    const allUnits = MockData.units
      .filter(u => u.level <= 1)
      .sort((a, b) => a.code.localeCompare(b.code));

    const thStyle = 'text-align:center;padding:8px 4px;font-weight:700;font-size:12px;border:1px solid #dee2e6;background:#f8f9fa';
    const tdStyle = 'text-align:center;padding:10px 4px;border:1px solid #eee';

    return `
      ${this.buildFilterPanel()}

      <!-- ── TW Table ── -->
      <div style="border:1px solid #dee2e6;border-radius:4px;overflow-x:auto;background:#fff">
        <table style="width:100%;border-collapse:collapse;min-width:700px">
          <thead>
            <tr>
              <th colspan="2" style="${thStyle}">TW-1</th>
              <th colspan="2" style="${thStyle}">TW-2</th>
              <th colspan="2" style="${thStyle}">TW-3</th>
              <th colspan="2" style="${thStyle}">TW-4</th>
            </tr>
            <tr>
              <th style="${thStyle};width:12.5%">Sebelum Verifikasi</th>
              <th style="${thStyle};width:12.5%">Setelah Verifikasi</th>
              <th style="${thStyle};width:12.5%">Sebelum Verifikasi</th>
              <th style="${thStyle};width:12.5%">Setelah Verifikasi</th>
              <th style="${thStyle};width:12.5%">Sebelum Verifikasi</th>
              <th style="${thStyle};width:12.5%">Setelah Verifikasi</th>
              <th style="${thStyle};width:12.5%">Sebelum Verifikasi</th>
              <th style="${thStyle};width:12.5%">Setelah Verifikasi</th>
            </tr>
          </thead>
          <tbody>
            ${allUnits.map(unit => `
              <tr>
                <td colspan="8" style="padding:10px 12px;font-weight:700;font-size:13px;text-transform:uppercase;border:1px solid #eee;background:#fafafa">${unit.name}</td>
              </tr>
              <tr>
                <td style="${tdStyle}"></td>
                <td style="${tdStyle}"></td>
                <td style="${tdStyle}"></td>
                <td style="${tdStyle}"></td>
                <td style="${tdStyle}"></td>
                <td style="${tdStyle}"></td>
                <td style="${tdStyle}"></td>
                <td style="${tdStyle}"></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`;
  },

  /* ═══════════════════════════════════════════
     Tab: Approval
     ═══════════════════════════════════════════ */
  renderApproval() {
    const items = MockData.capaian.filter(c => c.status === 'verified');
    if (!items.length) {
      return `
        <div class="card">
          <div class="empty-state">
            <div class="empty-state-icon">🔓</div>
            <div class="empty-state-title">Tidak Ada Capaian Pending</div>
            <div class="empty-state-text">Tidak ada capaian yang menunggu persetujuan saat ini.</div>
          </div>
        </div>`;
    }

    return `
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Indikator</th>
                <th>Capaian</th>
                <th>%</th>
                <th>Evidence</th>
                <th>Status Verifikasi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(r => {
      const ik = MockData.getIndikator(r.indikatorId);
      return `
                  <tr>
                    <td style="line-height:1.5">
                      <div style="font-weight:500">${ik ? ik.name : r.indikatorId}</div>
                      <div style="font-size:0.6875rem;color:var(--neutral-500)">${ik ? ik.code : ''}</div>
                    </td>
                    <td style="font-weight:600">${r.value} ${ik ? ik.unit : ''}</td>
                    <td>${UI.trafficLight(r.pct)} ${UI.pctDisplay(r.pct)}</td>
                    <td>📎 ${r.evidenceCount} file</td>
                    <td>${UI.badge('verified', 'Terverifikasi')}</td>
                    <td>
                      <button class="btn btn-success btn-sm" onclick="PengukuranPage.showReview('${r.id}')">✅ Approve</button>
                      <button class="btn btn-danger btn-sm" onclick="PengukuranPage.showReview('${r.id}')">✗ Reject</button>
                    </td>
                  </tr>`;
    }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  /* ═══════════════════════════════════════════
     Tab: Riwayat
     ═══════════════════════════════════════════ */
  renderRiwayat() {
    const all = MockData.capaian;

    return `
      ${UI.toolbar('Cari riwayat capaian...')}
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="width:50px">No</th>
                <th>Indikator</th>
                <th style="width:100px">Nilai</th>
                <th style="width:80px">%</th>
                <th style="width:120px">Status</th>
                <th style="width:130px">Tanggal Submit</th>
                <th style="width:80px">Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${all.map((r, i) => {
      const ik = MockData.getIndikator(r.indikatorId);
      return `
                  <tr>
                    <td style="text-align:center;color:var(--neutral-500)">${i + 1}</td>
                    <td style="line-height:1.5">
                      <div style="font-weight:500">${ik ? ik.name : r.indikatorId}</div>
                      <div style="font-size:0.6875rem;color:var(--neutral-500)">${ik ? ik.code + ' • ' + ik.unit : ''}</div>
                    </td>
                    <td style="font-weight:600">${r.value}</td>
                    <td>${UI.pctDisplay(r.pct)}</td>
                    <td>${UI.badge(r.status)}</td>
                    <td style="font-size:0.8125rem">${r.submittedAt}</td>
                    <td>
                      <button class="btn btn-ghost btn-sm" onclick="PengukuranPage.showReview('${r.id}')">👁️</button>
                    </td>
                  </tr>`;
    }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  /* ═══════════════════════════════════════════
     Review Capaian Modal
     ═══════════════════════════════════════════ */
  showReview(capaianId) {
    const cap = MockData.capaian.find(c => c.id === capaianId);
    if (!cap) return;
    const ik = MockData.getIndikator(cap.indikatorId);
    const submitter = MockData.getUser(cap.submittedBy);
    const target = MockData.getTarget(cap.indikatorId, cap.periodNumber);

    const content = `
      <div style="background:var(--primary-50);padding:var(--space-md);border-radius:var(--radius-sm);margin-bottom:var(--space-lg);border-left:3px solid var(--primary-500)">
        <div style="font-weight:600;color:var(--primary-800)">${ik ? ik.name : ''}</div>
        <div style="font-size:0.8125rem;color:var(--neutral-600);margin-top:4px">${ik ? ik.code : ''} • TW ${cap.periodNumber} • Disubmit oleh ${submitter ? submitter.fullName : '—'}</div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-md);margin-bottom:var(--space-lg)">
        <div class="card" style="text-align:center;padding:var(--space-md)">
          <div style="font-size:0.6875rem;color:var(--neutral-500);text-transform:uppercase;margin-bottom:4px">Target</div>
          <div style="font-weight:700;font-size:1.25rem;color:var(--primary-700)">${target ? target.value : '—'} ${ik ? ik.unit : ''}</div>
        </div>
        <div class="card" style="text-align:center;padding:var(--space-md)">
          <div style="font-size:0.6875rem;color:var(--neutral-500);text-transform:uppercase;margin-bottom:4px">Capaian</div>
          <div style="font-weight:700;font-size:1.25rem;color:var(--accent-700)">${cap.value} ${ik ? ik.unit : ''}</div>
        </div>
        <div class="card" style="text-align:center;padding:var(--space-md)">
          <div style="font-size:0.6875rem;color:var(--neutral-500);text-transform:uppercase;margin-bottom:4px">Persentase</div>
          <div style="font-weight:700;font-size:1.25rem">${UI.trafficLight(cap.pct)} ${UI.pctDisplay(cap.pct)}</div>
        </div>
      </div>

      <div class="mb-lg">
        <strong style="color:var(--neutral-700)">Narasi Pencapaian:</strong>
        <p style="margin-top:4px;color:var(--neutral-600);line-height:1.6">${cap.narrative}</p>
      </div>
      <div class="mb-lg">
        <strong style="color:var(--neutral-700)">Kendala:</strong>
        <p style="margin-top:4px;color:var(--neutral-600);line-height:1.6">${cap.obstacles}</p>
      </div>
      <div class="mb-lg">
        <strong style="color:var(--neutral-700)">Solusi:</strong>
        <p style="margin-top:4px;color:var(--neutral-600);line-height:1.6">${cap.solutions}</p>
      </div>

      <h3 class="mb-md">📎 Evidence (${cap.evidenceCount} file)</h3>
      <div class="file-list" style="margin-bottom:var(--space-lg)">
        ${UI.fileItem('Laporan_Statistik_TW1_2026.pdf', '2.4 MB')}
        ${cap.evidenceCount > 1 ? UI.fileItem('Data_Pendukung.xlsx', '1.1 MB') : ''}
      </div>

      <h3 class="mb-md">📝 Timeline</h3>
      <div style="border-left:2px solid var(--primary-200);padding-left:var(--space-md);margin-bottom:var(--space-lg)">
        <div style="margin-bottom:var(--space-sm)"><span style="font-weight:600">${cap.submittedAt}</span> — <span style="color:var(--neutral-600)">Disubmit oleh ${submitter ? submitter.fullName : 'Operator Unit'}</span></div>
        ${cap.status === 'verified' || cap.status === 'approved' ? `<div style="margin-bottom:var(--space-sm)"><span style="font-weight:600">${cap.submittedAt}</span> — <span style="color:var(--success-600)">Diverifikasi oleh Verifikator Unit</span></div>` : ''}
        ${cap.status === 'approved' ? `<div><span style="font-weight:600">${cap.submittedAt}</span> — <span style="color:var(--success-600)">Disetujui oleh Reviewer</span></div>` : ''}
      </div>

      <h3 class="mb-md">💬 Komentar / Catatan Reviewer</h3>
      ${UI.formTextarea('komentar', 'Tulis komentar verifikasi (wajib jika reject)...')}`;

    const isSubmitted = cap.status === 'submitted';
    const isVerified = cap.status === 'verified';
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Tutup</button>
      ${isSubmitted && !App.isReadOnlyRole() ? `
        <button class="btn btn-danger" onclick="App.closeModal()">✗ Tolak</button>
        <button class="btn btn-success" onclick="App.closeModal()">✅ Verifikasi</button>
      ` : ''}
      ${isVerified && !App.isReadOnlyRole() ? `
        <button class="btn btn-danger" onclick="App.closeModal()">✗ Reject</button>
        <button class="btn btn-success" onclick="App.closeModal()">✅ Approve</button>
      ` : ''}`;

    document.getElementById('modal-container').innerHTML = UI.modal('Review Capaian Kinerja', content, footer, 'xl');
  }
};
