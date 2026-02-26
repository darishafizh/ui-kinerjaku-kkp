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

    const tableColumns = [
      { label: 'Unit Kerja', key: 'unitName' },
      { label: 'Periode', key: 'periodLabel' },
      { label: 'Versi', render: r => `< span class="badge badge-draft" > v${ r.version }</span > ` },
      { label: 'Status', render: r => UI.badge(r.status) },
      { label: 'Terakhir Update', key: 'updatedAt' },
      { label: 'Dibuat Oleh', key: 'createdBy' },
    ];

    if (!App.isReadOnlyRole()) {
      tableColumns.push({
        label: 'Aksi', render: r => `
      < div style = "display:flex;gap:4px;align-items:flex-start" >
            <div style="display:flex;flex-direction:column;gap:4px">
              <button class="btn btn-ghost btn-sm" onclick="PelaporanPage.showDetail('${r.id}')" title="Lihat">👁️</button>
              ${r.status === 'approved' ? '<button class="btn btn-ghost btn-sm" onclick="PelaporanPage.deleteLaporan(\'' + r.id + '\')" title="Hapus" style="color:#dc2626">🗑️</button>' : ''}
            </div>
            <div style="display:flex;flex-direction:column;gap:4px">
            ${r.status === 'draft' ? '<button class="btn btn-primary btn-sm" onclick="PelaporanPage.showEditLaporan(\'' + r.id + '\')">✏️ Edit</button>' : ''}
            ${(r.status === 'draft' || r.status === 'rejected') ? '<button class="btn btn-sm" style="background:#dc2626;color:#fff;border:none" onclick="PelaporanPage.deleteLaporan(\'' + r.id + '\')">🗑️ Hapus</button>' : ''}
            ${(r.status === 'submitted' || r.status === 'under_review') && isReviewer ? '<button class="btn btn-sm" style="background:#f59e0b;color:#fff;border:none" onclick="PelaporanPage.showReview(\'' + r.id + '\')">📋 Review</button>' : ''}
            ${r.status === 'approved' ? '<button class="btn btn-accent btn-sm" onclick="PelaporanPage.generatePDF(\'' + r.id + '\')">📄 PDF</button>' : ''}
            </div>
          </div > `
      });
    }

    return `
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
    <div class="toolbar-right">${!App.isReadOnlyRole() ? '<button class="btn btn-primary" onclick="PelaporanPage.showCreateLaporan()">＋ Buat Laporan</button>' : ''}</div>
  </div>
      ${UI.table(tableColumns, laporan)}

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
      </div >

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
  < button class="btn btn-ghost" onclick = "App.closeModal()" > Batal</button >
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
  MockData.pushActivityLog(decision === 'approved' ? 'approve' : 'reject', 'Pelaporan', `${decision === 'approved' ? 'Menyetujui' : 'Menolak'} Laporan Kinerja ${lap.periodLabel} — ${lap.unitName} `, lap.unitId);

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
    ? `Laporan ${lap.unitName} disetujui oleh ${reviewer} `
    : `Laporan ${lap.unitName} ditolak oleh ${reviewer} `;
  MockData._pelaporanTimeline.unshift({ date: datePretty, text: actionText });

  // Show confirmation
  const isApproved = decision === 'approved';
  const el = document.getElementById('modal-container');
  el.innerHTML = UI.modal(
    isApproved ? 'Laporan Disetujui' : 'Laporan Ditolak',
    <div style="text-align:center;padding:var(--space-xl)">
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
        </div>` : ''
      }
    </div>`,
  `< button class= "btn btn-primary" onclick = "App.closeModal();App.renderPage()" > Tutup</button > `
    );
  },

showDetail(id) {
  const lap = MockData.laporan.find(l => l.id === id);
  if (!lap) return;
  const isReviewer = ['admin_pusat', 'auditor', 'unit_level0'].includes(MockData.currentUser.roleId);
  const content = `
  < div style = "display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);margin-bottom:var(--space-lg)" >
        <div><strong>Unit:</strong> ${lap.unitName}</div>
        <div><strong>Periode:</strong> ${lap.periodLabel}</div>
        <div><strong>Versi:</strong> v${lap.version}</div>
        <div><strong>Status:</strong> ${UI.badge(lap.status)}</div>
        ${ lap.reviewedBy ? `<div><strong>Reviewer:</strong> ${lap.reviewedBy}</div>` : '' }
        ${ lap.reviewDate ? `<div><strong>Tanggal Review:</strong> ${lap.reviewDate}</div>` : '' }
      </div >
    ${
      lap.reviewNotes ? `
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px;margin-bottom:var(--space-lg)">
        <strong style="font-size:12px;color:#94a3b8">CATATAN REVIEWER:</strong>
        <p style="margin:4px 0 0;font-size:13px;color:#334155">${lap.reviewNotes}</p>
      </div>` : ''
    }
  < h3 class= "mb-md" > Ringkasan Capaian</h3 >
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
  < button class= "btn btn-ghost" onclick = "App.closeModal()" > Tutup</button >
  ${(lap.status === 'submitted' || lap.status === 'under_review') && isReviewer ? `
        <button class="btn" style="background:#f59e0b;color:#fff;border:none;margin-left:auto" onclick="App.closeModal();PelaporanPage.showReview('${id}')">📋 Review Laporan</button>` : ''
    }
      ${ lap.status === 'approved' ? `<button class="btn btn-accent" style="margin-left:auto" onclick="PelaporanPage.generatePDF();App.closeModal()">📄 Generate PDF</button>` : '' } `;
  document.getElementById('modal-container').innerHTML = UI.modal('Detail Laporan — ' + lap.unitName, content, footer, 'xl');
},

renderComments(laporanId) {
  const comments = (MockData.laporanComments || []).filter(c => c.laporanId === laporanId);
  if (!comments.length) return '<p style="font-size:13px;color:#94a3b8;text-align:center;padding:16px 0">Belum ada komentar.</p>';
  return comments.map(c => {
    const isReviewer = c.role === 'Reviewer';
    return `
  < div style = "display:flex;gap:10px;padding:10px 0;border-bottom:1px solid #f1f5f9" >
          <div style="width:36px;height:36px;border-radius:50%;background:${isReviewer ? '#0C4A6E' : '#0d9488'};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${c.avatar}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
              <span style="font-weight:600;font-size:13px;color:#334155">${c.user}</span>
              <span style="font-size:11px;padding:1px 8px;border-radius:10px;background:${isReviewer ? '#dbeafe' : '#f0fdfa'};color:${isReviewer ? '#1d4ed8' : '#0d9488'}">${c.role}</span>
              <span style="font-size:11px;color:#94a3b8;margin-left:auto">${c.time}</span>
            </div>
            <p style="margin:0;font-size:13px;color:#475569;line-height:1.5">${c.text}</p>
          </div>
        </div > `;
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
      ${ UI.formGroup('Unit Kerja', UI.formSelect('unit', MockData.units.filter(u => u.level !== 0).map(u => ({ value: u.id, label: u.name }))), '', true) }
<div class="form-row">
  ${UI.formGroup('Jenis Laporan', UI.formSelect('jenis', ['Triwulanan', 'Semesteran', 'Tahunan']), '', true)}
  ${UI.formGroup('Tahun', UI.formSelect('tahun', ['2026', '2025']), '', true)}
</div>
      ${ UI.formGroup('Narasi Analisis', '<textarea class="form-textarea" id="create-narasi" name="narasi" placeholder="Tuliskan analisis capaian, kendala, dan rencana perbaikan..."></textarea>', 'Narasi ini akan ditampilkan di PDF laporan.', true) } `;
  const footer = `
  < button class="btn btn-ghost" onclick = "App.closeModal()" > Batal</button >
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
    MockData.pushNotification('submit', 'Laporan disubmit', `Laporan ${ newLap.unitName } — ${ newLap.periodLabel } telah disubmit untuk reviu.`, newLap.unitId);
    MockData.pushActivityLog('submit', 'Pelaporan', `Mensubmit Laporan Kinerja ${ newLap.periodLabel } — ${ newLap.unitName } `, newLap.unitId);
  } else {
    MockData.pushNotification('info', 'Draft laporan dibuat', `Draft Laporan ${ newLap.unitName } — ${ newLap.periodLabel } telah dibuat.`, newLap.unitId);
    MockData.pushActivityLog('create', 'Pelaporan', `Membuat draft Laporan Kinerja ${ newLap.periodLabel } — ${ newLap.unitName } `, newLap.unitId);
  }

  App.closeModal();
  App.renderPage();
},

showEditLaporan(id) {
  const lap = MockData.laporan.find(l => l.id === id);
  if (!lap) return;
  const existing = lap.narasi || '';
  const content = `
  < div style = "display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);margin-bottom:var(--space-lg)" >
        <div><strong>Unit Kerja:</strong> ${lap.unitName}</div>
        <div><strong>Periode:</strong> ${lap.periodLabel}</div>
      </div >
  ${ UI.formGroup('Narasi Analisis', '<textarea class="form-textarea" id="edit-narasi" name="edit-narasi" placeholder="Tuliskan analisis capaian, kendala, dan rencana perbaikan...">' + existing + '</textarea>', 'Narasi ini akan ditampilkan di PDF laporan.', true) }
