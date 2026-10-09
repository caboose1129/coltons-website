/**
 * Colton Williams - Portfolio Logic & Dynamic Updates
 */

document.addEventListener('DOMContentLoaded', () => {
  initDynamicTenure();
  initTechnologiesPanel();
  initThemeToggle();
  initMobileMenu();
  initSmoothScroll();
});

/* ==========================================================================
   1. Dynamic Tenure Calculation (Started June 2015)
   ========================================================================== */
function initDynamicTenure() {
  const CAREER_START = new Date(2015, 5, 1); // June 1, 2015
  const ADVISORY_START = new Date(2020, 8, 1); // September 1, 2020
  const now = new Date();

  // Calculate full years & remaining months
  const totalMilliseconds = now - CAREER_START;
  const msPerYear = 1000 * 60 * 60 * 24 * 365.2425;
  const preciseYears = totalMilliseconds / msPerYear;
  const careerYears = Math.floor(preciseYears);
  const remainingMonths = Math.floor((preciseYears - careerYears) * 12);

  // Update Hero Counter (with smooth number roll-up animation)
  const heroYearsEl = document.getElementById('dynamic-hero-years');
  if (heroYearsEl) {
    animateValue(heroYearsEl, 0, careerYears, 1200, '+');
  }

  // Update Hero Subtitle Detail
  const exactTenureEl = document.getElementById('dynamic-exact-tenure');
  if (exactTenureEl) {
    exactTenureEl.textContent = `Calculated dynamically: ${careerYears} yrs, ${remainingMonths} mos (since June 2015) • Full Lifecycle Engineering`;
  }

  // Update Bio Highlight
  const bioYearsEl = document.getElementById('dynamic-bio-years');
  if (bioYearsEl) {
    bioYearsEl.textContent = `over ${careerYears} years`;
  }

  // Update Advisory Role Tenure
  const advisoryTenureEl = document.getElementById('advisory-tenure');
  if (advisoryTenureEl) {
    const advisoryYears = Math.floor((now - ADVISORY_START) / msPerYear);
    advisoryTenureEl.textContent = `${advisoryYears}+ Years`;
  }

  // Update Footer Year
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = now.getFullYear();
  }
}

/**
 * Animated number counter
 */
function animateValue(element, start, end, duration, suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // easeOutQuad easing
    const easeProgress = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(easeProgress * (end - start) + start);
    element.textContent = current + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + suffix;
    }
  };
  window.requestAnimationFrame(step);
}

/* ==========================================================================
   2. Most Used Technologies Panel
   ========================================================================== */
