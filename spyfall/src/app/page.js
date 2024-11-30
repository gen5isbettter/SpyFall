'use client';
import {Route, Routes} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './globals.css';
import styles from './page.module.css';
import Home from './pages/home.js'
import Lobby from './pages/lobby.js'
import Game from './pages/game.js'

export default function BigFloppyWeiner() {
  return (
    <main className={styles.root}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </main>
  );
}