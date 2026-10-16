#!/usr/bin/env python3
"""Writes the placeholder illustrations, logo and favicon (SVG) into assets/img/.

Run from the repo root:  python3 tools/make_placeholders.py
Real photos replace these: see assets/img/README.md.
"""
from pathlib import Path

IMG = Path(__file__).resolve().parent.parent / "assets" / "img"
PH = IMG / "placeholders"
PH.mkdir(parents=True, exist_ok=True)

GREEN_950 = "#0E2A20"
GREEN_900 = "#173F31"
GREEN_700 = "#22573F"
GREEN_500 = "#3C7A5C"
GOLD = "#D4AE6A"
SAND = "#EFE4CF"

FONT = "font-family=\"Manrope, Segoe UI, Arial, sans-serif\""


def label(w, h, text, dark=False, anchor="middle", x=None, y=None):
    fill = "rgba(255,255,255,.85)" if dark else "rgba(23,63,49,.75)"
    bg = "rgba(14,42,32,.35)" if dark else "rgba(255,255,255,.7)"
    x = w / 2 if x is None else x
    y = h - 34 if y is None else y
    tw = len(text) * 8.4 + 28
    rx = x - tw / 2 if anchor == "middle" else (x - tw if anchor == "end" else x)
    return (
        f'<rect x="{rx:.0f}" y="{y - 21}" width="{tw:.0f}" height="32" rx="16" fill="{bg}"/>'
        f'<text x="{rx + tw / 2:.0f}" y="{y}" text-anchor="middle" {FONT} font-size="15" font-weight="700" '
        f'letter-spacing=".04em" fill="{fill}">{text}</text>'
    )


def svg(w, h, body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">'
        f"<title>{title}</title>{body}</svg>\n"
    )


def write(name, content):
    (PH / name).write_text(content, encoding="utf-8")


# ---------------------------------------------------------------- hero
hero = f"""
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#C9D6CC"/><stop offset=".55" stop-color="#E4E8DC"/><stop offset="1" stop-color="#F1EBDD"/>
  </linearGradient>
  <linearGradient id="m1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8DAE92"/><stop offset="1" stop-color="#6E967A"/></linearGradient>
  <linearGradient id="m2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5E8C68"/><stop offset="1" stop-color="#3F7352"/></linearGradient>
  <linearGradient id="m3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2F6445"/><stop offset="1" stop-color="#1E4A34"/></linearGradient>
  <linearGradient id="mist" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
</defs>
<rect width="1600" height="1000" fill="url(#sky)"/>
<circle cx="1180" cy="250" r="90" fill="#fff" opacity=".55"/>
<path d="M0 560 C180 470 300 420 470 455 C640 490 720 380 900 360 C1080 340 1180 430 1340 410 C1460 395 1540 360 1600 350 V1000 H0Z" fill="url(#m1)"/>
<rect y="470" width="1600" height="90" fill="url(#mist)" opacity=".8"/>
<path d="M0 680 C160 600 330 560 520 600 C700 640 820 540 1000 520 C1180 500 1300 590 1460 570 C1530 562 1570 550 1600 545 V1000 H0Z" fill="url(#m2)"/>
<rect y="610" width="1600" height="70" fill="url(#mist)" opacity=".6"/>
<path d="M0 800 C220 730 420 720 640 760 C860 800 1000 720 1220 715 C1400 712 1500 760 1600 770 V1000 H0Z" fill="url(#m3)"/>
<g fill="#173F31" opacity=".9">
  <path d="M1250 770 q6-60 2-120 M1253 655 q-40-10-62 18 q34-6 62-6 q-20-34-58-40 q40 0 58 28 q8-40 42-52 q-20 34-30 56 q36-18 70-4 q-40 2-72 20 q40 4 56 36 q-34-22-66-12" stroke="#173F31" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M1330 790 q4-46 1-90 M1331 704 q-30-8-46 14 q26-5 46-5 q-15-26-43-30 q30 0 43 21 q6-30 31-39 q-15 26-22 42 q27-14 52-3 q-30 2-54 15 q30 3 42 27 q-25-16-49-9" stroke="#173F31" stroke-width="6" fill="none" stroke-linecap="round"/>
</g>
<rect y="880" width="1600" height="120" fill="{GREEN_950}" opacity=".35"/>

"""
write("hero.svg", svg(1600, 1000, hero, "Khareef hills placeholder"))


