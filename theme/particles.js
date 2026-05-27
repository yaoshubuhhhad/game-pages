/* 香灰粒子 —— 极淡、极慢、像空气活着 */
(function() {
  var canvas = document.createElement('canvas');
  canvas.id = 'theme-particles';
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;';
  document.body.prepend(canvas);

  var ctx = canvas.getContext('2d');
  var particles = [];
  var COUNT = 55;
  var w, h;
  var running = true;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function createParticle() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,         // 0.4 ~ 1.9px（更小）
      vx: (Math.random() - 0.5) * 0.2,      // 更明显的水平漂移
      vy: -(Math.random() * 0.18 + 0.03),   // 更慢的上升
      opacity: Math.random() * 0.05 + 0.015, // 0.015 ~ 0.065（更淡）
      hue: Math.random() < 0.3 ? 35 : (Math.random() < 0.5 ? 40 : 20), // 暖金/琥珀/微红
      life: Math.random() * 600 + 200,       // 当前帧寿命
      maxLife: Math.random() * 600 + 200
    };
  }

  for (var i = 0; i < COUNT; i++) {
    var p = createParticle();
    p.life = Math.random() * p.maxLife; // 初始分散在不同生命阶段
    particles.push(p);
  }

  function draw() {
    if (!running) { requestAnimationFrame(draw); return; }
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // 微弱的随机扰动
      p.vx += (Math.random() - 0.5) * 0.006;
      p.vy += (Math.random() - 0.5) * 0.006;
      // 限制速度范围
      p.vx = Math.max(-0.25, Math.min(0.25, p.vx));
      p.vy = Math.max(-0.25, Math.min(0.05, p.vy));

      // 生命周期
      p.life--;
      if (p.life <= 0 || p.y < -20 || p.x < -20 || p.x > w + 20) {
        var fresh = createParticle();
        fresh.y = h + 10; // 从底部重新升起
        fresh.life = fresh.maxLife;
        particles[i] = fresh;
        p = fresh;
      }

      // 渲染 —— 极淡的暖色光点
      var alpha = p.opacity * (p.life / p.maxLife);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ', 40%, 70%, ' + alpha.toFixed(3) + ')';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  draw();

  /* 公开 API —— 仪式页面可调用 */
  window.themeParticles = {
    pause: function() { running = false; },
    resume: function() { running = true; },
    get running() { return running; }
  };
})();
