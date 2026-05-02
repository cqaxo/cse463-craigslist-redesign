// ============================================================
// CSE/SER 463 Craigslist Redesign Prototype
// Vanilla JS SPA - all state + screens in one file
// ============================================================

// ---------- DATA ----------
const SVG_ICONS = {
  forSale: '<svg viewBox="0 0 24 24"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6z"/></svg>',
  housing: '<svg viewBox="0 0 24 24"><path d="M12 3l-9 8h3v8h5v-5h2v5h5v-8h3z"/></svg>',
  jobs: '<svg viewBox="0 0 24 24"><path d="M20 6h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6 0h-4V4h4v2z"/></svg>',
  services: '<svg viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1a5 5 0 0 0-6-6l3.8 3.8-2.8 2.8L4.7 6.7a5 5 0 0 0 6 6L19.8 22 22.7 19z"/></svg>',
  community: '<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
  laptop: '<svg viewBox="0 0 24 24"><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-5 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5-4H7V4h10v14z"/></svg>',
  bike: '<svg viewBox="0 0 24 24"><path d="M5 19a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm14-1a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM12 5l-2 4h4l-2-4z"/></svg>',
  sofa: '<svg viewBox="0 0 24 24"><path d="M20 8h-3V4H7v4H4a1 1 0 0 0-1 1v9h2v-2h14v2h2v-9a1 1 0 0 0-1-1zM9 6h6v2H9V6z"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 1l-9 4v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm-2 15l-4-4 1.4-1.4L10 13.2 16.6 6.6 18 8l-8 8z"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
  cart: '<svg viewBox="0 0 24 24"><path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 4l-1 2h13l-3 7H8l-1-2L5 4H2V2h4l1 2z"/></svg>',
};

const CATEGORIES = [
  { id: 'forsale', icon: 'forSale', title: 'For Sale', sub: 'Electronics, furniture' },
  { id: 'housing', icon: 'housing', title: 'Housing', sub: 'Rent, buy, swap' },
  { id: 'jobs', icon: 'jobs', title: 'Jobs', sub: 'Full-time, gigs' },
  { id: 'services', icon: 'services', title: 'Services', sub: 'Skilled trades' },
  { id: 'community', icon: 'community', title: 'Community', sub: 'Events, groups' },
];

const FEATURED_LISTINGS = [
  { id: 1, price: 450, title: 'iPhone 13 Pro 256GB', loc: 'Atlanta', time: '2hr ago', icon: 'phone', verified: true, brand: 'Apple', condition: 'Excellent' },
  { id: 2, price: 180, title: 'Trek Mountain Bike', loc: 'Decatur', time: '5hr ago', icon: 'bike', verified: false, brand: 'Trek', condition: 'Good' },
  { id: 3, price: 320, title: 'Leather Sectional Sofa', loc: 'Marietta', time: '1d ago', icon: 'sofa', verified: true, brand: 'IKEA', condition: 'Excellent' },
  { id: 4, price: 290, title: 'Dell Laptop, 16GB RAM', loc: 'Atlanta', time: '1d ago', icon: 'laptop', verified: true, brand: 'Dell', condition: 'Excellent' },
];

