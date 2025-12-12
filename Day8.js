fs = require("fs");
fs.readFile("Day8.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let lines = data.split("\n").map((line) => line.split(",").map(Number));

  let lineConnections = {};

  lines.forEach((line, i) => {
    let currLine = line;

    lines.forEach((lineToCompare, ind) => {
      if (i === ind) return; // skip self
      const distance = getDistance(currLine, lineToCompare);
      lineConnections[distance] = [
        [currLine[0], currLine[1], currLine[2]],
        lineToCompare,
      ];
    });
  });

  let shortestConnections = Object.keys(lineConnections)
    .map((key) => ({
      distance: Number(key),
      connections: lineConnections[key],
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 1000);

  // console.log("shortestConnections:", shortestConnections);

  const circuits = [];

  shortestConnections.forEach(({ connections }) => {
    const [point1, point2] = connections;
    const stringP1 = point1.join(",");
    const stringP2 = point2.join(",");
    // console.log("\n", { stringP1, stringP2, circuits });

    const addToCircuits = [];
    loop: for (let i = 0; i < circuits.length; i++) {
      const circuit = circuits[i];
      // console.log({ circuit });
      if (circuit.includes(stringP1)) {
        addToCircuits.push({ circuitIndex: i, point: stringP2 });
      }
      if (circuit.includes(stringP2)) {
        addToCircuits.push({ circuitIndex: i, point: stringP1 });
      }
      if (addToCircuits.length === 2) break;
    }

    // console.log({ addToCircuits });

    if (addToCircuits.length === 0) {
      // start a new circuit
      circuits.push([stringP1, stringP2]);
    } else if (addToCircuits.length === 1) {
      const p1 = addToCircuits[0];
      if (!circuits[p1.circuitIndex].includes(p1.point))
        circuits[p1.circuitIndex].push(p1.point);
    } else {
      if (addToCircuits[0].circuitIndex === addToCircuits[1].circuitIndex) {
        // both points are already in the same circuit, do nothing
        return;
      }
      const p1 = addToCircuits[0];
      const p2 = addToCircuits[1];
      // connect them together
      const combinedCircuit = [
        ...circuits[p1.circuitIndex],
        ...circuits[p2.circuitIndex],
      ];
      circuits[p1.circuitIndex] = combinedCircuit;
      circuits[p2.circuitIndex] = [];
    }
  });

  circuits.sort((a, b) => b.length - a.length);
  // console.log({ circuits });
  console.log(
    "P1:",
    circuits[0].length * circuits[1].length * circuits[2].length
  );
});

function getDistance(point1, point2) {
  return Math.sqrt(
    Math.pow(point2[0] - point1[0], 2) +
      Math.pow(point2[1] - point1[1], 2) +
      Math.pow(point2[2] - point1[2], 2)
  );
}
