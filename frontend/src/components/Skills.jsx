import React from 'react';
import ScrollReveal from './ScrollReveal';
import { FaCode, FaServer, FaDatabase, FaTools } from 'react-icons/fa';

const skillCategories = [
  {
    title: 'Frontend',
    icon: <FaCode className="text-[var(--accent-gold)] text-3xl" />,
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: <FaServer className="text-[var(--accent-gold)] text-3xl" />,
    items: ['Node.js', 'Express.js'],
  },
  {
    title: 'Database',
    icon: <FaDatabase className="text-[var(--accent-gold)] text-3xl" />,
    items: ['MongoDB', 'MySQL'],
  },
  {
    title: 'Tools',
    icon: <FaTools className="text-[var(--accent-gold)] text-3xl" />,
    items: ['Git', 'GitHub', 'VS Code'],
  },
];

const Skills = () => {
  return (
    <section
  id="skills-detail"
  className="relative w-full py-28 px-6 md:px-12 z-10"
  style={{
    marginTop: "80px",
    border: "1px solid transparent"
  }}
>
      <ScrollReveal>
        <div className="flex flex-col gap-2 mb-24 items-center text-center">
          <div className="flex items-center gap-2 text-[var(--accent-gold)] font-bold text-sm uppercase tracking-widest">
            <span>▶</span> Skills
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-wide uppercase">
            Core Competencies
          </h2>
        </div>

        <div className="max-w-[1400px] mx-auto"
    
        style={{
    marginTop: "40px",
    border: "1px solid transparent"
  }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 [perspective:1000px]">
            {skillCategories.map((cat, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--glass-bg)',
                  borderColor: 'var(--border-glass)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  WebkitBackdropFilter: 'blur(var(--glass-blur))',
                }}
                className="group border p-8 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] 
        hover:-translate-y-3 hover:border-[#0cc35b] hover:shadow-[0_15px_30px_rgba(12,195,91,0.15)]
        transition-all duration-500 ease-out [transform-style:preserve-3d] hover:[transform:rotateX(5deg)_rotateY(-5deg)]"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#0cc35b]/10 group-hover:border-[#0cc35b]/20 transition-all duration-300">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] uppercase tracking-wide">
                    {cat.title}
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[var(--text-secondary)] font-medium text-sm">
                      <svg className="w-4 h-4 text-[#0cc35b]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Skills;
