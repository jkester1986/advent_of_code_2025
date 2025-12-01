fs = require("fs");
fs.readFile("Day1.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split("\n");
  let dialVal = 50;

  let zeroed = 0;
  let extraZeros = 0;

  lines.forEach((line) => {
    let parts = line.match(/(.)(\d+)/);
    let direction = parts[1];
    let value = parseInt(parts[2]);
    const oldVal = dialVal;

    switch (direction) {
      case "L":
        dialVal = (dialVal - value) % 100;
        console.log(
          oldVal,
          dialVal,
          line,
          "difference:",
          Math.floor(dialVal - value),
          "divided:",
          Math.floor(Math.abs((dialVal - value) / 100))
        );
        extraZeros += Math.floor(Math.abs((dialVal - value) / 100));
        // since ^ doesn't account for less than 100 jump, add one more if we crossed zero the first time.
        // i.e. 1-1, 1-5, etc
        if (dialVal - value <= 0) extraZeros++;
        break;
      case "R":
        dialVal = (dialVal + value) % 100;
        console.log(
          oldVal,
          dialVal,
          line,
          "difference:",
          Math.floor(dialVal + value),
          "divided:",
          Math.floor((dialVal + value) / 100)
        );
        extraZeros += Math.floor((dialVal + value) / 100);
        break;
    }

    if (dialVal === 0) {
      zeroed += 1;
    }
  });

  // extraZeros *should* include all the zeros, so need the difference
  console.log({ zeroed, extraZeros, total: extraZeros - zeroed });
});
