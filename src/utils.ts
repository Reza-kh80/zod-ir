import { BANKS, MOBILE_OPERATORS, BILL_TYPES } from "./data";
import { PLATE_CITY_CODES } from "./pelak-city-codes";

const ALL_PROVINCES = PLATE_CITY_CODES as unknown as readonly {
  province: string;
  codes: readonly {
    code: string;
    details: readonly {
      city: string;
      letters: readonly string[];
    }[];
  }[];
}[];

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

function calculateBillCheckDigit(code: string): number {
  let sum = 0;
  let weight = 2;
  for (let i = code.length - 1; i >= 0; i--) {
    sum += parseInt(code[i]) * weight;
    weight++;
    if (weight > 7) weight = 2;
  }
  const remainder = sum % 11;
  if (remainder === 0 || remainder === 1) return 0;
  return 11 - remainder;
}

export function isBillIdValid(billId: string): boolean {
  const normalized = verifyAndNormalize(billId);
  if (!/^\d{6,13}$/.test(normalized)) return false;
  const checkDigit = parseInt(normalized.slice(-1));
  const core = normalized.slice(0, -1);
  return calculateBillCheckDigit(core) === checkDigit;
}

export function isPaymentIdValid(paymentId: string, billId: string): boolean {
  const nPay = verifyAndNormalize(paymentId);
  const nBill = verifyAndNormalize(billId);

  if (!/^\d{6,13}$/.test(nPay) || !/^\d{6,13}$/.test(nBill)) return false;

  const payCheckDigit1 = parseInt(nPay.slice(-2, -1));
  const payCore1 = nPay.slice(0, -2);
  if (calculateBillCheckDigit(payCore1) !== payCheckDigit1) return false;

  const payCheckDigit2 = parseInt(nPay.slice(-1));
  const combinedCore = nBill + nPay.slice(0, -1);
  return calculateBillCheckDigit(combinedCore) === payCheckDigit2;
}

export type BillInfo = {
  type: { label: string; slug: string; color: string; logo: string };
  amount: number;
  formattedAmount: string;
  isValid: boolean;
} | null;

export function getBillInfo(billId: string, paymentId?: string): BillInfo {
  const nBill = verifyAndNormalize(billId);

  // محدودیت طول برای جلوگیری از اشتباه با کدهای ۳۰ رقمی مالیاتی
  if (nBill.length < 6 || nBill.length > 13) return null;

  const typeDigit = parseInt(nBill.slice(-2, -1));
  // @ts-ignore
  const typeInfo = BILL_TYPES[typeDigit] || {
    label: "نامشخص",
    slug: "unknown",
    color: "#333",
    logo: "",
  };

  let amount = 0;
  let formattedAmount = "0";
  let isValid = isBillIdValid(nBill);

  if (paymentId) {
    const nPay = verifyAndNormalize(paymentId);

    if (!isPaymentIdValid(nPay, nBill)) {
      isValid = false;
    } else {
      // حذف ۵ رقم آخر برای محاسبه مبلغ
      const amountCore = nPay.slice(0, -5);
      if (amountCore.length > 0) {
        amount = parseInt(amountCore) * 1000;
        formattedAmount = new Intl.NumberFormat("fa-IR").format(amount);
      }
    }
  }

  return { type: typeInfo, amount, formattedAmount, isValid };
}

export type PlateInfo = {
  province: string;
  city: string;
  isValid: boolean;
} | null;

export function getPlateInfo(plate: string): PlateInfo {
  const nPlate = verifyAndNormalize(plate).replace(/[\s-]/g, "");
  const regex = /^(\d{2})([\u0600-\u06FF]{1,3}|[A-Za-z])(\d{3})(\d{2})$/;
  const match = nPlate.match(regex);

  if (!match) return null;

  const letter = match[2];
  const cityCode = match[4];

  for (const provinceData of ALL_PROVINCES) {
    const codeEntry = provinceData.codes.find((c) => {
      const codeStr = c.code;
      if (codeStr.includes(",")) {
        return codeStr
          .split(",")
          .map((x) => x.trim())
          .includes(cityCode);
      }
      return codeStr === cityCode;
    });

    if (codeEntry) {
      const cityDetail = codeEntry.details.find((d) => {
        return d.letters.includes(letter) || d.letters.includes("تمام حروف");
      });

      if (cityDetail) {
        return {
          province: provinceData.province,
          city: cityDetail.city,
          isValid: true,
        };
      }
    }
  }
  return null;
}

export function isPlateNumber(plate: string): boolean {
  return getPlateInfo(plate) !== null;
}

export function isMelliCode(code: string): boolean {
  const normalized = verifyAndNormalize(code);
  if (!/^\d{10}$/.test(normalized)) return false;
  if (/^(\d)\1+$/.test(normalized)) return false;
  const check = parseInt(normalized[9]);
  const sum =
    normalized
      .substring(0, 9)
      .split("")
      .reduce((acc, x, i) => acc + parseInt(x) * (10 - i), 0) % 11;
  return sum < 2 ? check === sum : check === 11 - sum;
}

export function isShenaseMelli(code: string): boolean {
  const normalized = verifyAndNormalize(code);
  if (normalized.length !== 11 || !/^\d{11}$/.test(normalized)) return false;
  const tenth = parseInt(normalized[9]);
  const inputCheck = parseInt(normalized[10]);
  const coefficients = [29, 27, 23, 19, 17, 29, 27, 23, 19, 17];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const digit = parseInt(normalized[i]);
    sum += (digit + tenth + 2) * coefficients[i];
  }
  const remainder = sum % 11;
  const calculatedCheck = remainder === 10 ? 0 : remainder;
  return calculatedCheck === inputCheck;
}

export function isPassport(code: string): boolean {
  const normalized = verifyAndNormalize(code);
  return /^[A-Za-z][0-9]{8,9}$/.test(normalized);
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

interface MobileValidationOptions {
  strictZero?: boolean | "optional";
}
export function isIranianMobile(
  mobile: string,
  { strictZero = "optional" }: MobileValidationOptions = {}
): boolean {
  const normalized = verifyAndNormalize(mobile);
  const corePattern = "9\\d{9}";
  let pattern = "";
  if (strictZero === true) pattern = `^0${corePattern}$`;
  else if (strictZero === false) pattern = `^${corePattern}$`;
  else pattern = `^(?:0|\\+98)?${corePattern}$`;
  return new RegExp(pattern).test(normalized);
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

export function isPostalCode(code: string): boolean {
  const normalized = verifyAndNormalize(code);
  return /^[1-9]\d{9}$/.test(normalized);
}

export function isLandline(code: string): boolean {
  const normalized = verifyAndNormalize(code);
  return /^0\d{2}\d{8}$/.test(normalized);
}
