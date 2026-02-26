/* ============================================
   KinerjaKu Next — Pelaporan Kinerja
   ============================================ */

const PelaporanPage = {
  searchTerm: '',
  render() {
    const search = (this.searchTerm || '').toLowerCase();
    const laporan = MockData.laporan.filter(l => {
      if (!search) return true;
      return (l.unitName || '').toLowerCase().includes(search) ||
        (l.status || '').toLowerCase().includes(search) ||
        (l.createdBy || '').toLowerCase().includes(search) ||
        (l.periodLabel || '').toLowerCase().includes(search);
    });
    const isReviewer = ['admin_pusat', 'auditor', 'unit_level0'].includes(MockData.currentUser.roleId);
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Pelaporan Kinerja</h1>
          <p class="text-muted" style="margin-top:4px">Penyusunan, reviu, dan penerbitan laporan kinerja</p>
        </div>
      </div>
      <div class="toolbar">
        <div class="toolbar-left">
          <div class="search-bar">
            <span class="search-bar-icon">🔍</span>
            <input type="text" placeholder="Cari laporan..." oninput="PelaporanPage.filterTable(this.value)" />
          </div>
        </div>
        <div class="toolbar-right"><button class="btn btn-primary" onclick="PelaporanPage.showCreateLaporan()">＋ Buat Laporan</button></div>
      </div>
      ${UI.table([
      { label: 'Unit Kerja', key: 'unitName' },
      { label: 'Periode', key: 'periodLabel' },
      { label: 'Versi', render: r => `<span class="badge badge-draft">v${r.version}</span>` },
      { label: 'Status', render: r => UI.badge(r.status) },
      { label: 'Terakhir Update', key: 'updatedAt' },
      { label: 'Dibuat Oleh', key: 'createdBy' },
      {
        label: 'Aksi', render: r => `
          <div style="display:flex;gap:4px;align-items:flex-start">
            <div style="display:flex;flex-direction:column;gap:4px">
              <button class="btn btn-ghost btn-sm" onclick="PelaporanPage.showDetail('${r.id}')" title="Lihat">👁️</button>
              ${r.status === 'approved' ? '<button class="btn btn-ghost btn-sm" onclick="PelaporanPage.deleteLaporan(\'' + r.id + '\')" title="Hapus" style="color:#dc2626">🗑️</button>' : ''}
            </div>
            <div style="display:flex;flex-direction:column;gap:4px">
            ${r.status === 'draft' ? '<button class="btn btn-primary btn-sm" onclick="PelaporanPage.showEditLaporan(\'' + r.id + '\')">✏️ Edit</button>' : ''}
            ${(r.status === 'draft' || r.status === 'rejected') ? '<button class="btn btn-sm" style="background:#dc2626;color:#fff;border:none" onclick="PelaporanPage.deleteLaporan(\'' + r.id + '\')">🗑️ Hapus</button>' : ''}
            ${(r.status === 'submitted' || r.status === 'under_review') && isReviewer ? '<button class="btn btn-sm" style="background:#f59e0b;color:#fff;border:none" onclick="PelaporanPage.showReview(\'' + r.id + '\')">📋 Review</button>' : ''}
            ${r.status === 'approved' ? '<button class="btn btn-accent btn-sm" onclick="PelaporanPage.generatePDF(\'' + r.id + '\')">📄 PDF</button>' : ''}
            ${r.status === 'approved' ? '<button class="btn btn-secondary btn-sm" onclick="PelaporanPage.generateDOCX(\'' + r.id + '\')">📝 DOCX</button>' : ''}
            </div>
          </div>` }
    ], laporan)}

      <div class="grid-2 mt-lg">
        <div class="card">
          <div class="card-header"><h3 class="card-title">📊 Ringkasan Status Laporan</h3></div>
          <div class="card-body">
            ${UI.donutChart([
      { label: 'Draft', value: laporan.filter(l => l.status === 'draft').length, color: 'var(--neutral-400)' },
      { label: 'Submitted', value: laporan.filter(l => l.status === 'submitted').length, color: 'var(--primary-400)' },
      { label: 'Under Review', value: laporan.filter(l => l.status === 'under_review').length, color: 'var(--warning-500)' },
      { label: 'Approved', value: laporan.filter(l => l.status === 'approved').length, color: 'var(--success-500)' },
      { label: 'Rejected', value: laporan.filter(l => l.status === 'rejected').length, color: 'var(--danger-500, #dc2626)' },
    ])}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">📅 Timeline Pelaporan</h3></div>
          <div class="card-body">
            <ul class="timeline" id="pelaporan-timeline">
              ${this.renderTimeline()}
            </ul>
          </div>
        </div>
      </div>`;
  },

  renderTimeline() {
    const statusAction = {
      'draft': 'draft dibuat',
      'submitted': 'disubmit untuk reviu',
      'under_review': 'sedang direview',
      'approved': 'disetujui Reviewer',
      'rejected': 'ditolak Reviewer'
    };
    const sorted = [...MockData.laporan]
      .filter(l => l.updatedAt)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 6);
    if (!sorted.length) return '<li class="timeline-item" style="color:#94a3b8">Belum ada aktivitas pelaporan.</li>';
    return sorted.map(l => {
      const d = new Date(l.updatedAt);
      const dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
      const shortName = l.unitName.replace('Ditjen ', '').replace('Direktorat Jenderal ', 'DJ').replace('Sekretariat ', 'Set');
      const action = statusAction[l.status] || l.status;
      return `<li class="timeline-item" style="cursor:pointer" onclick="PelaporanPage.showDetail('${l.id}')"><strong>${dateStr}</strong> — Laporan ${shortName} v${l.version} ${action}</li>`;
    }).join('');
  },

  // ── Search Filter ─────────────────────────
  filterTable(term) {
    const rows = document.querySelectorAll('.table-container table tbody tr');
    const search = (term || '').toLowerCase();
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = !search || text.includes(search) ? '' : 'none';
    });
  },

  // ── Review Modal ──────────────────────────
  showReview(id) {
    const lap = MockData.laporan.find(l => l.id === id);
    if (!lap) return;

    const content = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);margin-bottom:var(--space-lg)">
        <div><strong>Unit Kerja:</strong> ${lap.unitName}</div>
        <div><strong>Periode:</strong> ${lap.periodLabel}</div>
        <div><strong>Versi:</strong> v${lap.version}</div>
        <div><strong>Status:</strong> ${UI.badge(lap.status)}</div>
        <div><strong>Dibuat Oleh:</strong> ${lap.createdBy}</div>
        <div><strong>Terakhir Update:</strong> ${lap.updatedAt}</div>
      </div>

      <h3 class="mb-md">📋 Ringkasan Capaian</h3>
      <table>
        <thead><tr><th>Indikator</th><th>Target</th><th>Capaian</th><th>%</th></tr></thead>
        <tbody>
          ${MockData.capaian.slice(0, 3).map(c => {
      const ik = MockData.getIndikator(c.indikatorId);
      const tgt = MockData.getTarget(c.indikatorId, 1);
      return `<tr>
              <td>${ik ? ik.name : ''}</td>
              <td>${tgt ? tgt.value : '—'}</td>
              <td>${c.value}</td>
              <td>${UI.pctDisplay(c.pct)}</td>
            </tr>`;
    }).join('')}
        </tbody>
      </table>

      <h3 class="mb-md mt-lg">✍️ Catatan Reviewer</h3>
      <div style="margin-bottom:var(--space-md)">
        <textarea id="review-notes" rows="4" style="width:100%;padding:10px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:0.875rem;font-family:var(--font-family);resize:vertical;box-sizing:border-box" placeholder="Tuliskan catatan reviu, temuan, atau rekomendasi perbaikan..."></textarea>
      </div>

      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px;margin-bottom:var(--space-sm)">
        <p style="margin:0;font-size:13px;color:#15803d">
          <strong>ℹ️ Panduan Review:</strong> Periksa kelengkapan data capaian, kesesuaian narasi analisis, serta dokumen pendukung sebelum menyetujui laporan.
        </p>
      </div>`;

    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-danger" onclick="PelaporanPage.submitReview('${id}', 'rejected')" style="margin-left:auto">
        ✗ Tolak Laporan
      </button>
      <button class="btn btn-success" onclick="PelaporanPage.submitReview('${id}', 'approved')">
        ✓ Setujui Laporan
      </button>`;

    document.getElementById('modal-container').innerHTML = UI.modal('Review Laporan — ' + lap.unitName, content, footer, 'xl');
  },

  // ── Submit Review (Approve/Reject) ────────
  submitReview(id, decision) {
    const lap = MockData.laporan.find(l => l.id === id);
    if (!lap) return;

    const notes = document.getElementById('review-notes')?.value?.trim() || '';
    const reviewer = MockData.currentUser.fullName || 'Reviewer';
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const datePretty = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

    // Update status
    lap.status = decision;
    MockData.saveLaporan();
    lap.updatedAt = dateStr;
    lap.reviewedBy = reviewer;
    lap.reviewNotes = notes;
    lap.reviewDate = dateStr;

    // If approved, bump version
    if (decision === 'approved') {
      lap.version = (lap.version || 1) + 1;
    }

    // Push notification (targeted to the unit that owns the report)
    MockData.pushNotification(
      decision === 'approved' ? 'approved' : 'review',
      decision === 'approved' ? 'Laporan disetujui' : 'Laporan ditolak',
      `Laporan ${lap.unitName} — ${lap.periodLabel} telah ${decision === 'approved' ? 'disetujui' : 'ditolak'} oleh ${reviewer}.`,
      lap.unitId
    );
    MockData.pushActivityLog(decision === 'approved' ? 'approve' : 'reject', 'Pelaporan', `${decision === 'approved' ? 'Menyetujui' : 'Menolak'} Laporan Kinerja ${lap.periodLabel} — ${lap.unitName}`, lap.unitId);

    // Add timeline entry
    if (!MockData._pelaporanTimeline) {
      MockData._pelaporanTimeline = [
        { date: '15 Apr 2026', text: 'Laporan DJPT v2 disetujui Reviewer' },
        { date: '14 Apr 2026', text: 'Laporan Setjen disubmit untuk reviu' },
        { date: '12 Apr 2026', text: 'Laporan DJPB v1 disubmit' },
        { date: '10 Apr 2026', text: 'Laporan DJPDSPKP draft dibuat' },
      ];
    }
    const actionText = decision === 'approved'
      ? `Laporan ${lap.unitName} disetujui oleh ${reviewer}`
      : `Laporan ${lap.unitName} ditolak oleh ${reviewer}`;
    MockData._pelaporanTimeline.unshift({ date: datePretty, text: actionText });

    // Show confirmation
    const isApproved = decision === 'approved';
    const el = document.getElementById('modal-container');
    el.innerHTML = UI.modal(
      isApproved ? 'Laporan Disetujui' : 'Laporan Ditolak',
      `<div style="text-align:center;padding:var(--space-xl)">
        <div style="font-size:4rem;margin-bottom:var(--space-md)">${isApproved ? '✅' : '❌'}</div>
        <h2 style="color:${isApproved ? '#15803d' : '#dc2626'};margin-bottom:var(--space-sm)">
          Laporan ${isApproved ? 'Disetujui' : 'Ditolak'}
        </h2>
        <p class="text-muted">Laporan <strong>${lap.unitName}</strong> — ${lap.periodLabel}</p>
        <p style="font-size:13px;color:#64748b;margin-top:var(--space-sm)">
          ${isApproved ? 'Laporan telah disetujui dan siap diterbitkan.' : 'Laporan dikembalikan ke unit kerja untuk perbaikan.'}
        </p>
        ${notes ? `<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px;margin-top:var(--space-md);text-align:left">
          <strong style="font-size:12px;color:#94a3b8">CATATAN REVIEWER:</strong>
          <p style="margin:4px 0 0;font-size:13px;color:#334155">${notes}</p>
        </div>` : ''}
      </div>`,
      `<button class="btn btn-primary" onclick="App.closeModal();App.renderPage()">Tutup</button>`
    );
  },

  showDetail(id) {
    const lap = MockData.laporan.find(l => l.id === id);
    if (!lap) return;
    const isReviewer = ['admin_pusat', 'auditor', 'unit_level0'].includes(MockData.currentUser.roleId);
    const content = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);margin-bottom:var(--space-lg)">
        <div><strong>Unit:</strong> ${lap.unitName}</div>
        <div><strong>Periode:</strong> ${lap.periodLabel}</div>
        <div><strong>Versi:</strong> v${lap.version}</div>
        <div><strong>Status:</strong> ${UI.badge(lap.status)}</div>
        ${lap.reviewedBy ? `<div><strong>Reviewer:</strong> ${lap.reviewedBy}</div>` : ''}
        ${lap.reviewDate ? `<div><strong>Tanggal Review:</strong> ${lap.reviewDate}</div>` : ''}
      </div>
      ${lap.reviewNotes ? `
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px;margin-bottom:var(--space-lg)">
        <strong style="font-size:12px;color:#94a3b8">CATATAN REVIEWER:</strong>
        <p style="margin:4px 0 0;font-size:13px;color:#334155">${lap.reviewNotes}</p>
      </div>` : ''}
      <h3 class="mb-md">Ringkasan Capaian</h3>
      <table>
        <thead><tr><th>Indikator</th><th>Target</th><th>Capaian</th><th>%</th></tr></thead>
        <tbody>
          ${MockData.capaian.slice(0, 3).map(c => {
      const ik = MockData.getIndikator(c.indikatorId);
      const tgt = MockData.getTarget(c.indikatorId, 1);
      return `<tr>
              <td>${ik ? ik.name : ''}</td>
              <td>${tgt ? tgt.value : '—'}</td>
              <td>${c.value}</td>
              <td>${UI.pctDisplay(c.pct)}</td>
            </tr>`;
    }).join('')}
        </tbody>
      </table>
      <h3 class="mb-md mt-lg">Narasi Analisis</h3>
      <div style="background:var(--neutral-100);padding:var(--space-md);border-radius:var(--radius-sm);font-size:0.9375rem;line-height:1.7">
        ${lap.narasi ? `<p>${lap.narasi.replace(/\n/g, '<br>')}</p>` : `
        <p>Pada Triwulan I Tahun 2026, capaian kinerja ${lap.unitName} menunjukkan tren positif dengan rata-rata pencapaian sebesar 102.1% dari target yang ditetapkan. Beberapa highlight:</p>
        <ul style="margin:var(--space-sm) 0;padding-left:var(--space-lg)">
          <li>Volume produksi perikanan tangkap melebihi target (+8.3%) berkat kondisi cuaca yang mendukung.</li>
          <li>Nilai Tukar Nelayan stabil di atas baseline.</li>
          <li>Persentase kapal berlisensi masih perlu ditingkatkan melalui sosialisasi perizinan online.</li>
        </ul>
        <p style="font-size:12px;color:#94a3b8;margin-top:8px;font-style:italic">⚠️ Narasi default — Edit laporan untuk mengisi narasi sebenarnya.</p>`}
      </div>
      <h3 class="mb-md mt-lg">Histori Versi</h3>
      <div style="display:flex;gap:var(--space-sm)">
        ${Array.from({ length: lap.version }, (_, i) => `<button class="btn ${i === lap.version - 1 ? 'btn-primary' : 'btn-secondary'} btn-sm">v${i + 1}</button>`).join('')}
      </div>

      <h3 class="mb-md mt-lg">💬 Diskusi & Komentar</h3>
      <div id="comment-thread" style="margin-bottom:var(--space-md)">
        ${PelaporanPage.renderComments(id)}
      </div>
      <div style="display:flex;gap:8px;align-items:flex-start">
        <textarea id="new-comment" rows="2" style="flex:1;padding:8px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:13px;font-family:var(--font-family);resize:vertical;box-sizing:border-box" placeholder="Tulis komentar atau catatan..."></textarea>
        <button class="btn btn-primary btn-sm" onclick="PelaporanPage.addComment('${id}')" style="height:36px;white-space:nowrap">📨 Kirim</button>
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Tutup</button>
      ${(lap.status === 'submitted' || lap.status === 'under_review') && isReviewer ? `
        <button class="btn" style="background:#f59e0b;color:#fff;border:none" onclick="App.closeModal();PelaporanPage.showReview('${id}')" style="margin-left:auto">📋 Review Laporan</button>` : ''}
      ${lap.status === 'approved' ? `<button class="btn btn-accent" onclick="PelaporanPage.generatePDF();App.closeModal()" style="margin-left:auto">📄 Generate PDF</button>` : ''}`;
    document.getElementById('modal-container').innerHTML = UI.modal('Detail Laporan — ' + lap.unitName, content, footer, 'xl');
  },

  renderComments(laporanId) {
    const comments = (MockData.laporanComments || []).filter(c => c.laporanId === laporanId);
    if (!comments.length) return '<p style="font-size:13px;color:#94a3b8;text-align:center;padding:16px 0">Belum ada komentar.</p>';
    return comments.map(c => {
      const isReviewer = c.role === 'Reviewer';
      return `
        <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid #f1f5f9">
          <div style="width:36px;height:36px;border-radius:50%;background:${isReviewer ? '#0C4A6E' : '#0d9488'};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${c.avatar}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span style="font-weight:600;font-size:13px;color:#334155">${c.user}</span>
              <span style="font-size:11px;padding:1px 8px;border-radius:10px;background:${isReviewer ? '#dbeafe' : '#f0fdfa'};color:${isReviewer ? '#1d4ed8' : '#0d9488'}">${c.role}</span>
              <span style="font-size:11px;color:#94a3b8;margin-left:auto">${c.time}</span>
            </div>
            <p style="margin:0;font-size:13px;color:#475569;line-height:1.5">${c.text}</p>
          </div>
        </div>`;
    }).join('');
  },

  addComment(laporanId) {
    const textarea = document.getElementById('new-comment');
    const text = textarea?.value?.trim();
    if (!text) return;
    const user = MockData.currentUser;
    const now = new Date();
    const timeStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    if (!MockData.laporanComments) MockData.laporanComments = [];
    MockData.laporanComments.unshift({
      id: 'cmt-' + Date.now(),
      laporanId,
      user: user.fullName.split(',')[0],
      role: user.role,
      avatar: user.avatar,
      time: timeStr,
      text
    });
    textarea.value = '';
    const thread = document.getElementById('comment-thread');
    if (thread) thread.innerHTML = PelaporanPage.renderComments(laporanId);
  },

  showCreateLaporan() {
    const content = `
      ${UI.formGroup('Unit Kerja', UI.formSelect('unit', MockData.units.filter(u => u.level !== 0).map(u => ({ value: u.id, label: u.name }))), '', true)}
      <div class="form-row">
        ${UI.formGroup('Jenis Laporan', UI.formSelect('jenis', ['Triwulanan', 'Semesteran', 'Tahunan']), '', true)}
        ${UI.formGroup('Tahun', UI.formSelect('tahun', ['2026', '2025']), '', true)}
      </div>
      ${UI.formGroup('Narasi Analisis', '<textarea class="form-textarea" id="create-narasi" name="narasi" placeholder="Tuliskan analisis capaian, kendala, dan rencana perbaikan..."></textarea>', 'Narasi ini akan ditampilkan di PDF laporan.', true)}`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-secondary" onclick="PelaporanPage.saveDraft()">Simpan Draft</button>
      <button class="btn btn-primary" onclick="PelaporanPage.saveDraft(true)">Submit untuk Reviu</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Buat Laporan Kinerja', content, footer);
  },

  saveDraft(submit = false) {
    const unitSelect = document.querySelector('[name=unit]');
    const narasiEl = document.getElementById('create-narasi');
    const unitId = unitSelect ? unitSelect.value : '';
    const unit = MockData.units.find(u => u.id === unitId);
    const narasi = narasiEl ? narasiEl.value.trim() : '';
    const newLap = {
      id: 'lap-' + Date.now(),
      unitId,
      unitName: unit ? unit.name : '-',
      periodLabel: 'TW I 2026',
      status: submit ? 'submitted' : 'draft',
      version: 1,
      createdBy: MockData.currentUser.fullName.split(',')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      narasi: narasi
    };
    MockData.laporan.push(newLap);
    MockData.saveLaporan();

    if (submit) {
      MockData.pushNotification('submit', 'Laporan disubmit', `Laporan ${newLap.unitName} — ${newLap.periodLabel} telah disubmit untuk reviu.`, newLap.unitId);
      MockData.pushActivityLog('submit', 'Pelaporan', `Mensubmit Laporan Kinerja ${newLap.periodLabel} — ${newLap.unitName}`, newLap.unitId);
    } else {
      MockData.pushNotification('info', 'Draft laporan dibuat', `Draft Laporan ${newLap.unitName} — ${newLap.periodLabel} telah dibuat.`, newLap.unitId);
      MockData.pushActivityLog('create', 'Pelaporan', `Membuat draft Laporan Kinerja ${newLap.periodLabel} — ${newLap.unitName}`, newLap.unitId);
    }

    App.closeModal();
    App.renderPage();
  },

  showEditLaporan(id) {
    const lap = MockData.laporan.find(l => l.id === id);
    if (!lap) return;
    const existing = lap.narasi || '';
    const content = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);margin-bottom:var(--space-lg)">
        <div><strong>Unit Kerja:</strong> ${lap.unitName}</div>
        <div><strong>Periode:</strong> ${lap.periodLabel}</div>
      </div>
      ${UI.formGroup('Narasi Analisis', '<textarea class="form-textarea" id="edit-narasi" name="edit-narasi" placeholder="Tuliskan analisis capaian, kendala, dan rencana perbaikan...">' + existing + '</textarea>', 'Narasi ini akan ditampilkan di PDF laporan.', true)}
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px 16px;margin-top:var(--space-md)">
        <p style="margin:0;font-size:13px;color:#1d4ed8"><strong>💡 Tips:</strong> Setelah selesai mengedit, klik "Submit untuk Reviu" agar laporan dapat direview oleh Biro Perencanaan.</p>
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-secondary" onclick="PelaporanPage.saveEditDraft('${id}')">Simpan Draft</button>
      <button class="btn btn-primary" onclick="PelaporanPage.submitForReview('${id}')">Submit untuk Reviu</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Edit Laporan — ' + lap.unitName, content, footer);
  },

  deleteLaporan(id) {
    const lap = MockData.laporan.find(l => l.id === id);
    if (!lap) return;
    const content = `
      <div style="text-align:center;padding:var(--space-xl)">
        <div style="font-size:4rem;margin-bottom:var(--space-md)">⚠️</div>
        <h2 style="color:#dc2626;margin-bottom:var(--space-sm)">Hapus Laporan?</h2>
        <p class="text-muted">Laporan <strong>${lap.unitName}</strong> — ${lap.periodLabel} akan dihapus secara permanen.</p>
        <p style="font-size:13px;color:#dc2626;margin-top:8px">Tindakan ini tidak dapat dibatalkan.</p>
      </div>`;
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn" style="background:#dc2626;color:#fff;border:none" onclick="PelaporanPage.confirmDelete('${id}')">🗑️ Ya, Hapus</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal('Konfirmasi Hapus', content, footer);
  },

  confirmDelete(id) {
    const idx = MockData.laporan.findIndex(l => l.id === id);
    if (idx !== -1) MockData.laporan.splice(idx, 1);
    MockData.saveLaporan();
    App.closeModal();
    App.renderPage();
  },

  saveEditDraft(id) {
    const lap = MockData.laporan.find(l => l.id === id);
    if (!lap) return;
    const narasiEl = document.getElementById('edit-narasi');
    if (narasiEl) lap.narasi = narasiEl.value.trim();
    MockData.saveLaporan();
    App.closeModal();
    App.renderPage();
  },

  submitForReview(id) {
    const lap = MockData.laporan.find(l => l.id === id);
    if (!lap) return;
    const narasiEl = document.getElementById('edit-narasi') || document.getElementById('create-narasi');
    if (narasiEl) lap.narasi = narasiEl.value.trim();
    lap.status = 'submitted';
    lap.updatedAt = new Date().toISOString().split('T')[0];
    MockData.saveLaporan();
    MockData.pushNotification('submit', 'Laporan disubmit', `Laporan ${lap.unitName} — ${lap.periodLabel} telah disubmit untuk reviu.`, lap.unitId);
    MockData.pushActivityLog('submit', 'Pelaporan', `Mensubmit Laporan Kinerja ${lap.periodLabel} — ${lap.unitName}`, lap.unitId);
    const el = document.getElementById('modal-container');
    el.innerHTML = UI.modal('Laporan Disubmit', `
      <div style="text-align:center;padding:var(--space-xl)">
        <div style="font-size:4rem;margin-bottom:var(--space-md)">📨</div>
        <h2 style="color:#0284c7;margin-bottom:var(--space-sm)">Laporan Berhasil Disubmit</h2>
        <p class="text-muted">Laporan <strong>${lap.unitName}</strong> — ${lap.periodLabel}</p>
        <p style="font-size:13px;color:#64748b;margin-top:var(--space-sm)">Laporan telah dikirim untuk direview oleh Biro Perencanaan.</p>
      </div>`,
      `<button class="btn btn-primary" onclick="App.closeModal();App.renderPage()">Tutup</button>`);
  },

  generatePDF(id) {
    const lap = id ? MockData.laporan.find(l => l.id === id) : null;
    const fileName = lap ? `Laporan_Kinerja_${lap.unitName.replace(/\s/g, '_')}_${lap.periodLabel.replace(/\s/g, '_')}_v${lap.version}.pdf` : 'Laporan_Kinerja.pdf';
    const el = document.getElementById('modal-container');
    el.innerHTML = UI.modal('Generate PDF', `
      <div style="text-align:center;padding:var(--space-2xl)">
        <div style="font-size:3rem;margin-bottom:var(--space-md);animation:pulse-badge 1s infinite">⏳</div>
        <h3>Generating PDF...</h3>
        <p class="text-muted mt-sm">Mohon tunggu, dokumen sedang diproses.</p>
        <div class="progress-bar mt-lg" style="max-width:300px;margin:var(--space-md) auto">
          <div class="progress-bar-fill blue" style="width:0%;animation:loadProgress 2s forwards"></div>
        </div>
      </div>
      <style>@keyframes loadProgress { to { width: 100% } }</style>`, '');
    setTimeout(() => {
      el.innerHTML = UI.modal('Generate PDF', `
        <div style="text-align:center;padding:var(--space-2xl)">
          <div style="font-size:3rem;margin-bottom:var(--space-md)">✅</div>
          <h3>PDF Berhasil Di-generate!</h3>
          <p class="text-muted mt-sm">${fileName}</p>
          <button class="btn btn-primary mt-lg" onclick="PelaporanPage.downloadFile('${fileName}','pdf')">📥 Download PDF</button>
        </div>`, `<button class="btn btn-ghost" onclick="App.closeModal()">Tutup</button>`);
    }, 2500);
  },

  generateDOCX(id) {
    const lap = id ? MockData.laporan.find(l => l.id === id) : null;
    const fileName = lap ? `Laporan_Kinerja_${lap.unitName.replace(/\s/g, '_')}_${lap.periodLabel.replace(/\s/g, '_')}_v${lap.version}.docx` : 'Laporan_Kinerja.docx';
    const el = document.getElementById('modal-container');
    el.innerHTML = UI.modal('Generate DOCX', `
      <div style="text-align:center;padding:var(--space-2xl)">
        <div style="font-size:3rem;margin-bottom:var(--space-md);animation:pulse-badge 1s infinite">⏳</div>
        <h3>Generating DOCX...</h3>
        <p class="text-muted mt-sm">Mohon tunggu, dokumen sedang diproses.</p>
        <div class="progress-bar mt-lg" style="max-width:300px;margin:var(--space-md) auto">
          <div class="progress-bar-fill blue" style="width:0%;animation:loadProgress 2s forwards"></div>
        </div>
      </div>
      <style>@keyframes loadProgress { to { width: 100% } }</style>`, '');
    setTimeout(() => {
      el.innerHTML = UI.modal('Generate DOCX', `
        <div style="text-align:center;padding:var(--space-2xl)">
          <div style="font-size:3rem;margin-bottom:var(--space-md)">✅</div>
          <h3>DOCX Berhasil Di-generate!</h3>
          <p class="text-muted mt-sm">${fileName}</p>
          <button class="btn btn-primary mt-lg" onclick="PelaporanPage.downloadFile('${fileName}','docx')">📥 Download DOCX</button>
        </div>`, `<button class="btn btn-ghost" onclick="App.closeModal()">Tutup</button>`);
    }, 2000);
  },

  downloadFile(fileName, type) {
    const lap = MockData.laporan.find(l => l.status === 'approved') || MockData.laporan[0];
    const unitName = lap ? lap.unitName : 'Unit Kerja';
    const period = lap ? lap.periodLabel : 'TW I 2026';

    if (type === 'pdf') {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const pageW = doc.internal.pageSize.getWidth();
      let y = 15;

      // ── Header ──
      doc.setFillColor(12, 74, 110);
      doc.rect(0, 0, pageW, 28, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('LAPORAN KINERJA', pageW / 2, 12, { align: 'center' });
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Kementerian Kelautan dan Perikanan', pageW / 2, 19, { align: 'center' });
      doc.text('Sistem Aplikasi Pengelolaan Kinerja — KinerjaKu', pageW / 2, 24, { align: 'center' });

      y = 38;
      doc.setTextColor(0, 0, 0);

      // ── Info Box ──
      doc.setDrawColor(12, 74, 110);
      doc.setLineWidth(0.5);
      doc.roundedRect(14, y, pageW - 28, 30, 2, 2);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('Unit Kerja', 20, y + 8);
      doc.text('Periode', 20, y + 16);
      doc.text('Versi', 20, y + 24);
      doc.text('Tanggal Cetak', pageW / 2, y + 8);
      doc.text('Status', pageW / 2, y + 16);
      doc.text('Dibuat Oleh', pageW / 2, y + 24);
      doc.setFont('helvetica', 'normal');
      doc.text(': ' + unitName, 52, y + 8);
      doc.text(': ' + period, 52, y + 16);
      doc.text(': v' + (lap ? lap.version : 1), 52, y + 24);
      doc.text(': ' + new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), pageW / 2 + 30, y + 8);
      doc.text(': ' + (lap ? lap.status.toUpperCase() : 'APPROVED'), pageW / 2 + 30, y + 16);
      doc.text(': ' + (lap ? lap.createdBy : '-'), pageW / 2 + 30, y + 24);

      y += 38;

      // ── Tabel Capaian ──
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(12, 74, 110);
      doc.text('1. Ringkasan Capaian Kinerja', 14, y);
      y += 6;

      const tableData = MockData.capaian.slice(0, 6).map((c, i) => {
        const ik = MockData.getIndikator(c.indikatorId);
        const tgt = MockData.getTarget(c.indikatorId, 1);
        return [
          (i + 1).toString(),
          ik ? ik.name : '-',
          tgt ? tgt.value.toLocaleString('id-ID') : '-',
          c.value.toLocaleString('id-ID'),
          ik ? ik.unit : '-',
          c.pct.toFixed(1) + '%'
        ];
      });

      doc.autoTable({
        startY: y,
        head: [['No', 'Indikator Kinerja', 'Target', 'Capaian', 'Satuan', 'Persentase']],
        body: tableData,
        margin: { left: 14, right: 14 },
        headStyles: { fillColor: [12, 74, 110], fontSize: 9, fontStyle: 'bold' },
        bodyStyles: { fontSize: 8.5 },
        columnStyles: {
          0: { cellWidth: 12, halign: 'center' },
          1: { cellWidth: 62 },
          2: { cellWidth: 25, halign: 'right' },
          3: { cellWidth: 25, halign: 'right' },
          4: { cellWidth: 28 },
          5: { cellWidth: 25, halign: 'center' }
        },
        alternateRowStyles: { fillColor: [240, 249, 255] },
      });

      y = doc.lastAutoTable.finalY + 12;

      // ── Narasi ──
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(12, 74, 110);
      doc.text('2. Narasi Analisis', 14, y);
      y += 7;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);

      // Use narasi from user input if available
      const userNarasi = lap && lap.narasi ? lap.narasi : '';
      if (userNarasi) {
        const narasiLines = doc.splitTextToSize(userNarasi, pageW - 32);
        doc.text(narasiLines, 14, y);
        y += narasiLines.length * 5 + 4;
      } else {
        const narasi = `Pada ${period} Tahun 2026, capaian kinerja ${unitName} menunjukkan tren positif dengan rata-rata pencapaian yang melampaui target. Beberapa highlight capaian:`;
        const lines = doc.splitTextToSize(narasi, pageW - 32);
        doc.text(lines, 14, y);
        y += lines.length * 5 + 4;

        const bullets = [
          'Volume produksi perikanan tangkap melebihi target (+8.3%) berkat kondisi cuaca yang mendukung.',
          'Nilai Tukar Nelayan (NTN) stabil di atas baseline nasional.',
          'Persentase kapal berlisensi masih perlu ditingkatkan melalui sosialisasi perizinan online.',
          'Program pelatihan pelaku usaha perikanan mencapai target kuantitas meskipun kualitas perlu dievaluasi.'
        ];
        bullets.forEach(b => {
          const bLines = doc.splitTextToSize('\u2022 ' + b, pageW - 40);
          doc.text(bLines, 20, y);
          y += bLines.length * 5 + 2;
        });
      }

      y += 6;
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(12, 74, 110);
      doc.text('3. Rekomendasi', 14, y);
      y += 7;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const rekom = [
        'Meningkatkan intensitas sosialisasi perizinan online ke seluruh wilayah.',
        'Evaluasi kualitas program pelatihan pelaku usaha perikanan.',
        'Memperkuat monitoring dan evaluasi capaian indikator secara berkala.',
      ];
      rekom.forEach(r => {
        const rLines = doc.splitTextToSize('\u2022 ' + r, pageW - 40);
        doc.text(rLines, 20, y);
        y += rLines.length * 5 + 2;
      });

      // ── Footer ──
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text('KinerjaKu — Kementerian Kelautan dan Perikanan', 14, doc.internal.pageSize.getHeight() - 10);
        doc.text('Halaman ' + i + ' dari ' + pageCount, pageW - 14, doc.internal.pageSize.getHeight() - 10, { align: 'right' });
        doc.setDrawColor(12, 74, 110);
        doc.setLineWidth(0.3);
        doc.line(14, doc.internal.pageSize.getHeight() - 14, pageW - 14, doc.internal.pageSize.getHeight() - 14);
      }

      doc.save(fileName);
    } else {
      // ── DOCX — proper Word document ──
      const { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, WidthType, AlignmentType, HeadingLevel, BorderStyle, ShadingType } = window.docx;

      const headerColor = '0C4A6E';
      const userNarasi = lap && lap.narasi ? lap.narasi : `Pada ${period} Tahun 2026, capaian kinerja ${unitName} menunjukkan tren positif dengan rata-rata pencapaian yang melampaui target.`;

      // Helper: create table cell
      const cell = (text, opts = {}) => new TableCell({
        children: [new Paragraph({
          children: [new TextRun({ text, bold: opts.bold || false, size: opts.size || 20, color: opts.color || '333333', font: 'Calibri' })],
          alignment: opts.align || AlignmentType.LEFT,
        })],
        shading: opts.bg ? { fill: opts.bg, type: ShadingType.CLEAR } : undefined,
        width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
        verticalAlign: 'center',
      });

      // Capaian table rows
      const capaianRows = MockData.capaian.slice(0, 6).map((c, i) => {
        const ik = MockData.getIndikator(c.indikatorId);
        const tgt = MockData.getTarget(c.indikatorId, 1);
        return new TableRow({
          children: [
            cell((i + 1).toString(), { align: AlignmentType.CENTER, width: 8 }),
            cell(ik ? ik.name : '-', { width: 40 }),
            cell(tgt ? tgt.value.toLocaleString('id-ID') : '-', { align: AlignmentType.RIGHT, width: 13 }),
            cell(c.value.toLocaleString('id-ID'), { align: AlignmentType.RIGHT, width: 13 }),
            cell(ik ? ik.unit : '-', { width: 13 }),
            cell(c.pct.toFixed(1) + '%', { align: AlignmentType.CENTER, width: 13 }),
          ],
        });
      });

      const doc = new Document({
        sections: [{
          children: [
            // Title
            new Paragraph({
              children: [new TextRun({ text: 'LAPORAN KINERJA', bold: true, size: 32, color: 'FFFFFF', font: 'Calibri' })],
              alignment: AlignmentType.CENTER,
              shading: { fill: headerColor, type: ShadingType.CLEAR },
              spacing: { before: 100, after: 50 },
            }),
            new Paragraph({
              children: [new TextRun({ text: 'Kementerian Kelautan dan Perikanan', size: 22, color: 'FFFFFF', font: 'Calibri' })],
              alignment: AlignmentType.CENTER,
              shading: { fill: headerColor, type: ShadingType.CLEAR },
              spacing: { after: 50 },
            }),
            new Paragraph({
              children: [new TextRun({ text: 'Sistem Aplikasi Pengelolaan Kinerja — KinerjaKu', size: 18, color: 'B0C4DE', font: 'Calibri' })],
              alignment: AlignmentType.CENTER,
              shading: { fill: headerColor, type: ShadingType.CLEAR },
              spacing: { after: 300 },
            }),
            // Info table
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({ children: [cell('Unit Kerja', { bold: true, width: 25 }), cell(unitName, { width: 25 }), cell('Tanggal Cetak', { bold: true, width: 25 }), cell(new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), { width: 25 })] }),
                new TableRow({ children: [cell('Periode', { bold: true }), cell(period), cell('Status', { bold: true }), cell(lap ? lap.status.toUpperCase() : 'APPROVED')] }),
                new TableRow({ children: [cell('Versi', { bold: true }), cell('v' + (lap ? lap.version : 1)), cell('Dibuat Oleh', { bold: true }), cell(lap ? lap.createdBy : '-')] }),
              ],
            }),
            new Paragraph({ spacing: { before: 300 } }),
            // Section 1: Capaian
            new Paragraph({
              children: [new TextRun({ text: '1. Ringkasan Capaian Kinerja', bold: true, size: 26, color: headerColor, font: 'Calibri' })],
              spacing: { after: 150 },
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    cell('No', { bold: true, color: 'FFFFFF', bg: headerColor, align: AlignmentType.CENTER, width: 8 }),
                    cell('Indikator Kinerja', { bold: true, color: 'FFFFFF', bg: headerColor, width: 40 }),
                    cell('Target', { bold: true, color: 'FFFFFF', bg: headerColor, align: AlignmentType.CENTER, width: 13 }),
                    cell('Capaian', { bold: true, color: 'FFFFFF', bg: headerColor, align: AlignmentType.CENTER, width: 13 }),
                    cell('Satuan', { bold: true, color: 'FFFFFF', bg: headerColor, align: AlignmentType.CENTER, width: 13 }),
                    cell('Persentase', { bold: true, color: 'FFFFFF', bg: headerColor, align: AlignmentType.CENTER, width: 13 }),
                  ],
                }),
                ...capaianRows,
              ],
            }),
            new Paragraph({ spacing: { before: 300 } }),
            // Section 2: Narasi
            new Paragraph({
              children: [new TextRun({ text: '2. Narasi Analisis', bold: true, size: 26, color: headerColor, font: 'Calibri' })],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [new TextRun({ text: userNarasi, size: 20, font: 'Calibri' })],
              spacing: { after: 200 },
            }),
            // Section 3: Rekomendasi
            new Paragraph({ spacing: { before: 100 } }),
            new Paragraph({
              children: [new TextRun({ text: '3. Rekomendasi', bold: true, size: 26, color: headerColor, font: 'Calibri' })],
              spacing: { after: 150 },
            }),
            new Paragraph({ children: [new TextRun({ text: '• Meningkatkan intensitas sosialisasi perizinan online ke seluruh wilayah.', size: 20, font: 'Calibri' })], spacing: { after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: '• Evaluasi kualitas program pelatihan pelaku usaha perikanan.', size: 20, font: 'Calibri' })], spacing: { after: 80 } }),
            new Paragraph({ children: [new TextRun({ text: '• Memperkuat monitoring dan evaluasi capaian indikator secara berkala.', size: 20, font: 'Calibri' })], spacing: { after: 200 } }),
            // Footer
            new Paragraph({ spacing: { before: 400 } }),
            new Paragraph({
              children: [new TextRun({ text: 'KinerjaKu — Kementerian Kelautan dan Perikanan', size: 16, color: '94A3B8', italics: true, font: 'Calibri' })],
              alignment: AlignmentType.CENTER,
            }),
          ],
        }],
      });

      Packer.toBlob(doc).then(blob => {
        saveAs(blob, fileName);
      });
    }
  }
};
