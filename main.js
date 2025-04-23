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

// Three.js setup
let scene, camera, renderer, model, controls;

function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('model-container').appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Load OBJ model
    const loader = new THREE.OBJLoader();
    loader.load(
        'fan_test/uchiwafan03.obj',
        function (object) {
            model = object;
            scene.add(model);
            
            // Center the model
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            // Scale the model if needed
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim;
            model.scale.multiplyScalar(scale);

            // Add a basic material if the model doesn't have one
            model.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    if (!child.material) {
                        child.material = new THREE.MeshPhongMaterial({
                            color: 0x808080,
                            shininess: 30
                        });
                    }
                }
            });
        },
        // Progress callback
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Error callback
        function (error) {
            console.error('An error occurred while loading the model:', error);
        }
    );

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Initialize and start animation
init();
animate();