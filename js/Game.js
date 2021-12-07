export default class Game {
	constructor() {
		this.turn = "X";
		this.lastMove = null;
		this.board = new Array(9).fill(null);
		this.mainBoard = new Array(9).fill(this.board);
		this.validMoves = new Array(9).fill(true); 
		this.winBoard = new Array(9).fill(null);
	}

	setValidLocations() {
		for (index in this.validMoves) {
			if (!this.mainBoard[index].includes(null)) {
				if (this.lastMove == index) {
					this.validMoves[index] = true;
				}
			} else {
				this.validMoves[index] = true;
			}
		}
	}

	nextTurn() {
		this.turn = this.turn === "X" ? "O" : "X";		
	}



	//Makes a move
	makeMove(i) {

		//check if board is in full/won
		if (!this.isInProgress()) {
			return;
		}

		//check if space is filled
		if (this.board[i]) {
			return;
		}

		//update valid locations
		this.setValidLocations();

		//check if move is allowed relative to opponent's last move
		if (this.validMoves[i] === false) {
			return;
		}

		this.board[i] = this.turn;

		this.turn = last.turn;

		if (!this.checkWin()) {
			this.nextTurn();
		}
	}

	//Checks if current board contains winning combination
	checkWin(boardType) {
		const winCombos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		for (const combination of winCombos) {
			const [a, b, c] = combination;
			if (boardType[a] && (boardType[a] === boardType[b] && boardType[a] === this.boardType[c])) {
				return combination;
			}
		}
		return null;
	}

	//Checks if game has been won or if game is a draw
	isInProgress(boardType) {
		return !this.checkWin(boardType) && this.board.includes(null);
	}
}