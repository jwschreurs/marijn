import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/over-mij', label: 'Over mij' },
  { href: '/mindfulness', label: 'Mindfulness' },
  { href: '/trainingen', label: 'Trainingen' },
  { href: '/agenda', label: 'Agenda' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Ga naar de homepage">
          <Image
            src="/logo.png"
            alt="Logo van Marijn met aandacht"
            width={1600}
            height={500}
            className="brand-logo"
            priority
          />
        </Link>

        <nav className="main-nav" aria-label="Hoofdnavigatie">
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
