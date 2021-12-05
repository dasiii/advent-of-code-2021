import fs from 'fs';
console.log('start...');

// Part one
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // console.log(
  //   data.split('\n').map((i) =>
  //     i
  //       .replace('\r', '')
  //       .split('->')
  //       .map((i) => i.trim().split(','))
  //   )
  // );
  const test = data.split('\n').map((i) =>
    i
      .replace('\r', '')
      .split('->')
      .map((i) => i.trim().split(','))
  );
  console.log(test);
});