<div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px 16px;margin-top:var(--space-md)">
  <p style="margin:0;font-size:13px;color:#1d4ed8"><strong>💡 Tips:</strong> Setelah selesai mengedit, klik "Submit untuk Reviu" agar laporan dapat direview oleh Biro Perencanaan.</p>
</div>`;
  const footer = `
  < button class="btn btn-ghost" onclick = "App.closeModal()" > Batal</button >
      <button class="btn btn-secondary" onclick="PelaporanPage.saveEditDraft('${id}')">Simpan Draft</button>
      <button class="btn btn-primary" onclick="PelaporanPage.submitForReview('${id}')">Submit untuk Reviu</button>`;
  document.getElementById('modal-container').innerHTML = UI.modal('Edit Laporan — ' + lap.unitName, content, footer);
},

deleteLaporan(id) {
  const lap = MockData.laporan.find(l => l.id === id);
  if (!lap) return;
  const content = `
  < div style = "text-align:center;padding:var(--space-xl)" >
        <div style="font-size:4rem;margin-bottom:var(--space-md)">⚠️</div>
        <h2 style="color:#dc2626;margin-bottom:var(--space-sm)">Hapus Laporan?</h2>
        <p class="text-muted">Laporan <strong>${lap.unitName}</strong> — ${lap.periodLabel} akan dihapus secara permanen.</p>
        <p style="font-size:13px;color:#dc2626;margin-top:8px">Tindakan ini tidak dapat dibatalkan.</p>
      </div > `;
  const footer = `
  < button class="btn btn-ghost" onclick = "App.closeModal()" > Batal</button >
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
  MockData.pushNotification('submit', 'Laporan disubmit', `Laporan ${ lap.unitName } — ${ lap.periodLabel } telah disubmit untuk reviu.`, lap.unitId);
  MockData.pushActivityLog('submit', 'Pelaporan', `Mensubmit Laporan Kinerja ${ lap.periodLabel } — ${ lap.unitName } `, lap.unitId);
  const el = document.getElementById('modal-container');
  el.innerHTML = UI.modal('Laporan Disubmit', `
  < div style = "text-align:center;padding:var(--space-xl)" >
        <div style="font-size:4rem;margin-bottom:var(--space-md)">📨</div>
        <h2 style="color:#0284c7;margin-bottom:var(--space-sm)">Laporan Berhasil Disubmit</h2>
        <p class="text-muted">Laporan <strong>${lap.unitName}</strong> — ${lap.periodLabel}</p>
        <p style="font-size:13px;color:#64748b;margin-top:var(--space-sm)">Laporan telah dikirim untuk direview oleh Biro Perencanaan.</p>
      </div > `,
    `< button class="btn btn-primary" onclick = "App.closeModal();App.renderPage()" > Tutup</button > `);
},

