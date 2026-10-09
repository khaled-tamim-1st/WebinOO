import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

// خادم محلي خفيف لخدمة ملفات dist
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  } else if (!path.extname(reqPath)) {
    reqPath += '/index.html';
  }

  let filePath = path.join(distDir, reqPath);
  if (!fs.existsSync(filePath)) {
    // 404 fallback
    const fallback404 = req.url.startsWith('/en') ? path.join(distDir, 'en', '404', 'index.html') : path.join(distDir, '404.html');
    if (fs.existsSync(fallback404)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(fallback404));
      return;
    }
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath);
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };

  res.writeHead(200, {
    'Content-Type': mimeTypes[ext] || 'application/octet-stream',
    'X-Robots-Tag': 'all'
  });
  res.end(fs.readFileSync(filePath));
});

const PORT = 4329;
server.listen(PORT, async () => {
  console.log(`📡 سيرفر الاختبار يعمل على http://localhost:${PORT}`);

  const sampleRoutes = [
    '/',
    '/robots.txt',
    '/sitemap-index.xml',
    '/sitemap-0.xml',
    '/services/',
    '/services/web-design-kuwait/',
    '/services/geo-ai-search-kuwait/',
    '/areas/',
    '/areas/kuwait-city/',
    '/areas/salmiya/',
    '/industries/',
    '/industries/clinics-medical-websites/',
    '/blog/',
    '/blog/geo-ai-search-future-kuwait/',
    '/pricing/',
    '/contact/',
    '/en/',
    '/en/services/',
    '/en/services/web-design-kuwait/',
    '/en/areas/kuwait-city/',
    '/en/blog/',
    '/en/pricing/',
    '/en/contact/',
    '/non-existent-page-test-404'
  ];

  const GOOGLEBOT_MOBILE = 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.69 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
  const GOOGLEBOT_DESKTOP = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

  let allPassed = true;

  console.log('\n🤖 إرسال طلبات محاكاة لبوتات Googlebot (Mobile & Desktop):');
  console.log('='.repeat(75));

  for (const r of sampleRoutes) {
    const isMobile = Math.random() > 0.5;
    const ua = isMobile ? GOOGLEBOT_MOBILE : GOOGLEBOT_DESKTOP;
    const botType = isMobile ? 'Googlebot Smartphone' : 'Googlebot Desktop';

    try {
      const response = await fetch(`http://localhost:${PORT}${r}`, {
        headers: {
          'User-Agent': ua,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'ar,en;q=0.9',
        }
      });

      const text = await response.text();
      const status = response.status;
      const contentType = response.headers.get('content-type');

      const expectedStatus = r.includes('404') || r.includes('non-existent') ? 404 : 200;
      const statusOk = status === expectedStatus;

      console.log(`${statusOk ? '✅' : '❌'} [${status}] [${botType}] ${r} (${contentType})`);

      if (!statusOk) {
        allPassed = false;
        console.error(`   ❌ حالة غير متوقعة: حصلنا على ${status} بدلاً من ${expectedStatus}`);
      }

      // التحقق من أن الصفحة تحتوي على وسم head و body إذا كانت HTML
      if (contentType && contentType.includes('text/html') && expectedStatus === 200) {
        if (!text.includes('<title>') || !text.includes('webinOO')) {
          console.error(`   ❌ محتوى HTML غير مكتمل أو فارغ!`);
          allPassed = false;
        }
      }
    } catch (e) {
      console.error(`❌ فشل الطلب لـ ${r}:`, e.message);
      allPassed = false;
    }
  }

  console.log('='.repeat(75));
  if (allPassed) {
    console.log('🎉 جميع استجابات خادم HTTP لبوتات جوجل اجتازت الفحص بنجاح 100%!');
  } else {
    console.log('❌ هناك بعض الإخفاقات في استجابة الخادم.');
  }

  server.close();
  process.exit(allPassed ? 0 : 1);
});
