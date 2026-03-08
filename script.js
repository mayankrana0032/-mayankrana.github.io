
const WEB3FORMS_KEY    = '924ab787-7874-4bce-99a7-f5885eb1cdc3';
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzDpeSJAP7IMHJxWID5tH7sweUd4RqeQhTLDyZUPJDfvU9bXFX8aE_FhFx0eGpgMWhmDg/exec';

const roles = [
  'MERN Stack Developer',
  'Data Science Enthusiast',
  '3rd Year CS Student',
  'EduTech Builder',
  'Problem Solver'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const el = document.getElementById('typed');
  if (!el) return;
  const current = roles[roleIndex];
  if (!isDeleting) {
    el.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    el.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 55 : 90);
}
typeEffect();

// ── Cursor Glow ───────────────────────────────────────────
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });
}

// ── Scroll Progress Bar ───────────────────────────────────
window.addEventListener('scroll', () => {
  const bar = document.getElementById('scrollBar');
  if (!bar) return;
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = pct + '%';
});

// ── Navbar Background on Scroll ───────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.style.background = window.scrollY > 50
    ? 'rgba(10,10,15,0.98)'
    : 'rgba(10,10,15,0.85)';
});

// ── Back to Top ───────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// ── Hamburger / Mobile Menu ───────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ── Fade-in on Scroll ─────────────────────────────────────
const fadeObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  }),
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ── Active Nav Link ───────────────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');
const sectionObs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  },
  { threshold: 0.45 }
);
sections.forEach(s => sectionObs.observe(s));

// ── Skill Filter Tabs ─────────────────────────────────────
document.querySelectorAll('.skill-tab[data-filter]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.skill-tab[data-filter]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    document.querySelectorAll('#skillsGrid .skill-card').forEach(card => {
      const show = f === 'all' || card.dataset.category === f;
      card.classList.toggle('hidden', !show);
      if (show) setTimeout(() => card.classList.add('visible'), 50);
    });
  });
});

// ── Project Filter Tabs ───────────────────────────────────
document.querySelectorAll('.skill-tab[data-proj]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.skill-tab[data-proj]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.proj;
    document.querySelectorAll('#projectsGrid .project-card').forEach(card => {
      card.classList.toggle('hidden', f !== 'all' && card.dataset.projCat !== f);
    });
  });
});

// ── Skill Bar Animation ───────────────────────────────────
const barObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting)
      e.target.querySelectorAll('.bar-fill').forEach(b => b.classList.add('animated'));
  }),
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-card').forEach(c => barObs.observe(c));

// ── Counter Animation ─────────────────────────────────────
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    document.querySelectorAll('.stat-item .num[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      let cur = 0;
      const step = Math.ceil(target / 40);
      const iv = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur + '+';
        if (cur >= target) clearInterval(iv);
      }, 35);
    });
    counterObs.disconnect();
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) counterObs.observe(statsEl);


const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', async () => {
    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const subject = document.getElementById('fsubject').value.trim();
    const message = document.getElementById('fmessage').value.trim();
    const msgBox  = document.getElementById('formMsg');
    const btnText = document.getElementById('btnText');
    const btnLoad = document.getElementById('btnLoader');

    // ── Show alert helper ──
    const showMsg = (html, type) => {
      msgBox.innerHTML = html;
      msgBox.className = `form-msg ${type}`;
      msgBox.style.display = 'block';
      msgBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    // ── Validate all fields ──
    if (!name) {
      showMsg('⚠️ Please enter your name.', 'error'); return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMsg('⚠️ Please enter a valid email address.', 'error'); return;
    }
    if (!subject) {
      showMsg('⚠️ Please enter a subject.', 'error'); return;
    }
    if (!message) {
      showMsg('⚠️ Please write a message.', 'error'); return;
    }

    // ── Loading state ──
    sendBtn.disabled      = true;
    btnText.style.display = 'none';
    btnLoad.style.display = 'inline';
    msgBox.style.display  = 'none';

    try {
      // ── 1. Send Email via Web3Forms ──
      const formData = new FormData();
      formData.append('access_key', WEB3FORMS_KEY);
      formData.append('name',       name);
      formData.append('email',      email);
      formData.append('subject',    'Portfolio Contact: ' + subject);
      formData.append('message',    message);
      formData.append('from_name',  'Mayank Rana Portfolio');
      formData.append('replyto',    email);

      const emailRes  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body:   formData
      });
      const emailData = await emailRes.json();

      if (!emailData.success) {
        throw new Error(emailData.message || 'Web3Forms failed');
      }

      // ── 2. Save to Google Sheets ──
      await fetch(GOOGLE_SHEET_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, subject, message })
      });

      // ── Success ──
      showMsg(
        `✅ <strong>Message sent successfully!</strong><br>
         Thanks <strong>${name}</strong>! I'll reply to <strong>${email}</strong> within 24 hours 🙌`,
        'success'
      );

      // ── Clear form fields ──
      ['fname', 'femail', 'fsubject', 'fmessage'].forEach(id => {
        document.getElementById(id).value = '';
      });

    } catch (err) {
      console.error('Form error:', err);
      showMsg(
        `❌ <strong>Failed to send.</strong><br>Please try again or email me at 
         <a href="mailto:mayankrana@email.com" style="color:var(--accent2)">mayankrana@email.com</a>`,
        'error'
      );
    } finally {
      sendBtn.disabled      = false;
      btnText.style.display = 'inline';
      btnLoad.style.display = 'none';
    }
  });
}