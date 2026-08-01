import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './Projects.css';

const projects = [
  {
    title: 'ScreenshotSweet.io',
    desc: 'A 3D mockup platform that allows developers to design, preview, and capture high fidelity device mockups using a custom-modeled iPhone Blender asset.',
    tags: ['TypeScript', 'React', 'Node', 'ThreeJS', 'PostgreSQL'],
    img: '/LogoBrown.svg',
    imgStyle: { objectFit: 'contain', objectPosition: 'center', padding: '4px', background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 50%, #0a0a0a 100%)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 40px rgba(0,0,0,0.5)' },
    category: 'Web App',
    status: 'completed',
    url: 'https://screenshotsweet.io',
    private: true,
  },
  {
    title: 'LinkedIn Auto Applier',
    desc: 'Automated job application tool that intelligently fills and submits applications on LinkedIn based on user defined criteria and preferences.',
    tags: ['Python','Playwright', 'SQlite', 'Docker', 'AWS'],
    img: '/AgentLinkedin.png',
    category: 'Automation',
    status: 'completed',
    private: true,
  },
  {
    title: 'Beanstalk Language',
    desc: 'A fully functional interpreted programming language built in C, featuring object oriented programming, functions, control flow, and all of core features found in modern high level languages.',
    tags: ['C Programming Langauge'],
    img: '/JackBeanstalkGiant.jpg',
    category: 'Self Learning',
    status: 'completed',
    url: 'https://github.com/Jtog123/Beanstalk_Language',
  },
  {
    title: 'ABE (Audio Book Enjoyer)',
    desc: 'Built an end to end text to speech pipeline using the Kokoro TTS model, processing PDFs by chapter and converting books into audio for users who prefer listening over reading.',
    tags: ['Python', 'FastAPI', 'Open Source', 'AI'],
    img: '/abe-portrait.jpg',
    imgStyle: { objectPosition: 'center -70px' },
    category: 'Automation',
    status: 'in progress',
    url: 'https://github.com/Jtog123/PDF-To-Voice-Reader',
  },
];

const pcbId = (s) => s.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 10);

// TAG COLORS — map technologies to the thermal palette (add new techs here)
const tagColors = {
  'Python': '#23346A',
  'TypeScript': '#23346A',
  'Typescript': '#23346A',
  'C++': '#23346A',
  'SQL': '#23346A',
  'PostgreSQL': '#23346A',
  'Docker': '#23346A',
  'Gemini': '#23346A',
  'YAML': '#f59e0b',
  'Firebase': '#f59e0b',
  'AWS': '#f59e0b',
  'Claude': '#f59e0b',
  'Git': '#FF2800',
  'Agentic Harnesses': '#FF2800',
  'FastAPI': '#22c55e',
  'Node': '#22c55e',
  'Express': '#22c55e',
  'NextJS': '#22c55e',
  'OpenAI': '#22c55e',
  'Puppeteer': '#22c55e',
  'Playwright': '#22c55e',
  'React': '#00B3CC',
  'Tailwind': '#00B3CC',
  'ThreeJS': '#00B3CC',
  'C Programming Language': '#23346A',
};
const DEFAULT_TAG_COLOR = '#23346A';

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const cardWidth = 480;
  const gap = 32;
  const totalWidth = projects.length * (cardWidth + gap);
  const scrollDist = Math.max(0, totalWidth + 200 + 260 - 1440);

  const trackX = useTransform(scrollYProgress, [0, 1], [200, -(scrollDist)]);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects__sticky">
        <div className="projects__header">
          <div className="container">
            <p className="projects__label">Work</p>
            <h2 className="projects__title">Selected <span className="projects__title-accent">Projects</span></h2>
            <div className="projects__accent" />
          </div>
        </div>

        <div className="projects__viewport">
          <motion.div
            ref={trackRef}
            className="projects__track"
            style={{ x: trackX }}
          >
            {projects.map((project, i) => (
              <article key={project.title} className="projects__card">
                {/* PCB header — IC component label + pin markers */}
                <div className="pcb__header">
                  <div className="pcb__pins">
                    {Array.from({length: 4}, (_, j) => (
                      <div key={j} className="pcb__pin-dot" />
                    ))}
                  </div>
                  <span className="pcb__component-id">U{i + 1}</span>
                  <div className="pcb__pins pcb__pins--right">
                    {Array.from({length: 4}, (_, j) => (
                      <div key={j} className="pcb__pin-dot" />
                    ))}
                  </div>
                </div>

                {/* Image — framed like a component footprint */}
                <div className="pcb__image-frame">
                  <div className="pcb__image">
                    <img
                      src={project.img}
                      alt={project.title}
                      loading="lazy"
                      style={project.imgStyle}
                    />
                  </div>
                  <div className={`pcb__status pcb__status--${project.status}`}>
                    <span className="pcb__status-dot" />
                    <span className="pcb__status-text">{project.status}</span>
                  </div>
                  {project.badge && (
                    <div className="pcb__badge">{project.badge}</div>
                  )}
                </div>

                {/* Category + trace line */}
                <div className="pcb__category">
                  <span className="pcb__trace" />
                  <span className="pcb__category-text">{project.category}</span>
                </div>

                <h3 className="pcb__title">{project.title}</h3>
                <p className="pcb__desc">{project.desc}</p>
                {project.highlight && (
                  <div className="pcb__highlight">
                    <span className="pcb__highlight-dot" />
                    <p>{project.highlight}</p>
                  </div>
                )}

                <div className="pcb__tags">
                  {project.tags.map(tag => {
                    const c = tagColors[tag] || DEFAULT_TAG_COLOR;
                    return (
                      <span
                        key={tag}
                        className="pcb__tag"
                        style={{
                          color: c,
                          borderColor: `${c}40`,
                          background: `${c}0D`,
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <div className="pcb__actions">
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="pcb__btn pcb__btn--primary">
                      <span>View project</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  )}
                  {project.private && (
                    <span className="pcb__btn pcb__btn--private">Private repo</span>
                  )}
                  {project.demo && project.demo !== project.url && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pcb__btn pcb__btn--demo">
                      Live demo
                    </a>
                  )}
                </div>

                <div className="pcb__traces">
                  {Array.from({length: 6}, (_, j) => (
                    <div key={j} className="pcb__trace-line" />
                  ))}
                </div>
              </article>
            ))}

          </motion.div>
        </div>

      </div>

      {/* Spacer — creates smooth scroll distance */}
      <div className="projects__spacer" />
    </section>
  );
}
