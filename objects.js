class Player extends THREE.Mesh {
  constructor(x, y, z) {
    super(
      new THREE.BoxGeometry(1),
      new THREE.MeshNormalMaterial({ color: 0x00ff00 })
    );
    this.position.x = x ?? 0;
    this.position.y = y ?? 0;
    this.position.z = z ?? 0;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.spd = 0.1;
    this.isDashing = false;
    this.keyW = false;
    this.keyA = false;
    this.keyS = false;
    this.keyD = false;
    this.keySpace = false;
    this.keyShift = false;
  }
  fall() {
    this.vy -= 0.001;
    this.position.y += this.vy;
    this.rotation.y -= 0.01;
    this.rotation.x -= 0.01;
  }
  toRotation(x, y, z) {
    this.rotation.x = x;
    this.rotation.y = y;
    this.rotation.z = z;
  }
  toRotationX(x) {
    this.rotation.x = x;
  }
  toRotationY(y) {
    this.rotation.y = y;
  }
  toRotationZ(z) {
    this.rotation.z = z;
  }
  rotate(x, y, z) {
    this.rotation.x += x;
    this.rotation.y += y;
    this.rotation.z += z;
  }
  rotateX(x) {
    this.rotation.x += x;
  }
  rotateY(y) {
    this.rotation.y += y;
  }
  rotateZ(z) {
    this.rotation.z += z;
  }
  to(x, y, z) {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }
  toX(x) {
    this.position.x = x;
  }
  toY(y) {
    this.position.y = y;
  }
  toZ(z) {
    this.position.z = z;
  }
  move(x, y, z) {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;
  }
  moveX(x) {
    this.position.x += x;
  }
  moveY(y) {
    this.position.y += y;
  }
  moveZ(z) {
    this.position.z += z;
  }
  override(update){
    this.position.x = update.x;
    this.position.y = update.y;
    this.position.z = update.z;
    this.rotation.x = update.ax;
    this.rotation.y = update.ay;
    this.rotation.z = update.az;
    this.keyW = update.keyW;
    this.keyA = update.keyA;
    this.keyS = update.keyS;
    this.keyD = update.keyD;
    this.keySpace = update.keySpace;
    this.keyShift = update.keyShift;
  }
  update() {
    let targetAngle = 0;
    let animate = false;
    if (this.keyW) {
      if (this.keyA) {
        this.moveX(-this.spd * Math.cos(Math.PI / 4));
        this.moveZ(-this.spd * Math.cos(Math.PI / 4));
        targetAngle = 45;
      } else if (this.keyD) {
        this.moveX(this.spd * Math.cos(Math.PI / 4));
        this.moveZ(-this.spd * Math.cos(Math.PI / 4));
        targetAngle = -45;
      } else {
        this.moveZ(-this.spd);
        targetAngle = 0;
      }
      animate = true;
    } else if (this.keyS) {
      if (this.keyA) {
        this.moveX(-this.spd * Math.cos(Math.PI / 4));
        this.moveZ(this.spd * Math.cos(Math.PI / 4));
        targetAngle = 135;
      } else if (this.keyD) {
        this.moveX(this.spd * Math.cos(Math.PI / 4));
        this.moveZ(this.spd * Math.cos(Math.PI / 4));
        targetAngle = 225;
      } else {
        this.moveZ(this.spd);
        targetAngle = 180;
      }
      animate = true;
    } else if (this.keyA) {
      this.moveX(-this.spd);
      targetAngle = 90;
      animate = true;
    } else if (this.keyD) {
      this.moveX(this.spd);
      targetAngle = -90;
      animate = true;
    }

    targetAngle += 360;

    targetAngle = targetAngle % 360;

    if (animate) {
      this.rotation.y =
        (this.rotation.y * 1.8 + (targetAngle / 180) * Math.PI * 0.2) / 2;
    }

    if (this.keyShift && !this.isDashing) {
      this.isDashing = true;
      this.spd = 0.6;
      setTimeout(() => {
        this.spd = 0.1;
      }, 100);
      setTimeout(() => {
        this.isDashing = false;
      }, 2000);
    }
  }
  colidesWith(object) {
    const playerX = this.position.x;
    const playerY = this.position.y;
    const objectX = object.position.x;
    const objectY = object.position.y;

    if (
      playerX < objectX + 1 &&
      playerX + 1 > objectX &&
      playerY < objectY + 1 &&
      playerY + 1 > objectY
    ) {
      return true;
    } else {
      return false;
    }
  }
}

class Floor extends THREE.Mesh {
  constructor() {
    super(
      new THREE.BoxGeometry(100, 1, 100),
      new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
  }
}

class Particle extends THREE.Mesh {
  constructor(x, z, ay) {
    super(
      new THREE.BoxGeometry(1),
      new THREE.MeshNormalMaterial({ color: 0xff0000, transparent: true })
    );
    this.position.x = x;
    this.position.z = z;
    this.rotation.z = -Math.PI / 2;
    this.rotation.y = ay + Math.PI / 2;
    this.material.opacity = 0.5;
  }
  update() {
    if (this.material.opacity > 0) {
      this.material.opacity -= 0.03;
    } else {
      scene.remove(this);
    }
  }
}

class Bullet extends THREE.Mesh {
  constructor(spawnerId, x, z, ay) {
    super(
      new THREE.ConeGeometry(0.3, 0.7, 10),
      new THREE.MeshNormalMaterial({ color: 0x0000ff })
    );
    this.spawnerId = spawnerId;
    this.position.x = x;
    this.position.z = z;
    this.rotation.z = -Math.PI / 2;
    this.rotation.y = ay + Math.PI / 2;
  }
  update() {
    if (Math.abs(this.position.x) > 100 || Math.abs(this.position.z > 100)) {
      scene.remove(this);
    }
    this.position.x += 0.3 * Math.sin(this.rotation.y + Math.PI / 2);
    this.position.z += 0.3 * Math.cos(this.rotation.y + Math.PI / 2);
  }
}

class Axe extends THREE.Mesh {
  constructor(x, z, ay) {
    super(
      new THREE.ConeGeometry(0.1, 0.3, 10),
      new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    this.position.x = x;
    this.position.z = z;
    this.rotation.z = -Math.PI / 2;
    this.rotation.y = ay + Math.PI / 2;
  }
  update() {
    if (Math.abs(this.position.x) > 100 || Math.abs(this.position.z > 100)) {
      scene.remove(this);
    }
    this.position.x += 0.3 * Math.sin(this.rotation.y + Math.PI / 2);
    this.position.z += 0.3 * Math.cos(this.rotation.y + Math.PI / 2);
  }
}

class Hatchet extends THREE.Mesh {
  constructor(x, z, ay) {
    super(
      new THREE.ConeGeometry(0.1, 0.3, 10),
      new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    this.position.x = x;
    this.position.z = z;
    this.rotation.z = -Math.PI / 2;
    this.rotation.y = ay + Math.PI / 2;
  }
  update() {
    if (Math.abs(this.position.x) > 100 || Math.abs(this.position.z > 100)) {
      scene.remove(this);
    }
    this.position.x += 0.3 * Math.sin(this.rotation.y + Math.PI / 2);
    this.position.z += 0.3 * Math.cos(this.rotation.y + Math.PI / 2);
  }
}
