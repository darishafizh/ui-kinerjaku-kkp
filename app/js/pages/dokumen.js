/* ============================================
   KinerjaKu — Dokumen
   ============================================ */

const DokumenPage = {
  activeTab: 'pohon',

  render() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Dokumen</h1>
          <p class="text-muted" style="margin-top:4px">Pohon kinerja, manual indikator, dan dokumen kinerja</p>
        </div>
      </div>
      <div id="dokumen-content">${this.renderContent()}</div>`;
  },

  switchTab(tabId) { this.activeTab = tabId; App.renderPage(); },

  renderContent() {
    switch (this.activeTab) {
      case 'pohon': return this.renderPohon();
      case 'manual': return this.renderManual();
      case 'dokumen': return this.renderDokumen();
      default: return this.renderPohon();
    }
  },

  renderPohon() {
    const allUnits = MockData.units.filter(u => u.level <= 1);
    const thStyle = 'padding:8px 6px;font-weight:700;font-size:11px;border:1px solid #dee2e6;background:#f8f9fa;text-align:center;vertical-align:middle';
    const tdStyle = 'padding:6px 8px;font-size:12px;border:1px solid #eee;text-align:center;vertical-align:top';
    const tdLeft = 'padding:6px 8px;font-size:12px;border:1px solid #eee;text-align:left;vertical-align:top';

    const rows = MockData.indikator.map(ik => {
      const sasaran = MockData.sasaran.find(s => s.id === ik.sasaranId);
      const target = MockData.targetPeriodik.find(t => t.indikatorId === ik.id && t.periodNumber === 1);
      const cascading = MockData.indikator.filter(i => i.cascadingParentId === ik.id).length;
      return {
        perspektif: sasaran ? (sasaran.level === 'Kementerian' ? 'Stakeholder' : sasaran.level) : '-',
        sasaran: sasaran ? sasaran.code + '. ' + sasaran.name : '-',
        kode: ik.code.replace('IK.', 'IKSS.'),
        indikator: ik.name,
        validasi: 'outcome',
        polarisasi: ik.polarity === 'maximize' ? 'Maximize' : 'Minimize',
        target: target ? target.value : (ik.targetTahunan || 0),
        satuan: ik.unit,
        pagu: 0,
        cascading: cascading,
        diambil: 0
      };
    });

    // Cascading Tree Data
    const tree = [
      {
        id: 'ss1', label: 'SS.1 Peningkatan Produksi Perikanan', level: 0, children: [
          { id: 'ik1', label: 'IKU — Volume Produksi Perikanan Tangkap', unit: 'DJPT', pct: 108.3 },
          { id: 'ik2', label: 'IKU — Volume Produksi Perikanan Budidaya', unit: 'DJPB', pct: 95.1 },
        ]
      },
      {
        id: 'ss2', label: 'SS.2 Pemberdayaan Pelaku Usaha Perikanan', level: 0, children: [
          { id: 'ik3', label: 'IKU — Nilai Tukar Nelayan (NTN)', unit: 'DJPT', pct: 100.9 },
          { id: 'ik4', label: 'IKU — Jumlah Pelaku Usaha Terlatih', unit: 'DJPDSPKP', pct: 88.5 },
        ]
      },
      {
        id: 'ss3', label: 'SS.3 Tata Kelola Sumber Daya Kelautan', level: 0, children: [
          { id: 'ik5', label: 'IKU — Persentase Kapal Berlisensi', unit: 'DJPT', pct: 81.4 },
          { id: 'ik6', label: 'IKU — Luas Kawasan Konservasi Laut', unit: 'Setjen', pct: 102.7 },
        ]
      },
    ];
    const treeColor = (pct) => pct >= 90 ? '#15803d' : pct >= 60 ? '#f59e0b' : '#dc2626';

    return `
      <!-- Visual Cascading Tree -->
      <div class="card" style="margin-bottom:20px">
        <div class="card-header" style="display:flex;align-items:center;justify-content:space-between">
          <h3 class="card-title">🔗 Visualisasi Cascading Kinerja</h3>
          <span style="font-size:11px;color:#94a3b8">Kementerian → Unit Eselon I → Indikator</span>
        </div>
        <div class="card-body" style="padding:20px">
          <div style="text-align:center;margin-bottom:16px">
            <div style="display:inline-block;padding:10px 24px;background:linear-gradient(135deg,#0C4A6E,#0284c7);color:#fff;border-radius:10px;font-weight:700;font-size:14px;box-shadow:0 2px 8px rgba(12,74,110,0.2)">
              🏛️ Kementerian Kelautan dan Perikanan
            </div>
            <div style="width:2px;height:20px;background:#0C4A6E;margin:0 auto"></div>
          </div>
          ${tree.map(ss => `
            <div style="margin-bottom:20px">
              <div style="margin-left:40px;padding:8px 16px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;display:inline-flex;align-items:center;gap:8px;font-weight:600;font-size:13px;color:#0C4A6E">
                🎯 ${ss.label}
              </div>
              <div style="margin-left:60px;border-left:2px solid #bae6fd;padding-left:16px;margin-top:4px">
                ${ss.children.map(ik => `
                  <div style="display:flex;align-items:center;gap:10px;padding:6px 0;position:relative">
                    <div style="position:absolute;left:-17px;top:50%;width:16px;height:2px;background:#bae6fd"></div>
                    <span style="flex-shrink:0;width:10px;height:10px;border-radius:50%;background:${treeColor(ik.pct)}"></span>
                    <span style="font-size:12px;color:#334155;flex:1">${ik.label}</span>
                    <span style="font-size:11px;padding:2px 8px;border-radius:10px;background:#f1f5f9;color:#475569">${ik.unit}</span>
                    <span style="font-size:12px;font-weight:700;color:${treeColor(ik.pct)}">${ik.pct}%</span>
                  </div>`).join('')}
              </div>
            </div>`).join('')}
          <div style="display:flex;gap:16px;margin-top:12px;font-size:11px;color:#64748b;justify-content:center">
            <span>🟢 ≥ 90% (On Track)</span>
            <span>🟡 60-89% (At Risk)</span>
            <span>🔴 < 60% (Critical)</span>
          </div>
        </div>
      </div>

      <div style="border:1px solid #dee2e6;border-radius:4px;padding:16px 20px;margin-bottom:16px;background:#fff;display:flex;align-items:flex-end;gap:20px;flex-wrap:wrap">
        <div style="flex:1;min-width:250px">
          <label style="display:block;font-size:12px;font-weight:700;margin-bottom:4px">Unit Kerja</label>
          <select style="width:100%;padding:6px 10px;font-size:13px;border:1px solid #ccc;border-radius:4px">
            <option selected>KEMENTERIAN KELAUTAN DAN PERIKANAN</option>
            ${allUnits.filter(u => u.level === 1).map(u => '<option>' + u.name + '</option>').join('')}
          </select>
        </div>
        <div style="width:100px">
          <label style="display:block;font-size:12px;font-weight:700;margin-bottom:4px">Tahun</label>
          <select style="width:100%;padding:6px 10px;font-size:13px;border:1px solid #ccc;border-radius:4px">
            <option>2026</option><option>2025</option>
          </select>
        </div>
        <div style="display:flex;gap:6px">
          <button style="padding:6px 16px;font-size:13px;background:#5bc0de;border:1px solid #5bc0de;color:#fff;cursor:pointer;border-radius:4px">Tutup</button>
        </div>
      </div>
      <div style="border:1px solid #dee2e6;border-radius:4px;overflow-x:auto;background:#fff">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-bottom:1px solid #eee">
          <div style="font-size:13px;color:#555"><select style="padding:3px 6px;font-size:12px;border:1px solid #ccc;border-radius:3px;margin-right:4px" onchange="UI.paginateTable(this)"><option>25</option><option>50</option><option>100</option></select> records per page</div>
          <div style="font-size:13px;color:#555">Search: <input type="text" style="padding:3px 8px;font-size:12px;border:1px solid #ccc;border-radius:3px;width:150px" oninput="EvaluasiPage.filterEvalTable(this.value)" /></div>
        </div>
        <table style="width:100%;border-collapse:collapse;min-width:1400px">
          <thead>
            <tr>
              <th style="${thStyle};width:35px">No ↕</th>
              <th style="${thStyle};width:80px">Perspektif ↕</th>
              <th style="${thStyle};width:180px;text-align:left">Sasaran ↕</th>
              <th style="${thStyle};width:90px">Kode ↕</th>
              <th style="${thStyle};width:180px;text-align:left">Indikator Kinerja ↕</th>
              <th style="${thStyle};width:70px">Validasi ↕</th>
              <th style="${thStyle};width:75px">Polarisasi ↕</th>
              <th style="${thStyle};width:65px">Target ↕</th>
              <th style="${thStyle};width:80px">Satuan ↕</th>
              <th style="${thStyle};width:65px">Pagu<br>(Rp) ↕</th>
              <th style="${thStyle};width:65px">Jumlah<br>Cascading ↕</th>
              <th style="${thStyle};width:65px">Jumlah<br>diambil ↕</th>
              <th style="${thStyle};width:70px">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((r, i) => '<tr>' +
      '<td style="' + tdStyle + '">' + (i + 1) + '</td>' +
      '<td style="' + tdStyle + '">' + r.perspektif + '</td>' +
      '<td style="' + tdLeft + '">' + r.sasaran + '</td>' +
      '<td style="' + tdStyle + '">' + r.kode + '</td>' +
      '<td style="' + tdLeft + '">' + r.indikator + ' 🔍</td>' +
      '<td style="' + tdStyle + '">' + r.validasi + '</td>' +
      '<td style="' + tdStyle + '">' + r.polarisasi + '</td>' +
      '<td style="' + tdStyle + '">' + (typeof r.target === 'number' ? r.target.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : r.target) + '</td>' +
      '<td style="' + tdStyle + '">' + r.satuan + '</td>' +
      '<td style="' + tdStyle + '">' + r.pagu + '</td>' +
      '<td style="' + tdStyle + '">' + r.cascading + '🔍</td>' +
      '<td style="' + tdStyle + '">' + r.diambil + '</td>' +
      '<td style="' + tdStyle + '"><button style="padding:3px 10px;font-size:11px;background:#fff;border:1px solid #ccc;border-radius:3px;cursor:pointer">Pohon IK</button></td>' +
      '</tr>').join('')}
          </tbody>
        </table>
        <div style="padding:10px 16px;font-size:12px;color:#888;border-top:1px solid #eee">Showing 1 to ${rows.length} of ${rows.length} entries</div>
      </div>`;
  },

  renderManual() {
    const manuals = [
      { title: 'Manual IKU — Volume Produksi Perikanan Tangkap', indikator: 'IK.01.01', version: 2, updated: '2026-01-15' },
      { title: 'Manual IKU — Nilai Tukar Nelayan', indikator: 'IK.01.02', version: 1, updated: '2026-01-12' },
      { title: 'Manual IKU — Persentase Kapal Berlisensi', indikator: 'IK.01.03', version: 1, updated: '2026-01-10' },
      { title: 'Manual IKU — Volume Produksi Budidaya', indikator: 'IK.02.01', version: 1, updated: '2025-12-20' },
    ];
    return `
      ${UI.toolbar('Cari manual indikator...', [
      { label: '＋ Upload Manual', class: 'btn-primary', action: 'DokumenPage.showUploadManual()' }
    ])}
      ${UI.table([
      { label: 'Judul Manual', key: 'title' },
      { label: 'Indikator Terkait', key: 'indikator' },
      { label: 'Versi', render: r => 'v' + r.version },
      { label: 'Terakhir Update', key: 'updated' },
      {
        label: 'Aksi', render: () => '<button class="btn btn-ghost btn-sm">👁️ Lihat</button> <button class="btn btn-secondary btn-sm">📥 Download</button>'
      }
    ], manuals)}`;
  },

  renderDokumen() {
    const allUnits = MockData.units.sort((a, b) => (a.code || '').localeCompare(b.code || ''));
    const thStyle = 'padding:8px 6px;font-weight:700;font-size:11px;border:1px solid #dee2e6;background:#f8f9fa;text-align:center;vertical-align:middle';
    const tdStyle = 'padding:6px;font-size:12px;border:1px solid #eee;text-align:center';
    const tdLeft = 'padding:6px 8px;font-size:12px;border:1px solid #eee;text-align:left';
    const dokCols = ['Pohon Kinerja', 'Renstra', 'Renja', 'PK', 'SK Indikator Kinerja', 'Manual Indikator Kinerja', 'Matriks cascading/MPH', 'Rencana Aksi', 'Rincian Target Indikator', 'Laporan Kinerja Triwulan I', 'Laporan Kinerja Triwulan II', 'Laporan Kinerja Triwulan III', 'Laporan Kinerja Triwulan IV'];
    const rows = [{ code: '0000000000', name: 'KEMENTERIAN KELAUTAN DAN PERIKANAN', level: 0 }, ...allUnits];

    return `
      <div style="border:1px solid #dee2e6;border-radius:4px;padding:16px 20px;margin-bottom:16px;background:#fff;display:flex;align-items:flex-end;gap:20px;flex-wrap:wrap">
        <div style="flex:1;min-width:250px">
          <label style="display:block;font-size:12px;font-weight:700;margin-bottom:4px">Unit Kerja Lingkup</label>
          <select style="width:100%;padding:6px 10px;font-size:13px;border:1px solid #ccc;border-radius:4px">
            <option selected>KEMENTERIAN KELAUTAN DAN PERIKANAN</option>
            ${allUnits.filter(u => u.level === 1).map(u => '<option>' + u.name + '</option>').join('')}
          </select>
        </div>
        <div style="width:100px">
          <label style="display:block;font-size:12px;font-weight:700;margin-bottom:4px">Tahun</label>
          <select style="width:100%;padding:6px 10px;font-size:13px;border:1px solid #ccc;border-radius:4px">
            <option>2026</option><option>2025</option>
          </select>
        </div>
        <div style="display:flex;gap:6px">
          <button style="padding:6px 16px;font-size:13px;background:#5cb85c;border:1px solid #5cb85c;color:#fff;cursor:pointer;border-radius:4px">Download</button>
          <button style="padding:6px 16px;font-size:13px;background:#5bc0de;border:1px solid #5bc0de;color:#fff;cursor:pointer;border-radius:4px">Tutup</button>
        </div>
      </div>
      <div style="border:1px solid #dee2e6;border-radius:4px;overflow-x:auto;background:#fff">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-bottom:1px solid #eee">
          <div style="font-size:13px;color:#555"><select style="padding:3px 6px;font-size:12px;border:1px solid #ccc;border-radius:3px;margin-right:4px" onchange="UI.paginateTable(this)"><option>25</option><option>50</option><option>100</option></select> records per page</div>
          <div style="font-size:13px;color:#555">Search: <input type="text" style="padding:3px 8px;font-size:12px;border:1px solid #ccc;border-radius:3px;width:150px" oninput="EvaluasiPage.filterEvalTable(this.value)" /></div>
        </div>
        <table style="width:100%;border-collapse:collapse;min-width:1600px">
          <thead>
            <tr>
              <th rowspan="2" style="${thStyle};width:35px">NO ↕</th>
              <th rowspan="2" style="${thStyle};width:50px">LEVEL ↕</th>
              <th rowspan="2" style="${thStyle};width:100px">KODE ↕</th>
              <th rowspan="2" style="${thStyle};width:160px;text-align:left">UNIT KERJA ↕</th>
              <th colspan="${dokCols.length}" style="${thStyle}">DOKUMEN PERENCANAAN</th>
            </tr>
            <tr>${dokCols.map(c => '<th style="' + thStyle + ';width:75px;font-size:10px">' + c.replace(/ /g, '<br>') + ' ↕</th>').join('')}</tr>
          </thead>
          <tbody>
            ${rows.map((unit, i) => {
      const hasDoc = (unit.level === 0);
      return '<tr>' +
        '<td style="' + tdStyle + '">' + (i + 1) + '</td>' +
        '<td style="' + tdStyle + '">' + unit.level + '</td>' +
        '<td style="' + tdStyle + ';font-family:monospace">' + (unit.code || '0000000000') + '</td>' +
        '<td style="' + tdLeft + '">' + unit.name + '</td>' +
        dokCols.map((c, ci) => {
          let v = 0;
          if (hasDoc && [1, 3, 6, 8].includes(ci)) v = 1;
          return '<td style="' + tdStyle + '">' + v + '</td>';
        }).join('') +
        '</tr>';
    }).join('')}
          </tbody>
        </table>
        <div style="padding:10px 16px;font-size:12px;color:#888;border-top:1px solid #eee">Showing 1 to ${rows.length} of ${rows.length} entries</div>
      </div>`;
  },

  showUploadManual() {
    const fS = 'display:flex;align-items:center;margin-bottom:16px';
    const lS = 'width:140px;font-weight:600;font-size:13px;color:#333;flex-shrink:0';
    const ikOptions = MockData.indikator.map(ik => `<option value="${ik.id}">${ik.code} - ${ik.name}</option>`).join('');
    const content = `
      <div style="${fS}">
        <label style="${lS}">Judul Manual</label>
        <input id="manual-title" class="form-input" placeholder="Judul dokumen manual" style="flex:1">
      </div>
      <div style="${fS}">
        <label style="${lS}">Indikator Terkait</label>
        <select id="manual-ik" class="form-select" style="flex:1">${ikOptions}</select>
      </div>
      <div style="${fS}">
        <label style="${lS}">File</label>
        <input type="file" id="manual-file" class="form-input" style="flex:1" accept=".pdf,.doc,.docx,.xls,.xlsx">
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="DokumenPage.saveUploadManual()">📤 Upload</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Upload Manual IKU', content, footer);
  },

  saveUploadManual() {
    const title = document.getElementById('manual-title')?.value?.trim();
    if (!title) { document.getElementById('manual-title').style.border = '2px solid #e74c3c'; return; }
    MockData.pushActivityLog('upload', 'Dokumen', `Upload manual: "${title}"`);
    MockData.pushNotification('success', 'Manual diupload', `Manual "${title}" berhasil diupload.`);
    App.closeModal();
    App.renderPage();
  }
};
