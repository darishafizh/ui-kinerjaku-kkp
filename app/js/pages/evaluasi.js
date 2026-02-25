/* ============================================
   KinerjaKu Next — Evaluasi Kinerja
   ============================================ */

const EvaluasiPage = {
  activeTab: 'evaluasi',
  showRekForm: false,
  rekTindakLanjutCount: 1,

  render() {
    // Rekomendasi & Tindak Lanjut is a standalone page
    if (this.activeTab === 'rekomendasi') {
      return `
        <div class="page-header">
          <div>
            <h1 class="page-title">Rekomendasi & Tindak Lanjut</h1>
            <p class="text-muted" style="margin-top:4px">Rekomendasi evaluasi dan tindak lanjut</p>
          </div>
        </div>
        <div id="evaluasi-content">${this.renderRekomendasi()}</div>`;
    }

    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Evaluasi Kinerja</h1>
          <p class="text-muted" style="margin-top:4px">Lembar kerja evaluasi, rekomendasi, dan tindak lanjut</p>
        </div>
      </div>
      ${UI.tabs([
      { id: 'evaluasi', label: '📝 Lembar Kerja Evaluasi', count: MockData.evaluasi.length },
      { id: 'rekomendasi', label: '💡 Rekomendasi', count: MockData.rekomendasi.length },
      { id: 'tindak_lanjut', label: '📌 Tindak Lanjut', count: MockData.tindakLanjut.length }
    ], this.activeTab, 'EvaluasiPage.switchTab')}
      <div id="evaluasi-content">${this.renderContent()}</div>`;
  },

  switchTab(tabId) { this.activeTab = tabId; App.renderPage(); },

  renderContent() {
    switch (this.activeTab) {
      case 'evaluasi': return this.renderEvaluasi();
      case 'rekomendasi': return this.renderRekomendasi();
      case 'tindak_lanjut': return this.renderTindakLanjut();
      default: return this.renderEvaluasi();
    }
  },

  renderEvaluasi() {
    // Get ALL units sorted by code for the table
    const allUnits = MockData.units
      .filter(u => u.level <= 2)
      .sort((a, b) => a.code.localeCompare(b.code));

    // Build Unit Kerja Lingkup options
    const lingkupOptions = MockData.units.filter(u => u.level <= 1).sort((a, b) => a.code.localeCompare(b.code)).map(u =>
      `<option value="${u.id}" ${u.id === 'unit-000' ? 'selected' : ''}>${u.code} - ${u.name}</option>`
    ).join('');

    const thStyle = 'padding:10px 8px;font-weight:700;font-size:12px;border:1px solid #dee2e6;background:#f8f9fa;text-align:left;cursor:pointer';

    return `
      <!-- ── Filter Panel ── -->
      <div style="border:1px solid #dee2e6;border-radius:4px;padding:16px 20px;margin-bottom:20px;background:#fff">
        <div style="display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap">
          <div style="flex:1;min-width:300px">
            <label style="display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px">Unit Kerja Lingkup</label>
            <select class="form-select" style="padding:5px 8px;font-size:13px;width:100%">
              ${lingkupOptions}
            </select>
          </div>
          <div style="min-width:80px">
            <label style="display:block;font-size:12px;font-weight:600;color:#555;margin-bottom:4px">Tahun</label>
            <select class="form-select" style="padding:5px 8px;font-size:13px;min-width:80px">
              <option value="2026" selected>2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn" style="font-size:13px;padding:5px 16px;background:#fff;border:1px solid #ccc;color:#333;cursor:pointer">Panduan</button>
            <button class="btn" style="font-size:13px;padding:5px 16px;background:var(--accent-500);border:1px solid var(--accent-500);color:#fff;cursor:pointer;border-radius:4px">Download</button>
            <button class="btn" style="font-size:13px;padding:5px 16px;background:var(--danger-500, #dc3545);border:1px solid var(--danger-500, #dc3545);color:#fff;cursor:pointer;border-radius:4px">Tutup</button>
          </div>
        </div>
      </div>

      <!-- ── Unit Kerja Table ── -->
      <div style="border:1px solid #dee2e6;border-radius:4px;overflow-x:auto;background:#fff">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #eee">
          <div style="font-size:13px;color:#555">
            <select style="padding:3px 6px;font-size:12px;border:1px solid #ccc;border-radius:3px;margin-right:4px">
              <option>25</option><option>50</option><option>100</option>
            </select>
            records per page
          </div>
          <div style="font-size:13px;color:#555">
            Search: <input type="text" style="padding:3px 8px;font-size:12px;border:1px solid #ccc;border-radius:3px;width:150px" />
          </div>
        </div>
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr>
              <th style="${thStyle};width:50px;text-align:center">NO ↕</th>
              <th style="${thStyle};width:120px">Kode ↕</th>
              <th style="${thStyle}">UNIT KERJA ↕</th>
              <th style="${thStyle};width:180px;text-align:center">NILAI AKUNTABILITAS ↕</th>
              <th style="${thStyle};width:120px;text-align:center">PREDIKAT ↕</th>
            </tr>
          </thead>
          <tbody>
            ${allUnits.map((unit, i) => `
              <tr style="border-bottom:1px solid #eee${i % 2 === 1 ? ';background:#fafafa' : ''}">
                <td style="padding:8px;text-align:center;font-size:13px;border:1px solid #eee">${i + 1}</td>
                <td style="padding:8px;font-size:13px;border:1px solid #eee">${unit.code}</td>
                <td style="padding:8px;font-size:13px;border:1px solid #eee">${unit.name}</td>
                <td style="padding:8px;text-align:center;font-size:13px;border:1px solid #eee">0</td>
                <td style="padding:8px;text-align:center;font-size:13px;border:1px solid #eee"></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="padding:12px 16px;font-size:12px;color:#888;border-top:1px solid #eee">
          Showing 1 to ${allUnits.length} of ${allUnits.length} entries
        </div>
      </div>`;
  },

  renderRekomendasi() {
    const rekData = this.getRekData();

    const thStyle = 'padding:10px 8px;font-weight:700;font-size:12px;border:1px solid #dee2e6;background:#f8f9fa;text-align:left;vertical-align:middle';
    const tdStyle = 'padding:8px;font-size:13px;border:1px solid #eee;vertical-align:top';

    // Build tindak lanjut rows
    let tindakLanjutRows = '';
    for (let i = 1; i <= this.rekTindakLanjutCount; i++) {
      tindakLanjutRows += `
        <div style="border:1px solid #ddd;border-radius:4px;padding:16px;margin-bottom:12px;position:relative">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <strong style="font-size:13px">Tindak Lanjut ${i}</strong>
            <button onclick="EvaluasiPage.removeRekTL(${i})" style="font-size:11px;padding:4px 12px;background:#d9534f;border:none;color:#fff;cursor:pointer;border-radius:3px">Hapus</button>
          </div>
          <div style="display:flex;gap:16px">
            <div style="flex:1">
              <textarea style="width:100%;min-height:80px;padding:8px;font-size:13px;border:1px solid #ccc;border-radius:4px;resize:vertical" placeholder="Tuliskan tindak lanjut..."></textarea>
            </div>
            <div style="width:220px">
              <div style="margin-bottom:8px">
                <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px">Status</label>
                <select style="width:100%;padding:5px 8px;font-size:13px;border:1px solid #ccc;border-radius:4px">
                  <option>Belum Tuntas</option>
                  <option>Sudah Tuntas</option>
                </select>
              </div>
              <div>
                <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px">Tautan Tindak Lanjut ${i} (satu per baris)</label>
                <textarea style="width:100%;min-height:60px;padding:8px;font-size:12px;border:1px solid #ccc;border-radius:4px;resize:vertical" placeholder="https://..."></textarea>
              </div>
            </div>
          </div>
        </div>`;
    }

    // Build inline form
    const formHtml = this.showRekForm ? `
      <div style="border:1px solid #dee2e6;border-radius:4px;padding:20px;margin-bottom:20px;background:#fff">
        <div style="display:flex;gap:20px;margin-bottom:16px">
          <div style="flex:1">
            <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px">Unit Kerja</label>
            <input type="text" placeholder="Ketik nama bagian..." style="width:100%;padding:8px 12px;font-size:13px;border:1px solid #ccc;border-radius:4px" />
          </div>
          <div style="width:120px">
            <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px">Tahun</label>
            <input type="text" value="2026" style="width:100%;padding:8px 12px;font-size:13px;border:1px solid #ccc;border-radius:4px;background:#f5f5f5" readonly />
          </div>
        </div>
        <div style="margin-bottom:16px">
          <label style="display:block;font-size:13px;font-weight:700;margin-bottom:6px">Rekomendasi</label>
          <textarea style="width:100%;min-height:100px;padding:8px 12px;font-size:13px;border:1px solid #ccc;border-radius:4px;resize:vertical" placeholder="Tuliskan rekomendasi di sini..."></textarea>
        </div>
        <div style="margin-bottom:12px">
          <label style="display:block;font-size:13px;font-weight:700;margin-bottom:8px">Daftar Tindak Lanjut</label>
          ${tindakLanjutRows}
        </div>
        <div style="margin-bottom:16px">
          <button onclick="EvaluasiPage.addRekTL()" style="font-size:12px;padding:6px 16px;background:#5bc0de;border:1px solid #5bc0de;color:#fff;cursor:pointer;border-radius:4px">+ Tambah Baris Tindak Lanjut</button>
        </div>
        <div style="display:flex;gap:8px">
          <button onclick="EvaluasiPage.showRekForm=false;App.renderPage()" style="font-size:13px;padding:6px 16px;background:#5cb85c;border:1px solid #5cb85c;color:#fff;cursor:pointer;border-radius:4px">Simpan</button>
          <button onclick="EvaluasiPage.showRekForm=false;EvaluasiPage.rekTindakLanjutCount=1;App.renderPage()" style="font-size:13px;padding:6px 16px;background:#d9534f;border:1px solid #d9534f;color:#fff;cursor:pointer;border-radius:4px">Batal/Tutup</button>
        </div>
      </div>` : '';

    return `
      <!-- ── Action Buttons ── -->
      <div style="margin-bottom:16px;display:flex;gap:8px">
        <button class="btn" onclick="EvaluasiPage.showRekForm=true;App.renderPage()" style="font-size:13px;padding:6px 16px;background:#5bc0de;border:1px solid #5bc0de;color:#fff;cursor:pointer;border-radius:4px">Tambah Rekomendasi</button>
        <button class="btn" onclick="EvaluasiPage.exportExcel()" style="font-size:13px;padding:6px 16px;background:#5cb85c;border:1px solid #5cb85c;color:#fff;cursor:pointer;border-radius:4px">Export Excel</button>
        <button class="btn" onclick="EvaluasiPage.exportPDF()" style="font-size:13px;padding:6px 16px;background:var(--danger-500, #dc3545);border:1px solid var(--danger-500, #dc3545);color:#fff;cursor:pointer;border-radius:4px">Export PDF</button>
      </div>

      ${formHtml}

      <!-- ── Table ── -->
      <div style="border:1px solid #dee2e6;border-radius:4px;overflow-x:auto;background:#fff">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #eee">
          <div style="font-size:13px;color:#555">
            Show
            <select style="padding:3px 6px;font-size:12px;border:1px solid #ccc;border-radius:3px;margin:0 4px">
              <option>25</option><option>50</option><option>100</option>
            </select>
            entries
          </div>
          <div style="font-size:13px;color:#555">
            Search: <input type="text" style="padding:3px 8px;font-size:12px;border:1px solid #ccc;border-radius:3px;width:150px" />
          </div>
        </div>
        <table style="width:100%;border-collapse:collapse">
          <thead>
            <tr>
              <th style="${thStyle};width:40px;text-align:center">No ↕</th>
              <th style="${thStyle};width:50px;text-align:center">Level ↕</th>
              <th style="${thStyle};width:160px">Unit Kerja ↕</th>
              <th style="${thStyle};width:140px">Unit Kerja Atasan ↕</th>
              <th style="${thStyle};width:60px;text-align:center">Tahun ↕</th>
              <th style="${thStyle}">Rekomendasi ↕</th>
              <th style="${thStyle};width:80px;text-align:center">Jumlah Tindak Lanjut ↕</th>
              <th style="${thStyle};width:180px;text-align:center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${rekData.map(r => `
              <tr>
                <td style="${tdStyle};text-align:center">${r.no}</td>
                <td style="${tdStyle};text-align:center">${r.level}</td>
                <td style="${tdStyle}">${r.unitKerja}</td>
                <td style="${tdStyle}">${r.unitAtasan}</td>
                <td style="${tdStyle};text-align:center">${r.tahun}</td>
                <td style="${tdStyle}">${r.rekomendasi}</td>
                <td style="${tdStyle};text-align:center">${r.jumlahTL}</td>
                <td style="${tdStyle};text-align:center">
                  <div style="display:flex;gap:4px;justify-content:center">
                    <button style="font-size:11px;padding:4px 10px;background:#5bc0de;border:none;color:#fff;cursor:pointer;border-radius:3px">Lihat</button>
                    <button style="font-size:11px;padding:4px 10px;background:#f0ad4e;border:none;color:#fff;cursor:pointer;border-radius:3px">Edit</button>
                    <button style="font-size:11px;padding:4px 10px;background:#d9534f;border:none;color:#fff;cursor:pointer;border-radius:3px">Hapus</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-top:1px solid #eee">
          <div style="font-size:12px;color:#888">Showing 1 to ${rekData.length} of ${rekData.length} entries</div>
          <div style="display:flex;gap:4px">
            <button style="font-size:12px;padding:4px 10px;background:#fff;border:1px solid #ccc;border-radius:3px;cursor:pointer">Previous</button>
            <button style="font-size:12px;padding:4px 10px;background:#337ab7;border:1px solid #337ab7;color:#fff;border-radius:3px;cursor:pointer">1</button>
            <button style="font-size:12px;padding:4px 10px;background:#fff;border:1px solid #ccc;border-radius:3px;cursor:pointer">Next</button>
          </div>
        </div>
      </div>`;
  },

  getRekData() {
    return [
      { no: 1, level: 1, unitKerja: 'SEKRETARIAT JENDERAL', unitAtasan: 'KEMENTERIAN KELAUTAN DAN PERIKANAN', tahun: 2025, rekomendasi: 'meningkatkan capaian kinerja organisasi', jumlahTL: 2 },
      { no: 2, level: 1, unitKerja: 'SEKRETARIAT JENDERAL', unitAtasan: 'KEMENTERIAN KELAUTAN DAN PERIKANAN', tahun: 2025, rekomendasi: 'Sekretaris Jenderal agar menginstruksikan secara tertulis kepada Tim Manajemen Kinerja untuk melakukan monitoring dan evaluasi capaian kinerja secara berkala', jumlahTL: 2 },
      { no: 3, level: 1, unitKerja: 'DIREKTORAT JENDERAL PENGAWASAN SUMBER DAYA KELAUTAN DAN PERIKANAN', unitAtasan: 'KEMENTERIAN KELAUTAN DAN PERIKANAN', tahun: 2025, rekomendasi: 'Menginstruksikan secara tertulis kepada Tim Manajemen Kinerja untuk melakukan monitoring dan evaluasi capaian kinerja secara berkala, serta melakukan upaya-upaya secara berkelanjutan dalam mendorong pencapaian IKU lingkup Ditjen PSDKP.', jumlahTL: 1 },
      { no: 4, level: 1, unitKerja: 'DIREKTORAT JENDERAL PENGAWASAN SUMBER DAYA KELAUTAN DAN PERIKANAN', unitAtasan: 'KEMENTERIAN KELAUTAN DAN PERIKANAN', tahun: 2025, rekomendasi: 'Menginstruksikan secara tertulis kepada Tim Manajemen Kinerja untuk melakukan upaya-upaya inovatif sehingga dapat menjadi percontohan pada tingkat kementerian dan mengikut sertakan pada kompetisi.', jumlahTL: 1 },
      { no: 5, level: 1, unitKerja: 'BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN', unitAtasan: 'KEMENTERIAN KELAUTAN DAN PERIKANAN', tahun: 2025, rekomendasi: 'Kepala BPPSDMKP agar menginstruksikan secara tertulis kepada: a. Sekretaris BPPSDMKP untuk: 1) Melengkapi Sasaran Kegiatan yang belum memiliki Sasaran Program pada draft Rencana Strategis BPPSDMKP Tahun 2025-2029.', jumlahTL: 1 },
      { no: 6, level: 1, unitKerja: 'BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA KELAUTAN DAN PERIKANAN', unitAtasan: 'KEMENTERIAN KELAUTAN DAN PERIKANAN', tahun: 2025, rekomendasi: 'Kepala BPPSDMKP agar menginstruksikan secara tertulis kepada: b. Kepala Pusat Pelatihan KP untuk: 1) melengkapi bukti dukung hasil evaluasi atas rencana aksi; dan 2) melengkapi bukti dukung tindak lanjut atas rekomendasi LKj Triwulan I Tahun 2025.', jumlahTL: 1 },
      { no: 7, level: 1, unitKerja: 'DIREKTORAT JENDERAL PENGELOLAAN KELAUTAN', unitAtasan: 'KEMENTERIAN KELAUTAN DAN PERIKANAN', tahun: 2025, rekomendasi: 'meningkatkan capaian kinerja ....', jumlahTL: 2 },
    ];
  },

  exportExcel() {
    const data = this.getRekData();
    const rows = data.map(r => ({
      'No': r.no, 'Level': r.level, 'Unit Kerja': r.unitKerja,
      'Unit Kerja Atasan': r.unitAtasan, 'Tahun': r.tahun,
      'Rekomendasi': r.rekomendasi, 'Jumlah Tindak Lanjut': r.jumlahTL
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [{ wch: 5 }, { wch: 6 }, { wch: 35 }, { wch: 35 }, { wch: 6 }, { wch: 60 }, { wch: 15 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Rekomendasi');
    // Use base64 data URI for Safari/file:// compatibility
    const b64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
    const a = document.createElement('a');
    a.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + b64;
    a.download = 'Rekomendasi_Tindak_Lanjut.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  exportPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(16);
    doc.text('Rekomendasi & Tindak Lanjut', 14, 15);
    doc.setFontSize(10);
    doc.text('Kementerian Kelautan dan Perikanan', 14, 22);
    const data = this.getRekData();
    doc.autoTable({
      startY: 28,
      head: [['No', 'Level', 'Unit Kerja', 'Unit Kerja Atasan', 'Tahun', 'Rekomendasi', 'Jml TL']],
      body: data.map(r => [r.no, r.level, r.unitKerja, r.unitAtasan, r.tahun, r.rekomendasi, r.jumlahTL]),
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [52, 73, 94] },
      columnStyles: {
        0: { cellWidth: 10 }, 1: { cellWidth: 12 }, 2: { cellWidth: 40 },
        3: { cellWidth: 40 }, 4: { cellWidth: 14 }, 5: { cellWidth: 120 }, 6: { cellWidth: 14 }
      }
    });
    // Use base64 data URI for Safari/file:// compatibility
    const pdfB64 = doc.output('datauristring');
    const a = document.createElement('a');
    a.href = pdfB64;
    a.download = 'Rekomendasi_Tindak_Lanjut.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  addRekTL() { this.rekTindakLanjutCount++; App.renderPage(); },
  removeRekTL(idx) { if (this.rekTindakLanjutCount > 1) { this.rekTindakLanjutCount--; App.renderPage(); } },

  showCreateEval() {
    const content = `
      ${UI.formGroup('Unit Kerja', UI.formSelect('unit', MockData.units.filter(u => u.level === 1).map(u => ({ value: u.id, label: u.name }))), '', true)}
      <div class="form-row">
        ${UI.formGroup('Tahun', UI.formSelect('tahun', ['2026', '2025']))}
        ${UI.formGroup('Semester', UI.formSelect('semester', ['1', '2']))}
      </div>
      <h3 class="mb-md mt-md">Komponen Evaluasi</h3>
      <table>
        <thead><tr><th>Komponen</th><th>Bobot Maks</th><th>Skor</th><th>Catatan</th></tr></thead>
        <tbody>
          ${['Perencanaan Kinerja|30', 'Pengukuran Kinerja|25', 'Pelaporan Kinerja|15', 'Evaluasi Internal|10', 'Capaian Kinerja|20'].map(x => {
      const [name, max] = x.split('|');
      return `<tr><td>${name}</td><td>${max}</td><td><input class="form-input" type="number" min="0" max="${max}" style="width:80px" /></td><td><input class="form-input" placeholder="Catatan..." /></td></tr>`;
    }).join('')}
        </tbody>
      </table>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-secondary" onclick="App.closeModal()">Simpan</button>
      <button class="btn btn-primary" onclick="App.closeModal()">Finalisasi</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Buat Lembar Kerja Evaluasi', content, footer, 'lg');
  },

  showAddRekomendasi() {
    const content = `
      ${UI.formGroup('Unit Kerja', UI.formSelect('unit', MockData.units.filter(u => u.level === 1).map(u => ({ value: u.id, label: u.name }))), '', true)}
      ${UI.formGroup('Uraian Rekomendasi', UI.formTextarea('rek', 'Tuliskan rekomendasi...'), '', true)}
      <div class="form-row">
        ${UI.formGroup('Prioritas', UI.formSelect('prioritas', ['high', 'medium', 'low'].map(p => ({ value: p, label: p === 'high' ? 'Tinggi' : p === 'medium' ? 'Sedang' : 'Rendah' }))), '', true)}
        ${UI.formGroup('Due Date', UI.formInput('due', '', '', 'date'), '', true)}
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="App.closeModal()">Simpan</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Tambah Rekomendasi', content, footer);
  },

  showDetailEval(id) {
    const ev = MockData.evaluasi.find(e => e.id === id);
    if (!ev) return;
    const content = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);margin-bottom:var(--space-lg)">
        <div><strong>Unit:</strong> ${ev.unitName}</div>
        <div><strong>Periode:</strong> ${ev.periodYear} SM ${ev.periodSemester}</div>
        <div><strong>Komponen:</strong> ${ev.component}</div>
        <div><strong>Skor:</strong> <span style="font-weight:700;color:var(--primary-600)">${ev.score}</span> / ${ev.maxScore}</div>
        <div style="grid-column:1/-1"><strong>Catatan:</strong> ${ev.notes}</div>
        <div><strong>Evaluator:</strong> ${ev.evaluator}</div>
      </div>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Detail Evaluasi', content, `<button class="btn btn-ghost" onclick="App.closeModal()">Tutup</button>`);
  },

  showUpdateTL() {
    const content = `
      ${UI.formGroup('Catatan Progres', UI.formTextarea('progres', 'Update progres terbaru...'))}
      ${UI.formGroup('Status', UI.formSelect('status', [{ value: 'in_progress', label: 'In Progress' }, { value: 'completed', label: 'Completed' }]))}
      <h3 class="mb-md mt-md">Upload Evidence (Opsional)</h3>
      ${UI.dropzone()}`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="App.closeModal()">Simpan Update</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Update Tindak Lanjut', content, footer);
  }
};
