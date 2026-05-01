# الحوتان للاستثمارات العقارية

موقع عقاري احترافي مبني بـ React + TypeScript + Vite + Tailwind CSS

## 🚀 تشغيل المشروع محلياً

```bash
# تثبيت الحزم
npm install

# تشغيل بيئة التطوير
npm run dev
```

ثم افتح: http://localhost:8080

## 🏗️ بناء الإنتاج

```bash
npm run build
```

## ⚙️ إعداد متغيرات البيئة

انسخ ملف `.env.example` وأعد تسميته إلى `.env`:

```bash
cp .env.example .env
```

ثم أضف قيم Supabase الخاصة بك.

## 🌐 النشر على Vercel + GoDaddy

1. ارفع المشروع على GitHub
2. ادخل على vercel.com وابدأ مشروع جديد من GitHub
3. اضغط Deploy مباشرة (Vercel يكتشف Vite تلقائياً)
4. بعد النشر: Project Settings → Domains → أضف alhawtan.com
5. في GoDaddy → DNS:
   - A Record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

## 🛠️ التقنيات المستخدمة

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- shadcn/ui
- React Router DOM
- Zod (التحقق من النماذج)
- Supabase

## 📞 تعديل رقم الواتساب

في ملف `src/pages/Index.tsx` غيّر:
```
const sanitizedPhone = "966559175919";
```
