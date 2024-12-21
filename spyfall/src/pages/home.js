import {
    useState
} from 'react';

import { JoinPopUp } from '../elements/joinPopUp.js';
import { HostPopUp } from '../elements/hostPopUp.js';
import styles from '../styles/page.module.css';

export default function Home() {

    const [joinIsVisible, setJoinIsVisible] = useState(false); 

    const [hostIsVisible, setHostIsVisible] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <a className={styles.title}> SpyGoon </a>
            </div>

            <div className={styles.container}>
                <div className={styles.homeContainer}>
                    <button className={styles.button} onClick={() => { setHostIsVisible(true) }}> <b> Host Game </b> </button>
                
                    <p className={styles.stink} style={{display:'inline'}}> OR </p>
                
                    <button className={styles.button} onClick={() => { setJoinIsVisible(true) }}> <b> Join Game </b> </button>
                </div>
            </div>

            {joinIsVisible && <JoinPopUp/>} 

            {hostIsVisible && <HostPopUp/>}

        </div>
    );

}

