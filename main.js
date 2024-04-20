const readline = require('readline')
const generateSudokuMap = require('./generate-sudoku')

const originalMap = generateSudokuMap()

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const points = []
const cursor = {
	x: 0,
	y: 0,
	blink: true,
}

const draw = () => {
	for(let i = 0; i < 9; i++) {
		let line = ""
		if(i == 0) console.log(" +---+---+---+  +---+---+---+  +---+---+---+")
		for(let j = 0; j < 9; j++) {
			const point = points.find(p => p.x == j && p.y == i)
			if(j == 0) line += " | "
			if(j == 3 || j == 6) line += " | "
			if(cursor.x == j && cursor.y == i && cursor.blink) {
				line += '_'
			}
			else if(point) {
				line += point.value
			}
			else {
				line += originalMap[i][j]
			}
			line += " | "
		}
		console.log(line)
		console.log(" +---+---+---+  +---+---+---+  +---+---+---+")
		if(i == 2 || i == 5) {
			console.log('')
			console.log(" +---+---+---+  +---+---+---+  +---+---+---+")
		}
	}
}

const getPoint = (x, y) => {
	const point = points.find(p => p.x == x && p.y == y)
	return point ? point : { x: x, y: y, value: originalMap[y][x]}
}

const checkRow = (row) => {
	const unique = []
	for(let i = 0; i < 9; i++) {
		const point = getPoint(i, row)
		if(!unique.includes(point.value) && point.value != ' ') {
			unique.push(point.value)
		}
	}
	return unique.length
}

const checkCol = (col) => {
	const unique = []
	for(let i = 0; i < 9; i++) {
		const point = getPoint(col, i)
		if(!unique.includes(point.value) && point.value != ' ') {
			unique.push(point.value)
		}
	}
	return unique.length
}

const checkSquare = (startX, startY) => {
	const unique = []
	for(let x = startX; x < startX + 3; x++) {
		for(let y = startY; y < startY + 3; y++) {
			const point = getPoint(x, y)
			if(!unique.includes(point.value) && point.value != ' ') {
				unique.push(point.value)
			}
		}
	}
	return unique.length
}

const check = () => {
	let score = 0
	for(let i = 0; i < 9; i++) {
		score += checkRow(i)
	}
	for(let i = 0; i < 9; i++) {
		score += checkCol(i)
	}
	score += checkSquare(0, 0);
	score += checkSquare(0, 3);
	score += checkSquare(0, 6);
	score += checkSquare(3, 0);
	score += checkSquare(3, 3);
	score += checkSquare(3, 6);
	score += checkSquare(6, 0);
	score += checkSquare(6, 3);
	score += checkSquare(6, 6);
	
	console.log('Score: ' + score)
	if(score >= 243) {
		console.log('You won')
		process.exit();
	}
}

const update = () => {
	console.clear()
	cursor.blink = !cursor.blink
	draw();
	check();
}

const set = (value) => {
	const point = points.find(p => p.x == cursor.x && p.y == cursor.y)
	if(point) {
		point.value = value
	}
	else {
		points.push({
			x: cursor.x,
			y: cursor.y,
			value: value
		})
	}
}

const main = () => {
	readline.emitKeypressEvents(process.stdin);

	if (process.stdin.isTTY)
			process.stdin.setRawMode(true);

	process.stdin.on('keypress', (chunk, key) => {
		if(key.name == 'q') {
			process.exit()
		}
		if(key.name == 'right' && cursor.x < 8) {
			cursor.x++
		}
		if(key.name == 'left' && cursor.x > 0) {
			cursor.x--
		}
		if(key.name == 'up' && cursor.y > 0) {
			cursor.y--
		}
		if(key.name == 'down' && cursor.y < 8) {
			cursor.y++
		}
		if(numbers.includes(key.name)) {
			set(key.name)
		}
		
	});
	setInterval(update, 100)
}

main()