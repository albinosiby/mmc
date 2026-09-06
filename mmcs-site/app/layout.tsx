import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/sections';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://mmcs-community.tatos.chatgpt.site'),
  title: {
    default: 'MMCS — Growing Together in Meghalaya',
    template: '%s | MMCS',
  },
  description:
    'Muktidata Multipurpose Cooperative Society supports farmers, women and sustainable livelihoods in the Garo Hills of Meghalaya.',
  openGraph: {
    title: 'MMCS — Growing Together',
    description: 'People, livelihoods and stronger communities in Meghalaya.',
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
