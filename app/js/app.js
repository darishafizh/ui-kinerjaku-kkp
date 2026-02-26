/* ============================================
   KinerjaKu Next — Application Shell & Router
   Sidebar v2: Hierarchical Submenus
   ============================================ */

const App = {
  isLoggedIn: localStorage.getItem('kinerjaku_loggedIn') === 'true',
  currentPage: 'login',
  currentSub: null,        // active submenu id
  expandedMenus: {},       // track which parent menus are expanded
  showNotifPanel: false,
  mobileMenuOpen: false,
  sidebarCollapsed: true,
  activeUnitFilter: 'all',

  /* ── Menu Structure ─────────────────────────── */
  menuItems: [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    {
      id: 'perencanaan', icon: '📋', label: 'Perencanaan Kinerja', children: [
        { id: 'perencanaan_sasaran', label: 'Sasaran' },
        { id: 'perencanaan_indikator', label: 'Indikator Kinerja' },
        { id: 'perencanaan_rencana_aksi', label: 'Rencana Aksi' },
      ]
    },
    {
      id: 'pengukuran', icon: '📏', label: 'Pengukuran Kinerja', children: [
        { id: 'pengukuran_capaian', label: 'Pengukuran Capaian Kinerja' },
        { id: 'pengukuran_verifikasi', label: 'Verifikasi Capaian Kinerja' },
      ]
    },
    { id: 'pelaporan', icon: '📄', label: 'Pelaporan Kinerja', labelFull: 'Pelaporan Kinerja (Review Laporan Kinerja)' },
    {
      id: 'evaluasi', icon: '✅', label: 'Evaluasi Kinerja', children: [
        { id: 'evaluasi_lembar_kerja', label: 'Lembar Kerja Evaluasi' },
        { id: 'evaluasi_rekomendasi', label: 'Rekomendasi dan Tindak Lanjut' },
      ]
    },
    {
      id: 'dokumen', icon: '📁', label: 'Dokumen', children: [
        { id: 'dokumen_kinerja', label: 'Dokumen Kinerja' },
        { id: 'dokumen_pohon', label: 'Pohon Kinerja' },
        { id: 'dokumen_manual', label: 'Manual Indikator' },
      ]
    },
    {
      id: 'informasi', icon: 'ℹ️', label: 'Informasi Lainnya', children: [
        { id: 'informasi_unit', label: 'Informasi Unit Kerja' },
        { id: 'informasi_pengguna', label: 'Informasi Pengguna' },
        { id: 'informasi_log', label: 'Log Aktivitas' },
        { id: 'informasi_panduan', label: 'Panduan' },
        { id: 'informasi_profil', label: 'Profil Akun' },
      ]
    },
  ],

  /* ── RBAC: role → visible menu ids ──────────── */
  rbacRules: {
    // 1. Admin — Full access semua menu
    admin_pusat: null,
    // 2. Unit Level 0 — Perencanaan, Pengukuran, Pelaporan, Evaluasi, Dokumen, Informasi (tanpa kelola pengguna)
    unit_level0: [
      'dashboard',
      'perencanaan', 'perencanaan_sasaran', 'perencanaan_indikator', 'perencanaan_rencana_aksi',
      'pengukuran', 'pengukuran_capaian', 'pengukuran_verifikasi',
      'pelaporan',
      'evaluasi', 'evaluasi_lembar_kerja', 'evaluasi_rekomendasi',
      'dokumen', 'dokumen_kinerja', 'dokumen_pohon', 'dokumen_manual',
      'informasi', 'informasi_unit', 'informasi_panduan', 'informasi_profil'
    ],
    // 3. Unit Level I — Kelola data unit Eselon I
    unit_level1: [
      'dashboard',
      'perencanaan', 'perencanaan_sasaran', 'perencanaan_indikator', 'perencanaan_rencana_aksi',
      'pengukuran', 'pengukuran_capaian',
      'pelaporan',
      'dokumen', 'dokumen_kinerja', 'dokumen_pohon', 'dokumen_manual',
      'informasi', 'informasi_panduan', 'informasi_profil'
    ],
    // 4. Unit Level II — Kelola data unit Eselon II
    unit_level2: [
      'dashboard',
      'perencanaan', 'perencanaan_sasaran', 'perencanaan_indikator', 'perencanaan_rencana_aksi',
      'pengukuran', 'pengukuran_capaian',
      'dokumen', 'dokumen_kinerja', 'dokumen_pohon', 'dokumen_manual',
      'informasi', 'informasi_panduan', 'informasi_profil'
    ],
    // 5. Unit Level III — Input data unit Eselon III
    unit_level3: [
      'dashboard',
      'perencanaan', 'perencanaan_sasaran', 'perencanaan_indikator', 'perencanaan_rencana_aksi',
      'pengukuran', 'pengukuran_capaian',
      'dokumen', 'dokumen_pohon',
      'informasi', 'informasi_panduan', 'informasi_profil'
    ],
    // 6. Auditor (Itjen) — Monitoring dan evaluasi, read-only pada data
    auditor: [
      'dashboard',
      'evaluasi', 'evaluasi_lembar_kerja', 'evaluasi_rekomendasi',
      'pelaporan',
      'dokumen', 'dokumen_kinerja', 'dokumen_pohon', 'dokumen_manual',
      'informasi', 'informasi_unit', 'informasi_panduan', 'informasi_profil'
    ],
    // 7. Tamu / KemenPANRB — Hanya melihat, tidak bisa edit
    tamu: [
      'dashboard',
      'dokumen', 'dokumen_kinerja', 'dokumen_pohon',
      'informasi', 'informasi_panduan', 'informasi_profil'
    ],
  },

  /* ── Page renderers ─────────────────────────── */
  pages: {
    dashboard: { renderer: () => DashboardPage.render(), breadcrumb: ['Dashboard'] },
    perencanaan_sasaran: { renderer: () => { PerencanaanPage.activeTab = 'sasaran'; return PerencanaanPage.render(); }, breadcrumb: ['Perencanaan Kinerja', 'Sasaran'] },
    perencanaan_indikator: { renderer: () => { PerencanaanPage.activeTab = 'indikator'; return PerencanaanPage.render(); }, breadcrumb: ['Perencanaan Kinerja', 'Indikator Kinerja'] },
    perencanaan_rencana_aksi: { renderer: () => { PerencanaanPage.activeTab = 'rencana_aksi'; return PerencanaanPage.render(); }, breadcrumb: ['Perencanaan Kinerja', 'Rencana Aksi'] },
    pengukuran_capaian: { renderer: () => { PengukuranPage.activeTab = 'input'; return PengukuranPage.render(); }, breadcrumb: ['Pengukuran Kinerja', 'Pengukuran Capaian Kinerja'] },
    pengukuran_verifikasi: { renderer: () => { PengukuranPage.activeTab = 'verifikasi'; return PengukuranPage.render(); }, breadcrumb: ['Pengukuran Kinerja', 'Verifikasi Capaian Kinerja'] },
    pelaporan: { renderer: () => PelaporanPage.render(), breadcrumb: ['Pelaporan Kinerja'] },
    evaluasi_lembar_kerja: { renderer: () => { EvaluasiPage.activeTab = 'evaluasi'; return EvaluasiPage.render(); }, breadcrumb: ['Evaluasi Kinerja', 'Lembar Kerja Evaluasi'] },
    evaluasi_rekomendasi: { renderer: () => { EvaluasiPage.activeTab = 'rekomendasi'; return EvaluasiPage.render(); }, breadcrumb: ['Evaluasi Kinerja', 'Rekomendasi dan Tindak Lanjut'] },
    dokumen_kinerja: { renderer: () => { DokumenPage.activeTab = 'dokumen'; return DokumenPage.render(); }, breadcrumb: ['Dokumen', 'Dokumen Kinerja'] },
    dokumen_pohon: { renderer: () => { DokumenPage.activeTab = 'pohon'; return DokumenPage.render(); }, breadcrumb: ['Dokumen', 'Pohon Kinerja'] },
    dokumen_manual: { renderer: () => { DokumenPage.activeTab = 'manual'; return DokumenPage.render(); }, breadcrumb: ['Dokumen', 'Manual Indikator'] },
    informasi_unit: { renderer: () => { InformasiPage.activeTab = 'unit_kerja'; return InformasiPage.render(); }, breadcrumb: ['Informasi Lainnya', 'Informasi Unit Kerja'] },
    informasi_pengguna: { renderer: () => { InformasiPage.activeTab = 'pengguna'; return InformasiPage.render(); }, breadcrumb: ['Informasi Lainnya', 'Informasi Pengguna'] },
    informasi_panduan: { renderer: () => { InformasiPage.activeTab = 'panduan'; return InformasiPage.render(); }, breadcrumb: ['Informasi Lainnya', 'Panduan'] },
    informasi_profil: { renderer: () => { InformasiPage.activeTab = 'profil'; return InformasiPage.render(); }, breadcrumb: ['Informasi Lainnya', 'Profil Akun'] },
    informasi_log: { renderer: () => { InformasiPage.activeTab = 'log'; return InformasiPage.render(); }, breadcrumb: ['Informasi Lainnya', 'Log Aktivitas'] },
  },

  /* ── Helpers ───────────────────────────────── */
  isMenuVisible(menuId) {
    const allowed = this.rbacRules[MockData.currentUser.roleId];
    if (!allowed) return true; // null = see all
    return allowed.includes(menuId);
  },

  getParentId(subId) {
    for (const item of this.menuItems) {
      if (item.children) {
        for (const child of item.children) {
          if (child.id === subId) return item.id;
        }
      }
    }
    return null;
  },

  isParentActive(parentId) {
    return this.currentPage.startsWith(parentId + '_') || this.currentPage === parentId;
  },

  /* ── Navigation ────────────────────────────── */
  init() {
    // Restore user session from localStorage
    if (this.isLoggedIn) {
      const savedUser = localStorage.getItem('kinerjaku_user');
      if (savedUser) {
        Object.assign(MockData.currentUser, JSON.parse(savedUser));
      }
      this.currentPage = localStorage.getItem('kinerjaku_page') || 'dashboard';
    }
    this.renderPage();
  },

  navigate(pageId) {
    this.currentPage = pageId;
    localStorage.setItem('kinerjaku_page', pageId);
    this.showNotifPanel = false;
    this.mobileMenuOpen = false;
    // Auto-expand the parent menu if navigating to a submenu
    const parentId = this.getParentId(pageId);
    if (parentId) {
      this.expandedMenus[parentId] = true;
    }
    this.renderPage();
    window.scrollTo(0, 0);
  },

  toggleMenu(menuId) {
    this.expandedMenus[menuId] = !this.expandedMenus[menuId];
    this.renderPage();
  },

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.renderPage();
  },

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    const layout = document.querySelector('.app-layout');
    if (layout) layout.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
  },

  /* ── Render orchestrator ───────────────────── */
  renderPage() {
    const app = document.getElementById('app');
    if (!this.isLoggedIn) {
      app.innerHTML = LoginPage.render();
      return;
    }

    // Auto-expand parent of current page
    const parentId = this.getParentId(this.currentPage);
    if (parentId) this.expandedMenus[parentId] = true;

    const page = this.pages[this.currentPage] || this.pages.dashboard;
    const breadcrumbItems = page.breadcrumb || ['Dashboard'];

    app.innerHTML = `
      <div class="app-layout ${this.mobileMenuOpen ? 'mobile-menu-open' : ''} ${this.sidebarCollapsed ? 'sidebar-collapsed' : ''}">
        ${this.renderSidebar()}
        ${this.renderHeader()}
        ${this.renderTopbar(breadcrumbItems)}
        <div class="main-content page-fade-in" onclick="if(App.mobileMenuOpen){App.mobileMenuOpen=false;App.renderPage();}">
          ${page.renderer()}
        </div>
      </div>
      <div id="modal-container"></div>
      ${this.showNotifPanel ? this.renderNotifPanel() : ''}
      ${this.mobileMenuOpen ? '<div class="sidebar-overlay" onclick="App.toggleMobileMenu()"></div>' : ''}
    `;
  },

  /* ── Header ────────────────────────────────── */
  renderHeader() {
    const u = MockData.currentUser;
    const isReviewer = ['admin_pusat', 'auditor', 'unit_level0'].includes(u.roleId) || u.unitId === 'unit-007';
    const unread = MockData.notifications.filter(n => n.unread && (isReviewer || !n.targetUnitId || n.targetUnitId === u.unitId)).length;
    return `
      <header class="header">
        <div class="header-left">
          <button class="header-hamburger" onclick="App.toggleSidebar()" aria-label="Menu">☰</button>
        </div>
        <div class="header-right">
          <div class="header-unit-info">
            <div style="font-weight:500">${u.unitName}</div>
            <div style="opacity:0.7;font-size:0.6875rem">${u.role}</div>
          </div>

          <button class="header-notif" onclick="App.toggleNotif()" aria-label="Notifikasi">
            🔔
            ${unread > 0 ? `<span class="badge-count">${unread}</span>` : ''}
          </button>
          <button class="header-profile" onclick="App.navigate('informasi_profil')">
            <div class="header-avatar">${u.avatar}</div>
            <span class="header-profile-name">${u.fullName.split(',')[0]}</span>
          </button>
        </div>
      </header>`;
  },

  /* ── Sidebar ───────────────────────────────── */
  renderSidebar() {
    const renderItem = (item) => {
      if (!this.isMenuVisible(item.id)) return '';
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = !!this.expandedMenus[item.id];
      const isActive = this.currentPage === item.id;
      const isParentOfActive = hasChildren && this.isParentActive(item.id);

      if (hasChildren) {
        // Filter children by RBAC
        const visibleChildren = item.children.filter(c => this.isMenuVisible(c.id));
        if (visibleChildren.length === 0) return ''; // no visible children → hide parent too

        return `
          <div class="sidebar-menu-group ${isExpanded ? 'expanded' : ''} ${isParentOfActive ? 'parent-active' : ''}">
            <a class="sidebar-item sidebar-parent ${isParentOfActive ? 'active' : ''}"
               onclick="App.toggleMenu('${item.id}')">
              <span class="sidebar-item-icon">${item.icon}</span>
              <span class="sidebar-item-label">${item.label}</span>
              <span class="sidebar-chevron">${isExpanded ? '▾' : '▸'}</span>
            </a>
            <div class="sidebar-submenu ${isExpanded ? 'open' : ''}">
              ${visibleChildren.map(child => {
          const subActive = this.currentPage === child.id;
          return `
                  <a class="sidebar-subitem ${subActive ? 'active' : ''}"
                     onclick="App.navigate('${child.id}')">
                    <span class="sidebar-subitem-bullet"></span>
                    <span class="sidebar-subitem-label">${child.label}</span>
                  </a>`;
        }).join('')}
            </div>
          </div>`;
      } else {
        return `
          <a class="sidebar-item ${isActive ? 'active' : ''}"
             onclick="App.navigate('${item.id}')">
            <span class="sidebar-item-icon">${item.icon}</span>
            <span class="sidebar-item-label">${item.labelFull || item.label}</span>
          </a>`;
      }
    };

    return `
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-brand">
            <div class="sidebar-brand-icon"><img src="assets/logo-kinerjaku.png" alt="Logo KKP" style="height:48px;object-fit:contain"></div>
            <div>
              <div class="sidebar-brand-text">KinerjaKu</div>
              <div class="sidebar-brand-sub">Kementerian Kelautan dan Perikanan</div>
            </div>
          </div>
        </div>
        <nav class="sidebar-nav">
          <div class="sidebar-section-label">Menu Utama</div>
          ${this.menuItems.map(renderItem).join('')}
        </nav>
        <div class="sidebar-footer">
          <a class="sidebar-item" onclick="App.logout()">
            <span class="sidebar-item-icon">🚪</span>
            <span class="sidebar-item-label">Keluar</span>
          </a>
        </div>
        <div class="sidebar-wave"></div>
      </aside>`;
  },

  /* ── Topbar ────────────────────────────────── */
  renderTopbar(breadcrumbs) {
    const crumbs = breadcrumbs.map((b, i) => {
      const isLast = i === breadcrumbs.length - 1;
      if (isLast) return `<span class="current">${b}</span>`;
      if (i === 0 && b !== 'Dashboard') {
        return `<a onclick="App.navigate('dashboard')">Dashboard</a><span class="separator">›</span><span>${b}</span><span class="separator">›</span>`;
      }
      return `<a onclick="App.navigate('dashboard')">${b}</a><span class="separator">›</span>`;
    }).join('');

    return `
      <div class="topbar">
        <div class="topbar-breadcrumb">${crumbs}</div>
        <div class="topbar-filters">
          <select class="form-select" style="min-width:150px;padding:6px 30px 6px 10px;font-size:0.8125rem" onchange="MockData.activePeriod.quarter=this.value;App.renderPage()">
            <option value="TW I" selected>2026 — TW I</option>
            <option value="TW II">2026 — TW II</option>
            <option value="TW III">2026 — TW III</option>
            <option value="TW IV">2026 — TW IV</option>
          </select>
          <select class="form-select" style="min-width:180px;padding:6px 30px 6px 10px;font-size:0.8125rem" onchange="App.activeUnitFilter=this.value;App.renderPage()">
            <option value="all">Semua Unit Kerja</option>
            ${MockData.units.filter(u => u.level !== 0).map(u => `<option value="${u.id}" ${App.activeUnitFilter === u.id ? 'selected' : ''}>${u.name}</option>`).join('')}
          </select>
        </div>
      </div>`;
  },

  /* ── Notifications ─────────────────────────── */
  renderNotifPanel() {
    const isReviewer = ['admin_pusat', 'auditor', 'unit_level0'].includes(MockData.currentUser.roleId) || MockData.currentUser.unitId === 'unit-007';
    const userUnit = MockData.currentUser.unitId;

    // Filter notifications: Show if reviewer, or if it targets this user's unit, or if it's a system-wide notification (no targetUnitId)
    const notifications = MockData.notifications.filter(n =>
      isReviewer || !n.targetUnitId || n.targetUnitId === userUnit
    );
    const unread = notifications.filter(n => n.unread).length;
    const typeIcons = { submit: '📨', review: '📋', overdue: '⚠️', approved: '✅', delayed: '🕐', info: 'ℹ️' };
    const items = notifications.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="App.markNotifRead('${n.id}')">
        <div style="display:flex;gap:10px;align-items:flex-start">
          <span style="font-size:1.25rem;flex-shrink:0;margin-top:2px">${typeIcons[n.type] || '🔔'}</span>
          <div style="flex:1;min-width:0">
            <div class="notif-item-title">${n.title}</div>
            <div style="font-size:0.8125rem;color:var(--neutral-600);margin:4px 0">${n.message}</div>
            <div class="notif-item-time">${n.createdAt ? MockData.timeAgo(n.createdAt) : (n.time || '-')}</div>
          </div>
          ${n.unread ? '<span style="width:8px;height:8px;border-radius:50%;background:var(--primary-500);flex-shrink:0;margin-top:6px"></span>' : ''}
        </div>
      </div>`).join('');

    return `
      <div class="notif-panel" id="notif-panel">
        <div style="padding:var(--space-md) var(--space-lg);border-bottom:1px solid var(--neutral-300);display:flex;align-items:center;justify-content:space-between">
          <h3 style="margin:0">🔔 Notifikasi ${unread > 0 ? '<span style="font-size:12px;background:var(--primary-500);color:#fff;padding:2px 8px;border-radius:12px;margin-left:6px">' + unread + ' baru</span>' : ''}</h3>
          <button class="btn btn-ghost btn-sm" onclick="App.toggleNotif()">✕</button>
        </div>
        ${unread > 0 ? '<div style="padding:8px 16px;border-bottom:1px solid var(--neutral-200);text-align:right"><button class="btn btn-ghost btn-sm" onclick="App.markAllRead()" style="font-size:12px;color:var(--primary-500)">✓ Tandai semua dibaca</button></div>' : ''}
        ${items}
        <div style="padding:12px 16px;border-top:1px solid var(--neutral-200);text-align:center">
          <button class="btn btn-ghost btn-sm" onclick="App.toggleNotif();App.navigate('informasi_log')" style="font-size:12px;color:var(--primary-500)">📋 Lihat Log Aktivitas</button>
        </div>
      </div>`;
  },

  markNotifRead(id) {
    const n = MockData.notifications.find(n => n.id === id);
    if (n) {
      n.unread = false;
      MockData.saveNotifications();
    }
    const panel = document.getElementById('notif-panel');
    if (panel) { panel.remove(); }
    const container = document.createElement('div');
    container.innerHTML = this.renderNotifPanel();
    document.body.appendChild(container.firstElementChild);
    // Update header badge
    const badge = document.querySelector('.header-notif .badge-count');
    const isReviewer = ['admin_pusat', 'auditor', 'unit_level0'].includes(MockData.currentUser.roleId) || MockData.currentUser.unitId === 'unit-007';
    const userUnit = MockData.currentUser.unitId;
    const unread = MockData.notifications.filter(n => n.unread && (isReviewer || !n.targetUnitId || n.targetUnitId === userUnit)).length;
    if (badge) { badge.textContent = unread > 0 ? unread : ''; if (unread === 0) badge.style.display = 'none'; }
  },

  markAllRead() {
    MockData.notifications.forEach(n => n.unread = false);
    MockData.saveNotifications();
    const panel = document.getElementById('notif-panel');
    if (panel) { panel.remove(); }
    const container = document.createElement('div');
    container.innerHTML = this.renderNotifPanel();
    document.body.appendChild(container.firstElementChild);
    const badge = document.querySelector('.header-notif .badge-count');
    if (badge) { badge.style.display = 'none'; }
  },

  toggleNotif() {
    this.showNotifPanel = !this.showNotifPanel;
    const panel = document.getElementById('notif-panel');
    if (panel) {
      panel.remove();
      this.showNotifPanel = false;
    } else {
      const container = document.createElement('div');
      container.innerHTML = this.renderNotifPanel();
      document.body.appendChild(container.firstElementChild);
      this.showNotifPanel = true;
    }
  },

  closeModal() {
    const mc = document.getElementById('modal-container');
    if (mc) mc.innerHTML = '';
  },

  logout() {
    this.isLoggedIn = false;
    this.currentPage = 'login';
    this.expandedMenus = {};
    localStorage.removeItem('kinerjaku_loggedIn');
    localStorage.removeItem('kinerjaku_user');
    this.renderPage();
  }
};

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => App.init());
