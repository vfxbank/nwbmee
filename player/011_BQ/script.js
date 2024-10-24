const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const currentTimeSlider = document.getElementById('currentTime');
const playtimeDisplay = document.getElementById('playtime');
const endtimeDisplay = document.getElementById('endtime');
const volumeSlider = document.getElementById('volumeSlider');
const volumeDisplay = document.getElementById('volume');
const playlist = document.getElementById('playlist');
const tracks = playlist.getElementsByTagName('li');

let currentTrackIndex = 0;

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.getAttribute('data-src');
    document.querySelector('.music-title').textContent = track.textContent;
    audio.load();
    updateDuration();
    updateSliderBackground(currentTimeSlider);
    playButton.textContent = '▶';
    highlightCurrentTrack();
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = '❚❚';
    } else {
        audio.pause();
        playButton.textContent = '▶';
    }
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playButton.textContent = '❚❚';
}

function playPrevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playButton.textContent = '❚❚';
}

function updateCurrentTime() {
    currentTimeSlider.value = audio.currentTime;
    playtimeDisplay.textContent = formatTime(audio.currentTime);
    updateSliderBackground(currentTimeSlider);
}

function updateDuration() {
    currentTimeSlider.max = audio.duration;
    endtimeDisplay.textContent = formatTime(audio.duration);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateVolume() {
    audio.volume = volumeSlider.value;
    volumeDisplay.textContent = Math.round(audio.volume * 100);
    updateSliderBackground(volumeSlider);
}

function skipTo() {
    audio.currentTime = currentTimeSlider.value;
}

function updateSliderBackground(slider) {
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, #ff5f5f ${value}%, #ddd ${value}%)`;
}

function highlightCurrentTrack() {
    for (let i = 0; i < tracks.length; i++) {
        tracks[i].classList.remove('active');
    }
    tracks[currentTrackIndex].classList.add('active');
}

playButton.addEventListener('click', togglePlay);
prevButton.addEventListener('click', playPrevTrack);
nextButton.addEventListener('click', playNextTrack);
audio.addEventListener('timeupdate', updateCurrentTime);
audio.addEventListener('loadedmetadata', updateDuration);
audio.addEventListener('ended', playNextTrack);
volumeSlider.addEventListener('input', updateVolume);
currentTimeSlider.addEventListener('input', skipTo);

// Initialize slider backgrounds
document.addEventListener('DOMContentLoaded', () => {
    loadTrack(currentTrackIndex);
    updateSliderBackground(currentTimeSlider);
    updateSliderBackground(volumeSlider);
});

for (let i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener('click', () => {
        currentTrackIndex = i;
        loadTrack(currentTrackIndex);
        audio.play();
        playButton.textContent = '❚❚';
    });
}
