import { describe, it, expect } from "vitest";
import { isJalaliDate, getJalaliDateInfo } from "./date.ts";

describe("Jalali Date Validations", () => {
  it("should validate correct dates", () => {
    expect(isJalaliDate("1402/01/01")).toBe(true);
    expect(isJalaliDate("1402-01-01")).toBe(true);
    expect(isJalaliDate("1402/6/31")).toBe(true);
    expect(isJalaliDate("1399/12/30")).toBe(true);
  });

  it("should reject invalid dates", () => {
    expect(isJalaliDate("1402/13/01")).toBe(false);
    expect(isJalaliDate("1402/12/30")).toBe(false);
    expect(isJalaliDate("1402/07/31")).toBe(false);
    expect(isJalaliDate("invalid-text")).toBe(false);
  });

  it("should extract correct info", () => {
    const info = getJalaliDateInfo("1403/12/30");
    expect(info?.isValid).toBe(true);
    expect(info?.isLeap).toBe(true);
    expect(info?.year).toBe(1403);
  });

  it("should handle persian digits", () => {
    expect(isJalaliDate("۱۴۰۲/۰۱/۰۱")).toBe(true);
  });
});
