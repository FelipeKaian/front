var floor = new Floor();
var player = new Player();
var updatableObjects = [];
var frames = 0;
var players = {};

function setup() {

    alert("v1.1")

    scene.add(player);
    scene.add(floor);
    floor.position.y = -1;
    camera.position.z = 10;
    camera.position.y = 15;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); 
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
  
    const box = new THREE.Box3().setFromObject(player);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const radius = box.getBoundingSphere(new THREE.Sphere()).radius;
  
    const offset = 15 * radius;
    const vector = camera.position
      .clone()
      .sub(center)
      .normalize()
      .multiplyScalar(offset);
    camera.position.copy(center).add(vector);
    camera.lookAt(center);
  
    const size = 50;
    const divisions = 1;
    const gridMaterial = new THREE.LineBasicMaterial({ color: 0x808080 });
  
    const gridGeometry = new THREE.BufferGeometry();
    const vertices = [];
  
    for (let i = -size; i <= size; i += divisions) {
      vertices.push(i, -0.49, -size);
      vertices.push(i, -0.49, size);
      vertices.push(-size, -0.49, i);
      vertices.push(size, -0.49, i);
    }
  
    gridGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
  
    const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(grid);
  
    document.addEventListener('click', () => {
      let bullet = new Bullet(
        myId,
        player.position.x,
        player.position.z,
        player.rotation.y
      );
      updatableObjects.push(bullet);
      scene.add(bullet);
      socket.emit('objectUpdate', {
        type: 'bullet',
        spawnerId: myId,
        x: player.position.x,
        z: player.position.z,
        ay: player.rotation.y,
      });
    });
  
    // const loader = new THREE.GLTFLoader();
    // loader.load('./assets/big_axe.glb', (gltf) => {
    //   const model = gltf.scene;
    //   scene.add(model);
    // });
  }