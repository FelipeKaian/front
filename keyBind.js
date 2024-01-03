function onKeyDown(event) {
  switch (event.keyCode) {
    case 87:
      player.keyW = true;
      break;
    case 65:
      player.keyA = true;
      break;
    case 83:
      player.keyS = true;
      break;
    case 68:
      player.keyD = true;
      break;
    case 32:
      player.keySpace = true;
      break;
    case 16:
      player.keyShift = true;
      break;
  }
  emitMyUpdate();
}

function onKeyUp(event) {
  switch (event.keyCode) {
    case 87:
      player.keyW = false;
      break;
    case 65:
      player.keyA = false;
      break;
    case 83:
      player.keyS = false;
      break;
    case 68:
      player.keyD = false;
      break;
    case 32:
      player.keySpace = false;
      break;
    case 16:
      player.keyShift = false;
      break;
  }
  emitMyUpdate();
}
