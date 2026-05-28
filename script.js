/* =============================================
   script.js – Portfolio interactions
   ============================================= */

(function () {
  'use strict';

  /* ── Dynamic Shared Global Header Loader ── */
  const headerContainer = document.getElementById('global-header-container');
  if (headerContainer) {
    // Ensure Google Fonts are loaded dynamically if not present in the HTML head
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Anton"]')) {
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect1);

      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect2);

      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Caveat:wght@400;700&family=Inter:wght@400;500;600;700&display=swap';
      document.head.appendChild(fontLink);
    }

    headerContainer.innerHTML = `
      <header class="global-header">
        <div class="global-logo">
          <a href="index.html">
            <img src="image/logo.png" alt="Nhat Phan Logo" class="logo-img" />
          </a>
        </div>
        
        <nav class="global-nav" aria-label="Main Navigation">
          <a href="work.html" class="nav-link" id="nav-work">Work</a>
          <a href="about.html" class="nav-link" id="nav-about">About</a>
          <a href="chipheo.html" class="nav-link" id="nav-chipheo">ChiPheoThiNo?</a>
          <a href="gallery.html" class="nav-link" id="nav-gallery">Gallery</a>
          <a href="cv.html" class="nav-link" id="nav-cv">CV</a>
        </nav>

        <div class="global-social">
          <a href="https://www.linkedin.com/in/nhatphan-mkt/" class="social-btn" id="linkedin-btn" aria-label="LinkedIn" target="_blank">
            <img src="image/linklin.png" alt="LinkedIn" />
          </a>
          <a href="mailto:phanvunhat1122@gmail.com" class="social-btn" id="gmail-btn" aria-label="Gmail" target="_blank">
            <img src="image/gmail.png" alt="Gmail" />
          </a>
        </div>
      </header>
    `;

    // Dynamically highlight active page based on URL location
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('work.html') || currentPath.includes('becam.html')) {
      const link = document.getElementById('nav-work');
      if (link) link.classList.add('active');
    } else if (currentPath.includes('chipheo.html')) {
      const link = document.getElementById('nav-chipheo');
      if (link) link.classList.add('active');
    } else if (currentPath.includes('about.html')) {
      const link = document.getElementById('nav-about');
      if (link) link.classList.add('active');
    } else if (currentPath.includes('gallery.html')) {
      const link = document.getElementById('nav-gallery');
      if (link) link.classList.add('active');
    } else if (currentPath.includes('cv.html')) {
      const link = document.getElementById('nav-cv');
      if (link) link.classList.add('active');
    }
  }

  /* ── Scroll-snap helper ── */
  const scrollDownBtn = document.getElementById('scroll-down-btn');
  const pageMenu = document.getElementById('page-menu');

  if (scrollDownBtn && pageMenu) {
    scrollDownBtn.addEventListener('click', () => {
      pageMenu.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ── IntersectionObserver: trigger page-2 animations on entry ── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Re-attach animations by resetting animation class
          restartMenuAnimations();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  if (pageMenu) observer.observe(pageMenu);

  function restartMenuAnimations() {
    const animated = pageMenu.querySelectorAll(
      '.menu-logo, .menu-social, .couple-wrapper, .cloud-bubble, .menu-item, .group-deco'
    );
    animated.forEach((el) => {
      // Force reflow to restart animation
      el.style.animationPlayState = 'paused';
      // eslint-disable-next-line no-unused-expressions
      void el.offsetWidth;
      el.style.animationPlayState = 'running';
    });
  }

  /* ── Hover wobble on menu icons ── */
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const icon = item.querySelector('.menu-icon');
      if (!icon) return;
      icon.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });

  /* ── Parallax-lite on Page 1 person image ── */
  const personWrapper = document.querySelector('.person-wrapper');
  const pageHero = document.getElementById('page-hero');

  if (personWrapper && pageHero) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroH = pageHero.offsetHeight;
          // Only apply within hero section
          if (scrollY < heroH) {
            const shift = scrollY * 0.18;
            personWrapper.style.transform = `translateX(-50%) translateY(${shift}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Automatic Stop-motion Handwriting Loop on Speech Bubble ── */
  const heroBubble = document.getElementById('hero-bubble');
  const bubbleImg = heroBubble ? heroBubble.querySelector('.speech-bubble-img') : null;
  if (heroBubble && bubbleImg) {
    let isVariant = false;
    let isHovered = false;

    // Alternates images & rotations automatically to create a continuous hand-drawn sketch loop
    setInterval(() => {
      isVariant = !isVariant;
      bubbleImg.src = isVariant ? 'image/Variant2.png' : 'image/Default.png';

      // Dynamic wiggle rotation (only when mouse is not hovering to let hover transitions work)
      if (!isHovered) {
        const wiggleAngle = isVariant ? '0.8deg' : '-0.8deg';
        heroBubble.style.transform = `rotate(${wiggleAngle})`;
      }
    }, 380); // 380ms is the sweet spot for handwriting stop-motion

    // Tactile pop-up on hover
    heroBubble.addEventListener('mouseenter', () => {
      isHovered = true;
      heroBubble.style.transform = 'scale(1.06) rotate(1.5deg)';
      heroBubble.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    heroBubble.addEventListener('mouseleave', () => {
      isHovered = false;
      heroBubble.style.transform = 'scale(1) rotate(0deg)';
      heroBubble.style.transition = 'transform 0.25s ease';
    });
  }

  /* ── Cloud bubble wiggle on hover ── */
  const cloudBubble = document.getElementById('menu-bubble');
  if (cloudBubble) {
    cloudBubble.addEventListener('mouseenter', () => {
      cloudBubble.style.transform = 'scale(1.04) rotate(1deg)';
      cloudBubble.style.transition = 'transform 0.3s ease';
    });
    cloudBubble.addEventListener('mouseleave', () => {
      cloudBubble.style.transform = 'scale(1) rotate(0deg)';
    });
  }

  /* ── Nav tag underline ripple ── */
  const navTags = document.querySelectorAll('.nav-tag');
  navTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      tag.style.transform = 'scale(0.92)';
      setTimeout(() => (tag.style.transform = ''), 150);
    });
  });

  /* ── 3-second Slideshow Loop for Couple Characters in Page 2 ── */
  const coupleImg = document.querySelector('.couple-wrapper .couple-img');
  if (coupleImg) {
    const coupleFrames = [
      'image/couple_center.png',
      'image/couple_center1.png',
      'image/couple_center2.png',
      'image/couple_center3.png',
      'image/couple_center4.png',
      'image/couple_center5.png',
      'image/couple_center6.png',
      'image/couple_center7.png',
      'image/couple_center8.png',
      'image/couple_center9.png',
      'image/couple_center10.png',
      'image/couple_center11.png'
    ];
    let currentFrame = 0;

    setInterval(() => {
      currentFrame = (currentFrame + 1) % coupleFrames.length;

      // Gentle stop-motion transition: scale pop on switch
      coupleImg.style.transform = 'scale(0.97)';
      coupleImg.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';

      setTimeout(() => {
        coupleImg.src = coupleFrames[currentFrame];
        coupleImg.style.transform = 'scale(1)';
      }, 150);
    }, 3000);
  }

  /* ── 3-second Slideshow Loop for Chi Pheo Polaroid Art ── */
  const polaroidImg = document.querySelector('.polaroid-card-img');
  if (polaroidImg) {
    const chipheoFrames = [
      'image/avt_chipheothino.png',
      'image/avt_chipheothino1.png',
      'image/avt_chipheothino2.png',
      'image/avt_chipheothino3.png',
      'image/avt_chipheothino4.png',
      'image/avt_chipheothino5.png',
      'image/avt_chipheothino6.png',
      'image/avt_chipheothino7.png',
      'image/avt_chipheothino8.png',
      'image/avt_chipheothino9.svg',
      'image/avt_chipheothino10.png',
      'image/avt_chipheothino11.png'
    ];
    let currentChiPheoFrame = 0;

    setInterval(() => {
      currentChiPheoFrame = (currentChiPheoFrame + 1) % chipheoFrames.length;

      // Gentle stop-motion transition: scale pop on switch
      polaroidImg.style.transform = 'scale(0.97)';
      polaroidImg.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';

      setTimeout(() => {
        polaroidImg.src = chipheoFrames[currentChiPheoFrame];
        polaroidImg.style.transform = 'scale(1)';
      }, 150);
    }, 3000);
  }

  /* ── Trum Sticker Hover Image Swap ── */
  const hoverStickers = document.querySelectorAll('.trum-sticker[data-hover]');
  hoverStickers.forEach(sticker => {
    sticker.addEventListener('mouseenter', () => {
      sticker.src = sticker.getAttribute('data-hover');
    });
    sticker.addEventListener('mouseleave', () => {
      sticker.src = sticker.getAttribute('data-default');
    });
  });

  /* ── Dynamic Scroll Reveal (Intersection Observer) ── */
  const revealSelectors = [
    '.work-item',
    '.column-title',
    '.becam-container > section',
    '.becam-container > .horizontal-scroll-container',
    '.becam-container > div',
    '.story-grid',
    '.about-title-wrapper',
    '.about-quote',
    '.about-desc',
    '.about-btn-wrapper',
    '.about-bottom-banner',
    '.cv-container',
    '.work-footer-deco'
  ];

  const elementsToReveal = document.querySelectorAll(revealSelectors.join(', '));
  
  if (elementsToReveal.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.05
      }
    );

    // Stagger delay for multiple work items in columns
    const columns = document.querySelectorAll('.work-column');
    columns.forEach((col) => {
      const items = col.querySelectorAll('.work-item');
      items.forEach((item, index) => {
        if (index > 0) {
          item.style.transitionDelay = `${index * 0.08}s`;
        }
      });
    });

    elementsToReveal.forEach((el) => {
      if (el.closest('.global-header')) return;

      el.classList.add('scroll-reveal');
      revealObserver.observe(el);
    });
  }

})();
