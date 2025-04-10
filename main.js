/**
 * main.js
 * This file defines the cycleImage function which cycles through images on click
 * and creates five rectangle containers when reaching step 5.
 */

function cycleImage() {
  var img = document.getElementById('animatedImage');
  var step = parseInt(img.getAttribute('data-step') || '0', 10);
  
  switch (step) {
    case 0:
      img.src = 'asset/4_diagram-01.png';
      img.setAttribute('data-step', '1');
      break;
    case 1:
      img.src = 'asset/4_diagram-02.png';
      img.setAttribute('data-step', '2');
      break;
    case 2:
      img.src = 'asset/4_diagram-03.png';
      img.setAttribute('data-step', '3');
      break;
    case 3:
      img.src = 'asset/4_diagram-04.png';
      img.setAttribute('data-step', '4');
      break;
    case 4:
      img.src = 'asset/0403_diagram copy.png';
      img.setAttribute('data-step', '5');
      break; // Added break to prevent fall-through
    case 5:
      // Create 5 rectangle containers for videos with round corners and same background image.
      for (let i = 0; i < 5; i++) {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.style.width = '300px';
        videoContainer.style.height = '200px';
        videoContainer.style.borderRadius = '10px';
        videoContainer.style.backgroundImage = `url(${img.src})`;
        videoContainer.style.backgroundSize = 'cover';
        videoContainer.style.margin = '10px';
        // Append the container to the document body or a designated parent element.
        document.body.appendChild(videoContainer);
      }
      break;
    default:
      // Reset on error
      img.src = 'asset/0403_diagram.png';
      img.setAttribute('data-step', '0');
      break;
  }
}

// Wait for the DOM to load before attaching event listeners.
document.addEventListener("DOMContentLoaded", () => {
  const animatedImage = document.getElementById("animatedImage");
  if (animatedImage) {
    animatedImage.addEventListener("click", cycleImage);
  }
});