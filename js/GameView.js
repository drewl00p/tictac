export default class GameView {
	constructor(root) {
		this.root = root;
		this.root.innerHTML = `
			<div class="header">
				<div class="header__turn">
				</div>
				<div class="header__status">
				</div>
				<button type ="button" class="header__restart">
					<i class="material-icons">refresh</i>
				</button>
			</div>
			<div class="mainboard">
				<div class="board" data-index="0">
					<div class="board__tile" data-index="0"></div>
					<div class="board__tile" data-index="1"></div>
					<div class="board__tile" data-index="2"></div>
					<div class="board__tile" data-index="3"></div>
					<div class="board__tile" data-index="4"></div>
					<div class="board__tile" data-index="5"></div>
					<div class="board__tile" data-index="6"></div>
					<div class="board__tile" data-index="7"></div>
					<div class="board__tile" data-index="8"></div>
				</div>
				<div class="board" data-index="1">
					<div class="board__tile" data-index="0"></div>
					<div class="board__tile" data-index="1"></div>
					<div class="board__tile" data-index="2"></div>
					<div class="board__tile" data-index="3"></div>
					<div class="board__tile" data-index="4"></div>
					<div class="board__tile" data-index="5"></div>
					<div class="board__tile" data-index="6"></div>
					<div class="board__tile" data-index="7"></div>
					<div class="board__tile" data-index="8"></div>
				</div>
				<div class="board" data-index="2">
					<div class="board__tile" data-index="0"></div>
					<div class="board__tile" data-index="1"></div>
					<div class="board__tile" data-index="2"></div>
					<div class="board__tile" data-index="3"></div>
					<div class="board__tile" data-index="4"></div>
					<div class="board__tile" data-index="5"></div>
					<div class="board__tile" data-index="6"></div>
					<div class="board__tile" data-index="7"></div>
					<div class="board__tile" data-index="8"></div>
				</div>
				<div class="board" data-index="3">
					<div class="board__tile" data-index="0"></div>
					<div class="board__tile" data-index="1"></div>
					<div class="board__tile" data-index="2"></div>
					<div class="board__tile" data-index="3"></div>
					<div class="board__tile" data-index="4"></div>
					<div class="board__tile" data-index="5"></div>
					<div class="board__tile" data-index="6"></div>
					<div class="board__tile" data-index="7"></div>
					<div class="board__tile" data-index="8"></div>
				</div>
				<div class="board" data-index="4">
					<div class="board__tile" data-index="0"></div>
					<div class="board__tile" data-index="1"></div>
					<div class="board__tile" data-index="2"></div>
					<div class="board__tile" data-index="3"></div>
					<div class="board__tile" data-index="4"></div>
					<div class="board__tile" data-index="5"></div>
					<div class="board__tile" data-index="6"></div>
					<div class="board__tile" data-index="7"></div>
					<div class="board__tile" data-index="8"></div>
				</div>
				<div class="board" data-index="5">
					<div class="board__tile" data-index="0"></div>
					<div class="board__tile" data-index="1"></div>
					<div class="board__tile" data-index="2"></div>
					<div class="board__tile" data-index="3"></div>
					<div class="board__tile" data-index="4"></div>
					<div class="board__tile" data-index="5"></div>
					<div class="board__tile" data-index="6"></div>
					<div class="board__tile" data-index="7"></div>
					<div class="board__tile" data-index="8"></div>
				</div>
				<div class="board" data-index="6">
					<div class="board__tile" data-index="0"></div>
					<div class="board__tile" data-index="1"></div>
					<div class="board__tile" data-index="2"></div>
					<div class="board__tile" data-index="3"></div>
					<div class="board__tile" data-index="4"></div>
					<div class="board__tile" data-index="5"></div>
					<div class="board__tile" data-index="6"></div>
					<div class="board__tile" data-index="7"></div>
					<div class="board__tile" data-index="8"></div>
				</div>
				<div class="board" data-index="7">
					<div class="board__tile" data-index="0"></div>
					<div class="board__tile" data-index="1"></div>
					<div class="board__tile" data-index="2"></div>
					<div class="board__tile" data-index="3"></div>
					<div class="board__tile" data-index="4"></div>
					<div class="board__tile" data-index="5"></div>
					<div class="board__tile" data-index="6"></div>
					<div class="board__tile" data-index="7"></div>
					<div class="board__tile" data-index="8"></div>
				</div>
				<div class="board" data-index="8">
					<div class="board__tile" data-index="0"></div>
					<div class="board__tile" data-index="1"></div>
					<div class="board__tile" data-index="2"></div>
					<div class="board__tile" data-index="3"></div>
					<div class="board__tile" data-index="4"></div>
					<div class="board__tile" data-index="5"></div>
					<div class="board__tile" data-index="6"></div>
					<div class="board__tile" data-index="7"></div>
					<div class="board__tile" data-index="8"></div>
				</div>	
			</div>
		`;

		this.onTileClick = undefined;
		this.onRestartClick = undefined;

		this.root.querySelectorAll(".board__tile").forEach(tile => {
			tile.addEventListener("click", () => {
				this.onTileClick(tile.dataset.index);
			});
		});
		this.root.querySelector(".header__restart").addEventListener("click", () => {
			if (this.onRestartClick) {
				this.onRestartClick();
			}
		});
	} 

	update(game) {
		this.updateTurn(game);
		this.updateStatus(game);
		this.updateBoard(game);
		
	}

	updateTurn(game) {
		this.root.querySelector(".header__turn").textContent = `${game.turn}'s turn`;
	}

	updateStatus(game) {
		let status = "In Progress";

		if (game.checkWin(game.winBoard)) {
			status = `${game.turn} is the winner`;	
		} else if (!game.isInProgress(game.winBoard)) {
			status = "It's a tie!";
		}

		this.root.querySelector(".header__status").textContent = status;
	}

	updateBoard(game) {
		const winBoardCombos = game.checkWin(game.winBoard);
		const winGameCombos = game.checkWin(game.winBoard);

		for (let i = 0; i < game.winBoard.length; i++) {
			const tileGame = this.root.querySelector(`.board__tile[data-index="${i}"]`);
			
			tileGame.classList.remove("board__tile--winner");
			tileGame.textContent = game.winBoard[i];

			if (winGameCombos && winGameCombos.includes(i)) {
				tileGame.classList.add("board__tile--winner");
			}
			
			for (let j = 0; j < game.winBoard.length; j++) {
				const tileBoard = this.root.querySelector(`.board[data-index="${i}"]`);
				const tile = tileBoard.querySelector(`.board__tile[data-index="${j}"]`);

				tile.classList.remove("board__tile--winner");
				tileBoard.textContent = game.mainBoard[i][j];

				if (winBoardCombos && winBoardCombos.includes(i)) {
					tileBoard.classList.add("board__tile--winner");
				}
			
			
			
			}

		}
	}
}