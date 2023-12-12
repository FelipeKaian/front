var fpsDisplay = document.getElementById('fpsDisplay');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

setup();

var clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  update()

  renderer.render(scene, camera);

  var delta = clock.getDelta();

  var fps = 1 / delta;

  fpsDisplay.innerText = 'FPS: ' + fps.toFixed(0);
}

animate();