from dotenv import load_dotenv
import os
import json
import base64
from requests import post, get
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler
from flask import Flask, session, redirect, url_for, request, render_template
from beyondllm import retrieve, generator
from beyondllm.source import fit
import re
from beyondllm.embeddings import GeminiEmbeddings
from beyondllm.llms import GeminiModel
from beyondllm.llms import OllamaModel
# from beyondllm.llms import HuggingFaceHubModel

load_dotenv()
client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')
google_api = os.getenv('GOOGLE_API_KEY')


embed_model = GeminiEmbeddings(api_key=google_api, model_name="models/embedding-001")
llm = GeminiModel(model_name="gemini-pro") 
# llm2 = OllamaModel(model="wizardlm2")
# llm = HuggingFaceHubModel(model="TheBloke/WizardLM-13B-Uncensored-AWQ",token="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",model_kwargs={"max_new_tokens":512,"temperature":0.1})
data = fit(path="data/text.md", dtype="md", chunk_size=512, chunk_overlap=100)
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


def safe_call(pipeline):
    try:
        return pipeline.call()
    except Exception as e:
        print(f"Error: {e}")
        return None


def extract_songs(text):
    # Assuming each song is on a new line
    lines = text.split('\n')
    songs = [line.strip() for line in lines if line.strip()]
    return songs


def songs_from_top_artists(user_input):
    top_artists = sp.current_user_top_artists(limit=5, offset=0, time_range='medium_term')
    artists_name = [(artist['name']) for artist in top_artists['items']]
    pipeline = generator.Generate(
        question=user_input,
        system_prompt=f"You are a playlist generator based on the user's {user_input} from {artists_name}. Provide 10 songs that matches the user input and situation . I need the output in a simple list format, one song per line.",
        retriever=retriever,
        llm=llm
    )
    response = safe_call(pipeline)
    if response:
        songs = extract_songs(response)
        print("Getting Songs from top artists")
        print(songs)
        return songs

    return []


def playlist_generator(user_input, prferred_language):
    pipeline = generator.Generate(
        question=user_input,
        system_prompt=f"You are a playlist generator based on the {user_input}. Provide 30 songs that matches {user_input} in {prferred_language}. I need the output in a simple list format, one song per line and i need you convert the name of the song to english text.",
        retriever=retriever,
        llm=llm
    )
    response = safe_call(pipeline)
    if response:
        songs = extract_songs(response)
        print("Generating sonngs based on user's input")
        print(songs)
        return songs
    
    return []


def extract_playlist_name(text):
    match = re.search(r'^\s*"(.+?)"\s*$|^\s*\*\*(.+?)\*\*\s*$|^\s*(\w[\w\s]*)\s*$', text)
    if match:
        return match.group(1) or match.group(2) or match.group(3)
    return None


def playlist_name_generator(songs, user_input):
    song_list_str = '\n'.join(songs)  # Convert list to a single string
    pipeline = generator.Generate(
        question=song_list_str,
        system_prompt=f"Based on the user input and {user_input}, generate a name for the playlist that resonates with the mood.",
        retriever=retriever,
        llm=llm
    )
    response = safe_call(pipeline)
    extracted_name = extract_playlist_name(response)
    print(extracted_name)
    return extracted_name

def playlist_description_generator(user_input, name):
    pipeline = generator.Generate(
        question=f"i need description for my playlist based on {user_input} and {name}",
        system_prompt=f"Generate a brief description for the a playlist .",
        retriever=retriever,
        llm=llm
    )
    response = safe_call(pipeline)
    print(response)
    return response

