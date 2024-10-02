
const player = document.getElementById('player');
    const playPauseButton = document.getElementById('play-pause-button');

    // Update button icon based on player state
    function updateButton() {
        if (player.paused) {
            playPauseButton.textContent = '▶️'; // Play icon
            playPauseButton.setAttribute('aria-label', 'Play');
        } else {
            playPauseButton.textContent = '⏸️'; // Pause icon
            playPauseButton.setAttribute('aria-label', 'Pause');
        }
    }

    // Event listener for the button
    playPauseButton.addEventListener('click', () => {
        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
        updateButton();
    });

    // Update button when audio ends (if not looping)
    player.addEventListener('ended', updateButton);

    // Ensure the button reflects the correct state on page load
    updateButton();

    // This script ensures that the progress bars are rendered correctly
    document.addEventListener('DOMContentLoaded', function() {
      const progressBars = document.querySelectorAll('.circular-progress');
      progressBars.forEach(bar => {
          const percentage = parseFloat(bar.style.getPropertyValue('--percentage'));
          bar.style.setProperty('--percentage', Math.min(100, Math.max(0, percentage)));
      });
  });

  // Mood results rendering
  const moodResults = {{ mood_results | tojson }}; // Passed from Flask as JSON
  const moodList = document.getElementById("mood-list");
  moodList.innerHTML = ""; // Clear previous entries

  for (const [mood, percentage] of Object.entries(moodResults)) {
    const progressContainer = document.createElement("div");
    progressContainer.classList.add("progress-container");

    const circularProgress = document.createElement("div");
    circularProgress.classList.add("circular-progress");
    circularProgress.style.setProperty("--percentage", percentage);

    const progressValue = document.createElement("div");
    progressValue.classList.add("progress-value");
    progressValue.innerText = `${percentage.toFixed(2)}%`;

    const moodLabel = document.createElement("div");
    moodLabel.classList.add("mood-label");
    moodLabel.innerText = mood;

    // Append elements to progress container
    progressContainer.appendChild(circularProgress);
    progressContainer.appendChild(progressValue);
    progressContainer.appendChild(moodLabel);
    moodList.appendChild(progressContainer);

    // Trigger reflow to ensure animation runs
    circularProgress.offsetWidth; // Force reflow
    circularProgress.classList.add("animate"); // Add animation class
  }
});