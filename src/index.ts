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

// Part two
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
    } else {
      // 45 degree angle / slope of 1
      // the code in this block is so bad lol
      const xMax = Math.max(x1, x2);
      const xMin = Math.min(x1, x2);
      const yMax = Math.max(y1, y2);
      const yMin = Math.min(y1, y2);
      let xIncreasing = false;
      let yIncreasing = false;
      if (x1 == xMin) xIncreasing = true;
      if (y1 == yMin) yIncreasing = true;
      const xs = xIncreasing
        ? [...Array(Math.abs(x1 - x2) + 1).keys()].map((o) => o + xMin)
        : [...Array(Math.abs(x1 - x2) + 1).keys()]
            .map((o) => o + xMin)
            .reverse();

      const ys = yIncreasing
        ? [...Array(Math.abs(y1 - y2) + 1).keys()].map((o) => o + yMin)
        : [...Array(Math.abs(y1 - y2) + 1).keys()]
            .map((o) => o + yMin)
            .reverse();

      const pointsForLine: Array<[number, number]> = xs.map((x, i) => {
        return [x, ys[i]];
      });

      for (const point of pointsForLine) {
        pointsTravelled.push(point);
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

  console.log('Answer two: ', answer);
});