const LAPTOP_LISTINGS = [
  { id: 101, price: 150, title: 'Dell E6520 Desktop Replacement Laptop', loc: 'Atlanta GA', time: '2d ago', icon: 'laptop', verified: false, brand: 'Dell', storage: '256 GB', screen: '15"', condition: 'Good', seller: 'Mike R.', rating: 4.2 },
  { id: 102, price: 70, title: '14" HP Laptop, 4GB RAM', loc: 'South Fulton', time: '3d ago', icon: 'laptop', verified: false, brand: 'HP', storage: '128 GB', screen: '14"', condition: 'Fair', seller: 'Tom K.', rating: 3.8 },
  { id: 103, price: 265, title: '17" HP Laptop Computer', loc: 'South Fulton', time: '1d ago', icon: 'laptop', verified: true, brand: 'HP', storage: '512 GB', screen: '17"', condition: 'Excellent', seller: 'Sarah M.', rating: 4.9 },
  { id: 104, price: 180, title: '14" Dell Latitude 5400 Laptop', loc: 'South Fulton', time: '6h ago', icon: 'laptop', verified: true, brand: 'Dell', storage: '256 GB', screen: '14"', condition: 'Good', seller: 'James K.', rating: 4.7 },
  { id: 105, price: 290, title: 'HP 14" Laptop, 16GB RAM, Win 11', loc: 'South Fulton', time: '13d ago', icon: 'laptop', verified: true, brand: 'HP', storage: '512 GB', screen: '14"', condition: 'Excellent', seller: 'James K.', rating: 4.9, isHero: true },
  { id: 106, price: 299, title: 'Dell Latitude 5510 15.6" Touch screen', loc: 'Alpharetta', time: '5h ago', icon: 'laptop', verified: false, brand: 'Dell', storage: '512 GB', screen: '15"', condition: 'Excellent', seller: 'Chris T.', rating: 4.5 },
  { id: 107, price: 249, title: 'Dell Latitude 7310 13.3" Laptop i7', loc: 'Alpharetta', time: '1d ago', icon: 'laptop', verified: false, brand: 'Dell', storage: '256 GB', screen: '13"', condition: 'Excellent', seller: 'Pat L.', rating: 4.3 },
  { id: 108, price: 279, title: 'Dell Latitude 5411 14" Laptop i5', loc: 'Alpharetta', time: '2d ago', icon: 'laptop', verified: true, brand: 'Dell', storage: '512 GB', screen: '14"', condition: 'Excellent', seller: 'Riley S.', rating: 4.8 },
  { id: 109, price: 220, title: 'Lenovo ThinkPad T480 i5 8GB', loc: 'Atlanta', time: '3d ago', icon: 'laptop', verified: false, brand: 'Lenovo', storage: '256 GB', screen: '14"', condition: 'Good', seller: 'Dana W.', rating: 4.4 },
];

// ---------- STATE ----------
var state = {
  screen: 'home',
  selectedListing: null,
  filters: {
    minPrice: '',
    maxPrice: 300,
    brands: ['HP', 'Dell'],
    storage: ['256 GB', '512 GB'],
    screens: ['14"', '15"'],
    conditions: ['Excellent', 'Good'],
    distance: '10 mi',
  },
  modal: null, // 'savedSearch' | 'chat' | null
  savedSearches: [],
  postForm: {
    category: null,
    title: '',
    price: '',
    brand: '',
    model: '',
    condition: '',
    ram: '',
    storage: '',
    description: '',
  },
  chatMessages: [
    { from: 'them', text: 'Hi, is this still available?', time: '2:14 PM' },
    { from: 'me', text: 'Yes! Still available. Excellent condition, comes with charger.', time: '2:16 PM' },
  ],
  paySelection: 'Card',
};

// ---------- ROUTER ----------
function navigate(screen, opts = {}) {
  state.screen = screen;
  if (opts.listing !== undefined) state.selectedListing = opts.listing;
  state.modal = null;
  render();
  window.scrollTo(0, 0);
}

function openModal(modal) {
  state.modal = modal;
  render();
}

function closeModal() {
  state.modal = null;
  render();
}

// ---------- COMPONENTS ----------
function nav() {
  return `
    <nav class="nav">
      <div class="logo" onclick="navigate('home')">CL<span class="dot">.</span></div>
      <div class="nav-right">
        <a onclick="navigate('home')">Atlanta</a>
        <a>Sign in</a>
        <button class="post-btn" onclick="navigate('postCategory')">+ Post an Ad</button>
      </div>
    </nav>
  `;
}

