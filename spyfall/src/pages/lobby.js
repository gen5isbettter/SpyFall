'use client';

import styles from '../styles/page.module.css';

import {
    useState,
    useEffect,
    useRef
} from 'react';

import { useRouter } from 'next/navigation'; //equivalent to import Router from 'next/navigation'; and then accessing Router.useRouter();

import { saveState, getState } from '@/utils/routerUtils';

export default function Lobby() {

    const router = useRouter();

    let rc = '';
    const [roomCode, setRoomCode] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [playerName, setPlayerName] = useState('');
    const [playerList, setPlayerList] = useState(null);

    useEffect(() => {
        // Set up the interval to run every minute (60000 milliseconds)
        const intervalId = setTimeout(setInterval(refreshLobby, 1000), 1000);

        if (typeof window !== "undefined") {
            rc = getState('roomCode');
            setRoomCode(rc);
            setIsHost(getState('isHost'));
            setPlayerName(getState('playerName'));
            setPlayerList(getState('initialPlayers'));
        }

        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    async function startLobby() {
        const url = new URL('http://localhost:8080/start');
        url.searchParams.append('roomcode', roomCode);

        await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response
        }).catch(error => {
            console.log(error)
        })
    }

    async function refreshLobby() {
        const url = new URL('http://localhost:8080/lobby');
        url.searchParams.append('roomcode', rc);

        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
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
            setPlayerList(data.payload.players);
            if (data.payload.hasStarted) {
                // saveState('playerName', playerName); //TO DO- see if we dont need this, they're already in session storage
                // saveState('roomCode', roomCode); //TO DO- see if we dont need this, they're already in session storage
                router.push('/game');
            }
        } else if (data.statusCode == 420) {
            //alert("Roomcode " + roomCode +" not found");
        }
    }

    function getPlayerScrotom(playerName) {
        return(
            <tr>
                <td> {playerName} </td>
            </tr>
        );
    }

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <a className={styles.title} onClick={() => { router.push('/') }}> SpyGoon </a>
            </div>

            <div className={styles.container}>
                <div className={styles.lobbyContainer}>
                    <div className={styles.row}>
                        <h3 className={styles.stink} style={{ paddingRight: '5px', display: 'inline' }}> Roomcode: {roomCode} </h3>
                    </div>

                    <div className={styles.playerList}>
                        <h2 className={styles.stink}> Lobby Wieners </h2>

                        <table className={styles.table}>
                            {playerList ? playerList.map(player => getPlayerScrotom(player)) : ''}
                        </table>
                    </div>
                    {/* find a way to take user to next screen instant oatmeal */}
                    { isHost ? <div className={styles.row}> <button className={styles.button} onClick={() => { startLobby() }}> Start Game </button> </div> : "" }
                </div> 
            </div>
        </main>
    );

}