document.addEventListener('DOMContentLoaded', function() {
    fetch('asset/scripts.txt')
        .then(response => response.text())
        .then(text => {
            // Split text in half for two containers
            const lines = text.split('\n');
            const midPoint = Math.ceil(lines.length / 2);
            
            // First half for left container
            const content1 = document.querySelector('.scroll-content1');
            content1.textContent = lines.slice(0, midPoint).join('\n');
            
            // Second half for right container
            const content2 = document.querySelector('.scroll-content2');
            content2.textContent = lines.slice(midPoint).join('\n');
            
            // Double the content for smooth infinite scrolling
            content1.textContent += '\n\n' + content1.textContent;
            content2.textContent += '\n\n' + content2.textContent;
        })
        .catch(error => console.error('Error loading text:', error));
});

document.querySelectorAll('.video-click a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const videoSrc = link.getAttribute('data-video');
        const overlay = document.querySelector('.video-overlay');
        const video = overlay.querySelector('video');
        
        video.src = videoSrc;
        overlay.style.display = 'flex';
        video.play();
    });
});

document.querySelector('.close-video').addEventListener('click', () => {
    const overlay = document.querySelector('.video-overlay');
    const video = overlay.querySelector('video');
    
    video.pause();
    video.src = '';
    overlay.style.display = 'none';
});