function breadcrumbs(items) {
  return `
    <div class="breadcrumb-bar">
      <div class="breadcrumb-inner">
        ${items.map((item, i) => {
          const isLast = i === items.length - 1;
          if (isLast) return `<span class="crumb-current">${item.label}</span>`;
          return `<a class="crumb" onclick="${item.action || ''}">${item.label}</a><span class="crumb-sep">&gt;</span>`;
        }).join('')}
      </div>
    </div>
  `;
}

function listingCard(l) {
  return `
    <div class="listing-card" onclick="navigate('detail', { listing: ${l.id} })">
      <div class="listing-img">
        ${SVG_ICONS[l.icon] || SVG_ICONS.laptop}
        ${l.verified ? '<div class="verified-badge">VERIFIED SELLER</div>' : ''}
      </div>
      <div class="listing-info">
        <div class="listing-price">$${l.price}</div>
        <div class="listing-title">${l.title}</div>
        <div class="listing-loc">${l.loc} · ${l.time}</div>
      </div>
    </div>
  `;
}

// ---------- SCREENS ----------
function homeScreen() {
  return `
    ${nav()}
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-title">Find anything, locally.</div>
        <div class="hero-sub">Browse millions of listings in your area</div>
        <div class="search-bar">
          <input id="search-input" placeholder="Try 'laptop under $300'..." onkeydown="if(event.key==='Enter') doSearch()">
          <select><option>All categories</option></select>
          <button onclick="doSearch()">Search</button>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="section-title">Browse Categories</div>
      <div class="cat-grid">
        ${CATEGORIES.map(c => `
          <div class="cat-card" onclick="navigate('search')">
            <div class="cat-icon">${SVG_ICONS[c.icon]}</div>
            <div class="cat-title">${c.title}</div>
            <div class="cat-sub">${c.sub}</div>
          </div>
        `).join('')}
      </div>
      <div class="section-title">Recently Posted Near You</div>
      <div class="listing-grid">
        ${FEATURED_LISTINGS.map(listingCard).join('')}
      </div>
    </div>
  `;
}

function doSearch() {
  navigate('search');
}

