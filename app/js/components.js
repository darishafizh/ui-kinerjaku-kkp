/* ============================================
   KinerjaKu Next — Reusable UI Components
   ============================================ */

const UI = {
    // --- Badge ---
    badge(status, text) {
        const map = {
            draft: 'badge-draft', submitted: 'badge-submitted', verified: 'badge-verified',
            approved: 'badge-approved', published: 'badge-published', rejected: 'badge-rejected',
            locked: 'badge-locked', in_progress: 'badge-in-progress', overdue: 'badge-overdue',
            completed: 'badge-completed', planned: 'badge-planned', delayed: 'badge-delayed',
            open: 'badge-open', under_review: 'badge-submitted',
            high: 'badge-priority-high', medium: 'badge-priority-medium', low: 'badge-priority-low'
        };
        const labels = {
            draft: 'Draft', submitted: 'Submitted', verified: 'Verified', approved: 'Approved',
            published: 'Published', rejected: 'Rejected', locked: 'Locked',
            in_progress: 'In Progress', overdue: 'Overdue', completed: 'Completed',
            planned: 'Planned', delayed: 'Delayed', open: 'Open', under_review: 'Under Review',
            high: 'Tinggi', medium: 'Sedang', low: 'Rendah'
        };
        const cls = map[status] || 'badge-draft';
        const label = text || labels[status] || status;
        return `<span class="badge badge-dot ${cls}">${label}</span>`;
    },

    // --- Summary Card ---
    summaryCard(icon, value, label, color, trend) {
        const trendHtml = trend
            ? `<div class="summary-card-trend ${trend.dir}">${trend.dir === 'up' ? '↑' : '↓'} ${trend.text}</div>`
            : '';
        return `
      <div class="summary-card ${color}">
        <div class="summary-card-icon">${icon}</div>
        <div>
          <div class="summary-card-value">${value}</div>
          <div class="summary-card-label">${label}</div>
          ${trendHtml}
        </div>
      </div>`;
    },

    // --- Table ---
    table(columns, rows, options = {}) {
        const { id, emptyText, onRowClick } = options;
        if (!rows.length) {
            return this.emptyState(emptyText || 'Belum ada data.', '📋');
        }
        const ths = columns.map(c => `<th>${c.label}</th>`).join('');
        const trs = rows.map((row, idx) => {
            const tds = columns.map(c => {
                const val = typeof c.render === 'function' ? c.render(row, idx) : (row[c.key] || '-');
                return `<td>${val}</td>`;
            }).join('');
            const click = onRowClick ? ` onclick="${onRowClick}('${row.id}')" style="cursor:pointer"` : '';
            return `<tr${click}>${tds}</tr>`;
        }).join('');
        return `
      <div class="card">
        <div class="table-container">
          <table${id ? ` id="${id}"` : ''}>
            <thead><tr>${ths}</tr></thead>
            <tbody>${trs}</tbody>
          </table>
        </div>
      </div>`;
    },

    // --- Empty State ---
    emptyState(text, icon = '📭', btnText, btnAction) {
        const btn = btnText ? `<button class="btn btn-primary" onclick="${btnAction}">${btnText}</button>` : '';
        return `
      <div class="empty-state">
        <div class="empty-state-icon">${icon}</div>
        <div class="empty-state-title">Tidak Ada Data</div>
        <div class="empty-state-text">${text}</div>
        ${btn}
      </div>`;
    },

    // --- Tabs ---
    tabs(items, activeId, onTabClick) {
        return `<div class="tabs">${items.map(t =>
            `<button class="tab ${t.id === activeId ? 'active' : ''}" onclick="${onTabClick}('${t.id}')">
        ${t.label}${t.count !== undefined ? `<span class="tab-badge">${t.count}</span>` : ''}
      </button>`
        ).join('')}</div>`;
    },

    // --- Progress Bar ---
    progressBar(percent, color = 'blue') {
        const c = percent >= 90 ? 'green' : percent >= 60 ? 'blue' : percent >= 30 ? 'yellow' : 'red';
        return `
      <div class="progress-bar">
        <div class="progress-bar-fill ${color === 'auto' ? c : color}" style="width:${Math.min(percent, 100)}%"></div>
      </div>`;
    },

    // --- Bar Chart (horizontal) ---
    barChart(items, maxValue) {
        const max = maxValue || Math.max(...items.map(i => i.value), 1);
        return `<div class="chart-container">${items.map(item => {
            const pct = (item.value / max * 100).toFixed(0);
            const color = item.color || (item.value >= 90 ? 'var(--success-500)' : item.value >= 60 ? 'var(--primary-500)' : 'var(--danger-500)');
            return `
        <div class="chart-bar">
          <div class="chart-bar-label" title="${item.label}">${item.label}</div>
          <div class="chart-bar-track">
            <div class="chart-bar-fill" style="width:${pct}%;background:${color}">${item.displayValue || item.value}</div>
            ${item.target ? `<div class="chart-bar-target" style="left:${(item.target / max * 100)}%" title="Target: ${item.target}"></div>` : ''}
          </div>
        </div>`;
        }).join('')}</div>`;
    },

    // --- Donut Chart ---
    donutChart(segments, size = 140) {
        const r = 50, cx = 60, cy = 60, circ = 2 * Math.PI * r;
        const total = segments.reduce((s, seg) => s + seg.value, 0);
        let offset = 0;
        const paths = segments.map(seg => {
            const pct = seg.value / total;
            const dash = circ * pct;
            const gap = circ - dash;
            const html = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="20" 
        stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${-offset}" />`;
            offset += dash;
            return html;
        }).join('');
        const legend = segments.map(seg =>
            `<div class="donut-legend-item">
        <div class="donut-legend-dot" style="background:${seg.color}"></div>
        <span>${seg.label}: <strong>${seg.value}</strong></span>
      </div>`
        ).join('');
        return `
      <div class="donut-chart">
        <svg class="donut-svg" width="${size}" height="${size}" viewBox="0 0 120 120">${paths}</svg>
        <div class="donut-legend">${legend}</div>
      </div>`;
    },

    // --- Heatmap ---
    heatmap(units, periods, getData) {
        const cols = periods.length + 1;
        const header = `<div style="font-weight:600;font-size:0.75rem;color:var(--neutral-600)">Unit</div>` +
            periods.map(p => `<div style="font-weight:600;font-size:0.75rem;color:var(--neutral-600);text-align:center">${p}</div>`).join('');
        const rows = units.map(unit => {
            const cells = periods.map(p => {
                const d = getData(unit, p);
                const colors = { none: 'var(--neutral-200)', draft: 'var(--neutral-400)', submitted: 'var(--primary-300)', verified: 'var(--accent-300)', approved: 'var(--success-400)' };
                const bg = colors[d.status] || colors.none;
                return `<div class="heatmap-cell" style="background:${bg}" title="${unit}: ${p} — ${d.status}">${d.count || ''}</div>`;
            }).join('');
            return `<div style="font-size:0.75rem;padding:6px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${unit}">${unit}</div>${cells}`;
        }).join('');
        return `<div class="heatmap-grid" style="grid-template-columns:140px repeat(${periods.length}, 1fr)">${header}${rows}</div>`;
    },

    // --- Modal ---
    modal(title, content, footer, size = '') {
        const sizeClass = size ? ` modal-${size}` : '';
        return `
      <div class="modal-overlay" onclick="if(event.target===this)App.closeModal()">
        <div class="modal${sizeClass}">
          <div class="modal-header">
            <h2 class="modal-title">${title}</h2>
            <button class="modal-close" onclick="App.closeModal()">✕</button>
          </div>
          <div class="modal-body">${content}</div>
          ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
        </div>
      </div>`;
    },

    // --- Search / Toolbar ---
    toolbar(searchPlaceholder, buttons = []) {
        const btns = buttons.map(b =>
            `<button class="btn ${b.class || 'btn-primary'}" onclick="${b.action}">${b.icon ? b.icon + ' ' : ''}${b.label}</button>`
        ).join('');
        return `
      <div class="toolbar">
        <div class="toolbar-left">
          <div class="search-bar">
            <span class="search-bar-icon">🔍</span>
            <input type="text" placeholder="${searchPlaceholder || 'Cari...'}" />
          </div>
        </div>
        <div class="toolbar-right">${btns}</div>
      </div>`;
    },

    // --- Accordion ---
    accordion(items) {
        return items.map((item, i) => `
      <div class="accordion-item${item.open ? ' open' : ''}" id="acc-${i}">
        <button class="accordion-header" onclick="document.getElementById('acc-${i}').classList.toggle('open')">
          <span>${item.title}</span>
          <span>${item.open ? '▾' : '▸'}</span>
        </button>
        <div class="accordion-body">${item.content}</div>
      </div>
    `).join('');
    },

    // --- Tree Node ---
    treeNode(node, children, level = 0) {
        const indent = level * 24;
        const hasChildren = children && children.length > 0;
        const childrenHtml = hasChildren ? `<div class="tree-node-children" style="margin-left:${indent + 24}px">${children.join('')}</div>` : '';
        return `
      <div class="tree-node" style="margin-left:${indent}px">
        <div class="tree-node-header">
          ${hasChildren ? '<button class="tree-toggle expanded" onclick="this.classList.toggle(\'expanded\');this.closest(\'.tree-node\').querySelector(\'.tree-node-children\').style.display=this.classList.contains(\'expanded\')?\'block\':\'none\'">▶</button>' : '<span style="width:20px"></span>'}
          <span class="tree-node-label">${node.label}</span>
          ${node.badge ? UI.badge(node.badge) : ''}
        </div>
        ${childrenHtml}
      </div>`;
    },

    // --- Notification items ---
    notifList(items) {
        if (!items.length) return '<div class="empty-state"><p class="text-muted">Tidak ada notifikasi.</p></div>';
        return items.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}">
        <div class="notif-item-title">${n.title}</div>
        <div style="font-size:0.8125rem;color:var(--neutral-600);margin:4px 0">${n.message}</div>
        <div class="notif-item-time">${n.time}</div>
      </div>
    `).join('');
    },

    // --- File Item ---
    fileItem(name, size) {
        return `
      <div class="file-item">
        <span>📄</span>
        <span class="file-item-name">${name}</span>
        <span class="file-item-size">${size}</span>
        <button class="btn btn-ghost btn-sm" title="Hapus">✕</button>
      </div>`;
    },

    // --- Dropzone ---
    dropzone() {
        return `
      <div class="dropzone" ondragover="event.preventDefault();this.classList.add('drag-over')" ondragleave="this.classList.remove('drag-over')" ondrop="event.preventDefault();this.classList.remove('drag-over')">
        <div class="dropzone-icon">📁</div>
        <div class="dropzone-text">Drag & drop file di sini, atau <strong>klik untuk memilih</strong></div>
        <div class="dropzone-subtext">Format: PDF, JPG, PNG, XLSX, DOCX — Maks: 10 MB</div>
      </div>`;
    },

    // --- Form helpers ---
    formGroup(label, input, helper, required = false) {
        return `
      <div class="form-group">
        <label class="form-label">${label}${required ? '<span class="required">*</span>' : ''}</label>
        ${input}
        ${helper ? `<div class="form-helper">${helper}</div>` : ''}
      </div>`;
    },

    formInput(name, placeholder, value = '', type = 'text') {
        return `<input class="form-input" type="${type}" name="${name}" placeholder="${placeholder}" value="${value}" />`;
    },

    formTextarea(name, placeholder, value = '') {
        return `<textarea class="form-textarea" name="${name}" placeholder="${placeholder}">${value}</textarea>`;
    },

    formSelect(name, options, selected = '') {
        const opts = options.map(o => {
            const val = typeof o === 'string' ? o : o.value;
            const label = typeof o === 'string' ? o : o.label;
            return `<option value="${val}" ${val === selected ? 'selected' : ''}>${label}</option>`;
        }).join('');
        return `<select class="form-select" name="${name}">${opts}</select>`;
    },

    // --- Traffic Light ---
    trafficLight(pct) {
        if (pct >= 90) return '<span style="color:var(--success-600)">🟢</span>';
        if (pct >= 60) return '<span style="color:var(--warning-600)">🟡</span>';
        return '<span style="color:var(--danger-600)">🔴</span>';
    },

    // --- Percent display ---
    pctDisplay(pct) {
        const color = pct >= 90 ? 'var(--success-600)' : pct >= 60 ? 'var(--warning-600)' : 'var(--danger-600)';
        return `<span style="font-weight:600;color:${color}">${pct.toFixed(1)}%</span>`;
    }
};