generatePDF(id) {
  const lap = id ? MockData.laporan.find(l => l.id === id) : null;
  const fileName = lap ? `Laporan_Kinerja_${ lap.unitName.replace(/\s/g, '_') }_${ lap.periodLabel.replace(/\s/g, '_') }_v${ lap.version }.pdf` : 'Laporan_Kinerja.pdf';
  const el = document.getElementById('modal-container');
  el.innerHTML = UI.modal('Generate PDF', `
  < div style = "text-align:center;padding:var(--space-2xl)" >
        <div style="font-size:3rem;margin-bottom:var(--space-md);animation:pulse-badge 1s infinite">⏳</div>
        <h3>Generating PDF...</h3>
        <p class="text-muted mt-sm">Mohon tunggu, dokumen sedang diproses.</p>
        <div class="progress-bar mt-lg" style="max-width:300px;margin:var(--space-md) auto">
          <div class="progress-bar-fill blue" style="width:0%;animation:loadProgress 2s forwards"></div>
        </div>
      </div >
  <style>@keyframes loadProgress {to {width: 100%}}</style>`, '');
  setTimeout(() => {
    el.innerHTML = UI.modal('Generate PDF', `
    < div style = "text-align:center;padding:var(--space-2xl)" >
          <div style="font-size:3rem;margin-bottom:var(--space-md)">✅</div>
          <h3>PDF Berhasil Di-generate!</h3>
          <p class="text-muted mt-sm">${fileName}</p>
          <button class="btn btn-primary mt-lg" onclick="PelaporanPage.downloadFile('${fileName}','pdf')">📥 Download PDF</button>
        </div > `, ` < button class="btn btn-ghost" onclick = "App.closeModal()" > Tutup</button > `);
  }, 2500);
},

