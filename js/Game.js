export default class Game {
	constructor() {
		this.turn = "X";
		this.board = new Array(9).fill(null);
	}

	nextTurn() {
		this.turn = this.turn === "X" ? "O" : "X";
	}

	//Makes a move
	makeMove(i) {
		if (!this.isInProgress()) {
			return;
		}

		if (this.board[i]) {
			return;
		}

		this.board[i] = this.turn;

		if (!this.checkWin()) {
			this.nextTurn();
		}
	}

	//Checks if current board contains winning combination
	checkWin() {
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

			if (this.board[a] && (this.board[a] === this.board[b] && this.board[a] === this.board[c])) {
				return combination;
			}
		}
		return null;
	}

	//Checks if game has been won or if game is a draw
	isInProgress() {
		return !this.checkWin() && this.board.includes(null);
	}
}