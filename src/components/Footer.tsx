import { getSiteContent } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';

export async function Footer() {
  const { copy, siteConfig } = await getSiteContent();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">{siteConfig.name}</p>
          <p>{siteConfig.tagline}</p>
        </div>
        <div>
          <p className="footer-title">{copy.footer.paragraph1}</p>
          <div className="footer-links">
            <Link href="/over-mij">{copy.footer.link1}</Link>
            <Link href="/mindfulness">{copy.footer.link2}</Link>
            <Link href="/trainingen">{copy.footer.link3}</Link>
            <Link href="/agenda">{copy.footer.link4}</Link>
            <Link href="/contact">{copy.footer.link5}</Link>
            <a
              href="/documenten/vmbn-ethische-gedragscode.pdf"
              target="_blank"
              rel="noreferrer"
            >{copy.footer.link6}</a>
          </div>
        </div>
        <div>
          <p className="footer-title">{copy.footer.paragraph2}</p>
          <p>
            <strong>{copy.footer.label1}</strong>{' '}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <br />
            <strong>{copy.footer.label2}</strong>{' '}
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>{siteConfig.phone}</a>
            <br />
            <strong>{copy.footer.label3}</strong> {siteConfig.kvk}
            <br />
            <strong>{copy.footer.label4}</strong> {siteConfig.btwId}
            <br />
            <strong>{copy.footer.label5}</strong> {siteConfig.agbCode}
          </p>
        </div>
        <div className="footer-certifications" aria-label={copy.footer.accessibleLabel1}>
          <a
            href="https://www.vmbn.nl"
            className="certification-link"
            aria-label={copy.footer.accessibleLabel2}
          >
            <Image
              src="/keurmerken/vmbn-beeldmerk.png"
              alt={copy.footer.alt1}
              width={1000}
              height={588}
              className="certification-logo certification-logo--vmbn"
            />
          </a>
          <a
            href="https://www.mindfulnessregister.nl/"
            className="certification-link"
            aria-label={copy.footer.accessibleLabel3}
          >
            <Image
              src="/keurmerken/smr-mindfulnesstrainer.png"
              alt={copy.footer.alt2}
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
