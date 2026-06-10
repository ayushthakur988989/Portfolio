import React from 'react';
import ScrollReveal from './ScrollReveal';
import { FaAward, FaSearchDollar, FaLaptopCode, FaChevronRight } from 'react-icons/fa';

const Certificates = [
  {
    title: 'Web Development Certificate [Softpro India Computer Technologies Pvt. Ltd., Lucknow]',
    provider: 'Full Stack Program',
    desc: 'Gained hands-on experience in MERN stack development. Built and deployed projects during the training. Received a training completion certificate uploaded on LinkedIn.',
  },
  {
    title: 'Frontend Developer Certificate [CodTech IT Solutions Private Limited - Remote]',
    provider: 'Frontend Developer',
    desc: 'Focused on component architecture, state management, custom React hooks, JSX rendering optimization, context API, and single-page routing.',
  },
];

const panelStyle = {
  backgroundColor: 'var(--glass-bg)',
  borderColor: 'var(--border-glass)',
  backdropFilter: 'blur(var(--glass-blur))',
  WebkitBackdropFilter: 'blur(var(--glass-blur))',
};

const SectionBadge = ({ children }) => (
  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0cc35b]/20 bg-[#0cc35b]/10 px-3 py-1 text-[var(--accent-gold)] font-bold text-xs sm:text-sm uppercase tracking-widest">
    <FaChevronRight className="text-[10px] sm:text-xs" />
    <span>{children}</span>
  </div>
);

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative w-full py-16 sm:py-24 lg:py-28 px-3 min-[380px]:px-4 sm:px-6 lg:px-10 xl:px-16 z-10 overflow-hidden box-border"
    >
      <ScrollReveal>
        <div
          className="relative left-1/2 -translate-x-1/2 max-w-none box-border min-w-0"
          style={{ width: 'min(1240px, calc(100vw - 32px))' }}
        >
          <div className="mb-10 sm:mb-14 flex flex-col items-center gap-3 text-center">
            <SectionBadge>Career Journey</SectionBadge>

            <h2 className="text-2xl min-[380px]:text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-wide uppercase">
              Experience & Certificates
            </h2>
          </div>

          <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch justify-center min-w-0">
            <div
              style={panelStyle}
              className="group border p-4 min-[380px]:p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex h-full flex-col gap-5 sm:gap-6 w-full max-w-full overflow-hidden box-border transition-all duration-300 hover:border-[#0cc35b] hover:bg-[#0cc35b]/5 hover:shadow-[0_20px_40px_rgba(12,195,91,0.16)]"
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <SectionBadge>Status</SectionBadge>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-wide uppercase">
                  Experience
                </h3>
              </div>

              <div className="flex flex-col min-[420px]:flex-row items-start gap-3 min-[420px]:gap-4 text-left w-full min-w-0">
                <div className="p-3 bg-[var(--accent-gold)]/10 rounded-xl text-[var(--accent-gold)] shrink-0">
                  <FaSearchDollar className="text-2xl" />
                </div>

                <div className="min-w-0 w-full">
                  <h4 className="text-base min-[380px]:text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wide break-words [overflow-wrap:anywhere] leading-snug transition-colors duration-300 group-hover:text-[#0cc35b]">
                    Frontend Developer Intern [CODTECH IT Solutions Private Limited - Remote]
                  </h4>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed break-words">
                    Completed an online internship in Frontend Development. Worked with HTML, CSS,
                    JavaScript, and basic React to build responsive web pages. Developed
                    user-friendly UI components and improved website layouts. Gained hands-on
                    experience with real-world frontend projects.
                  </p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/5"></div>

              <div className="flex flex-col min-[420px]:flex-row items-start gap-3 min-[420px]:gap-4 text-left w-full min-w-0">
                <div className="p-3 bg-[#0cc35b]/10 rounded-xl text-[#0cc35b] shrink-0">
                  <FaLaptopCode className="text-2xl" />
                </div>

                <div className="min-w-0 w-full">
                  <h4 className="text-base min-[380px]:text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wide break-words [overflow-wrap:anywhere] leading-snug transition-colors duration-300 group-hover:text-[#0cc35b]">
                    Freelance & Collaboration
                  </h4>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed break-words">
                    Always open to freelance projects, open-source work, and remote collaboration.
                    Let's work together to build clean, functional, and responsive modern web products!
                  </p>
                </div>
              </div>
            </div>

            <div
              style={panelStyle}
              className="border p-4 min-[380px]:p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex h-full flex-col gap-5 sm:gap-6 w-full max-w-full overflow-hidden box-border"
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <SectionBadge>Credentials</SectionBadge>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-wide uppercase">
                  Certificates
                </h3>
              </div>

              <div className="flex flex-col gap-4 sm:gap-5 w-full max-w-full overflow-hidden">
                {Certificates.map((cert, idx) => (
                  <div
                    key={idx}
                    className="group rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5 transition-all duration-300 hover:border-[#0cc35b]/40 flex flex-col min-[420px]:flex-row items-start gap-3 min-[420px]:gap-4 text-left w-full max-w-full overflow-hidden box-border"
                  >
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#0cc35b]/10 group-hover:border-[#0cc35b]/20 transition-all duration-300 text-[var(--accent-gold)] group-hover:text-[#0cc35b] shrink-0">
                      <FaAward className="text-xl" />
                    </div>

                    <div className="min-w-0 w-full">
                      <h4 className="text-sm min-[380px]:text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[#0cc35b] transition-colors duration-300 uppercase tracking-wide break-words [overflow-wrap:anywhere] leading-snug">
                        {cert.title}
                      </h4>

                      <p className="text-xs text-[var(--accent-gold)] font-semibold mb-2 break-words [overflow-wrap:anywhere]">
                        {cert.provider}
                      </p>

                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed break-words">
                        {cert.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Experience;
