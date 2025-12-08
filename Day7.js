fs = require("fs");
if (require.main === module) {
  fs.readFile("Day7.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    let lines = data.split("\n").map((line) => line.split(""));
    const beamSplits = getBeamSplitCount(lines);

    console.log("P1:", beamSplits);

    console.log(
      "P2:",
      getNumTimelines({
        lines,
        currCount: 0,
        currCol: Math.floor(lines[0].length / 2),
        currRow: 0,
      })
    );
  });
}

function getBeamSplitCount(lines) {
  let rowsLength = lines.length - 1;
  let center = Math.floor(lines[0].length / 2);
  let beamSplits = 0;
  let beams = {};
  beams[`${center}`] = true;

  let currRow = 2;
  while (currRow <= rowsLength) {
    let line = lines[currRow];

    const currSplits = [];
    const beamsToTurnOn = [];
    line.forEach((char, ind) => {
      if (char === "^") {
        currSplits.push(ind);
      }
    });

    // look to the left and right of each splitting point
    currSplits.forEach((splitPoint) => {
      let left = splitPoint - 1;
      let right = splitPoint + 1;

      // if the spots either to the left or right of the split point are '.',
      // we have a split
      if (beams[splitPoint]) {
        beamSplits++;
        beamsToTurnOn.push(...[left, right]);
        // turn off the beam at the split point
        beams[splitPoint] = false;
      }
    });

    // now turn on all the beams that were split
    beamsToTurnOn.forEach((beam) => {
      beams[beam] = true;
    });
    currRow += 2;
  }
  return beamSplits;
}

// memoize getNumTimelines
let memoCache = {};

function getNumTimelines({ lines, currCol, currRow }) {
  // return the memoized value if we already have it
  if (memoCache[`${currCol},${currRow}`])
    return memoCache[`${currCol},${currRow}`];

  const rowCount = lines.length - 1;

  // reached the end of the timeline
  if (currRow >= rowCount) {
    return 1;
  }

  // we haven't hit a split yet
  if (lines[currRow][currCol] !== "^") {
    memoCache[`${currCol},${currRow}`] = getNumTimelines({
      lines,
      currCol,
      currRow: currRow + 2,
    });
    return memoCache[`${currCol},${currRow}`];
  }

  // if we've hit a split, increment count and branch left and right
  // left
  memoCache[`${currCol - 1},${currRow + 2}`] = getNumTimelines({
    lines,
    currCol: currCol - 1,
    currRow: currRow + 2,
  });

  // right
  memoCache[`${currCol + 1},${currRow + 2}`] = getNumTimelines({
    lines,
    currCol: currCol + 1,
    currRow: currRow + 2,
  });

  return (
    memoCache[`${currCol - 1},${currRow + 2}`] +
    memoCache[`${currCol + 1},${currRow + 2}`]
  );
}

module.exports = {
  getBeamSplitCount,
  getNumTimelines,
};
