'use client';

import styles from './page.module.css';
import Home from './home.js'
import Host from './host.js'
import Game from './game.js'

export default function BigFloppyWeiner() {
  return (
    <main className={styles.root}>
      {/* <Home/> */}
      {/* <Host/> */}
      <Game/>
    </main>
  );
}
