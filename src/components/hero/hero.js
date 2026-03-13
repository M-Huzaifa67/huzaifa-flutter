// ── src/components/hero/hero.js ──
// Renders social links and initializes Three.js background.

const HeroComponent = {
  init() {
    this.renderSocialLinks();
    this.initThreeJS();
  },

  renderSocialLinks() {
    if (typeof SOCIALS === 'undefined') return;
    const containers = ['social-links-container', 'footer-socials'];
    containers.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = SOCIALS.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}"
           class="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-400 hover:border-brand-400/40 transition-all duration-300 hover:-translate-y-0.5">
          ${s.icon}
        </a>
      `).join('');
    });
  },

  initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Particle system
    const count    = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const sizes     = new Float32Array(count);

    const color1 = new THREE.Color(0x09de8e);
    const color2 = new THREE.Color(0x33f5ac);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const mix = Math.random();
      const c   = color1.clone().lerp(color2, mix);
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size:           0.3,
      vertexColors:   true,
      transparent:    true,
      opacity:        0.7,
      sizeAttenuation: true,
      blending:       THREE.AdditiveBlending,
      depthWrite:     false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle connecting lines
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    for (let i = 0; i < 80; i++) {
      linePositions.push(
        (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40
      );
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x09de8e, transparent: true, opacity: 0.04 });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    });

    let frame = 0;
    function animate() {
      requestAnimationFrame(animate);
      frame += 0.003;

      particles.rotation.y  = frame * 0.08 + mouseX;
      particles.rotation.x  = frame * 0.03 + mouseY;
      camera.position.x    += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y    += (-mouseY * 3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
};
