/**
 * تنظیمات برند و داده‌های کاتالوگ
 * همه مبلغ‌ها به تومان و صرفاً نمونه هستند.
 * برای نامشخص‌بودن قیمت، مقدار null قرار دهید.
 */
window.STORE_CONFIG = {
  brandName: "آرامیس",
  slogan: "خواب آرام، انتخاب مطمئن",
  phone: "09xxxxxxxxx",
  address: "آدرس فروشگاه یا کارخانه",
  workingHours: "شنبه تا پنج‌شنبه، ۹ تا ۲۰",
  instagram: "#",
  currency: "تومان",
};

window.MATTRESS_SIZES = [
  { value: "200×90", width: 90, length: 200, label: "یک‌نفره استاندارد" },
  { value: "200×120", width: 120, length: 200, label: "یک‌ونیم‌نفره" },
  { value: "200×140", width: 140, length: 200, label: "دونفره جمع‌وجور" },
  { value: "200×160", width: 160, length: 200, label: "دونفره استاندارد" },
  { value: "200×180", width: 180, length: 200, label: "دونفره کینگ" },
  { value: "200×200", width: 200, length: 200, label: "دونفره سوپرکینگ" },
];

window.PRODUCTS = [
  {
    id: "latex-pak",
    name: "لاتکس پاک",
    category: "تشک طبی و راحتی",
    categoryKey: "hybrid",
    warranty: "۱۲ سال",
    status: "available",
    badge: "پرفروش",
    firmness: "متوسط رو به نرم",
    height: 31,
    image: "assets/images/latex-pak-transparent.webp",
    gallery: [
      { image: "assets/images/latex-pak-transparent.webp", label: "نمای سه‌ربع" },
      { image: "assets/images/latex-pak-transparent.webp", label: "نمای بافت رویه", view: "detail" },
      { image: "assets/images/latex-pak-transparent.webp", label: "نمای کناره", view: "side" },
    ],
    description:
      "تشکی با طراحی راحت و استاندارد، مناسب برای خواب روزانه و افرادی که به دنبال ترکیب نرمی، دوام و پشتیبانی مناسب بدن هستند.",
    features: [
      "لایه راحتی با انعطاف متعادل",
      "پارچه تنفس‌پذیر و لطیف",
      "تقویت لبه‌ها برای نشست‌وبرخاست آسان",
      "مناسب استفاده روزمره زوج‌ها",
    ],
    prices: {
      "200×90":  { cashPrice: 18900000, sixMonthInstallmentPrice: 20790000, monthlyInstallmentAmount: 3465000, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×120": { cashPrice: 23900000, sixMonthInstallmentPrice: 26290000, monthlyInstallmentAmount: 4381667, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×140": { cashPrice: 26900000, sixMonthInstallmentPrice: 29590000, monthlyInstallmentAmount: 4931667, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×160": { cashPrice: 29900000, sixMonthInstallmentPrice: 32890000, monthlyInstallmentAmount: 5481667, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×180": { cashPrice: 33900000, sixMonthInstallmentPrice: 37290000, monthlyInstallmentAmount: 6215000, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×200": { cashPrice: null, sixMonthInstallmentPrice: null, monthlyInstallmentAmount: null, updatedAt: "۱۴۰۵/۰۴/۱۵" },
    },
  },
  {
    id: "super-medical",
    name: "سوپر مدیکال",
    category: "تشک طبی",
    categoryKey: "medical",
    warranty: "قابل ویرایش",
    status: "available",
    badge: "انتخاب طبی",
    firmness: "نسبتاً سفت",
    height: 28,
    image: "assets/images/super-medical-transparent.webp",
    gallery: [
      { image: "assets/images/super-medical-transparent.webp", label: "نمای سه‌ربع" },
      { image: "assets/images/super-medical-transparent.webp", label: "نمای بافت رویه", view: "detail" },
      { image: "assets/images/super-medical-transparent.webp", label: "نمای کناره", view: "side" },
    ],
    description:
      "تشک طبی با پشتیبانی مناسب ستون فقرات، طراحی‌شده برای خواب عمیق، راحتی بیشتر و استفاده روزانه.",
    features: [
      "پشتیبانی یکنواخت ستون فقرات",
      "سطح خواب نسبتاً سفت",
      "پارچه گردبافت با گردش هوای مناسب",
      "لبه‌های مقاوم در برابر تغییر شکل",
    ],
    prices: {
      "200×90":  { cashPrice: 16400000, sixMonthInstallmentPrice: 18040000, monthlyInstallmentAmount: 3006667, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×120": { cashPrice: 20900000, sixMonthInstallmentPrice: 22990000, monthlyInstallmentAmount: 3831667, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×140": { cashPrice: 23900000, sixMonthInstallmentPrice: 26290000, monthlyInstallmentAmount: 4381667, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×160": { cashPrice: 26700000, sixMonthInstallmentPrice: 29370000, monthlyInstallmentAmount: 4895000, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×180": { cashPrice: 29800000, sixMonthInstallmentPrice: 32780000, monthlyInstallmentAmount: 5463333, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×200": { cashPrice: 32900000, sixMonthInstallmentPrice: 36190000, monthlyInstallmentAmount: 6031667, updatedAt: "۱۴۰۵/۰۴/۱۵" },
    },
  },
  {
    id: "medical",
    name: "مدیکال",
    category: "تشک طبی",
    categoryKey: "medical",
    warranty: "قابل ویرایش",
    status: "inquiry",
    badge: "اقتصادی",
    firmness: "سفت",
    height: 24,
    image: "assets/images/medical-transparent.webp",
    gallery: [
      { image: "assets/images/medical-transparent.webp", label: "نمای سه‌ربع" },
      { image: "assets/images/medical-transparent.webp", label: "نمای بافت رویه", view: "detail" },
      { image: "assets/images/medical-transparent.webp", label: "نمای کناره", view: "side" },
    ],
    description:
      "تشک طبی با سطح نسبتاً سفت و پشتیبانی مناسب بدن، مناسب افرادی که به تشک طبی و خواب پایدار نیاز دارند.",
    features: [
      "سطح سفت و پایدار",
      "طراحی ساده برای پشتیبانی بدن",
      "رویه بادوام و قابل تنفس",
      "مناسب افرادی با ترجیح سطح سفت",
    ],
    prices: {
      "200×90":  { cashPrice: 12800000, sixMonthInstallmentPrice: 14080000, monthlyInstallmentAmount: 2346667, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×120": { cashPrice: 16200000, sixMonthInstallmentPrice: 17820000, monthlyInstallmentAmount: 2970000, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×140": { cashPrice: 18500000, sixMonthInstallmentPrice: 20350000, monthlyInstallmentAmount: 3391667, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×160": { cashPrice: 20700000, sixMonthInstallmentPrice: 22770000, monthlyInstallmentAmount: 3795000, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×180": { cashPrice: 23200000, sixMonthInstallmentPrice: 25520000, monthlyInstallmentAmount: 4253333, updatedAt: "۱۴۰۵/۰۴/۱۵" },
      "200×200": { cashPrice: null, sixMonthInstallmentPrice: null, monthlyInstallmentAmount: null, updatedAt: "۱۴۰۵/۰۴/۱۵" },
    },
  },
];
