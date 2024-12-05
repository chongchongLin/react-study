interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
    isWinning?: boolean;
}

export default function Square({value, onSquareClick, isWinning}: SquareProps) {
    const className = `square ${isWinning ? 'winning' : ''}`;
    return (
        <button 
            className={className} 
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}