const TECHNOLOGIES_DATA = [
  // Security & IAM
  {
    name: 'OpenID Connect (OIDC)',
    category: 'security',
    icon: '🔑',
    experience: 'Core Focus',
    description: 'Architecture of identity protocols, token lifecycle management, federated SSO, and standards-compliant OIDC clients.',
    tags: ['SSO', 'OAuth 2.0', 'Tokens', 'Authentication']
  },
  {
    name: 'OAuth 2.0 Framework',
    category: 'security',
    icon: '🛡️',
    experience: 'Expert',
    description: 'Authorization servers, scopes, grant types, and secure token issuance across enterprise distributed systems.',
    tags: ['Authorization', 'PKCE', 'API Security']
  },
  {
    name: 'MFA Policy Engine',
    category: 'security',
    icon: '🏆',
    experience: 'Award Winner',
    description: 'Designed context-aware multi-factor authentication policies and enforcement engine, earning an Outstanding Technical Achievement Award.',
    tags: ['FIDO2', 'WebAuthn', 'Adaptive MFA', 'Awarded']
  },
  {
    name: 'Identity Proofing',
    category: 'security',
    icon: '🪪',
    experience: 'Enterprise Scale',
    description: 'Identity verification workflows, fraud prevention integrations, and NIST compliant credential assurance.',
    tags: ['KYC', 'Assurance Levels', 'NIST 800-63']
  },
  {
    name: 'Threat Modeling & Secure Coding',
    category: 'security',
    icon: '🕵️‍♂️',
    experience: 'Philosophy',
    description: 'Attacker-first design mindset rooted in QA testing origins, OWASP Top 10 defense, and vulnerability mitigation.',
    tags: ['OWASP', 'Zero Trust', 'Static Analysis']
  },

  // Cloud & DevOps
  {
    name: 'Red Hat OpenShift',
    category: 'cloud',
    icon: '🔴',
    experience: 'Production Core',
    description: 'Deploying, managing, and scaling mission-critical containerized SaaS workloads with enterprise security policies.',
    tags: ['PaaS', 'Security Contexts', 'Routes', 'Operators']
  },
  {
    name: 'Kubernetes',
    category: 'cloud',
    icon: '☸️',
    experience: 'Production Core',
    description: 'Container orchestration, pod lifecycle, autoscaling, service mesh, and high-availability cluster deployments.',
    tags: ['K8s', 'Helm', 'Ingress', 'Clustering']
  },
  {
    name: 'Terraform (IaC)',
    category: 'cloud',
    icon: '🏗️',
    experience: 'Architect',
    description: 'Architecting repeatable, modular cloud infrastructure code across multiple cloud environments with zero drift.',
    tags: ['IaC', 'Modules', 'Cloud Automation', 'HCL']
  },
  {
    name: 'Docker & Containerization',
    category: 'cloud',
    icon: '🐳',
    experience: '10+ Years',
    description: 'Multi-stage builds, minimal attack-surface container images, security scanning, and registry management.',
    tags: ['Containers', 'OCI', 'Microservices']
  },
  {
    name: 'IBM Cloud & AWS',
    category: 'cloud',
    icon: '☁️',
    experience: 'Senior Level',
    description: 'Enterprise hybrid cloud deployments, VPC networking, cloud IAM, secrets management, and compliance.',
    tags: ['Hybrid Cloud', 'VPC', 'Cloud IAM']
  },
  {
    name: 'CI/CD Pipelines & GitOps',
    category: 'cloud',
    icon: '🔄',
    experience: 'Continuous',
    description: 'Automated test suites, artifact promotion, vulnerability gates, and automated deployment pipelines.',
    tags: ['Automation', 'DevOps', 'Quality Gates']
  },

  // Backend & Languages
  {
    name: 'Go (Golang)',
    category: 'backend',
    icon: '🩵',
    experience: 'Core Language',
    description: 'High-performance microservices, concurrent worker routines, cloud-native services, and low-latency API backends.',
    tags: ['Concurrency', 'High Throughput', 'Microservices']
  },
  {
    name: 'Java & Spring Ecosystem',
    category: 'backend',
    icon: '☕',
    experience: 'Enterprise Deep',
    description: 'Enterprise-grade backend services, asynchronous processing, and robust cryptographic implementations.',
    tags: ['Enterprise', 'Spring', 'JVM', 'Security']
  },
  {
    name: 'TypeScript & Node.js',
    category: 'backend',
    icon: '⚡',
    experience: 'Full-Stack',
    description: 'Type-safe service implementations, rapid tooling, API gateways, and web application architectures.',
    tags: ['Modern JS', 'Async/Await', 'REST', 'Tooling']
  },
  {
    name: 'Python',
    category: 'backend',
    icon: '🐍',
    experience: 'Scripting & Tools',
    description: 'Automation scripts, cloud data processing, security testing harnesses, and rapid validation tools.',
    tags: ['Automation', 'CLI Tools', 'Testing']
  },
  {
    name: 'REST & GraphQL APIs',
    category: 'backend',
    icon: '🌐',
    experience: 'Architectural',
    description: 'Contract-first API design, rate-limiting, authentication filters, and documentation for public & internal consumption.',
    tags: ['OpenAPI', 'API Design', 'Contracts']
  },

  // Data & Scale
  {
    name: 'Large-Scale Data Migrations',
    category: 'data',
    icon: '🚀',
    experience: 'Millions of Users',
    description: 'Architecting zero-downtime, fault-tolerant customer identity migrations transferring millions of records with data integrity verification.',
    tags: ['High Scale', 'Zero Downtime', 'ETL', 'Validation']
  },
  {
    name: 'PostgreSQL & Relational DBs',
    category: 'data',
    icon: '🐘',
    experience: 'Production Core',
    description: 'Schema modeling, ACID transaction safety, indexing strategies, and connection pooling for high-throughput SaaS.',
    tags: ['SQL', 'Transactions', 'Query Optimization']
  },
  {
    name: 'Redis & Distributed Caching',
    category: 'data',
    icon: '⚡',
    experience: 'High Speed',
    description: 'Token caching, distributed session state, rate limiting keys, and pub/sub event distribution.',
    tags: ['In-Memory', 'Session State', 'Performance']
  }
];

