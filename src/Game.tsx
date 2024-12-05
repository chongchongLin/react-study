import { useState } from "react";
import Board from "./Board";

// 定义历史记录的接口
interface HistoryEntry {
    squares: Array<string | null>;
    position?: {  // 可选，因为第一步没有位置信息
        row: number;
        col: number;
    }
}

export default function Game() {
  const [history, setHistory] = useState<HistoryEntry[]>([{
    squares: Array(9).fill(null)
  }]);
  const [currentMove, setCurrentMove] = useState(0);
  
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  function handlePlay({nextSquares,row,col}:{nextSquares:Array<string | null>,row:number,col:number}) {
    const nextHistory = [...history.slice(0, currentMove + 1), {
      squares: nextSquares,
      position: { row, col }
    }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }


  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((historyEntry, move) => {
    let description;
    if (move === currentMove) {
      description = `You are at move #${move}`;
    } else if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
        {historyEntry.position?.row !== undefined && historyEntry.position?.col !== undefined && (
          <span>当前位置: {historyEntry.position.row}, {historyEntry.position.col}</span>
        )}
      </li>
    );
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const sortedMoves = sortOrder === "asc" ? moves : moves.reverse();
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares.squares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button
          className={sortOrder === "asc" ? "sort-button-active" : ""}
          onClick={() => setSortOrder("asc")}
        >
          升序
        </button>
        <button
          className={sortOrder === "desc" ? "sort-button-active" : ""}
          onClick={() => setSortOrder("desc")}
        >
          降序
        </button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}
