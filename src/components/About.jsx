import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const skillGroups = [
  { title: 'Languages', items: 'Python / Typescript / C++ / SQL / YAML', color: 'blue' },
  { title: 'Frameworks', items: 'FastAPI / React / Node / Express / NextJS / Tailwind', color: 'green' },
  { title: 'Infrastructure', items: 'PostgreSQL / Docker / Firebase / AWS / Git', color: 'amber' },
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
