import fs from 'fs';
console.log('start...');

interface BingoSetup {
  numbers: Array<number>;
  boards: Array<Array<Array<[number, boolean]>>>;
  firstOrLast?: Board;
}
interface WinningBoard {
  board: Array<Array<[number, boolean]>>;
  winningNumber: number;
  rank: number;
}

enum Board {
  First,
  Last,
}

const setupGame = function (inputLines: Array<string>): BingoSetup {
  let numbers: Array<number> = [];
  let board: Array<Array<[number, boolean]>> = [];
  const boards: Array<Array<Array<[number, boolean]>>> = [];
  for (let i = 0; i < inputLines.length; i++) {
    if (i == 0) numbers = inputLines[i].split(',').map(Number);

    if (inputLines[i] == '\r') {
      // blank line, next 5 lines are a new board
      if (i + 5 < inputLines.length) {
        board = inputLines.slice(i + 1, i + 6).map((s) =>
          s
            .replace('\r', '')
            .split(/[ ,]+/)
            .filter((n) => n.trim() !== '')
            .map((n) => {
              return [Number(n), false];
            })
        );
        boards.push(board);
      }
    }
  }

  return {
    numbers,
    boards,
  };
};

const getFirstWinningBoards = function (
  setup: BingoSetup
): Array<WinningBoard> {
  const winningBoards: Array<WinningBoard> = [];
  let rank = 0;
  for (const num of setup.numbers) {
    // mark cells as true for the number drawn
    for (const board of setup.boards) {
      if (!winningBoards.some((b) => b.board == board)) {
        for (const row of board) {
          for (const cell of row) {
            if (cell[0] === num) cell[1] = true;
          }
        }
      }
    }

    for (const board of setup.boards) {
      const columns: Array<Array<[number, boolean]>> = [];

      for (let r = 0; r < board.length; r++) {
        for (let x = 0; x < board[r].length; x++) {
          if (!columns[x]) columns[x] = [];
          columns[x][r] = board[r][x];
        }
      }

      // check rows
      for (const row of board) {
        if (row.filter((c) => c[1] !== true).length === 0) {
          if (!winningBoards.some((b) => b.board == board)) {
            winningBoards.push({
              board: board,
              winningNumber: num,
              rank: ++rank,
            });
            if (setup.firstOrLast == Board.First) return winningBoards;
          }
        }
      }

      // check columns
      for (const column of columns) {
        if (column.filter((c) => c[1] !== true).length === 0) {
          if (!winningBoards.some((b) => b.board == board)) {
            winningBoards.push({
              board: board,
              winningNumber: num,
              rank: ++rank,
            });
            if (setup.firstOrLast == Board.First) return winningBoards;
          }
        }
      }
    }
  }
  return winningBoards;
};

// Part one
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const setup = setupGame(data.split('\n'));
  setup.firstOrLast = Board.First;
  const firstWinningBoard = getFirstWinningBoards(setup)?.[0];
  if (!firstWinningBoard) {
    console.log('No winning boards...');
    return;
  }
  const unmarkedNumbersSum = firstWinningBoard.board
    .flat()
    .filter((i) => !i[1])
    .map((i) => i[0])
    .reduce((acc, current) => {
      return acc + current;
    }, 0);
  console.log(
    'Answer one: ',
    unmarkedNumbersSum * firstWinningBoard.winningNumber
  );
});

// Part two
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const setup = setupGame(data.split('\n'));
  const winningBoards = getFirstWinningBoards(setup);
  if (!winningBoards.length) {
    console.log('No winning boards...');
    return;
  }

  const lastWinningBoard = winningBoards.reduce((acc, current) =>
    acc.rank > current.rank ? acc : current
  );
  const unmarkedNumbersSum = lastWinningBoard.board
    .flat()
    .filter((i) => {
      return !i[1];
    })
    .map((i) => i[0])
    .reduce((acc, current) => {
      return acc + current;
    }, 0);
  console.log(
    'Answer two: ',
    unmarkedNumbersSum * lastWinningBoard.winningNumber
  );
});
