import { describe, it, expect } from "vitest";
import { isCryptoAddress, getCryptoInfo } from "./crypto.ts";

describe("Crypto Validations", () => {
  it("should validate TRC20 (Tron) addresses correctly", () => {
    const validTrx = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
    expect(isCryptoAddress(validTrx)).toBe(true);
    expect(isCryptoAddress(validTrx, "TRX")).toBe(true);
    expect(isCryptoAddress(validTrx, "ETH")).toBe(false);

    const info = getCryptoInfo(validTrx);
    expect(info?.ticker).toBe("TRX");
    expect(info?.network).toBe("TRC20");
  });

  it("should validate ERC20 (Ethereum) addresses correctly", () => {
    const validEth = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    expect(isCryptoAddress(validEth)).toBe(true);
    expect(isCryptoAddress(validEth, "ETH")).toBe(true);

    const info = getCryptoInfo(validEth);
    expect(info?.ticker).toBe("ETH");
    expect(info?.network).toBe("ERC20");
  });

  it("should validate Bitcoin addresses correctly", () => {
    const validBtcLegacy = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";
    const validBtcSegwit = "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy";
    const validBtcBech32 = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

    expect(isCryptoAddress(validBtcLegacy)).toBe(true);
    expect(isCryptoAddress(validBtcSegwit)).toBe(true);
    expect(isCryptoAddress(validBtcBech32)).toBe(true);
    expect(isCryptoAddress(validBtcLegacy, "BTC")).toBe(true);

    const info = getCryptoInfo(validBtcLegacy);
    expect(info?.ticker).toBe("BTC");
    expect(info?.network).toBe("BITCOIN");
  });

  it("should reject invalid addresses", () => {
    expect(isCryptoAddress("InvalidAddress123")).toBe(false);
    expect(isCryptoAddress("T123456")).toBe(false);
    expect(isCryptoAddress("0x123")).toBe(false);
  });
});
