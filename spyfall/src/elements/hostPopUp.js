'use client';

import React from "react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveState } from "@/utils/routerUtils";

import styles from "../styles/page.module.css";
import { BACKEND_URL } from "@/resources/config";

export const HostPopUp = () => {

    const router = useRouter();

    const [playerName, setPlayerName] = useState('');
    const [playerNameValid, setPlayerNameValid] = useState(false);

    function handleNameChange(event) {
        setPlayerName(event.target.value);
        validatePlayerName(event.target.value);
    };

    function validatePlayerName(name) {
        let result = name != '';
        setPlayerNameValid(result);
        return result;
    }

    function checkForLumps() {
        if (playerNameValid) {
            monkeyBalls();
        }
    }

    async function monkeyBalls() {
        const url = new URL(BACKEND_URL + '/lobby');
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
        
        if (data.statusCode == 200) {
            saveState('roomCode', data.payload.roomcode);
            saveState('initialPlayers', data.payload.players);
            saveState('isHost', true);
            saveState('playerName', playerName);
            if (router) {
                console.log(router);
                console.log("no more penis");
                router.push('/lobby');
            }
        } else if (data.statusCode == 420) {
            alert("Roomcode " + roomCode +" not found");
        }
    }

    return (
        <div className={styles.popUpBack}>
            <div className={styles.popUpContainer}>
                <div>
                    <h2 className={styles.popUpHeader}> Spyfall - Host Game </h2>

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

                <button className={styles.buttonSmall} onClick={() => { checkForLumps() }}> <b> Host Game </b> </button>
            </div>
        </div>
    );
};