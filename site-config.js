/*
 * Al Saadah Royal Residential Complex — ALL editable website content lives here.
 *
 * How to edit:
 *  - Every text has an English (en) and Arabic (ar) version.
 *  - Unknown values are `null`. While a value is null the site shows a clearly
 *    marked placeholder such as "From OMR __ / night". Fill it in and it appears.
 *  - Set `hidePlaceholders: true` before going live if some values are still
 *    unknown: placeholders are then replaced by friendly text
 *    ("Ask for today's rate") instead of "__".
 *  - Photos: drop JPG/WebP files into assets/img/photos/ and change the `src`
 *    paths below (see assets/img/README.md for the list of photos to collect).
 *  - Icons available: family, sofa, kitchen, wifi, parking, mountain, bed,
 *    users, ac, tv, washer, bath, car, star, calendar, clock, shield, pin.
 */
window.SITE_CONFIG = {
  // Public address of the site. Change it if you move to a custom domain.
  siteUrl: "https://jeeveshverma.github.io/al-saadah-royal/",

  // true = hide "__" placeholders and show friendly text instead.
  hidePlaceholders: true,

  business: {
    name: { en: "Al Saadah Royal Residential Complex", ar: "مجمع السعادة رويال" },
    shortName: { en: "Al Saadah Royal", ar: "السعادة رويال" },
    tagline: { en: "Furnished rooms & studios", ar: "غرف واستوديوهات مفروشة" },
    district: { en: "South Al Saadah", ar: "السعادة الجنوبية" },
    city: { en: "Salalah", ar: "صلالة" },
    region: { en: "Dhofar", ar: "ظفار" },
    country: { en: "Sultanate of Oman", ar: "سلطنة عُمان" },
    countryCode: "OM",

    // Google rating. reviewCount is unknown: put the number of Google reviews
    // here (e.g. 37). The structured-data rating is only published once it is set.
    googleRating: 4.4,
    reviewCount: null,

    // WhatsApp booking number (digits only, with country code) + how it is shown.
    whatsapp: "96898974409",
    whatsappDisplay: "+968 9897 4409",

    // Al Saadah Royal's phone numbers (from the owner's WhatsApp auto-reply), shown as
    // tap-to-call. The first is the WhatsApp booking line.
    // (+968 7921 5132 belongs to the sister building — see `sister` below.)
    phones: [
      { tel: "+96898974409", display: "+968 9897 4409", whatsapp: true },
      { tel: "+96890663784", display: "+968 9066 3784" },
      { tel: "+96898002774", display: "+968 9800 2774" }
    ],

    catalogueUrl: "https://wa.me/c/96898974409",
    mapsUrl: "https://maps.app.goo.gl/iqsjKzkh4NESFzcK8",
    // Exact pin from the Google Maps listing (plus code 3554+GG Salalah).
    geo: { lat: 17.0587823, lng: 54.1563167 },
    plusCode: "3554+GG Salalah",

    // Unknown for now. Fill in like { en: "2:00 pm", ar: "2:00 مساءً" }.
    checkIn: null,
    checkOut: null
  },

  images: {
    hero: {
      src: "assets/img/photos/building.jpg",
      alt: {
        en: "Al Saadah Royal Residential Complex — the white stone building with green trim in South Al Saadah, Salalah",
        ar: "مجمع السعادة رويال السكني — المبنى الحجري الأبيض في السعادة الجنوبية، صلالة"
      }
    }
  },

  /*
   * Rooms & studios — the two unit types listed in the owner's WhatsApp catalogue:
   * "( غرفه ودورة مياه ومطبخ تحظيري ) ( غرفه ودورة مياه )", rented daily and monthly,
   * with water, electricity, internet, parking, regular cleaning and a reception desk.
   * Sizes, beds, guests and prices are NOT known yet (null) — fill them in when Khaleel sends them.
   *   priceFrom: number in OMR per night, e.g. 25
   *   size:      text, e.g. { en: "35 m²", ar: "35 م²" }
   *   beds:      text, e.g. { en: "1 king bed", ar: "سرير كبير" }
   *   guests:    number, e.g. 2
   */
  rooms: [
    {
      id: "studio",
      name: { en: "Furnished Studio", ar: "استوديو مفروش" },
      description: {
        en: "A furnished room with its own bathroom and a kitchenette — for daily or monthly stays.",
        ar: "غرفة مفروشة مع دورة مياه خاصة ومطبخ تحضيري — للإيجار اليومي أو الشهري."
      },
      photo: "assets/img/placeholders/room-2.svg",
      size: null,
      beds: null,
      guests: null,
      priceFrom: null,
      amenities: ["bed", "bath", "kitchen", "wifi", "parking"]
    },
    {
      id: "room",
      name: { en: "Furnished Room", ar: "غرفة مفروشة" },
      description: {
        en: "A furnished room with its own bathroom — for daily or monthly stays.",
        ar: "غرفة مفروشة مع دورة مياه خاصة — للإيجار اليومي أو الشهري."
      },
      photo: "assets/img/placeholders/room-1.svg",
      size: null,
      beds: null,
      guests: null,
      priceFrom: null,
      amenities: ["bed", "bath", "wifi", "parking"]
    }
  ],

  // "Why stay with us" grid. EDITABLE — confirm each point with the owner and
  // delete any that do not apply.
  features: [
    {
      icon: "sofa",
      title: { en: "Fully furnished", ar: "مفروشة بالكامل" },
      text: { en: "Rooms and studios ready to move into — just bring your suitcase.", ar: "غرف واستوديوهات جاهزة للسكن — أحضر حقيبتك فقط." }
    },
    {
      icon: "bolt",
      title: { en: "Water, electricity & internet included", ar: "الماء والكهرباء والإنترنت مشمولة" },
      text: { en: "No extra bills: utilities and Wi-Fi come with every stay.", ar: "لا فواتير إضافية: الخدمات والإنترنت مشمولة في كل إقامة." }
    },
    {
      icon: "parking",
      title: { en: "Parking", ar: "مواقف سيارات" },
      text: { en: "Park in the paved courtyard right by the building.", ar: "مواقف في الساحة المرصوفة بجانب المبنى." }
    },
    {
      icon: "sparkle",
      title: { en: "Regular cleaning", ar: "نظافة دورية" },
      text: { en: "Housekeeping keeps your room fresh during your stay.", ar: "خدمة تنظيف دورية طوال فترة إقامتك." }
    },
    {
      icon: "bell",
      title: { en: "Reception desk", ar: "مكتب استقبال" },
      text: { en: "Someone on site to welcome you and help with anything you need.", ar: "فريق في الموقع لاستقبالك ومساعدتك في كل ما تحتاجه." }
    },
    {
      icon: "calendar",
      title: { en: "Daily & monthly stays", ar: "إيجار يومي وشهري" },
      text: { en: "Stay a night, a week, or the whole Khareef season.", ar: "ليلة أو أسبوع أو موسم الخريف كاملاً." }
    }
  ],

  // Gallery photos. Replace placeholders with real photos (see assets/img/README.md).
  gallery: [
    { src: "assets/img/photos/building.jpg", alt: { en: "The building and its paved courtyard", ar: "المبنى والساحة المرصوفة" } },
    { src: "assets/img/placeholders/gallery-2.svg", alt: { en: "Bedroom (placeholder)", ar: "غرفة النوم (صورة مؤقتة)" } },
    { src: "assets/img/placeholders/gallery-3.svg", alt: { en: "Living area (placeholder)", ar: "غرفة المعيشة (صورة مؤقتة)" } },
    { src: "assets/img/placeholders/gallery-4.svg", alt: { en: "Kitchen (placeholder)", ar: "المطبخ (صورة مؤقتة)" } },
    { src: "assets/img/placeholders/gallery-5.svg", alt: { en: "Bathroom (placeholder)", ar: "الحمام (صورة مؤقتة)" } },
    { src: "assets/img/placeholders/gallery-6.svg", alt: { en: "Studio (placeholder)", ar: "الاستوديو (صورة مؤقتة)" } },
    { src: "assets/img/placeholders/gallery-7.svg", alt: { en: "Entrance & reception (placeholder)", ar: "المدخل والاستقبال (صورة مؤقتة)" } },
    { src: "assets/img/placeholders/gallery-8.svg", alt: { en: "Parking area (placeholder)", ar: "مواقف السيارات (صورة مؤقتة)" } }
  ],

  // Nearby highlights. Generic descriptions only — no distances are claimed.
  explore: [
    {
      image: "assets/img/placeholders/explore-mughsail.svg",
      title: { en: "Al Mughsail Beach", ar: "شاطئ المغسيل" },
      text: {
        en: "A long sweep of white sand beneath limestone cliffs, famous for its sea blowholes that spray when the waves are up.",
        ar: "شاطئ رملي أبيض طويل تحت منحدرات جيرية، يشتهر بفتحات النوافير البحرية التي تتدفق مع ارتفاع الأمواج."
      }
    },
    {
      image: "assets/img/placeholders/explore-darbat.svg",
      title: { en: "Wadi Darbat", ar: "وادي دربات" },
      text: {
        en: "A green valley of lakes, waterfalls and grazing camels — at its most beautiful during the Khareef season.",
        ar: "وادٍ أخضر بالبحيرات والشلالات والإبل الراعية — في أجمل حلّته خلال موسم الخريف."
      }
    },
    {
      image: "assets/img/placeholders/explore-haffa.svg",
      title: { en: "Al Haffa Souq", ar: "سوق الحافة" },
      text: {
        en: "The traditional souq for Dhofari frankincense, perfumes, incense burners and gifts to take home.",
        ar: "السوق التقليدي للبان الظفاري والعطور والمباخر والهدايا التذكارية."
      }
    },
    {
      image: "assets/img/placeholders/explore-razat.svg",
      title: { en: "Ayn Razat", ar: "عين رزات" },
      text: {
        en: "A natural spring set in shaded gardens — a relaxed spot for a family picnic.",
        ar: "عين ماء طبيعية وسط حدائق ظليلة — مكان هادئ لنزهة عائلية."
      }
    }
  ],

  /*
   * Sister property from the same owner (from the WhatsApp auto-reply and catalogue).
   * Set `sister: null` to hide the section.
   * Note: the catalogue item's map link points to "بناية وادي الريم"; the auto-reply's link
   * (used here) points to "بناية الخليل شقق مفروشة" — confirm which is right with Khaleel.
   */
  sister: {
    name: { en: "Al Khaleel Building", ar: "بناية الخليل" },
    tagline: { en: "Furnished apartments for monthly rent", ar: "شقق مفروشة للإيجار الشهري" },
    description: {
      en: "Clean two-bedroom apartments with a living room, two bathrooms and a kitchen. Regular cleaning, parking, reception and a lift.",
      ar: "شقق نظيفة بغرفتي نوم وصالة ودورتي مياه ومطبخ، مع نظافة دورية ومواقف سيارات ومكتب استقبال ومصعد."
    },
    photo: "assets/img/photos/khaleel-1.jpg",
    priceMonthly: 110,
    priceWas: 120,
    priceNote: { en: "/ month · water, electricity & internet included", ar: "/ شهرياً · شامل الماء والكهرباء والإنترنت" },
    phone: { tel: "+96879215132", display: "+968 7921 5132" },
    mapsUrl: "https://maps.app.goo.gl/Qksn8izPsFQ8hQYR7"
  },

  // Website credit in the footer.
  credit: { name: "Jeevesh Verma", url: "https://jeeveshverma.github.io/castlestaramman/" },

  /*
   * Interface text. {placeholders} in curly braces are filled in automatically.
   */
  text: {
    en: {
      "meta.title": "Al Saadah Royal | Furnished apartments & studios in Salalah",
      "meta.description": "Al Saadah Royal Residential Complex: furnished rooms and studios in South Al Saadah, Salalah, Oman. Daily and monthly stays, utilities and Wi-Fi included, rated 4.4 on Google. Book on WhatsApp +968 9897 4409.",

      "skip": "Skip to content",
      "nav.rooms": "Rooms",
      "nav.why": "Why us",
      "nav.location": "Location",
      "nav.contact": "Contact",
      "nav.book": "Book on WhatsApp",
      "nav.menu": "Menu",
      "nav.close": "Close menu",
      "lang.switch": "العربية",
      "lang.switchLabel": "التبديل إلى العربية",

      "hero.eyebrow": "Salalah · Dhofar · Oman",
      "hero.title": "Furnished rooms & studios in the heart of Salalah",
      "hero.lead": "Furnished rooms and studios in South Al Saadah for daily and monthly stays — water, electricity, internet and parking included. Book directly with us on WhatsApp.",
      "hero.cta1": "Check availability on WhatsApp",
      "hero.cta2": "View photos",
      "hero.rating": "on Google",
      "hero.ratingLabel": "Rated {rating} out of 5 on Google — open in Google Maps",

      "rooms.eyebrow": "Rooms & studios",
      "rooms.title": "Find the right space for your stay",
      "rooms.lead": "Two types of furnished unit, each with its own bathroom, for daily or monthly rent. Send us your dates on WhatsApp for the rate.",
      "room.from": "From",
      "room.perNight": "/ night",
      "room.currency": "OMR",
      "room.askRate": "Ask for today's rate",
      "room.size": "Size",
      "room.beds": "Beds",
      "room.guests": "Up to {n} guests",
      "room.guestsLabel": "Guests",
      "room.amenities": "Amenities",
      "room.book": "Book this on WhatsApp",
      "room.tbdNote": "Details to be confirmed",

      "booking.eyebrow": "Quick booking",
      "booking.title": "Send us your dates",
      "booking.lead": "Fill in the form and we'll open WhatsApp with your request ready to send. We reply with availability and the price.",
      "booking.checkin": "Check-in",
      "booking.checkout": "Check-out",
      "booking.guests": "Guests",
      "booking.room": "Room type",
      "booking.roomAny": "Not sure yet — please advise",
      "booking.name": "Your name",
      "booking.namePlaceholder": "e.g. Ahmed",
      "booking.submit": "Send request on WhatsApp",
      "booking.note": "No payment now. Nothing is booked until we confirm on WhatsApp.",
      // Night counts: one / two / 3–10 / 11+ (Arabic grammar needs all four)
      "booking.nights.one": "1 night",
      "booking.nights.two": "2 nights",
      "booking.nights.few": "{n} nights",
      "booking.nights.many": "{n} nights",
      "booking.err.checkin": "Please choose a check-in date (today or later).",
      "booking.err.checkout": "Check-out must be after check-in.",
      "booking.err.name": "Please enter your name.",
      "booking.guestsMore": "10+",

      "why.eyebrow": "Why stay with us",
      "why.title": "A home base for your Salalah trip",
      "why.lead": "Everything included, so you can simply settle in.",

      "gallery.eyebrow": "Gallery",
      "gallery.title": "Take a look around",
      "gallery.catalogue": "See full photo catalogue on WhatsApp",
      "gallery.open": "Open photo {n} of {total}",
      "lightbox.close": "Close",
      "lightbox.prev": "Previous photo",
      "lightbox.next": "Next photo",

      "explore.eyebrow": "Explore Salalah",
      "explore.title": "Make the most of the Khareef",
      "explore.lead": "Salalah is the gateway to some of Oman's greenest landscapes. A few favourites to plan your days around:",

      "location.eyebrow": "Location",
      "location.title": "Find us in Salalah",
      "location.lead": "We're in South Al Saadah, a residential area of Salalah close to everyday services. Open the map for directions straight to our door.",
      "location.open": "Open in Google Maps",
      "location.mapTitle": "Map showing Al Saadah Royal Residential Complex in Salalah",

      "contact.eyebrow": "Contact",
      "contact.title": "Talk to us",
      "contact.lead": "WhatsApp is the fastest way to reach us. You can also call any of these numbers.",
      "contact.whatsapp": "Chat on WhatsApp",
      "contact.phones": "Phone numbers",
      "contact.call": "Call",
      "contact.catalogue": "Photo catalogue on WhatsApp",
      "contact.checkIn": "Check-in",
      "contact.checkOut": "Check-out",
      "contact.tbd": "__",

      "footer.rights": "All rights reserved.",

      "sister.eyebrow": "Also from Al Khaleel",
      "sister.title": "Need a bigger apartment?",
      "sister.lead": "Our sister building has two-bedroom apartments for families and monthly stays.",
      "sister.was": "was",
      "sister.call": "Call",
      "sister.map": "Map",
      "sister.wa": "Ask on WhatsApp",
      "wa.sister": "Hello, I'm interested in a two-bedroom apartment at Al Khaleel Building for monthly rent.\nMove-in date: \nNumber of people: ",
      "footer.credit": "Website by",

      "float.label": "Book on WhatsApp",

      "wa.general": "Hello {business}, I'd like to check availability.\nCheck-in date: \nCheck-out date: \nNumber of guests: ",
      "wa.room": "Hello {business}, I'd like to book the {room}.\nCould you please confirm availability and the price?\nCheck-in date: \nCheck-out date: \nNumber of guests: ",
      "wa.form": "Hello {business}, I'd like to check availability:\n\nName: {name}\nRoom type: {room}\nCheck-in: {checkin}\nCheck-out: {checkout} ({nights})\nGuests: {guests}\n\nThank you!"
    },

    ar: {
      "meta.title": "السعادة رويال | شقق واستوديوهات مفروشة في صلالة",
      "meta.description": "مجمع السعادة رويال السكني: غرف واستوديوهات مفروشة في السعادة الجنوبية، صلالة. إيجار يومي وشهري، شامل الماء والكهرباء والإنترنت، تقييم 4.4 على جوجل. احجز عبر واتساب ‎+968 9897 4409.",

      "skip": "انتقل إلى المحتوى",
      "nav.rooms": "الغرف",
      "nav.why": "لماذا نحن",
      "nav.location": "الموقع",
      "nav.contact": "تواصل معنا",
      "nav.book": "احجز عبر واتساب",
      "nav.menu": "القائمة",
      "nav.close": "إغلاق القائمة",
      "lang.switch": "English",
      "lang.switchLabel": "Switch to English",

      "hero.eyebrow": "صلالة · ظفار · عُمان",
      "hero.title": "غرف واستوديوهات مفروشة في قلب صلالة",
      "hero.lead": "غرف واستوديوهات مفروشة في السعادة الجنوبية للإيجار اليومي والشهري — شامل الماء والكهرباء والإنترنت ومواقف السيارات. احجز معنا مباشرة عبر واتساب.",
      "hero.cta1": "تحقق من التوفر عبر واتساب",
      "hero.cta2": "شاهد الصور",
      "hero.rating": "على جوجل",
      "hero.ratingLabel": "التقييم {rating} من 5 على جوجل — افتح في خرائط جوجل",

      "rooms.eyebrow": "الغرف والاستوديوهات",
      "rooms.title": "اختر المساحة المناسبة لإقامتك",
      "rooms.lead": "نوعان من الوحدات المفروشة، كل منها بدورة مياه خاصة، للإيجار اليومي أو الشهري. أرسل لنا تواريخك عبر واتساب لمعرفة السعر.",
      "room.from": "ابتداءً من",
      "room.perNight": "/ لليلة",
      "room.currency": "ر.ع.",
      "room.askRate": "اسأل عن سعر اليوم",
      "room.size": "المساحة",
      "room.beds": "الأسرّة",
      "room.guests": "حتى {n} ضيوف",
      "room.guestsLabel": "الضيوف",
      "room.amenities": "المرافق",
      "room.book": "احجز هذه الوحدة عبر واتساب",
      "room.tbdNote": "التفاصيل قيد التأكيد",

      "booking.eyebrow": "حجز سريع",
      "booking.title": "أرسل لنا تواريخ إقامتك",
      "booking.lead": "املأ النموذج وسنفتح لك واتساب برسالة جاهزة للإرسال. نرد عليك بالتوفر والسعر.",
      "booking.checkin": "تاريخ الوصول",
      "booking.checkout": "تاريخ المغادرة",
      "booking.guests": "عدد الضيوف",
      "booking.room": "نوع الوحدة",
      "booking.roomAny": "لم أقرر بعد — أرجو الاقتراح",
      "booking.name": "الاسم",
      "booking.namePlaceholder": "مثال: أحمد",
      "booking.submit": "أرسل الطلب عبر واتساب",
      "booking.note": "لا دفع الآن. لا يتم تأكيد الحجز إلا بعد ردّنا عبر واتساب.",
      "booking.nights.one": "ليلة واحدة",
      "booking.nights.two": "ليلتان",
      "booking.nights.few": "{n} ليالٍ",
      "booking.nights.many": "{n} ليلة",
      "booking.err.checkin": "يرجى اختيار تاريخ الوصول (اليوم أو بعده).",
      "booking.err.checkout": "يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول.",
      "booking.err.name": "يرجى كتابة اسمك.",
      "booking.guestsMore": "+10",

      "why.eyebrow": "لماذا تقيم معنا",
      "why.title": "مقرّك المريح خلال رحلتك إلى صلالة",
      "why.lead": "كل شيء مشمول، لتستقر براحة.",

      "gallery.eyebrow": "معرض الصور",
      "gallery.title": "ألقِ نظرة",
      "gallery.catalogue": "شاهد كتالوج الصور الكامل على واتساب",
      "gallery.open": "افتح الصورة {n} من {total}",
      "lightbox.close": "إغلاق",
      "lightbox.prev": "الصورة السابقة",
      "lightbox.next": "الصورة التالية",

      "explore.eyebrow": "اكتشف صلالة",
      "explore.title": "استمتع بموسم الخريف",
      "explore.lead": "صلالة بوابتك إلى أكثر مناظر عُمان خضرة. بعض الأماكن المفضلة لتخطيط أيامك:",

      "location.eyebrow": "الموقع",
      "location.title": "موقعنا في صلالة",
      "location.lead": "نحن في السعادة الجنوبية، منطقة سكنية في صلالة قريبة من جميع الخدمات. افتح الخريطة للحصول على الاتجاهات حتى باب المجمع.",
      "location.open": "افتح في خرائط جوجل",
      "location.mapTitle": "خريطة توضح موقع مجمع السعادة رويال في صلالة",

      "contact.eyebrow": "تواصل معنا",
      "contact.title": "يسعدنا تواصلك",
      "contact.lead": "واتساب أسرع وسيلة للتواصل معنا، ويمكنك أيضاً الاتصال على أي من هذه الأرقام.",
      "contact.whatsapp": "تواصل عبر واتساب",
      "contact.phones": "أرقام الهاتف",
      "contact.call": "اتصل",
      "contact.catalogue": "كتالوج الصور على واتساب",
      "contact.checkIn": "تسجيل الوصول",
      "contact.checkOut": "تسجيل المغادرة",
      "contact.tbd": "__",

      "footer.rights": "جميع الحقوق محفوظة.",

      "sister.eyebrow": "أيضاً من الخليل",
      "sister.title": "تحتاج شقة أكبر؟",
      "sister.lead": "في بنايتنا الشقيقة شقق بغرفتي نوم للعائلات والإيجار الشهري.",
      "sister.was": "بدلاً من",
      "sister.call": "اتصل",
      "sister.map": "الخريطة",
      "sister.wa": "استفسر عبر واتساب",
      "wa.sister": "مرحباً، أرغب في الاستفسار عن شقة بغرفتي نوم في بناية الخليل للإيجار الشهري.\nتاريخ الدخول: \nعدد الأشخاص: ",
      "footer.credit": "تصميم الموقع:",

      "float.label": "احجز عبر واتساب",

      "wa.general": "مرحباً {business}، أرغب في الاستفسار عن التوفر.\nتاريخ الوصول: \nتاريخ المغادرة: \nعدد الضيوف: ",
      "wa.room": "مرحباً {business}، أرغب في حجز {room}.\nهل يمكنكم تأكيد التوفر والسعر؟\nتاريخ الوصول: \nتاريخ المغادرة: \nعدد الضيوف: ",
      "wa.form": "مرحباً {business}، أرغب في الاستفسار عن التوفر:\n\nالاسم: {name}\nنوع الوحدة: {room}\nتاريخ الوصول: {checkin}\nتاريخ المغادرة: {checkout} ({nights})\nعدد الضيوف: {guests}\n\nشكراً لكم!"
    }
  }
};
