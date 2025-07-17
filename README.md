
# YourTunes

**YourTunes** is a Flask-based application that integrates with Spotify to create personalized playlists tailored to your mood. Whether you're feeling happy, relaxed, or energized, YourTunes curates the perfect playlist to match your emotions.

## Features

- **Mood-Based Playlists**: Generates playlists based on the user's mood.
- **Spotify Integration**: Seamless login and playlist management through Spotify.
- **User-Friendly Interface**: Intuitive design for easy mood selection and playlist management.
- **Advanced Playlist Creation**: Generates playlists with songs from top artists and mood-based recommendations.
- **AI-Powered Playlist Naming and Description**: Uses Gemini LLM for creating playlist names and descriptions.

## Installation

To get started with **YourTunes**, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Leander-Antony/YourTunes_oneAPI_hack_kpr.git
    ```

2. **Set up a virtual environment:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Set up environment variables:**

    Create a `.env` file in the root directory and add your Spotify and Google API keys:

    ```env
    CLIENT_ID=your_spotify_client_id
    CLIENT_SECRET=your_spotify_client_secret
    GOOGLE_API_KEY=your_google_api_key
    ```

5. **Run the application:**

    ```bash
    python app.py
    ```

6. **Access the app:**

    Open your browser and navigate to `http://localhost:5000`.

  

## Requirements

- Python 3.11
