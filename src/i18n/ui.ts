export const defaultLang = 'ar' as const;
export const languages = {
  ar: 'العربية',
  en: 'English',
} as const;

export type SupportedLanguage = keyof typeof languages;

export const ui = {
  ar: {
    'nav.services': 'خدماتنا',
    'nav.industries': 'القطاعات',
    'nav.whyWebinoo': 'لماذا webinOO؟',
    'nav.process': 'كيف نعمل',
    'nav.portfolio': 'أعمالنا',
    'nav.pricing': 'الأسعار',
    'nav.about': 'عن webinOO',
    'nav.blog': 'المدونة',
    'nav.contact': 'تواصل معنا',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.cta': 'خلّنا نبدأ',

    'cta.primary': 'أبي أبدأ مشروعي',
    'cta.secondary': 'اكتشف خدماتنا',
    'cta.whatsapp': 'تواصل معنا على واتساب',
    'cta.discuss': 'احكِ لنا عن مشروعك',

    'footer.tagline': 'حضور رقمي أقوى للأعمال في الكويت.',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.backToTop': 'للأعلى ↑',

    'contact.badge.kuwait': 'الكويت',
    'contact.badge.devices': 'موقع يشتغل على كل الأجهزة',
    'contact.badge.google': 'حضورك على Google',

    'mockup.note': 'مثال توضيحي — وليس نتيجة حقيقية',
    'mockup.localBadge': 'خدمة قريبة منك في الكويت',
    'mockup.tagline': 'مصمم لناس الكويت وأعمالها',

    'search.stat1.title': 'محتوى',
    'search.stat1.desc': 'يجيب عن بحث عميلك',
    'search.stat2.title': 'محلي',
    'search.stat2.desc': 'مهيأ لسوق الكويت',
    'search.stat3.title': 'سريع',
    'search.stat3.desc': 'تجربة مريحة للجوال',
  },
  en: {
    'nav.services': 'Services',
    'nav.industries': 'Industries',
    'nav.whyWebinoo': 'Why webinOO?',
    'nav.process': 'Our Process',
    'nav.portfolio': 'Portfolio',
    'nav.pricing': 'Pricing',
    'nav.about': 'About Us',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact Us',
    'nav.faq': 'FAQ',
    'nav.cta': "Let's Start",

    'cta.primary': 'Start My Project',
    'cta.secondary': 'Explore Services',
    'cta.whatsapp': 'Chat on WhatsApp',
    'cta.discuss': 'Tell Us About Your Project',

    'footer.tagline': 'Stronger digital presence for Kuwait businesses.',
    'footer.rights': 'All rights reserved.',
    'footer.backToTop': 'Back to top ↑',

    'contact.badge.kuwait': 'Kuwait',
    'contact.badge.devices': 'Works smoothly on all devices',
    'contact.badge.google': 'Strong presence on Google & AI search',

    'mockup.note': 'Illustrative example — not an actual result',
    'mockup.localBadge': 'Nearby service in Kuwait',
    'mockup.tagline': 'Tailored for Kuwait businesses and people',

    'search.stat1.title': 'Content',
    'search.stat1.desc': 'Answers your clients search',
    'search.stat2.title': 'Local',
    'search.stat2.desc': 'Optimized for Kuwait market',
    'search.stat3.title': 'Fast',
    'search.stat3.desc': 'Mobile-first user experience',
  },
} as const;
