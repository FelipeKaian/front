function update() {
  frames++;

  player.update()

  Object.values(players).forEach((p)=>p.update())

  if (player.spd != 0.1) {
    let p = new Particle(
      player.position.x,
      player.position.z,
      player.rotation.y
    );
    updatableObjects.push(p);
    scene.add(p);
  }

  updatableObjects.forEach((b) => {
    b.update();
    if(player.colidesWith(b) && b.spawnerId !== null && b.spawnerId !== myId){
      location.reload();  
    }
  });

  if (
    player.position.x > 51 ||
    player.position.z > 51 ||
    player.position.x < -51 ||
    player.position.z < -51
  ) {
    player.fall();
  }

  camera.position.x = player.position.x;
  camera.position.z = player.position.z + 8;
}
