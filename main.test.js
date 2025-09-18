import { describe, test, it, expect } from "vitest";
const calculator = require("./main");

describe("add", () => {
  it("should return sum of both values", () => {
    expect(calculator.add(5, 7)).toBe(12);
  });
});
