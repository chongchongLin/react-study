import { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;
    function handlePlay(nextSquares: Array<string | null>) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
      }
      function jumpTo(nextMove:number) {
        setCurrentMove(nextMove);
      }
    
      const moves = history.map((squares, move) => {
        let description;
        if(move === currentMove) {
            description = 'You are at move #' + move;
        } else if (move > 0) {
          description = 'Go to move #' + move;
        } else {
          description = 'Go to game start';
        }
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
          </li>
        );
      });
      const [sortOrder,setSortOrder] = useState('asc');
      const sortedMoves = sortOrder === 'asc' ? moves : moves.reverse();
    return (
      <div className="game">
        <div className="game-board">
          <Board  xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>
        <div className="game-info">
            <button className={sortOrder === 'asc' ? 'sort-button-active' : ''} onClick={()=>setSortOrder('asc')}>升序</button>
            <button className={sortOrder === 'desc' ? 'sort-button-active' : ''} onClick={()=>setSortOrder('desc')}>降序</button>
          <ol>{sortedMoves}</ol>
        </div>
      </div>
    );
  }