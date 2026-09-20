import urllib.request
import json
import ssl
import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import io

ctx = ssl._create_unverified_context()

with open('src/content/movies.json', 'r', encoding='utf-8') as f:
    movies = json.load(f)

print(f"Generating combined poster from {len(movies)} movies...")

# Target dimensions for each poster tile in the collage
TILE_W = 320
TILE_H = 480
COLS = 6
ROWS = 6 # 36 total slots

collage = Image.new('RGB', (COLS * TILE_W, ROWS * TILE_H), color=(8, 8, 12))

cache_dir = 'public/posters_cache'
os.makedirs(cache_dir, exist_ok=True)

for i, m in enumerate(movies):
    if i >= COLS * ROWS:
        break

    col = i % COLS
    row = i // COLS
    x = col * TILE_W
    y = row * TILE_H

    img = None
    cache_path = os.path.join(cache_dir, f"{m['id']}.jpg")

    if os.path.exists(cache_path):
        try:
            img = Image.open(cache_path)
        except Exception:
            pass

    if img is None and m.get('posterUrl'):
        try:
            req = urllib.request.Request(m['posterUrl'], headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, context=ctx, timeout=6) as resp:
                data = resp.read()
                img = Image.open(io.BytesIO(data))
                img.save(cache_path)
        except Exception as e:
            print(f"Could not download {m['title']}: {e}")

    if img is not None:
        img = img.convert('RGB')
        img = img.resize((TILE_W, TILE_H), Image.Resampling.LANCZOS)
    else:
        # Generate stylized placeholder card
        img = Image.new('RGB', (TILE_W, TILE_H), color=(18, 18, 26))
        draw = ImageDraw.Draw(img)
        # Draw border
        draw.rectangle([(2, 2), (TILE_W - 3, TILE_H - 3)], outline=(60, 60, 80), width=2)
        draw.text((20, TILE_H // 2 - 20), m['title'][:18], fill=(220, 200, 140))
        draw.text((20, TILE_H // 2 + 10), str(m.get('year', '')), fill=(140, 140, 160))

    collage.paste(img, (x, y))
    print(f"Pasted [{row},{col}]: {m['title']}")

output_path = 'public/assets/combined-movie-posters.jpg'
collage.save(output_path, 'JPEG', quality=92)
print(f"Saved combined master poster to {output_path} ({collage.size})")
