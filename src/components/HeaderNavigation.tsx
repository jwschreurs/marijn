'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { pageCopy } from '@/data/site';

export function HeaderNavigation({ copy, trainings }: { copy: typeof pageCopy.header; trainings: { slug: string; title: string }[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trainingsOpen, setTrainingsOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const trainingsButton = useRef<HTMLButtonElement>(null);

  function close() {
    setMobileOpen(false);
    setTrainingsOpen(false);
  }

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setMobileOpen(false);
        setTrainingsOpen(false);
      }
    };
    const breakpoint = window.matchMedia('(max-width: 1120px)');
    const resized = () => {
      setMobileOpen(false);
      setTrainingsOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    breakpoint.addEventListener('change', resized);
    return () => {
      document.removeEventListener('pointerdown', outside);
      breakpoint.removeEventListener('change', resized);
    };
  }, []);

  return <div ref={root} className="header-navigation" onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  }} onKeyDown={event => {
    if (event.key !== 'Escape') return;
    if (trainingsOpen) {
      setTrainingsOpen(false);
      trainingsButton.current?.focus();
    } else if (mobileOpen) {
      setMobileOpen(false);
      mobileButton.current?.focus();
    }
  }}>
    <button ref={mobileButton} type="button" className="hamburger-button" aria-label={copy.accessibleLabel2}
      aria-expanded={mobileOpen} aria-controls="main-navigation" onClick={() => {
        setMobileOpen(!mobileOpen);
        setTrainingsOpen(false);
      }}>
      <span /><span /><span />
    </button>
    <nav id="main-navigation" className={`main-nav${mobileOpen ? ' main-nav--open' : ''}`} aria-label={copy.accessibleLabel3}>
      <Link href="/over-mij" className="nav-link" onClick={close}>{copy.navigation2}</Link>
      <Link href="/mindfulness" className="nav-link" onClick={close}>{copy.navigation3}</Link>
      <div className="nav-dropdown">
        <div className="nav-split" data-open={trainingsOpen}>
          <Link href="/trainingen" className="nav-link" onClick={close}>{copy.navigation4}</Link>
          <button ref={trainingsButton} className="nav-disclosure" type="button" aria-label={copy.accessibleLabel5} aria-expanded={trainingsOpen}
            aria-controls="training-navigation" onClick={() => setTrainingsOpen(!trainingsOpen)}>
            <span aria-hidden="true" className="nav-chevron" />
          </button>
        </div>
        <div id="training-navigation" className="nav-submenu nav-submenu--trainings" hidden={!trainingsOpen}>
          {trainings.map(training => <Link key={training.slug} href={`/trainingen/${training.slug}`} onClick={close}>{training.title}</Link>)}
        </div>
      </div>
      <Link href="/agenda" className="nav-link" onClick={close}>{copy.navigation5}</Link>
      <Link href="/faq" className="nav-link" onClick={close}>{copy.navigation11}</Link>
      <Link href="/blog" className="nav-link" onClick={close}>{copy.navigation8}</Link>
      <Link href="/contact" className="nav-link" onClick={close}>{copy.navigation6}</Link>
    </nav>
  </div>;
}
