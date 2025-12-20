import { verifyAndNormalize } from "../utils/helpers";

function isJalaliLeapYear(year: number): boolean {
  const rem = year % 33;
  return [1, 5, 9, 13, 17, 22, 26, 30].includes(rem);
}

function getDaysInJalaliMonth(year: number, month: number): number {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  if (isJalaliLeapYear(year)) return 30;
  return 29;
}

export type JalaliDateInfo = {
  year: number;
  month: number;
  day: number;
  isValid: boolean;
  isLeap: boolean;
} | null;

export function getJalaliDateInfo(date: string): JalaliDateInfo {
  const normalized = verifyAndNormalize(date);

  const regex = /^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/;
  const match = normalized.match(regex);

  if (!match) return null;

  const year = parseInt(match[1]);
  const month = parseInt(match[2]);
  const day = parseInt(match[3]);

  if (month < 1 || month > 12) {
    return { year, month, day, isValid: false, isLeap: false };
  }

  const isLeap = isJalaliLeapYear(year);
  const maxDays = getDaysInJalaliMonth(year, month);

  if (day < 1 || day > maxDays) {
    return { year, month, day, isValid: false, isLeap };
  }

  return { year, month, day, isValid: true, isLeap };
}

export function isJalaliDate(date: string): boolean {
  const info = getJalaliDateInfo(date);
  return info ? info.isValid : false;
}