# ---------------------------------------------------------------- rooms
def room(n, wall, floor, bed, accent):
    body = f"""
<rect width="800" height="600" fill="{wall}"/>
<rect y="430" width="800" height="170" fill="{floor}"/>
<rect x="470" y="110" width="230" height="180" rx="10" fill="#C9DCCB" stroke="#fff" stroke-width="10"/>
<path d="M475 250 C540 200 600 215 695 180 V285 H475Z" fill="{GREEN_500}" opacity=".8"/>
<line x1="585" y1="110" x2="585" y2="290" stroke="#fff" stroke-width="6"/>
<rect x="90" y="230" width="330" height="70" rx="16" fill="{accent}"/>
<rect x="70" y="300" width="370" height="140" rx="22" fill="{bed}"/>
<rect x="110" y="270" width="110" height="50" rx="18" fill="#fff"/>
<rect x="240" y="270" width="110" height="50" rx="18" fill="#fff"/>
<rect x="70" y="350" width="370" height="40" fill="{accent}" opacity=".55"/>
<rect x="480" y="350" width="70" height="90" rx="8" fill="{accent}"/>
<path d="M500 300 h30 l12 50 h-54z" fill="{GOLD}"/>
<line x1="515" y1="300" x2="515" y2="350" stroke="{GREEN_900}" stroke-width="3"/>
{label(800, 600, f"PHOTO COMING SOON · room {n}")}
"""
    return svg(800, 600, body, f"Room {n} placeholder")


write("room-1.svg", room(1, "#EFE6D6", "#D9C7A8", "#F7F2E8", GREEN_700))
write("room-2.svg", room(2, "#E5EBE3", "#CDBB9B", "#FBF8F2", "#8A6424"))
write("room-3.svg", room(3, "#F1E8DA", "#C8B08C", "#F4EEE3", GREEN_500))

# ---------------------------------------------------------------- gallery
ICONS = {
    "building": '<path d="M5 21V5l7-3 7 3v16M9 21v-4h6v4M9 8h1M14 8h1M9 12h1M14 12h1" />',
    "bed": '<path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.8"/>',
    "sofa": '<path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3"/><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>',
    "kitchen": '<path d="M4 11h16v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M2 11h20M9 7c0-1 1-1.5 1-2.5M13 7c0-1 1-1.5 1-2.5"/>',
    "bath": '<path d="M3 12h18v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6z"/><path d="M6 12V5.5a2 2 0 0 1 3.8-.8"/>',
    "studio": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M10 10v10"/>',
    "door": '<path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17M3 21h18"/><circle cx="15" cy="12" r="1"/>',
    "car": '<path d="M5 11l1.6-4.2A2 2 0 0 1 8.5 5.5h7a2 2 0 0 1 1.9 1.3L19 11"/><rect x="3" y="11" width="18" height="6" rx="2"/>',
}
GALLERY = [
    ("building", "Building exterior", "#DCE6DD", "#B9CDBE"),
    ("bed", "Bedroom", "#F1E7D5", "#E3D2B2"),
    ("sofa", "Living area", "#E6EDE6", "#CADBCD"),
    ("kitchen", "Kitchen", "#F3EBDD", "#E2D3B8"),
    ("bath", "Bathroom", "#E3ECEA", "#C6D8D3"),
    ("studio", "Studio", "#EFE6D4", "#DCC9A6"),
    ("door", "Entrance", "#E6EBE1", "#CDD8C4"),
    ("car", "Parking", "#EEE7DA", "#D8CAB0"),
]
for i, (ic, name, c1, c2) in enumerate(GALLERY, 1):
    body = f"""
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient></defs>
<rect width="800" height="600" fill="url(#g)"/>
<circle cx="400" cy="270" r="120" fill="#fff" opacity=".45"/>
<g transform="translate(316 186) scale(7)" fill="none" stroke="{GREEN_700}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">{ICONS[ic]}</g>
{label(800, 600, f"PHOTO {i} · {name.upper()}")}
"""
    write(f"gallery-{i}.svg", svg(800, 600, body, f"{name} placeholder"))

