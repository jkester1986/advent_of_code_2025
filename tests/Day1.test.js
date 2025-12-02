const { passZeroXTimes } = require("../Day1.js");

describe("passZeroXTimes", () => {
  describe("start at 50", () => {
    it("returns 1 if starting at 50 and shifting left 120", () => {
      // start at 50, shift left 120
      const result = passZeroXTimes({
        start: 50,
        direction: "L",
        change: 120,
      });
      expect(result).toBe(1); // Passed zero once
    });

    it("returns 0 if starting at 50 and shifting left 1", () => {
      // start at 50, shift left 1
      const result2 = passZeroXTimes({
        start: 50,
        direction: "L",
        change: 1,
      });
      expect(result2).toBe(0); // Did not pass zero
    });

    it("returns 0 if starting at 50 and shifting right 1", () => {
      // start at 50, shift right 1
      const result2 = passZeroXTimes({
        start: 50,
        direction: "R",
        change: 1,
      });
      expect(result2).toBe(0); // Did not pass zero
    });

    it("returns 2 if staring at 50 and shifting left 200", () => {
      // start at 50, shift left 200
      const result3 = passZeroXTimes({
        start: 50,
        direction: "L",
        change: 200,
      });
      expect(result3).toBe(2); // Passed zero twice
    });

    it("returns 2 if starting at 50 and shifting right 200", () => {
      // start at 50, shift right 200
      const result3 = passZeroXTimes({
        start: 50,
        direction: "R",
        change: 200,
      });
      expect(result3).toBe(2); // Passed zero twice
    });

    it("returns 1 if starting at 50 and shifting left 50", () => {
      // start at 50, shift left 50
      const result3 = passZeroXTimes({
        start: 50,
        direction: "L",
        change: 50,
      });
      expect(result3).toBe(1); // Passed zero once
    });

    it("returns 3 if starting at 50 and shifting left 250", () => {
      // start at 50, shift left 250
      const result3 = passZeroXTimes({
        start: 50,
        direction: "L",
        change: 250,
      });
      expect(result3).toBe(3); // Passed zero three times
    });

    it("returns 3 if starting at 50 and shifting right 250", () => {
      // start at 50, shift right 250
      const result3 = passZeroXTimes({
        start: 50,
        direction: "R",
        change: 250,
      });
      expect(result3).toBe(3); // Passed zero three times
    });
  });

  describe("start at 0", () => {
    it("returns 1 if starting at 0 and shifting left 100", () => {
      // start at 0, shift left 100
      const result4 = passZeroXTimes({
        start: 0,
        direction: "L",
        change: 100,
      });
      expect(result4).toBe(1); // Passed zero once
    });

    it("returns 1 if starting at 0 and shifting left 101", () => {
      // start at 0, shift left 100
      const result4 = passZeroXTimes({
        start: 0,
        direction: "L",
        change: 101,
      });
      expect(result4).toBe(1); // Passed zero once
    });

    it("returns 0 if starting at 0 and shifting left 99", () => {
      // start at 0, shift left 100
      const result4 = passZeroXTimes({
        start: 0,
        direction: "L",
        change: 99,
      });
      expect(result4).toBe(0); // Passed zero once
    });

    it("returns 1 if starting at 0 and shifting right 100", () => {
      // start at 0, shift right 100
      const result6 = passZeroXTimes({
        start: 0,
        direction: "R",
        change: 100,
      });
      expect(result6).toBe(1); // Passed zero once
    });

    it("returns 0 if starting at 0 and shifting right 1", () => {
      // start at 0, shift right 1
      const result5 = passZeroXTimes({
        start: 0,
        direction: "R",
        change: 1,
      });
      expect(result5).toBe(0); // Did not pass zero
    });

    it("returns 0 if starting at 0 and shifting left 1", () => {
      // start at 0, shift left 1
      const result7 = passZeroXTimes({
        start: 0,
        direction: "L",
        change: 1,
      });
      expect(result7).toBe(0); // Did not pass zero
    });
  });
});
