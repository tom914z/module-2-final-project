// Initialize the chessboard and game
const board = Chessboard('chessboard', {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: false
});

const game = new Chess();

function onDragStart(source, piece, position, orientation) {
    // Don't allow dragging if the game is over or it's the AI's turn
    if (game.game_over() || piece.search(/^b/) !== -1) {
        return false;
    }
}

function onDrop(source, target) {
    const move = game.move({
        from: source,
        to: target,
        promotion: 'q' // Always promote to a queen for simplicity
    });

    // Illegal move
    if (move === null) return 'snapback';

    updateBoard();

    // AI to move after player's move
    window.setTimeout(makeBestMove, 250);
}

function onSnapEnd() {
    board.position(game.fen());
}

function makeBestMove() {
    const bestMove = getBestMove(game);
    game.move(bestMove);
    board.position(game.fen());
    if (game.game_over()) {
        alert('Game over');
    }
}

function getBestMove(game) {
    // Simple AI logic (placeholder for now)
    const moves = game.ugly_moves();
    const randomIdx = Math.floor(Math.random() * moves.length);
    return moves[randomIdx];
}

function updateBoard() {
    board.position(game.fen());
}

// Set up event listeners
document.getElementById('resetButton').addEventListener('click', () => {
    game.reset();
    board.start();
});

// Initialize the chessboard and attach event handlers
board.start();
