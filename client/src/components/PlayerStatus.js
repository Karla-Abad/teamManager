import axios from "axios";
import React, {useEffect, useState} from 'react';
import { Link } from "@reach/router";
import '../App.css';
import SubNav2 from "./SubNav2";

const PlayerStatus = (props) => {

    const {players, setPlayers, setManagePlayerStatusTabIsActive, gameId} = props;
    const[triggerGetAllRequestDummy, setTriggerGetAllRequestDummy] = useState(false);

    useEffect(() => {
        setManagePlayerStatusTabIsActive(true);
      },[]);

    useEffect(()=> {
        axios
        .get("http://localhost:8000/api/players/list")
        .then((res)=>{
          console.log(res)
          setPlayers(res.data.allPlayers)
        })
        .catch(err => console.log(err))
      },[triggerGetAllRequestDummy])

      const handleChangeGameStatus = (idFromBelow, newStatus) => {
        let putData = {};
        if (gameId === "1") {
          putData.gameOneStatus = newStatus;
        } else if (gameId === "2") {
          putData.gameTwoStatus = newStatus;
        } else {
          putData.gameThreeStatus = newStatus;
        }
        axios
          .put(`http://localhost:8000/api/players/${idFromBelow}`, putData)
          .then((response) => {
            console.log(response);
            setTriggerGetAllRequestDummy(!triggerGetAllRequestDummy);
          })
          .catch((err) => console.log(err.response));
      };

    return(
        <div>
            <div className="borderColor">
                <SubNav2 gameId={gameId} />
                <h1>Player Status - Game {props.gameId}</h1>
                <table className="table table-striped table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Player Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {gameId === "1" ? (
            players.map((player,index) => {
              return (
                <tr key={player._id}>
                  <td>{player.playerName}</td>
                  <td>
                    <button
                      className={`${
                        player.gameOneStatus === "Playing"
                          ? "green-playing-btn"
                          : ""
                      }`}
                      onClick={() =>
                        handleChangeGameStatus(player._id, "Playing")
                      }
                    >
                      Playing
                    </button>
                    <button
                      className={`${
                        player.gameOneStatus === "Not Playing"
                          ? "red-not-playing-btn"
                          : ""
                      }`}
                      onClick={() =>
                        handleChangeGameStatus(player._id, "Not Playing")
                      }
                    >
                      Not Playing
                    </button>
                    <button
                      className={`${
                        player.gameOneStatus === "Undecided"
                          ? "yellow-undecided-btn"
                          : ""
                      }`}
                      onClick={() =>
                        handleChangeGameStatus(player._id, "Undecided")
                      }
                    >
                      Undecided
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
          {/* CONDITION RENDER FOR GAMESTATUS === 2 */}
          {gameId === "2" ? (
            players.map((player, index) => {
              return (
                <tr key={player._id}>
                  <td>{player.playerName}</td>
                  <td>
                    <button
                      className={`${
                        player.gameTwoStatus === "Playing"
                          ? "green-playing-btn"
                          : ""
                      }`}
                      onClick={() =>
                        handleChangeGameStatus(player._id, "Playing")
                      }
                    >
                      Playing
                    </button>
                    <button
                      className={`${
                        player.gameTwoStatus === "Not Playing"
                          ? "red-not-playing-btn"
                          : ""
                      }`}
                      onClick={() =>
                        handleChangeGameStatus(player._id, "Not Playing")
                      }
                    >
                      Not Playing
                    </button>
                    <button
                      className={`${
                        player.gameTwoStatus === "Undecided"
                          ? "yellow-undecided-btn"
                          : ""
                      }`}
                      onClick={() =>
                        handleChangeGameStatus(player._id, "Undecided")
                      }
                    >
                      Undecided
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
          {/* CONDITION RENDER FOR GAMESTATUS === 3 */}
          {gameId === "3" ? (
            players.map((player, index) => {
              return (
                <tr key={player._id}>
                  <td>{player.playerName}</td>
                  <td>
                    <button
                      className={`${
                        player.gameThreeStatus === "Playing"
                          ? "green-playing-btn"
                          : ""
                      }`}
                      onClick={() =>
                        handleChangeGameStatus(player._id, "Playing")
                      }
                    >
                      Playing
                    </button>
                    <button
                      className={`${
                        player.gameThreeStatus === "Not Playing"
                          ? "red-not-playing-btn"
                          : ""
                      }`}
                      onClick={() =>
                        handleChangeGameStatus(player._id, "Not Playing")
                      }
                    >
                      Not Playing
                    </button>
                    <button
                      className={`${
                        player.gameThreeStatus === "Undecided"
                          ? "yellow-undecided-btn"
                          : ""
                      }`}
                      onClick={() =>
                        handleChangeGameStatus(player._id, "Undecided")
                      }
                    >
                      Undecided
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default PlayerStatus;