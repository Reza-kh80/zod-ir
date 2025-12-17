import { BANKS, MOBILE_OPERATORS } from "./data";

export function verifyAndNormalize(value: string): string {
  if (!value) return "";
  const PERSIAN_ZERO = 1776;
  const PERSIAN_NINE = 1785;
  const ARABIC_ZERO = 1632;
  const ARABIC_NINE = 1641;
  const ARABIC_YEH = 1610;
  const PERSIAN_YE = 1740;
  const ARABIC_KAF = 1603;
  const PERSIAN_KE = 1705;
  let result = "";
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    let char = value[i];
    if (code >= PERSIAN_ZERO && code <= PERSIAN_NINE) {
      char = String(code - PERSIAN_ZERO);
    } else if (code >= ARABIC_ZERO && code <= ARABIC_NINE) {
      char = String(code - ARABIC_ZERO);
    } else if (code === ARABIC_YEH) {
      char = String.fromCharCode(PERSIAN_YE);
    } else if (code === ARABIC_KAF) {
      char = String.fromCharCode(PERSIAN_KE);
    }
    result += char;
  }
  return result;
}

export type BankInfo = {
  name: string;
  label: string;
  color: string;
  logo: string;
  formatted: string;
} | null;

export function getBankInfo(cardNumber: string): BankInfo {
  const normalized = verifyAndNormalize(cardNumber).replace(/[\-\s]/g, "");
  if (normalized.length < 6) return null;
  const bin = normalized.substring(0, 6);
  // @ts-ignore
  const bank = BANKS[bin];
  if (!bank) return null;
  return {
    ...bank,
    formatted: normalized.replace(/(\d{4})(?=\d)/g, "$1-"),
  };
}

export type OperatorInfo = {
  name: string;
  label: string;
  logo: string;
} | null;

export function getMobileOperator(mobile: string): OperatorInfo {
  const normalized = verifyAndNormalize(mobile);

  let prefix = "";
  if (normalized.startsWith("09")) {
    prefix = normalized.substring(0, 4);
  } else if (normalized.startsWith("9")) {
    prefix = "0" + normalized.substring(0, 3);
  } else if (normalized.startsWith("+98")) {
    prefix = "0" + normalized.substring(3, 6);
  }

  if (prefix.length !== 4) return null;

  for (const [key, op] of Object.entries(MOBILE_OPERATORS)) {
    // @ts-ignore
    if (op.prefixes.includes(prefix)) {
      return {
        name: key,
        label: op.label,
        logo: op.logo,
      };
    }
  }

  return null;
}

export function isMelliCode(code: string): boolean {
  if (!/^\d{10}$/.test(code)) return false;
  if (/^(\d)\1+$/.test(code)) return false;
  const check = parseInt(code[9]);
  const sum =
    code
      .substring(0, 9)
      .split("")
      .reduce((acc, x, i) => acc + parseInt(x) * (10 - i), 0) % 11;
  return sum < 2 ? check === sum : check === 11 - sum;
}
export function isShenaseMelli(code: string): boolean {
  if (code.length !== 11 || !/^\d{11}$/.test(code)) return false;
  const tenth = parseInt(code[9]);
  const inputCheck = parseInt(code[10]);
  const coefficients = [29, 27, 23, 19, 17, 29, 27, 23, 19, 17];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const digit = parseInt(code[i]);
    sum += (digit + tenth + 2) * coefficients[i];
  }
  const remainder = sum % 11;
  const calculatedCheck = remainder === 10 ? 0 : remainder;
  return calculatedCheck === inputCheck;
}
export function isPassport(code: string): boolean {
  return /^[A-Za-z][0-9]{8,9}$/.test(code);
}
export function isCardNumber(code: string): boolean {
  const sanitized = code.replace(/[\-\s]/g, "");
  if (!/^\d{16}$/.test(sanitized)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}
interface MobileValidationOptions {
  strictZero?: boolean | "optional";
}
export function isIranianMobile(
  mobile: string,
  { strictZero = "optional" }: MobileValidationOptions = {}
): boolean {
  const corePattern = "9\\d{9}";
  let pattern = "";
  if (strictZero === true) pattern = `^0${corePattern}$`;
  else if (strictZero === false) pattern = `^${corePattern}$`;
  else pattern = `^(?:0|\\+98)?${corePattern}$`;
  return new RegExp(pattern).test(mobile);
}
export function isSheba(code: string): boolean {
  const iban = code.toUpperCase().replace(/[\-\s]/g, "");
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
export function isPostalCode(code: string): boolean {
  return /^[1-9]\d{9}$/.test(code);
}
export function isLandline(code: string): boolean {
  return /^0\d{2}\d{8}$/.test(code);
}
