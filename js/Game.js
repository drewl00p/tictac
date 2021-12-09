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
		for (let i = 0; i < this.validMoves.length; i++) {
			if (!this.mainBoard[i].includes(null)) {
				if (this.lastMove == i) {
					this.validMoves[i] = true;
				}
			} else {
				this.validMoves[i] = true;
			}
		}
	}

	nextTurn() {
		this.turn = this.turn === "X" ? "O" : "X";		
	}



	//Makes a move
	makeMove(i) {

		//check if board is in full/won
		if (!this.isInProgress(this.board)) {
			return;
		}

		if (!this.isInProgress(this.winBoard)) {
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

		this.mainBoard[i] = this.turn;

		this.lastMove = this.turn;

		if (!this.checkWin(this.board) && !this.checkWin(this.mainBoard)) {
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
			if (boardType[a] && (boardType[a] == boardType[b] && boardType[a] == boardType[c])) {
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