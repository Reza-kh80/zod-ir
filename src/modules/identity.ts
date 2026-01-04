import { verifyAndNormalize } from "../utils/verifyAndNormalize.ts";

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
