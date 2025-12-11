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
    .slice(0, 10);

  console.log("shortestConnections:", shortestConnections);

  const circuits = [];
  const visited = {};

  // // go through the connections and find the circuits and their lengths
  // shortestConnections.forEach(({ distance, connections }) => {
  //   console.log("circuits", circuits);
  //   const [point1, point2] = connections;

  //   // see if the current point is already connected to something else
  //   const alreadyConnected = visited[`${point1[0]},${point1[1]},${point1[2]}`];
  //   // see if the point it's connected to is already visited
  //   const connnectionAlreadyVisited =
  //     visited[`${point2[0]},${point2[1]},${point2[2]}`];

  //   if (!alreadyConnected && !connnectionAlreadyVisited) {
  //     console.log("start a new circuit for", point1);
  //     // start a new circuit
  //     circuits.push([point1, point2]);

  //     // add both points to the visited list
  //     visited[`${point1[0]},${point1[1]},${point1[2]}`] = {
  //       circuit: circuits.length - 1,
  //     };
  //     visited[`${point2[0]},${point2[1]},${point2[2]}`] = {
  //       circuit: circuits.length - 1,
  //     };
  //   }
  //   // else it's got a circuit connection already
  //   else {
  //     // it isn't connected yet, so connect it to the existing circuit
  //     if (!alreadyConnected) {
  //       console.log("adding this to existing circuit:", point1);
  //       const circuitIndex = connnectionAlreadyVisited.circuit;
  //       circuits[circuitIndex].push(point1);
  //       visited[`${point1[0]},${point1[1]},${point1[2]}`] = {
  //         circuit: circuitIndex,
  //       };
  //     }
  //     // it's already connected, let's get the new point it's connected to added to its circuit
  //     else {
  //       // check first to see if the new point has its own connection.

  //       // If not, we can add the new point directly.
  //       if (!connnectionAlreadyVisited) {
  //         console.log(
  //           "adding connected to something, which doesn't yet have a connection:",
  //           point1
  //         );
  //         const circuitIndex = alreadyConnected.circuit;
  //         circuits[circuitIndex].push(point1);
  //         visited[`${point1[0]},${point1[1]},${point1[2]}`] = {
  //           circuit: circuitIndex,
  //         };
  //       }
  //       // If so, we need to merge the circulits, and update all the visited points with the new circuit index
  //       else {
  //         console.log(
  //           "both this point and it's connection already have other connections",
  //           point1
  //         );
  //         const circuitIndex1 = alreadyConnected.circuit;
  //         const circuitIndex2 = connnectionAlreadyVisited.circuit;

  //         // merge circuit2 into circuit1
  //         circuits[circuitIndex2].forEach((pt) => {
  //           circuits[circuitIndex1].push(pt);
  //           visited[pt] = {
  //             circuit: circuitIndex1,
  //           };
  //         });
  //         // clear out circuit2
  //         circuits[circuitIndex2] = [];
  //       }
  //     }
  //   }
  // });

  shortestConnections.forEach(({ connections }) => {
    const [point1, point2] = connections;
    const stringP1 = point1.join(",");
    const stringP2 = point2.join(",");
    console.log("\n", { stringP1, stringP2, circuits });

    const addToCircuits = [];
    loop: for (let i = 0; i < circuits.length; i++) {
      const circuit = circuits[i];
      console.log({ circuit });
      if (circuit.includes(stringP1)) {
        addToCircuits.push({ circuitIndex: i, point: stringP2 });
      } else if (circuit.includes(stringP2)) {
        addToCircuits.push({ circuitIndex: i, point: stringP1 });
      }
      if (addToCircuits.length === 2) break;
    }

    console.log({ addToCircuits });

    if (addToCircuits.length === 0) {
      // start a new circuit
      circuits.push([stringP1, stringP2]);
    } else if (addToCircuits.length === 1) {
      const p1 = addToCircuits[0];
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

  console.log({ circuits });
});

function getDistance(point1, point2) {
  return Math.sqrt(
    Math.pow(point2[0] - point1[0], 2) +
      Math.pow(point2[1] - point1[1], 2) +
      Math.pow(point2[2] - point1[2], 2)
  );
}
