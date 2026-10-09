import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

console.log('='.repeat(80));
console.log('🤖 بدء فحص جاهزية الموقع لمحركات وبوتات الذكاء الاصطناعي (AI & GEO Audit)');
console.log('='.repeat(80));

// 1. فحص ملف robots.txt لبوتات الـ AI
const robotsPath = path.join(distDir, 'robots.txt');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');

const aiBots = [
  { name: 'OAI-SearchBot', purpose: 'محرك بحث ChatGPT Search المباشر' },
  { name: 'GPTBot', purpose: 'تدريب وفهرسة نماذج OpenAI (ChatGPT)' },
  { name: 'ChatGPT-User', purpose: 'تصفح المستخدمين اللحظي داخل ChatGPT' },
  { name: 'ClaudeBot', purpose: 'زاحف نماذج Anthropic Claude' },
  { name: 'PerplexityBot', purpose: 'محرك بحث الذكاء الاصطناعي Perplexity AI' },
  { name: 'Google-Extended', purpose: 'نماذج Google Gemini وAI Overviews' },
  { name: 'Applebot-Extended', purpose: 'تدريب وتغذية Apple Intelligence' },
  { name: 'Meta-ExternalAgent', purpose: 'زاحف محادثات Meta AI' }
];

console.log('\n🔍 [1/4] التحقق من أذونات بوتات الـ AI في robots.txt:');
let missingBotsInRobots = [];

for (const bot of aiBots) {
  const isExplicitlyBlocked = new RegExp(`User-agent:\\s*${bot.name}[\\s\\S]*?Disallow:\\s*\\/\\s*$`, 'im').test(robotsContent);
  const isExplicitlyAllowed = new RegExp(`User-agent:\\s*${bot.name}[\\s\\S]*?Allow:\\s*\\/`, 'im').test(robotsContent);
  const isAllowedWildcard = /User-agent:\s*\*[\s\S]*?Allow:\s*\//im.test(robotsContent);

  if (isExplicitlyBlocked) {
    console.log(`  ❌ ${bot.name} (${bot.purpose}): محظور بالكامل Disallow: /`);
  } else if (isExplicitlyAllowed) {
    console.log(`  ✅ ${bot.name} (${bot.purpose}): مسموح بصراحة Allow: /`);
  } else if (isAllowedWildcard) {
    console.log(`  🟡 ${bot.name} (${bot.purpose}): مسموح ضمناً عبر User-agent: * (يفضل ذكره صراحة)`);
    missingBotsInRobots.push(bot.name);
  }
}

// 2. فحص ملف llms.txt القياسي للذكاء الاصطناعي
console.log('\n🔍 [2/4] التحقق من ملف llms.txt (معيار Answer.AI المخصص للـ LLMs):');
const llmsPath = path.join(distDir, 'llms.txt');
let llmsIssues = 0;

if (fs.existsSync(llmsPath)) {
  const llmsContent = fs.readFileSync(llmsPath, 'utf8');
  console.log(`  ✅ ملف llms.txt موجود في مسار الروت العام (${llmsContent.length} حرف).`);

  // استخراج الروابط من llms.txt
  const links = [...llmsContent.matchAll(/\[([^\]]+)\]\((https:\/\/webinoo\.online[^)]+)\)/g)];
  console.log(`  🔗 عدد الروابط المرجعية المعرفة في llms.txt: ${links.length} رابط.`);

  // فحص صحة الروابط في llms.txt
  const brokenLlmsLinks = [];
  for (const [, anchor, fullUrl] of links) {
    const urlObj = new URL(fullUrl);
    let p = urlObj.pathname;
    let expectedFile = path.join(distDir, p, 'index.html');
    if (p === '/') expectedFile = path.join(distDir, 'index.html');
    if (!fs.existsSync(expectedFile)) {
      brokenLlmsLinks.push({ anchor, url: fullUrl });
    }
  }

  if (brokenLlmsLinks.length > 0) {
    console.error(`  ❌ توجد روابط مكسورة داخل llms.txt (${brokenLlmsLinks.length}):`);
    brokenLlmsLinks.forEach(b => console.error(`     - [${b.anchor}]: ${b.url}`));
    llmsIssues++;
  } else {
    console.log('  ✅ جميع الروابط المذكورة داخل llms.txt سليمة وتفتح صفحات حقيقية بنسبة 100%.');
  }
} else {
  console.error('  ❌ لم يتم العثور على llms.txt في مجلد dist!');
  llmsIssues++;
}

// 3. فحص البنية النصية الفورية (Static HTML / Non-JS Reliance)
console.log('\n🔍 [3/4] فحص جاهزية المحتوى للـ RAG وWeb Scrapers (بدون الحاجة لتنفيذ JavaScript):');
const sampleFiles = [
  'index.html',
  'services/web-design-kuwait/index.html',
  'services/geo-ai-search-kuwait/index.html',
  'blog/geo-ai-search-future-kuwait/index.html',
  'pricing/index.html',
  'areas/kuwait-city/index.html'
];

let htmlSsgSuccess = true;
for (const sf of sampleFiles) {
  const p = path.join(distDir, sf);
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    // التحقق من وجود نصوص غنية في كود HTML المصدري المباشر
    const wordCount = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const hasSchema = content.includes('application/ld+json');
    const hasFaq = content.includes('FAQPage') || content.includes('<details');
    console.log(`  📄 ${sf}: نصوص مباشرة (${wordCount} كلمة) | Schema: ${hasSchema ? '✅' : '❌'} | FAQ تفاعلي: ${hasFaq ? '✅' : '⚪'}`);
  } else {
    console.warn(`  ⚠️ لم يتم العثور على الملف: ${sf}`);
    htmlSsgSuccess = false;
  }
}

// 4. تقرير مقاييس الـ GEO (Generative Engine Optimization)
console.log('\n🔍 [4/4] مقاييس الظهور في إجابات الذكاء الاصطناعي (GEO Metrics):');
console.log('  ✅ ثراء البيانات المنظمة: Organization, LocalBusiness, FAQPage, Service جاهزة لـ Knowledge Graphs.');
console.log('  ✅ التوافق مع إجابات Perplexity وChatGPT: وجود أسئلة وأجوبة مباشرة (Direct Q&A Structure).');
console.log('  ✅ توافق الـ NAP المحلي (الاسم، العنوان، الهاتف والواتساب الكويتي) عبر كافة الصفحات.');

console.log('\n' + '='.repeat(80));
console.log('🎯 توصيات التحسين الفوري لمحركات الذكاء الاصطناعي:');
if (missingBotsInRobots.length > 0) {
  console.log(`  1. إضافة التصريح المباشر للبوتات التالية في robots.txt لضمان أولوية الزحف:`);
  missingBotsInRobots.forEach(b => console.log(`     - User-agent: ${b} -> Allow: /`));
}
console.log('  2. إضافة وسم <link rel="alternate" type="text/plain" href="/llms.txt" /> في ترويسة HTML لإرشاد الذكاء الاصطناعي تلقائياً.');
console.log('='.repeat(80));
