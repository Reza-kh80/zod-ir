import { describe, it, expect } from "vitest";
import {
  isIranianMobile,
  getMobileOperator,
  isPostalCode,
  isLandline,
} from "./contact";

describe("Contact Validations", () => {
  it("should validate Mobile Number correctly", () => {
    expect(isIranianMobile("09121234567")).toBe(true);
    expect(isIranianMobile("09121234567", { strictZero: true })).toBe(true);
    expect(isIranianMobile("9121234567", { strictZero: true })).toBe(false);
    expect(isIranianMobile("09301234567")).toBe(true);
  });

  it("should extract Mobile Operator correctly", () => {
    const op = getMobileOperator("09121234567");
    expect(op?.name).toBe("MCI");

    const op2 = getMobileOperator("09351234567");
    expect(op2?.name).toBe("Irancell");
  });

  it("should validate Postal Code correctly", () => {
    expect(isPostalCode("1234567890")).toBe(true);
    expect(isPostalCode("0234567890")).toBe(false);
  });

  it("should validate Landline correctly", () => {
    expect(isLandline("02122334455")).toBe(true);
    expect(isLandline("2122334455")).toBe(false);
  });
});
