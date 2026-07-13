import { useCallback, useEffect, useRef, useState } from 'react';
import ProfileCard from './react/ProfileCard.jsx';

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export default function HeroInteractive({ site }) {
  const sectionRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  const titles = site.rotatingTitles ?? [site.title];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (titles.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setTitleVisible(false);
      window.setTimeout(() => {
        setTitleIndex(i => (i + 1) % titles.length);
        setTitleVisible(true);
      }, 400);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [titles.length]);

  const handlePointerMove = useCallback(event => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    setPointer({
      x: clamp((event.clientX - rect.left) / rect.width, 0, 1),
      y: clamp((event.clientY - rect.top) / rect.height, 0, 1)
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPointer({ x: 0.5, y: 0.5 });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const parallax = (strength = 1) => ({
    transform: `translate(${(pointer.x - 0.5) * strength * 24}px, ${(pointer.y - 0.5) * strength * 16}px)`
  });

  const scrollFade = clamp(1 - scrollY / 420, 0, 1);
  const nameWords = site.name.split(' ');

  return (
    <section
      ref={sectionRef}
      className="hero-section relative flex min-h-screen items-center overflow-hidden pt-20"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ '--hero-scroll': scrollFade }}
    >
      <div
        className="orb orb-teal -left-32 top-1/4 h-96 w-96 transition-transform duration-700 ease-out"
        style={parallax(1.4)}
        aria-hidden="true"
      />
      <div
        className="orb orb-coral -right-32 bottom-1/4 h-80 w-80 transition-transform duration-700 ease-out"
        style={parallax(-1.1)}
        aria-hidden="true"
      />

      <div
        className="hero-scroll-layer relative mx-auto w-full max-w-7xl px-6 lg:px-10"
        style={{
          opacity: scrollFade,
          transform: `translateY(${scrollY * 0.12}px)`
        }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p
              className={`hero-fade-in font-mono text-xs uppercase tracking-[0.3em] text-teal ${mounted ? 'hero-fade-in--active' : ''}`}
              style={{ transitionDelay: '0ms' }}
            >
              <span className="hero-status-dot" aria-hidden="true" />
              {site.availability}
            </p>

            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-cream sm:text-7xl lg:text-6xl xl:text-7xl">
              {nameWords.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className={`hero-word inline-block ${mounted ? 'hero-word--active' : ''}`}
                  style={{ transitionDelay: `${120 + i * 90}ms` }}
                >
                  {word}
                  {i < nameWords.length - 1 ? '\u00a0' : ''}
                </span>
              ))}
            </h1>

            <p
              className={`hero-title-swap mt-4 font-display text-2xl font-medium text-cream-muted sm:text-3xl lg:text-2xl xl:text-3xl ${titleVisible ? 'hero-title-swap--visible' : ''}`}
              aria-live="polite"
            >
              {titles[titleIndex]}
            </p>

            <p
              className={`hero-fade-in mt-8 max-w-xl text-lg leading-relaxed text-cream-muted lg:text-xl ${mounted ? 'hero-fade-in--active' : ''}`}
              style={{ transitionDelay: '380ms' }}
            >
              {site.tagline}
            </p>

            <div
              className={`hero-fade-in mt-8 flex flex-wrap gap-4 ${mounted ? 'hero-fade-in--active' : ''}`}
              style={{ transitionDelay: '500ms' }}
            >
              <a
                href="#work"
                className="hero-btn-primary group inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-all hover:bg-teal-dim hover:shadow-[0_0_30px_rgba(45,212,191,0.3)]"
              >
                View work
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="hero-btn-ghost inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream transition-all hover:border-white/25 hover:bg-white/5"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div
            className={`hero-card-col lg:col-span-5 ${mounted ? 'hero-card-col--active' : ''}`}
            style={parallax(0.6)}
          >
            <ProfileCard
              className="pc-portfolio-theme pc-image-only mx-auto w-full max-w-sm"
              name={site.name}
              avatarUrl="/assets/foto.webp"
              iconUrl="/assets/iconpattern.png"
              showUserInfo={false}
              enableTilt={true}
              enableMobileTilt={false}
              behindGlowEnabled
              innerGradient="linear-gradient(145deg, rgba(96, 73, 110, 0.55) 0%, rgba(45, 212, 191, 0.2) 100%)"
            />
          </div>
        </div>

        <div
          className={`hero-fade-in mt-24 hidden items-center justify-between border-t border-white/5 pt-8 lg:flex ${mounted ? 'hero-fade-in--active' : ''}`}
          style={{ transitionDelay: '620ms' }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-cream-muted">
            Scroll to explore
          </p>
          <div className="flex items-center gap-3">
            <span className="hero-scroll-line h-px w-16 bg-gradient-to-r from-teal to-transparent" />
            <svg className="h-4 w-4 animate-bounce text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <p className="font-mono text-xs text-cream-muted">{site.location}</p>
        </div>
      </div>
    </section>
  );
}
