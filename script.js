
  const toggleBtn = document.getElementById('themeToggle');
  const canvas = document.getElementById('starCanvas') || (() => {
    const c = document.createElement('canvas');
    c.id = 'starCanvas';
    document.body.insertBefore(c, document.body.firstChild);
    return c;
  })();
  const ctx = canvas.getContext('2d');
  let darkMode = false;
  let stars = [];

  // Resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);

  // Create stars
  function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        d: Math.random() * 0.5 + 0.2
      });
    }
  }

  // Animate stars
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    for (let star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
      star.y += star.d;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    }
    if (darkMode) requestAnimationFrame(drawStars);
  }

  function toggleStars(enable) {
    if (enable) {
      canvas.style.display = 'block';
      resizeCanvas();
      createStars(120);
      drawStars();
    } else {
      canvas.style.display = 'none';
    }
  }

  // Theme toggle
  toggleBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    toggleBtn.textContent = darkMode ? '☀️' : '🌙';
    toggleStars(darkMode);
  });

  // Boot screen
  const bootScreen = document.getElementById('bootScreen');
  if (!localStorage.getItem('hasBooted')) {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      bootScreen.style.opacity = '0';
      setTimeout(() => {
        bootScreen.style.display = 'none';
        document.body.style.overflow = '';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
          darkMode = true;
          toggleStars(true);
        }
      }, 1000);
      localStorage.setItem('hasBooted', 'true');
    }, 6000);
  } else {
    bootScreen.style.display = 'none';
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      darkMode = true;
      toggleStars(true);
    }
  }
