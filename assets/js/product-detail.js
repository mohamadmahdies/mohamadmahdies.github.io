(function () {
  "use strict";

  function initProductDetail() {
    const root = document.querySelector("[data-product-detail]");
    if (!root || !window.Storefront) return;

    const store = window.Storefront;
    const params = new URLSearchParams(window.location.search);
    const product = store.products.find((item) => item.id === params.get("id")) || store.products[0];
    let selectedSize = product.prices[params.get("size")] ? params.get("size") : Object.keys(product.prices)[0];
    let purchaseType = "cash";

    document.title = `${product.name} | ${store.config.brandName}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${product.description} مشاهده سایزها و قیمت نمونه نقدی و اقساطی.`;
    const canonical = new URL(window.location.href);
    canonical.search = `?id=${product.id}`;
    window.history.replaceState({}, "", `product.html?id=${product.id}&size=${encodeURIComponent(selectedSize)}`);

    root.innerHTML = `
      <nav class="breadcrumbs" aria-label="مسیر صفحه">
        <a href="index.html">خانه</a><span>/</span>
        <a href="products.html">محصولات</a><span>/</span>
        <span aria-current="page">${product.name}</span>
      </nav>
      <div class="detail-grid">
        <section class="product-gallery reveal" aria-label="گالری تصاویر ${product.name}">
          <div class="gallery-stage">
            <span class="product-badge">${product.badge}</span>
            <img data-gallery-main src="${product.image}" width="724" height="543" alt="نمای سه‌بعدی تشک ${product.name}">
            <div class="measurement measurement-length"><span>۲۰۰ سانتی‌متر</span></div>
            <div class="measurement measurement-width"><span data-width-label>${store.toFaNumber(selectedSize.split("×")[1])} سانتی‌متر</span></div>
            <div class="measurement measurement-height"><span>${store.toFaNumber(product.height)} سانتی‌متر</span></div>
          </div>
          <div class="gallery-thumbs" role="list">
            ${product.gallery
              .map(
                (item, index) => `
                <button type="button" class="${index === 0 ? "active" : ""}" data-gallery-thumb data-view="${item.view || "default"}" aria-label="${item.label}" aria-pressed="${index === 0}">
                  <img src="${item.image}" width="110" height="82" loading="lazy" alt="">
                  <span>${item.label}</span>
                </button>`,
              )
              .join("")}
          </div>
          <p class="dimensions-text">ابعاد انتخابی: طول ۲۰۰، عرض <strong data-width-text>${store.toFaNumber(selectedSize.split("×")[1])}</strong> و ارتفاع تقریبی ${store.toFaNumber(product.height)} سانتی‌متر.</p>
        </section>

        <section class="detail-info reveal">
          <span class="eyebrow">${product.category}</span>
          <h1>${product.name}</h1>
          <div class="detail-meta">
            <span class="stock-status ${product.status}"><i></i>${product.status === "available" ? "موجود" : "نیازمند استعلام"}</span>
            <span>ضمانت: <b>${product.warranty}</b></span>
            <span>درجه سفتی: <b>${product.firmness}</b></span>
          </div>
          <p class="detail-description">${product.description}</p>
          <ul class="feature-pills" aria-label="ویژگی‌های محصول">
            ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>

          <div class="detail-selector-block">
            <div class="selector-heading">
              <label>انتخاب سایز</label>
              <a href="index.html#size-guide">راهنمای انتخاب سایز</a>
            </div>
            <div class="size-chip-group" data-detail-sizes>
              ${Object.keys(product.prices)
                .map(
                  (size) =>
                    `<button type="button" class="size-chip${size === selectedSize ? " active" : ""}" data-size="${size}" aria-pressed="${size === selectedSize}">${store.toFaNumber(size)}</button>`,
                )
                .join("")}
            </div>
          </div>

          <div class="purchase-type" role="radiogroup" aria-label="نوع خرید">
            <label class="radio-card active">
              <input type="radio" name="purchase-type" value="cash" checked>
              <span><b>خرید نقدی</b><small>قیمت پایه نمونه</small></span>
              <i></i>
            </label>
            <label class="radio-card">
              <input type="radio" name="purchase-type" value="installment">
              <span><b>اقساط شش‌ماهه</b><small>شش پرداخت ماهانه</small></span>
              <i></i>
            </label>
          </div>

          <div class="detail-price-panel" data-detail-price></div>
          <p class="price-disclaimer">این مبالغ داده نمونه و غیرقطعی‌اند؛ قیمت نهایی و موجودی پیش از سفارش تأیید می‌شود.</p>
          <div class="detail-actions">
            <a class="button button-call" href="${store.phoneHref()}">${store.icons.phone}تماس برای سفارش</a>
            <a class="button button-secondary" href="${store.phoneHref()}">${store.icons.phone}مشاوره تلفنی</a>
          </div>
        </section>
      </div>

      <section class="price-table-section section reveal">
        <div class="section-heading compact">
          <div><span class="eyebrow">مقایسه شفاف</span><h2>جدول قیمت همه سایزها</h2></div>
          <button class="text-action" type="button" data-installment-open>جزئیات شرایط اقساط <span>←</span></button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>سایز</th><th>قیمت نقدی نمونه</th><th>کل اقساط شش‌ماهه</th><th>مبلغ هر قسط</th></tr></thead>
            <tbody>
              ${Object.entries(product.prices)
                .map(
                  ([size, price]) => `
                  <tr data-price-row="${size}"${size === selectedSize ? ' class="selected"' : ""}>
                    <th>${store.toFaNumber(size)}</th>
                    <td>${store.formatPrice(price.cashPrice)}</td>
                    <td>${store.formatPrice(price.sixMonthInstallmentPrice)}</td>
                    <td>${store.formatPrice(price.monthlyInstallmentAmount)}</td>
                  </tr>`,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>

      <section class="section related-section">
        <div class="section-heading compact"><div><span class="eyebrow">پیشنهادهای دیگر</span><h2>محصولات مشابه</h2></div><a class="text-action" href="products.html">همه محصولات <span>←</span></a></div>
        <div class="products-grid related-grid" data-related-products></div>
      </section>`;

    const mainImage = root.querySelector("[data-gallery-main]");
    root.querySelectorAll("[data-gallery-thumb]").forEach((button, index) => {
      button.addEventListener("click", () => {
        const item = product.gallery[index];
        mainImage.src = item.image;
        mainImage.className = button.dataset.view === "default" ? "" : `gallery-view-${button.dataset.view}`;
        mainImage.alt = `${button.querySelector("span").textContent} تشک ${product.name}`;
        root.querySelectorAll("[data-gallery-thumb]").forEach((thumb) => {
          const active = thumb === button;
          thumb.classList.toggle("active", active);
          thumb.setAttribute("aria-pressed", String(active));
        });
      });
    });

    function updatePrice() {
      const price = product.prices[selectedSize];
      const panel = root.querySelector("[data-detail-price]");
      if (price.cashPrice === null) {
        panel.innerHTML = `
          <div class="price-unavailable detail-unavailable">
            <span>قیمت سایز ${store.toFaNumber(selectedSize)}</span>
            <strong>برای استعلام تماس بگیرید</strong>
            <small>کارشناس فروش موجودی و شرایط خرید را اعلام می‌کند.</small>
          </div>`;
      } else if (purchaseType === "cash") {
        panel.innerHTML = `
          <div><span>قیمت نقدی نمونه</span><strong>${store.formatPrice(price.cashPrice)}</strong></div>
          <small>آخرین به‌روزرسانی داده نمونه: ${price.updatedAt}</small>`;
      } else {
        panel.innerHTML = `
          <div><span>مجموع اقساط شش‌ماهه</span><strong>${store.formatPrice(price.sixMonthInstallmentPrice)}</strong></div>
          <div class="monthly-highlight"><span>مبلغ هر قسط</span><b>${store.formatPrice(price.monthlyInstallmentAmount)}</b></div>
          <small>آخرین به‌روزرسانی داده نمونه: ${price.updatedAt}</small>`;
      }
      root.querySelector("[data-width-label]").textContent = `${store.toFaNumber(selectedSize.split("×")[1])} سانتی‌متر`;
      root.querySelector("[data-width-text]").textContent = store.toFaNumber(selectedSize.split("×")[1]);
      root.querySelectorAll("[data-price-row]").forEach((row) => row.classList.toggle("selected", row.dataset.priceRow === selectedSize));
      window.history.replaceState({}, "", `product.html?id=${product.id}&size=${encodeURIComponent(selectedSize)}`);
    }

    root.querySelectorAll("[data-size]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedSize = button.dataset.size;
        root.querySelectorAll("[data-size]").forEach((item) => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        updatePrice();
      });
    });

    root.querySelectorAll('input[name="purchase-type"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        purchaseType = radio.value;
        root.querySelectorAll(".radio-card").forEach((label) => label.classList.toggle("active", label.contains(radio)));
        updatePrice();
      });
    });

    const related = root.querySelector("[data-related-products]");
    related.innerHTML = store.products
      .filter((item) => item.id !== product.id)
      .map((item) => store.productCard(item, selectedSize))
      .join("");
    store.bindProductCards(related);
    store.initReveal(root);
    updatePrice();
    addProductSchema(product);

    // app.js این دکمه‌ها را پیش از رندر جزئیات ندیده است؛ اتصال مودال اینجا انجام می‌شود.
    root.querySelectorAll("[data-installment-open]").forEach((button) => {
      button.addEventListener("click", () => {
        const dialog = document.getElementById("installment-dialog");
        if (dialog && typeof dialog.showModal === "function") dialog.showModal();
      });
    });
  }

  function addProductSchema(product) {
    const firstAvailable = Object.values(product.prices).find((price) => price.cashPrice !== null);
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: new URL(product.image, window.location.href).href,
      description: product.description,
      brand: { "@type": "Brand", name: window.Storefront.config.brandName },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "IRR",
        lowPrice: firstAvailable ? firstAvailable.cashPrice * 10 : undefined,
        offerCount: Object.values(product.prices).filter((price) => price.cashPrice !== null).length,
        availability:
          product.status === "available"
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
      },
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  document.addEventListener("DOMContentLoaded", initProductDetail);
})();
