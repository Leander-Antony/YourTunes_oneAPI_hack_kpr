from dotenv import load_dotenv
import os
import json
import base64
from requests import post, get
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler
from flask import Flask, session, redirect, url_for, request, jsonify, render_template
from beyondllm import retrieve, generator, source


import re

from beyondllm.embeddings import GeminiEmbeddings
from beyondllm.llms import GeminiModel

load_dotenv()
client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
google_api = os.getenv('GOOGLE_API_KEY')

embed_model = GeminiEmbeddings(model_name="models/embedding-001")
llm = GeminiModel(model_name="gemini-pro")
data = source.fit(path="data/text.txt", dtype="pdf", chunk_size=512, chunk_overlap=0)
retriever = retrieve.auto_retriever(data=data, embed_model=embed_model, type="normal", top_k=4)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)

redirect_uri = 'http://localhost:5000/callback'
scope = "playlist-read-private, user-modify-playback-state, user-read-playback-state, playlist-modify-private, playlist-modify-public, user-top-read"

cache_handler = FlaskSessionCacheHandler(session)
sp_oauth = SpotifyOAuth(
    client_id=client_id,
    client_secret=client_secret,
    redirect_uri=redirect_uri,
    scope=scope,
    cache_handler=cache_handler,
    show_dialog=True
)

sp = Spotify(auth_manager=sp_oauth)

def get_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-type": "application/x-www-form-urlencoded"
    }

    data = {"grant_type": "client_credentials"}
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result["access_token"]
    return token

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}

def search_song_id(token, song_name):
    url = "https://api.spotify.com/v1/search"
    headers = get_auth_header(token)
    query = f"?q={song_name}&type=track&limit=1"
    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)
    tracks = json_result.get("tracks", {}).get("items", [])
    if not tracks:
        return None
    return tracks[0]

def search_artists_id(token, artist_name):
    url = "https://api.spotify.com/v1/search"
    headers = get_auth_header(token)
    query = f"?q={artist_name}&type=artist&limit=1"
    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)["artists"]["items"]
    if not json_result:
        return None
    return json_result[0]

def get_songs_of_artist(token, artist_id):
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?country=ID"
    headers = get_auth_header(token)
    result = get(url, headers=headers)
    json_result = json.loads(result.content)["tracks"]
    return json_result

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/home')
def home():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        return redirect(sp_oauth.get_authorize_url())

    try:
        # Fetch the currently playing track
        currently_playing = sp.current_playback()
        if currently_playing and currently_playing.get('is_playing'):
            playing_track = currently_playing['item']
            playing_track_name = playing_track.get('name', 'Unknown')
            playing_artist_name = ', '.join(artist['name'] for artist in playing_track.get('artists', []))
            playing_album_name = playing_track.get('album', {}).get('name', 'Unknown')
            playing_track_url = playing_track.get('external_urls', {}).get('spotify', '#')
            playing_track_image = playing_track.get('album', {}).get('images', [{}])[1].get('url', 'No image available')
            currently_playing_html = f'''
            <h2>Currently Playing</h2>
            <p>Track Name: {playing_track_name}</p>
            <p>Artist: {playing_artist_name}</p>
            <p>Album: {playing_album_name}</p>
            <p>Track Link: <a href="{playing_track_url}" target="_blank">Open Track</a></p>
            <p>Track Image: <img src="{playing_track_image}" alt="Track Image" width="100"></p>
            <hr>
            '''
        else:
            currently_playing_html = '<h2>Currently Playing</h2><p>No track is currently playing.</p><hr>'

        # Fetch user's profile
        user_profile = sp.current_user()
        user_display_name = user_profile['display_name']
        user_profile_url = user_profile['external_urls']['spotify']
        user_profile_image = user_profile['images'][0]['url']  # Use the smaller image

        # Fetch user's top artists
        top_artists = sp.current_user_top_artists(limit=5, offset=0, time_range='medium_term')
        artists_info = [(artist['id'], artist['name'], artist['external_urls']['spotify'], artist.get('images', [{}])[0].get('url', 'No image available')) for artist in top_artists['items']]
        artists_html = '<br>'.join([f'{name}: <a href="{url}" target="_blank">Open Artist</a> <br> <img src="{image}" alt="Artist Image" width="100">' for _, name, url, image in artists_info])

        # Fetch user's top tracks
        top_tracks = sp.current_user_top_tracks(limit=5, offset=0, time_range='medium_term')
        tracks_info = [(track['id'], track['name'], track['external_urls']['spotify'], track.get('album', {}).get('images', [{}])[1].get('url', 'No image available')) for track in top_tracks['items']]
        tracks_html = '<br>'.join([f'{name}: <a href="{url}" target="_blank">Open Track</a> <br> <img src="{image}" alt="Track Image" width="100">' for _, name, url, image in tracks_info])

        return render_template('home.html', currently_playing_html=currently_playing_html, artists_html=artists_html, tracks_html=tracks_html, user_display_name=user_display_name, user_profile_url=user_profile_url, user_profile_image=user_profile_image)

    except Exception as e:
        print(f"Error: {e}")
        return redirect(url_for('login'))

