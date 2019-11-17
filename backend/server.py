from flask import Flask, request, jsonify
from better_profanity import profanity
from flask_cors import CORS
from PyLyrics import *

app = Flask(__name__)
CORS(app)

@app.route('/api/v1/lyrics', methods=['GET', 'POST'])
def get_lyrics():
    query_params = request.args
    artist = query_params.get('artist')
    song = query_params.get('song')
    try:
        lyrics = PyLyrics.getLyrics(artist,song)
    except ValueError:
        return jsonify(artist=None, song=None, lyrics=None, safe=None)

    if profanity.contains_profanity(lyrics):
        is_safe=False
    else:
        is_safe=True

    return jsonify(artist=artist, song=song, lyrics=lyrics, safe=is_safe)


if __name__ == '__main__':
    port = int(environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
