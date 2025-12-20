import { describe, it, expect } from "vitest";
import { isCardNumber, isSheba, getBankInfo } from "./financial";

describe("Financial Validations", () => {
  it("should validate Card Number correctly", () => {
    expect(isCardNumber("6274121940067465")).toBe(true);
    expect(isCardNumber("6037991155667781")).toBe(false);
  });

  it("should validate Sheba correctly", () => {
    expect(isSheba("IR330620000000202901868005")).toBe(true);
    expect(isSheba("IR140120000000000000000001")).toBe(false);
  });

  it("should extract Bank Info correctly", () => {
    const bank = getBankInfo("6037991155667788");
    expect(bank?.name).toBe("Melli");
    expect(bank?.color).toBe("#EF3F3E");
    expect(getBankInfo("1234567812345678")).toBeNull();
  });
});
