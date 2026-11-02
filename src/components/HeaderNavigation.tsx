'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { pageCopy } from '@/data/site';

export function HeaderNavigation({ copy, trainings }: { copy: typeof pageCopy.header; trainings: { slug: string; title: string }[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'mindfulness' | 'trainingen' | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const mobileButton = useRef<HTMLButtonElement>(null);
  const mindfulnessButton = useRef<HTMLButtonElement>(null);
  const trainingsButton = useRef<HTMLButtonElement>(null);

  function close() {
    setMobileOpen(false);
    setOpenDropdown(null);
  }

  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    const breakpoint = window.matchMedia('(max-width: 1120px)');
    const resized = () => {
      setMobileOpen(false);
      setOpenDropdown(null);
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
    if (openDropdown) {
      setOpenDropdown(null);
      (openDropdown === 'mindfulness' ? mindfulnessButton : trainingsButton).current?.focus();
    } else if (mobileOpen) {
      setMobileOpen(false);
      mobileButton.current?.focus();
    }
  }}>
    <button ref={mobileButton} type="button" className="hamburger-button" aria-label={copy.accessibleLabel2}
      aria-expanded={mobileOpen} aria-controls="main-navigation" onClick={() => {
        setMobileOpen(!mobileOpen);
        setOpenDropdown(null);
      }}>
      <span /><span /><span />
    </button>
    <nav id="main-navigation" className={`main-nav${mobileOpen ? ' main-nav--open' : ''}`} aria-label={copy.accessibleLabel3}>
      <Link href="/over-mij" className="nav-link" onClick={close}>{copy.navigation2}</Link>
      <div className="nav-dropdown">
        <button ref={mindfulnessButton} className="nav-link nav-disclosure" type="button" aria-expanded={openDropdown === 'mindfulness'}
          aria-controls="mindfulness-navigation" onClick={() => setOpenDropdown(openDropdown === 'mindfulness' ? null : 'mindfulness')}>
          {copy.navigation3}<span aria-hidden="true" className="nav-chevron">⌄</span>
        </button>
        <div id="mindfulness-navigation" className="nav-submenu" hidden={openDropdown !== 'mindfulness'}>
          <Link href="/mindfulness" onClick={close}>{copy.navigation9}</Link>
          <Link href="/faq" onClick={close}>{copy.navigation7}</Link>
        </div>
      </div>
      <div className="nav-dropdown">
        <button ref={trainingsButton} className="nav-link nav-disclosure" type="button" aria-expanded={openDropdown === 'trainingen'}
          aria-controls="training-navigation" onClick={() => setOpenDropdown(openDropdown === 'trainingen' ? null : 'trainingen')}>
          {copy.navigation4}<span aria-hidden="true" className="nav-chevron">⌄</span>
        </button>
        <div id="training-navigation" className="nav-submenu nav-submenu--trainings" hidden={openDropdown !== 'trainingen'}>
          <Link href="/trainingen" onClick={close}>{copy.navigation10}</Link>
          {trainings.map(training => <Link key={training.slug} href={`/trainingen/${training.slug}`} onClick={close}>{training.title}</Link>)}
        </div>
      </div>
      <Link href="/agenda" className="nav-link" onClick={close}>{copy.navigation5}</Link>
      <Link href="/blog" className="nav-link" onClick={close}>{copy.navigation8}</Link>
      <Link href="/contact" className="nav-link nav-link--contact" onClick={close}>{copy.navigation6}</Link>
    </nav>
  </div>;
}
