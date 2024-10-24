function openProject(projectId) {
    document.getElementById(projectId).style.display = 'flex';
}

function closeModal(projectId) {
    document.getElementById(projectId).style.display = 'none';
}

// Close modal when clicking outside of the modal content
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
}
