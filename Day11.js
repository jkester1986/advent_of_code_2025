fs = require("fs");
fs.readFile("Day11.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  let devices = {};
  data.split("\n").map((line) => {
    let vals = line.split(" ");
    let first = vals.shift().split(":")[0];
    devices[first] = {
      attachedDevices: vals,
    };
    return {
      deviceName: first,
      // the rest of the vals
      attachedDevices: vals,
    };
  });

  console.log(devices.you);

  // const paths = getAllPaths({
  //   devices,
  //   currDevice: "you",
  //   attachments: devices.you.attachedDevices,
  // });
  // console.log("P1:", paths);

  console.log(devices.svr);
  const p2Paths = getAllPaths({
    devices,
    currDevice: "svr",
    attachments: devices.svr.attachedDevices,
  });
  console.log("P2:", p2Paths);
});

let memoCache = {};

function getAllPaths({ devices, currDevice, containsfft, containsdac }) {
  const cacheKey = `${currDevice}-${containsfft}-${containsdac}`;
  if (memoCache[cacheKey] !== undefined) {
    return memoCache[cacheKey];
  }

  if (currDevice === "out") {
    if (containsfft && containsdac) return 1;
    else return 0;
  }

  // for each attached device, get all paths from there
  return devices[currDevice].attachedDevices.reduce((acc, attachedDevice) => {
    acc += getAllPaths({
      devices,
      currDevice: attachedDevice,
      containsfft: containsfft || currDevice === "fft",
      containsdac: containsdac || currDevice === "dac",
    });
    memoCache[cacheKey] = acc;
    return acc;
  }, 0);
}
