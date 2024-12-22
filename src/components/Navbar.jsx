import React from 'react';
import './Navbar.css';

function Navbar({ currentPlayer, timer, playerMoves }) {
    return (
        <nav className="navbar">
            <div className="nav-item">
                <strong>Player {currentPlayer}'s turn</strong>
            </div>
            <div className="nav-item">
                <strong>Timer: {timer} seconds</strong>
            </div>
            <div className="nav-item">
                <strong>Moves: Player 1: {playerMoves[0]}, Player 2: {playerMoves[1]}</strong>
            </div>
        </nav>
    );
}

export default Navbar;
