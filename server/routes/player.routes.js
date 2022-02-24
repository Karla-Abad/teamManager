const PlayerController = require("../controllers/player.controller");
module.exports = (app) => {
    app.get("/api/players/list", PlayerController.findAllPlayers);
    app.post("/api/players/addplayer", PlayerController.createPlayer);
    app.get("/api/players/:id", PlayerController.findPlayer);
    app.put("/api/players/:id", PlayerController.updatePlayer);
    app.delete("/api/players/:id", PlayerController.deletePlayer);
};