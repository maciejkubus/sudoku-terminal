const sudoku = require('sudoku');

function generateSudokuMap() {
	const puzzle = sudoku.makepuzzle()
	const map = [
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
	]
	let i = 0
	for(let y = 1; y <= 9; y++) {
		for(let x = 1; x <= 9; x++) {
			map[y-1][x-1] = puzzle[i] ? puzzle[i] : ' '
			i++
		}
	}
	return map;
}

module.exports = generateSudokuMap