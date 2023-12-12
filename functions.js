var players = {};



function insertNewPlayer({ id, x, y, z }) {
  players[id] = new Player(x, y, z);
  scene.add(players[id]);
}
