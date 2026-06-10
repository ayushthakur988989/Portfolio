import React, { useRef, useEffect, useState } from 'react';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiExpress, SiMongodb } from 'react-icons/si';

const techs = [
  { name: 'HTML', caption: 'Page Structure', icon: <FaHtml5 className="text-orange-500 text-4xl" /> },
  { name: 'CSS', caption: 'Modern Styling', icon: <FaCss3Alt className="text-blue-500 text-4xl" /> },
  { name: 'JavaScript', caption: 'Dynamic Web Apps', icon: <SiJavascript className="text-yellow-400 text-4xl" /> },
  { name: 'React', caption: 'Interactive UI', icon: <FaReact className="text-cyan-400 text-4xl" /> },
  { name: 'Tailwind CSS', caption: 'Rapid Styling', icon: <SiTailwindcss className="text-teal-400 text-4xl" /> },
  { name: 'Node.js', caption: 'Backend Runtime', icon: <FaNodeJs className="text-green-500 text-4xl" /> },
  { name: 'Express.js', caption: 'API Development', icon: <SiExpress className="text-gray-400 text-4xl" /> },
  { name: 'MongoDB', caption: 'Database', icon: <SiMongodb className="text-green-600 text-4xl" /> },
  { name: 'Git', caption: 'Version Control', icon: <FaGitAlt className="text-red-500 text-4xl" /> },
  { name: 'GitHub', caption: 'Code Collaboration', icon: <FaGithub className="text-gray-300 text-4xl" /> },
];

const TechStack = () => {
  const sliderRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Dragging states
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftVal = useRef(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId;
    const speed = 2; // Slow, smooth auto scroll speed

    const updateScroll = () => {
      if (!isDown.current && !isHovered) {
        slider.scrollLeft += speed;
        const halfWidth = slider.scrollWidth / 2;
        if (slider.scrollLeft >= halfWidth) {
          slider.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(updateScroll);
    };

    animationId = requestAnimationFrame(updateScroll);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  const handleMouseDown = (e) => {
    const slider = sliderRef.current;
    if (!slider) return;
    isDown.current = true;
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeftVal.current = slider.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag sensitivity
    let newScrollLeft = scrollLeftVal.current - walk;

    const halfWidth = slider.scrollWidth / 2;
    if (newScrollLeft >= halfWidth) {
      newScrollLeft = 0;
    } else if (newScrollLeft < 0) {
      newScrollLeft = halfWidth - 1;
    }
    slider.scrollLeft = newScrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    isDown.current = false;
  };

  const handleTouchStart = (e) => {
    const slider = sliderRef.current;
    if (!slider) return;
    isDown.current = true;
    startX.current = e.touches[0].pageX - slider.offsetLeft;
    scrollLeftVal.current = slider.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDown.current) return;
    const slider = sliderRef.current;
    if (!slider) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    let newScrollLeft = scrollLeftVal.current - walk;

    const halfWidth = slider.scrollWidth / 2;
    if (newScrollLeft >= halfWidth) {
      newScrollLeft = 0;
    } else if (newScrollLeft < 0) {
      newScrollLeft = halfWidth - 1;
    }
    slider.scrollLeft = newScrollLeft;
  };

  return (
    <section id="skills" className="relative w-full py-24 z-10 flex flex-col items-center select-none overflow-hidden">
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans text-[var(--text-primary)] uppercase tracking-wider">
          Tech Stack & Tools
        </h2>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto uppercase tracking-widest text-sm">
          Core Technologies powering my development workflow
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Edge overlays to fade in/out the edges of the box layout */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>

        {/* Scrollable Track */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); handleMouseUpOrLeave(); }}
          className="w-full flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing py-8 [perspective:1000px]"
        >
          {/* Double array to create seamless loop */}
          {[...techs, ...techs].map((tech, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderColor: 'var(--border-glass)',
                backdropFilter: 'blur(var(--glass-blur))',
                WebkitBackdropFilter: 'blur(var(--glass-blur))',
              }}
              className="group flex flex-col items-center justify-center p-8 min-w-[240px] md:min-w-[280px] h-[300px] mx-4 border rounded-[24px] transition-all duration-500 ease-out cursor-grab active:cursor-grabbing
                shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:-translate-y-3 hover:scale-[1.03] hover:border-[#0cc35b] hover:shadow-[0_20px_40px_rgba(12,195,91,0.2)]
                [transform-style:preserve-3d] hover:[transform:rotateX(10deg)_rotateY(-10deg)]"
            >
              {/* Outer Thin Circle just like the Wix picture with 3D translation */}
              <div
                style={{ transform: 'translateZ(30px)' }}
                className="w-20 h-20 rounded-full border border-white/10 group-hover:border-[#0cc35b]/40 flex items-center justify-center mb-6 transition-all duration-300 bg-white/5 shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
              >
                {tech.icon}
              </div>
              <h3
                style={{ transform: 'translateZ(20px)' }}
                className="text-xl font-bold text-[var(--text-primary)] mb-2 tracking-wide text-center uppercase"
              >
                {tech.name}
              </h3>
              <p
                style={{ transform: 'translateZ(10px)' }}
                className="text-xs font-semibold text-[var(--accent-gold)] tracking-widest text-center uppercase"
              >
                {tech.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
