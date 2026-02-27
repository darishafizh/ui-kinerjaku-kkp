/* ============================================
   KinerjaKu Next — Dashboard Page
   ============================================ */

const DashboardPage = {
  render() {
    const totalIndikator = MockData.indikator.length;
    const capaianList = MockData.capaian;
    const avgCapaian = capaianList.length ? (capaianList.reduce((s, c) => s + c.pct, 0) / capaianList.length).toFixed(1) : 0;
    const onTrack = capaianList.filter(c => c.pct >= 90).length;
    const critical = capaianList.filter(c => c.pct < 60).length;
    const atRisk = capaianList.filter(c => c.pct >= 60 && c.pct < 90).length;
    const totalUnits = MockData.units.filter(u => u.level <= 1).length;
    const totalAllUnits = MockData.units.length;
    const delayedRA = MockData.rencanaAksi.filter(r => r.status === 'delayed');
    const completedRA = MockData.rencanaAksi.filter(r => r.status === 'completed');
    const ongoingRA = MockData.rencanaAksi.filter(r => r.status === 'on_track');
    const totalRA = MockData.rencanaAksi.length;
    const totalSasaran = MockData.sasaran ? MockData.sasaran.length : 5;
    const rekData = EvaluasiPage.getRekData ? EvaluasiPage.getRekData() : [];

    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Dashboard</h1>
          <p class="text-muted" style="margin-top:4px">Ringkasan capaian kinerja — ${MockData.activePeriod.year} ${MockData.activePeriod.quarter}</p>
        </div>
      </div>

      <!-- ══════ Summary Cards ══════ -->
      <div class="summary-cards">
        ${UI.summaryCard('📊', totalIndikator, 'Total Indikator', 'blue')}
        ${UI.summaryCard('🎯', avgCapaian + '%', 'Capaian Rata-rata', 'teal', { dir: 'up', text: '+3.2% dari TW lalu' })}
        ${UI.summaryCard('🏢', totalUnits, 'Unit Eselon I', 'purple')}
        ${UI.summaryCard('✅', onTrack, 'On Track (≥90%)', 'green')}
      </div>



      <!-- ══════ 2. PENGUKURAN KINERJA ══════ -->
      <div style="margin-top:28px;margin-bottom:16px;display:flex;align-items:center;gap:8px">
        <span style="font-size:1.2rem">📏</span>
        <h2 style="font-size:15px;font-weight:700;margin:0;color:#2d3748">Pengukuran Kinerja</h2>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3 class="card-title">📈 Capaian vs Target per Indikator</h3></div>
          <div class="card-body">
            ${UI.barChart(capaianList.map(c => {
      const ik = MockData.getIndikator(c.indikatorId);
      return { label: ik ? ik.name.substring(0, 30) : c.indikatorId, value: c.pct, displayValue: c.pct.toFixed(1) + '%', target: 100 };
    }), 130)}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">🗓️ Status Verifikasi per Triwulan</h3></div>
          <div class="card-body">
            ${(() => {
        const unitNames = MockData.units.filter(u => u.level === 1).slice(0, 5).map(u => u.name.replace(/DIREKTORAT JENDERAL /i, 'DJ').replace(/SEKRETARIAT /i, 'Sek. ').substring(0, 25));
        const quarters = ['TW I', 'TW II', 'TW III', 'TW IV'];
        return UI.heatmap(unitNames, quarters, (unit, period) => {
          const matchUnit = MockData.units.filter(u => u.level === 1).slice(0, 5).find(u => {
            const shortName = u.name.replace(/DIREKTORAT JENDERAL /i, 'DJ').replace(/SEKRETARIAT /i, 'Sek. ').substring(0, 25);
            return shortName === unit;
          });
          if (!matchUnit) return { status: 'none', count: '—' };
          const lap = MockData.laporan.find(l => l.unitId === matchUnit.id && l.periodLabel && l.periodLabel.includes(period));
          if (!lap) return { status: 'none', count: '—' };
          if (lap.status === 'approved') return { status: 'approved', count: '✓' };
          if (lap.status === 'submitted' || lap.status === 'under_review') return { status: 'submitted', count: '⟳' };
          if (lap.status === 'draft') return { status: 'draft', count: '…' };
          if (lap.status === 'rejected') return { status: 'rejected', count: '✗' };
          return { status: 'none', count: '—' };
        });
      })()}
            <div style="display:flex;gap:var(--space-md);margin-top:var(--space-md);font-size:0.75rem;flex-wrap:wrap">
              <span><span style="display:inline-block;width:12px;height:12px;background:var(--neutral-200);border-radius:3px"></span> Belum</span>
              <span><span style="display:inline-block;width:12px;height:12px;background:var(--neutral-400);border-radius:3px"></span> Draft</span>
              <span><span style="display:inline-block;width:12px;height:12px;background:var(--primary-300);border-radius:3px"></span> Submitted</span>
              <span><span style="display:inline-block;width:12px;height:12px;background:var(--success-400);border-radius:3px"></span> Verified</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════ 3. PELAPORAN KINERJA ══════ -->
      <div style="margin-top:28px;margin-bottom:16px;display:flex;align-items:center;gap:8px">
        <span style="font-size:1.2rem">�</span>
        <h2 style="font-size:15px;font-weight:700;margin:0;color:#2d3748">Pelaporan Kinerja</h2>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3 class="card-title">🍩 Komposisi Status Laporan</h3></div>
          <div class="card-body">
            ${(() => {
        const laps = MockData.laporan;
        const approved = laps.filter(l => l.status === 'approved').length;
        const submitted = laps.filter(l => l.status === 'submitted' || l.status === 'under_review').length;
        const rejected = laps.filter(l => l.status === 'rejected').length;
        const draft = laps.filter(l => l.status === 'draft').length;
        return UI.donutChart([
          { label: 'Approved', value: approved || 0, color: 'var(--success-500)' },
          { label: 'Submitted', value: submitted || 0, color: 'var(--primary-400)' },
          { label: 'Rejected', value: rejected || 0, color: 'var(--danger-500, #e74c3c)' },
          { label: 'Draft', value: draft || 0, color: 'var(--neutral-400)' },
        ]);
      })()}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">📉 Tren Capaian per Triwulan</h3></div>
          <div class="card-body">
            <div style="display:flex;align-items:end;gap:var(--space-md);height:180px;padding-top:var(--space-md)">
              ${['TW I'].map(q => {
        const twCapaian = capaianList.length ? parseFloat((capaianList.reduce((s, c) => s + c.pct, 0) / capaianList.length).toFixed(1)) : 0;
        return `<div style="flex:1;text-align:center">
                  <div style="background:linear-gradient(to top,var(--primary-500),var(--primary-300));height:${Math.min(twCapaian * 1.5, 170)}px;border-radius:6px 6px 0 0;display:flex;align-items:end;justify-content:center;padding-bottom:4px">
                    <span style="font-size:0.6875rem;font-weight:600;color:white">${twCapaian}%</span>
                  </div>
                  <div style="font-size:0.75rem;color:var(--neutral-600);margin-top:6px">${q} '26</div>
                </div>`;
      }).join('')}
              ${['TW II', 'TW III', 'TW IV'].map(q => `
                <div style="flex:1;text-align:center">
                  <div style="background:var(--neutral-200);height:40px;border-radius:6px 6px 0 0;display:flex;align-items:center;justify-content:center">
                    <span style="font-size:0.6875rem;color:var(--neutral-500)">—</span>
                  </div>
                  <div style="font-size:0.75rem;color:var(--neutral-400);margin-top:6px">${q}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- ══════ 4. EVALUASI KINERJA ══════ -->
      <div style="margin-top:28px;margin-bottom:16px;display:flex;align-items:center;gap:8px">
        <span style="font-size:1.2rem">✅</span>
        <h2 style="font-size:15px;font-weight:700;margin:0;color:#2d3748">Evaluasi Kinerja</h2>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header"><h3 class="card-title">📝 Ringkasan Skor Evaluasi</h3></div>
          <div class="card-body">
            ${(() => {
        // Dynamic scores based on actual data ratios
        const sasaranScore = Math.min(30, totalSasaran > 0 ? parseFloat((totalSasaran / 10 * 30).toFixed(1)) : 0);
        const pengukuranScore = Math.min(25, capaianList.length > 0 ? parseFloat((capaianList.length / totalIndikator * 25).toFixed(1)) : 0);
        const laps = MockData.laporan;
        const approvedLaps = laps.filter(l => l.status === 'approved').length;
        const pelaporanScore = Math.min(15, laps.length > 0 ? parseFloat((approvedLaps / laps.length * 15).toFixed(1)) : 0);
        const evalScore = Math.min(10, rekData.length > 0 ? parseFloat((rekData.length / 5 * 10).toFixed(1)) : 0);
        const capaianScore = Math.min(20, parseFloat(avgCapaian) > 0 ? parseFloat((parseFloat(avgCapaian) / 100 * 20).toFixed(1)) : 0);
        const totalScore = parseFloat((sasaranScore + pengukuranScore + pelaporanScore + evalScore + capaianScore).toFixed(1));
        return UI.barChart([
          { label: 'Perencanaan (maks 30)', value: sasaranScore, displayValue: sasaranScore.toString(), color: 'var(--primary-500)' },
          { label: 'Pengukuran (maks 25)', value: pengukuranScore, displayValue: pengukuranScore.toString(), color: 'var(--accent-500)' },
          { label: 'Pelaporan (maks 15)', value: pelaporanScore, displayValue: pelaporanScore.toString(), color: 'var(--success-500)' },
          { label: 'Evaluasi Internal (maks 10)', value: evalScore, displayValue: evalScore.toString(), color: '#9b59b6' },
          { label: 'Capaian (maks 20)', value: capaianScore, displayValue: capaianScore.toString(), color: '#e67e22' },
        ], 30) + `<div style="text-align:right;margin-top:var(--space-md);font:600 1rem/1 var(--font-family)">Total: <span style="color:var(--primary-600)">${totalScore}</span> / 100</div>`;
      })()}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">💡 Rekomendasi & Tindak Lanjut</h3></div>
          <div class="card-body">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
              <div style="text-align:center;padding:16px;background:var(--primary-50, #ebf5ff);border-radius:8px">
                <div style="font-size:2rem;font-weight:800;color:var(--primary-600)">${rekData.length}</div>
                <div style="font-size:12px;color:#718096;margin-top:4px">Total Rekomendasi</div>
              </div>
              <div style="text-align:center;padding:16px;background:#fef3e2;border-radius:8px">
                <div style="font-size:2rem;font-weight:800;color:#e67e22">${rekData.reduce((s, r) => s + r.jumlahTL, 0)}</div>
                <div style="font-size:12px;color:#718096;margin-top:4px">Total Tindak Lanjut</div>
              </div>
            </div>
            <div style="border:1px solid #eee;border-radius:6px;overflow:hidden">
              <table style="width:100%;border-collapse:collapse;font-size:12px">
                <thead><tr>
                  <th style="padding:8px;background:#f8f9fa;border-bottom:1px solid #dee2e6;text-align:left">Unit Kerja</th>
                  <th style="padding:8px;background:#f8f9fa;border-bottom:1px solid #dee2e6;text-align:center;width:40px">Rek</th>
                  <th style="padding:8px;background:#f8f9fa;border-bottom:1px solid #dee2e6;text-align:center;width:40px">TL</th>
                </tr></thead>
                <tbody>
                  ${[...new Set(rekData.map(r => r.unitKerja))].map(uk => {
        const reks = rekData.filter(r => r.unitKerja === uk);
        return `<tr>
                      <td style="padding:6px 8px;border-bottom:1px solid #eee">${uk.length > 35 ? uk.substring(0, 35) + '…' : uk}</td>
                      <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:center;font-weight:600">${reks.length}</td>
                      <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:center;font-weight:600">${reks.reduce((s, r) => s + r.jumlahTL, 0)}</td>
                    </tr>`;
      }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>


      <!-- ══════ 7. PERBANDINGAN ANTAR PERIODE ══════ -->
      <div style="margin-top:28px;margin-bottom:16px;display:flex;align-items:center;gap:8px">
        <span style="font-size:1.2rem">📈</span>
        <h2 style="font-size:15px;font-weight:700;margin:0;color:#2d3748">Perbandingan Antar Periode</h2>
      </div>
      <div class="grid-2" style="gap:16px;margin-bottom:8px">
        <div class="card">
          <div class="card-header"><h3 class="card-title">📊 Trend Capaian per Triwulan</h3></div>
          <div class="card-body">
            <canvas id="chart-trend" height="200"></canvas>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">🏢 Perbandingan Unit Kerja per Periode</h3></div>
          <div class="card-body">
            <canvas id="chart-unit-comparison" height="200"></canvas>
          </div>
        </div>
      </div>

      <!-- ══════ 8. REMINDER & DEADLINE ══════ -->
      <div style="margin-top:28px;margin-bottom:16px;display:flex;align-items:center;gap:8px">
        <span style="font-size:1.2rem">⏰</span>
        <h2 style="font-size:15px;font-weight:700;margin:0;color:#2d3748">Reminder & Deadline</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:8px">
        ${DashboardPage.renderDeadlines()}
      </div>

      <!-- ══════ 9. IMPORT / EXPORT ══════ -->
      <div style="margin-top:28px;margin-bottom:16px;display:flex;align-items:center;gap:8px">
        <span style="font-size:1.2rem">📥</span>
        <h2 style="font-size:15px;font-weight:700;margin:0;color:#2d3748">Import / Export Data</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px">
        <div class="card" style="padding:20px;text-align:center;cursor:pointer;transition:all 0.2s" onclick="DashboardPage.showImportExport('import_target')" onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseleave="this.style.transform='';this.style.boxShadow=''">
          <div style="font-size:2rem;margin-bottom:8px">📤</div>
          <div style="font-weight:700;color:#0C4A6E;font-size:14px">Import Target</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">Upload Excel (.xlsx)</div>
        </div>
        <div class="card" style="padding:20px;text-align:center;cursor:pointer;transition:all 0.2s" onclick="DashboardPage.showImportExport('export_capaian')" onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseleave="this.style.transform='';this.style.boxShadow=''">
          <div style="font-size:2rem;margin-bottom:8px">📥</div>
          <div style="font-weight:700;color:#0d9488;font-size:14px">Export Capaian</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">Download CSV/Excel</div>
        </div>
        <div class="card" style="padding:20px;text-align:center;cursor:pointer;transition:all 0.2s" onclick="DashboardPage.showImportExport('export_laporan')" onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseleave="this.style.transform='';this.style.boxShadow=''">
          <div style="font-size:2rem;margin-bottom:8px">📄</div>
          <div style="font-weight:700;color:#8b5cf6;font-size:14px">Export Laporan</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">Download PDF/DOCX</div>
        </div>
        <div class="card" style="padding:20px;text-align:center;cursor:pointer;transition:all 0.2s" onclick="DashboardPage.showImportExport('export_evaluasi')" onmouseenter="this.style.transform='translateY(-2px)';this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" onmouseleave="this.style.transform='';this.style.boxShadow=''">
          <div style="font-size:2rem;margin-bottom:8px">📊</div>
          <div style="font-weight:700;color:#f59e0b;font-size:14px">Export Evaluasi</div>
          <div style="font-size:11px;color:#94a3b8;margin-top:4px">Download Excel</div>
        </div>
      </div>`;
  },

  // ── Chart.js Interactive Charts ─────────────
  _chartInstances: {},

  afterRender() {
    // Destroy old chart instances to avoid canvas reuse errors
    Object.values(this._chartInstances).forEach(function (c) { if (c) c.destroy(); });
    this._chartInstances = {};

    this.initTrendChart();
    this.initUnitComparisonChart();
  },

  initTrendChart() {
    var canvas = document.getElementById('chart-trend');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var capaianList = MockData.capaian;
    var twI = capaianList.length ? parseFloat((capaianList.reduce(function (s, c) { return s + c.pct; }, 0) / capaianList.length).toFixed(1)) : 0;

    this._chartInstances.trend = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['TW I', 'TW II', 'TW III', 'TW IV'],
        datasets: [
          {
            label: 'Capaian Rata-rata (%)',
            data: [twI, 95.4, 88.7, null],
            borderColor: '#0C4A6E',
            backgroundColor: 'rgba(12, 74, 110, 0.1)',
            borderWidth: 2.5,
            pointRadius: 5,
            pointBackgroundColor: '#0C4A6E',
            pointHoverRadius: 8,
            fill: true,
            tension: 0.3,
            spanGaps: false
          },
          {
            label: 'Target Minimum (90%)',
            data: [90, 90, 90, 90],
            borderColor: '#22c55e',
            borderWidth: 1.5,
            borderDash: [6, 4],
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'bottom', labels: { usePointStyle: true, font: { size: 11 } } },
          tooltip: {
            backgroundColor: '#0C4A6E',
            titleFont: { size: 13 },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: function (ctx) { return ctx.dataset.label + ': ' + (ctx.raw !== null ? ctx.raw + '%' : 'Belum ada data'); }
            }
          }
        },
        scales: {
          y: {
            min: 0, max: 120,
            ticks: { callback: function (v) { return v + '%'; }, font: { size: 11 } },
            grid: { color: '#f1f5f9' }
          },
          x: { grid: { display: false }, ticks: { font: { size: 11 } } }
        }
      }
    });
  },

  initUnitComparisonChart() {
    var canvas = document.getElementById('chart-unit-comparison');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var units = ['DJPT', 'DJPB', 'DJPDSPKP', 'Setjen'];
    var tw1Data = [108.3, 95.1, 88.5, 102.7];
    var tw2Data = [97.2, 92.8, 85.3, 98.1];

    this._chartInstances.unitComparison = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: units,
        datasets: [
          {
            label: 'TW I',
            data: tw1Data,
            backgroundColor: '#0C4A6E',
            borderRadius: 4,
            barPercentage: 0.7
          },
          {
            label: 'TW II',
            data: tw2Data,
            backgroundColor: '#0284c7',
            borderRadius: 4,
            barPercentage: 0.7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'bottom', labels: { usePointStyle: true, font: { size: 11 } } },
          tooltip: {
            backgroundColor: '#0C4A6E',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: function (ctx) { return ctx.dataset.label + ': ' + ctx.raw + '%'; }
            }
          }
        },
        scales: {
          y: {
            min: 0, max: 130,
            ticks: { callback: function (v) { return v + '%'; }, font: { size: 11 } },
            grid: { color: '#f1f5f9' }
          },
          x: { grid: { display: false }, ticks: { font: { size: 11 } } }
        }
      }
    });
  },

  // ── Deadline Reminders ────────────────────
  renderDeadlines() {
    const deadlines = [
      { title: 'Input Capaian TW II', date: '2026-07-10', module: 'Pengukuran', icon: '📊' },
      { title: 'Submit Laporan TW I', date: '2026-04-30', module: 'Pelaporan', icon: '📄' },
      { title: 'Evaluasi TW I', date: '2026-05-15', module: 'Evaluasi', icon: '📋' },
    ];
    const now = new Date('2026-04-15');
    return deadlines.map(d => {
      const target = new Date(d.date);
      const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
      const urgency = diffDays <= 7 ? '#dc2626' : diffDays <= 30 ? '#f59e0b' : '#22c55e';
      const urgLabel = diffDays <= 7 ? 'Mendesak!' : diffDays <= 30 ? 'Segera' : 'Aman';
      return `
        <div class="card" style="padding:20px;border-left:4px solid ${urgency}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <span style="font-size:1.5rem">${d.icon}</span>
            <div>
              <div style="font-weight:700;font-size:14px;color:#334155">${d.title}</div>
              <div style="font-size:11px;color:#94a3b8">${d.module}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px">
            <div>
              <div style="font-size:24px;font-weight:800;color:${urgency}">${diffDays}</div>
              <div style="font-size:11px;color:#64748b">hari lagi</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:12px;font-weight:600;color:${urgency};padding:2px 10px;border-radius:12px;background:${urgency}15">${urgLabel}</div>
              <div style="font-size:11px;color:#94a3b8;margin-top:4px">${d.date}</div>
            </div>
          </div>
        </div>`;
    }).join('');
  },

  // ── Import/Export Modal ────────────────────
  showImportExport(type) {
    const configs = {
      import_target: {
        title: '📤 Import Target dari Excel', content: `
        <p style="color:#475569;font-size:13px;margin-bottom:16px">Upload file Excel (.xlsx) berisi target indikator kinerja. Format template dapat diunduh terlebih dahulu.</p>
        <button class="btn btn-secondary btn-sm" style="margin-bottom:16px">📥 Download Template Excel</button>
        ${UI.dropzone()}
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px;margin-top:16px">
          <p style="margin:0;font-size:12px;color:#1d4ed8"><strong>Format:</strong> Kolom A = Kode Indikator, B = Target TW I, C = Target TW II, D = Target TW III, E = Target TW IV</p>
        </div>` },
      export_capaian: {
        title: '📥 Export Data Capaian', content: `
        <p style="color:#475569;font-size:13px;margin-bottom:16px">Pilih format dan periode untuk mengunduh data capaian kinerja.</p>
        <div class="form-row">
          ${UI.formGroup('Format', UI.formSelect('format', ['Excel (.xlsx)', 'CSV (.csv)']))}
          ${UI.formGroup('Periode', UI.formSelect('periode', ['TW I 2026', 'TW II 2026', 'Semua Periode']))}
        </div>
        ${UI.formGroup('Unit Kerja', UI.formSelect('unit', [{ value: 'all', label: 'Semua Unit Kerja' }, ...MockData.units.filter(u => u.level <= 1).map(u => ({ value: u.id, label: u.name }))]))}`
      },
      export_laporan: {
        title: '📄 Export Laporan Kinerja', content: `
        <p style="color:#475569;font-size:13px;margin-bottom:16px">Generate dan unduh laporan dalam format PDF atau DOCX.</p>
        <div class="form-row">
          ${UI.formGroup('Format', UI.formSelect('format', ['PDF', 'DOCX']))}
          ${UI.formGroup('Periode', UI.formSelect('periode', ['TW I 2026', 'TW II 2026']))}
        </div>
        ${UI.formGroup('Unit Kerja', UI.formSelect('unit', [{ value: 'all', label: 'Semua Unit Kerja' }, ...MockData.units.filter(u => u.level <= 1).map(u => ({ value: u.id, label: u.name }))]))}`
      },
      export_evaluasi: {
        title: '📊 Export Data Evaluasi', content: `
        <p style="color:#475569;font-size:13px;margin-bottom:16px">Unduh lembar kerja evaluasi dan rekomendasi tindak lanjut.</p>
        <div class="form-row">
          ${UI.formGroup('Format', UI.formSelect('format', ['Excel (.xlsx)', 'PDF']))}
          ${UI.formGroup('Tahun', UI.formSelect('tahun', ['2026', '2025']))}
        </div>` },
    };
    const cfg = configs[type];
    if (!cfg) return;
    const isImport = type.startsWith('import');
    const footer = `
      <button class="btn btn-ghost" onclick="App.closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="DashboardPage.processImportExport('${type}')">${isImport ? '📤 Upload & Import' : '📥 Download'}</button>`;
    document.getElementById('modal-container').innerHTML = UI.modal(cfg.title, cfg.content, footer);
  },

  processImportExport(type) {
    const isImport = type.startsWith('import');
    const el = document.getElementById('modal-container');
    el.innerHTML = UI.modal(isImport ? 'Importing...' : 'Generating...', `
      <div style="text-align:center;padding:var(--space-2xl)">
        <div style="font-size:3rem;margin-bottom:var(--space-md);animation:pulse-badge 1s infinite">⏳</div>
        <h3>${isImport ? 'Mengimport data...' : 'Generating file...'}</h3>
        <div class="progress-bar mt-lg" style="max-width:300px;margin:var(--space-md) auto">
          <div class="progress-bar-fill blue" style="width:0%;animation:loadProgress 2s forwards"></div>
        </div>
      </div>
      <style>@keyframes loadProgress { to { width: 100% } }</style>`, '');
    setTimeout(() => {
      el.innerHTML = UI.modal('Berhasil!', `
        <div style="text-align:center;padding:var(--space-xl)">
          <div style="font-size:4rem;margin-bottom:var(--space-md)">✅</div>
          <h2 style="color:#15803d">${isImport ? 'Data Berhasil Diimport!' : 'File Berhasil Di-generate!'}</h2>
          <p class="text-muted mt-sm">${isImport ? 'Data target berhasil dimasukkan ke sistem.' : 'File siap diunduh.'}</p>
          ${!isImport ? '<button class="btn btn-primary mt-lg">📥 Download File</button>' : ''}
        </div>`, `<button class="btn btn-ghost" onclick="App.closeModal()">Tutup</button>`);
    }, 2000);
  }
};