function searchScreen() {
  // Filter laptops based on state
  const filtered = LAPTOP_LISTINGS.filter(l => {
    if (state.filters.maxPrice && l.price > state.filters.maxPrice) return false;
    if (state.filters.minPrice && l.price < state.filters.minPrice) return false;
    if (state.filters.brands.length && !state.filters.brands.includes(l.brand)) return false;
    if (state.filters.storage.length && !state.filters.storage.includes(l.storage)) return false;
    if (state.filters.screens.length && !state.filters.screens.includes(l.screen)) return false;
    if (state.filters.conditions.length && !state.filters.conditions.includes(l.condition)) return false;
    return true;
  });

  return `
    ${nav()}
    ${breadcrumbs([
      { label: 'Home', action: "navigate('home')" },
      { label: 'For Sale', action: "navigate('home')" },
      { label: 'Electronics', action: "navigate('home')" },
      { label: 'Laptops' }
    ])}
    <div class="search-layout">
      <aside class="filter-card">
        <div class="filter-head">
          <div class="filter-title">Filters - Laptops</div>
          <button class="reset-btn" onclick="resetFilters()">Reset</button>
        </div>
        <div class="filter-section">
          <div class="filter-label">Price Range</div>
          <div class="price-row">
            <input type="number" placeholder="$ Min" value="${state.filters.minPrice}" oninput="state.filters.minPrice = this.value ? +this.value : ''; render()">
            <input type="number" placeholder="$ Max" value="${state.filters.maxPrice}" oninput="state.filters.maxPrice = this.value ? +this.value : ''; render()">
          </div>
        </div>
        <div class="filter-section">
          <div class="filter-label">Brand <span class="smart-tag">SMART</span></div>
          ${['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS'].map(b => `
            <label class="check-row">
              <input type="checkbox" ${state.filters.brands.includes(b) ? 'checked' : ''} onchange="toggleFilter('brands', '${b}')">
              ${b}
              <span class="count">${LAPTOP_LISTINGS.filter(l => l.brand === b).length}</span>
            </label>
          `).join('')}
        </div>
        <div class="filter-section">
          <div class="filter-label">Storage <span class="smart-tag">SMART</span></div>
          <div class="chips">
            ${['128 GB', '256 GB', '512 GB', '1 TB'].map(s => `
              <div class="chip ${state.filters.storage.includes(s) ? 'active' : ''}" onclick="toggleFilter('storage', '${s}')">${s}</div>
            `).join('')}
          </div>
        </div>
        <div class="filter-section">
          <div class="filter-label">Screen Size <span class="smart-tag">SMART</span></div>
          <div class="chips">
            ${['11"', '13"', '14"', '15"', '17"'].map(s => `
              <div class="chip ${state.filters.screens.includes(s) ? 'active' : ''}" onclick="toggleFilter('screens', '${s}')">${s}</div>
            `).join('')}
          </div>
        </div>
        <div class="filter-section">
          <div class="filter-label">Condition</div>
          <div class="chips">
            ${['Excellent', 'Good', 'Fair'].map(c => `
              <div class="chip ${state.filters.conditions.includes(c) ? 'active' : ''}" onclick="toggleFilter('conditions', '${c}')">${c}</div>
            `).join('')}
          </div>
        </div>
        <div class="filter-section">
          <div class="filter-label">Distance</div>
          <div class="chips">
            ${['5 mi', '10 mi', '25 mi', '50+ mi'].map(d => `
              <div class="chip ${state.filters.distance === d ? 'active' : ''}" onclick="state.filters.distance = '${d}'; render()">${d}</div>
            `).join('')}
          </div>
        </div>
      </aside>
      <main>
        <div class="search-header">
          <div>
            <div class="search-h1">Laptops in Atlanta</div>
            <div class="search-h-sub">${filtered.length} results</div>
          </div>
          <button class="save-search-btn" onclick="openModal('savedSearch')">
            ${SVG_ICONS.bookmark} Save Search
          </button>
        </div>
        <div class="results-grid">
          ${filtered.map(listingCard).join('')}
        </div>
        ${filtered.length === 0 ? '<div style="padding:40px;text-align:center;color:var(--text-muted);">No results match your filters. Try widening your search.</div>' : ''}
      </main>
    </div>
  `;
}

function toggleFilter(key, value) {
  const arr = state.filters[key];
  const idx = arr.indexOf(value);
  if (idx >= 0) arr.splice(idx, 1);
  else arr.push(value);
  render();
}

function resetFilters() {
  state.filters = {
    minPrice: '', maxPrice: '',
    brands: [], storage: [], screens: [], conditions: [],
    distance: '10 mi',
  };
  render();
}

