// ─── PRELOADER ───
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 900);
});

// ─── PARTICLES ───
(function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = (Math.random() * 3 + 1) + 'px';
        p.style.cssText = `
            width:${size}; height:${size};
            left:${Math.random()*100}%;
            animation-duration:${Math.random()*14+10}s;
            animation-delay:${Math.random()*10}s;
        `;
        container.appendChild(p);
    }
})();

// ─── TYPING ANIMATION ───
const roles = [
    'React Development',
    'Full-Stack Solutions',
    'Node.js Backend',
    'Firebase Integration',
    'SEO Optimization',
    'Custom Deployments'
];
let rIdx = 0, cIdx = 0, deleting = false;
const roleEl = document.getElementById('roleText');
function typeRole() {
    const cur = roles[rIdx];
    roleEl.textContent = deleting ? cur.slice(0, cIdx - 1) : cur.slice(0, cIdx + 1);
    deleting ? cIdx-- : cIdx++;
    if (!deleting && cIdx === cur.length) setTimeout(() => deleting = true, 2400);
    else if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
    setTimeout(typeRole, deleting ? 45 : 95);
}
setTimeout(typeRole, 800);

// ─── EMAIL VALIDATION ───
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── CONTACT FORM ───
async function handleSubmit() {
    const nameEl    = document.getElementById('contact-name');
    const emailEl   = document.getElementById('contact-email');
    const msgEl     = document.getElementById('contact-message');
    const btn       = document.getElementById('submit-btn');
    const statusEl  = document.getElementById('form-status');
    const emailErr  = document.getElementById('email-error');

    const name    = nameEl.value.trim();
    const email   = emailEl.value.trim();
    const message = msgEl.value.trim();

    // Reset errors
    [nameEl, emailEl, msgEl].forEach(el => el.classList.remove('error'));
    emailErr.style.display = 'none';
    statusEl.className = '';
    statusEl.style.display = 'none';

    // Validate
    let hasError = false;
    if (!name)    { nameEl.classList.add('error');  hasError = true; }
    if (!email)   { emailEl.classList.add('error'); hasError = true; }
    else if (!isValidEmail(email)) {
        emailEl.classList.add('error');
        emailErr.style.display = 'block';
        hasError = true;
    }
    if (!message) { msgEl.classList.add('error');  hasError = true; }
    if (hasError) return;

    // Send
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
        const res = await fetch('https://portfolio-five-snowy-85.vercel.app/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });
        const data = await res.json();

        if (data.success) {
            statusEl.className = 'success';
            statusEl.innerHTML = '✓ Message sent successfully! We\'ll be in touch within 24 hours.';
            nameEl.value = emailEl.value  = msgEl.value = '';
            btn.textContent = 'Message Sent ✓';
            setTimeout(() => {
                btn.textContent = 'Send Message';
                btn.disabled = false;
                statusEl.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('API returned failure');
        }
    } catch (err) {
        statusEl.className = 'error';
        statusEl.innerHTML = '✕ Something went wrong. Please try again or reach out on WhatsApp.';
        btn.textContent = 'Send Message';
        btn.disabled = false;
    }
}

// ─── NAVBAR SCROLL + ACTIVE LINKS ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    const sections = document.querySelectorAll('section, #stats');
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href').slice(1) === current);
    });
});

// ─── MOBILE MENU ───
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});
document.querySelectorAll('#navLinks a').forEach(a => {
    a.addEventListener('click', () => { navLinks.classList.remove('active'); hamburger.textContent = '☰'; });
});

// ─── SKILL BARS (INTERSECTION) ───
const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.width + '%';
            skillObs.unobserve(e.target);
        }
    });
}, { threshold: 0.4 });
document.querySelectorAll('.skill-progress').forEach(b => skillObs.observe(b));

// ─── SCROLL REVEAL ───
const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ─── LOGO SCROLL TO TOP ───
document.querySelector('.logo').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
