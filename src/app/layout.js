import { Source_Sans_3, Libre_Baskerville } from 'next/font/google';
import './globals.css';

// Configure Source Sans 3 as your primary sans-serif font
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Configure Libre Baskerville as your serif font
const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata = {
  title: 'Cox Homeschool Academy',
  description: 'A beautiful, secure homeschool tracking platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${libreBaskerville.variable}`}>
      <body className="font-sans antialiased text-gray-800 bg-ivory">
        {children}
      </body>
    </html>
  );
}
