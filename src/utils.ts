export function isMelliCode(code: string): boolean {
  if (!/^\d{10}$/.test(code)) return false;

  const check = parseInt(code[9]);
  if (/^(\d)\1+$/.test(code)) return false;

  const sum =
    code
      .substring(0, 9)
      .split("")
      .reduce((acc, x, i) => acc + parseInt(x) * (10 - i), 0) % 11;

  return sum < 2 ? check === sum : check === 11 - sum;
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

  if (strictZero === true) {
    pattern = `^0${corePattern}$`;
  } else if (strictZero === false) {
    pattern = `^${corePattern}$`;
  } else {
    pattern = `^(?:0|\\+98)?${corePattern}$`;
  }

  return new RegExp(pattern).test(mobile);
}

export function isSheba(code: string): boolean {
  const iban = code.toUpperCase().replace(/[\-\s]/g, "");

  if (iban.length !== 26) return false;
  if (!iban.startsWith("IR")) return false;

  const newStr = iban.substring(4) + "1827" + iban.substring(2, 4);

  const remainder = Array.from(newStr)
    .map((c) => parseInt(c, 36))
    .reduce((remainder, value) => {
      const v = value < 10 ? value : value;
      return (Number(remainder + "" + v) % 97).toString();
    }, "");

  return parseInt(remainder) === 1;
}

export function isPostalCode(code: string): boolean {
  if (!/^\d{10}$/.test(code)) return false;
  if (code.startsWith("0")) return false;
  return true;
}

export function isLandline(code: string): boolean {
  return /^0\d{2}\d{8}$/.test(code);
}
