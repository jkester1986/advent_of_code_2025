fs = require("fs");
fs.readFile("Day3.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split("\n");

  let sum = 0;
  lines.forEach((line) => {
    const nums = line.split("").map(Number);
    const voltage = findHighestVoltage(nums, 12);
    sum += voltage;
  });
  console.log({ sum });
});

function findHighestVoltage(arr, sizeToFind) {
  let length = arr.length;
  const numsFound = [];
  let lastPossibleIndex = length - sizeToFind + 1;
  let startingIndex = 0;

  while (numsFound.length < sizeToFind) {
    let ind = startingIndex;
    let highest = 0;
    loop: for (ind; ind < lastPossibleIndex; ind++) {
      if (arr[ind] > highest) {
        highest = arr[ind];
        startingIndex = ind + 1;
      }
      if (highest === 9) {
        break loop;
      }
    }
    lastPossibleIndex++;
    numsFound.push(highest);
  }

  return Number(numsFound.join(""));
}
