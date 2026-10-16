# Al Saadah Royal Residential Complex — website

Static bilingual (English / العربية) website for **Al Saadah Royal Residential Complex**
(مجمع السعادة رويال) — furnished rooms & studios in Salalah, Oman. Plain HTML, CSS and
vanilla JavaScript: no build step, no server, no database. Every booking button opens WhatsApp
(+968 9897 4409) with a pre-filled message.

Live (once published): **https://jeeveshverma.github.io/al-saadah-royal/** · Arabic: `?lang=ar`

## Files

```
index.html               The page (English text is also here as a no-JavaScript fallback)
site-config.js           ALL editable content: rooms, prices, phones, features, gallery, texts EN + AR
assets/css/style.css     Styles; colours and fonts are set at the top in :root
assets/js/main.js        Language switch, rendering from the config, WhatsApp links, booking form, lightbox
assets/img/              Logo, favicons, share image; placeholders/ (drawn stand-ins); photos/ (real photos go here)
assets/img/README.md     Which photos to collect from the owner, file names and sizes
tools/                   make_placeholders.py, og-image.html (share image source), icon.html
robots.txt, sitemap.xml, .nojekyll
```

## Editing content (`site-config.js`)

Open `site-config.js` in any text editor. Everything has an `en` and `ar` version.

* **Prices** — set `priceFrom` on each room to a number in OMR per night, e.g. `priceFrom: 25`.
  While it is `null` the card shows **"From OMR __ / night"** (dashed gold underline = not confirmed).
* **Rooms** — edit `name`, `description`, `size`, `beds`, `guests`, `amenities` (icon names listed at
  the top of the file). Add a room by copying a `{ ... }` block; delete one by removing its block.
  Rooms also appear automatically in the booking form's "Room type" list.
* **Photos** — put files in `assets/img/photos/` and change the paths, e.g.
  `photo: "assets/img/photos/studio.jpg"`. See `assets/img/README.md`.
* **Why stay with us** — the `features` list. These six points are the brief's assumptions:
  confirm each with the owner and delete any that are not true.
* **Phones / WhatsApp / map** — in `business`.
* **Check-in / check-out times** — `business.checkIn` / `checkOut` (shown in Contact once set).
* **Google review count** — `business.reviewCount`. The star rating is only added to Google's
  structured data once this is filled in (Google needs both).
* **Before showing it live with gaps:** set `hidePlaceholders: true` and every unknown value is
  replaced with friendly wording ("Ask for today's rate") instead of "__".
* **Any wording** — the `text.en` / `text.ar` blocks. `{room}`, `{name}` etc. are filled in
  automatically; keep them. `\n` is a new line in the WhatsApp message.

Nothing else needs touching. If you change the English text of the headline or description, also
update the matching English line in `index.html` (used by search engines and with JavaScript off)
and the `<title>`/`<meta>` tags at the top.

## Preview locally

```
cd al-saadah-royal
python3 -m http.server 8000      # then open http://localhost:8000  (Arabic: http://localhost:8000/?lang=ar)
```

## Deploy to GitHub Pages

```
cd al-saadah-royal
git add -A && git commit -m "Al Saadah Royal website"
gh repo create jeeveshverma/al-saadah-royal --public --source . --push
gh api -X POST repos/jeeveshverma/al-saadah-royal/pages -f "source[branch]=main" -f "source[path]=/"
```

(Or on github.com: Settings → Pages → Deploy from a branch → `main` / `/ (root)`.) It goes live at
`https://jeeveshverma.github.io/al-saadah-royal/` within a minute or two. Every later
`git push` redeploys.

**Custom domain later:** add it under Settings → Pages, then search-and-replace
`https://jeeveshverma.github.io/al-saadah-royal/` in `index.html`, `site-config.js` (`siteUrl`),
`robots.txt` and `sitemap.xml`.

## Regenerating images

* Placeholders, logo, favicon: `python3 tools/make_placeholders.py`
* Share image (after the real hero photo is in, edit the `background` URL in `tools/og-image.html`):

```
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --hide-scrollbars --window-size=1200,630 --virtual-time-budget=4000 \
  --screenshot=$PWD/og.png "file://$PWD/tools/og-image.html"
sips -s format jpeg -s formatOptions 82 og.png --out assets/img/og-image.jpg && rm og.png
```

WhatsApp caches link previews; to see a new image, share the link with `?v=2` on the end.

## Facts used (from the owner — nothing else is claimed)

Name EN/AR, tagline, Salalah / Dhofar, Google rating 4.4, WhatsApp +968 9897 4409, phones
+968 7921 5132 / 9800 2774 / 9066 3784, WhatsApp catalogue, Google Maps link. Prices, room list,
sizes, amenities and check-in times are **unknown** and shown as placeholders. The Explore Salalah
descriptions are general and claim no distances. No reviews are quoted.

## Checks run

* `npx html-validate index.html` (HTML5 lint)
* Headless Chrome: no console errors in English and Arabic; screenshots at 390 px and 1280 px
* Lighthouse (mobile)
