import fs from 'fs';
console.log('start...');

interface Rates {
  gamma: number;
  epsilon: number;
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
  let bitsClone = [...bits];
  let oxygenBitString = '';
  let co2BitString = '';

  for (let i = 0; i < bits.length; i++) {
    // get most common bit in column i for all bit strings
    const bitCountsByColumn = getBitCountsByColumn(bitsClone);
    const mostCommonBit = getMaxBitStringForOxygenRating(bitCountsByColumn[i]);

    if (bitsClone.filter((b) => b !== null).length == 1) {
      //console.log('Only one bit string left for oxygen, returning');
      oxygenBitString += bitsClone.filter((b) => b !== null)[0];
      break;
    }

    // loop through remaining bitstring and see what column i character is
    // if it doesn't match the most common bit
    for (let j = 0; j < bits.length; j++) {
      if (bitsClone[j]?.[i] !== mostCommonBit) {
        bitsClone[j] = null;
      }
    }
  }

  bitsClone = [...bits];

  for (let i = 0; i < bits.length; i++) {
    // get least common bit in column i for all bit strings
    const bitCountsByColumn = getBitCountsByColumn(bitsClone);
    const leastCommonBit = getMinBitStringForCO2Rating(bitCountsByColumn[i]);

    if (bitsClone.filter((b) => b !== null).length == 1) {
      //console.log('Only one bit string left for co2, returning');
      co2BitString += bitsClone.filter((b) => b !== null)[0];
      break;
    }
    for (let j = 0; j < bits.length; j++) {
      if (bitsClone[j]?.[i] !== leastCommonBit) {
        bitsClone[j] = null;
      }
    }
  }

  const oxygenBitRating = parseInt(oxygenBitString, 2);
  const co2BitRating = parseInt(co2BitString, 2);
  console.log('Answer two: ', oxygenBitRating * co2BitRating);
});
