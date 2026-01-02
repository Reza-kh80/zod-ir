import { describe, it, expect } from "vitest";
import { transformToCurrency, numberToText, formatCurrency } from "./currency.ts";

describe("Currency Transformations", () => {
  it("should parse huge numbers from text", () => {
    const text =
      "سه همت و صد و بیست میلیارد و پانصد و ده میلیون و سی صد و یازده هزار و چهل و هشت";
    const expected = 3_120_510_311_048;
    expect(transformToCurrency(text)).toBe(expected);
  });

  it("should parse formatted strings", () => {
    expect(transformToCurrency("3,120,510,311,048")).toBe(3_120_510_311_048);
  });

  it("should convert number to text correctly", () => {
    expect(numberToText(2500)).toBe("دو هزار و پانصد");
    expect(numberToText(1000000)).toBe("یک میلیون");
    expect(numberToText(3120510311048)).toBe(
      "سه تریلیون و صد و بیست میلیارد و پانصد و ده میلیون و سیصد و یازده هزار و چهل و هشت"
    );
  });

  it("should format currency", () => {
    expect(formatCurrency(3120510311048)).toBe("3,120,510,311,048");
  });
});
