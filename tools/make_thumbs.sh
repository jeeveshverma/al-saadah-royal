#!/bin/sh
# Makes the 700 px "-sm" copies used by room cards and the gallery grid
# (the full-size photo is kept for the lightbox). Run from the repo root after adding photos.
cd assets/img/photos || exit 1
for f in *.jpg; do
  case "$f" in *-sm.jpg) continue ;; esac
  [ "$(sips -g pixelWidth "$f" | awk "/pixelWidth/{print \$2}")" -le 700 ] && continue
  sips -Z 700 -s format jpeg -s formatOptions 72 "$f" --out "${f%.jpg}-sm.jpg" >/dev/null
done
ls -l *-sm.jpg
