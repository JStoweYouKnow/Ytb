#!/bin/bash
# Generate PNG icons from SVG using built-in macOS tools (sips) or ImageMagick (convert).
# Usage: ./scripts/generate-icons.sh

SVG="public/icon.svg"
OUT_192="public/icon-192.png"
OUT_512="public/icon-512.png"

if command -v convert &>/dev/null; then
    echo "Using ImageMagick..."
    convert -background none -density 384 -resize 192x192 "$SVG" "$OUT_192"
    convert -background none -density 384 -resize 512x512 "$SVG" "$OUT_512"
    echo "Created $OUT_192 and $OUT_512"
elif command -v rsvg-convert &>/dev/null; then
    echo "Using rsvg-convert..."
    rsvg-convert -w 192 -h 192 "$SVG" -o "$OUT_192"
    rsvg-convert -w 512 -h 512 "$SVG" -o "$OUT_512"
    echo "Created $OUT_192 and $OUT_512"
else
    echo "No SVG-to-PNG converter found."
    echo "Install ImageMagick: brew install imagemagick"
    echo "  or librsvg: brew install librsvg"
    echo ""
    echo "Alternatively, open public/icon.svg in a browser and export as PNG at 192x192 and 512x512."
    exit 1
fi
