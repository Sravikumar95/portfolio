// ── MOBILE NAVIGATION TOGGLE ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-link');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a nav link is clicked
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// ── SCROLLSPY & ACTIVE NAV HIGHLIGHT ──
const trackedSections = document.querySelectorAll('header#hero, section');
const allNavLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let currentSectionId = '';
  const scrollPosition = window.scrollY + 140;

  trackedSections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPosition >= top && scrollPosition < top + height) {
      currentSectionId = section.getAttribute('id');
    }
  });

  allNavLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ── SCROLL-IN REVEAL ANIMATIONS ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.section-container').forEach(sec => {
  revealObserver.observe(sec);
});

// ── COPY TO CLIPBOARD & TOAST ──
function copyToClipboard(text, btnElement) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied "${text}" to clipboard!`);
      triggerCopyFeedback(btnElement);
    }).catch(() => {
      fallbackCopy(text, btnElement);
    });
  } else {
    fallbackCopy(text, btnElement);
  }
}

function fallbackCopy(text, btnElement) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied "${text}" to clipboard!`);
    triggerCopyFeedback(btnElement);
  } catch (err) {
    showToast('Failed to copy text');
  }
  document.body.removeChild(textArea);
}

function triggerCopyFeedback(btn) {
  if (!btn) return;
  const originalHtml = btn.innerHTML;
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:#22c55e;"><polyline points="20 6 9 17 4 12"/></svg>`;
  setTimeout(() => {
    btn.innerHTML = originalHtml;
  }, 2000);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ── NAVBAR SCROLLED STATE ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.borderBottomColor = 'rgba(59, 130, 246, 0.25)';
    navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
  } else {
    navbar.style.borderBottomColor = 'var(--border)';
    navbar.style.boxShadow = 'none';
  }
}, { passive: true });