import { getSiteContent } from '@/lib/content';
import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getSiteContent();
  return {

    title: copy.metadata.title,
    description: copy.metadata.description,
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl"><head><meta name="google-site-verification" content="AKS8MgVMQlkgjIvl0aD3PnSpN_2aS2ERT1tmzDfVTrk" /></head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
