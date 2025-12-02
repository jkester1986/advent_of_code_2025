fs = require("fs");
fs.readFile("Day2.txt", "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }
  let idRanges = data.split(",");

  let sumInvalidIds = 0;

  idRanges.forEach((range) => {
    const pattern = /^(.+)\1+$/; // P1 is just without the + on the end
    let currNum = parseInt(range.split("-")[0]);
    const end = parseInt(range.split("-")[1]);

    while (currNum <= end) {
      const match = currNum.toString().match(pattern);
      if (match) {
        sumInvalidIds += currNum;
      }

      currNum++;
    }
  });

  console.log({ sumInvalidIds });
});
