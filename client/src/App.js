import React, {useEffect, useState} from 'react';
import {Link, navigate, Router} from "@reach/router"
import axios from 'axios';
import './App.css';
import PlayerList from './components/PlayerList';
import PlayerForm from './components/PlayerForm';


const App = () => {
  const [players, setPlayers] = useState([]);
  const[loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(()=> {
    axios
    .get("http://localhost:8000/api/players/list")
    .then((res)=> {
      console.log(res)
      setPlayers(res.data.allPlayers)
      setLoaded(true);
    })
    .catch(err => console.log(err))
  },[])

  const removeFromDom = playerId => {
    setPlayers(players.filter(player => player._id !== playerId))
  }

  const createPlayer = player => {
    axios
    .post("http://localhost:8000/api/players/addplayer", player)
    .then(res => {
      setPlayers([...players, res.data])
      navigate("/players/list");
    })
    .catch(err => {
      console.log(err.response.data.err.errors);
      setErrors(err.response.data.err.errors);
    })
  }

  return (
    <div className="App">
     <Link to="">Manage Players</Link>
     <span> | </span>
     <Link to="">Manage Player Status</Link>
     <Router>
      <PlayerList path="/players/list" default  players={players} setPlayers={setPlayers} removeFromDom = {removeFromDom}/>
      <PlayerForm path="/players/addplayer" initialPlayerName={""} initialPreferredPosition={""} errors={errors} setErrors={setErrors} onSubmitProp={createPlayer}/>
    </Router>
    </div>
    
  );
}

export default App;
