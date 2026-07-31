import { useState, useEffect } from 'react';
import './Header.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['about', 'projects', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner">
        <a href="#" className="header__logo">JT</a>
        <nav className="header__nav">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`header__link${activeSection === link.href.slice(1) ? ' header__link--active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
