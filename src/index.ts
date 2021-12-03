import fs from 'fs';
console.log('start...');

// Part one
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const bits: Array<string> = data.split('\n');
  const bitCountsByColumn = getBitCountsByColumn(bits);
  const rates = getRates(bitCountsByColumn);
  console.log('Answer one: ', rates.epsilon * rates.gamma);
});

// Part two
fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const bits: Array<string> = data.split('\n');
  const oxygenRating = getRating(Ratings.Oxygen, bits);
  const CO2Rating = getRating(Ratings.CO2, bits);
  console.log('Answer two: ', oxygenRating * CO2Rating);
});

interface Rates {
  gamma: number;
  epsilon: number;
}

enum Ratings {
  Oxygen,
  CO2,
}

const getRates = function (bitCountsByColumn: Array<[number, number]>): Rates {
  let gammaBitString = '';
  let epsilonBitString = '';
  for (let i = 0; i < bitCountsByColumn.length; i++) {
    epsilonBitString += getMinBitString(bitCountsByColumn[i]);
    gammaBitString += getMaxBitString(bitCountsByColumn[i]);
  }
  return {
    epsilon: parseInt(epsilonBitString, 2),
    gamma: parseInt(gammaBitString, 2),
  };
};

const getMaxBitString = function (bitCounts: [number, number]): string {
  return bitCounts.indexOf(Math.max(...bitCounts)).toString(); // could be an error here if there are any with equal bit counts.
};

const getMinBitString = function (bitCounts: [number, number]): string {
  return bitCounts.indexOf(Math.min(...bitCounts)).toString();
};

const getMaxBitStringForOxygenRating = function (
  bitCounts: [number, number]
): string {
  if (bitCounts?.[0] === bitCounts?.[1]) return '1';
  return getMaxBitString(bitCounts);
};

const getMinBitStringForCO2Rating = function (
  bitCounts: [number, number]
): string {
  if (bitCounts[0] === bitCounts[1]) return '0';
  return getMinBitString(bitCounts);
};

const getBitCountsByColumn = function (
  bitStrings: Array<string>
): Array<[number, number]> {
  return bitStrings.reduce((acc: Array<[number, number]>, current: string) => {
    if (current == null) return acc;
    for (const [i, bit] of [...current].entries()) {
      if (!acc[i]) acc[i] = [0, 0];
      if (bit === '0') acc[i][0]++;
      else if (bit === '1') acc[i][1]++;
    }
    return acc;
  }, []);
};

const getRating = function (ratingType: Ratings, bits: Array<string>): number {
  const bitsClone = [...bits];
  let bitString = '0';

  for (let i = 0; i < bits.length; i++) {
    const bitCountsByColumn = getBitCountsByColumn(bitsClone);
    const matchBit =
      ratingType == Ratings.Oxygen
        ? getMaxBitStringForOxygenRating(bitCountsByColumn[i])
        : getMinBitStringForCO2Rating(bitCountsByColumn[i]);

    if (bitsClone.filter((b) => b !== null).length == 1) {
      bitString = bitsClone.filter((b) => b !== null)[0];
      break;
    }

    for (let j = 0; j < bits.length; j++) {
      if (bitsClone[j]?.[i] !== matchBit) {
        bitsClone[j] = null;
      }
    }
  }

  return parseInt(bitString, 2);
};
