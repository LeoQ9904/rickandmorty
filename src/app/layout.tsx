import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Back from '@/components/Back';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rick and Morty App',
  description:
    'Explora el universo de Rick and Morty - Personajes, Episodios y Ubicaciones',
  icons: {
    icon: '/rick-and-morty.png',
    shortcut: '/rick-and-morty.png',
    apple: '/rick-and-morty.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/rick-and-morty.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <section className="px-20 py-2 flex justify-center">
          <Image
            src="/rick-and-morty.png"
            alt="Rick and Morty"
            width={150}
            height={100}
            priority
          />
        </section>
        <Nav />
        <div className="min-h-screen py-8">
          <Back />
          <div className="max-w-6xl mx-2 md:mx-auto">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