@app.route('/callback')
def callback():
    sp_oauth.get_access_token(request.args['code'])
    return redirect(url_for('home'))

@app.route('/get_playlists')
def get_playlists():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        return redirect(sp_oauth.get_authorize_url())

    playlists = sp.current_user_playlists()
    playlists_info = [(playlist['name'], playlist['external_urls']['spotify']) for playlist in playlists['items']]
    playlists_html = '<br>'.join([f'{name}: <a href="{url}" target="_blank">Open Playlist</a>' for name, url in playlists_info])

    return render_template('playlists.html', playlists_html=playlists_html)


def safe_call(pipeline):
    try:
        return pipeline.call()
    except Exception as e:
        print(f"Error: {e}")
        return None

def mood_analyse(input):
    pipeline = generator.Generate(
        question=input,
        system_prompt="You are a mood analyzer based on the user's input, respond with one word indicating their mood.",
        retriever=retriever,
        llm=llm
    )
    response = safe_call(pipeline)
    print(response)
    return response

def extract_songs(text):
    # Assuming each song is on a new line
    lines = text.split('\n')
    songs = [line.strip() for line in lines if line.strip()]
    return songs



def playlist_generator(mood, prferred_language):
    pipeline = generator.Generate(
        question=mood,
        system_prompt=f"You are a playlist generator based on the user's mood. Provide 50 songs to comfort the user in {prferred_language}. I need the output in a simple list format, one song per line.",
        retriever=retriever,
        llm=llm
    )
    response = safe_call(pipeline)
    if response:
        songs = extract_songs(response)
        print(songs)
        return songs
    
    return []

def playlist_name_generator(songs, mood):
    """Generate a name for the playlist based on songs and mood."""
    song_list_str = '\n'.join(songs)  # Convert list to a single string
    pipeline = generator.Generate(
        question=song_list_str,
        system_prompt=f"Based on the user input and {mood}, generate a name for the playlist that resonates with the mood.",
        retriever=retriever,
        llm=llm
    )
    response = safe_call(pipeline)
    print(response)
    return response

def playlist_description_generator(mood, name):
    """Generate a description for the playlist."""
    pipeline = generator.Generate(
        question=f"i need description for my playlist based on {mood} and {name}",
        system_prompt=f"Generate a brief description for the a playlist .",
        retriever=retriever,
        llm=llm
    )
    response = safe_call(pipeline)
    print(response)
    return response


@app.route('/create_playlist', methods=['POST'])
def create_playlist_from_input():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        return redirect(sp_oauth.get_authorize_url())

    input = request.form.get('mood')
    preferred_language = request.form.get('language')

    if not input or not preferred_language:
        return "Mood or language not provided.", 400

    mood = mood_analyse(input)
    if not mood:
        return "Error analyzing mood.", 500

    songs = playlist_generator(mood, preferred_language)
    if not songs:
        return "No songs generated for the playlist.", 500

    name = playlist_name_generator(songs, mood)
    if not name:
        return "Error generating playlist name.", 500

    description = playlist_description_generator(mood, name)
    if not description:
        description = "A playlist created based on your mood."

    try:
        # Create the playlist
        playlist = sp.user_playlist_create(user=sp.current_user()['id'], name=name, description=description, public=True, collaborative=False)
        playlist_id = playlist['id']
        playlist_url = playlist['external_urls']['spotify']

        # Get the access token
        token = get_token()
        
        # Search for song IDs and add them to the playlist
        track_ids = []
        for song in songs:
            song_info = search_song_id(token, song)
            if song_info:
                track_ids.append(song_info['uri'])
        
        if track_ids:
            sp.playlist_add_items(playlist_id, track_ids)
        
        # Get the cover image
        playlist_cover_image = sp.playlist_cover_image(playlist_id)
        cover_image_url = playlist_cover_image[0]['url'] if playlist_cover_image else 'No image available'

        return redirect(url_for('your_tunes', playlist_id=playlist_id, playlist_url=playlist_url, cover_image_url=cover_image_url))
    except Exception as e:
        print(f"Error creating playlist: {e}")
        return "Error creating playlist. Please try again.", 500





@app.route('/yourtunes')
def your_tunes():
    playlist_id = request.args.get('playlist_id')
    playlist_url = request.args.get('playlist_url')
    cover_image_url = request.args.get('cover_image_url')

    if not playlist_id or not playlist_url:
        return "No playlist information available.", 400

    return render_template('yourtunes.html', playlist_id=playlist_id, playlist_url=playlist_url, cover_image_url=cover_image_url)





@app.route('/logout')
def logout():
    session.pop('token_info', None)
    session.clear()
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)