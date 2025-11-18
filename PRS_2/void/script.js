// Sample data with real songs and albums
const featuredPlaylists = [
  {
    title: "Amalumbo",
    artist: "Sampa The Psalmist",
    image: "pics/1.png",
    subtitle: "PRS Music Hits",
    audio: "music/1.mp3",
  },
  {
    title: "Jah",
    artist: "Sampa The Psalmist",
    image: "pics/2.png",
    subtitle: "PRS Music Hip-Hop",
    audio: "music/3.mp3",
  },
  {
    title: "Mulenjibukisha",
    artist: "Sampa The Psalmist",
    image: "pics/3.jpg",
    subtitle: "Made for You",
    audio: "music/2.mp3",
  },
];

const trendingSongs = [
  {
    title: "Redemption",
    artist: "Sampa The Psalmist",
    image: "pics/2.png",
    audio: "music/4.mp3",
  },
  {
    title: "Jah",
    artist: "Sampa The Psalmist",
    image: "pics/1.png",
    audio: "music/3.mp3",
  },
  {
    title: "Mulenjibukisha",
    artist: "Sampa The Psalmist",
    image: "pics/5.jpg",
    audio: "music/2.mp3",
  },
];

const newReleases = [
  {
    title: "Album 1",
    artist: "Sampa The Psalmist",
    image: "pics/5.jpg",
    songs: [
      {
        title: "Amalumbo",
        artist: "Sampa The Psalmist",
        image: "pics/1.png",
        audio: "music/1.mp3",
      },
      {
        title: "Mulenjibukisha",
        artist: "Sampa The Psalmist",
        image: "pics/2.png",
        audio: "music/2.mp3",
      },
      {
        title: "Jah",
        artist: "Sampa The Psalmist",
        image: "pics/3.jpg",
        audio: "music/3.mp3",
      },
      {
        title: "Redemption",
        artist: "Sampa The Psalmist",
        image: "pics/4.jpg",
        audio: "music/4.mp3",
      },
    ],
  },
  // ... other albums ...
];

const justUpdated = [
  {
    title: "Amalumbo",
    image: "pics/3.jpg",
    subtitle: "PRS Music",
    audio: "music/1.mp3",
  },
  {
    title: "Redemption",
    image: "pics/3.jpg",
    subtitle: "PRS Music",
    audio: "music/4.mp3",
  },
  {
    title: "Jah",
    image: "pics/4.jpg",
    subtitle: "PRS Music",
    audio: "music/3.mp3",
  },
];

const singles = [
  {
    title: "Amalumbo",
    artist: "Sampa The Psalmist",
    image: "pics/4.jpg",
    audio: "music/1.mp3",
  },
  {
    title: "Mulenjibukisha",
    artist: "Sampa The Psalmist",
    image: "pics/3.jpg",
    audio: "music/2.mp3",
  },
  {
    title: "Jah",
    artist: "Sampa The Psalmist",
    image: "pics/1.png",
    audio: "music/3.mp3",
  },
  {
    title: "Redemption",
    artist: "Sampa The Psalmist",
    image: "pics/5.jpg",
    audio: "music/4.mp3",
  },
  {
    title: "Mulenjibukisha",
    artist: "Sampa The Psalmist",
    image: "pics/2.png",
    audio: "music/2.mp3",
  },
  {
    title: "Jah",
    artist: "Sampa The Psalmist",
    image: "pics/3.jpg",
    audio: "music/3.mp3",
  },
  {
    title: "Redemption",
    artist: "Sampa The Psalmist",
    image: "pics/5.jpg",
    audio: "music/4.mp3",
  },
  {
    title: "Amalumbo",
    artist: "Sampa The Psalmist",
    image: "pics/1.png",
    audio: "music/1.mp3",
  },
  {
    title: "Jah",
    artist: "Sampa The Psalmist",
    image: "pics/3.jpg",
    audio: "music/3.mp3",
  },
  {
    title: "Redemption",
    artist: "Sampa The Psalmist",
    image: "pics/4.jpg",
    audio: "music/4.mp3",
  },
];

