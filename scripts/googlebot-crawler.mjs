import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const GOOGLEBOT_DESKTOP_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const GOOGLEBOT_MOBILE_UA = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.69 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const SITE_ORIGIN = 'https://webinoo.online';

console.log('='.repeat(80));
console.log('🚀 بدء فحص واختبار زواحف جوجل (Googlebot Crawler Simulation)');
console.log(`🌐 النطاق الأساسي: ${SITE_ORIGIN}`);
console.log(`📂 مجلد المخرجات المفحوص: ${distDir}`);
console.log(`🤖 Googlebot Desktop UA: ${GOOGLEBOT_DESKTOP_UA}`);
console.log(`📱 Googlebot Mobile UA: ${GOOGLEBOT_MOBILE_UA}`);
console.log('='.repeat(80));

if (!fs.existsSync(distDir)) {
  console.error(`❌ مجلد dist غير موجود! يرجى تشغيل astro build أولاً.`);
  process.exit(1);
}

// 1. جمع كافة ملفات HTML في dist
function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles(distDir);
console.log(`📄 تم العثور على ${htmlFiles.length} صفحة HTML تم إنشاؤها.\n`);

// تجميع كل المسارات المتاحة
const availableRoutes = new Set();
for (const file of htmlFiles) {
  let rel = path.relative(distDir, file).replace(/\\/g, '/');
  let route;
  if (rel === 'index.html') {
    route = '/';
  } else if (rel.endsWith('/index.html')) {
    route = '/' + rel.slice(0, -'/index.html'.length) + '/';
  } else if (rel.endsWith('.html')) {
    route = '/' + rel.slice(0, -'.html'.length);
  }
  availableRoutes.add(route);
}

// 2. فحص robots.txt
console.log('🔍 [1/5] فحص ملف robots.txt ...');
const robotsPath = path.join(distDir, 'robots.txt');
let robotsTxtExists = fs.existsSync(robotsPath);
let robotsDisallowsGooglebot = false;
let sitemapRefRobots = null;

if (robotsTxtExists) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  console.log('  ✅ ملف robots.txt موجود.');
  if (/User-agent:\s*Googlebot[\s\S]*?Disallow:\s*\/\s*$/im.test(robotsContent)) {
    robotsDisallowsGooglebot = true;
    console.warn('  ⚠️ تحذير: ملف robots.txt يحظر Googlebot بشكل صريح!');
  } else {
    console.log('  ✅ Googlebot مسموح له بالزحف (Allow: / أو لم يتم حظره).');
  }

  const sitemapMatch = robotsContent.match(/Sitemap:\s*(\S+)/i);
  if (sitemapMatch) {
    sitemapRefRobots = sitemapMatch[1];
    console.log(`  ✅ تم العثور على إشارة لخريطة الموقع في robots.txt: ${sitemapRefRobots}`);
  } else {
    console.warn('  ⚠️ تحذير: لم يتم تضمين رابط Sitemap في robots.txt!');
  }
} else {
  console.error('  ❌ لم يتم العثور على robots.txt في dist!');
}

// 3. فحص خريطة الموقع sitemap
console.log('\n🔍 [2/5] فحص خريطة الموقع Sitemap XML ...');
let sitemapUrls = new Set();
const sitemapIndexFiles = ['sitemap-index.xml', 'sitemap.xml', 'sitemap-0.xml'];
let foundSitemaps = [];

for (const smName of sitemapIndexFiles) {
  const smPath = path.join(distDir, smName);
  if (fs.existsSync(smPath)) {
    foundSitemaps.push(smName);
    const content = fs.readFileSync(smPath, 'utf8');
    const locMatches = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)];
    for (const match of locMatches) {
      const url = match[1].trim();
      if (!url.endsWith('.xml')) {
        sitemapUrls.add(url);
      }
    }
  }
}

// قراءة أيضاً أي sitemap-*.xml أخرى
const allDistFiles = fs.readdirSync(distDir);
for (const file of allDistFiles) {
  if (file.startsWith('sitemap-') && file.endsWith('.xml') && !foundSitemaps.includes(file)) {
    foundSitemaps.push(file);
    const content = fs.readFileSync(path.join(distDir, file), 'utf8');
    const locMatches = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)];
    for (const match of locMatches) {
      const url = match[1].trim();
      if (!url.endsWith('.xml')) {
        sitemapUrls.add(url);
      }
    }
  }
}

console.log(`  ✅ ملفات Sitemap التي تم اكتشافها: ${foundSitemaps.join(', ')}`);
console.log(`  📍 عدد الروابط المستخرجة من السايت ماب: ${sitemapUrls.size}`);

// التحقق من أن روابط السايت ماب موجودة فعلياً
let brokenSitemapUrls = [];
for (const smUrl of sitemapUrls) {
  try {
    const u = new URL(smUrl);
    let p = u.pathname;
    if (!availableRoutes.has(p) && !availableRoutes.has(p.endsWith('/') ? p.slice(0, -1) : p + '/')) {
      brokenSitemapUrls.push(smUrl);
    }
  } catch (e) {
    brokenSitemapUrls.push(smUrl);
  }
}

