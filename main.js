document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    if (sidebar) {
      sidebar.classList.add('mobile-visible');
      if (sidebarOverlay) {
        sidebarOverlay.classList.add('active');
      }
      if (menuToggle) {
        menuToggle.classList.add('active');
      }
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.classList.remove('mobile-visible');
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove('active');
      }
      if (menuToggle) {
        menuToggle.classList.remove('active');
      }
      document.body.style.overflow = '';
    }
  }

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar.classList.contains('mobile-visible')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', closeSidebar);
    }

    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        closeSidebar();
      }
    });

    document.querySelectorAll('.sidebar a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          closeSidebar();
        }
      });
    });
  }

  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function (e) {
      document.querySelectorAll('.sidebar a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  document.querySelectorAll('.song-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.addEventListener('click', function () {
      const songTitle = this.querySelector('.song-title')?.textContent || 'Unknown';
      const songArtist = this.querySelector('.song-artist')?.textContent || 'Unknown Artist';
      const songInfo = document.querySelector('.song-info');
      if (songInfo) {
        songInfo.textContent = `Now Playing: ${songTitle} - ${songArtist}`;
      }

      this.style.animation = 'pulse 0.4s ease-out';
      setTimeout(() => {
        this.style.animation = '';
      }, 400);
    });
  });

  document.querySelectorAll('.playlist-card').forEach(card => {
    card.addEventListener('click', function () {
      const playlistTitle = this.querySelector('.playlist-title')?.textContent || 'Unknown Playlist';
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(30, 30, 30, 0.98) 0%, rgba(20, 20, 20, 0.98) 100%);
        padding: 24px 40px;
        border-radius: 16px;
        color: #ffd700;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
        border: 2px solid rgba(255, 215, 0, 0.4);
        animation: slideIn 0.3s ease-out;
      `;
      notification.textContent = `Opening playlist: ${playlistTitle}`;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    });
  });

  const playButton = document.getElementById('playBtn');
  const audio = document.getElementById('audio-player');

  if (playButton) {
    let isPlaying = false;

    playButton.addEventListener('click', function () {
      isPlaying = !isPlaying;
      const icon = playButton.querySelector('i');

      if (isPlaying) {
        icon.setAttribute('data-lucide', 'pause');
        if (audio && audio.src) {
          audio.play();
        }
      } else {
        icon.setAttribute('data-lucide', 'play');
        if (audio) {
          audio.pause();
        }
      }

      lucide.createIcons();
    });
  }

  const progressBar = document.querySelector('.progress-bar');
  if (progressBar && audio) {
    progressBar.addEventListener('input', function () {
      const seekTime = (audio.duration * this.value) / 100;
      if (!isNaN(seekTime)) {
        audio.currentTime = seekTime;
      }
    });

    audio.addEventListener('timeupdate', function () {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
      }
    });
  }

  const searchInput = document.querySelector('.search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
      document.querySelectorAll('.song-card, .playlist-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }
});

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);