let currentAudio = null;
let isPlaying = false;
let currentPlaylist = [];
let currentTrackIndex = 0;
let allSongs = [];
let currentSongIndex = 0;
let isDragging = false;

// DOM elements
const playPauseBtn = document.getElementById("playPause");
const nextTrackBtn = document.getElementById("nextTrack");
const volumeBtn = document.getElementById("volume");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const albumArt = document.getElementById("albumArt");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const themeToggle = document.getElementById("themeToggle");
const volumeControl = document.getElementById("volumeControl");
const volumeSlider = document.getElementById("volumeSlider");

// Functions
function handleProgressBarInteraction(e) {
  isDragging = true;
  updateAudioProgress(e);
}

function handleProgressDrag(e) {
  if (isDragging) {
    updateAudioProgress(e);
  }
}

function endProgressDrag() {
  isDragging = false;
}

function updateAudioProgress(e) {
  if (currentAudio) {
    const progressBarRect = progressBar.getBoundingClientRect();
    const percent =
      (e.clientX || e.touches[0].clientX - progressBarRect.left) /
      progressBarRect.width;
    currentAudio.currentTime = percent * currentAudio.duration;
    updateProgress();
  }
}

function playSong(song, playlist = currentPlaylist) {
  if (currentAudio) {
    currentAudio.pause();
  }

  currentAudio = new Audio(song.audio);
  currentAudio.play();
  isPlaying = true;
  updatePlayPauseButton();

  albumArt.src = song.image;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;

  currentAudio.addEventListener("timeupdate", updateProgress);
  currentAudio.addEventListener("ended", () => playNextTrack(playlist));

  // Update current playlist and track index
  currentPlaylist = playlist;
  currentTrackIndex = currentPlaylist.findIndex(
    (track) => track.title === song.title
  );
}

function playNextTrack(playlist = currentPlaylist) {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  playSong(playlist[currentTrackIndex], playlist);
}

function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
  playSong(currentPlaylist[currentTrackIndex], currentPlaylist);
}

function populateCarousel(id, items) {
  const carousel = document.getElementById(id);
  carousel.innerHTML = ""; // Clear existing items
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "carousel-item";
    div.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="title">${item.title}</div>
            <div class="subtitle">${item.artist || item.subtitle}</div>
        `;
    carousel.appendChild(div);

    div.addEventListener("click", () => {
      if (id === "newReleases") {
        showAlbumModal(item);
      } else if (item.audio) {
        playSong(item, items); // Pass the entire playlist
      }
    });
  });
}

// Update the nextTrackBtn event listener
nextTrackBtn.addEventListener("click", playNextTrack);

function rotateHeroSlides() {
  const slides = document.querySelectorAll(".hero-slide");
  let currentSlide = 0;

  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 5000); // Change slide every 5 seconds
}

function populateCarousel(id, items) {
  const carousel = document.getElementById(id);
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "carousel-item";
    div.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="title">${item.title}</div>
            <div class="subtitle">${item.artist || item.subtitle}</div>
        `;
    carousel.appendChild(div);

    div.addEventListener("click", () => {
      if (id === "newReleases") {
        showAlbumModal(item);
      } else if (item.audio) {
        playSong(item);
      }
    });
  });
}

