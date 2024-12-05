import Square from "./Square";

export default function Board({xIsNext, squares, onPlay}:{xIsNext:boolean,squares:Array<string | null>,onPlay:(nextSquares:Array<string | null>)=>void}) {
    const winner = calculateWinner(squares);
    let status;
    if(winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    function handleClick(i: number) {
        if(squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if(xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
       onPlay(nextSquares);
    }
    function calculateWinner(squares:Array<string | null>) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }
    const boardRowContainer = [0,1,2].map((item,index)=>{
        return (
            <div className="board-row" key={index}>
                {[0,1,2].map((childItem,childIndex)=>{
                    const targetIndex = item * 3 + childIndex;
                    return <Square key={childIndex} value={squares[targetIndex]} onSquareClick={() => handleClick(targetIndex)} />
                })}
            </div>
        )
    })
    return (
        <>
            <div className="status">{status}</div>
            {boardRowContainer}
        </>
    )
}
