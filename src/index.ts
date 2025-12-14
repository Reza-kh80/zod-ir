import { z } from "zod";
import {
  isMelliCode,
  isCardNumber,
  isIranianMobile,
  isSheba,
  isPostalCode,
  isLandline,
} from "./utils";
import { getMessage, BaseOptions } from "./constants";

export const zMelliCode = (options?: BaseOptions) =>
  z.string().refine((val) => isMelliCode(val), {
    message: getMessage("melliCode", options),
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

export {
  isMelliCode,
  isCardNumber,
  isIranianMobile,
  isSheba,
  isPostalCode,
  isLandline,
};
