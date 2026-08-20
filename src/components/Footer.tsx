import Image from 'next/image';
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
            <Link href="/over-mij">Over mij</Link>
            <Link href="/mindfulness">Mindfulness</Link>
            <Link href="/trainingen">Trainingen</Link>
            <Link href="/agenda">Agenda</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="footer-title">Contact</p>
          <p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <br />
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>{siteConfig.phone}</a>
            <br />
            KvK {siteConfig.kvk}
          </p>
        </div>
        <div className="footer-certifications" aria-label="Keurmerken">
          <a
            href="https://www.vmbn.nl"
            className="certification-link"
            aria-label="Bezoek de website van VMBN"
          >
            <Image
              src="/keurmerken/vmbn-beeldmerk.png"
              alt="VMBN-keurmerk"
              width={1000}
              height={588}
              className="certification-logo certification-logo--vmbn"
            />
          </a>
          <a
            href="https://www.mindfulnessregister.nl/"
            className="certification-link"
            aria-label="Bezoek het Mindfulness Register"
          >
            <Image
              src="/keurmerken/smr-mindfulnesstrainer.png"
              alt="SMR Register mindfulnesstrainer"
              width={2746}
              height={689}
              className="certification-logo certification-logo--smr"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
