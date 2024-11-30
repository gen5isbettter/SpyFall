import React from "react";
import styles from "../popUp.module.css";

import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

export const JoinPopUp = () => {

    const navigate = useNavigate();

    const [playerNameInput, setPlayerNameInput] = useState('');
    const [roomCodeInput, setRoomCodeInput] = useState('');

    function handleNameChange(event) {
        setPlayerNameInput(event.target.value);  // Update state with the new input value
    };

    function handleRoomCodeChange(event) {
        setRoomCodeInput(event.target.value);  // Update state with the new input value
    };

    async function checkForLumps() {
        if (!roomCode) {
            
        } else if (!playerName) {
            
        } else {
            monkeyBalls();
        }
    }

    async function monkeyBalls() {
        const url = new URL('http://localhost:8080/lobby');
        url.searchParams.append('playerName', playerNameInput);
        url.searchParams.append('roomcode', roomCodeInput);

        const res = await fetch(url, {
            method: 'PATCH',
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
        const isHost = false;
        navigate("/lobby", { state: { roomCode, isHost, initialPlayers } });
        console.log("POOP");
        console.log(roomCode);
        console.log(initialPlayers);
    }

    return (
        <div className={styles.popUpBack}>
            <div className={styles.popUpContainer}>
                <div>
                    <h2>Spyfall- Join Game</h2>
                    
                    <div className={styles.row}>
                        <h3 style={{paddingRight: '10px', display:'inline'}}> Enter lobby code: </h3>
                        <input
                            type="text"
                            placeholder="Roomcode here"
                            value={roomCodeInput} // Bind the value of input to the state
                            onChange={handleRoomCodeChange} // Update state when input changes
                        />
                    </div>

                    <div className={styles.row}>
                        <h3 style={{paddingRight: '10px', display:'inline'}}> Choose display name: </h3>
                        <input
                            type="text"
                            placeholder="Ex: Jeff"
                            value={playerNameInput} // Bind the value of input to the state
                            onChange={handleNameChange} // Update state when input changes
                        />
                    </div>
                </div>
                
                <button className={styles.popup__closeBtn} onClick={() => { monkeyBalls() }}>Join Game</button>
            </div>
        </div>
    );
};