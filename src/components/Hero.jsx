import { useRef, useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import BlueprintDrawing from './BlueprintDrawing';
import './Hero.css';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stripeAnim = {
  hidden: { width: 0 },
  visible: { width: '40%', transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.9 } },
};

// ROTATING TITLES — add or remove words here, they cycle in the hero tag
const rotatingTitles = ['Tinkerer', 'Son', 'Brother'];
const maxTitleLen = Math.max(...rotatingTitles.map(t => t.length));

export default function Hero() {
  const sectionRef = useRef(null);
  const blueprintRef = useRef(null);
  const nameRef = useRef(null);
  const nameX = useMotionValue(0.5);
  const gradOpacity = useSpring(0, { stiffness: 80, damping: 18 });
  const baseOpacity = useSpring(1, { stiffness: 80, damping: 18 });
  const heatGradient = useTransform(nameX, (x) =>
    `radial-gradient(ellipse 360px 140px at ${x * 100}% 50%, #FF2200 0%, #FF8800 18%, #FFCC00 35%, #33BB33 55%, #0099CC 75%, #0033AA 100%)`
  );

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const glowX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);


  const handleNameMove = useCallback((e) => {
    const rect = nameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    nameX.set(x);
  }, [nameX]);

  const handleMouseMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const section = sectionRef.current;
    if (section) {
      section.style.setProperty('--spotlight-x', `${x}%`);
      section.style.setProperty('--spotlight-y', `${y}%`);
    }
    // Also drive the parallax motion values
    const mx = (e.clientX - rect.left) / rect.width - 0.5;
    const my = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(mx);
    mouseY.set(my);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const [clock, setClock] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour12: false });
      setClock(time);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const [titleIndex, setTitleIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex(i => (i + 1) % rotatingTitles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);



  return (
    <section
      className="hero"
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Blueprint drawing — revealed under cursor spotlight */}
      <div className="hero__blueprint" ref={blueprintRef} aria-hidden="true">
        <BlueprintDrawing />
      </div>

      {/* Red glow — shifts subtly with cursor */}
      <motion.div
        className="hero__glow"
        aria-hidden="true"
        style={{ x: glowX, y: glowY }}
      />

      <motion.div
        className="hero__container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero__tag" variants={fadeUp}>
          <span className="hero__tag-static">Engineer</span>
          <span className="hero__tag-sep">|</span>
          <span className="hero__tag-static">Builder</span>
          <span className="hero__tag-sep">|</span>
          <span className="hero__tag-rotating" style={{ minWidth: `${maxTitleLen + 1}ch` }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingTitles[titleIndex]}
                className="hero__tag-word"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {rotatingTitles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>

        </motion.p>
        <div className="hero__name-stack">
          {/* Base layer — fades out on hover to reveal gradient overlay */}
          <motion.h1
            className="hero__name hero__name-base"
            variants={{
              hidden: { y: 60 },
              visible: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
            style={{ opacity: baseOpacity }}
            aria-hidden="true"
          >
            <span className="hero__name-first">James</span>
            <span className="hero__name-last">Togher</span>
          </motion.h1>

          {/* Overlay — PCB thermal gradient, fades in on hover */}
          <motion.h1
            ref={nameRef}
            className="hero__name-overlay"
            onMouseMove={handleNameMove}
            onMouseEnter={() => { gradOpacity.set(1); baseOpacity.set(0); }}
            onMouseLeave={() => { gradOpacity.set(0); baseOpacity.set(1); nameX.set(0.5); }}
            style={{
              opacity: gradOpacity,
              backgroundImage: heatGradient,
              backgroundSize: '100% 100%',
              backgroundPosition: '0% 0%',
              backgroundRepeat: 'no-repeat',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            <span className="hero__name-first" style={{ WebkitTextFillColor: 'transparent', color: 'transparent' }}>James</span>
            <span className="hero__name-last" style={{ WebkitTextFillColor: 'transparent', color: 'transparent' }}>Togher</span>
          </motion.h1>
        </div>

        <motion.div className="hero__stripe" variants={fadeUp}>
          <motion.div className="hero__stripe-fill" variants={stripeAnim} />
        </motion.div>

        <motion.p className="hero__sub" variants={fadeUp}>
          From interface to infrastructure. I Build it <span className="hero__sub-em">all</span>.
        </motion.p>

        <motion.div className="hero__btns" variants={fadeUp}>
          <button className="hero__btn-primary" type="button" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="hero__btn-icon-wrap">
              <span className="hero__btn-text" aria-label="View Projects">
                <span aria-hidden="true" className="hero__btn-text-top">View Projects</span>
                <span aria-hidden="true" className="hero__btn-text-bot">View Projects</span>
              </span>
              <svg className="hero__btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </button>

          <a className="hero__btn-secondary" href="#about">
            <span className="hero__btn-icon-wrap">
              <span className="hero__btn-bracket">[ </span>
              <span className="hero__btn-text" aria-label="About Me">
                <span aria-hidden="true" className="hero__btn-text-top">About Me</span>
                <span aria-hidden="true" className="hero__btn-text-bot">About Me</span>
              </span>
              <span className="hero__btn-bracket"> ]</span>
            </span>
          </a>
        </motion.div>

        <div className="hero__clock" aria-live="polite">
          <span className="hero__clock-time">{clock}</span>
          <span className="hero__clock-tz">EST</span>
        </div>


      </motion.div>


    </section>
  );
}
