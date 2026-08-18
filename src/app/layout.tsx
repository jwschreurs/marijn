import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Marijn van der Lende | Mindfulness voor mens en werk',
  description:
    'Rustige en moderne website voor mindfulness, trainingen en begeleiding voor mens en werk.',
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
