import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: 'EduPro Institute – Professional IT Training in Kanpur',
    template: '%s | EduPro Institute',
  },
  description:
    'EduPro Institute offers industry-leading courses in Full Stack Development, Data Science, Cloud Computing, UI/UX Design and more. 100% placement assistance in Kanpur, UP.',
  keywords: [
    'IT training institute Kanpur',
    'full stack development course',
    'data science course Kanpur',
    'AWS cloud certification',
    'web development training',
    'EduPro Institute',
    'placement assistance Kanpur',
  ],
  authors: [{ name: 'EduPro Institute', url: 'https://edupro.in' }],
  creator: 'EduPro Institute',
  metadataBase: new URL('https://edupro.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://edupro.in',
    siteName: 'EduPro Institute',
    title: 'EduPro Institute – Professional IT Training in Kanpur',
    description:
      'Join EduPro Institute for hands-on IT training with 100% placement assistance. Courses in Web Dev, Data Science, Cloud & more.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EduPro Institute' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduPro Institute – Professional IT Training',
    description: 'Industry-aligned IT courses with 100% placement assistance in Kanpur.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: 'https://edupro.in' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'EduPro Institute',
  url: 'https://edupro.in',
  logo: 'https://edupro.in/logo.png',
  description: 'Professional IT training institute in Kanpur offering placement-focused courses.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Civil Lines',
    addressLocality: 'Kanpur',
    addressRegion: 'Uttar Pradesh',
    postalCode: '208001',
    addressCountry: 'IN',
  },
  email: 'info@edupro.in',
  sameAs: ['https://www.linkedin.com/company/edupro', 'https://www.instagram.com/edupro'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Sora:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>
        <ThemeProvider>
          <ReduxProvider>
            <Navbar />
            <main className="theme-bg">{children}</main>

            <footer className="theme-footer py-10 px-4">
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-sm">
                <div>
                  <p className="theme-footer-head font-bold text-lg mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
                    EduPro Institute
                  </p>
                  <p className="text-xs leading-relaxed opacity-60">
                    Empowering students with industry-ready skills since 2015. Your career transformation starts here.
                  </p>
                </div>

                <div>
                  <p className="theme-footer-head font-semibold mb-3">Quick Links</p>
                  <ul className="space-y-1.5">
                    {[['/', 'Home'], ['/courses', 'Courses'], ['/trainers', 'Trainers'], ['/contact', 'Contact']].map(([href, label]) => (
                      <li key={href}>
                        <a href={href} className="text-xs hover:opacity-100 opacity-60 transition-opacity hover:text-yellow-400">
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="theme-footer-head font-semibold mb-3">Contact</p>
                  <p className="text-xs leading-relaxed opacity-60">123 Civil Lines, Kanpur, UP 208001</p>
                  <p className="text-xs mt-1.5 opacity-60">✉️ info@edupro.in</p>
                </div>
              </div>

              <div className="max-w-6xl mx-auto mt-8 pt-6 border-t theme-footer-border text-center text-xs opacity-40">
                © {new Date().getFullYear()} EduPro Institute. All rights reserved.
              </div>
            </footer>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
