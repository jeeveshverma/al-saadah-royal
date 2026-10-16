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
* **Photos** — put files in `assets/img/photos/`, run `./tools/make_thumbs.sh` (makes the 700 px
  `-sm.jpg` copies used by room cards and the gallery grid), then add them to the config:
  room `photos: [...]` (swipeable strip on each card), `gallery` (`src` full size for the lightbox,
  `thumb` for the grid), `images.heroSlides` (the hero cross-fades through these). See `assets/img/README.md`.
* **Reviews** — `reviews` holds real Google reviews (English = Google's translation, Arabic =
  the original). Only add reviews that exist on Google. Update `business.reviewCount` and
  `googleRating` together when the Google numbers change.
* **Sister building** — `sister` (Al Khaleel Building, monthly apartments). `sister: null` hides it.
* **Why stay with us** — the `features` list; every point comes from the owner's WhatsApp catalogue.
* **Phones / WhatsApp / map** — in `business`.
* **Check-in / check-out times** — `business.checkIn` / `checkOut` (shown in Contact once set).
* **Google review count** — `business.reviewCount` (13 on 16 Oct 2026). The star rating goes into
  Google's structured data only while this is set (Google needs both).
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

## Where the facts came from (checked 16 Oct 2026)

| Fact | Source |
|---|---|
| Two unit types (room + bathroom + kitchenette; room + bathroom), daily & monthly rent, water/electricity/internet/parking/cleaning/reception included, "South Al Saadah, near all services" | Owner's WhatsApp catalogue item "مجمع السعاده رويال" |
| Phones 9897 4409 (WhatsApp), 9066 3784, 9800 2774; sister Al Khaleel Building (2 bed, 2 bath, hall, kitchen) on 7921 5132 | Owner's WhatsApp auto-reply |
| Al Khaleel Building OMR 110/month (was 120), utilities included, cleaning, parking, reception, lift | Owner's WhatsApp catalogue item "شقه غرفتين وصاله…" |
| Rating 4.4 from 13 reviews, category Hotel, pin 17.0587823, 54.1563167, plus code 3554+GG, the six quoted reviews | Google Maps listing |
| All photos | The owner's own photos (identical in the WhatsApp catalogue and the Google listing "by owner"); the building shot is cropped to leave out a child and a car plate, the night shot to leave out cars |

Still **unknown**: nightly prices, sizes, beds, guests per unit, check-in/out times, logo. Room
cards show "Daily & monthly · Bills included" until prices are set. The Explore Salalah texts are
general and claim no distances. Not quoted: the two 1-star reviews, and one 5-star review posted
by the sister building's own account.

Open question for the owner: the catalogue's link for the apartments points to "بناية وادي الريم",
the auto-reply's to "بناية الخليل" (the site uses the latter).

## Motion

Hero cross-fade with a slow zoom (starts after load), headline rising in, scroll hint, cards
arriving one after another, review marquee (pauses on hover), counting rating, twinkling
string-light garland over Location (echoing the courtyard's real lights), button shine. All of it
switches off under the visitor's "reduce motion" setting.

## Checks run

* `npx html-validate index.html` (HTML5 lint)
* Headless Chrome: no console errors in English and Arabic; screenshots at 390 px and 1280 px
* Lighthouse (mobile)
