const { getBeamSplitCount, getTimelines } = require("../Day7");

describe("Day 7 P1", () => {
  const case1 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....";

  it("returns 6 for case 1", () => {
    const result = getBeamSplitCount(
      case1.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(6);
  });

  const case2 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....\n" +
    "....^.|.^.^....\n" +
    "...|.|||.|.|...\n";

  it("returns 9 for case 2", () => {
    const result = getBeamSplitCount(
      case2.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(9);
  });

  const case3 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....\n" +
    "....^.|.^.^....\n" +
    "...|.|||.|.|...\n" +
    "...^.|||.|.^...\n" +
    "..|.||||.||.|..\n";

  it("returns 11 for case 3", () => {
    const result = getBeamSplitCount(
      case3.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(11);
  });

  const case4 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....\n" +
    "....^.|.^.^....\n" +
    "...|.|||.|.|...\n" +
    "...^.^||.|.^...\n" +
    "..|.|.||.||.|..\n";

  it("returns 12 for case 4", () => {
    const result = getBeamSplitCount(
      case4.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(12);
  });

  const case5 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....\n" +
    "....^.|.^.^....\n" +
    "...|.|||.|.|...\n" +
    "...^.|^|.|.^...\n" +
    "..|.||.|.||.|..\n";

  it("returns 12 for case 5", () => {
    const result = getBeamSplitCount(
      case5.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(12);
  });

  const case6 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....\n" +
    "....^.|.^.^....\n" +
    "...|.|||.|.|...\n" +
    "...^.||^.|.^...\n" +
    "..|.|||.|||.|..\n";

  it("returns 12 for case 6", () => {
    const result = getBeamSplitCount(
      case6.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(12);
  });

  const case7 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....\n" +
    "....^.|.^.^....\n" +
    "...|.|||.|.|...\n" +
    "...^.|||^|.^...\n" +
    "..|.||||.||.|..\n";

  it("returns 11 for case 7", () => {
    const result = getBeamSplitCount(
      case7.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(11);
  });

  const case8 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....\n" +
    "....^.|.^.^....\n" +
    "...|.|||.|.|...\n" +
    "...^.|||.^.^...\n" +
    "..|.|||||.|.|..\n";

  it("returns 12 for case 8", () => {
    const result = getBeamSplitCount(
      case8.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(12);
  });

  const case9 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....\n" +
    "....^.|.^.^....\n" +
    "...|.|||.|.|...\n" +
    "...^.|||.^.^...\n" +
    "..|.|||||.|.|..\n" +
    "..^.|||||.|.^..\n" +
    ".|..|||||.||.|.";

  it("returns 14 for case 9", () => {
    const result = getBeamSplitCount(
      case9.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(14);
  });

  const case10 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....\n" +
    "....^.|.^.^....\n" +
    "...|.|||.|.|...\n" +
    "...^.|||.^.^...\n" +
    "..|.|||||.|.|..\n" +
    "..^^|||||.|.^..\n" +
    "..|.|||||.||.|.";

  it("returns 14 for case 10", () => {
    const result = getBeamSplitCount(
      case10.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(14);
  });

  const case11 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....\n" +
    "....^.|.^.^....\n" +
    "...|.|||.|.|...\n" +
    "...^.|||.^.^...\n" +
    "..|.|||||.|.|..\n" +
    "..^.^||||.|.^..\n" +
    ".|.|.||||.||.|.";

  it("returns 15 for case 11", () => {
    const result = getBeamSplitCount(
      case11.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(15);
  });

  const case12 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "......|.|......\n" +
    "......^.^......\n" +
    ".....|.|.|.....\n" +
    ".....^.^.^.....\n" +
    "....|.|.|.|....\n" +
    "....^.|.^.^....\n" +
    "...|.|||.|.|...\n" +
    "...^.|||.^.^...\n" +
    "..|.|||||.|.|..\n" +
    "..^.|^|||.|.^..\n" +
    ".|.||.|||.||.|.";

  it("returns 15 for case 12", () => {
    const result = getBeamSplitCount(
      case12.split("\n").map((line) => line.split(""))
    );
    expect(result).toBe(15);
  });
});

describe("Day 7 P2", () => {
  const case1 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "...............\n";

  it("returns 2 for case 1", () => {
    const result = getTimelines({
      lines: case1.split("\n").map((line) => line.split("")),
      currCount: 0,
      currCol: Math.floor(case1.split("\n")[0].length / 2),
      currRow: 0,
    });
    expect(result).toBe(2);
  });

  const case2 =
    ".......S.......\n" +
    "...............\n" +
    ".......^.......\n" +
    "...............\n" +
    "......^.^......\n" +
    "...............\n";

  it("returns 4 for case 2", () => {
    const result = getTimelines({
      lines: case2.split("\n").map((line) => line.split("")),
      currCount: 0,
      currCol: Math.floor(case2.split("\n")[0].length / 2),
      currRow: 0,
    });
    expect(result).toBe(4);
  });
});
