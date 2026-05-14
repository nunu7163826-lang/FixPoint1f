// Doar animații vizuale. Niciun buton/link nu are acțiune reală.

document.addEventListener('DOMContentLoaded', () => {
  const revealItems = document.querySelectorAll('.topbar, .hero-content, .features');
  revealItems.forEach((el) => el.classList.add('reveal'));

  const hero = document.querySelector('.hero');
  const topbar = document.querySelector('.topbar');
  const content = document.querySelector('.hero-content');
  const features = document.querySelector('.features');
  const modeBtns = document.querySelectorAll('.switch-pill span');
  const navHome = document.querySelector('[data-nav="home"]');
  const navServices = document.querySelector('[data-nav="services"]');

  const titleEl = document.getElementById('hero-title');
  const textEl = document.getElementById('hero-text');
  const ctaEl = document.getElementById('hero-cta');
  const proofEl = document.getElementById('social-proof-text');
  const featureList = document.getElementById('features-list');

  const views = {
    home: {
      background: "linear-gradient(to right, rgba(2,10,18,.88) 0%, rgba(3,11,19,.68) 36%, rgba(4,12,20,.36) 64%, rgba(5,13,21,.18) 100%), url('assets/Fundal.png')",
      title: 'Găsește ajutor de<br>încredere, oriunde<br>în <span>Moldova.</span>',
      text: 'FixPoint te conectează cu profesioniști locali pregătiți să te ajute rapid și eficient.<br>De la reparații casnice până la servicii specializate – totul într-un singur loc.',
      cta: 'ÎNCEPE ACUM',
      proof: 'Peste 1000+ clienți mulțumiți',
      features: [
        ['assets/energ.png', 'Rapid', 'Răspuns în cel mai<br>scurt timp.'],
        ['assets/scut.png', 'De încredere', 'Profesioniști verificați<br>și rating real.'],
        ['assets/loc.png', 'Local', 'Orice servicii<br>aproape de tine.'],
        ['assets/supp.png', 'Suport dedicat', 'Suntem aici ca sa<br>te ajutam 24/7.']
      ]
    },
    offer: {
      background: "linear-gradient(to right, rgba(2,10,18,.88) 0%, rgba(3,11,19,.68) 36%, rgba(4,12,20,.36) 64%, rgba(5,13,21,.18) 100%), url('assets/Fundal2.png')",
      title: 'Transformă-ți abilitățile<br>în <span>clienți reali.</span>',
      text: 'FixPoint îți oferă posibilitatea să găsești clienți rapid,<br>să îți construiești reputația și să câștigi bani<br>oferind servicii locale în Moldova.',
      cta: 'DEVINO PARTENER',
      proof: 'Peste 500+ profesioniști activi',
      features: [
        ['assets/lume.png', 'Clienți constanți', 'Primești cereri de servicii<br>direct de la utilizatori interesați.'],
        ['assets/rep.png', 'Reputație și încredere', 'Construiește un profil<br>profesional cu review-uri și rating real.'],
        ['assets/venit.png', 'Venituri mai mari', 'Lucrezi mai mult, câștigi<br>mai bine și îți crești afacerea.'],
        ['assets/timp.png', 'Flexibilitate totală', 'Tu alegi când, unde și<br>cât lucrezi. Ești propriul tău șef.']
      ]
    }
  };

  const animateSwap = (nextView) => {
    [topbar, content, features].forEach((el) => {
      el.classList.remove('reveal');
      el.classList.add('fade-out');
    });

    setTimeout(() => {
      hero.style.backgroundImage = views[nextView].background;
      titleEl.innerHTML = views[nextView].title;
      textEl.innerHTML = views[nextView].text;
      ctaEl.textContent = views[nextView].cta;
      proofEl.textContent = views[nextView].proof;

      featureList.querySelectorAll('article').forEach((article, i) => {
        const [icon, title, desc] = views[nextView].features[i];
        article.querySelector('img').src = icon;
        article.querySelector('h3').textContent = title;
        article.querySelector('p').innerHTML = desc;
      });

      modeBtns.forEach((btn) => btn.classList.remove('on'));
      document.querySelector(`[data-mode="${nextView}"]`)?.classList.add('on');

      navHome?.classList.toggle('active', nextView === 'home');
      navServices?.classList.toggle('active', nextView === 'offer');

      [topbar, content, features].forEach((el) => {
        el.classList.remove('fade-out');
        void el.offsetWidth;
        el.classList.add('reveal');
      });
    }, 380);
  };

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const mode = btn.dataset.mode;
      animateSwap(mode === 'offer' ? 'offer' : 'home');
    });
  });

  // Blochează orice altă acțiune pe butoane și link-uri momentan.
  document.querySelectorAll('button, a').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (!el.closest('.switch-pill')) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });

  // Efect cinematic: parallax foarte fin după mișcarea mouse-ului.
  if (hero && topbar && content && features) {
    hero.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = hero.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      topbar.style.transform = `translate3d(${x * 6}px, ${y * 4}px, 0)`;
      content.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
      features.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0)`;
    });

    hero.addEventListener('mouseleave', () => {
      topbar.style.transform = 'translate3d(0, 0, 0)';
      content.style.transform = 'translate3d(0, 0, 0)';
      features.style.transform = 'translate3d(0, 0, 0)';
    });
  }
});