// التحقق من أن خريطة الموقع لا تحوي صفحات 404
const sitemapContains404 = [...sitemapUrls].some(u => u.includes('404'));
if (sitemapContains404) {
  console.warn('  ⚠️ تحذير: خريطة الموقع تحتوي على صفحات 404 يجب استبعادها!');
} else {
  console.log('  ✅ خريطة الموقع نقية ولا تحتوي على أي صفحات أخطاء 404.');
}

if (brokenSitemapUrls.length > 0) {
  console.error(`  ❌ روابط في السايت ماب غير موجودة كصفحات حقيقية:`);
  brokenSitemapUrls.forEach(u => console.error(`     - ${u}`));
} else {
  console.log('  ✅ كل الروابط الموجودة في السايت ماب صالحة وموجودة بنسبة 100%.');
}

// 4. فحص كل صفحة بالكامل كما يراها بوت جوجل
console.log('\n🔍 [3/5] فحص تفصيلي لكل صفحة لمحاكاة Googlebot Desktop & Mobile ...');

const auditResults = [];
let totalIssues = 0;
let totalWarnings = 0;

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');
  let route = '/' + (relPath === 'index.html' ? '' : relPath.replace(/\/index\.html$/, '/').replace(/\.html$/, ''));
  if (route.length > 1 && !route.endsWith('/')) {
    // Astro uses trailingSlash: 'always'
    route += '/';
  }

  // تخطي صفحات 404
  const is404Page = relPath.includes('404') || route.includes('404');

  const html = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  const warnings = [];

  // أ) Title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : null;
  if (!title) {
    issues.push('مفقود: عنصر <title> غير موجود أو فارغ');
  } else if (title.length < 15) {
    warnings.push(`عنوان الصفحة قصير جداً (${title.length} حرف): "${title}"`);
  }

  // ب) Meta Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content="([^"]*)"/i) ||
                    html.match(/<meta\s+name=["']description["']\s+content='([^']*)'/i) ||
                    html.match(/<meta\s+content="([^"]*)"\s+name=["']description["']/i) ||
                    html.match(/<meta\s+content='([^']*)'\s+name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : null;
  if (!description && !is404Page) {
    issues.push('مفقود: وصف الصفحة <meta name="description"> غير موجود');
  } else if (description && description.length < 30 && !is404Page) {
    warnings.push(`وصف الصفحة قصير (${description.length} حرف)`);
  }

  // ج) Viewport (Google Mobilebot)
  const hasViewport = /<meta\s+name=["']viewport["']/i.test(html);
  if (!hasViewport) {
    issues.push('فشل Mobile-Friendly: مفقود <meta name="viewport">');
  }

  // د) Robots Meta
  const robotsMetaMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i) ||
                          html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']robots["']/i);
  let robotsDirectives = robotsMetaMatch ? robotsMetaMatch[1].toLowerCase() : null;
  if (robotsDirectives && robotsDirectives.includes('noindex') && !is404Page) {
    issues.push(`⚠️ الصفحة تحمل وسم noindex يمنع جوجل من أرشفتها: content="${robotsDirectives}"`);
  }

  // هـ) Canonical Tag
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i) ||
                         html.match(/<link\s+href=["']([^"']*)["']\s+rel=["']canonical["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : null;
  if (!canonical && !is404Page) {
    issues.push('مفقود: وسم Canonical URL غير موجود');
  } else if (canonical) {
    if (!canonical.startsWith('https://')) {
      warnings.push(`رابط الكانونيكال لا يبدأ بـ HTTPS: ${canonical}`);
    }
  }

  // و) Hreflang Tags (للمواقع ثنائية اللغة)
  const hreflangs = [...html.matchAll(/<link\s+rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/gi)];
  // عكس الترتيب أيضاً لو كان href قبل hreflang
  const hreflangs2 = [...html.matchAll(/<link\s+href=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["']/gi)];
  const totalHreflangs = hreflangs.length + hreflangs2.length;
  if (totalHreflangs === 0 && !is404Page) {
    warnings.push('لا توجد وسوم hreflang للتبديل بين اللغتين (عربي/إنجليزي)');
  }

  // ز) OpenGraph / Social Sharing
  const ogTitle = html.match(/<meta\s+property=["']og:title["']/i);
  const ogDesc = html.match(/<meta\s+property=["']og:description["']/i);
  const ogImage = html.match(/<meta\s+property=["']og:image["']/i);
  if ((!ogTitle || !ogDesc || !ogImage) && !is404Page) {
    warnings.push('وسوم OpenGraph غير مكتملة (og:title / og:description / og:image)');
  }

  // ح) Schema.org Structured Data (JSON-LD)
  const jsonLdBlocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  let validSchemas = 0;
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block[1]);
      validSchemas++;
    } catch (err) {
      issues.push(`خطأ في صيغة البيانات المنظمة JSON-LD: ${err.message}`);
    }
  }

  // ط) Internal Links Extraction & Broken Link Checking
  const links = [...html.matchAll(/<a\s+[^>]*href=["']([^"']*)["']/gi)].map(m => m[1]);
  const brokenLinks = [];
  for (let href of links) {
    href = href.trim();
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }
    if (href.startsWith('http://') || href.startsWith('https://')) {
      // إذا كان رابط خارجي، نتخطاه هنا، أو لو رابط لنفس النطاق
      if (href.startsWith(SITE_ORIGIN)) {
        href = href.slice(SITE_ORIGIN.length);
      } else {
        continue;
      }
    }

    // إزالة query params و hash
    const cleanHref = href.split('?')[0].split('#')[0];
    if (!cleanHref) continue;

    // تطبيع المسار
    let testPath = cleanHref;
    if (!testPath.startsWith('/')) {
      // مسار نسبي
      testPath = path.posix.resolve(route, cleanHref);
    }

    const pathWithoutSlash = testPath.endsWith('/') ? testPath.slice(0, -1) : testPath;
    const pathWithSlash = testPath.endsWith('/') ? testPath : testPath + '/';

    // فحص ما إذا كان المسار مسار صفحة أو ملف في dist
    const existsAsRoute = availableRoutes.has(pathWithSlash) || availableRoutes.has(pathWithoutSlash);
    const existsAsFile = fs.existsSync(path.join(distDir, testPath.replace(/^\//, '')));

    if (!existsAsRoute && !existsAsFile && !testPath.startsWith('/api/')) {
      brokenLinks.push(href);
    }
  }

  if (brokenLinks.length > 0) {
    issues.push(`روابط داخلية مكسورة (${brokenLinks.length}): ${[...new Set(brokenLinks)].slice(0, 5).join(', ')}`);
  }

  // ي) الصور و alt attributes
  const imgTagsWithoutAlt = [...html.matchAll(/<img(?![^>]*\balt=)[^>]*>/gi)];
  if (imgTagsWithoutAlt.length > 0) {
    warnings.push(`توجد صور بدون وسم alt (${imgTagsWithoutAlt.length} صور)`);
  }

  // ك) H1 Tag
  const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
  if (h1Count === 0 && !is404Page) {
    warnings.push('مفقود: لا يوجد وسم <h1> رئيسي في الصفحة');
  } else if (h1Count > 1 && !is404Page) {
    warnings.push(`تنبيه: يوجد أكثر من وسم <h1> (${h1Count} وسوم)`);
  }

  totalIssues += issues.length;
  totalWarnings += warnings.length;

  auditResults.push({
    route,
    title,
    description: description ? (description.slice(0, 50) + '...') : null,
    canonical,
    validSchemas,
    issues,
    warnings,
    is404Page
  });
}

// عرض النتائج
console.log('='.repeat(80));
console.log('📊 تقرير فحص الصفحات (Page-by-Page Audit Summary):');
console.log('='.repeat(80));

for (const res of auditResults) {
  const statusEmoji = res.issues.length === 0 ? (res.warnings.length === 0 ? '✅' : '🟡') : '❌';
  console.log(`${statusEmoji} المسار: ${res.route}`);
  if (res.title) console.log(`   العنوان: ${res.title}`);
  if (res.canonical) console.log(`   الكانونيكال: ${res.canonical}`);
  if (res.validSchemas > 0) console.log(`   البيانات المنظمة (Schema JSON-LD): ${res.validSchemas} مخطط متوفر`);

  if (res.issues.length > 0) {
    console.log(`   ❌ الأخطاء الحرجة (${res.issues.length}):`);
    res.issues.forEach(iss => console.log(`      - ${iss}`));
  }
  if (res.warnings.length > 0) {
    console.log(`   ⚠️ التنبيهات (${res.warnings.length}):`);
    res.warnings.forEach(warn => console.log(`      - ${warn}`));
  }
  console.log('-'.repeat(60));
}

console.log('\n' + '='.repeat(80));
console.log('🎯 النتيجة الإجمالية للفحص:');
console.log(`  🔹 إجمالي الصفحات المفحوصة: ${auditResults.length}`);
console.log(`  🔹 الأخطاء الحرجة المكتشفة: ${totalIssues}`);
console.log(`  🔹 التنبيهات والتحسينات المكتشفة: ${totalWarnings}`);
if (totalIssues === 0) {
  console.log('  🎉 ممتاز! جميع الصفحات مهيأة بنجاح ومؤهلة للزحف والأرشفة بواسطة Googlebot دون أي أخطاء مانعة.');
} else {
  console.log('  ⚠️ يرجى مراجعة الأخطاء المذكورة أعلاه لضمان فهرسة صفحاتك بكفاءة 100%.');
}
console.log('='.repeat(80));
