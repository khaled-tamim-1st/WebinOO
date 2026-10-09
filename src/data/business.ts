/**
 * Single source of truth for webinOO company and business details.
 * Placeholders are marked with [TODO: REVIEW] until confirmed with client.
 */

export interface BusinessConfig {
  name: string;
  legalName: string;
  tagline: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  phone: string;
  whatsappNumber: string;
  email?: string;
  address: {
    streetAddress: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    countryCode: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  areasServed: string[];
  areasServedEn: string[];
  workingHours: {
    ar: string;
    en: string;
  };
  social: {
    instagram: string;
    linkedin: string;
    x: string;
    github?: string;
  };
}

export const business: BusinessConfig = {
  name: 'webinOO',
  legalName: 'webinOO Kuwait Digital Atelier',
  tagline: {
    ar: 'تصميم مواقع وتحسين الظهور في Google بالكويت',
    en: 'Web Design, Local SEO & GEO in Kuwait',
  },
  description: {
    ar: 'webinOO تصمم مواقع احترافية باللغة العربية وتساعد الأعمال ومقدمي الخدمات في الكويت على تحسين الظهور في Google والوصول إلى عملاء جدد.',
    en: 'webinOO builds bespoke websites, local search authority, and Generative Engine Optimization (GEO) for service businesses across Kuwait.',
  },
  phone: '+20 155 463 7673',
  whatsappNumber: '201554637673',
  email: '',
  address: {
    streetAddress: 'خدمات سحابية وعن بُعد تغطي كافة مناطق ومحافظات الكويت',
    locality: 'مدينة الكويت وجميع المحافظات',
    region: 'الكويت',
    postalCode: '13000',
    country: 'الكويت',
    countryCode: 'KW',
  },
  geo: {
    // Kuwait City coordinates
    latitude: 29.3759,
    longitude: 47.9774,
  },
  areasServed: [
    'مدينة الكويت',
    'حولي',
    'السالمية',
    'الفروانية',
    'الجهراء',
    'الأحمدي',
    'مبارك الكبير',
    'الشويخ',
    'الري',
    'شرق',
  ],
  areasServedEn: [
    'Kuwait City',
    'Hawally',
    'Salmiya',
    'Farwaniya',
    'Jahra',
    'Ahmadi',
    'Mubarak Al-Kabeer',
    'Shuwaikh',
    'Al-Rai',
    'Sharq',
  ],
  workingHours: {
    ar: 'الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً',
    en: 'Sun - Thu: 9:00 AM - 6:00 PM',
  },
  social: {
    instagram: 'https://instagram.com/webinoo_kw',
    linkedin: 'https://linkedin.com/company/webinoo',
    x: 'https://x.com/webinoo_kw',
  },
};

/**
 * Generates direct WhatsApp message URL with pre-filled greeting.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMessage = 'السلام عليكم، أود معرفة المزيد عن خدمات webinOO للمواقع الإلكترونية وتحسين الظهور في Google.';
  const message = customMessage || defaultMessage;
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
