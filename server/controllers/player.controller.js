const Player = require("../models/player.model");

module.exports.findAllPlayers = (req, res) => {
    Player.find()
      .then((allPlayers) => {
        console.log({ allPlayers });
        res.json({ allPlayers });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ err });
      });
  };
  
  module.exports.createPlayer = (req, res) => {
    Player.create(req.body)
      .then((player) => res.json(player))
      .catch((err) => res.status(400).json({ err }));
  };
  
  module.exports.findPlayer = (req, res) => {
    Player.findOne({_id: req.params.id})
    .then(player => res.json(player))
    .catch((err)=> res.status(400).json({err}))
  }
  
  module.exports.updatePlayer = (req, res)=> {
    Player.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
      .then(updatedPlayer => res.json(updatedPlayer))
      .catch(err => res.status(400).json({err}))
  }
  
  module.exports.deletePlayer = (req, res)=> {
    Player.deleteOne({_id: req.params.id})
      .then(deleteConfirmation => res.json(deleteConfirmation))
      .catch((err)=> res.status(400).json({err}))
  }
  