def analyze_playlist_moods(songs, preferred_language, max_moods=5):
    mood_count = {}

    song_list = ', '.join(songs)
    prompt = (
        f"Analyze the moods of the following songs which are in {preferred_language} language and provide only the mood names.\n"
        f"Songs: {song_list}\n"
        "Please respond with the mood names separated by commas without any additional text or song titles.\n"
        "Example: Happy, Energetic, Calm"
    )

    pipeline = generator.Generate(
        question=prompt,
        system_prompt="Provide only the mood names, one for each song.",
        retriever=retriever,
        llm=llm
    )
    response = safe_call(pipeline)


    if not isinstance(response, str):
        print("Invalid LLM response format. Expected a string.")
        return {'Unknown': 100.0}

    moods = [mood.strip() for mood in response.split(',') if mood.strip()]

    for mood in moods:
        mood_count[mood] = mood_count.get(mood, 0) + 1

    total_songs = len(moods)
    if total_songs == 0:
        print("No moods were parsed from the LLM response.")
        return {'Unknown': 100.0}

    mood_percentages = {mood: (count / total_songs) * 100 for mood, count in mood_count.items()}

    mood_groups = {
        'Stress': ['Stressful', 'Pressure', 'Stressed'],
        'Positive': ['Hopeful', 'Motivated', 'Upbeat', 'Motivational'],
        'Sadness': ['Sad', 'Heartbroken'],
        'Calm': ['Calm'],
        'Empowered': ['Empowered', 'Brave', 'Strong', 'Unstoppable'],
        'Anxiety': ['Anxious'],
        'Romantic': ['Romantic'],
        'Other': ['Humorous', 'Demonic', 'Unbelievable', 'Searching', 'Rising']
    }

    grouped_moods = {}
    for group, moods_in_group in mood_groups.items():
        group_percentage = sum(mood_percentages.get(mood, 0) for mood in moods_in_group)
        if group_percentage > 0:
            grouped_moods[group] = group_percentage

    print(f"Grouped Moods: {grouped_moods}")

    top_moods = dict(sorted(grouped_moods.items(), key=lambda x: x[1], reverse=True)[:max_moods])


    if not top_moods:
        print("No top moods identified after grouping. Defaulting to 'Unknown'.")
        return {'Unknown': 100.0}

    total_percentage = sum(top_moods.values())
    if total_percentage < 100:
        try:
            max_mood = max(top_moods, key=top_moods.get)
            top_moods[max_mood] += (100 - total_percentage)
        except ValueError as ve:
            print(f"Error adjusting moods: {ve}")
            return {'Unknown': 100.0}
    elif total_percentage > 100:
        for mood in top_moods:
            top_moods[mood] = (top_moods[mood] / total_percentage) * 100
    else:
        print(f"Top Moods finalized: {top_moods}")

    return top_moods

        


@app.route('/')
def login():
    return render_template('login.html')


@app.route('/home')
def home():
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        return redirect(sp_oauth.get_authorize_url())

    try:
        
        currently_playing = sp.current_playback()
        if currently_playing and currently_playing.get('is_playing'):
            playing_track = currently_playing['item']
            playing_track_name = playing_track.get('name', 'Unknown')
            playing_artist_name = ', '.join(artist['name'] for artist in playing_track.get('artists', []))
            playing_album_name = playing_track.get('album', {}).get('name', 'Unknown')
            playing_track_url = playing_track.get('external_urls', {}).get('spotify', '#')
            track_images = playing_track.get('album', {}).get('images', [])
            playing_track_image = track_images[1].get('url', 'No image available') if len(track_images) > 1 else 'No image available'
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
        user_images = user_profile.get('images', [])    
        user_profile_image = user_images[0]['url'] if user_images else None

        # Fetch user's top artists
        top_artists = sp.current_user_top_artists(limit=10, offset=0, time_range='medium_term')
        artists_info = [
            {
                'name': artist['name'],
                'url': artist['external_urls']['spotify'],
                'image_url': artist.get('images', [{}])[0].get('url', 'No image available')
            } for artist in top_artists['items']
        ]

        # Fetch user's top tracks
        top_tracks = sp.current_user_top_tracks(limit=10, offset=0, time_range='medium_term')
        tracks_info = [
            {
                'name': track['name'],
                'artist': track['artists'][0]['name'],
                'url': track['external_urls']['spotify'],
                'image_url': track['album']['images'][0]['url'] if track['album']['images'] else 'No image available'
            } for track in top_tracks['items']
        ]

        return render_template('home.html', 
                               currently_playing_html=currently_playing_html, 
                               top_artists=artists_info,
                               top_tracks=tracks_info, 
                               user_display_name=user_display_name, 
                               user_profile_url=user_profile_url, 
                               user_profile_image=user_profile_image)

    except Exception as e:
        print(f"Error in home route: {e}")
        return redirect(url_for('login'))
    
    
