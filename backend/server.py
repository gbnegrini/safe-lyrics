from flask import Flask, request, jsonify
import lyricsgenius
from better_profanity import profanity
from genius_token import genius_token
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/v1/lyrics', methods=['GET', 'POST'])
def get_lyrics():
    query_params = request.args
    artist = query_params.get('artist')
    song = query_params.get('song')

    genius = lyricsgenius.Genius(genius_token)
    result = genius.search_song(song, artist)
    lyrics = result.lyrics

    if profanity.contains_profanity(lyrics):
        is_safe=False
    else:
        is_safe=True

    return jsonify(artist=artist, song=song, lyrics=lyrics, safe=is_safe)


if __name__ == '__main__':
    app.run(debug=True)
