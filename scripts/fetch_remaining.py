import urllib.request
import urllib.parse
import json
import ssl

ctx = ssl._create_unverified_context()
api_key = '7ba77147fa1d0e2de5ca09afa77f8a83'

queries = [
    ('deadpool', 'movie', 'Deadpool', 293660),
    ('sweet-november', 'movie', 'Sweet November', 10588),
    ('hi-nanna', 'movie', 'Hi Nanna', 1151536),
    ('complete-mcu', 'movie', 'Avengers: Endgame', 299534),
    ('paatal-lok', 'tv', 'Paatal Lok', 103099),
    ('dhurandhar', 'movie', 'Dhurandhar', None),
    ('please-find-attached', 'tv', 'Please Find Attached', None)
]

with open('src/content/movies.json', 'r', encoding='utf-8') as f:
    movies = json.load(f)

for mid, mtype, q, tid in queries:
    results = []
    # If we have tmdb id, fetch directly
    if tid:
        url = f"https://api.themoviedb.org/3/{mtype}/{tid}?api_key={api_key}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=6) as resp:
                data = json.loads(resp.read().decode())
                results = [data]
        except Exception as e:
            pass

    if not results:
        url = f"https://api.themoviedb.org/3/search/{mtype}?api_key={api_key}&query={urllib.parse.quote(q)}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=6) as resp:
                data = json.loads(resp.read().decode())
                results = data.get('results', [])
        except Exception as e:
            pass

    if results:
        top = results[0]
        poster = top.get('poster_path')
        overview = top.get('overview')
        vote = top.get('vote_average')
        for m in movies:
            if m['id'] == mid:
                if poster:
                    m['posterUrl'] = f"https://image.tmdb.org/t/p/w500{poster}"
                if overview:
                    m['overview'] = overview
                if vote:
                    m['rating'] = str(round(vote, 1))
                print(f"Matched {mid} -> {m.get('posterUrl')}")
    else:
        print(f"Still no match for {mid}")

with open('src/content/movies.json', 'w', encoding='utf-8') as f:
    json.dump(movies, f, indent=2)

print("Updated remaining successfully!")
