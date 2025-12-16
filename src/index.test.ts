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
  getBankInfo,
  getMobileOperator,
} from "./index";

describe("Zod Iranian Utils Tests", () => {
  it("should validate Melli Code", () => {
    expect(zMelliCode().safeParse("1234567891").success).toBe(true);
    expect(zMelliCode().safeParse("1234567890").success).toBe(false);
  });

  describe("Shenase Melli", () => {
    it("should pass valid Shenase Melli", () => {
      expect(zShenaseMelli().safeParse("10100448712").success).toBe(true);
    });
    it("should fail invalid Shenase Melli", () => {
      expect(zShenaseMelli().safeParse("14003357228").success).toBe(false);
    });
  });

  it("should validate Passport", () => {
    expect(zPassport().safeParse("A12345678").success).toBe(true);
    expect(zPassport().safeParse("12345678").success).toBe(false);
  });

  it("should validate Card Number", () => {
    expect(zCardNumber().safeParse("6362147010005732").success).toBe(true);
    expect(zCardNumber().safeParse("6037991155667781").success).toBe(false);
  });

  it("should validate Mobile", () => {
    expect(zIranianMobile().safeParse("09123456789").success).toBe(true);
    expect(
      zIranianMobile({ strictZero: true }).safeParse("9123456789").success
    ).toBe(false);
  });

  it("should validate Sheba", () => {
    expect(zSheba().safeParse("IR330620000000202901868005").success).toBe(true);
    expect(zSheba().safeParse("IR140120000000000000000001").success).toBe(
      false
    );
  });

  it("should validate Postal Code", () => {
    expect(zPostalCode().safeParse("1234567890").success).toBe(true);
    expect(zPostalCode().safeParse("0234567890").success).toBe(false);
  });

  it("should validate Landline", () => {
    expect(zLandline().safeParse("02122334455").success).toBe(true);
  });

  it("should convert Farsi digits via preprocess", () => {
    const schema = preprocessNumber(zMelliCode());
    const result = schema.safeParse("۱۲۳۴۵۶۷۸۹۱");
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe("1234567891");
  });
});

describe("Metadata Extraction & Normalization", () => {
  it("should detect bank info correctly", () => {
    const melli = getBankInfo("6037991155667788");
    expect(melli).not.toBeNull();
    expect(melli?.name).toBe("Melli");
    expect(melli?.color).toBe("#EF3F3E");
    expect(melli?.formatted).toBe("6037-9911-5566-7788");

    const unknown = getBankInfo("1234567812345678");
    expect(unknown).toBeNull();
  });

  it("should detect mobile operator", () => {
    const mci = getMobileOperator("09121234567");
    expect(mci?.name).toBe("MCI");

    const irancell = getMobileOperator("09351234567");
    expect(irancell?.name).toBe("Irancell");
  });

  it("should normalize Arabic Ye and Kaf", () => {
    const arabicText = String.fromCharCode(1610) + String.fromCharCode(1603);
    const normalized = verifyAndNormalize(arabicText);
    expect(normalized).toBe("یک");
  });
});
  