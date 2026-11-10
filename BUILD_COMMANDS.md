# أوامر بناء PHANTOM 2.0

هذا الأرشيف يحتوي المشروع كاملاً، لا تنشئ مشروع Expo جديداً ولا تستبدل ملفات التطبيق.

```bash
cd phantom
npm install
npx expo-doctor
npx expo start -c
```

لبناء Android عبر EAS:

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

ملاحظات:
- المشروع مبني على Expo SDK 51 كما في النسخة المرفوعة؛ لم أقم بترقية SDK حتى لا أغيّر بيئة البناء الأساسية دون طلب.
- ملف الخط المحلي موجود في `assets/fonts/`.
- شعار الواجهة SVG افتراضياً. للتبديل إلى WEBP غيّر `APP_LOGO_FORMAT` في `src/constants/config.js` إلى `webp`.
- أيقونة تطبيق Android/iOS تبقى PNG داخل `app.json`؛ شعار SVG/WEBP يظهر داخل واجهة التطبيق.
- لا تنفّذ `supabase/schema.sql` على قاعدة PHANTOM الحالية.