function initTechnologiesPanel() {
  const cardsGrid = document.getElementById('tech-cards-grid');
  const tabs = document.querySelectorAll('.tech-tab');
  const searchInput = document.getElementById('tech-search-input');
  const clearBtn = document.getElementById('tech-clear-btn');
  const allCountEl = document.getElementById('all-count');

  if (allCountEl) {
    allCountEl.textContent = TECHNOLOGIES_DATA.length;
  }

  let activeCategory = 'all';
  let searchQuery = '';

  function renderTechnologies() {
    if (!cardsGrid) return;

    const filtered = TECHNOLOGIES_DATA.filter(tech => {
      const matchesCategory = activeCategory === 'all' || tech.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        tech.name.toLowerCase().includes(q) ||
        tech.description.toLowerCase().includes(q) ||
        tech.tags.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      cardsGrid.innerHTML = `
        <div class="tech-empty-state">
          <h3>No technologies found</h3>
          <p>No results matching "${escapeHtml(searchQuery)}" in this category. Try adjusting your search query or switching categories.</p>
        </div>
      `;
      return;
    }

    cardsGrid.innerHTML = filtered.map(tech => `
      <article class="tech-card" data-category="${tech.category}">
        <div class="tech-card-header">
          <div class="tech-icon-box" aria-hidden="true">${tech.icon}</div>
          <span class="tech-category-pill">${formatCategoryName(tech.category)}</span>
        </div>
        <h3 class="tech-name">${escapeHtml(tech.name)}</h3>
        <p class="tech-desc">${escapeHtml(tech.description)}</p>
        <div class="tech-footer">
          <span class="tech-experience-pill">${escapeHtml(tech.experience)}</span>
          <div class="tech-tags-list">
            ${tech.tags.slice(0, 3).map(tag => `<span class="tech-tag-chip">${escapeHtml(tag)}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');
  }

  // Category Tab Clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeCategory = tab.getAttribute('data-category');
      renderTechnologies();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = searchQuery ? 'block' : 'none';
      }
      renderTechnologies();
    });
  }

  // Clear Search Button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearBtn.style.display = 'none';
      renderTechnologies();
      if (searchInput) searchInput.focus();
    });
  }

  // Initial render
  renderTechnologies();
}

function formatCategoryName(cat) {
  switch (cat) {
    case 'security': return 'Security & IAM';
    case 'cloud': return 'Cloud & DevOps';
    case 'backend': return 'Backend';
    case 'data': return 'Data & Scale';
    default: return cat;
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* ==========================================================================
   3. Theme Toggle (Modern Web Guidance Standard)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const metaColorScheme = document.querySelector('meta[name="color-scheme"]');

  if (!toggleBtn || !metaColorScheme) return;

  function getCurrentTheme() {
    const metaContent = metaColorScheme.content;
    if (metaContent === 'light' || metaContent === 'dark') {
      return metaContent;
    }
    // Check OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  toggleBtn.addEventListener('click', () => {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';

    metaColorScheme.content = next;
    try {
      localStorage.setItem('color-scheme', next);
    } catch (e) {}
  });

  // Keep in sync across tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'color-scheme') {
      metaColorScheme.content = e.newValue ?? 'light dark';
    }
  });
}

/* ==========================================================================
   4. Mobile Menu Navigation
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   5. Smooth Scroll & Active Nav Spy
   ========================================================================== */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}
