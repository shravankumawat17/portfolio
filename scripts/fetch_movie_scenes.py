import urllib.request
import json
import ssl
import os

ctx = ssl._create_unverified_context()
api_key = '7ba77147fa1d0e2de5ca09afa77f8a83'

os.makedirs('public/assets/movie-scenes', exist_ok=True)

# Curated backdrop mappings from TMDB
SCENE_QUERIES = [
    ('origin-topgun', 'Top Gun: Maverick', 'movie', 'https://image.tmdb.org/t/p/w1280/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg'),
    ('world-matrix', 'The Matrix', 'movie', 'https://image.tmdb.org/t/p/w1280/7u3XmlizLYK71rIiaTfZ4wN21z.jpg'),
    ('world-inception', 'Inception', 'movie', 'https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg'),
    ('world-darkknight', 'The Dark Knight', 'movie', 'https://image.tmdb.org/t/p/w1280/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg'),
    ('world-budapest', 'The Grand Budapest Hotel', 'movie', 'https://image.tmdb.org/t/p/w1280/yNImXhP10O2fXfSg24bM8h3bEa.jpg'),
    ('project-tracker', 'Mad Max: Fury Road', 'movie', 'https://image.tmdb.org/t/p/w1280/nlCHUW2v9hh92dsBA2JezSZ7MuF.jpg'),
    ('project-therapist', 'Interstellar', 'movie', 'https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg'),
    ('project-hommies', 'Pretty Woman', 'movie', 'https://image.tmdb.org/t/p/w1280/6t8aojvd0g0b5T7E4kM6o9v8X9A.jpg'),
    ('project-pinterest', 'Spider-Man: Into the Spider-Verse', 'movie', 'https://image.tmdb.org/t/p/w1280/uUiId6Rfw42VK848vNa99OG9Gr8.jpg')
]

print("Fetching movie scene backdrops...")

for scene_id, movie_title, mtype, fallback_url in SCENE_QUERIES:
    dest_path = f"public/assets/movie-scenes/{scene_id}.jpg"
    if os.path.exists(dest_path):
        print(f"[EXISTS] {scene_id}")
        continue

    url_to_fetch = fallback_url

    # Attempt download
    try:
        req = urllib.request.Request(url_to_fetch, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=6) as resp:
            data = resp.read()
            with open(dest_path, 'wb') as f:
                f.write(data)
            print(f"[SAVED] {scene_id} ({len(data)} bytes)")
    except Exception as e:
        print(f"[FAIL] {scene_id}: {e}")

print("Done downloading scene backdrops!")
