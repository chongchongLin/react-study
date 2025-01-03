import Square from "./Square";

// 首先定义一个接口
interface PlayMoveProps {
    nextSquares: Array<string | null>;
    row: number;
    col: number;
}

export default function Board({xIsNext, squares, onPlay}:{xIsNext:boolean,squares:Array<string | null>,onPlay: (props: PlayMoveProps) => void}) {
    const result = calculateWinner(squares);
    let status;
    
    if (result.winner === 'draw') {
        status = "Game is a draw!";
    } else if (result.winner) {
        status = "Winner: " + result.winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    function getCoordinates(index: number): [number, number] {
        const row = Math.floor(index / 3);
        const col = index % 3;
        return [row, col];
    }
    function handleClick(i: number) {
        if(squares[i] || result.winner) {
            return;
        }
        const [row,col] = getCoordinates(i);
        console.log(row,col);
        const nextSquares = squares.slice();
        if(xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
       onPlay({nextSquares,row,col});
    }
    function calculateWinner(squares: Array<string | null>) {
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
                return {
                    winner: squares[a],
                    line: lines[i]
                };
            }
        }
        const isDraw = squares.every(square => square !== null);
        return {
            winner: isDraw ? 'draw' : null,
            line: []
        };
    }
    const boardRowContainer = [0,1,2].map((item,index)=>{
        return (
            <div className="board-row" key={index}>
                {[0,1,2].map((childItem,childIndex)=>{
                    const targetIndex = item * 3 + childIndex;
                    const isWinningSquare = result.line.includes(targetIndex);
                    return (
                        <Square 
                            key={childIndex} 
                            value={squares[targetIndex]} 
                            onSquareClick={() => handleClick(targetIndex)}
                            isWinning={isWinningSquare}
                        />
                    );
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
