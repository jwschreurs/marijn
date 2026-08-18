import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/over-marijn', label: 'Over Marijn' },
  { href: '/trainingen', label: 'Trainingen' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Ga naar de homepage">
          <Image
            src="/logo.png"
            alt="Logo van Marijn van der Lende"
            width={200}
            height={67}
            className="brand-logo"
            priority
          />
          <span className="brand-text">
            <strong>{siteConfig.name}</strong>
            <span>{siteConfig.tagline}</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Hoofdnavigatie">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="button primary header-cta">
          Kennismaken
        </Link>
      </div>
    </header>
  );
}
