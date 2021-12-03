import fs from 'fs';
console.log('start...');

interface Instruction {
  direction: string;
  amount: number;
}

interface Location {
  position: number;
  depth: number;
}

interface LocationWithAim extends Location {
  aim: number;
}

const getInstructions = function (input: string): Array<Instruction> {
  return input.split('\n').map((i) => {
    return { direction: i.split(' ')[0], amount: Number(i.split(' ')[1]) };
  });
};

// Part one
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const instructions = getInstructions(data);
  const location: Location = {
    position: 0,
    depth: 0,
  };
  const finalLocation: Location = instructions.reduce(
    (acc: Location, current: Instruction) => {
      switch (current.direction) {
        case 'up':
          acc.depth -= current.amount;
          break;
        case 'down':
          acc.depth += current.amount;
          break;
        case 'forward':
          acc.position += current.amount;
          break;
      }

      return acc;
    },
    location
  );
  console.log('Answer one: ', finalLocation.depth * finalLocation.position);
});

// Part two
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const instructions = getInstructions(data);
  const location: LocationWithAim = {
    position: 0,
    depth: 0,
    aim: 0,
  };
  const finalLocation: Location = instructions.reduce(
    (acc: LocationWithAim, current: Instruction) => {
      switch (current.direction) {
        case 'up':
          acc.aim -= current.amount;
          break;
        case 'down':
          acc.aim += current.amount;
          break;
        case 'forward':
          acc.position += current.amount;
          acc.depth += acc.aim * current.amount;
          break;
      }

      return acc;
    },
    location
  );
  console.log('Answer two: ', finalLocation.depth * finalLocation.position);
});
