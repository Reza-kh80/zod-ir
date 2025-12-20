import { describe, it, expect } from "vitest";
import { verifyAndNormalize } from "./helpers";

describe("Helpers", () => {
  it("should normalize Persian digits", () => {
    expect(verifyAndNormalize("۱۲۳۴۵۶۷۸۹۰")).toBe("1234567890");
  });

  it("should normalize Arabic digits", () => {
    expect(verifyAndNormalize("١٢٣٤٥٦٧٨٩٠")).toBe("1234567890");
  });

  it("should normalize Arabic characters", () => {
    expect(verifyAndNormalize("ي ك")).toBe("ی ک");
  });

  it("should handle mixed input", () => {
    expect(verifyAndNormalize("مبلغ ۱۲۰۰۰ ریال")).toBe("مبلغ 12000 ریال");
  });
});
