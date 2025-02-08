import React, { useState, useEffect, useRef } from "react";
import Box from "./Box";
import styles from '../Styles/Box.module.css'

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [turn, setTurn] = useState("❌");
  const [state, setState] = useState('running');
  const [showRestart, setShowRestart] = useState(false);

  function handleChange(index) {
    if (board[index] !== '' || checkWinning(board)) return;
  
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
  
    if (checkWinning(newBoard)) {
        setState((turn=='❌' ? 'X' : 'O') + " Wins");
        setShowRestart(true);
     
    } else if (draw(newBoard)) {
        setState("Match Draw");
        setShowRestart(true);
    } else {
      setTurn(turn === '❌' ? 'O' : '❌'); 
    }
  }
  


  function draw(board){
    for (let i=0;i<9;i++){
        if (board[i]=='') return false;
    }
    return true;
  }
  function checkWinning(board) {
    for (let i = 0; i < 9; i += 3) {
      if (board[i] !== '' && board[i] === board[i + 1] && board[i] === board[i + 2]) return true;
    }
    for (let i = 0; i < 3; i++) {
      if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) return true;
    }
    if (board[0] !== '' && board[0] === board[4] && board[4] === board[8]) return true;
    if (board[2] !== '' && board[2] === board[4] && board[4] === board[6]) return true;
    return false;
  }

  const handleRestart = () => {
    setBoard(Array(9).fill(''));
    setState('running');
    setTurn('❌');
    setShowRestart(false);
  };


  let htmlBoard = [];
  for (let i = 0; i < 9; i++) {
    htmlBoard.push(<Box handleChange={() => handleChange(i)} value={board[i] || "\u00A0"} />);
  }

  return (
    
    <div className={styles.mainboard}>
        <h1 className={styles.heading}>Tic Tac Toe</h1>
        <div className={styles.container}>
            {htmlBoard}
        </div>
        {(state !== 'running') ? (
            <div  >
            <h1 className={styles.state}>{state}</h1>
            {showRestart && (
                <div>
                <button className={styles.restart} onClick={handleRestart}>Restart</button>
                </div>
            )}
            </div>
         ) : ""}
        
    </div>
  );
}

export default TicTacToe;
