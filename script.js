/* ============================================
   wRise Personal Website - Scripts
   i18n, Navigation, Animations
   ============================================ */

// --- i18n Data ---
const i18n = {
  en: {
    logo: 'wRise',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.learning': 'Skills',
    'nav.contact': 'Contact',
    'hero.greeting': 'Hi, my name is',
    'hero.tagline': '啥也不是',
    'hero.desc': 'MSc Data Science & AI student at Eindhoven University of Technology (TU/e), Class of 2026',
    'hero.cta': 'Learn more about me',
    'about.title': 'About Me',
    'about.p1': 'I\'m a Data Science & AI master\'s student at Eindhoven University of Technology (TU/e), starting in 2026. Passionate about machine learning, deep learning, and building intelligent systems.',
    'about.p2': 'Currently exploring the intersection of AI agents, computer vision, and large language models. I enjoy turning complex data into actionable insights and building things that work.',
    'about.p3': 'When I\'m not coding, you can find me reading papers, tinkering with new frameworks, or contributing to open-source projects.',
    'about.tagline': '— 啥也不是',
    'about.photo': 'Your Photo',
    'projects.title': 'Projects',
    'projects.project1.title': 'Coming Soon',
    'projects.project1.desc': 'Projects in progress — check back soon, or visit my GitHub for the latest work.',
    'projects.project2.title': 'Data Science Exploration',
    'projects.project2.desc': 'Exploring data analysis, visualization, and machine learning experiments. More projects coming as I progress through my master\'s.',
    'projects.more': 'More projects on my GitHub',
    'projects.viewAll': 'View GitHub Profile',
    'learning.title': 'Skills',
    'learning.cat1': 'Programming Languages',
    'learning.cat2': 'AI & Machine Learning',
    'learning.cat3': 'Data Science',
    'learning.cat4': 'Tools & Platforms',
    'contact.title': 'Contact',
    'contact.intro': 'Feel free to reach out — I\'m always open to new opportunities and collaborations.',
    'footer.text': 'Designed & Built by wRise',
  },
  zh: {
    logo: 'wRise',
    'nav.about': '关于',
    'nav.projects': '项目',
    'nav.learning': '技能',
    'nav.contact': '联系',
    'hero.greeting': '你好，我是',
    'hero.tagline': '啥也不是',
    'hero.desc': '埃因霍温理工大学 2026级 数据科学与人工智能 硕士生',
    'hero.cta': '了解更多',
    'about.title': '关于我',
    'about.p1': '我是埃因霍温理工大学（TU/e）2026级数据科学与人工智能硕士生，热衷于机器学习、深度学习以及构建智能系统。',
    'about.p2': '目前正在探索 AI Agent、计算机视觉和大语言模型的交叉领域。我喜欢将复杂数据转化为可操作的洞察，并构建真正有用的东西。',
    'about.p3': '不写代码的时候，我会读论文、折腾新框架，或者参与开源项目。',
    'about.tagline': '— 啥也不是',
    'about.photo': '你的照片',
    'projects.title': '项目',
    'projects.project1.title': '敬请期待',
    'projects.project1.desc': '项目进行中 — 敬请期待，或访问我的 GitHub 查看最新动态。',
    'projects.project2.title': '数据科学探索',
    'projects.project2.desc': '数据分析、可视化与机器学习实验。随着硕士学习的深入，会有更多项目上线。',
    'projects.more': '更多项目在 GitHub 上',
    'projects.viewAll': '查看 GitHub 主页',
    'learning.title': '技能',
    'learning.cat1': '编程语言',
    'learning.cat2': '人工智能与机器学习',
    'learning.cat3': '数据科学',
    'learning.cat4': '工具与平台',
    'contact.title': '联系',
    'contact.intro': '欢迎随时联系 — 我始终对新机会和合作保持开放态度。',
    'footer.text': '由 wRise 设计与构建',
  },
};

// --- State ---
let currentLang = localStorage.getItem('lang') || 'en';

// --- Apply Language ---
function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });

  // Update lang toggle buttons
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    const options = btn.querySelectorAll('.lang-option');
    options.forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });
  });

  // Update html lang attribute
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

// --- Lang Toggle Handlers ---
function setupLangToggles() {
  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.closest('.lang-option');
      if (!target) return;
      const lang = target.getAttribute('data-lang');
      if (lang && lang !== currentLang) {
        applyLanguage(lang);
      }
    });
  });
}

// --- Navigation ---
function setupNav() {
  const nav = document.getElementById('nav');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a[href^="#"]');

  // Scroll handler: nav background + active section
  function onScroll() {
    // Nav background
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active section
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// --- Scroll Reveal ---
function setupReveal() {
  const revealElements = document.querySelectorAll(
    '.section-title, .about-grid, .project-card, .skill-category, .contact-links, .contact-intro'
  );

  revealElements.forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  setupLangToggles();
  setupNav();
  setupReveal();
});