import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#f8f6f1',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'تصميم مواقع وتحسين الظهور في Google بالكويت | webinOO',
  description:
    'webinOO تصمم مواقع احترافية باللغة العربية وتساعد الأعمال ومقدمي الخدمات في الكويت على تحسين الظهور في Google والوصول إلى عملاء جدد.',
  keywords: [
    'تصميم مواقع الكويت',
    'شركة تصميم مواقع',
    'تحسين محركات البحث الكويت',
    'SEO الكويت',
    'مواقع إلكترونية عربية',
    'ظهور في Google الكويت',
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'webinOO | موقعك يعرّف الناس بشغلك',
    description:
      'تصميم مواقع احترافية وتحسين الظهور في Google للأعمال ومقدمي الخدمات في الكويت.',
    type: 'website',
    locale: 'ar_KW',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'webinOO | تصميم مواقع وتحسين الظهور في Google بالكويت',
    description:
      'مواقع عربية احترافية وحضور أوضح في Google للأعمال في الكويت.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'webinOO',
  description:
    'تصميم مواقع احترافية وتحسين الظهور في Google للأعمال ومقدمي الخدمات في الكويت.',
  areaServed: {
    '@type': 'Country',
    name: 'الكويت',
  },
  availableLanguage: ['Arabic', 'English'],
  serviceType: [
    'تصميم المواقع الإلكترونية',
    'تحسين محركات البحث',
    'تحسين الظهور المحلي',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
