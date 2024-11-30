import styles from "../page.module.css";
import {
    Component,
    Button,
    useState,
    useEffect
} from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function Lobby() {

    const navigate = useNavigate();
    const location = useLocation();
    const { roomCode, isHost, initialPlayers } = location.state || {};

    const [playerList, setPlayerList] = useState(
        initialPlayers
    );

    useEffect(() => {
        // Set up the interval to run every minute (60000 milliseconds)
        const intervalId = setInterval(refreshLobby, 1000);
    
        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    async function refreshLobby() {
        const url = new URL('http://localhost:8080/lobby');
        url.searchParams.append('roomcode', roomCode);

        const res = await fetch(url, {
            method: 'GET',
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
        console.log("REFRESHED LOBBY DATA")
        console.log(data);
        setPlayerList(data.players);

    }

    function getPlayerScrotom(playerName) {
        return(
            <tr>
                <td> {playerName} </td>
            </tr>
        );

    }

    return (
        <main className={styles.main}>
            <div className={styles.row}> <p className={styles.title}>
                <a onClick={() => { navigate("/") }}> SpyGoon </a></p> 
            </div>

            <div className={styles.row}> 
                <h3 style={{ paddingRight: '5px', display: 'inline' }}> Lobby code: </h3> 
                <h2 style={{ fontWeight: 'bold', display: 'inline' }}> {roomCode} </h2>
            </div>

            <div className={styles.row}> <h2> Lobby Wieners </h2></div>

            <table className={styles.row} style={{ width: '25%', margin: '0% auto' }}>
                {playerList.map(player => getPlayerScrotom(player))}
            </table>

            { isHost ? <div className={styles.row}> <button onClick={() => { navigate("/game") }}> Start Game </button> </div> : "" }
        </main>
    );

}