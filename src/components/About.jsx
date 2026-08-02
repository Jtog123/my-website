import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const skillGroups = [
  { title: 'Languages', items: 'Python / Typescript / C++ / SQL / Shell / YAML', color: 'blue' },
  { title: 'Frameworks', items: 'FastAPI / React / Node / Express / NextJS / Tailwind', color: 'green' },
  { title: 'Infrastructure', items: 'Linux / PostgreSQL / Docker / Firebase / AWS / Git', color: 'amber' },
  { title: 'AI/ML', items: 'Agentic Harnesses / OpenAI / Claude / Gemini', color: 'red' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.p className="section-label" variants={fadeUp}>About</motion.p>
          <motion.h2 className="section-title" variants={fadeUp}>
            A Bit <span className="red">About Me</span>
          </motion.h2>
          <motion.div className="accent-line" variants={fadeUp} />

          <div className="about__grid">
            <motion.div className="about__text" variants={slideLeft}>
              <p className="about__lead">
                I have a background in Computer Science and the visual arts.
                I like to build software that's clean, fast, and easy to use.
              </p>

              <div className="about__rig">
                {/* Terminal chrome */}
                <div className="about__rig-bar">
                  <div className="about__rig-dots">
                    <span className="about__rig-dot about__rig-dot--red" />
                    <span className="about__rig-dot about__rig-dot--amber" />
                    <span className="about__rig-dot about__rig-dot--green" />
                  </div>
                  <span className="about__rig-title">james@rig — zsh</span>
                </div>

                <div className="about__rig-body">
                  <div className="about__rig-main">
                    <pre className="about__rig-art" aria-hidden="true">{`   ┌─────────┐
   │ ▓ ▓ ▓ ▓ │
   │ ▓ ▓ ▓ ▓ │
   │ ▓ ▓ ▓ ▓ │
   │ ▓ ▓ ▓ ▓ │
   └─────────┘`}</pre>

                    <div className="about__rig-specs">
                      {[
                        ['OS', 'Ubuntu 26.04', 'green'],
                        ['CPU', 'Ryzen 5950X', 'red'],
                        ['GPU', 'RTX 5070 Ti', 'red'],
                        ['RAM', 'Corsair 64GB', 'amber'],
                        ['SSD', 'Samsung 2TB', 'green'],
                        ['MOBO', 'Asus B550', 'amber'],
                      ].map(([k, v, color]) => (
                        <div key={k} className="about__rig-spec">
                          <span className={`about__rig-spec-dot about__rig-spec-dot--${color}`} />
                          <span className="about__rig-spec-key">{k}</span>
                          <span className="about__rig-spec-val">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shell prompt */}
                  <div className="about__rig-line">
                    <span className="about__rig-prompt">james@rig ❯</span>
                    <span className="about__rig-cursor" />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div className="about__skills" variants={slideRight}>
              <h3 className="about__skills-title">Core Competencies</h3>
              {skillGroups.map((group, i) => (
                <motion.div
                  key={group.title}
                  className="about__skill-group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  <motion.span
                    className="about__skill-group-bar"
                    style={{ transformOrigin: 'top' }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.08 }}
                  />
                  <div className="about__skill-group-head">
                    <span className={`about__led about__led--${group.color}`} />
                    <h4 className="about__skill-group-title">{group.title}</h4>
                  </div>
                  <p className="about__skill-group-items">{group.items}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
