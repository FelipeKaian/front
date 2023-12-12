var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;
var keySpace = false;
var keyShift = false;

function keyboardMovement() {
  let targetAngle = 0;
  let animate = false;
  if (keyW) {
    if (keyA) {
      player.moveX(-player.spd * Math.cos(Math.PI / 4));
      player.moveZ(-player.spd * Math.cos(Math.PI / 4));
      targetAngle = 45;
    } else if (keyD) {
      player.moveX(player.spd * Math.cos(Math.PI / 4));
      player.moveZ(-player.spd * Math.cos(Math.PI / 4));
      targetAngle = -45;
    } else {
      player.moveZ(-player.spd);
      targetAngle = 0;
    }
    animate = true;
  } else if (keyS) {
    if (keyA) {
      player.moveX(-player.spd * Math.cos(Math.PI / 4));
      player.moveZ(player.spd * Math.cos(Math.PI / 4));
      targetAngle = 135;
    } else if (keyD) {
      player.moveX(player.spd * Math.cos(Math.PI / 4));
      player.moveZ(player.spd * Math.cos(Math.PI / 4));
      targetAngle = 225;
    } else {
      player.moveZ(player.spd);
      targetAngle = 180;
    }
    animate = true;
  } else if (keyA) {
    player.moveX(-player.spd);
    targetAngle = 90;
    animate = true;
  } else if (keyD) {
    player.moveX(player.spd);
    targetAngle = -90;
    animate = true;
  }

  targetAngle += 360;

  targetAngle = targetAngle % 360;

  if (animate) {
    player.rotation.y =
      (player.rotation.y * 1.8 + (targetAngle / 180) * Math.PI * 0.2) / 2;
  }

  if (keyShift && !player.isDashing) {
    player.isDashing = true;
    player.spd = 0.6;
    setTimeout(() => {
      player.spd = 0.1;
    }, 100);
    setTimeout(() => {
      player.isDashing = false;
    }, 2000);
  }
}

function onKeyDown(event) {
  switch (event.keyCode) {
    case 87:
      keyW = true;
      break;
    case 65:
      keyA = true;
      break;
    case 83:
      keyS = true;
      break;
    case 68:
      keyD = true;
      break;
    case 32:
      keySpace = true;
      break;
    case 16:
      keyShift = true;
      break;
  }
}

function onKeyUp(event) {
  switch (event.keyCode) {
    case 87:
      keyW = false;
      break;
    case 65:
      keyA = false;
      break;
    case 83:
      keyS = false;
      break;
    case 68:
      keyD = false;
      break;
    case 32:
      keySpace = false;
      break;
    case 16:
      keyShift = false;
      break;
  }
}
