/* Al Saadah Royal — site behaviour: language switch, content from site-config.js,
   WhatsApp links, booking form, gallery lightbox, mobile menu. No libraries. */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG;
  if (!CFG) {
    // Visible failure: the page still shows its English fallback text.
    throw new Error("site-config.js did not load: SITE_CONFIG is missing");
  }
  var BIZ = CFG.business;
  var STORAGE_KEY = "asr-lang";
  var lang = document.documentElement.lang === "ar" ? "ar" : "en";
  var root = document.documentElement;
  root.classList.add("js");

  // ---------- helpers ----------
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function t(key, vars) {
    var dict = CFG.text[lang] || CFG.text.en;
    var s = dict[key];
    if (s === undefined) s = CFG.text.en[key];
    if (s === undefined) {
      console.warn("Missing text key:", key);
      return key;
    }
    if (vars) {
      s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; });
    }
    return s;
  }

  // Pick the current language from a {en, ar} object (or return plain values as-is).
  function L(v) {
    if (v === null || v === undefined) return null;
    if (typeof v === "object" && ("en" in v || "ar" in v)) return v[lang] || v.en || null;
    return v;
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] === null || attrs[k] === undefined || attrs[k] === false) return;
        if (k === "text") node.textContent = attrs[k];
        else if (k === "class") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  var SVGNS = "http://www.w3.org/2000/svg";
  function icon(name, cls) {
    var svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    if (cls) svg.setAttribute("class", cls);
    var use = document.createElementNS(SVGNS, "use");
    use.setAttribute("href", "#i-" + name);
    svg.appendChild(use);
    return svg;
  }

  // A clearly marked placeholder ("__") for a value the owner has not confirmed yet.
  function tbd() { return el("span", { class: "tbd", title: "To be confirmed", text: "__" }); }

  function waLink(message) {
    return "https://wa.me/" + BIZ.whatsapp + "?text=" + encodeURIComponent(message);
  }

  function fmtNumber(n) {
    // Latin digits in both languages (phone-style numbers read the same way everywhere).
    return String(n);
  }

  // ---------- static text ----------
  function applyStaticText() {
    $all("[data-i18n]").forEach(function (node) {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    $all("[data-i18n-attr]").forEach(function (node) {
      node.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length === 2) node.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });
    $all("[data-biz]").forEach(function (node) {
      var key = node.getAttribute("data-biz");
      var value;
      if (key === "address") {
        value = [L(BIZ.district), L(BIZ.city), L(BIZ.region), L(BIZ.country)].filter(Boolean).join(lang === "ar" ? "، " : ", ");
      } else if (key === "googleRating") {
        value = BIZ.googleRating.toFixed(1);
      } else {
        value = L(BIZ[key]);
      }
      if (value !== null) node.textContent = value;
    });
    $all("[data-biz-href]").forEach(function (node) {
      node.setAttribute("href", BIZ[node.getAttribute("data-biz-href")]);
    });

    document.title = t("meta.title");
    var desc = $('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));

    var toggle = $("#lang-toggle");
    toggle.setAttribute("lang", lang === "ar" ? "en" : "ar");
    toggle.setAttribute("aria-label", t("lang.switchLabel"));

    var badge = $("#rating-badge");
    badge.setAttribute("href", BIZ.mapsUrl);
    badge.setAttribute("title", t("hero.ratingLabel", { rating: BIZ.googleRating.toFixed(1) }));
    renderStars();

    var hero = $("#hero-img");
    hero.src = CFG.images.hero.src;
    hero.alt = L(CFG.images.hero.alt);

    $all("[data-wa]").forEach(function (a) {
      a.href = waLink(t("wa.general", { business: L(BIZ.name) }));
    });

    var map = $("#map-iframe");
    var mapSrc = "https://maps.google.com/maps?q=" + BIZ.geo.lat + "," + BIZ.geo.lng +
      "&z=16&hl=" + lang + "&output=embed";
    if (map.getAttribute("src") !== mapSrc) map.setAttribute("src", mapSrc);

    $("#credit-link").href = CFG.credit.url;
    $("#credit-link").textContent = CFG.credit.name;
    $("#year").textContent = String(new Date().getFullYear());
  }

  function renderStars() {
    var wrap = $(".stars");
    wrap.textContent = "";
    var rating = BIZ.googleRating;
    for (var i = 0; i < 5; i++) {
      var fill = Math.max(0, Math.min(1, rating - i));
      var star = el("span", { class: "star" }, [icon("star", "star-bg"), icon("star", "star-fg")]);
      star.style.setProperty("--fill", Math.round(fill * 100) + "%");
      wrap.appendChild(star);
    }
  }

  // ---------- rooms ----------
  function renderRooms() {
    var list = $("#rooms-list");
    list.textContent = "";
    CFG.rooms.forEach(function (room) {
      var name = L(room.name);

      var price;
      if (room.priceFrom !== null && room.priceFrom !== undefined) {
        price = el("p", { class: "price-tag" }, [
          t("room.from") + " ",
          el("strong", { text: t("room.currency") + " " + fmtNumber(room.priceFrom) }),
          " " + t("room.perNight")
        ]);
      } else if (CFG.hidePlaceholders) {
        price = el("p", { class: "price-tag", text: t("room.askRate") });
      } else {
        price = el("p", { class: "price-tag" }, [
          t("room.from") + " ",
          el("strong", {}, [t("room.currency") + " ", tbd()]),
          " " + t("room.perNight")
        ]);
      }

      var meta = el("ul", { class: "room-meta" });
      var missing = false;
      function metaItem(iconName, label, value) {
        if (value === null || value === undefined) {
          missing = true;
          if (CFG.hidePlaceholders) return;
          meta.appendChild(el("li", {}, [icon(iconName), label + " ", tbd()]));
        } else {
          meta.appendChild(el("li", {}, [icon(iconName), label ? label + " " + value : value]));
        }
      }
      metaItem("image", t("room.size"), L(room.size));
      metaItem("bed", t("room.beds"), L(room.beds));
      if (room.guests) {
        meta.appendChild(el("li", {}, [icon("users"), t("room.guests", { n: room.guests })]));
      } else {
        metaItem("users", t("room.guestsLabel"), null);
      }
      if (room.priceFrom === null || room.priceFrom === undefined) missing = true;

      var amenities = el("ul", { class: "room-amenities", "aria-label": t("room.amenities") });
      (room.amenities || []).forEach(function (a) {
        var label = amenityLabel(a);
        amenities.appendChild(el("li", { title: label }, [icon(a), el("span", { class: "sr-only", text: label })]));
      });

      var book = el("a", {
        class: "btn btn-wa btn-block",
        href: waLink(t("wa.room", { business: L(BIZ.name), room: name })),
        target: "_blank",
        rel: "noopener"
      }, [icon("whatsapp"), el("span", { text: t("room.book") })]);

      var card = el("li", { class: "card room-card reveal" }, [
        el("div", { class: "room-photo" }, [
          el("img", { src: room.photo, alt: name, loading: "lazy", decoding: "async", width: "800", height: "600" }),
          price
        ]),
        el("div", { class: "room-body" }, [
          el("h3", { text: name }),
          L(room.description) ? el("p", { class: "room-desc", text: L(room.description) }) : null,
          meta.childNodes.length ? meta : null,
          amenities.childNodes.length ? amenities : null,
          missing && !CFG.hidePlaceholders ? el("p", { class: "tbd-note", text: t("room.tbdNote") }) : null,
          el("div", { class: "room-actions" }, [book])
        ])
      ]);
      list.appendChild(card);
    });
  }

  var AMENITY_LABELS = {
    en: { family: "Family-friendly", sofa: "Sofa / living area", kitchen: "Kitchen", wifi: "Wi-Fi", parking: "Parking", mountain: "Near attractions", bed: "Bedroom", users: "Guests", ac: "Air conditioning", tv: "TV", washer: "Washing machine", bath: "Private bathroom", car: "Parking", star: "Featured", calendar: "Long stays", clock: "Flexible times", shield: "Secure", pin: "Central" },
    ar: { family: "مناسب للعائلات", sofa: "جلسة / صالة", kitchen: "مطبخ", wifi: "واي فاي", parking: "موقف سيارات", mountain: "قريب من المعالم", bed: "غرفة نوم", users: "الضيوف", ac: "تكييف", tv: "تلفاز", washer: "غسالة ملابس", bath: "حمام خاص", car: "موقف سيارات", star: "مميز", calendar: "إقامات طويلة", clock: "مواعيد مرنة", shield: "آمن", pin: "موقع مركزي" }
  };
  function amenityLabel(name) { return (AMENITY_LABELS[lang] || AMENITY_LABELS.en)[name] || name; }

  // ---------- features ----------
  function renderFeatures() {
    var list = $("#features-list");
    list.textContent = "";
    CFG.features.forEach(function (f) {
      list.appendChild(el("li", { class: "feature reveal" }, [
        el("div", { class: "feature-icon" }, [icon(f.icon)]),
        el("h3", { text: L(f.title) }),
        el("p", { text: L(f.text) })
      ]));
    });
  }

  // ---------- gallery + lightbox ----------
  var lbIndex = 0;
  function renderGallery() {
    var list = $("#gallery-list");
    list.textContent = "";
    var total = CFG.gallery.length;
    CFG.gallery.forEach(function (g, i) {
      var btn = el("button", {
        type: "button",
        class: "gallery-item",
        "aria-label": t("gallery.open", { n: i + 1, total: total }) + " — " + L(g.alt)
      }, [el("img", { src: g.src, alt: "", loading: "lazy", decoding: "async", width: "800", height: "600" })]);
      btn.addEventListener("click", function () { openLightbox(i); });
      list.appendChild(el("li", { class: "reveal" }, [btn]));
    });
  }

  var lightbox = $("#lightbox");
  var lastFocus = null;
  function showLightbox(i) {
    var n = CFG.gallery.length;
    lbIndex = (i + n) % n;
    var g = CFG.gallery[lbIndex];
    var img = $("#lightbox-img");
    img.src = g.src;
    img.alt = L(g.alt);
    $("#lightbox-caption").textContent = L(g.alt);
    $("#lb-count").textContent = (lbIndex + 1) + " / " + n;
  }
  function openLightbox(i) {
    lastFocus = document.activeElement;
    showLightbox(i);
    if (typeof lightbox.showModal === "function") lightbox.showModal();
    else lightbox.setAttribute("open", "");
    document.body.style.overflow = "hidden";
    $("#lb-close").focus();
  }
  function closeLightbox() {
    if (typeof lightbox.close === "function" && lightbox.open) lightbox.close();
    else lightbox.removeAttribute("open");
  }
  lightbox.addEventListener("close", function () {
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  });
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", function () { showLightbox(lbIndex - 1); });
  $("#lb-next").addEventListener("click", function () { showLightbox(lbIndex + 1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.tagName === "FIGURE") closeLightbox();
  });
  lightbox.addEventListener("keydown", function (e) {
    var rtl = root.dir === "rtl";
    if (e.key === "ArrowRight") showLightbox(lbIndex + (rtl ? -1 : 1));
    else if (e.key === "ArrowLeft") showLightbox(lbIndex + (rtl ? 1 : -1));
  });
  // Swipe on phones.
  var touchX = null;
  lightbox.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) < 45) return;
    var forward = dx < 0;
    if (root.dir === "rtl") forward = !forward;
    showLightbox(lbIndex + (forward ? 1 : -1));
  }, { passive: true });

  // ---------- explore ----------
  function renderExplore() {
    var list = $("#explore-list");
    list.textContent = "";
    CFG.explore.forEach(function (p) {
      list.appendChild(el("li", { class: "card explore-card reveal" }, [
        el("img", { src: p.image, alt: L(p.title), loading: "lazy", decoding: "async", width: "800", height: "500" }),
        el("div", {}, [el("h3", { text: L(p.title) }), el("p", { text: L(p.text) })])
      ]));
    });
  }

  // ---------- contact ----------
  function renderContact() {
    var list = $("#phone-list");
    list.textContent = "";
    BIZ.phones.forEach(function (p) {
      list.appendChild(el("li", {}, [
        el("a", { href: "tel:" + p.tel }, [
          el("span", { class: "num", dir: "ltr", text: p.display.replace(/ /g, "\u00A0") }),
          el("span", { class: "call" }, [
            p.whatsapp ? el("span", { class: "wa-chip", title: "WhatsApp" }, [icon("whatsapp")]) : null,
            icon("phone"),
            t("contact.call")
          ])
        ])
      ]));
    });

    var times = $("#times");
    times.textContent = "";
    [["contact.checkIn", BIZ.checkIn], ["contact.checkOut", BIZ.checkOut]].forEach(function (row) {
      var value = L(row[1]);
      if (value === null && CFG.hidePlaceholders) return;
      times.appendChild(el("dt", {}, [icon("clock"), t(row[0])]));
      times.appendChild(el("dd", {}, [value === null ? tbd() : value]));
    });
  }

  // ---------- sister property ----------
  function renderSister() {
    var section = $("#sister");
    var sp = CFG.sister;
    if (!sp) { section.hidden = true; return; }
    section.hidden = false;
    $("#sister-name").textContent = L(sp.name) + " · " + L(sp.tagline);
    $("#sister-desc").textContent = L(sp.description);
    var img = $("#sister-img");
    img.src = sp.photo;
    img.alt = L(sp.name);
    var price = $("#sister-price");
    price.textContent = "";
    if (sp.priceMonthly) {
      price.appendChild(el("strong", { text: t("room.currency") + " " + sp.priceMonthly }));
      if (sp.priceWas) {
        price.appendChild(el("s", { text: t("room.currency") + " " + sp.priceWas, "aria-label": t("sister.was") + " " + sp.priceWas }));
      }
      price.appendChild(document.createTextNode(" " + L(sp.priceNote)));
    }
    $("#sister-wa").href = waLink(t("wa.sister"));
    $("#sister-call").href = "tel:" + sp.phone.tel;
    $("#sister-phone").textContent = sp.phone.display.replace(/ /g, "\u00A0");
    $("#sister-map").href = sp.mapsUrl;
  }

  // ---------- booking form ----------
  var form = $("#booking-form");
  var fIn = $("#f-checkin"), fOut = $("#f-checkout"), fGuests = $("#f-guests"), fRoom = $("#f-room"), fName = $("#f-name");

  function isoToday() {
    var d = new Date();
    return isoDate(d);
  }
  function isoDate(d) {
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  function parseISO(s) {
    var p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || "");
    return p ? new Date(+p[1], +p[2] - 1, +p[3]) : null;
  }
  function nightsBetween(a, b) { return Math.round((b - a) / 86400000); }
  function nightsText(n) {
    var form = n === 1 ? "one" : n === 2 ? "two" : n <= 10 ? "few" : "many";
    return t("booking.nights." + form, { n: n });
  }
  function fmtDate(d) {
    var locale = lang === "ar" ? "ar-OM-u-nu-latn" : "en-GB";
    try {
      return d.toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    } catch (e) {
      return isoDate(d);
    }
  }

  function populateFormOptions() {
    var guestsVal = fGuests.value || "2";
    var roomVal = fRoom.value;
    fGuests.textContent = "";
    for (var i = 1; i <= 10; i++) fGuests.appendChild(el("option", { value: String(i), text: String(i) }));
    fGuests.appendChild(el("option", { value: "10+", text: t("booking.guestsMore") }));
    fGuests.value = guestsVal;

    fRoom.textContent = "";
    fRoom.appendChild(el("option", { value: "", text: t("booking.roomAny") }));
    CFG.rooms.forEach(function (r) { fRoom.appendChild(el("option", { value: r.id, text: L(r.name) })); });
    fRoom.value = roomVal;
  }

  function setError(input, msgKey) {
    var errEl = $("#" + input.getAttribute("aria-describedby"));
    if (msgKey) {
      input.setAttribute("aria-invalid", "true");
      errEl.textContent = t(msgKey);
      errEl.setAttribute("data-key", msgKey);
    } else {
      input.removeAttribute("aria-invalid");
      errEl.textContent = "";
      errEl.removeAttribute("data-key");
    }
  }

  function updateNights() {
    var a = parseISO(fIn.value), b = parseISO(fOut.value);
    var out = $("#nights-out");
    if (a && b && b > a) out.textContent = nightsText(nightsBetween(a, b));
    else out.textContent = "";
  }

  function validate() {
    var ok = true;
    var a = parseISO(fIn.value), b = parseISO(fOut.value);
    var today = parseISO(isoToday());
    if (!a || a < today) { setError(fIn, "booking.err.checkin"); ok = false; } else setError(fIn, null);
    if (!b || !a || b <= a) { setError(fOut, "booking.err.checkout"); ok = false; } else setError(fOut, null);
    if (!fName.value.trim()) { setError(fName, "booking.err.name"); ok = false; } else setError(fName, null);
    return ok;
  }

  fIn.min = isoToday();
  fOut.min = isoToday();
  fIn.addEventListener("change", function () {
    var a = parseISO(fIn.value);
    if (a) {
      var next = new Date(a.getFullYear(), a.getMonth(), a.getDate() + 1);
      fOut.min = isoDate(next);
      var b = parseISO(fOut.value);
      if (!b || b <= a) fOut.value = isoDate(next);
    }
    if (fIn.getAttribute("aria-invalid")) validate();
    updateNights();
  });
  fOut.addEventListener("change", function () {
    if (fOut.getAttribute("aria-invalid")) validate();
    updateNights();
  });
  fName.addEventListener("input", function () { if (fName.getAttribute("aria-invalid")) setError(fName, null); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) {
      var first = $('[aria-invalid="true"]', form);
      if (first) first.focus();
      return;
    }
    var a = parseISO(fIn.value), b = parseISO(fOut.value);
    var room = CFG.rooms.filter(function (r) { return r.id === fRoom.value; })[0];
    var guests = fGuests.value === "10+" ? t("booking.guestsMore") : fGuests.value;
    var msg = t("wa.form", {
      business: L(BIZ.name),
      name: fName.value.trim(),
      room: room ? L(room.name) : t("booking.roomAny"),
      checkin: fmtDate(a),
      checkout: fmtDate(b),
      nights: nightsText(nightsBetween(a, b)),
      guests: guests
    });
    var url = waLink(msg);
    var win = window.open(url, "_blank", "noopener");
    if (!win) window.location.href = url; // pop-up blocked: open in the same tab
  });

  function refreshFormErrors() {
    $all(".field-error[data-key]", form).forEach(function (p) { p.textContent = t(p.getAttribute("data-key")); });
    updateNights();
  }

  // ---------- structured data (JSON-LD) ----------
  function renderJsonLd() {
    var data = {
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": BIZ.name.en,
      "alternateName": [BIZ.name.ar, BIZ.shortName.en, BIZ.shortName.ar],
      "description": CFG.text.en["meta.description"],
      "url": CFG.siteUrl,
      "image": CFG.siteUrl + "assets/img/og-image.jpg",
      "logo": CFG.siteUrl + "assets/img/logo.svg",
      "telephone": BIZ.phones[0].tel,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": BIZ.district.en,
        "addressLocality": BIZ.city.en,
        "addressRegion": BIZ.region.en,
        "addressCountry": BIZ.countryCode
      },
      "hasMap": BIZ.mapsUrl,
      "geo": { "@type": "GeoCoordinates", "latitude": BIZ.geo.lat, "longitude": BIZ.geo.lng },
      "availableLanguage": ["English", "Arabic"],
      "contactPoint": BIZ.phones.map(function (p) {
        return { "@type": "ContactPoint", "telephone": p.tel, "contactType": "reservations", "availableLanguage": ["English", "Arabic"] };
      }),
      "amenityFeature": CFG.features.map(function (f) {
        return { "@type": "LocationFeatureSpecification", "name": f.title.en, "value": true };
      })
    };
    // Google requires a review count with a rating, so the rating is only published once it is set.
    if (BIZ.reviewCount) {
      data.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": BIZ.googleRating,
        "bestRating": 5,
        "reviewCount": BIZ.reviewCount
      };
    }
    var prices = CFG.rooms.map(function (r) { return r.priceFrom; }).filter(function (p) { return typeof p === "number"; });
    if (prices.length) data.priceRange = "OMR " + Math.min.apply(null, prices) + "+";
    if (BIZ.checkIn && BIZ.checkIn.en) data.checkinTime = BIZ.checkIn.en;
    if (BIZ.checkOut && BIZ.checkOut.en) data.checkoutTime = BIZ.checkOut.en;

    var s = $("#ld-json");
    if (!s) {
      s = el("script", { type: "application/ld+json", id: "ld-json" });
      document.head.appendChild(s);
    }
    s.textContent = JSON.stringify(data);
  }

  // ---------- language ----------
  function setLang(next, persist) {
    lang = next;
    root.lang = next;
    root.dir = next === "ar" ? "rtl" : "ltr";
    var ogLocale = $('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", next === "ar" ? "ar_OM" : "en_GB");

    applyStaticText();
    renderRooms();
    renderFeatures();
    renderGallery();
    renderExplore();
    renderContact();
    renderSister();
    populateFormOptions();
    refreshFormErrors();
    observeReveals();

    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* storage blocked: choice lasts this visit */ }
      try {
        var url = new URL(window.location.href);
        if (next === "ar") url.searchParams.set("lang", "ar");
        else url.searchParams.delete("lang");
        history.replaceState(null, "", url.pathname + url.search + url.hash);
      } catch (e) { /* old browser: URL stays as is */ }
    }
    root.classList.remove("i18n-pending");
  }

  $("#lang-toggle").addEventListener("click", function () {
    setLang(lang === "ar" ? "en" : "ar", true);
    closeMenu();
  });

  // ---------- mobile menu ----------
  var menuBtn = $("#menu-toggle");
  var nav = $("#site-nav");
  function closeMenu() {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", t("nav.menu"));
  }
  menuBtn.addEventListener("click", function () {
    var open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", t(open ? "nav.close" : "nav.menu"));
  });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", function () { if (window.innerWidth >= 960) closeMenu(); });

  // ---------- header shadow ----------
  var header = $(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- floating button: step aside while the booking form is on screen ----------
  var floatBtn = $(".wa-float");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      floatBtn.classList.toggle("is-hidden", entries[0].isIntersecting);
    }, { threshold: 0.15 }).observe(form);
  }

  // ---------- reveal on scroll ----------
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -40px 0px", threshold: 0.08 }) : null;
  function observeReveals() {
    $all(".reveal:not(.in)").forEach(function (n) {
      if (io) io.observe(n); else n.classList.add("in");
    });
  }

  renderJsonLd();
  setLang(lang, false);
})();
