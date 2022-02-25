import React, {useEffect, useState} from 'react';
import {Link, navigate, Router} from "@reach/router"
import axios from 'axios';
import './App.css';
import PlayerList from './components/PlayerList';
import PlayerForm from './components/PlayerForm';
import PlayerStatus from './components/PlayerStatus';
import Nav from './components/Nav';


const App = () => {
  const [players, setPlayers] = useState([]);
  const[loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [listPageIsActive, setListPageIsActive] = useState(true);
  const [managePlayerStatusTabIsActive, setManagePlayerStatusTabIsActive] = useState(false);

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
     <Nav
        managePlayerStatusTabIsActive={managePlayerStatusTabIsActive}
        setManagePlayerStatusTabIsActive={setManagePlayerStatusTabIsActive}
      />
     <Router>
      <PlayerList 
      path="/players/list" 
      default  
      players={players} 
      setPlayers={setPlayers} 
      removeFromDom = {removeFromDom}
      listPageIsActive = {listPageIsActive}
      setListPageIsActive = {setListPageIsActive}
      setManagePlayerStatusTabIsActive = {setManagePlayerStatusTabIsActive}
      />
      <PlayerForm 
      path="/players/addplayer" 
      initialPlayerName={""} 
      initialPreferredPosition={""} 
      errors={errors} 
      setErrors={setErrors} 
      onSubmitProp={createPlayer}
      listPageIsActive = {listPageIsActive}
      setListPageIsActive = {setListPageIsActive}
      setManagePlayerStatusTabIsActive = {setManagePlayerStatusTabIsActive}
      />
      <PlayerStatus 
      path="/status/game/:gameId" 
      players={players} 
      setPlayers={setPlayers}
      setManagePlayerStatusTabIsActive = {setManagePlayerStatusTabIsActive}
      />
    </Router>
    </div>
    
  );
}

export default App;
