# Aramis Mattress Website

A responsive, mobile-focused Persian RTL website for presenting mattresses, comparing sample cash and installment prices, choosing mattress sizes, and contacting the sales team directly.

The project is built with plain HTML, CSS, and JavaScript. It has no build step or runtime dependencies.

> The Aramis brand name, contact details, warranties, and current prices are sample data. Replace them with verified business information before publishing the website.

## Running the Project

The website works by opening `index.html` directly in a browser. Product data is stored in JavaScript, so the site also works through the `file://` protocol.

To run it with a local web server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Project Structure

```text
.
├── index.html
├── products.html
├── product.html
├── about.html
├── contact.html
├── assets
│   ├── css
│   │   ├── style.css
│   │   └── responsive.css
│   ├── fonts
│   │   ├── lalezar-fa.woff2
│   │   ├── lalezar-latin.woff2
│   │   ├── vazirmatn-fa.woff2
│   │   └── vazirmatn-latin.woff2
│   ├── js
│   │   ├── products.js
│   │   ├── app.js
│   │   └── product-detail.js
│   └── images
│       ├── latex-pak.png
│       ├── super-medical.png
│       ├── medical.png
│       ├── latex-pak-transparent.webp
│       ├── super-medical-transparent.webp
│       └── medical-transparent.webp
└── README.md
```

## Updating Brand and Contact Information

The `STORE_CONFIG` object is located at the beginning of `assets/js/products.js`:

```js
window.STORE_CONFIG = {
  brandName: "آرامیس",
  slogan: "خواب آرام، انتخاب مطمئن",
  phone: "09xxxxxxxxx",
  address: "آدرس فروشگاه یا کارخانه",
  workingHours: "شنبه تا پنج‌شنبه، ۹ تا ۲۰",
};
```

- Replace `phone` with the real sales number, including the leading zero; for example, `09123456789`.
- The header, footer, product cards, product detail page, fixed mobile contact bar, and contact page all use this number automatically.
- Every order and phone icon uses a `tel:` link. On mobile devices, tapping it opens the phone dialer directly.

## Updating Products and Prices

All catalog data is stored in the `PRODUCTS` array inside `assets/js/products.js`.

Prices are stored as numbers in toman. The interface automatically adds thousands separators and the Persian currency label.

Each product size supports the following fields:

```js
"200×160": {
  cashPrice: 29900000,
  sixMonthInstallmentPrice: 32890000,
  monthlyInstallmentAmount: 5481667,
  updatedAt: "۱۴۰۵/۰۴/۱۵"
}
```

- `cashPrice`: sample cash price
- `sixMonthInstallmentPrice`: total sample price for the six-month installment plan
- `monthlyInstallmentAmount`: sample amount of each monthly payment
- `updatedAt`: last price update date

If a price is unavailable, set all three price values to `null`:

```js
cashPrice: null,
sixMonthInstallmentPrice: null,
monthlyInstallmentAmount: null
```

The interface will then display the Persian equivalent of “Call for a price inquiry.” Products and prices can be updated without editing the HTML files.

### Adding a Product

Add a new object with a unique `id` to the `PRODUCTS` array.

Important fields include:

- `categoryKey`: use `medical` or `hybrid` for catalog filtering
- `status`: use `available` or `inquiry`
- `image`: path to the primary product image
- `gallery`: product gallery images or views
- `features`: list of product features
- `prices`: pricing data for every available size

The catalog, detail view, and related-products section are rendered dynamically. Product detail URLs follow this format:

```text
product.html?id=PRODUCT_ID
```

## Replacing Product Images

The current images are semi-realistic 3D product renders with transparent backgrounds.

- The PNG files contain full alpha transparency.
- Optimized transparent WebP files are used in the interface for faster mobile loading.
- The recommended image ratio is `4:3`.
- Use images at least 1200 pixels wide.

To replace an image:

1. Prepare a transparent product image using a `4:3` canvas.
2. Add it to `assets/images/`.
3. Update the product’s `image` path and, if necessary, its `gallery` paths in `assets/js/products.js`.
4. Keep the same aspect ratio to reduce layout shift.
5. Create an optimized transparent WebP version for better mobile performance.

Image alternative text is generated dynamically from the product name.

## Fonts

The website uses:

- **Vazirmatn** for body text, controls, labels, and prices
- **Lalezar** for primary headings and the brand name

Both fonts are stored locally as WOFF2 files in `assets/fonts/`. The website does not need an internet connection to load them.

Font declarations are located at the beginning of `assets/css/style.css`.

## Interactive Features

- Product filtering without refreshing the page
- Price-based sorting
- Instant price updates when changing the selected size
- Synchronized size, purchase type, price panel, price table, and image dimension label
- Direct-call icons on product cards
- Direct-call order buttons throughout the website
- Fixed mobile call bar
- Copy-to-clipboard support for the phone number
- Native `dialog` modal for installment information
- Interactive size recommendation based on room area and number of users
- Compact horizontally scrollable mobile navigation with no sidebar or drawer
- Reduced mobile animation and blur effects for smoother scrolling
- Lightweight reveal animations with reduced-motion support

## Deployment

All project files are static. The folder can be uploaded directly to a static hosting provider, a standard web host, or a CDN.

Before publishing:

1. Complete the `STORE_CONFIG` values.
2. Replace all sample prices with verified prices.
3. Update warranty details and manufacturer information.
4. Replace the map and factory placeholders with real content.
5. Update Open Graph and Schema URLs to use the final production domain.

## Browser Support and Accessibility

- Mobile-first responsive layout for phones, tablets, and desktops
- Support for current Chrome, Firefox, Safari, and Edge versions
- Keyboard-accessible controls
- Visible focus states
- Persian alternative text for product images
- `prefers-reduced-motion` support
- Lazy loading for non-critical images
- SEO metadata and dynamic Product Schema
- Mobile safe-area support for the fixed call bar
