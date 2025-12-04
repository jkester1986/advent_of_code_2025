fs = require("fs");
fs.readFile("Day4.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split("\n");

  const removedRolls = [];
  let moreLeft = true;
  let totalRowCount = 0;

  while (moreLeft) {
    let rollCount = 0;
    lines.forEach((line, yI) => {
      const rollSlots = line.split("");
      const yStart = yI - 1;
      const yEnd = yI + 1;

      rollSlots.forEach((slot, ind) => {
        if (slot !== "@") return;
        let rollTots = 0;

        const xStart = ind - 1;
        const xEnd = ind + 1;

        for (y = yStart; y <= yEnd; y++) {
          if (y < 0 || y > lines.length - 1) continue;
          let row = "";
          for (x = xStart; x <= xEnd; x++) {
            if (x < 0 || x > lines.length - 1) continue;

            let slotToCheck = lines[y][x];
            if (slotToCheck === "@") {
              rollTots++;
            }
            row += slotToCheck;
          }
        }

        rollTots--; // minus 1 for the middle one we aren't counting

        if (rollTots < 4) {
          removedRolls.push([yI, ind]);
          rollCount++;
        }
      });
    });

    if (rollCount === 0) {
      moreLeft = false;
    } else {
      // rebuild lines with removed rolls
      removedRolls.forEach((coord) => {
        const y = coord[0];
        const x = coord[1];
        let lineArr = lines[y].split("");
        lineArr[x] = ".";
        lines[y] = lineArr.join("");
      });
      totalRowCount += rollCount;
      removedRolls.length = 0;
      rollCount = 0;
    }
  }

  console.log({ totalRowCount });
});