# ---------------------------------------------------------------- explore
EXPLORE = {
    "mughsail": f"""
<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE0E3"/><stop offset="1" stop-color="#EEF2EA"/></linearGradient></defs>
<rect width="800" height="500" fill="url(#s)"/>
<path d="M0 260 H800 V360 H0Z" fill="#4E9AA8"/>
<path d="M0 300 q100-14 200 0 t200 0 t200 0 t200 0 V360 H0Z" fill="#6FB3BE"/>
<path d="M520 120 C600 110 700 130 800 120 V380 H560 C540 300 530 200 520 120Z" fill="#B59D78"/>
<path d="M560 380 C560 300 600 250 640 230 L800 220 V380Z" fill="#9C8462"/>
<path d="M0 360 C200 340 420 350 800 370 V500 H0Z" fill="#F3E8D2"/>
<path d="M590 250 q-8-60 4-110 M594 250 q14-50 4-104 M590 250 q-24-40-16-90" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>
""",
    "darbat": f"""
<rect width="800" height="500" fill="#DDE7DA"/>
<path d="M0 230 C150 150 300 170 420 200 C560 235 680 150 800 170 V500 H0Z" fill="#6E9E77"/>
<path d="M0 300 C140 260 260 270 360 250 L360 330 C250 330 120 340 0 350Z" fill="{GREEN_500}"/>
<path d="M440 250 C540 240 660 230 800 260 V350 C680 330 560 330 440 330Z" fill="{GREEN_500}"/>
<rect x="360" y="230" width="80" height="120" fill="#EAF3F2"/>
<path d="M370 230 v120 M385 230 v120 M400 230 v120 M415 230 v120 M430 230 v120" stroke="#BCD8D6" stroke-width="3"/>
<path d="M0 350 C200 330 600 330 800 350 V420 C600 400 200 400 0 420Z" fill="#7FB4B4"/>
<path d="M0 420 C200 400 600 400 800 420 V500 H0Z" fill="{GREEN_700}"/>
""",
    "haffa": f"""
<rect width="800" height="500" fill="#F3E8D2"/>
<rect y="150" width="800" height="270" fill="#E2CCA3"/>
<g fill="#B88F57">
  <path d="M60 420 V260 a70 70 0 0 1 140 0 V420Z"/><path d="M250 420 V260 a70 70 0 0 1 140 0 V420Z"/>
  <path d="M440 420 V260 a70 70 0 0 1 140 0 V420Z"/><path d="M630 420 V260 a70 70 0 0 1 140 0 V420Z"/>
</g>
<rect y="130" width="800" height="26" fill="#CDB287"/>
<rect y="420" width="800" height="80" fill="#D9C29A"/>
<path d="M330 400 h60 l-8 24 h-44z" fill="{GREEN_700}"/>
<path d="M360 395 q-20-40 6-70 q24-30 0-70" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".8"/>
""",
    "razat": f"""
<rect width="800" height="500" fill="#E3ECDE"/>
<path d="M0 260 C200 220 600 220 800 250 V500 H0Z" fill="#8DB48F"/>
<ellipse cx="400" cy="380" rx="260" ry="60" fill="#7DB7B8"/>
<ellipse cx="400" cy="372" rx="200" ry="36" fill="#A7D1CF"/>
<g stroke="{GREEN_900}" stroke-width="10" fill="none" stroke-linecap="round">
  <path d="M150 360 q8-90 0-170"/><path d="M640 350 q-6-80 2-150"/>
</g>
<g fill="{GREEN_700}">
  <path d="M150 190 q-70-10-100 30 q50-14 100-12 q-30-50-90-60 q60 0 90 42 q14-56 70-70 q-34 46-50 76 q60-28 110-4 q-64 4-120 28 q66 6 90 54 q-56-34-100-14z"/>
  <path d="M642 200 q-60-8-86 26 q42-12 86-10 q-26-44-78-52 q52 0 78 36 q12-48 60-60 q-30 40-44 66 q52-24 96-4 q-56 4-104 24 q58 6 78 46 q-48-30-86-12z"/>
</g>
""",
}
NAMES = {"mughsail": "AL MUGHSAIL BEACH", "darbat": "WADI DARBAT", "haffa": "AL HAFFA SOUQ", "razat": "AYN RAZAT"}
for key, body in EXPLORE.items():
    body += label(800, 500, f"ILLUSTRATION · {NAMES[key]}", y=470)
    write(f"explore-{key}.svg", svg(800, 500, body, f"{NAMES[key].title()} illustration"))

# ---------------------------------------------------------------- logo + favicon
MARK = (
    f'<path fill="{GREEN_900}" d="M7 45V22.5a17 17 0 0 1 34 0V45z"/>'
    f'<path fill="{GOLD}" d="M15.2 31.2 13.6 20l5.7 4.8L24 16.5l4.7 8.3 5.7-4.8-1.6 11.2z"/>'
    f'<circle cx="13.6" cy="19.2" r="1.6" fill="{GOLD}"/><circle cx="24" cy="15.2" r="1.7" fill="{GOLD}"/>'
    f'<circle cx="34.4" cy="19.2" r="1.6" fill="{GOLD}"/>'
    f'<rect x="15.2" y="33.2" width="17.6" height="2.6" rx="1.3" fill="{GOLD}"/>'
)
(IMG / "favicon.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="11" fill="#FBF8F2"/>'
    f'<g transform="translate(4 3) scale(.84)">{MARK}</g></svg>\n',
    encoding="utf-8",
)
(IMG / "logo.svg").write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 96" role="img">'
    "<title>Al Saadah Royal Residential Complex — مجمع السعادة رويال</title>"
    f'<g transform="translate(4 4) scale(1.8)">{MARK}</g>'
    f'<text x="104" y="46" font-family="DM Serif Display, Georgia, serif" font-size="34" fill="{GREEN_900}">Al Saadah Royal</text>'
    f'<text x="105" y="70" font-family="Manrope, Arial, sans-serif" font-size="12.5" font-weight="700" letter-spacing="2.6" fill="#8A6424">RESIDENTIAL COMPLEX</text>'
    f'<text x="414" y="88" text-anchor="end" font-family="Tajawal, Arial, sans-serif" font-size="15" font-weight="700" fill="{GREEN_700}" direction="rtl">مجمع السعادة رويال</text>'
    "</svg>\n",
    encoding="utf-8",
)
print("placeholders written to", PH)
