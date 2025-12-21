import { verifyAndNormalize } from "../utils/helpers";
import { BANKS } from "../data/constants";

export type BankInfo = {
  name: string;
  label: string;
  color: string;
  logo: string;
  formatted: string;
} | null;

export function getBankInfo(cardNumber: string): BankInfo {
  const normalized = verifyAndNormalize(cardNumber).replace(/[\-\s]/g, "");

  if (normalized.length >= 6) {
    const bin = normalized.substring(0, 6);
    // @ts-ignore
    const bank = BANKS[bin];
    if (bank) {
      return {
        ...bank,
        formatted: normalized.replace(/(\d{4})(?=\d)/g, "$1-"),
      };
    }
  }
  return null;
}

export function isCardNumber(code: string): boolean {
  const normalized = verifyAndNormalize(code).replace(/[\-\s]/g, "");
  if (!/^\d{16}$/.test(normalized)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = normalized.length - 1; i >= 0; i--) {
    let digit = parseInt(normalized[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export function isSheba(code: string): boolean {
  const normalized = verifyAndNormalize(code);
  const iban = normalized.toUpperCase().replace(/[\-\s]/g, "");
  if (iban.length !== 26 || !iban.startsWith("IR")) return false;
  const newStr = iban.substring(4) + iban.substring(0, 4);
  const numericString = newStr
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      return code >= 48 && code <= 57 ? c : (code - 55).toString();
    })
    .join("");
  try {
    return BigInt(numericString) % BigInt(97) === BigInt(1);
  } catch {
    return false;
  }
}

export type FinancialInfo = {
  type: "card" | "sheba" | "unknown";
  value: string;
  isValid: boolean;
  bank: BankInfo;
} | null;

export function getFinancialInfo(value: string): FinancialInfo {
  const normalized = verifyAndNormalize(value).replace(/[\-\s]/g, "");

  if (normalized.toUpperCase().startsWith("IR")) {
    const isValid = isSheba(normalized);
    return {
      type: "sheba",
      value: normalized.toUpperCase(),
      isValid,
      bank: null,
    };
  }

  if (/^\d{6,16}$/.test(normalized)) {
    const isValid = isCardNumber(normalized);
    const bank = getBankInfo(normalized);

    return {
      type: "card",
      value: normalized,
      isValid,
      bank,
    };
  }

  return { type: "unknown", value: normalized, isValid: false, bank: null };
}

export function isFinancialValue(value: string): boolean {
  const info = getFinancialInfo(value);
  return info ? info.isValid : false;
}
