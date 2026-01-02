import { describe, it, expect } from "vitest";
import { isPlateNumber, getPlateInfo } from "./vehicle.ts";

describe("Vehicle Validations", () => {
  it("should validate Plate Number correctly", () => {
    expect(isPlateNumber("12ب345-11")).toBe(true);
    expect(isPlateNumber("12ب34511")).toBe(true);
    expect(isPlateNumber("۶۴م۳۲۲-۲۳")).toBe(true);
    expect(isPlateNumber("1234567")).toBe(false);
  });

  it("should extract Plate Info correctly", () => {
    const info = getPlateInfo("11ب222-15");
    expect(info?.province).toBe("آذربایجان شرقی");
    expect(info?.city).toBe("تبریز");

    const infoFarsi = getPlateInfo("۶۴م۳۲۲-۲۳");
    expect(infoFarsi?.province).toBe("اصفهان");
    expect(infoFarsi?.city).toBe("نایین");
  });
});
