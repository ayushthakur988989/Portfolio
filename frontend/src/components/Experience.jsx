import React from 'react';
import ScrollReveal from './ScrollReveal';
import { FaAward, FaSearchDollar, FaLaptopCode } from 'react-icons/fa';

const Certificates = [
  {
    title: 'Web Development Certificate [Softpro India Computer Technologies Pvt. Ltd., Lucknow ]',
    provider: 'Full Stack Program',
    desc: ' Gained hands-on experience in MERN stack development. - Built and deployed projects during the training. - Received a training completion certificate (uploaded on LinkedIn). ',
  },
  {
    title: 'Frontend Developer Certificate [CodTech IT Solutions Private limited – (Remote) ]',
    provider: 'Frontend Developer',
    desc: 'Focused on component architecture, state management, custom React hooks, JSX rendering optimization, context API, and single-page routing.',
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative w-full py-28 px-6 md:px-12 max-w-[1400px] mx-auto z-10"
    >
      <ScrollReveal>
        <div className="max-w-[1400px] mx-auto">
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            style={{
              marginTop: '50px',
              border: '1px solid transparent',
            }}
          >

            {/* Left Column */}
            <div className="flex flex-col items-center text-center gap-6 w-full">
              <div className="flex flex-col gap-2 items-center text-center w-full">
                <div className="flex items-center justify-center gap-2 text-[var(--accent-gold)] font-bold text-sm uppercase tracking-widest w-full">
                  <span>▶</span>
                  <span>Status</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-wide uppercase">
                  Experience
                </h2>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--glass-bg)',
                  borderColor: 'var(--border-glass)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  WebkitBackdropFilter: 'blur(var(--glass-blur))',
                }}
                className="border p-8 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col gap-6 w-full"
              >
                <div className="flex items-start gap-4 text-left">
                  <div className="p-3 bg-[var(--accent-gold)]/10 rounded-xl text-[var(--accent-gold)] mt-1">
                    <FaSearchDollar className="text-2xl" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wide">
                      Frontend Developer Intern [CODTECH IT Solutions Private limited – (Remote)] 
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Completed an online internship in Frontend Development. 
Worked with HTML, CSS, JavaScript, and basic React to build responsive web pages. 
Developed user-friendly UI components and improved website layouts. 
Gained hands-on experience with real-world frontend projects.
                    </p>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/5"></div>

                <div className="flex items-start gap-4 text-left">
                  <div className="p-3 bg-[#0cc35b]/10 rounded-xl text-[#0cc35b] mt-1">
                    <FaLaptopCode className="text-2xl" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wide">
                      Freelance & Collaboration
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Always open to freelance projects, open-source work, and remote collaboration. Let's work together to build clean, functional, and responsive modern web products!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-center text-center gap-6 w-full">
              <div className="flex flex-col gap-2 items-center text-center w-full">
                <div className="flex items-center justify-center gap-2 text-[var(--accent-gold)] font-bold text-sm uppercase tracking-widest w-full">
                  <span>▶</span>
                  <span>Credentials</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-wide uppercase">
                  Certificates
                </h3>
              </div>

              <div className="flex flex-col gap-6 w-full">
                {Certificates.map((cert, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--glass-bg)',
                      borderColor: 'var(--border-glass)',
                      backdropFilter: 'blur(var(--glass-blur))',
                      WebkitBackdropFilter: 'blur(var(--glass-blur))',
                    }}
                    className="group border p-6 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:border-[#0cc35b] transition-all duration-300 flex items-start gap-4 text-left"
                  >
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#0cc35b]/10 group-hover:border-[#0cc35b]/20 transition-all duration-300 text-[var(--accent-gold)] group-hover:text-[#0cc35b] mt-1">
                      <FaAward className="text-xl" />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[#0cc35b] transition-colors duration-300 uppercase tracking-wide">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-[var(--accent-gold)] font-semibold mb-2">
                        {cert.provider}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
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