function detailScreen() {
  const l = LAPTOP_LISTINGS.find(x => x.id === state.selectedListing) ||
            FEATURED_LISTINGS.find(x => x.id === state.selectedListing) ||
            LAPTOP_LISTINGS[4]; // Default to hero listing
  
  const initials = l.seller ? l.seller.split(' ').map(n => n[0]).join('') : 'JK';
  
  return `
    ${nav()}
    ${breadcrumbs([
      { label: 'Home', action: "navigate('home')" },
      { label: 'For Sale', action: "navigate('home')" },
      { label: 'Electronics', action: "navigate('search')" },
      { label: 'Laptops', action: "navigate('search')" },
      { label: l.title }
    ])}
    <div class="listing-detail-grid">
      <div>
        <div class="img-main">${SVG_ICONS[l.icon] || SVG_ICONS.laptop}</div>
        <div class="thumbs">
          <div class="thumb"></div><div class="thumb"></div><div class="thumb"></div><div class="thumb"></div><div class="thumb"></div>
        </div>
      </div>
      <div>
        <div class="detail-price">$${l.price}</div>
        <div class="detail-title">${l.title}</div>
        <div class="detail-loc">${l.loc} - Posted ${l.time}</div>
        <div class="detail-specs">
          <div class="spec-row"><span>Brand</span><span>${l.brand || 'HP'}</span></div>
          <div class="spec-row"><span>Model</span><span>${l.brand === 'HP' ? '14-an013nr' : 'Latitude 5410'}</span></div>
          <div class="spec-row"><span>Condition</span><span>${l.condition || 'Excellent'}</span></div>
          <div class="spec-row"><span>RAM / Storage</span><span>16GB / ${l.storage || '32GB SSD'}</span></div>
        </div>
        <div class="seller-card">
          <div class="seller-section-label">SELLER</div>
          <div class="seller-head">
            <div class="avatar">${initials}</div>
            <div class="seller-info">
              <div class="seller-name">${l.seller || 'James K.'} ${l.verified ? '<span class="verified">VERIFIED</span>' : ''}</div>
              <div class="stars">${'★'.repeat(Math.round(l.rating || 4.9))}${'☆'.repeat(5 - Math.round(l.rating || 4.9))}</div>
              <div class="rating-text">${l.rating || 4.9} (${Math.floor((l.rating || 4.9) * 10)} reviews)</div>
            </div>
          </div>
          <div class="seller-stats">
            <div><strong>3 yrs</strong>Member since</div>
            <div><strong>52</strong>Items sold</div>
            <div><strong>~2hr</strong>Response time</div>
          </div>
        </div>
        <div class="actions">
          <button class="btn-primary" onclick="openModal('chat')">Message Seller</button>
          <button class="btn-secondary">Save</button>
        </div>
        <button class="btn-buy" onclick="navigate('checkout')">
          ${SVG_ICONS.shield} Buy with Buyer Protection - $${l.price}
        </button>
      </div>
    </div>
  `;
}

function checkoutScreen() {
  const l = LAPTOP_LISTINGS.find(x => x.id === state.selectedListing) || LAPTOP_LISTINGS[4];
  const itemPrice = l.price;
  const fee = (itemPrice * 0.03).toFixed(2);
  const total = (itemPrice + parseFloat(fee)).toFixed(2);
  
  return `
    ${nav()}
    <div class="checkout-container">
      <div class="post-page-h1">Secure Checkout</div>
      <div class="post-page-sub">Pay safely through Craigslist with built-in buyer protection</div>
      <div class="summary-card">
        <div class="checkout-section-title">Item</div>
        <div style="display:flex;gap:12px;align-items:center;">
          <div style="width:60px;height:60px;background:linear-gradient(135deg,#cbd5e1,#94a3b8);border-radius:8px;display:flex;align-items:center;justify-content:center;">
            <div style="width:30px;height:30px;color:white;opacity:0.85;">${SVG_ICONS[l.icon] || SVG_ICONS.laptop}</div>
          </div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:600;">${l.title}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">From ${l.seller || 'James K.'} - ${l.loc}</div>
          </div>
          <div style="font-size:18px;font-weight:700;">$${itemPrice}</div>
        </div>
      </div>
      <div class="protection-card">
        <div class="protection-head">
          <div class="shield">${SVG_ICONS.shield}</div>
          <div class="protection-title">Buyer Protection Included</div>
        </div>
        <div class="protection-list">
          <div>- Full refund if item is not as described</div>
          <div>- Funds held until you confirm receipt</div>
          <div>- 24/7 support team for disputes</div>
        </div>
      </div>
      <div class="summary-card">
        <div class="checkout-section-title">Payment Method</div>
        <div class="pay-options">
          ${['Card', 'PayPal', 'Apple Pay'].map(p => `
            <div class="pay-option ${state.paySelection === p ? 'active' : ''}" onclick="state.paySelection='${p}'; render()">${p}</div>
          `).join('')}
        </div>
        <div class="totals">
          <div class="total-row"><span>Item price</span><span>$${itemPrice}.00</span></div>
          <div class="total-row"><span>Service fee</span><span>$${fee}</span></div>
          <div class="total-row"><span>Buyer protection</span><span>Included</span></div>
          <div class="total-row grand"><span>Total</span><span>$${total}</span></div>
        </div>
      </div>
      <button class="pay-btn" onclick="navigate('purchaseSuccess')">Pay Securely - $${total}</button>
    </div>
  `;
}

