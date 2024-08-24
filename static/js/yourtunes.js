function getPlaylistIdFromUrl(playlist_url) {
  if (playlist_url.includes("open.spotify.com/playlist/")) {
    const playlistId = playlist_url
      .split("open.spotify.com/playlist/")[1]
      .split("?")[0];
    return playlistId;
  } else {
    return null;
  }
}

const playlistId = getPlaylistIdFromUrl("{{ playlist_url }}");

if (playlistId) {
  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}`;
  const iframe = document.createElement("iframe");
  iframe.src = embedUrl;
  iframe.width = "600";
  iframe.height = "380";
  iframe.frameBorder = "0";
  iframe.allowTransparency = "true";
  iframe.allow = "encrypted-media";

  document.body.appendChild(iframe);
} else {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = "Invalid Spotify playlist URL.";
  document.body.appendChild(errorMessage);
}

const notes = document.querySelectorAll(".note");
notes.forEach((note) => {
  note.style.animationDuration = `${Math.random() * 3 + 3}s`;
  note.style.left = `${Math.random() * 100}vw`;
});
