import { getSiteContent } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';



export async function Header() {
  const { copy } = await getSiteContent();
  const navigation = [
    { href: '/', label: copy.header.navigation1 },
    { href: '/over-mij', label: copy.header.navigation2 },
    { href: '/mindfulness', label: copy.header.navigation3 },
    { href: '/trainingen', label: copy.header.navigation4 },
    { href: '/agenda', label: copy.header.navigation5 },
    { href: '/contact', label: copy.header.navigation6 },
  ];
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

        <input className="menu-toggle" type="checkbox" id="menu-toggle" aria-hidden="true" />
        <label className="hamburger-button" htmlFor="menu-toggle" aria-label={copy.header.accessibleLabel2}>
          <span />
          <span />
          <span />
        </label>

        <nav className="main-nav" aria-label={copy.header.accessibleLabel3}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
