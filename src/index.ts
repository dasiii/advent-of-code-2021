import fs from 'fs';
console.log('start...');

// Part one
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const points = data.split('\n').map((i) =>
    i
      .replace('\r', '')
      .split('->')
      .map((i) => i.trim().split(','))
  );

  const pointsTravelled: Array<[number, number]> = [];
  const pointCounts: {
    [key: string]: number;
  } = {};
  for (let i = 0; i < points.length; i++) {
    const point0 = points[i][0];
    const point1 = points[i][1];
    const x1 = Number(point0[0]);
    const y1 = Number(point0[1]);
    const x2 = Number(point1[0]);
    const y2 = Number(point1[1]);
    //const m = (y2 - 1) / (x2 - x1);

    // (part one) "only consider horizontal and vertical lines"
    if (x1 === x2) {
      const x = x1;
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        pointsTravelled.push([x, y]);
      }
    } else if (y1 === y2) {
      const y = y1;
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        pointsTravelled.push([x, y]);
      }
    }
  }

  for (const point of pointsTravelled) {
    const key = point[0] + '_' + point[1];
    if (pointCounts[key] == null) pointCounts[key] = 0;
    pointCounts[key]++;
  }

  let answer = 0;
  for (const p in pointCounts) {
    if (pointCounts[p] > 1) answer++;
  }
  console.log('Answer one: ', answer);
});
