const fs = require('fs');
const path = require('path');

const srcLight = 'C:/Users/Dell/.gemini/antigravity/brain/c57d00ec-220c-4ee5-b91e-ccf37f6cbba7/.user_uploaded/media_1791527569561.png';
const srcDark = 'C:/Users/Dell/.gemini/antigravity/brain/c57d00ec-220c-4ee5-b91e-ccf37f6cbba7/.user_uploaded/media_1791527569562.png';
const srcFavicon = 'C:/Users/Dell/.gemini/antigravity/brain/c57d00ec-220c-4ee5-b91e-ccf37f6cbba7/.user_uploaded/media_1791527594176.jpg';

// Backup original logo if needed
if (fs.existsSync('public/webinoo-logo.png') && !fs.existsSync('public/webinoo-logo-backup.png')) {
  fs.copyFileSync('public/webinoo-logo.png', 'public/webinoo-logo-backup.png');
}

// 1. Copy light logo as the main webinoo-logo.png and webinoo-logo-light.png
fs.copyFileSync(srcLight, 'public/webinoo-logo.png');
fs.copyFileSync(srcLight, 'public/webinoo-logo-light.png');
console.log('Copied light logo to public/webinoo-logo.png and public/webinoo-logo-light.png');

// 2. Copy dark logo
fs.copyFileSync(srcDark, 'public/webinoo-logo-white.png');
fs.copyFileSync(srcDark, 'public/webinoo-logo-dark.png');
console.log('Copied dark logo to public/webinoo-logo-white.png and public/webinoo-logo-dark.png');

// 3. Copy favicon
fs.copyFileSync(srcFavicon, 'public/favicon.jpg');
fs.copyFileSync(srcFavicon, 'public/favicon.png');
fs.copyFileSync(srcFavicon, 'public/apple-touch-icon.png');
console.log('Copied favicon to public/favicon.png and apple-touch-icon.png');

// 4. Create SVG embedding the base64 favicon for SVG-preferring browsers
const faviconBase64 = fs.readFileSync(srcFavicon).toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <clipPath id="r"><rect width="512" height="512" rx="104"/></clipPath>
  <image href="data:image/jpeg;base64,${faviconBase64}" width="512" height="512" clip-path="url(#r)"/>
</svg>\n`;

fs.writeFileSync('public/favicon.svg', svgContent, 'utf-8');
console.log('Updated public/favicon.svg with infinity emblem!');
