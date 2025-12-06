fs = require("fs");
fs.readFile("Day5.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split("\n\n");
  let freshLines = lines[0].split("\n").map((line) => {
    return line.split("-").map((num) => parseInt(num));
  });
  let ingredientIDs = lines[1].split("\n").map((line) => parseInt(line));

  let freshRanges = [];

  ingredientIDs.forEach((id) => {
    loop: for (let i = 0; i < freshLines.length; i++) {
      const range = freshLines[i];
      if (id >= range[0] && id <= range[1]) {
        freshRanges.push(range);
        break loop;
      }
    }
  });

  console.log("P1:", freshRanges.length);

  let consolidatedRanges = [];
  freshLines.sort((a, b) => a[0] - b[0]);
  freshLines.map(([lower, upper]) => {
    if (consolidatedRanges.length === 0) {
      consolidatedRanges.push([lower, upper]);
      return;
    }
    // array of indexes for ranges that overlap with the lower val
    let overlappingRanges = [];
    let upperFound = false;
    loop: for (let i = 0; i < consolidatedRanges.length; i++) {
      // if we're on the last range that's been pushed
      if (
        i === consolidatedRanges.length - 1 &&
        // and the new range is higher than the current highest range
        lower > consolidatedRanges[i][1] &&
        upper > consolidatedRanges[i][1]
      ) {
        // push the new range in
        consolidatedRanges.push([lower, upper]);
        upperFound = true;
        break loop;
      }

      const rangeToCompare = consolidatedRanges[i];
      const lowerBetween =
        lower >= rangeToCompare[0] && lower <= rangeToCompare[1];
      const upperBetween =
        upper >= rangeToCompare[0] && upper <= rangeToCompare[1];
      upperFound = upperBetween;

      // if the lower or upper ranges fall within the consolidated range
      if (upperBetween && lowerBetween) {
        // do nothing, the range is already covered. Just break out of the loop
        break loop;
      }

      // lower is less than the current range, but upper is within
      if (lower < rangeToCompare[0] && upperBetween) {
        if (overlappingRanges.length) {
          const desiredStartingIndex = overlappingRanges[0];
          // we need to join the two together
          consolidatedRanges[desiredStartingIndex] = [
            consolidatedRanges[desiredStartingIndex][0],
            rangeToCompare[1],
          ];
          // then remove the range we just merged
          consolidatedRanges.splice(
            desiredStartingIndex + 1,
            overlappingRanges.length
          );
        } else {
          // the lower wasn't within a range, so just set the lower to this new lower
          consolidatedRanges[i][0] = lower;
        }
        break loop;
      }

      // lower is within, upper is greater than current
      if (
        (lower <= rangeToCompare[0] || lowerBetween) &&
        upper > rangeToCompare[1]
      ) {
        overlappingRanges.push(i);
        if (lower <= rangeToCompare[0]) {
          consolidatedRanges[i][0] = lower;
        }
      }
    }

    if (!upperFound) {
      consolidatedRanges.push([lower, upper]);
      // see if there was a lower range we needed to merge with
      if (overlappingRanges.length) {
        const desiredStartingIndex = overlappingRanges[0];
        // we need to join the two together
        consolidatedRanges[desiredStartingIndex] = [
          consolidatedRanges[desiredStartingIndex][0],
          upper,
        ];
        // then remove the range we just merged
        consolidatedRanges.splice(
          desiredStartingIndex + 1,
          overlappingRanges.length
        );
      }
    }
  });

  // now, to math!
  let freshIds = 0;
  consolidatedRanges.forEach((range) => {
    freshIds += range[1] - range[0] + 1;
  });
  console.log("P2:", freshIds);
});
