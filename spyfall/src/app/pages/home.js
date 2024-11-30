import {
    Component,
    Button,
    useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { JoinPopUp } from '../elements/joinPopUp.js';
import { HostPopUp } from '../elements/hostPopUp.js';
import styles from '../page.module.css';

export default function Home() {

    const navigate = useNavigate();

    const [joinIsVisible, setJoinIsVisible] = useState(false); 

    const [hostIsVisible, setHostIsVisible] = useState(false);

    return (
        <div>
            <div className={styles.row}> <p className={styles.title}><a> SpyGoon </a></p> </div>

            <div className={styles.row}> <button onClick={() => { setHostIsVisible(true) }}> Host Game </button> </div>

            <div className={styles.row}> <h3> OR </h3> </div>

            <div className={styles.row}> <button onClick={() => { setJoinIsVisible(true) }}> Join Game </button> </div>

            {joinIsVisible && <JoinPopUp/>}

            {hostIsVisible && <HostPopUp/>}

        </div>
    );

}