function showAlbumModal(album) {
  const modal = document.getElementById("albumModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalSongList = document.getElementById("modalSongList");

  modalTitle.textContent = `${album.title} - ${album.artist}`;
  modalSongList.innerHTML = "";

  album.songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${song.title}`;
    li.addEventListener("click", () => playSong(song));
    modalSongList.appendChild(li);
  });

  modal.style.display = "block";
}

function playSong(song) {
  if (currentAudio) {
    currentAudio.pause();
  }

  currentAudio = new Audio(song.audio);
  currentAudio.play();
  isPlaying = true;
  updatePlayPauseButton();

  albumArt.src = song.image;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;

  currentAudio.addEventListener("timeupdate", updateProgress);
  currentAudio.addEventListener("ended", () => playNextTrack(playlist));

  // Update current playlist and track index
  currentPlaylist = playlist;
  currentTrackIndex = currentPlaylist.findIndex(
    (track) => track.title === song.title
  );
}

function updatePlayPauseButton() {
  playPauseBtn.innerHTML = isPlaying
    ? '<i class="fas fa-pause"></i>'
    : '<i class="fas fa-play"></i>';
}

function updateProgress() {
  if (currentAudio && !isDragging) {
    const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
    progress.style.width = `${percent}%`;
  }
}

function playNextTrack(playlist = currentPlaylist) {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  playSong(playlist[currentTrackIndex], playlist);
}

function getAllSongs() {
  const genreSongs = Array.from(
    document.querySelectorAll(".genre-playlist li")
  ).map((li) => ({
    title: li.querySelector("span").textContent,
    artist: "Various Artists",
    image: li.querySelector("img").src,
    audio: `music/${Math.floor(Math.random() * 18)}.mp3`, // Random audio file
  }));
  return [
    ...featuredPlaylists,
    ...trendingSongs,
    ...newReleases.flatMap((album) => album.songs),
    ...justUpdated,
    ...genreSongs,
  ];
}

function createStackedLists() {
  const stackedListsContainer = document.getElementById("stackedLists");
  const genres = ["Pop", "Rock", "Hip Hop", "Electronic"];

  genres.forEach((genre) => {
    const list = document.createElement("div");
    list.className = "stacked-list";
    list.innerHTML = `<h4>${genre}</h4><ul></ul>`;

    for (let i = 1; i <= 5; i++) {
      const li = document.createElement("li");
      li.textContent = `${genre} Song ${i}`;
      list.querySelector("ul").appendChild(li);
    }

    stackedListsContainer.appendChild(list);
  });
}

function getImageUrl(index, formats = ["webp", "jpg", "png"]) {
  return new Promise((resolve, reject) => {
    const tryFormat = (formatIndex) => {
      if (formatIndex >= formats.length) {
        reject(new Error("No supported image format found"));
        return;
      }

      const img = new Image();
      const format = formats[formatIndex];
      img.src = `pics/${index}.${format}`;

      img.onload = () => resolve(img.src);
      img.onerror = () => tryFormat(formatIndex + 1);
    };

    tryFormat(0);
  });
}

function populateSingles() {
  const singlesContainer = document.getElementById("singles");
  singles.forEach((single) => {
    const singleElement = document.createElement("div");
    singleElement.className = "carousel-item";
    singleElement.innerHTML = `
      <img src="${single.cover}" alt="${single.title}">
      <div class="song-title">${single.title}</div>
      <div class="song-artist">${single.artist}</div>
    `;
    singlesContainer.appendChild(singleElement);
  });
}

function enableSmoothScroll() {
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach((carousel) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("mouseleave", () => {
      isDown = false;
    });

    carousel.addEventListener("mouseup", () => {
      isDown = false;
    });

    carousel.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    });
  });
}

// Call this function after populating the carousels
enableSmoothScroll();

function createGenrePlaylists() {
  const genrePlaylistsContainer = document.getElementById("genrePlaylists");
  const genres = ["Pop", "Rock", "Hip Hop", "Electronic"];
  const genreSongs = {
    Pop: ["Amalumbo", "Mulenjibukisha", "Jah"],
    Rock: ["Redemption", "Amalumbo", "Mulenjibukisha"],
    "Hip Hop": ["Jah", "Redemption", "Amalumbo"],
    Electronic: ["Mulenjibukisha", "Jah", "Redemption"],
  };
  const genreArtists = {
    Pop: ["Sampa The Psalmist", "Sampa The Psalmist", "Sampa The Psalmist"],
    Rock: ["Sampa The Psalmist", "Sampa The Psalmist", "Sampa The Psalmist"],
    "Hip Hop": ["Sampa The Psalmist", "Sampa The Psalmist", "Sampa The Psalmist"],
    Electronic: ["Sampa The Psalmist", "Sampa The Psalmist", "Sampa The Psalmist"],
  };

  genres.forEach((genre) => {
    const playlist = document.createElement("div");
    playlist.className = "genre-playlist";
    playlist.innerHTML = `<h4>${genre}</h4><ul></ul>`;

    for (let i = 0; i < 5; i++) {
      const li = document.createElement("li");
      const songIndex = Math.floor(Math.random() * genreSongs[genre].length);
      const songTitle = genreSongs[genre][songIndex];
      const artistName = genreArtists[genre][songIndex];

      getImageUrl(Math.floor(Math.random() * 12))
        .then((imageSrc) => {
          li.innerHTML = `<img src="${imageSrc}" alt="${songTitle}">
                                    <span>${songTitle} - ${artistName}</span>`;
          playlist.querySelector("ul").appendChild(li);

          li.addEventListener("click", () => {
            playSong({
              title: songTitle,
              artist: artistName,
              image: imageSrc,
              audio: `music/${Math.floor(Math.random() * 18)}.mp3`,
            });
          });
        })
        .catch((error) => {
          console.error(`Failed to load image for ${songTitle}:`, error);
        });
    }

    genrePlaylistsContainer.appendChild(playlist);
  });
}

function refreshGenrePlaylists() {
  setInterval(() => {
    document.getElementById("genrePlaylists").innerHTML = "";
    createGenrePlaylists();
  }, 3600000); // 1 hour in milliseconds
}

// Call this after createGenrePlaylists() in your initialization
refreshGenrePlaylists();

// Event Listeners

playPauseBtn.addEventListener("click", () => {
  if (currentAudio) {
    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseButton();
  }
});

nextTrackBtn.addEventListener("click", playNextTrack);

progressBar.addEventListener("click", (e) => {
  if (currentAudio) {
    const percent = e.offsetX / progressBar.offsetWidth;
    currentAudio.currentTime = percent * currentAudio.duration;
    updateProgress();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.innerHTML = document.body.classList.contains("light-mode")
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
});

volumeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  volumeControl.style.display =
    volumeControl.style.display === "block" ? "none" : "block";
});

volumeSlider.addEventListener("input", () => {
  if (currentAudio) {
    currentAudio.volume = volumeSlider.value;
  }
});

document.addEventListener("click", () => {
  volumeControl.style.display = "none";
});

volumeControl.addEventListener("click", (e) => {
  e.stopPropagation();
});

progressBar.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging && currentAudio) {
    const percent =
      (e.clientX - progressBar.getBoundingClientRect().left) /
      progressBar.offsetWidth;
    currentAudio.currentTime = percent * currentAudio.duration;
    updateProgress();
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

progressBar.addEventListener("touchstart", handleProgressBarInteraction);
progressBar.addEventListener("mousedown", handleProgressBarInteraction);
document.addEventListener("touchmove", handleProgressDrag);
document.addEventListener("mousemove", handleProgressDrag);
document.addEventListener("touchend", endProgressDrag);
document.addEventListener("mouseup", endProgressDrag);

// Close modal when clicking outside or on the close button
window.addEventListener("click", (e) => {
  const modal = document.getElementById("albumModal");
  if (e.target === modal || e.target.classList.contains("close")) {
    modal.style.display = "none";
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  rotateHeroSlides();
  populateCarousel("singles", singles);
  populateCarousel("featuredPlaylists", featuredPlaylists);
  populateCarousel("trendingSongs", trendingSongs);
  populateCarousel("newReleases", newReleases);
  populateCarousel("justUpdated", justUpdated);

  // Create genre playlists
  createGenrePlaylists();

  // Set initial playlist and update all songs array
  currentPlaylist = trendingSongs;
  allSongs = getAllSongs();
});
