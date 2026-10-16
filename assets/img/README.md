# Images

Everything in `placeholders/` is a drawn stand-in. Swap each one for a real photo, then point
`site-config.js` at the new file.

## Photos to collect from the owner's WhatsApp catalogue (https://wa.me/c/96898974409)

Ask Khaleel for the original files (WhatsApp → photo → Share → "Document" keeps full quality).

| # | Save as (in `photos/`) | What to shoot / pick | Used in `site-config.js` |
|---|---|---|---|
| 1 | `hero.jpg` | Best wide shot of the building outside, daylight, ideally with greenery (landscape) | `images.hero.src` |
| 2 | `room.jpg` | Furnished room, bed made, lights on | `rooms[0].photo` |
| 3 | `studio.jpg` | Studio, whole room in frame | `rooms[1].photo` |
| 4 | `studio-1br.jpg` | Studio with bedroom (living area or bedroom) | `rooms[2].photo` |
| 5 | `exterior.jpg` | Building / entrance from the street | `gallery[0]` |
| 6 | `bedroom.jpg` | Bedroom close-up | `gallery[1]` |
| 7 | `living.jpg` | Sitting / living area | `gallery[2]` |
| 8 | `kitchen.jpg` | Kitchen or kitchenette | `gallery[3]` |
| 9 | `bathroom.jpg` | Clean bathroom | `gallery[4]` |
| 10 | `studio-2.jpg` | Another studio angle | `gallery[5]` |
| 11 | `reception.jpg` | Entrance, lobby or reception | `gallery[6]` |
| 12 | `parking.jpg` | Parking area | `gallery[7]` |
| 13 | `logo.png` / `logo.svg` | Their real logo, if they have one | replaces `logo.svg` + the `#i-logo` symbol in `index.html` |

Add more gallery photos by adding lines to `gallery` in `site-config.js`.

## Sizing (keeps the site fast)

* Landscape, about **1600 px wide** for `hero.jpg`, **1200 px** for everything else.
* JPEG quality ~80, ideally under **250 KB** each. Free tool: https://squoosh.app (drag in, choose MozJPEG or WebP, download).
* Room and gallery photos are cropped to 4:3, so keep the subject in the middle.

## Other files

* `logo.svg` — wordmark (arch + crown). Placeholder brand mark until the real logo arrives.
* `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` — browser / home-screen icons.
* `og-image.jpg` — the 1200×630 preview shown when the link is shared on WhatsApp, X, Facebook.
  Re-render it from `tools/og-image.html` after the real hero photo is in (see main README).
