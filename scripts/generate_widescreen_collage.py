import os
import json
import urllib.request
import ssl
from PIL import Image, ImageDraw, ImageEnhance
import io

ctx = ssl._create_unverified_context()

with open('src/content/movies.json', 'r', encoding='utf-8') as f:
    movies = json.load(f)

print(f"Building panoramic widescreen combined poster from {len(movies)} movies...")

# Panoramic 16:9 Grid: 9 columns x 4 rows = 36 slots
COLS = 9
ROWS = 4
TILE_W = 280
TILE_H = 390
TOTAL_W = COLS * TILE_W # 2520 px
TOTAL_H = ROWS * TILE_H # 1560 px

collage = Image.new('RGB', (TOTAL_W, TOTAL_H), color=(10, 10, 15))
cache_dir = 'public/posters_cache'
os.makedirs(cache_dir, exist_ok=True)

# Reorder so hero movie (Deadpool) is right in the prime eye-level center (Row 1 or 2, Col 4)
ordered_movies = [m for m in movies if m.get('hero')] + [m for m in movies if not m.get('hero')]

for i in range(COLS * ROWS):
    m = ordered_movies[i % len(ordered_movies)]
    col = i % COLS
    row = i // COLS
    x = col * TILE_W
    y = row * TILE_H

    cache_path = os.path.join(cache_dir, f"{m['id']}.jpg")
    img = None

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
            print(f"Fetch failed for {m['title']}: {e}")

    if img is not None:
        img = img.convert('RGB')
        # Slight color boost to make it look rich, vibrant and punchy like cinema print
        img = img.resize((TILE_W, TILE_H), Image.Resampling.LANCZOS)
        enhancer = ImageEnhance.Color(img)
        img = enhancer.enhance(1.15)
        contrast = ImageEnhance.Contrast(img)
        img = contrast.enhance(1.08)
    else:
        img = Image.new('RGB', (TILE_W, TILE_H), color=(20, 20, 30))
        draw = ImageDraw.Draw(img)
        draw.text((20, TILE_H // 2 - 10), m['title'][:16], fill=(220, 200, 120))

    collage.paste(img, (x, y))

output_path = 'public/assets/combined-movie-posters-wide.jpg'
collage.save(output_path, 'JPEG', quality=95)
print(f"SUCCESS: Saved panoramic combined poster to {output_path} ({collage.size})")
