import React, { useState, useEffect, useRef } from 'react';
import TechStack from './components/TechStack';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

const App = () => {
  const [isProfessionalMode, setIsProfessionalMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  /* ── Interactive Canvas Particle Background ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let W = canvas.width;
    let H = canvas.height;

    class Particle {
      constructor() { this.reset(); }
      reset() {
        W = canvas.width; H = canvas.height;
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.r = Math.random() * 1.6 + 0.8;
        this.baseOp = Math.random() * 0.35 + 0.12;
        this.op = this.baseOp;
      }
      update(mx, my, hovered) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
        if (hovered && mx !== null) {
          const dx = mx - this.x, dy = my - this.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const R = 170;
          if (d < R) {
            const f = (R - d) / R;
            this.x += (dx / d) * f * 0.9;
            this.y += (dy / d) * f * 0.9;
            this.op = Math.min(1, this.baseOp + f * 0.65);
          } else if (this.op > this.baseOp) {
            this.op -= 0.012;
          }
        } else if (this.op > this.baseOp) {
          this.op -= 0.012;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${this.op})`;
        ctx.fill();
      }
    }

    const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 14000));
    const pts = Array.from({ length: count }, () => new Particle());

    let mouse = { x: null, y: null, on: false };

    const onMove = e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onEnter = () => { mouse.on = true; };
    const onLeave = () => { mouse.on = false; mouse.x = null; mouse.y = null; };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseenter', onEnter);
    canvas.addEventListener('mouseleave', onLeave);

    const loop = () => {
      W = canvas.width; H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      pts.forEach(p => { p.update(mouse.x, mouse.y, mouse.on); p.draw(); });

      /* constellation lines */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(212,175,55,${((115 - d) / 115) * 0.14})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      /* cursor web */
      if (mouse.on && mouse.x !== null) {
        pts.forEach(p => {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 135) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(212,175,55,${((135 - d) / 135) * 0.3})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        });
      }

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseenter', onEnter);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* ── 3D Parallax Tilt ── */
  const handleMouseMove = e => {
    if (window.innerWidth < 900) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -yPct * 10, y: xPct * 10 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const scrollTo = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* Theme toggle (dark / light) */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) {
        setIsDarkTheme(saved === 'dark');
        document.documentElement.setAttribute('data-theme', saved);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDarkTheme(true);
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        setIsDarkTheme(true);
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch (err) {
      // ignore localStorage errors
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDarkTheme;
    setIsDarkTheme(next);
    const themeName = next ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeName);
    try { localStorage.setItem('theme', themeName); } catch (e) { }
  };

  /* ── Toggle slider width tracking ── */
  const toggleRef = useRef(null);
  const [sliderW, setSliderW] = useState(0);
  const [sliderL, setSliderL] = useState('0.3rem');

  useEffect(() => {
    const el = toggleRef.current;
    if (!el) return;
    const btns = el.querySelectorAll('.toggle-btn');
    if (btns.length === 2) setSliderW(btns[0].offsetWidth);
  }, []);

  useEffect(() => {
    const el = toggleRef.current;
    if (!el) return;
    const btns = el.querySelectorAll('.toggle-btn');
    if (btns.length !== 2) return;
    const w = btns[0].offsetWidth;
    setSliderW(w);
    setSliderL(isProfessionalMode ? `calc(0.3rem + ${w}px)` : '0.3rem');
  }, [isProfessionalMode]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

      {/* ── Canvas 3D Background ── */}
      <canvas ref={canvasRef} className="canvas-bg" />

      {/* ── Ambient Glow Orbs ── */}
      <div className="ambient-glow">
        <div className="glow-orb orb-1" />
        <div className="glow-orb orb-2" />
      </div>

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <nav className="glass-nav">
        <div className="nav-container">
          <a href="#" className="logo" onClick={e => scrollTo(e, 'home')}>
            Ayush<span>Singh</span>
          </a>



          <button
            className={`hamburger${mobileMenuOpen ? ' active' : ''}`}
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>

          <ul className={`nav-menu${mobileMenuOpen ? ' active' : ''}`}>
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="nav-link" onClick={e => scrollTo(e, item.toLowerCase())}>
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/Ayush Singh resume---.pdf"
                

                rel="noopener noreferrer"
                className="btn-gold-outline"
              >
                Resume
              </a>
            </li>
            <li className="theme-menu-item">
              <button
                type="button"
                className="theme-toggle mobile"
                onClick={toggleTheme}
                aria-label={isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkTheme ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section
        id='home'
        className="hero-section"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={containerRef}
          className="hero-wrapper"
          style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >

          {/* ── LEFT COLUMN ── */}
          <div className="hero-left">

            {/* Greeting Badge */}
            <div className="hello-badge">
              <span>Hello, I'm Ayush Singh</span>
            </div>

            {/* Profile Focus Toggle */}
            <div className="toggle-container" ref={toggleRef}>
              <div
                className="toggle-slider"
                style={{
                  width: sliderW || 'calc(50% - 0.3rem)',
                  left: sliderL,
                }}
              />
              <button
                className={`toggle-btn${!isProfessionalMode ? ' active' : ''}`}
                onClick={() => setIsProfessionalMode(false)}
              >
                Creative Focus
              </button>
              <button
                className={`toggle-btn${isProfessionalMode ? ' active' : ''}`}
                onClick={() => setIsProfessionalMode(true)}
              >
                Professional
              </button>
            </div>

            {/* Headlines */}
            <div className="hero-headline-box">
              <h1 className={`hero-title${!isProfessionalMode ? ' active' : ''}`}>
                <span className="title-gradient">Frontend Developer &amp;</span>
                <span className="classic-serif-span">MERN Stack Enthusiast</span>
              </h1>
              <h1 className={`hero-title${isProfessionalMode ? ' active' : ''}`}>
                <span className="title-gradient">Building Modern Web</span>
                <span className="title-gradient">Experiences with <span className="classic-serif-span">React &amp; MERN</span></span>
              </h1>
            </div>

            {/* Descriptions */}
            <div className="hero-desc-box">
              <p className={`hero-description${!isProfessionalMode ? ' active' : ''}`}>
                I build modern, responsive, and user-friendly web applications using{' '}
                <span className="text-gold-highlight">React, JavaScript, Tailwind CSS, Node.js, Express.js, and MongoDB</span>.
                I am passionate about creating <span className="text-gold-highlight">clean user experiences</span> and
                continuously improving my skills through real-world projects.
              </p>
              <p className={`hero-description${isProfessionalMode ? ' active' : ''}`}>
                I'm Ayush Singh, a passionate web developer focused on creating{' '}
                <span className="text-gold-highlight">fast, scalable, and visually appealing web applications</span>.
                My goal is to turn ideas into <span className="text-gold-highlight">impactful digital experiences</span> while
                continuously learning new technologies and best practices.
              </p>
            </div>

            {/* CTAs */}
            <div className="hero-actions">
              {/* Creative buttons */}
              <div className={`action-group${!isProfessionalMode ? ' active' : ''}`}>
                <a href="#projects" className="btn-primary" onClick={e => scrollTo(e, 'projects')}>
                  View Projects
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <a
href="/Ayush Singh resume---.pdf"
                  download="Ayush_Singh_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  onClick={(e) => e.stopPropagation()}
                >
                  Download Resume
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </a>
              </div>

              {/* Professional buttons */}
              <div className={`action-group${isProfessionalMode ? ' active' : ''}`}>
                <a href="#contact" className="btn-primary" onClick={e => scrollTo(e, 'contact')}>
                  Hire Me
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3a9.05 9.05 0 0 1-2.25-.223 2.076 2.076 0 0 1-1.5-2.01V10.61c0-.97.616-1.813 1.5-2.097m0 0A9.024 9.024 0 0 1 12 8.25c-1.636 0-3.173.432-4.5 1.189" />
                  </svg>
                </a>
                <a href="#projects" className="btn-secondary" onClick={e => scrollTo(e, 'projects')}>
                  Explore My Work
                  <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-3.948-2.22m3.948 2.22-1.5 6.16" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="hero-footer">
              <span className="social-title">Connect</span>
              <div className="social-links">
                <a href="https://github.com/ayushthakur988989" target="_blank" rel="noopener noreferrer" className="social-btn" title="GitHub">
                  <svg className="social-icon" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/ayush-singh-7b0bb3313" target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn">
                  <svg className="social-icon" viewBox="0 0 24 24">
                    <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
                  </svg>
                </a>
                <a href="https://mail.google.com/mail/u/0/?hl=en#inbox?compose=CllgCJlJWKwZHjnFPLjcStZFcbGsLpwLPGRMXBhJsGpzgdJcCHPGXNTMjwHwMcchVRzLpZZjbQq" className="social-btn" title="Email">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="hero-right">

            {/* Profile Image Card */}
            <div className="profile-card">
              <div className="card-glow" />

              {/* Animated rotating gold ring */}
              <div className="profile-ring" />

              {/* Available badge inside card */}
              <div className="profile-status-badge">
                <span className="status-dot-green" />
                Available for Hire
              </div>

              {/* The actual photo */}
              <div className="profile-img-wrapper">
                <img
                  src="/profile.jpeg"
                  alt="Ayush Singh - Frontend & MERN Stack Developer"
                  className="profile-img"
                  draggable={false}
                />
              </div>

              {/* Name + title strip */}
              <div className="profile-name-strip">
                <p className="profile-name">Ayush Singh</p>
                <p className="profile-role">Frontend &amp; MERN Developer</p>
              </div>

              {/* Tech stack chips */}
              <div className="tech-chips">
                {['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Tailwind'].map(t => (
                  <span key={t} className="tech-chip">{t}</span>
                ))}
              </div>
            </div>

            {/* Floating experience badge */}
            <div className="floating-blob blob-2">
              <span style={{ width: 8, height: 8, background: 'var(--accent-gold)', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
              1+ Year Experience
            </div>

          </div>
        </div>
      </section>

      <TechStack />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
};

export default App;