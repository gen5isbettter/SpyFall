import styles from "../styles/page.module.css";

import {
    useState,
    useEffect
} from 'react';

import { useRouter } from 'next/navigation';

import { saveState, getState } from "@/utils/routerUtils";

export default function Game() {

    const router = useRouter();

    let rc = '';
    const [roomCode, setRoomCode] = useState('');
    const [playerName, setPlayerName] = useState('');

    const [locationSet, setLocationSet] = useState([]);
    const [playerList, setPlayerList] = useState([]);
    const [isSpy, setIsSpy] = useState(false);
    const [location, setLocation] = useState('');

    useEffect(() => {
        // Set up the interval to run every minute (60000 milliseconds)
        const intervalId = setInterval(refreshLobby, 1000);
        
        if (typeof window !== "undefined") {
            rc = getState('roomCode');
            setRoomCode(rc);
            setPlayerName(getState('playerName'));
        }
    
        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);
    
    const handleClick = event => {
        if (event.target.style.textDecoration) {
            event.target.style.removeProperty('text-decoration');
        } else {
            event.target.style.setProperty('text-decoration', 'line-through');
        }
    };

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
            setLocationSet(data.payload.locationSet);
            setPlayerList(data.payload.players);
            setIsSpy(data.payload.spies.includes(playerName));
            setLocation(data.payload.location);
        } else if (data.statusCode == 420) {
            alert("Roomcode " + roomCode +" not found");
        }
        
    }

    function getMapNuts(location) {
        return(
            <tr>
                <td onClick={handleClick}> {location} </td>
            </tr>
        );
    }

    function getBallStink(location) {
        return(
            <tr>
                <td onClick={handleClick}> {location} </td>
            </tr>
        );
    }

    //Only render the divs if we have the location set. This indicates we've receieved a response from the backend and know our role (location is the last parameter receieved)
    return(
        <main className={styles.container}>
            <div className={styles.header}> 
                <a className={styles.title} onClick={() => { router.push('/') }}> SpyGoon </a> 
            </div>    

                { location == undefined ?
                    <div/>
                    :
                    <div className={styles.container}>
                        <div className={styles.gameContainer}>
                            { isSpy ?
                                <div className={styles.row}>
                                    <p className={styles.stink}> <b> Role: </b> You are the spy! </p>
                                    <div className={styles.spacer100}/>
                                </div>
                                :
                                <div className={styles.row}>
                                    <p className={styles.stink}> <b> Role: </b> Non-spy </p>
                                    <p className={styles.stink}> <b> Location: </b> { location } </p>

                                    <div className={styles.spacer50}/>

                                    <div className={styles.row}> <h2 className={styles.stink}> Player List </h2> </div>

                                    <table className={styles.table}>
                                        { playerList.map(plyr => getBallStink(plyr)) }
                                    </table>
                                </div>
                            }
                            <div className={styles.row}> <h2 className={styles.stink}> Location List </h2> </div>

                            <table className={styles.table}>
                                { locationSet.map(loc => getMapNuts(loc)) }
                            </table>
                        </div>
                    </div>
                }
        </main>
    );

}
