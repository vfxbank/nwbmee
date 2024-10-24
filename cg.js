document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('media-modal');
    const modalImg = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
    const modalVideoSrc = document.getElementById('modal-video-src');
    const closeModal = document.querySelector('.modal .close');

    items.forEach(item => {
        item.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            const src = this.getAttribute('data-src');

            modal.style.display = 'block';

            if (type === 'image') {
                modalImg.src = src;
                modalImg.style.display = 'block';
                modalVideo.style.display = 'none';
                modalVideo.pause(); // Ensure video is paused
            } else if (type === 'video') {
                modalVideoSrc.src = src;
                modalVideo.style.display = 'block';
                modalImg.style.display = 'none';

                // Force reloading the video to ensure it plays correctly
                modalVideo.load();
            }

            // Add show class for animation
            setTimeout(() => {
                modal.classList.add('show');
                document.querySelector('.modal-content').classList.add('show');
            }, 10); // Trigger CSS transition
        });
    });

    closeModal.addEventListener('click', function () {
        modal.classList.remove('show');
        document.querySelector('.modal-content').classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            modalVideo.pause(); // Pause video when closing
        }, 300); // Wait for CSS transition
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.querySelector('.modal-content').classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                modalVideo.pause(); // Pause video when clicking outside
            }, 300); // Wait for CSS transition
        }
    });
});
