document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.parallax-text span');
    
    // Assign random depth values to each letter
    letters.forEach((letter) => {
        letter.dataset.depthX = Math.random() * 30 + 10; // Random depth between 10 and 40
        letter.dataset.depthY = Math.random() * 30 + 10; // Random depth between 10 and 40
    });

    // Handle scroll event to show/hide the navigation bar
    const header = document.querySelector('header');
    const heroSectionHeight = document.querySelector('.container').offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroSectionHeight) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    });
});

document.addEventListener('mousemove', (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    const letters = document.querySelectorAll('.parallax-text span');
    
    letters.forEach((letter) => {
        const depthX = letter.dataset.depthX;
        const depthY = letter.dataset.depthY;

        const offsetX = x * depthX;
        const offsetY = y * depthY;

        letter.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const photoItems = document.querySelectorAll('.music-player');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        photoItems.forEach((item, index) => {
            const depth = index % 2 === 0 ? 5 : -5; // Alternate depth for a more dynamic effect
            const itemOffset = item.offsetTop;
            const windowHeight = window.innerHeight;

            // Check if the item is in the viewport
            if (scrollPosition + windowHeight > itemOffset && scrollPosition < itemOffset + item.clientHeight) {
                const parallaxEffect = (scrollPosition - itemOffset) * depth / 100;
                item.style.transform = `translateY(${parallaxEffect}px)`;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const photoItems = document.querySelectorAll('.music-player');

    photoItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X relative to the item
            const y = e.clientY - rect.top;  // Mouse Y relative to the item
            const moveX = (x - rect.width / 2) * 0.1; // Adjust the multiplier for more or less movement
            const moveY = (y - rect.height / 2) * 0.1;

            item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0, 0)'; // Reset the position when the mouse leaves
        });
    });
});

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
