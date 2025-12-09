fs = require("fs");
fs.readFile("Day9.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split("\n").map((line) => line.split(",").map(Number));

  let greatestArea;

  while (lines.length) {
    let currLine = lines.pop();

    let localGreatestArea = { area: 0, points: null };

    lines.forEach((lineToCompare) => {
      const area = getArea(currLine, lineToCompare);
      if (area > localGreatestArea.area) {
        localGreatestArea = { area, points: [currLine, lineToCompare] };
      }
    });

    if (localGreatestArea.area > (greatestArea?.area || 0)) {
      greatestArea = localGreatestArea;
    }
  }
  console.log("P1", greatestArea.area);
});

function getArea(point1, point2) {
  const height = Math.abs(point1[0] - point2[0]) + 1;
  const width = Math.abs(point1[1] - point2[1]) + 1;

  return width * height;
}
