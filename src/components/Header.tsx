import { getSiteContent } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderNavigation } from './HeaderNavigation';

export async function Header() {
  const { copy, trainingen } = await getSiteContent();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={copy.header.accessibleLabel1}>
          <Image
            src="/logo.png"
            alt={copy.header.alt1}
            width={1600}
            height={500}
            className="brand-logo"
            priority
          />
        </Link>

        <HeaderNavigation copy={copy.header} trainings={trainingen.map(({ slug, title }) => ({ slug, title }))} />
      </div>
    </header>
  );
}
