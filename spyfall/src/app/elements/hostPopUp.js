import React from "react";
import styles from "../popUp.module.css";

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

export const HostPopUp = () => {
    const navigate = useNavigate();

    const [playerName, setPlayerName] = useState('');
    const [playerNameValid, setPlayerNameValid] = useState(false);

    function handleNameChange(event) {
        setPlayerName(event.target.value);
        validatePlayerName(event.target.value);
    };

    function validatePlayerName(name) {
        let result = name != '';
        setPlayerNameValid(result);
        console.log(result);
        return result;
    }

    function checkForLumps() {
        if (playerNameValid) {
            monkeyBalls();
        }
    }

    async function monkeyBalls() {
        const url = new URL('http://localhost:8080/lobby');
        url.searchParams.append('playerName', playerName);

        const res = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            //body: JSON.stringify({ data: payload }), // Sending the string in a JSON object
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            
            }
            return response
        }).catch(error => {
            console.log(error)
        })
        const data = await res.json();
        const roomCode = await data.roomcode;
        const initialPlayers = await data.players;
        const isHost = true;
        navigate("/lobby", { state: { roomCode, isHost, initialPlayers } });
        console.log("POOP");
        console.log(roomCode);
        console.log(initialPlayers);
    }

    return (
        <div className={styles.popUpBack}>
            <div className={styles.popUpContainer}>
                <div>
                    <h2>Spyfall- Host Game</h2>

                    <div className={styles.row}>
                        <h3 style={{paddingRight: '10px', display:'inline'}}> Choose display name: </h3>
                        <input
                            type="text" 
                            placeholder="Ex: Jeff"
                            value={playerName} // Bind the value of input to the state
                            onChange={handleNameChange} // Update state when input changes
                            style={{ border: playerNameValid ? '2px solid green' : '2px solid red'}}
                        />

                    </div>


                </div>

                <button className={styles.popup__closeBtn} onClick={() => { checkForLumps() }}>Host Game</button>
            </div>
        </div>
    );
};