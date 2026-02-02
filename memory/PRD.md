# الحصن (Al-Hisn) - SafeLink Guard

## نظرة عامة
تطبيق فحص الروابط المشبوهة للمستخدمين العرب - يساعد في الكشف عن روابط التصيد والبرمجيات الخبيثة.

## التقنيات المستخدمة
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Glassmorphism Design
- **UI Components**: Radix UI (shadcn/ui)
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod

## الميزات المُنفذة
1. **فاحص الروابط (Scanner)**
   - فحص فوري للروابط
   - تقييم المخاطر (آمن/مشبوه/خطير)
   - مسح رموز QR
   - لصق من الحافظة

2. **سجل الفحص (History)**
   - تتبع جميع الروابط المفحوصة
   - الوصول السريع للنتائج السابقة

3. **الخزنة الآمنة (Vault)**
   - حفظ الروابط الموثوقة
   - إضافة ملاحظات مخصصة

4. **نصائح أمنية (Tips)**
   - محتوى تعليمي بالعربية والإنجليزية
   - فئات متعددة (مكافحة التصيد، البرمجيات الخبيثة، الخصوصية)

5. **الإعدادات (Settings)**
   - دعم اللغة العربية (RTL) والإنجليزية (LTR)
   - وضع الضيف

## البنية الهيكلية
```
src/
├── components/
│   ├── layout/ (Layout, BottomNav)
│   ├── ui/ (Radix UI components)
│   └── QRScanner.tsx
├── contexts/AppContext.tsx
├── hooks/ (useTranslation, use-mobile)
├── lib/ (scanner, translations, utils)
└── pages/ (Scanner, History, Vault, Tips, Settings)
```

## الحالة الحالية
- ✅ التطبيق يعمل بنجاح على المنفذ 3000
- ✅ الواجهة العربية RTL تعمل
- ✅ التصميم Glassmorphism مُطبق

## التاريخ
- **2 فبراير 2026**: استيراد المشروع من GitHub وتشغيله

## التحسينات المستقبلية (Backlog)
- [ ] P0: ربط قاعدة بيانات خلفية للمزامنة
- [ ] P1: تكامل مع قاعدة بيانات التهديدات الحية
- [ ] P1: إشعارات الدفع للتنبيهات
- [ ] P2: إضافة متصفح مرافق
- [ ] P2: مشاركة نتائج الفحص
