import { z } from "zod";
import {
  isMelliCode,
  isShenaseMelli,
  isPassport,
  isCardNumber,
  isIranianMobile,
  isSheba,
  isPostalCode,
  isLandline,
  verifyAndNormalize,
  getBankInfo,
  getMobileOperator,
} from "./utils";
import { getMessage, BaseOptions } from "./constants";

export const zMelliCode = (options?: BaseOptions) =>
  z.string().refine((val) => isMelliCode(val), {
    message: getMessage("melliCode", options),
  });

export const zShenaseMelli = (options?: BaseOptions) =>
  z.string().refine((val) => isShenaseMelli(val), {
    message: getMessage("shenaseMelli", options),
  });

export const zPassport = (options?: BaseOptions) =>
  z.string().refine((val) => isPassport(val), {
    message: getMessage("passport", options),
  });

export const zCardNumber = (options?: BaseOptions) =>
  z.string().refine((val) => isCardNumber(val), {
    message: getMessage("cardNumber", options),
  });

interface MobileOptions extends BaseOptions {
  strictZero?: boolean | "optional";
}

export const zIranianMobile = (options?: MobileOptions) =>
  z
    .string()
    .refine(
      (val) => isIranianMobile(val, { strictZero: options?.strictZero }),
      {
        message: getMessage("mobile", options),
      }
    );

export const zSheba = (options?: BaseOptions) =>
  z.string().refine((val) => isSheba(val), {
    message: getMessage("sheba", options),
  });

export const zPostalCode = (options?: BaseOptions) =>
  z.string().refine((val) => isPostalCode(val), {
    message: getMessage("postalCode", options),
  });

export const zLandline = (options?: BaseOptions) =>
  z.string().refine((val) => isLandline(val), {
    message: getMessage("landline", options),
  });

export const preprocessNumber = (schema: z.ZodTypeAny) =>
  z.preprocess((val) => {
    if (typeof val === "string") {
      return verifyAndNormalize(val);
    }
    return val;
  }, schema);

export {
  isMelliCode,
  isShenaseMelli,
  isPassport,
  isCardNumber,
  isIranianMobile,
  isSheba,
  isPostalCode,
  isLandline,
  verifyAndNormalize,
  getBankInfo,
  getMobileOperator,
};