function purchaseSuccessScreen() {
  return `
    ${nav()}
    <div class="container">
      <div class="success-card">
        <div class="success-icon">${SVG_ICONS.check}</div>
        <div class="success-title">Payment Successful!</div>
        <div class="success-sub">Your order is confirmed. The seller has been notified, and your funds are being held safely until you confirm you've received the item.</div>
        <div style="display:flex;gap:12px;justify-content:center;">
          <button class="btn-primary" onclick="navigate('home')">Back to Home</button>
          <button class="btn-secondary" onclick="openModal('chat')">Message Seller</button>
        </div>
      </div>
    </div>
  `;
}

function postCategoryScreen() {
  return `
    ${nav()}
    ${breadcrumbs([
      { label: 'Home', action: "navigate('home')" },
      { label: 'Post an Ad' },
    ])}
    <div class="container-narrow">
      <div class="post-page-h1">What are you posting?</div>
      <div class="post-page-sub">Choose a category to get started</div>
      <div class="cat-picker-grid">
        ${CATEGORIES.map(c => `
          <div class="cat-picker-card" onclick="state.postForm.category='${c.title}'; navigate('postForm')">
            <div class="cat-icon">${SVG_ICONS[c.icon]}</div>
            <div class="cat-title">${c.title}</div>
            <div class="cat-sub">${c.sub}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function postFormScreen() {
  const f = state.postForm;
  // Calculate completion (out of 8 required fields)
  const required = ['title', 'price', 'brand', 'model', 'condition', 'ram', 'storage', 'description'];
  const filled = required.filter(k => f[k] && f[k].toString().trim()).length;
  const percent = Math.round(filled / required.length * 100);
  const canPublish = filled === required.length;

  return `
    ${nav()}
    ${breadcrumbs([
      { label: 'Home', action: "navigate('home')" },
      { label: 'Post an Ad', action: "navigate('postCategory')" },
      { label: f.category || 'New Listing' },
    ])}
    <div class="container-narrow">
      <div class="post-page-h1">Post a Listing - ${f.category || 'For Sale'}</div>
      <div class="post-page-sub">All required fields marked with <span style="color:var(--red);">*</span> help buyers find your item faster</div>
      <div class="form-card">
        <div class="checkout-section-title">Item Details</div>
        <div class="field">
          <label>Title <span class="req">*</span></label>
          <input class="${f.title ? 'filled' : ''}" placeholder="e.g. HP 14 inch Laptop, 16GB RAM" value="${f.title}" oninput="state.postForm.title = this.value; updateProgress()">
        </div>
        <div class="field-row">
          <div class="field">
            <label>Price (USD) <span class="req">*</span></label>
            <input class="${f.price ? 'filled' : ''}" type="number" placeholder="$" value="${f.price}" oninput="state.postForm.price = this.value; updateProgress()">
          </div>
          <div class="field">
            <label>Brand <span class="req">*</span></label>
            <input class="${f.brand ? 'filled' : ''}" placeholder="e.g. HP" value="${f.brand}" oninput="state.postForm.brand = this.value; updateProgress()">
          </div>
        </div>
        <div class="field-row cols-3">
          <div class="field">
            <label>Model <span class="req">*</span></label>
            <input class="${f.model ? 'filled' : ''}" placeholder="e.g. 14-an013nr" value="${f.model}" oninput="state.postForm.model = this.value; updateProgress()">
          </div>
          <div class="field">
            <label>Condition <span class="req">*</span></label>
            <select class="${f.condition ? 'filled' : ''}" onchange="state.postForm.condition = this.value; updateProgress()">
              <option value="">Select...</option>
              <option ${f.condition === 'Excellent' ? 'selected' : ''}>Excellent</option>
              <option ${f.condition === 'Good' ? 'selected' : ''}>Good</option>
              <option ${f.condition === 'Fair' ? 'selected' : ''}>Fair</option>
            </select>
          </div>
          <div class="field">
            <label>Year</label>
            <input placeholder="Optional" value="">
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label>RAM <span class="req">*</span></label>
            <input class="${f.ram ? 'filled' : ''}" placeholder="e.g. 16 GB" value="${f.ram}" oninput="state.postForm.ram = this.value; updateProgress()">
          </div>
          <div class="field">
            <label>Storage <span class="req">*</span></label>
            <input class="${f.storage ? 'filled' : ''}" placeholder="e.g. 512 GB SSD" value="${f.storage}" oninput="state.postForm.storage = this.value; updateProgress()">
          </div>
        </div>
        <div class="field">
          <label>Description <span class="req">*</span></label>
          <textarea class="${f.description ? 'filled' : ''}" rows="3" placeholder="Describe condition, included accessories, and reason for selling..." oninput="state.postForm.description = this.value; updateProgress()">${f.description}</textarea>
          <div class="help">Tip: Include any cosmetic wear, included accessories, and reason for selling</div>
        </div>
        <div class="progress-section">
          <div class="progress"><div class="progress-fill" style="width:${percent}%;"></div></div>
          <div class="progress-text">${filled} of ${required.length} required fields complete${canPublish ? ' - ready to publish!' : ' - ' + (required.length - filled) + ' more to publish'}</div>
        </div>
      </div>
      <div class="form-actions">
        <button class="publish-btn" ${canPublish ? '' : 'disabled'} onclick="navigate('postSuccess')">Publish Listing</button>
        <button class="btn-secondary" style="display:inline-block;" onclick="autoFillForm()">Auto-fill Demo Data</button>
      </div>
    </div>
  `;
}

function autoFillForm() {
  state.postForm = {
    category: state.postForm.category || 'For Sale',
    title: 'HP 14" Laptop, 16GB RAM, Excellent Condition',
    price: '290',
    brand: 'HP',
    model: '14-an013nr',
    condition: 'Excellent',
    ram: '16 GB',
    storage: '512 GB SSD',
    description: 'Windows 11 Home, AMD E2-7110 APU CPU, Radeon R2 Graphics. Excellent condition, comes with original charger and box.',
  };
  render();
}

function updateProgress() {
  // Re-render to update progress bar without losing focus
  // Use a more targeted update to avoid losing input focus
  const required = ['title', 'price', 'brand', 'model', 'condition', 'ram', 'storage', 'description'];
  const filled = required.filter(k => state.postForm[k] && state.postForm[k].toString().trim()).length;
  const percent = Math.round(filled / required.length * 100);
  const fillEl = document.querySelector('.progress-fill');
  const textEl = document.querySelector('.progress-text');
  const btnEl = document.querySelector('.publish-btn');
  if (fillEl) fillEl.style.width = percent + '%';
  if (textEl) textEl.textContent = `${filled} of ${required.length} required fields complete${filled === required.length ? ' - ready to publish!' : ' - ' + (required.length - filled) + ' more to publish'}`;
  if (btnEl) {
    if (filled === required.length) btnEl.removeAttribute('disabled');
    else btnEl.setAttribute('disabled', 'disabled');
  }
}

function postSuccessScreen() {
  return `
    ${nav()}
    <div class="container">
      <div class="success-card">
        <div class="success-icon">${SVG_ICONS.check}</div>
        <div class="success-title">Listing Published!</div>
        <div class="success-sub">Your listing is now live. We'll notify you when buyers send messages or save your listing.</div>
        <div style="display:flex;gap:12px;justify-content:center;">
          <button class="btn-primary" onclick="navigate('home')">Back to Home</button>
          <button class="btn-secondary" onclick="state.postForm = { category: null, title: '', price: '', brand: '', model: '', condition: '', ram: '', storage: '', description: '' }; navigate('postCategory')">Post Another Item</button>
        </div>
      </div>
    </div>
  `;
}

// ---------- MODALS ----------
function savedSearchModal() {
  return `
    <div class="modal-overlay" onclick="if(event.target===this) closeModal()">
      <div class="modal" style="position:relative;">
        <button class="modal-close" onclick="closeModal()">×</button>
        <div class="modal-title">${SVG_ICONS.check} Search saved!</div>
        <div class="modal-sub">Get notified when new listings match your search.</div>
        <div class="saved-search-summary">
          <div><strong>Search:</strong> "laptop under $300"</div>
          <div style="margin-top:4px;"><strong>Filters:</strong> Atlanta - 10 mi, Brand: ${state.filters.brands.join(' or ') || 'All'}, ${state.filters.conditions.join(' or ') || 'All conditions'}</div>
        </div>
        <div class="field">
          <label>Name this search</label>
          <input id="search-name" value="Cheap Atlanta Laptops">
        </div>
        <div class="toggle-row">
          <div class="toggle-info">
            <div class="toggle-info-title">Email notifications</div>
            <div class="toggle-info-sub">Daily digest of new matches</div>
          </div>
          <div class="toggle on" onclick="this.classList.toggle('on')"></div>
        </div>
        <div class="toggle-row">
          <div class="toggle-info">
            <div class="toggle-info-title">Push notifications</div>
            <div class="toggle-info-sub">Real-time alerts on your phone</div>
          </div>
          <div class="toggle" onclick="this.classList.toggle('on')"></div>
        </div>
        <button class="apply-btn" onclick="closeModal()">Save & Get Alerts</button>
      </div>
    </div>
  `;
}

function chatModal() {
  return `
    <div class="modal-overlay" onclick="if(event.target===this) closeModal()">
      <div class="modal chat-modal">
        <div class="chat-head">
          <div class="avatar">JK</div>
          <div>
            <div class="chat-head-name">James K.</div>
            <div class="chat-head-status">Online - replies in ~2hr</div>
          </div>
          <button class="chat-head-close" onclick="closeModal()">×</button>
        </div>
        <div class="chat-availability">Chat available across all categories &amp; locations</div>
        <div class="messages" id="messages">
          ${state.chatMessages.map(m => `
            <div class="msg ${m.from === 'me' ? 'sent' : 'received'}">
              ${m.text}
              <div class="msg-time">${m.time}</div>
            </div>
          `).join('')}
        </div>
        <div class="chat-input">
          <input id="chat-input" placeholder="Type a message..." onkeydown="if(event.key==='Enter') sendChat()">
          <button onclick="sendChat()">${SVG_ICONS.send}</button>
        </div>
      </div>
    </div>
  `;
}

function sendChat() {
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  state.chatMessages.push({ from: 'me', text: input.value, time });
  input.value = '';
  render();
  // Auto-reply after a moment
  setTimeout(() => {
    state.chatMessages.push({
      from: 'them',
      text: 'Sounds good! When works for pickup?',
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    });
    render();
  }, 1500);
}

// ---------- RENDER ----------
function render() {
  const screens = {
    home: homeScreen,
    search: searchScreen,
    detail: detailScreen,
    checkout: checkoutScreen,
    purchaseSuccess: purchaseSuccessScreen,
    postCategory: postCategoryScreen,
    postForm: postFormScreen,
    postSuccess: postSuccessScreen,
  };
  const renderFn = screens[state.screen] || homeScreen;
  let html = renderFn();
  
  // Modals
  if (state.modal === 'savedSearch') html += savedSearchModal();
  else if (state.modal === 'chat') html += chatModal();
  
  document.getElementById('app').innerHTML = html;
  
  // Auto-scroll chat to bottom if open
  const messages = document.getElementById('messages');
  if (messages) messages.scrollTop = messages.scrollHeight;
}

// Initial render
render();