@app.route('/callback')
def callback():
    if 'code' in request.args:
        sp_oauth.get_access_token(request.args['code'])
        return redirect(url_for('home'))
    else:
        error_message = request.args.get('error', 'Authorization was cancelled or failed.')
        print(f"Error during authorization: {error_message}")
        return render_template('error.html', error_message=error_message)


@app.route('/create_playlist', methods=['POST'])
def create_playlist_from_input():
    # Validate Spotify token
    if not sp_oauth.validate_token(cache_handler.get_cached_token()):
        return redirect(sp_oauth.get_authorize_url())

    # Retrieve user input for mood and preferred language
    user_input = request.form.get('mood')
    preferred_language = request.form.get('language')

    # Check for missing user input
    if not user_input or not preferred_language:
        return "Mood or language not provided.", 400

    # Retrieve the state of the checkbox (add_top_artists)
    add_top_artists = request.form.get('add_top_artists') == 'on'

    # Get songs based on user mood
    playlist_songs = playlist_generator(user_input, preferred_language)
    if not playlist_songs:
        return "No songs generated for the playlist.", 500

    all_songs = playlist_songs

    if add_top_artists:
        top_artists_songs = songs_from_top_artists(user_input)
        if not top_artists_songs:
            return "No songs from top artists generated.", 500

        
        all_songs += top_artists_songs

    
    all_songs = [song for song in all_songs if isinstance(song, str) and song.strip()]
    if not all_songs:
        return "No valid songs available for the playlist.", 500

    mood_results = analyze_playlist_moods(all_songs, preferred_language)  
    print("Mood analysis results:", mood_results)

    name = playlist_name_generator(all_songs, user_input)
    if not name:
        return "Error generating playlist name.", 500

    description = playlist_description_generator(user_input, name)
    if not description:
        description = "A playlist created based on your mood."

    try:
        playlist = sp.user_playlist_create(user=sp.current_user()['id'], name=name, description=description, public=True, collaborative=False)
        playlist_id = playlist['id']
        playlist_url = playlist['external_urls']['spotify']

        token = get_token()

       
        track_ids = []
        for song in all_songs:
            song_info = search_song_id(token, song)
            if song_info:
                track_ids.append(song_info['uri'])

        
        if track_ids:
            sp.playlist_add_items(playlist_id, track_ids)

        
        playlist_cover_image = sp.playlist_cover_image(playlist_id)
        cover_image_url = playlist_cover_image[0]['url'] if playlist_cover_image else 'No image available'

        
        return redirect(url_for('your_tunes', 
                                playlist_id=playlist_id, 
                                playlist_url=playlist_url, 
                                cover_image_url=cover_image_url, 
                                mood_results=json.dumps(mood_results)))  # Pass mood results as JSON
    except Exception as e:
        print(f"Error creating playlist: {e}")
        return "Error creating playlist. Please try again.", 500


@app.route('/yourtunes')
def your_tunes():
    playlist_id = request.args.get('playlist_id')
    playlist_url = request.args.get('playlist_url')
    cover_image_url = request.args.get('cover_image_url')

    mood_results = json.loads(request.args.get('mood_results', '{}'))  

    return render_template('yourtunes.html', 
                           playlist_id=playlist_id, 
                           playlist_url=playlist_url, 
                           cover_image_url=cover_image_url, 
                           mood_results=mood_results)


@app.route('/logout')
def logout():
    session.pop('token_info', None)
    session.clear()
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)