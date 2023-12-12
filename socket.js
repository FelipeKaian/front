var myId;

const socket = io('ws://5de7-187-44-245-14.ngrok-free.app');

socket.on('connected', (id) => {
  myId = id;
});

socket.on('playerUpdate', (playerUpdate) => {
  if (!players[playerUpdate.id]) {
    insertNewPlayer(playerUpdate);
  } else {
    players[playerUpdate.id].update(playerUpdate);
  }
});

socket.on('objectUpdate', (objectUpdate) => {
  let object;
  if (objectUpdate.type == 'bullet') {
    object = new Bullet(objectUpdate.spawnerId,objectUpdate.x, objectUpdate.z, objectUpdate.ay);
  } else {
    object = new Particle(objectUpdate.x, objectUpdate.z, objectUpdate.ay);
  }
  updatableObjects.push(object);
  scene.add(object);
});

setInterval(() => {
  if (myId) {
    socket.emit('playerUpdate', {
      id: myId,
      x: player.position.x,
      y: player.position.y,
      z: player.position.z,
      ax: player.rotation.x,
      ay: player.rotation.y,
      az: player.rotation.z,
    });
  }
}, 15);
