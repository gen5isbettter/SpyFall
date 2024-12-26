import React from "react";

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { saveState } from "@/utils/routerUtils";

import styles from "../styles/page.module.css";
import { BACKEND_URL } from "@/resources/config";

export const JoinPopUp = () => {

    const router = useRouter();

    const [playerName, setPlayerName] = useState('');
    const [roomCode, setRoomCode] = useState('');

    const [playerNameValid, setPlayerNameValid] = useState(false);
    const [roomCodeValid, setRoomCodeValid] = useState(false);

    const [responseStatus, setResponseStatus] = useState(0);

    const [playerNameError, setPlayerNameError] = useState('');
    const [roomCodeError, setRoomCodeError] = useState('');

    function handleRoomCodeChange(event) {
        let roomCode = event.target.value;
        roomCode = roomCode.toUpperCase();
        setRoomCode(roomCode); 
        setRoomCodeValid(roomCode != '');
    };

    function handleNameChange(event) {
        let name = event.target.value;
        setPlayerName(name);
        let isValid = name != '';
        setPlayerNameValid(isValid);
    };

    // function validatePlayerName(name) {} TODO handle extra name validations later

    function checkForLumps() {
        if (roomCodeValid && playerNameValid) {
            monkeyBalls();
        }
    }

    async function monkeyBalls() {
        const url = new URL(BACKEND_URL + '/lobby');
        url.searchParams.append('playerName', playerName);
        url.searchParams.append('roomcode', roomCode);

        const res = await fetch(url, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => {
            if (!response.ok) { //TODO: check other response codes to handle different join errors
                console.log("FETCH FAILED BRUV")
                console.log(response)
                throw Error(response.statusText)
            }
            return response
        }).catch(error => {
            console.log(error)
        })
        const data = await res.json();
        
        setResponseStatus(data.statusCode);

        if (data.statusCode == 200) {
            saveState('roomCode', data.payload.roomcode);
            saveState('initialPlayers', data.payload.players);
            saveState('isHost', false);
            saveState('playerName', playerName);
            router.push('/lobby');
        } else if (data.statusCode == 420) {
            setRoomCodeError(data.payload);
        } else if (data.statusCode == 422) {
            setPlayerNameError(data.payload);
        }
    }

    return (
        <div className={styles.popUpBack}>
            <div className={styles.popUpContainer}>
                <div>
                    <h2 className={styles.popUpHeader}> Spyfall - Join Game </h2>
                    
                    <div className={styles.row}>
                        <h3 className={styles.popUpText}> Enter lobby code: </h3>
                        <input className={styles.roomCodeInput}
                            type="text"
                            placeholder="Roomcode here"
                            value={roomCode} // Bind the value of input to the state
                            onChange={handleRoomCodeChange} // Update state when input changes
                            style={{ border: roomCodeValid ? '2px solid green' : '2px solid red'}}
                        />
                    </div>

                    <div className={styles.row}>
                        <h3 className={styles.popUpText}> Name-o: </h3>
                        <input className={styles.nameInput}
                            type="text" 
                            placeholder="Ex: Jeff"
                            value={playerName} // Bind the value of input to the state
                            onChange={handleNameChange} // Update state when input changes
                            style={{ border: playerNameValid ? '2px solid green' : '2px solid red'}}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <button className={styles.buttonSmall} onClick={() => { checkForLumps() }}> <b> Join Game </b> </button>
                    { responseStatus == 420 ? 
                        <p className={styles.cum}> Roomcode {roomCodeError} not found </p> 
                            : responseStatus == 422 ? 
                            <p className={styles.cum}> Playername {playerNameError} already taken </p> 
                                : ""
                    }
                </div>
            </div>
        </div>
    );
};