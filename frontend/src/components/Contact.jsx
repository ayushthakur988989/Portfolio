import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setStatus('');
      }, 2000);
    }, 1200);
  };

  return (
    <footer
      id="contact"
      className="relative w-full py-20 px-0 z-10 border-t border-white/10 overflow-hidden"
    >
      <ScrollReveal>
        <div
          className="relative left-1/2 -translate-x-1/2 flex flex-col items-center text-center box-border"
          style={{
            width: 'min(1600px, calc(100vw - 24px))',
            marginTop: '5vh',
          }}
        >
          {/* Footer Heading */}
          <div className="flex flex-col gap-3 items-center text-center mb-12"
            style={{ marginBottom: "2vh" }}
          >
            <div className="flex items-center justify-center gap-2 text-[var(--accent-gold)] font-bold text-sm uppercase tracking-widest">
              <span>▶</span>
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-wide uppercase">
              Contact Me
            </h2>

            <p className="max-w-2xl text-md text-[var(--text-secondary)] leading-relaxed">
              Feel free to reach out to me! Whether you want to discuss an
              internship, freelance projects, coding collaborations, or just say
              hello — I'd love to connect.
            </p>
          </div>

          {/* Main Footer Box */}
          <div
            style={{
              backgroundColor: 'var(--glass-bg)',
              borderColor: 'var(--border-glass)',
              backdropFilter: 'blur(var(--glass-blur))',
              WebkitBackdropFilter: 'blur(var(--glass-blur))',
            }}
            className="w-full border p-6 md:p-10 rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

              {/* Contact Details */}
              <div className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">
                <div>
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-[var(--accent-gold)] font-bold text-sm uppercase tracking-widest mb-2">
                    <span>▶</span>
                    <span>Contact Details</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[var(--text-primary)] uppercase">
                    Let's Connect
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  <a
                    href="ayushthakur988989@gmail.com"
                    className="flex items-center gap-4 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0cc35b] hover:bg-[#0cc35b]/10 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[var(--accent-gold)] group-hover:text-[#0cc35b]">
                      <FaEnvelope className="text-lg" />
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)]">
                        Email
                      </h4>
                      <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[#0cc35b] transition-colors duration-300">
                        ayushthakur988989@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/ayush-singh-7b0bb3313"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0cc35b] hover:bg-[#0cc35b]/10 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[var(--accent-gold)] group-hover:text-[#0cc35b]">
                      <FaLinkedin className="text-lg" />
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)]">
                        LinkedIn
                      </h4>
                      <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[#0cc35b] transition-colors duration-300">
                        linkedin.com/ayush
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/ayushthakur988989"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0cc35b] hover:bg-[#0cc35b]/10 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[var(--accent-gold)] group-hover:text-[#0cc35b]">
                      <FaGithub className="text-lg" />
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)]">
                        GitHub
                      </h4>
                      <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[#0cc35b] transition-colors duration-300">
                        github.com/ayush
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-[var(--accent-gold)]">
                      <FaPhoneAlt className="text-md" />
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)]">
                        Phone
                      </h4>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">
                        +91 82668 51200
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-3 text-[var(--text-secondary)]">
                  <FaMapMarkerAlt className="text-[var(--accent-gold)]" />
                  <span className="text-sm font-semibold">
                    Lucknow, Uttar Pradesh, India
                  </span>
                </div>
              </div>

              {/* Contact Form */}
              <div className="w-full">
                <div className="flex flex-col gap-2 mb-6 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-[var(--accent-gold)] font-bold text-sm uppercase tracking-widest">
                    <span>▶</span>
                    <span>Write To Me</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-wide uppercase">
                    Send a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)]"
                    >
                      Full Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#0cc35b] transition-colors duration-300"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)]"
                    >
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#0cc35b] transition-colors duration-300"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)]"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Enter your message"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[#0cc35b] transition-colors duration-300 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-4 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-gold-dark)] hover:from-[#0cc35b] hover:to-[#0cc35b] text-black font-bold text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      'Sending...'
                    ) : status === 'success' ? (
                      'Sent Successfully!'
                    ) : (
                      <>
                        <FaPaperPlane className="text-xs" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="w-full mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-secondary)]">
              © 2026 Ayush Singh. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm font-semibold text-[var(--text-secondary)]">
              <a href="#home" className="hover:text-[#0cc35b] transition-colors">
                Home
              </a>

              <a href="#projects" className="hover:text-[#0cc35b] transition-colors">
                Projects
              </a>

              <a href="#experience" className="hover:text-[#0cc35b] transition-colors">
                Experience
              </a>

              <a href="#contact" className="hover:text-[#0cc35b] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Contact;
