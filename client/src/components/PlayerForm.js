import axios from "axios";
import React, {useEffect, useState} from 'react';
import { Link } from "@reach/router";
import '../App.css';

const PlayerForm = (props) => {
    const {initialPlayerName, initialPreferredPosition, onSubmitProp, errors, setErrors} = props;
    const [playerName, setPlayerName] = useState("");
    const [preferredPosition, setPreferredPosition] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitProp({playerName, preferredPosition});
        
    }

    return(
        <div className="borderColor">
                <Link to="/players/list">List</Link>
                <span> | </span>
                <Link to="/players/addplayer">Add Player</Link>
                <form onSubmit={handleSubmit} className="formBorder containerDim">
                    <h3>Add Player</h3>
                    <div className="inputMargin">
                        <label>Player Name:</label>
                        <input type="text" value={playerName} onChange={(e)=>setPlayerName(e.target.value)} />
                    </div>
                    {errors.playerName && <p>{errors.playerName.message}</p>}
                    <div className="inputMargin">
                        <label>Preferred Position:</label>
                        <input type="text" value={preferredPosition} onChange={(e)=> setPreferredPosition(e.target.value)} />
                    </div>
                    {errors.preferredPosition && <p>{errors.preferredPosition.message}</p>}
                    <div className="buttonAlignment">
                        <button className="submitButton" type="submit">Add</button>
                    </div>
                </form>
        </div>
    )
}

export default PlayerForm;