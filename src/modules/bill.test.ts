import { describe, it, expect } from "vitest";
import { isBillIdValid, getBillInfo } from "./bill";

describe("Bill Validations", () => {
  it("should validate Bill ID correctly", () => {
    expect(isBillIdValid("9006117002129")).toBe(true);
    expect(isBillIdValid("123456")).toBe(false);
  });

  it("should calculate Bill Amount and Validation correctly", () => {
    const bill = getBillInfo("7069335002224", "139540469");
    expect(bill?.isValid).toBe(true);
    expect(bill?.type.slug).toBe("electricity");
    expect(bill?.amount).toBe(1395000);
  });

  it("should validate Municipality Bill correctly", () => {
    const bill = getBillInfo("4009772300460", "17580479");
    expect(bill?.isValid).toBe(true);
    expect(bill?.type.slug).toBe("municipality");
    expect(bill?.amount).toBe(175000);
  });

  it("should validate Traffic Fine Bill correctly", () => {
    const bill = getBillInfo("9394570000293", "100027530");
    expect(bill?.isValid).toBe(true);
    expect(bill?.type.slug).toBe("traffic");
    expect(bill?.amount).toBe(1000000);
  });

  it("should reject invalid payment ID", () => {
    const bill = getBillInfo("9006117002129", "12345678");
    expect(bill?.isValid).toBe(false);
  });
});
