import fs from 'fs';
console.log('start...');

interface BingoSetup {
  numbers: Array<number>;
  boards: Array<Array<Array<number>>>;
}

const setupGame = function (inputLines: Array<string>): BingoSetup {
  let numbers: Array<number> = [];
  let board: Array<Array<number>> = [];
  const boards: Array<Array<Array<number>>> = [];
  for (let i = 0; i < inputLines.length; i++) {
    if (i == 0) numbers = inputLines[i].split(',').map(Number);

    if (inputLines[i] == '\r') {
      // blank line, next 5 lines are a new board
      if (i + 5 < inputLines.length) {
        board = inputLines
          .slice(i + 1, i + 6)
          .map((s) => s.replace('\r', '').split(/[ ,]+/).map(Number));
        boards.push(board);
      }
    }
  }

  return {
    numbers,
    boards,
  };
};

// Part one
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  //console.log(data);
  const lines = data.split('\n');
  const setup = setupGame(lines);
  console.log(setup);
});
