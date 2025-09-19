import { describe, test, it, expect } from "vitest";
const calculator = require("./main");

describe("operate", () => {
  it("should call add when '+' is passed", () => {
    expect(calculator.operate("+", 4, 9)).toBe(13);
  });
  it("should call divide when '/' is passed", () => {
    expect(calculator.operate("/", 12, 6)).toBe(2);
  });
  it("should call exponent when '^' is passed", () => {
    expect(calculator.operate("^", 4, 3)).toBe(64);
  });
});

describe("add", () => {
  it("should return sum of both values", () => {
    expect(calculator.add(5, 7)).toBe(12);
  });
});

describe("divide", () => {
  it("should return quotient of two values", () => {
    expect(calculator.divide(8, 2)).toBe(4);
  });
  it("should return Error when dividing by zero", () => {
    expect(calculator.divide(8, 0)).toBe("Can't divide by 0 dummy");
  });
});

describe("exponent", () => {
  it("should return base raised to exp", () => {
    expect(calculator.exponent(2, 3)).toBe(8);
  });
  it("should return base raised to exp", () => {
    expect(calculator.exponent(2, 0)).toBe(1);
  });
});
