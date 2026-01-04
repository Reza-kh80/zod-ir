import { MOBILE_OPERATORS } from "../data/constants.ts";
import { LANDLINE_PREFIXES } from "../data/landlinePrefixes.ts";
import { verifyAndNormalize } from "../utils/verifyAndNormalize.ts";
import { POSTAL_CODE_PREFIXES } from "../data/postalCodePrefixes.ts";

export type OperatorInfo = {
  name: string;
  label: string;
  logo: string;
} | null;

export type PostalCodeInfo = {
  province: {
    name: string;
    slug: string;
  };
  city: {
    name_fa: string;
    name_en: string;
  };
} | null;

export type LandlineInfo = {
  province: string;
  city: string;
  province_fa: string;
  city_fa: string;
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

export function getPostalCodeInfo(code: string): PostalCodeInfo {
  const normalized = verifyAndNormalize(code);
  if (!/^[1-9]\d{9}$/.test(normalized)) return null;

  const codePrefix = parseInt(normalized.substring(0, 5), 10);
  const data = POSTAL_CODE_PREFIXES[0].data;

  let bestMatch: {
    provinceName: string;
    provinceSlug: string;
    city: { name_fa: string; name_en: string; range: string };
    rangeSize: number;
  } | null = null;

  for (const [provKey, provData] of Object.entries(data)) {
    for (const city of provData.cities) {
      const parts = city.range.split("-");
      const min = parseInt(parts[0], 10);
      const max = parseInt(parts[1], 10);

      if (codePrefix >= min && codePrefix <= max) {
        const rangeSize = max - min;

        if (!bestMatch || rangeSize < bestMatch.rangeSize) {
          bestMatch = {
            provinceName: provData.province_name_fa,
            provinceSlug: provKey,
            city: city,
            rangeSize: rangeSize,
          };
        }
      }
    }
  }

  if (bestMatch) {
    return {
      province: {
        name: bestMatch.provinceName,
        slug: bestMatch.provinceSlug,
      },
      city: {
        name_fa: bestMatch.city.name_fa,
        name_en: bestMatch.city.name_en,
      },
    };
  }

  return null;
}

export function getLandlineInfo(number: string): LandlineInfo {
  const normalized = verifyAndNormalize(number);

  let prefix = "";
  if (normalized.startsWith("0")) {
    prefix = normalized.substring(0, 3);
  } else if (normalized.length === 10 && !normalized.startsWith("0")) {
    prefix = "0" + normalized.substring(0, 2);
  } else if (normalized.startsWith("+98")) {
    prefix = "0" + normalized.substring(3, 5);
  }

  /* @ts-expect-error — [TODO] Fix. */
  if (LANDLINE_PREFIXES[prefix]) {
    /* @ts-expect-error — [TODO] Fix. */
    return LANDLINE_PREFIXES[prefix];
  }

  return null;
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

export function isPostalCode(code: string): boolean {
  const normalized = verifyAndNormalize(code);
  return /^[1-9]\d{9}$/.test(normalized);
}

export function isLandline(code: string): boolean {
  const normalized = verifyAndNormalize(code);
  const regexValid = /^0\d{2}\d{8}$/.test(normalized);
  if (!regexValid) return false;

  const prefix = normalized.substring(0, 3);
  /* @ts-expect-error — [TODO] Fix. */
  return !!LANDLINE_PREFIXES[prefix];
}
