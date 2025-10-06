// Highlight active sidebar link
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', function (e) {
    document.querySelectorAll('.sidebar a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Song card click: show info in player
document.querySelectorAll('.song-card').forEach(card => {
  card.addEventListener('click', function () {
    const songInfo = document.querySelector('.song-info');
    if (songInfo) {
      songInfo.textContent = `Now Playing: ${this.textContent} - Artist`;
    }
  });
});

// Playlist card click: show alert
document.querySelectorAll('.playlist-card').forEach(card => {
  card.addEventListener('click', function () {
    alert(`Opening playlist: ${this.textContent}`);
  });
});

// Play/Pause toggle
const playButton = document.querySelector('.player-controls button:nth-child(2)');
if (playButton) {
  playButton.addEventListener('click', function () {
    if (playButton.textContent === 'Play') {
      playButton.textContent = 'Pause';
    } else {
      playButton.textContent = 'Play';
    }
  });
}

// Progress bar simulation
const progressBar = document.querySelector('.progress-bar');
if (progressBar) {
  progressBar.addEventListener('input', function () {
    // You can update the player UI here if needed
  });
}

// Search bar: filter songs (demo)
const searchInput = document.querySelector('.search');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll('.song-card').forEach(card => {
      card.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  });
}
// Add this inside your song-card click event
const audio = document.getElementById('audio-player');
if (audio) {
  audio.src = 'URL_TO_YOUR_SONG_FILE.mp3'; // Set the correct file for each song
  audio.play();
}