import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Marijn met aandacht | Mindfulness voor mens en werk',
  description:
    'Mindfulness, training en persoonlijke begeleiding voor meer rust, balans en bewustzijn in leven en werk.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
