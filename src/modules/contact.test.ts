import { describe, it, expect } from "vitest";
import {
  isIranianMobile,
  getMobileOperator,
  isPostalCode,
  getPostalCodeInfo,
  isLandline,
  getLandlineInfo,
} from "./contact.ts";

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

  it("should extract Postal Code info correctly", () => {
    const tehranInfo = getPostalCodeInfo("1111112345");
    expect(tehranInfo).not.toBeNull();
    expect(tehranInfo?.province.name).toBe("تهران");
    expect(tehranInfo?.city.name_en).toContain("Tehran Municipality");

    const tabrizInfo = getPostalCodeInfo("5133100000");
    expect(tabrizInfo).not.toBeNull();
    expect(tabrizInfo?.city.name_fa).toBe("تبریز");

    const invalidInfo = getPostalCodeInfo("9999999999");
    expect(invalidInfo).toBeNull();
  });

  it("should validate Landline correctly", () => {
    expect(isLandline("02122334455")).toBe(true);
    expect(isLandline("09922334455")).toBe(false);
    expect(isLandline("2122334455")).toBe(false);
  });

  it("should extract Landline info correctly", () => {
    const tehran = getLandlineInfo("02122334455");
    expect(tehran).toEqual({
      province: "Tehran",
      city: "Tehran",
      province_fa: "تهران",
      city_fa: "تهران",
    });

    const karaj = getLandlineInfo("02633333333");
    expect(karaj).toEqual({
      province: "Alborz",
      city: "Karaj",
      province_fa: "البرز",
      city_fa: "کرج",
    });

    const invalid = getLandlineInfo("09922334455");
    expect(invalid).toBeNull();
  });
});
