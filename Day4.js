fs = require("fs");
fs.readFile("Day4.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split("\n");

  let rollCount = 0;

  lines.forEach((line, yI) => {
    console.log(line.length);
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
        // console.log(row);
      }

      rollTots--; // minus 1 for the middle one we aren't counting

      if (rollTots < 4) rollCount++;
    });
  });

  console.log({ rollCount });
});
