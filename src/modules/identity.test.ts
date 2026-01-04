import { describe, it, expect } from "vitest";
import { isMelliCode, isShenaseMelli, isPassport } from "./identity.ts";

describe("Identity Validations", () => {
  it("should validate Melli Code correctly", () => {
    expect(isMelliCode("1234567891")).toBe(true);
    expect(isMelliCode("1234567890")).toBe(false);
    expect(isMelliCode("1111111111")).toBe(false);
    expect(isMelliCode("۱۲۳۴۵۶۷۸۹۱")).toBe(true);
  });

  it("should validate Shenase Melli correctly", () => {
    expect(isShenaseMelli("10100448712")).toBe(true);
    expect(isShenaseMelli("14003357228")).toBe(false);
  });

  it("should validate Passport correctly", () => {
    expect(isPassport("A12345678")).toBe(true);
    expect(isPassport("12345678")).toBe(false);
  });
});
