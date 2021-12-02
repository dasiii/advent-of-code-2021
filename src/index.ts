import fs from 'fs';
console.log('starting...');

// Part one
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const input = data.toString().split('\n').map(Number);
  const largerMeasurements = input.reduce((sum, current, i) => {
    if (i == 0) return sum;
    return input[i - 1] < current ? ++sum : sum;
  }, 0);
  console.log('Part one: ', largerMeasurements);
});

// Part two
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const input = data.toString().split('\n').map(Number);
  const largerMeasurements = input.reduce((sum, current, i) => {
    if (i < 2 || i == input.length - 1) return sum;
    const sum1 = input[i - 2] + input[i - 1] + current;
    const sum2 = input[i - 1] + current + input[i + 1];
    return sum1 < sum2 ? ++sum : sum;
  }, 0);
  console.log('Part two: ', largerMeasurements);
});
