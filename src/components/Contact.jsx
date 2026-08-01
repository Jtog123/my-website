import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './Contact.css';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-label" variants={fadeUp}>Contact</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            Get in <span className="red">Touch</span>
          </motion.h2>
          <motion.div className="accent-line" variants={fadeUp} />

          <motion.div className="contact__body" variants={fadeUp}>
            <p className="contact__text">
              Have a project in mind or just want to say hello?
              <br />
              I'm always open to new conversations.
            </p>
            <motion.a
              href="mailto:hello@jamestogher.com"
              className="contact__email"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              hello@jamestogher.com
            </motion.a>
          </motion.div>

          <motion.div className="contact__socials" variants={fadeUp}>
            {[
              { label: 'GitHub', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
              { label: 'LinkedIn', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
            ].map(social => (
              <motion.a
                key={social.label}
                href="#"
                className="contact__social"
                aria-label={social.label}
                whileHover={{ y: -3, borderColor: '#8C2D31', color: '#8C2D31', transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={social.icon} />
                </svg>
                <span>{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <footer className="contact__footer">
        <div className="container">
          <div className="contact__footer-inner">
            <span className="contact__footer-mark">&copy; 2026 James Togher</span>
            <span className="contact__footer-tag">Built with purpose</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
