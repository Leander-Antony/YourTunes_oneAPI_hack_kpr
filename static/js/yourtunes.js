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