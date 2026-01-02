import { PLATE_CITY_CODES } from "../data/plateCityCodes.ts";
import { verifyAndNormalize } from "../utils/verifyAndNormalize.ts";

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