generateDOCX(id) {
  const lap = id ? MockData.laporan.find(l => l.id === id) : null;
  const fileName = lap ? `Laporan_Kinerja_${ lap.unitName.replace(/\s/g, '_') }_${ lap.periodLabel.replace(/\s/g, '_') }_v${ lap.version }.docx` : 'Laporan_Kinerja.docx';
  const el = document.getElementById('modal-container');
  el.innerHTML = UI.modal('Generate DOCX', `
  < div style = "text-align:center;padding:var(--space-2xl)" >
        <div style="font-size:3rem;margin-bottom:var(--space-md);animation:pulse-badge 1s infinite">⏳</div>
        <h3>Generating DOCX...</h3>
        <p class="text-muted mt-sm">Mohon tunggu, dokumen sedang diproses.</p>
        <div class="progress-bar mt-lg" style="max-width:300px;margin:var(--space-md) auto">
          <div class="progress-bar-fill blue" style="width:0%;animation:loadProgress 2s forwards"></div>
        </div>
      </div >
  <style>@keyframes loadProgress {to {width: 100%}}</style>`, '');
  setTimeout(() => {
    el.innerHTML = UI.modal('Generate DOCX', `
    < div style = "text-align:center;padding:var(--space-2xl)" >
          <div style="font-size:3rem;margin-bottom:var(--space-md)">✅</div>
          <h3>DOCX Berhasil Di-generate!</h3>
          <p class="text-muted mt-sm">${fileName}</p>
          <button class="btn btn-primary mt-lg" onclick="PelaporanPage.downloadFile('${fileName}','docx')">📥 Download DOCX</button>
        </div > `, ` < button class="btn btn-ghost" onclick = "App.closeModal()" > Tutup</button > `);
  }, 2000);
},

