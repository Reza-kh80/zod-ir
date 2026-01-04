import { verifyAndNormalize } from "../utils/verifyAndNormalize.ts";

const NUM_WORDS: Record<string, number> = {
  صفر: 0,
  یک: 1,
  دو: 2,
  سه: 3,
  چهار: 4,
  پنج: 5,
  شش: 6,
  شیش: 6,
  هفت: 7,
  هشت: 8,
  نه: 9,
  ده: 10,
  یازده: 11,
  دوازده: 12,
  سیزده: 13,
  چهارده: 14,
  پانزده: 15,
  شانزده: 16,
  هفده: 17,
  هجده: 18,
  نوزده: 19,
  بیست: 20,
  سی: 30,
  چهل: 40,
  پنجاه: 50,
  شصت: 60,
  هفتاد: 70,
  هشتاد: 80,
  نود: 90,
  صد: 100,
  یکصد: 100,
  دویست: 200,
  سیصد: 300,
  چهارصد: 400,
  پانصد: 500,
  ششصد: 600,
  هفتصد: 700,
  هشتصد: 800,
  نهصد: 900,
  هزار: 1_000,
  یکہزار: 1_000,
  میلیون: 1_000_000,
  ملیون: 1_000_000,
  میلیارد: 1_000_000_000,
  میلیار: 1_000_000_000,
  همت: 1_000_000_000_000,
};

const ONES = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
const TENS = [
  "",
  "ده",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
];
const TEENS = [
  "ده",
  "یازده",
  "دوازده",
  "سیزده",
  "چهارده",
  "پانزده",
  "شانزده",
  "هفده",
  "هجده",
  "نوزده",
];
const HUNDREDS = [
  "",
  "صد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
];
const SCALES = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];

export function transformToCurrency(input: string | number): number | null {
  if (typeof input === "number") return input;
  if (!input) return null;

  let text = verifyAndNormalize(input).replace(/,/g, "");

  if (/^\d+$/.test(text)) return Number(text);
  if (/^[\d.]+$/.test(text)) return Number(text);

  text = text
    .replace(/\u200c/g, " ")
    .replace(/ و/g, " ")
    .replace(/^و/, "")
    .replace(/\s+/g, " ")
    .trim();

  let totalSum = 0;
  let currentBlock = 0;

  const tokens = text.split(" ");

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    let value = NUM_WORDS[token];

    if (value === undefined) {
      if (!isNaN(Number(token))) {
        value = Number(token);
      } else {
        continue;
      }
    }

    if (i + 1 < tokens.length) {
      const nextToken = tokens[i + 1];
      const nextValue = NUM_WORDS[nextToken];
      if (nextValue === 100) {
        if (value > 0 && value < 10) {
          currentBlock += value * 100;
          i++;
          continue;
        }
        if (value === 30) {
          currentBlock += 300;
          i++;
          continue;
        }
      }
    }

    if (value >= 1000) {
      if (currentBlock === 0) currentBlock = 1;
      totalSum += currentBlock * value;
      currentBlock = 0;
    } else {
      currentBlock += value;
    }
  }
  totalSum += currentBlock;
  return totalSum === 0 ? null : totalSum;
}

export function numberToText(num: number | string): string {
  let n = typeof num === "string" ? parseInt(num.replace(/,/g, "")) : num;
  if (isNaN(n) || n === 0) return "صفر";

  if (n < 0) return "منفی " + numberToText(Math.abs(n));

  const parts: string[] = [];
  let scaleIndex = 0;

  while (n > 0) {
    const chunk = n % 1000;
    if (chunk > 0) {
      const chunkText = convertChunk(chunk);
      const scale = SCALES[scaleIndex];
      const fullChunk = scale ? `${chunkText} ${scale}` : chunkText;
      parts.unshift(fullChunk);
    }
    n = Math.floor(n / 1000);
    scaleIndex++;
  }

  return parts.join(" و ");
}

function convertChunk(n: number): string {
  if (n === 0) return "";

  const result: string[] = [];

  const h = Math.floor(n / 100);
  if (h > 0) {
    result.push(HUNDREDS[h]);
    n %= 100;
  }

  if (n > 0) {
    if (n < 10) {
      result.push(ONES[n]);
    } else if (n >= 10 && n < 20) {
      result.push(TEENS[n - 10]);
    } else {
      const t = Math.floor(n / 10);
      const o = n % 10;
      result.push(TENS[t]);
      if (o > 0) result.push(ONES[o]);
    }
  }

  return result.join(" و ");
}

export function formatCurrency(amount: number | string): string {
  if (!amount) return "";
  const num =
    typeof amount === "string" ? amount.replace(/,/g, "") : amount.toString();
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
