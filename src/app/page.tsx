'use client';

import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  Globe2,
  MapPin,
  Search,
  Smartphone,
} from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const contactHref = `https://wa.me/?text=${encodeURIComponent(
    'السلام عليكم، أود معرفة المزيد عن خدمات webinOO للمواقع الإلكترونية وتحسين الظهور في Google.'
  )}`;

  const faqs = [
    [
      'كم يستغرق إطلاق الموقع؟',
      'يعتمد الوقت على حجم المشروع وتجهيز المحتوى، لكننا نحدد معك جدولاً واضحاً من أول جلسة ونمشي خطوة بخطوة حتى الإطلاق.',
    ],
    [
      'هل الموقع مناسب للجوال؟',
      'نعم. نصمم الموقع ليعمل بسلاسة على الجوال والتابلت والكمبيوتر، لأن أغلب عملائك في الكويت يبحثون من هواتفهم.',
    ],
    [
      'هل تساعدونني في الظهور على Google؟',
      'نبني أساساً تقنياً ومحتوى عربياً واضحاً لمحركات البحث، ونهيئ بيانات النشاط التجاري والصفحات المحلية بحسب مجال عملك.',
    ],
    [
      'ماذا أحتاج أن أجهز قبل أن نبدأ؟',
      'يكفينا أن نعرف عن نشاطك وخدماتك وطريقة تواصلك مع العملاء. نساعدك في ترتيب المحتوى والصور والخطوات التالية.',
    ],
  ];

  return (
    <TooltipProvider>
      <div className="site-shell" dir="rtl">
        <header className="container topbar">
          <a className="brand" href="#home" aria-label="webinOO الصفحة الرئيسية">
            <img
              src="/webinoo-logo.png"
              alt="webinOO"
              width="1024"
              height="512"
            />
          </a>
          <nav className="navlinks" aria-label="التنقل الرئيسي">
            <a href="#services">خدماتنا</a>
            <a href="#why-webinoo">لماذا webinOO؟</a>
            <a href="#steps">كيف نعمل</a>
            <a href="#faq">الأسئلة الشائعة</a>
          </nav>
          <a className="button button-primary" href="#contact">
            خلّنا نبدأ <ArrowLeft size={16} />
          </a>
        </header>

        <main id="home">
          <section className="container hero" aria-labelledby="hero-title">
            <div className="hero-grid">
              <div className="reveal">
                <div className="eyebrow">حضورك الرقمي يبدأ من هنا</div>
                <h1 id="hero-title">
                  خلّ شغلك
                  <br />
                  ينشاف <em>أونلاين.</em>
                </h1>
                <p className="hero-copy">
                  نسوي لك موقع يليق بشغلك، ونرتب ظهورك في Google عشان العميل اللي
                  يدور خدمتك بالكويت يوصلك بسهولة.
                </p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#contact">
                    أبي أبدأ مشروعي <ArrowLeft size={17} />
                  </a>
                  <a className="button button-quiet" href="#services">
                    اكتشف خدماتنا
                  </a>
                </div>
                <div className="proofline">
                  <span>
                    <i /> عربي من البداية
                  </span>
                  <span>
                    <i /> مصمم للكويت
                  </span>
                  <span>
                    <i /> للجوال أولاً
                  </span>
                </div>
              </div>

              <div
                className="hero-art reveal delay-1"
                aria-label="معاينة موقع إلكتروني احترافي باللغة العربية"
              >
                <div className="orbit" />
                <div className="floating-note note-search">
                  <span className="note-icon">
                    <Search size={17} />
                  </span>
                  <span>
                    <strong>بحث محلي ذكي</strong>
                    <small>خدمة قريبة منك في الكويت</small>
                  </span>
                </div>
                <div className="mock-browser">
                  <div className="browser-top">
                    <b />
                    <b />
                    <b />
                    <div className="browser-address">yourbusiness.com</div>
                  </div>
                  <div className="mock-page">
                    <div className="mock-brand">دار | DAR STUDIO</div>
                    <h3>
                      مساحتك…
                      <br />
                      على ذوقك.
                    </h3>
                    <p>
                      تصميم داخلي يصنع فرقاً في كل زاوية. نرتب لك بداية أجمل في بيتك.
                    </p>
                    <span className="mock-cta" />
                  </div>
                </div>
                <div className="floating-note note-map">
                  <span className="note-icon">
                    <MapPin size={17} />
                  </span>
                  <span>
                    <strong>من الكويت إلى عميلك</strong>
                    <small>تفاصيلك واضحة، ومكانك معروف</small>
                  </span>
                </div>
                <div className="local-tag">مصمم لناس الكويت وأعمالها</div>
              </div>
            </div>
          </section>

          <div
            className="ticker"
            aria-label="مواقع إلكترونية، تحسين محركات البحث، حضور محلي، نمو للأعمال"
          >
            <div className="ticker-track">
              <span>
                مواقع إلكترونية <b>✳</b> تحسين محركات البحث <b>✳</b> حضور محلي{' '}
                <b>✳</b> نمو للأعمال <b>✳</b> مواقع إلكترونية <b>✳</b> تحسين
                محركات البحث <b>✳</b> حضور محلي <b>✳</b> نمو للأعمال <b>✳</b>
              </span>
            </div>
          </div>

          <section id="services" className="container section services-section">
            <div className="service-layout">
              <div className="service-intro">
                <div className="eyebrow">كل اللي يحتاجه حضورك</div>
                <h2
                  className="section-head"
                  style={{
                    fontSize: 'clamp(32px,4vw,48px)',
                    lineHeight: 1.35,
                    letterSpacing: '-.04em',
                    margin: '14px 0',
                  }}
                >
                  من أول فكرة…
                  <br />
                  إلى أول عميل.
                </h2>
                <p style={{ color: '#716b7a', lineHeight: 1.9, fontSize: 15 }}>
                  مو بس موقع شكله حلو. نبني لك حضور رقمي يجاوب عن أسئلة عميلك ويقربه
                  من قرار التواصل.
                </p>
                <a href="#contact" className="button button-quiet">
                  احكِ لنا عن مشروعك <ArrowLeft size={16} />
                </a>
              </div>
              <div className="service-list">
                <article className="service-item">
                  <span className="service-num">01</span>
                  <div>
                    <h3>تصميم وتطوير مواقع</h3>
                    <p>
                      موقع سريع، واضح، ويشتغل بكل سهولة على الجوال. واجهة تعكس جودة
                      شغلك وتحوّل الزيارة إلى تواصل.
                    </p>
                  </div>
                  <span className="service-arrow">
                    <ArrowUpLeft size={16} />
                  </span>
                </article>
                <article className="service-item">
                  <span className="service-num">02</span>
                  <div>
                    <h3>تحسين الظهور في Google</h3>
                    <p>
                      تهيئة صفحاتك ومحتواك بكلمات يبحث عنها عملاؤك، عشان تزيد فرصتك
                      بالظهور في نتائج البحث.
                    </p>
                  </div>
                  <span className="service-arrow">
                    <ArrowUpLeft size={16} />
                  </span>
                </article>
                <article className="service-item">
                  <span className="service-num">03</span>
                  <div>
                    <h3>الظهور المحلي في الكويت</h3>
                    <p>
                      خلّ نشاطك واضح للناس القريبة منك: موقعك، خدماتك، ومعلومات
                      التواصل كلها بمكان واحد.
                    </p>
                  </div>
                  <span className="service-arrow">
                    <ArrowUpLeft size={16} />
                  </span>
                </article>
                <article className="service-item">
                  <span className="service-num">04</span>
                  <div>
                    <h3>محتوى عربي يعبّر عنك</h3>
                    <p>
                      كلام مفهوم وقريب من عميلك، يشرح شنو تقدم وليش يختارك من بين
                      الخيارات.
                    </p>
                  </div>
                  <span className="service-arrow">
                    <ArrowUpLeft size={16} />
                  </span>
                </article>
              </div>
            </div>
          </section>

          <section id="why-webinoo" className="showcase">
            <div className="container showcase-grid">
              <div className="showcase-copy">
                <div className="eyebrow">مو مجرد صفحة على الإنترنت</div>
                <h2>
                  خلّ Google
                  <br />
                  يدلّهم عليك.
                </h2>
                <p>
                  إذا عميلك يبحث عن خدمتك في الكويت، لازم يلقى إجابة واضحة
                  وموثوقة. نبني موقعك على أساس قوي لمحركات البحث، ونرتب حضورك
                  الرقمي من أول زيارة.
                </p>
                <ul className="check-list">
                  <li>
                    <span className="check">
                      <Check size={13} />
                    </span>{' '}
                    صفحات مرتبة لمحركات البحث
                  </li>
                  <li>
                    <span className="check">
                      <Check size={13} />
                    </span>{' '}
                    تصميم متجاوب وسريع على الجوال
                  </li>
                  <li>
                    <span className="check">
                      <Check size={13} />
                    </span>{' '}
                    تفاصيل نشاطك ومعلومات التواصل واضحة
                  </li>
                </ul>
              </div>
              <div
                className="search-card"
                aria-label="مثال على نتيجة بحث لنشاط تجاري محلي"
              >
                <div className="search-label">
                  <span>G</span>
                  <span style={{ color: '#ea4335' }}>o</span>
                  <i>o</i>
                  <span style={{ color: '#4285f4' }}>g</span>
                  <strong>l</strong>
                  <em>e</em>
                </div>
                <div className="search-input">
                  <span>مصمم داخلي في الكويت</span>
                  <Search size={16} color="#7e7785" />
                </div>
                <div className="result">
                  <small>www.yourbusiness.com</small>
                  <h3>دار للتصميم الداخلي | الكويت</h3>
                  <p>
                    نحوّل أفكارك لمساحات مريحة وأنيقة. تعرّف على خدمات التصميم الداخلي
                    وتواصل معنا.
                  </p>
                  <div className="search-example-note">
                    مثال توضيحي — وليس نتيجة حقيقية
                  </div>
                </div>
                <div className="stats">
                  <div className="stat">
                    <strong>محتوى</strong>
                    <small>يجيب عن بحث عميلك</small>
                  </div>
                  <div className="stat">
                    <strong>محلي</strong>
                    <small>مهيأ لسوق الكويت</small>
                  </div>
                  <div className="stat">
                    <strong>سريع</strong>
                    <small>تجربة مريحة للجوال</small>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="steps" className="process-section section">
            <div className="container">
              <div className="section-head">
                <div className="eyebrow">بخطوات واضحة وبسيطة</div>
                <h2>
                  من سوالفنا الأولى…
                  <br />
                  لموقعك على الإنترنت.
                </h2>
                <p>
                  ما تحتاج تكون خبير تقني. نكون معك من فهم الفكرة إلى يوم الإطلاق.
                </p>
              </div>
              <div className="process-row">
                <article className="process-step">
                  <div className="step-number">01</div>
                  <h3>نسمع منك</h3>
                  <p>نتعرف على نشاطك، عملائك، وشنو تبي تحقق من موقعك.</p>
                </article>
                <article className="process-step">
                  <div className="step-number">02</div>
                  <h3>نرسم الطريق</h3>
                  <p>
                    نرتب الصفحات والمحتوى والكلمات المهمة لظهورك في البحث.
                  </p>
                </article>
                <article className="process-step">
                  <div className="step-number">03</div>
                  <h3>نبني ونراجع</h3>
                  <p>
                    نصمم تجربة تناسب شغلك ونراجعها معك قبل الإطلاق.
                  </p>
                </article>
                <article className="process-step">
                  <div className="step-number">04</div>
                  <h3>تنطلق أونلاين</h3>
                  <p>
                    موقعك يصير جاهز لعملائك، على كل شاشة وفي كل وقت.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="container section stories">
            <div className="section-head">
              <div className="eyebrow">الانطباع يصنع فرق</div>
              <h2>
                أول ما يلقاك العميل…
                <br />
                شنو يشوف؟
              </h2>
              <p>
                موقعك واجهتك الأولى. خله يشرح شغلك بثقة، حتى قبل أول مكالمة.
              </p>
            </div>
            <div className="story-layout">
              <article className="story-main">
                <span className="story-label">
                  تجربة الموقع اللي نصممها لك
                </span>
                <div>
                  <div className="quote-mark">01</div>
                  <p className="story-statement">
                    موقع يشرح خدمتك، يسهّل على العميل يلقى التفاصيل، ويفتح له باب
                    التواصل.
                  </p>
                  <div className="story-credit">
                    هدفنا: حضور واضح يبدأ من أول زيارة
                  </div>
                </div>
              </article>
              <div className="story-side">
                <article className="story-mini">
                  <span className="story-mini-tag">وضوح من البداية</span>
                  <p>يعرف عميلك شنو تقدم، وين تخدم، وشلون يبدأ معاك.</p>
                  <small>صفحات خدمات ومعلومات مرتبة</small>
                </article>
                <article className="story-mini">
                  <span className="story-mini-tag">كل التفاصيل بمكان واحد</span>
                  <p>خدماتك، موقعك، وطريقة التواصل معاك في واجهة سهلة.</p>
                  <small>تجربة مصممة لنشاطك</small>
                </article>
              </div>
            </div>
          </section>

          <section id="faq" className="faq-section section">
            <div className="container faq-layout">
              <div className="section-head">
                <div className="eyebrow">خل نوضح الصورة</div>
                <h2>أسئلة على بالك؟</h2>
                <p>
                  هذي إجابات سريعة، وإذا عندك سؤال ثاني نسمع منك بكل رحابة.
                </p>
              </div>
              <div className="faq-list">
                {faqs.map(([question, answer], index) => (
                  <div
                    className={`faq-item ${openFaq === index ? 'open' : ''}`}
                    key={question}
                  >
                    <button
                      className="faq-question"
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      aria-expanded={openFaq === index}
                    >
                      <span>{question}</span>
                      <span className="faq-plus">+</span>
                    </button>
                    <div className="faq-answer">{answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="container contact">
            <div className="contact-panel">
              <div>
                <div className="eyebrow">مشروعك يستاهل حضور أقوى</div>
                <h2>خلّنا نحكي عن شغلك.</h2>
                <p>
                  قول لنا شنو تقدم، ونشاركك أفكار تناسب مشروعك وتوصلك لعملائك.
                </p>
                <div className="contact-meta">
                  <span>
                    <MapPin size={14} /> الكويت
                  </span>
                  <span>
                    <Smartphone size={14} /> موقع يشتغل على كل الأجهزة
                  </span>
                  <span>
                    <Globe2 size={14} /> حضورك على Google
                  </span>
                </div>
              </div>
              <a
                className="button"
                href={contactHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                تواصل معنا على واتساب <ArrowLeft size={16} />
              </a>
            </div>
            <footer className="footer">
              <a className="brand" href="#home">
                <img
                  src="/webinoo-logo.png"
                  alt="webinOO"
                  width="1024"
                  height="512"
                />
              </a>
              <span>حضور رقمي أقوى للأعمال في الكويت.</span>
              <nav className="footer-nav" aria-label="روابط إضافية">
                <a href="#services">الخدمات</a>
                <a href="#steps">كيف نعمل</a>
                <a href="#faq">الأسئلة الشائعة</a>
                <a href="#home">للأعلى ↑</a>
              </nav>
              <span>© {new Date().getFullYear()} webinOO</span>
            </footer>
          </section>
        </main>
        <Toaster />
      </div>
    </TooltipProvider>
  );
}
