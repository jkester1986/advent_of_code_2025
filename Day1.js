fs = require("fs");
if (require.main === module) {
  fs.readFile("Day1.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    let lines = data.split("\n");
    let dialVal = 50;

    let landsOnZero = 0;
    let totalZeros = 0;

    lines.forEach((line, i) => {
      let parts = line.match(/(.)(\d+)/);
      let direction = parts[1];
      let value = parseInt(parts[2]);

      switch (direction) {
        case "L": {
          // bc negatives are handled weird, this is how we will get the actual dial position
          const newDialVal = (dialVal - (value % 100) + 100) % 100;

          totalZeros += passZeroXTimes({
            start: dialVal,
            direction: "L",
            change: value,
          });
          dialVal = newDialVal;
          break;
        }
        case "R": {
          const newDialVal = (dialVal + value) % 100;
          totalZeros += passZeroXTimes({
            start: dialVal,
            direction: "R",
            change: value,
          });
          dialVal = newDialVal;
          break;
        }
      }

      if (dialVal === 0) {
        landsOnZero += 1;
      }
    });

    console.log("P1:", landsOnZero);
    console.log("P2:", totalZeros);
  });
}

function passZeroXTimes({ start, direction, change }) {
  let remainingChange = change;
  let zerosPassed = 0;

  while (remainingChange >= 100) {
    zerosPassed++;
    remainingChange -= 100;
  }

  switch (direction) {
    case "L": {
      if (start !== 0 && start - remainingChange <= 0) zerosPassed++;
      break;
    }
    case "R": {
      if (start + remainingChange >= 100) zerosPassed++;
      break;
    }
  }

  return zerosPassed;
}

module.exports = {
  passZeroXTimes,
};
