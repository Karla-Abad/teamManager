
import axios from "axios";
import React, {useEffect, useState} from 'react';
import { Link } from "@reach/router";
import '../App.css';
import SubNav1 from "./SubNav1";


const PlayerList = (props) => {
    
    const {players, setPlayers, removeFromDom, listPageIsActive, setListPageIsActive, setManagePlayerStatusTabIsActive} = props;

    useEffect(() => {
        setListPageIsActive(true);
        setManagePlayerStatusTabIsActive(false);
      });

    useEffect(()=> {
        axios
        .get("http://localhost:8000/api/players/list")
        .then((res)=>{
          console.log(res)
          setPlayers(res.data.allPlayers)
        })
        .catch(err => console.log(err))
      },[])


      const handleDelete = (playerId) => {
          axios
          .delete("http://localhost:8000/api/players/"+playerId)
          .then(res => {
            alert("Are you sure you want to remove {player.playerName}?")
            removeFromDom(playerId)
          })
          .catch((err)=>console.log(err))
      } 

    return(
        <div>
            <div className="borderColor">
                <SubNav1
                    listPageIsActive={listPageIsActive}
                    setListPageIsActive={setListPageIsActive}
                />
                <table className="table table-striped table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Player Name</th>
                        <th scope="col">Preferred Position</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player)=> {
                        return(
                            <tr key={player._id}>
                                <th scope="row">{player.playerName}</th>
                                <td scope="row">{player.preferredPosition}</td>
                                <td>
                                    <button className="red" onClick ={(e)=>{handleDelete(player._id)}}>Delete</button>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
            </div>
            
        </div>
    )
}

export default PlayerList;