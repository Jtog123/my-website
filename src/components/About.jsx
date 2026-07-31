import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const skills = [
  { label: 'React / Next.js', pct: 90 },
  { label: 'TypeScript', pct: 85 },
  { label: 'UI / UX Design', pct: 80 },
  { label: 'Node.js', pct: 75 },
  { label: 'CSS / Animations', pct: 85 },
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

const skillBar = {
  hidden: { width: 0 },
  visible: (pct) => ({
    width: `${pct}%`,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
  }),
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
              <p>
                I'm a designer and developer who believes the best digital products
                feel inevitable — clean, purposeful, and effortless to use.
              </p>
              <p>
                With a focus on front-end architecture and design systems, I bridge the
                gap between beautiful interfaces and rock-solid code. Every project I
                ship prioritises clarity, performance, and the person on the other side
                of the screen.
              </p>
              <p>
                Currently working on tools that help teams ship faster without
                compromising on quality.
              </p>
            </motion.div>

            <motion.div className="about__skills" variants={slideRight}>
              <h3 className="about__skills-title">Core Competencies</h3>
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  className="about__skill"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  <div className="about__skill-head">
                    <span className="about__skill-label">{skill.label}</span>
                  </div>
                  <div className="about__skill-track">
                    <motion.div
                      className="about__skill-fill"
                      custom={skill.pct}
                      variants={skillBar}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
