import Link from 'next/link';
import { siteConfig } from '@/data/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">{siteConfig.name}</p>
          <p>{siteConfig.tagline}</p>
        </div>
        <div>
          <p className="footer-title">Pagina&apos;s</p>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/over-marijn">Over Marijn</Link>
            <Link href="/trainingen">Trainingen</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="footer-title">Contact</p>
          <p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <br />
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>{siteConfig.phone}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
