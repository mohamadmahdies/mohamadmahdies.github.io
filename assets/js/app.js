(function () {
  "use strict";

  const config = window.STORE_CONFIG;
  const products = window.PRODUCTS || [];
  const sizes = window.MATTRESS_SIZES || [];

  const icons = {
    phone:
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.54 3.5.54a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.18 2.4.54 3.5a1 1 0 0 1-.24 1z"/></svg>',
    whatsapp:
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7c1.7.9 3.5 1.4 5.4 1.4 6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.2-3.4-8.4Zm-8.4 18.2c-1.7 0-3.4-.5-4.9-1.3l-.3-.2-3.9 1 1-3.8-.2-.4a9.7 9.7 0 1 1 8.3 4.7Zm5.3-7.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.6.1-.2.1-.4 0-.6l-.9-2.2c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 3.1 1 4.2.8.7-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.2 0-.5-.1-.8-.2Z"/></svg>',
    menu:
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    close:
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    arrow:
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  function toFaNumber(value) {
    return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  }

  function formatPrice(value) {
    if (value === null || value === undefined) {
      return "برای استعلام تماس بگیرید";
    }
    return `${toFaNumber(Number(value).toLocaleString("en-US"))} ${config.currency}`;
  }

  function phoneHref() {
    return `tel:${String(config.phone).replace(/\s/g, "")}`;
  }

  function whatsappHref(message) {
    const number = String(config.whatsapp).replace(/[^\d]/g, "");
    return `https://wa.me/${number}?text=${encodeURIComponent(message || `سلام، برای مشاوره خرید تشک ${config.brandName} پیام می‌دهم.`)}`;
  }

  function productOrderMessage(product, size, type, price) {
    const typeLabel = type === "installment" ? "اقساط شش‌ماهه" : "نقدی";
    const priceLabel = price === null ? "نیازمند استعلام" : formatPrice(price);
    return [
      `سلام، برای سفارش تشک ${product.name} پیام می‌دهم.`,
      `سایز: ${toFaNumber(size)} سانتی‌متر`,
      `نوع خرید: ${typeLabel}`,
      `قیمت نمونه نمایش‌داده‌شده: ${priceLabel}`,
      "لطفاً قیمت نهایی و موجودی را تأیید کنید.",
    ].join("\n");
  }

  function getCurrentPage() {
    const file = window.location.pathname.split("/").pop() || "index.html";
    return file === "" ? "index.html" : file;
  }

  function renderHeader() {
    const host = document.querySelector("[data-site-header]");
    if (!host) return;
    const currentPage = getCurrentPage();
    const nav = [
      ["index.html", "صفحه اصلی"],
      ["products.html", "محصولات"],
      ["index.html#size-guide", "راهنمای انتخاب"],
      ["about.html", "درباره ما"],
      ["contact.html", "تماس با ما"],
    ];
    host.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="صفحه اصلی ${config.brandName}">
            <span class="brand-mark" aria-hidden="true"><span></span></span>
            <span><strong>${config.brandName}</strong><small>${config.slogan}</small></span>
          </a>
          <nav class="desktop-nav" aria-label="منوی اصلی">
            ${nav
              .map(([href, label]) => {
                const active =
                  href === currentPage ||
                  (currentPage === "product.html" && href === "products.html");
                return `<a href="${href}"${active ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
              })
              .join("")}
          </nav>
          <div class="header-actions">
            <a class="header-phone" href="${phoneHref()}">${icons.phone}<span>مشاوره رایگان</span></a>
            <a class="button button-primary button-compact" href="${whatsappHref()}" target="_blank" rel="noopener">
              ${icons.whatsapp}<span>سفارش</span>
            </a>
            <button class="menu-toggle icon-button" type="button" aria-label="بازکردن منو" aria-expanded="false" aria-controls="mobile-nav">
              ${icons.menu}
            </button>
          </div>
        </div>
        <nav class="mobile-nav" id="mobile-nav" aria-label="منوی موبایل" hidden>
          <div class="mobile-nav-head">
            <span>منوی دسترسی</span>
            <button class="mobile-nav-close icon-button" type="button" aria-label="بستن منو">${icons.close}</button>
          </div>
          ${nav.map(([href, label]) => `<a href="${href}">${label}<span aria-hidden="true">←</span></a>`).join("")}
          <a class="button button-primary" href="${whatsappHref()}" target="_blank" rel="noopener">${icons.whatsapp}گفت‌وگو در واتساپ</a>
        </nav>
        <button class="nav-backdrop" type="button" aria-label="بستن منو" hidden></button>
      </header>`;
  }

  function renderFooter() {
    const host = document.querySelector("[data-site-footer]");
    if (!host) return;
    host.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a class="brand brand-light" href="index.html">
              <span class="brand-mark" aria-hidden="true"><span></span></span>
              <span><strong>${config.brandName}</strong><small>${config.slogan}</small></span>
            </a>
            <p>انتخاب آگاهانه تشک، با توضیح شفاف ویژگی‌ها و امکان مقایسه قیمت نقدی و اقساطی.</p>
          </div>
          <div>
            <h2>دسترسی سریع</h2>
            <a href="products.html">مشاهده محصولات</a>
            <a href="index.html#size-guide">راهنمای انتخاب سایز</a>
            <a href="about.html">درباره ما</a>
          </div>
          <div>
            <h2>خدمات مشتریان</h2>
            <a href="contact.html">درخواست مشاوره</a>
            <a href="index.html#faq">پرسش‌های پرتکرار</a>
            <button type="button" class="link-button" data-installment-open>شرایط خرید اقساطی</button>
          </div>
          <div class="footer-contact">
            <h2>ارتباط با ما</h2>
            <a href="${phoneHref()}" dir="ltr">${config.phone}</a>
            <a href="${whatsappHref()}" target="_blank" rel="noopener">پیام در واتساپ</a>
            <address>${config.address}</address>
          </div>
        </div>
        <div class="container footer-bottom">
          <p>© ${toFaNumber(new Date().getFullYear())} ${config.brandName}؛ همه حقوق محفوظ است.</p>
          <p>قیمت‌های این نسخه صرفاً داده نمونه و غیرقطعی هستند.</p>
        </div>
      </footer>
      <div class="mobile-contact-bar" aria-label="راه‌های تماس سریع">
        <a href="${phoneHref()}">${icons.phone}<span>تماس</span></a>
        <a href="${whatsappHref()}" target="_blank" rel="noopener">${icons.whatsapp}<span>واتساپ</span></a>
      </div>
      <a class="floating-whatsapp" href="${whatsappHref()}" target="_blank" rel="noopener" aria-label="سفارش در واتساپ">${icons.whatsapp}</a>
      <div class="toast" role="status" aria-live="polite" aria-atomic="true"></div>
      <dialog class="site-dialog" id="installment-dialog" aria-labelledby="installment-title">
        <button class="dialog-close icon-button" type="button" aria-label="بستن پنجره">${icons.close}</button>
        <span class="eyebrow">خرید آسان‌تر</span>
        <h2 id="installment-title">شرایط نمونه اقساط شش‌ماهه</h2>
        <p>مبلغ کل اقساط و مبلغ هر قسط برای هر مدل و سایز جداگانه نمایش داده می‌شود. ارقام این نسخه نمونه‌اند و شرایط نهایی، پیش‌پرداخت و مدارک لازم باید پیش از سفارش با فروشنده تأیید شوند.</p>
        <ul class="check-list">
          <li>دوره بازپرداخت نمونه: شش ماه</li>
          <li>قیمت و موجودی در زمان ثبت سفارش تأیید می‌شود</li>
          <li>برای دریافت شرایط قطعی با بخش فروش تماس بگیرید</li>
        </ul>
        <a class="button button-primary button-block" href="${phoneHref()}">${icons.phone}تماس با فروش</a>
      </dialog>`;
  }

  function initNavigation() {
    const toggle = document.querySelector(".menu-toggle");
    const close = document.querySelector(".mobile-nav-close");
    const nav = document.querySelector(".mobile-nav");
    const backdrop = document.querySelector(".nav-backdrop");
    if (!toggle || !nav || !backdrop) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.hidden = !open;
      backdrop.hidden = !open;
      document.body.classList.toggle("nav-open", open);
      if (open) close.focus();
      else toggle.focus();
    }
    toggle.addEventListener("click", () => setOpen(true));
    close.addEventListener("click", () => setOpen(false));
    backdrop.addEventListener("click", () => setOpen(false));
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !nav.hidden) setOpen(false);
    });
  }

  function priceMarkup(priceData, compact) {
    if (!priceData || priceData.cashPrice === null) {
      return `
        <div class="price-unavailable">
          <span>قیمت این سایز</span>
          <strong>برای استعلام تماس بگیرید</strong>
        </div>`;
    }
    return `
      <div class="price-cash">
        <span>قیمت نقدی نمونه</span>
        <strong>${formatPrice(priceData.cashPrice)}</strong>
      </div>
      ${
        compact
          ? `<p class="installment-inline">اقساط شش‌ماهه: ماهی <b>${formatPrice(priceData.monthlyInstallmentAmount)}</b></p>`
          : `<div class="installment-summary"><span>مجموع اقساط شش‌ماهه</span><strong>${formatPrice(priceData.sixMonthInstallmentPrice)}</strong><small>۶ قسط، ماهی ${formatPrice(priceData.monthlyInstallmentAmount)}</small></div>`
      }`;
  }

  function sizeOptions(product, selectedSize) {
    return Object.keys(product.prices)
      .map(
        (size) =>
          `<option value="${size}"${size === selectedSize ? " selected" : ""}>${toFaNumber(size)} سانتی‌متر</option>`,
      )
      .join("");
  }

  function productCard(product, selectedSize) {
    const initialSize = product.prices[selectedSize] ? selectedSize : Object.keys(product.prices)[0];
    const statusLabel = product.status === "available" ? "موجود" : "نیازمند استعلام";
    return `
      <article class="product-card reveal" data-product-card="${product.id}" data-category="${product.categoryKey}">
        <a class="product-image-wrap" href="product.html?id=${product.id}" aria-label="مشاهده ${product.name}">
          <span class="product-badge">${product.badge}</span>
          <img src="${product.image}" width="724" height="543" loading="lazy" alt="تصویر سه‌بعدی تشک ${product.name}">
        </a>
        <div class="product-card-body">
          <div class="product-heading">
            <div><p>${product.category}</p><h3><a href="product.html?id=${product.id}">${product.name}</a></h3></div>
            <span class="stock-status ${product.status}"><i></i>${statusLabel}</span>
          </div>
          <p class="product-description">${product.description}</p>
          <div class="card-selector">
            <label for="size-${product.id}">انتخاب سایز</label>
            <select id="size-${product.id}" data-card-size aria-label="انتخاب سایز ${product.name}">
              ${sizeOptions(product, initialSize)}
            </select>
          </div>
          <div class="card-price" data-card-price>${priceMarkup(product.prices[initialSize], true)}</div>
          <div class="sample-price-note">قیمت‌های نمایشی نمونه و غیرقطعی‌اند.</div>
          <div class="product-card-actions">
            <a class="button button-secondary" href="product.html?id=${product.id}&size=${encodeURIComponent(initialSize)}" data-detail-link>جزئیات ${icons.arrow}</a>
            <a class="icon-button card-whatsapp" href="${whatsappHref(productOrderMessage(product, initialSize, "cash", product.prices[initialSize].cashPrice))}" target="_blank" rel="noopener" aria-label="سفارش ${product.name} در واتساپ">${icons.whatsapp}</a>
          </div>
        </div>
      </article>`;
  }

  function bindProductCards(scope) {
    (scope || document).querySelectorAll("[data-product-card]").forEach((card) => {
      const product = products.find((item) => item.id === card.dataset.productCard);
      const select = card.querySelector("[data-card-size]");
      const detail = card.querySelector("[data-detail-link]");
      const whatsapp = card.querySelector(".card-whatsapp");
      if (!product || !select) return;
      select.addEventListener("change", () => {
        const size = select.value;
        const price = product.prices[size];
        card.querySelector("[data-card-price]").innerHTML = priceMarkup(price, true);
        detail.href = `product.html?id=${product.id}&size=${encodeURIComponent(size)}`;
        whatsapp.href = whatsappHref(productOrderMessage(product, size, "cash", price.cashPrice));
      });
    });
  }

  function renderFeaturedProducts() {
    const grid = document.querySelector("[data-featured-products]");
    if (!grid) return;
    grid.innerHTML = products.map((product) => productCard(product, "200×160")).join("");
    bindProductCards(grid);
  }

  function renderProductsPage() {
    const grid = document.querySelector("[data-products-grid]");
    if (!grid) return;
    const params = new URLSearchParams(window.location.search);
    const requestedSize = params.get("size") || "200×90";
    let category = "all";
    let sort = "default";

    function render() {
      const filtered = products.filter((product) => category === "all" || product.categoryKey === category);
      const sorted = [...filtered].sort((a, b) => {
        const aPrice = a.prices[requestedSize]?.cashPrice ?? Number.MAX_SAFE_INTEGER;
        const bPrice = b.prices[requestedSize]?.cashPrice ?? Number.MAX_SAFE_INTEGER;
        if (sort === "low") return aPrice - bPrice;
        if (sort === "high") return bPrice - aPrice;
        return products.indexOf(a) - products.indexOf(b);
      });
      grid.innerHTML = sorted.map((product) => productCard(product, requestedSize)).join("");
      const count = document.querySelector("[data-product-count]");
      if (count) count.textContent = `${toFaNumber(sorted.length)} محصول`;
      bindProductCards(grid);
      initReveal(grid);
    }

    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        category = button.dataset.filter;
        document.querySelectorAll("[data-filter]").forEach((item) => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        render();
      });
    });
    const sortSelect = document.querySelector("[data-sort]");
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        sort = sortSelect.value;
        render();
      });
    }
    render();
  }

  function initSizeGuide() {
    const guide = document.querySelector("[data-size-guide]");
    if (!guide) return;
    const peopleButtons = guide.querySelectorAll("[data-people]");
    const room = guide.querySelector("[data-room-size]");
    const result = guide.querySelector("[data-size-result]");
    const link = guide.querySelector("[data-size-link]");
    let people = "1";

    function update() {
      const roomValue = Number(room.value);
      let recommended;
      let reason;
      if (people === "1") {
        recommended = roomValue < 10 ? "200×90" : "200×120";
        reason = roomValue < 10 ? "فضای کافی برای رفت‌وآمد در اتاق کوچک" : "عرض بیشتر برای خواب راحت‌تر یک نفر";
      } else {
        recommended = roomValue < 12 ? "200×140" : roomValue < 18 ? "200×160" : "200×180";
        reason =
          roomValue < 12
            ? "انتخاب جمع‌وجور برای اتاق محدود"
            : roomValue < 18
              ? "تعادل مناسب بین فضای خواب و فضای اتاق"
              : "فضای خواب گسترده برای دو نفر";
      }
      result.innerHTML = `<span>پیشنهاد ما</span><strong>${toFaNumber(recommended)} سانتی‌متر</strong><p>${reason}</p>`;
      link.href = `products.html?size=${encodeURIComponent(recommended)}`;
      link.textContent = `محصولات سایز ${toFaNumber(recommended)}`;
    }

    peopleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        people = button.dataset.people;
        peopleButtons.forEach((item) => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        update();
      });
    });
    room.addEventListener("input", () => {
      guide.querySelector("[data-room-value]").textContent = toFaNumber(room.value);
      update();
    });
    update();
  }

  function initFAQ() {
    document.querySelectorAll(".faq-item button").forEach((button) => {
      button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        const panel = item.querySelector(".faq-answer");
        const open = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!open));
        panel.hidden = open;
      });
    });
  }

  function showToast(message) {
    const toast = document.querySelector(".toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3200);
  }

  function initContactPage() {
    document.querySelectorAll("[data-copy-phone]").forEach((button) => {
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(config.phone);
          showToast("شماره تماس کپی شد.");
        } catch (_error) {
          const input = document.createElement("textarea");
          input.value = config.phone;
          document.body.appendChild(input);
          input.select();
          document.execCommand("copy");
          input.remove();
          showToast("شماره تماس کپی شد.");
        }
      });
    });

    const form = document.querySelector("[data-consultation-form]");
    if (!form) return;
    const success = form.querySelector(".form-success");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      let valid = true;
      form.querySelectorAll("[required]").forEach((field) => {
        const group = field.closest(".form-field");
        let message = "";
        if (!field.value.trim()) message = "تکمیل این فیلد ضروری است.";
        if (field.name === "phone" && field.value.trim() && !/^09\d{9}$/.test(field.value.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)))) {
          message = "شماره موبایل را با ۰۹ و ۱۱ رقم وارد کنید.";
        }
        group.classList.toggle("invalid", Boolean(message));
        group.querySelector(".field-error").textContent = message;
        field.setAttribute("aria-invalid", String(Boolean(message)));
        if (message) valid = false;
      });
      if (!valid) {
        form.querySelector(".invalid input, .invalid textarea").focus();
        return;
      }
      success.hidden = false;
      success.focus();
      form.reset();
      showToast("درخواست شما با موفقیت ثبت شد.");
    });
    form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("input", () => {
        const group = field.closest(".form-field");
        group.classList.remove("invalid");
        field.setAttribute("aria-invalid", "false");
        group.querySelector(".field-error").textContent = "";
      });
    });
  }

  function initDialog() {
    const dialog = document.getElementById("installment-dialog");
    if (!dialog) return;
    document.querySelectorAll("[data-installment-open]").forEach((button) => {
      button.addEventListener("click", () => {
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
      });
    });
    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (outside) dialog.close();
    });
  }

  function initReveal(scope) {
    const elements = (scope || document).querySelectorAll(".reveal:not(.is-visible)");
    if (!elements.length) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
  }

  function hydrateConfigText() {
    document.querySelectorAll("[data-brand-name]").forEach((el) => (el.textContent = config.brandName));
    document.querySelectorAll("[data-brand-slogan]").forEach((el) => (el.textContent = config.slogan));
    document.querySelectorAll("[data-phone]").forEach((el) => {
      el.textContent = config.phone;
      if (el.tagName === "A") el.href = phoneHref();
    });
    document.querySelectorAll("[data-address]").forEach((el) => (el.textContent = config.address));
    document.querySelectorAll("[data-working-hours]").forEach((el) => (el.textContent = config.workingHours));
    document.querySelectorAll("[data-whatsapp-link]").forEach((el) => (el.href = whatsappHref()));
  }

  window.Storefront = {
    config,
    products,
    sizes,
    icons,
    formatPrice,
    toFaNumber,
    phoneHref,
    whatsappHref,
    productOrderMessage,
    productCard,
    bindProductCards,
    showToast,
    initReveal,
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    hydrateConfigText();
    initNavigation();
    renderFeaturedProducts();
    renderProductsPage();
    initSizeGuide();
    initFAQ();
    initContactPage();
    initDialog();
    initReveal();
  });
})();
