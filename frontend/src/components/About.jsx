import React, { useState, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const About = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const photoCardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = photoCardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    // Tilts up to 15 degrees
    setTilt({ x: -yPct * 15, y: xPct * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const skillsList = [
    { name: 'HTML5', color: '#e34c26' },
    { name: 'CSS3', color: '#264de4' },
    { name: 'JavaScript', color: '#f7df1e' },
    { name: 'React', color: '#61dafb' },
    { name: 'Node.js', color: '#339933' },
    { name: 'MongoDB', color: '#47a248' }
  ];

  return (
    <section
  id="about"
  className="relative w-full pb-32 pr-6 pl-1 md:px-12 max-w-[1200px] mx-auto z-10 [perspective:1000px]"
>
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column: Profile image with 3D Parallax Gold Backdrop */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div
              ref={photoCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s ease-out'
              }}
              className="relative w-full max-w-[360px] aspect-[4/5] rounded-[24px] cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              {/* Glowing Background Backdrop - Gold/Green glow */}
              <div
                style={{ transform: 'translateZ(-20px)' }}
                className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-gold)] to-[var(--accent-gold-dark)] rounded-[24px] opacity-80 group-hover:scale-105 group-hover:opacity-20 transition-all duration-500 shadow-[0_0_40px_rgba(12,195,91,0.4)]"
              ></div>

              {/* The Actual Photo Layer */}
              <div
                style={{ transform: 'translateZ(10px)' }}
                className="absolute inset-2 bg-[var(--bg-secondary)] rounded-[20px] overflow-hidden border border-white/5 shadow-inner"
              >
                <img
                  src="/profile.jpeg"
                  alt="Ayush Singh"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Decorative 3D elements inside card */}
              <div
                style={{ transform: 'translateZ(30px)' }}
                className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-md px-4 py-2 border border-white/10 rounded-xl text-xs font-semibold text-[var(--accent-gold)]"
              >
                
              </div>
            </div>
          </div>

          {/* Right Column: About Me Details */}
<div className="about-right-content lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[var(--accent-gold)] font-bold text-sm uppercase tracking-widest">
                <span>▶</span> About me
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-wide">
                Who Am I
              </h2>
            </div>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Hi, I'm <strong className="text-[var(--text-primary)]">Ayush Singh</strong>, a BCA student at Kumaun University and an aspiring Full Stack Developer.
            </p>
            <p className="text-md text-[var(--text-secondary)] leading-relaxed">
              I enjoy building responsive, modern web applications using React, Node.js, Express, and MongoDB. I have worked on various projects that helped me strengthen my frontend and backend development skills. My goal is to join a professional development team where I can contribute, learn from experienced developers, and grow into a skilled software engineer.
            </p>

            {/* Skill tags like the Behance screenshot */}
            <div className="flex flex-wrap gap-3 my-4">
              {skillsList.map((skill, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                  className="flex items-center gap-2.5 px-4 py-2 border rounded-xl hover:border-[#0cc35b] transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }}></span>
                  <span className="text-xs font-bold text-[var(--text-primary)] tracking-wide uppercase">{skill.name}</span>
                </div>
              ))}
            </div>

            {/* CTA Download Resume / CV Button */}
            <div className="mt-2">
              <a
                href="/resume.pdf"
                download="Ayush_Singh_Resume.pdf"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-dark)] hover:from-[#0cc35b] hover:to-[#0cc35b] text-black font-extrabold text-sm uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_8px_25px_rgba(12,195,91,0.25)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(12,195,91,0.35)]"
              >
                Download CV
              </a>
            </div>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
};

export default About;
