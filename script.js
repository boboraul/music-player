
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const image = document.querySelector('img');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeContainer = document.getElementById('volume-container');
const currentVolume = document.getElementById('volume-slider-con');

// Music
const songs = [
    {
        name: 'bog-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto',
    },
    {
        name: 'bog-2',
        displayName: 'Seven Nation Army(Remix)',
        artist: 'Jacinto',
    },
    {
        name: 'bog-3',
        displayName: 'Goodnight Disco Queen',
        artist: 'Jacinto',
    }
];

// Check if playing
let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play/Pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Prev Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update proress bar
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        const roundedPercent = Math.floor(progressPercent);
        progress.style.width = `${roundedPercent}%`;

        // Calculate display for duration
        const durationMinutes =  Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate Display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60); 

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// On load - Select first Song
loadSong(songs[0]);

// Set progress Bar
function setProgressBar (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    // Destructuring
    const { duration } = (music); 
    music.currentTime = (clickX / width) * duration;
}

function setVolumeBar (e) {
    const vHeight= this.clientHeight;
    console.log(vHeight);
    const vClickY = e.offsetY;
    const volume = music.volume;
    music.volume = (vClickY / vHeight);
    volumeBarHeight = music.volume * 100;
    currentVolume.style.height = `${volumeBarHeight}%`;  
}

// Event Listeners

// Prev/Next Song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
volumeContainer.addEventListener('click', setVolumeBar);
