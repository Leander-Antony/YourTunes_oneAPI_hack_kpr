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

document.addEventListener("DOMContentLoaded", () => {
  const moodResults = {{ mood_results | tojson }}; // Assuming you pass this from Flask

  const moodList = document.getElementById('mood-list');
  moodList.innerHTML = ''; // Clear previous entries

  for (const [mood, percentage] of Object.entries(moodResults)) {
      const progressContainer = document.createElement('div');
      progressContainer.classList.add('progress-container');

      const circularProgress = document.createElement('div');
      circularProgress.classList.add('circular-progress');
      circularProgress.style.setProperty('--percentage', percentage);

      const progressValue = document.createElement('div');
      progressValue.classList.add('progress-value');
      progressValue.innerText = `${percentage.toFixed(2)}%`;

      const moodLabel = document.createElement('div');
      moodLabel.classList.add('mood-label');
      moodLabel.innerText = mood;

      // Append elements
      progressContainer.appendChild(circularProgress);
      progressContainer.appendChild(progressValue);
      progressContainer.appendChild(moodLabel);
      moodList.appendChild(progressContainer);

      // Trigger reflow to ensure animation runs
      circularProgress.offsetWidth; // Force reflow
      circularProgress.classList.add('animate'); // Add the animation class
  }
});