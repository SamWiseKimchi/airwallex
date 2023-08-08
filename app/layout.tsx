import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AirWallex Take Home Test',
  description: 'by Se Yeun Kim',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='light absolute h-screen w-screen flex flex-col justify-between '>
        {children}
      </body>
    </html>
  );
}