downloadFile(fileName, type) {
  const lap = MockData.laporan.find(l => l.status === 'approved') || MockData.laporan[0];
  const unitName = lap ? lap.unitName : 'Unit Kerja';
  const period = lap ? lap.periodLabel : 'TW I 2026';

  if (type === 'pdf') {
    // Bangkitkan elemen HTML temporer dari data laporan
    const container = document.createElement('div');
    container.style.padding = '40px';
    container.style.width = '800px';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.color = '#333';
    container.style.lineHeight = '1.6';

    let narasiHtml = '';
    const userNarasi = lap && lap.narasi ? lap.narasi : '';
    if (userNarasi) {
      narasiHtml = `< p style = "white-space:pre-wrap" > ${ userNarasi }</p > `;
    } else {
      narasiHtml = `
  < p > Pada ${ period } Tahun 2026, capaian kinerja ${ unitName } menunjukkan tren positif dengan rata - rata pencapaian yang melampaui target.Beberapa highlight capaian:</p >
    <ul>
      <li>Volume produksi perikanan tangkap melebihi target (+8.3%) berkat kondisi cuaca yang mendukung.</li>
      <li>Nilai Tukar Nelayan (NTN) stabil di atas baseline nasional.</li>
      <li>Persentase kapal berlisensi masih perlu ditingkatkan melalui sosialisasi perizinan online.</li>
      <li>Program pelatihan pelaku usaha perikanan mencapai target kuantitas meskipun kualitas perlu dievaluasi.</li>
    </ul>
`;
    }

    container.innerHTML = `
  < !--Header -->
      <div style="background-color:#0c4a6e;color:white;text-align:center;padding:20px;border-radius:4px 4px 0 0">
        <h1 style="margin:0;font-size:24px">LAPORAN KINERJA</h1>
        <h2 style="margin:5px 0 0;font-size:16px;font-weight:normal">Kementrian Kelautan dan Perikanan</h2>
        <h3 style="margin:5px 0 0;font-size:14px;font-weight:normal;color:#bae6fd">Sistem Aplikasi Pengelolaan Kinerja — KinerjaKu</h3>
      </div>
      
      <!--Info Box-- >
      <div style="border:1px solid #0c4a6e;border-top:none;padding:15px;display:flex;justify-content:space-between;font-size:12px;border-radius:0 0 4px 4px;margin-bottom:30px">
        <div>
          <div><strong>Unit Kerja:</strong> ${unitName}</div>
          <div><strong>Periode:</strong> ${period}</div>
          <div><strong>Versi:</strong> v${lap ? lap.version : 1}</div>
        </div>
        <div>
          <div><strong>Tanggal Cetak:</strong> ${new Date().toLocaleDateString('id-ID')}</div>
          <div><strong>Status:</strong> ${lap ? lap.status.toUpperCase() : 'APPROVED'}</div>
          <div><strong>Dibuat Oleh:</strong> ${lap ? lap.createdBy : '-'}</div>
        </div>
      </div>

      <!--Detail -->
      <h3 style="color:#0c4a6e;border-bottom:2px solid #e2e8f0;padding-bottom:5px;margin-bottom:15px">1. Ringkasan Capaian Kinerja</h3>
      <table style="width:100%;border-collapse:collapse;margin-bottom:30px;font-size:12px">
        <thead>
          <tr style="background:#0c4a6e;color:white">
            <th style="padding:8px;border:1px solid #ccc">No</th>
            <th style="padding:8px;border:1px solid #ccc;text-align:left">Indikator Kinerja</th>
            <th style="padding:8px;border:1px solid #ccc;text-align:right">Target</th>
            <th style="padding:8px;border:1px solid #ccc;text-align:right">Capaian</th>
            <th style="padding:8px;border:1px solid #ccc;text-align:center">Persentase</th>
          </tr>
        </thead>
        <tbody>
          ${MockData.capaian.slice(0, 6).map((c, i) => {
      const ik = MockData.getIndikator(c.indikatorId);
      const tgt = MockData.getTarget(c.indikatorId, 1);
      return `
              <tr>
                <td style="padding:8px;border:1px solid #ccc;text-align:center">${i + 1}</td>
                <td style="padding:8px;border:1px solid #ccc">${ik ? ik.name : '-'}</td>
                <td style="padding:8px;border:1px solid #ccc;text-align:right">${tgt ? tgt.value.toLocaleString('id-ID') : '-'} ${ik ? ik.unit : ''}</td>
                <td style="padding:8px;border:1px solid #ccc;text-align:right">${c.value.toLocaleString('id-ID')} ${ik ? ik.unit : ''}</td>
                <td style="padding:8px;border:1px solid #ccc;text-align:center">${c.pct.toFixed(1)}%</td>
              </tr>
            `;
    }).join('')}
        </tbody>
      </table>

      <h3 style="color:#0c4a6e;border-bottom:2px solid #e2e8f0;padding-bottom:5px;margin-bottom:15px">2. Narasi Analisis</h3>
      <div style="font-size:13px;margin-bottom:30px">
        ${narasiHtml}
      </div>

      <h3 style="color:#0c4a6e;border-bottom:2px solid #e2e8f0;padding-bottom:5px;margin-bottom:15px">3. Rekomendasi</h3>
      <ul style="font-size:13px">
        <li>Meningkatkan intensitas sosialisasi perizinan online ke seluruh wilayah.</li>
        <li>Evaluasi kualitas program pelatihan pelaku usaha perikanan.</li>
        <li>Memperkuat monitoring dan evaluasi capaian indikator secara berkala.</li>
      </ul>
`;

    // Menyembunyikan elemen agar tak berantakan ke view
    const printWrapper = document.createElement('div');
    printWrapper.style.position = 'absolute';
    printWrapper.style.top = '-10000px';
    printWrapper.appendChild(container);
    document.body.appendChild(printWrapper);

    const opt = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    window.html2pdf().set(opt).from(container).save().then(() => {
      document.body.removeChild(printWrapper);
    });

  }
}
};
