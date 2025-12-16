import { describe, it, expect } from "vitest";
import {
  zMelliCode,
  zShenaseMelli,
  zPassport,
  zCardNumber,
  zIranianMobile,
  zSheba,
  zPostalCode,
  zLandline,
  preprocessNumber,
  verifyAndNormalize,
} from "./index";

describe("Zod Iranian Utils Tests", () => {
  // --- Basic Validations ---
  it("should validate Melli Code", () => {
    expect(zMelliCode().safeParse("1234567891").success).toBe(true);
    expect(zMelliCode().safeParse("1234567890").success).toBe(false);
  });

  // --- Shenase Melli (FIXED DATA) ---
  describe("Shenase Melli", () => {
    it("should pass valid Shenase Melli", () => {
      expect(zShenaseMelli().safeParse("10100448712").success).toBe(true);
    });
    it("should fail invalid Shenase Melli", () => {
      expect(zShenaseMelli().safeParse("14003357228").success).toBe(false);
    });
  });

  // --- Passport ---
  it("should validate Passport", () => {
    expect(zPassport().safeParse("A12345678").success).toBe(true);
    expect(zPassport().safeParse("12345678").success).toBe(false);
  });

  // --- Card Number ---
  it("should validate Card Number", () => {
    expect(zCardNumber().safeParse("6362147010005732").success).toBe(true);
    expect(zCardNumber().safeParse("6037991155667781").success).toBe(false);
  });

  // --- Mobile ---
  it("should validate Mobile", () => {
    expect(zIranianMobile().safeParse("09123456789").success).toBe(true);
    expect(
      zIranianMobile({ strictZero: true }).safeParse("9123456789").success
    ).toBe(false);
  });

  // --- Sheba ---
  it("should validate Sheba", () => {
    expect(zSheba().safeParse("IR330620000000202901868005").success).toBe(true);
    expect(zSheba().safeParse("IR140120000000000000000001").success).toBe(
      false
    );
  });

  // --- Postal & Landline ---
  it("should validate Postal Code", () => {
    expect(zPostalCode().safeParse("1234567890").success).toBe(true);
    expect(zPostalCode().safeParse("0234567890").success).toBe(false);
  });

  it("should validate Landline", () => {
    expect(zLandline().safeParse("02122334455").success).toBe(true);
  });

  // --- Auto Fix (Preprocess) ---
  it("should convert Farsi digits", () => {
    const schema = preprocessNumber(zMelliCode());
    const result = schema.safeParse("۱۲۳۴۵۶۷۸۹۱");
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe("1234567891");
  });
});

describe("Preprocess (Digits Normalization)", () => {
  it("should convert Persian digits to English", () => {
    const schema = preprocessNumber(zMelliCode());
    const result = schema.safeParse("۱۲۳۴۵۶۷۸۹۱");
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe("1234567891");
  });

  it("should convert Arabic digits to English", () => {
    const schema = preprocessNumber(zMelliCode());
    const result = schema.safeParse("١٢٣٤٥٦۷۸۹۱");
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe("1234567891");
  });

  it("should keep English digits and other characters as is", () => {
    const normalized = verifyAndNormalize("A-123-تست");
    expect(normalized).toBe("A-123-تست");
  });
});
