import React, { useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const projects = [
  {
    name: 'Online Exam Preparation ',
    desc: 'Online Exam Preparation is a web-based platform designed to help students prepare for competitive and academic exams. It provides features like subject-wise study material, mock tests, quizzes, previous year questions, result tracking, and performance analysis. The main goal of this project is to make exam preparation easier, faster, and more organized for students through an online system.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    features: ['Mock Tests & Quizzes', 'Performance Tracking', 'Subject-wise Study Material'],
    live: 'https://example.com',
    github: 'https://github.com/ayushthakur988989',
  },
  {
    name: 'E-Learning Platform',
    desc: 'The E-Learning UI is a clean and responsive web interface designed for online learning platforms. It provides users with easy access to courses, lessons, study materials, quizzes, and progress tracking. The design focuses on simple navigation, attractive course cards, user-friendly layouts, and a smooth learning experience for students.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'CSS'],
    features: ['Course Cards', 'Quize and test section', 'Progress tracking'],
    live: 'https://github.com/ayushthakur988989/E-LEARNING-PLATFORM-UI',
    github: 'https://github.com/ayushthakur988989',
  },
  {
    name: 'Real-time chat application',
    desc: 'A Real-Time Chat Application is a web-based messaging platform that allows users to send and receive messages instantly. It provides a smooth communication experience with features like live chat, user authentication, online/offline status, and message history. The main goal of this project is to make communication fast, secure, and user-friendly.',
    tech: ['HTML', 'Tailwind CSS', 'Json', 'JavaScript'],
    features: ['Instant massaging', 'User authentication', 'Online/Offline status'],
    live: 'https://github.com/ayushthakur988989/-REAL-TIME-CHAT-APPLICATION',
    github: 'https://github.com/ayushthakur988989',
  },
];

const Projects = () => {
  const duplicatedProjects = [...projects, ...projects];
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    const slider = scrollRef.current;
    if (!slider) return;

    isDragging.current = true;
    startX.current = e.pageX - slider.offsetLeft;
    scrollLeft.current = slider.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const slider = scrollRef.current;
    if (!slider || !isDragging.current) return;

    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    slider.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };
  return (
    <section
      id="projects"
      className="relative w-full py-28 px-6 md:px-12 z-10 overflow-hidden"
      style={{ marginTop: '40px' }}
    >
      <ScrollReveal>
        <div className="flex flex-col gap-2 mb-20 items-center text-center">
          <div className="flex items-center gap-2 text-[var(--accent-gold)] font-bold text-sm uppercase tracking-widest">
            <span>▶</span> Projects
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-wide uppercase">
            Featured Projects
          </h2>

          <p className="max-w-2xl text-[var(--text-secondary)]">
            A collection of projects showcasing my skills in frontend,
            backend, databases, and full-stack development.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="project-scroll-wrapper relative w-full overflow-x-auto overflow-y-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >  <div className="project-slider flex gap-8 w-max">
            {duplicatedProjects.map((proj, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--glass-bg)',
                  borderColor: 'var(--border-glass)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  WebkitBackdropFilter: 'blur(var(--glass-blur))',
                }}
                className="project-card group min-w-[400px] max-w-[450px] min-h-[300px] flex flex-col justify-between border px-5 py-7 rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] 
hover:-translate-y-3 hover:border-[#0cc35b] hover:shadow-[0_20px_40px_rgba(12,195,91,0.18)]
transition-all duration-500 ease-out overflow-hidden"
              >
                <div
                  className="flex flex-col gap-5 w-full"
                  style={{
                    paddingTop: "20px",
                    paddingLeft: "25px",
                  }}
                >
                  <div className="flex flex-wrap gap-2 ">
                    {proj.tech.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold tracking-wider uppercase bg-[var(--accent-gold)]/15 border border-[var(--accent-gold)]/20 text-[var(--accent-gold)] px-2.5 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--text-primary)] tracking-wide uppercase leading-tight">
                    {proj.name}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-full">
                    {proj.desc}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest mb-3">
                      Key Features:
                    </h4>

                    <ul className="flex flex-col gap-3">
                      {proj.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-xs text-[var(--text-secondary)] font-medium leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0cc35b] mt-1.5 flex-shrink-0"></span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-5 border-t border-white/5 pt-3 mt-8"
                  style={{
                    paddingTop: "5px",
                    paddingLeft: "25px",
                  }}>
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[var(--text-primary)] hover:text-[#0cc35b] font-semibold transition-colors duration-300 "
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    Live Demo
                  </a>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold transition-colors duration-300"
                  >
                    <FaGithub className="text-sm" />
                    GitHub Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </ScrollReveal>
    </section>
  );
};

export default Projects;