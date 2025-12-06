fs = require("fs");
fs.readFile("Day6.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split("\n").map((line) => line.split(/\s+/));
  let cephLines = data.split("\n").map((line) => line.split(""));
  let cephLinesLength = cephLines.length - 1;
  let cephLinesColCount = cephLines[0].length - 1;
  let length = lines.length - 1;
  let columnCount = lines[0].length;
  let total = 0;
  let cephTotal = 0;

  // for every column, find the symbol (the last line that matches the column number),
  // and then build the math expression
  for (let col = 0; col < columnCount; col++) {
    let symbol = lines[length][col];

    // now for each line, get the value at the column
    const values = [];
    for (let row = 0; row < length; row++) {
      values.push(lines[row][col]);
    }
    const expression = values.join(symbol);
    total += eval(expression);
  }
  console.log("P1:", total);

  let vals = [];
  for (let col = cephLinesColCount; col >= 0; col--) {
    // we don't know the symbol from the start here

    // now for each line, get the value in the column until we hit a space
    let currVal = "";
    loop: for (let row = 0; row <= cephLinesLength; row++) {
      const cell = cephLines[row][col];
      if (cell === " " && currVal === "") {
        currVal = "";
        continue;
      } else if (cell === " " && currVal) {
        vals.push(currVal);
        currVal = "";
        continue;
      }
      // we found the symbol AND the end of this equation
      else if (cell !== " " && cell.match(/\D/)) {
        vals.push(currVal);
        const symbol = cell;
        const expression = vals
          .reduce((acc, val) => {
            if (val) acc.push(val);
            return acc;
          }, [])
          .join(symbol);
        cephTotal += eval(expression);
        currVal = "";
        vals = [];
        continue;
      }
      currVal += cell;
    }
  }
  console.log("P2", cephTotal);
});
