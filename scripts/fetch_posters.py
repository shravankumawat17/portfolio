import urllib.request
import urllib.parse
import json
import ssl
import time

ctx = ssl._create_unverified_context()
api_key = '7ba77147fa1d0e2de5ca09afa77f8a83'

with open('src/content/movies.json', 'r', encoding='utf-8') as f:
    movies = json.load(f)

print(f"Fetching TMDB metadata for {len(movies)} movies...")

for m in movies:
    title = m['title']
    clean_query = title
    if 'MCU' in title:
        clean_query = 'The Avengers'
    elif 'Before Trilogy' in title:
        clean_query = 'Before Sunrise'
    elif 'Evil Dead' in title:
        clean_query = 'Evil Dead'
    elif title == 'F1':
        clean_query = 'Formula 1: Drive to Survive'
    elif 'Dhurandhar' in title:
        clean_query = 'Dhurandhar'
    elif 'Please Find Attached' in title:
        clean_query = 'Please Find Attached'
    elif 'Mumbai Diaries' in title:
        clean_query = 'Mumbai Diaries'
    elif 'Gyaarah Gyaarah' in title:
        clean_query = 'Gyaarah Gyaarah'

    results = []
    # Try movie search
    url = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={urllib.parse.quote(clean_query)}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=6) as resp:
            data = json.loads(resp.read().decode())
            results = data.get('results', [])
    except Exception as e:
        pass

    # If no movie result, try TV show search
    if not results:
        tv_url = f"https://api.themoviedb.org/3/search/tv?api_key={api_key}&query={urllib.parse.quote(clean_query)}"
        tv_req = urllib.request.Request(tv_url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(tv_req, context=ctx, timeout=6) as tv_resp:
                tv_data = json.loads(tv_resp.read().decode())
                results = tv_data.get('results', [])
        except Exception as e:
            pass

    if results:
        top = results[0]
        poster = top.get('poster_path')
        if poster:
            m['posterUrl'] = f"https://image.tmdb.org/t/p/w500{poster}"
        if top.get('overview') and len(top.get('overview', '')) > 20:
            m['overview'] = top['overview']
        if top.get('vote_average'):
            m['rating'] = str(round(top['vote_average'], 1))
        print(f"[OK] {title} -> {m.get('posterUrl')}")
    else:
        print(f"[NO TMDB MATCH] {title}")

    time.sleep(0.2)

with open('src/content/movies.json', 'w', encoding='utf-8') as f:
    json.dump(movies, f, indent=2)

print("movies.json updated with high-res TMDB poster URLs!")
