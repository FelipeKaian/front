var myId;

const socket = io('https://5de7-187-44-245-14.ngrok-free.app');

socket.on('connected', (id) => {
  myId = id;
});

socket.on('playerUpdate', (playerUpdate) => {
  if (!players[playerUpdate.id]) {
    insertNewPlayer(playerUpdate);
  } else {
    players[playerUpdate.id].override(playerUpdate);
  }
});

socket.on('objectUpdate', (objectUpdate) => {
  let object;
  if (objectUpdate.type == 'bullet') {
    object = new Bullet(
      objectUpdate.spawnerId,
      objectUpdate.x,
      objectUpdate.z,
      objectUpdate.ay
    );
  } else {
    object = new Particle(objectUpdate.x, objectUpdate.z, objectUpdate.ay);
  }
  updatableObjects.push(object);
  scene.add(object);
});

function emitMyUpdate(){
  socket.emit('playerUpdate', {
    id: myId,
    x: player.position.x,
    y: player.position.y,
    z: player.position.z,
    ax: player.rotation.x,
    ay: player.rotation.y,
    az: player.rotation.z,
    keyW: player.keyW,
    keyA: player.keyA,
    keyS: player.keyS,
    keyD: player.keyD,
    keySpace: player.keySpace,
    keyShift: player.keyShift,
  });
}

setInterval(() => {
  if (myId) {
    emitMyUpdate();
  }
}, 3000);
