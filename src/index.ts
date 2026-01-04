import type { BillInfo } from './modules/bill.ts';
import type { CryptoInfo } from './modules/crypto.ts';
import type { PlateInfo } from './modules/vehicle.ts';
import type { JalaliDateInfo } from './modules/date.ts';
import type { BaseOptions } from './utils/getMessage.ts';
import type { BankInfo, FinancialInfo } from './modules/financial.ts';
import type { LandlineInfo, OperatorInfo, PostalCodeInfo } from './modules/contact.ts';

import * as z from 'zod';

import {
  isLandline,
  isPostalCode,
  getLandlineInfo,
  isIranianMobile,
  getMobileOperator,
  getPostalCodeInfo,
} from './modules/contact.ts';
import { getMessage } from './utils/getMessage.ts';
import { getPlateInfo, isPlateNumber } from './modules/vehicle.ts';
import { verifyAndNormalize } from './utils/verifyAndNormalize.ts';
import { isJalaliDate, getJalaliDateInfo } from './modules/date.ts';
import { getCryptoInfo, isCryptoAddress } from './modules/crypto.ts';
import { isPassport, isMelliCode, isShenaseMelli } from './modules/identity.ts';
import { getBillInfo, isBillIdValid, isPaymentIdValid } from './modules/bill.ts';
import { numberToText, formatCurrency, transformToCurrency } from './modules/currency.ts';
import { isSheba, getBankInfo, isCardNumber, getFinancialInfo, isFinancialValue } from './modules/financial.ts';

interface CryptoOptions extends BaseOptions {
  ticker?: 'BTC' | 'ETH' | 'TRX',
}

export function zMelliCode(options?: BaseOptions) {
  return z.string().refine((val) => isMelliCode(val), {
    error: getMessage('melliCode', options),
  });
}

export function zShenaseMelli(options?: BaseOptions) {
  return z.string().refine((val) => isShenaseMelli(val), {
    error: getMessage('shenaseMelli', options),
  });
}

export function zPassport(options?: BaseOptions) {
  return z.string().refine((val) => isPassport(val), {
    error: getMessage('passport', options),
  });
}

export function zCardNumber(options?: BaseOptions) {
  return z.string().refine((val) => isCardNumber(val), {
    error: getMessage('cardNumber', options),
  });
}

export function zToman(options?: BaseOptions & { min?: number, max?: number }) {
  return z.preprocess(
    (val) => (typeof val === 'string' || typeof val === 'number'
      ? transformToCurrency(val)
      : val),
      z
      /* @ts-expect-error [TODO] Fix. */
      .number({ invalid_type_error: getMessage('currency', options) })
      .min(options?.min ?? 0, getMessage('currencyMin', options))
      .max(
        options?.max ?? Number.MAX_SAFE_INTEGER,
        getMessage('currencyMax', options),
      ),
  );
}

export const zRial = zToman;

export function zCurrencyRich(options?: BaseOptions & { min?: number, max?: number }) {
  return z
    .string()
    .or(z.number())
    .transform((val, ctx) => {
      const num = transformToCurrency(val);

      if (num === null || isNaN(num)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: getMessage('currency', options),
        });
        return z.NEVER;
      }

      if (options?.min !== undefined && num < options.min) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: getMessage('currencyMin', options),
        });
      }

      if (options?.max !== undefined && num > options.max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: getMessage('currencyMax', options),
        });
      }

      return {
        value: num,
        formatted: formatCurrency(num),
        text: numberToText(num),
      };
    });
}

interface MobileOptions extends BaseOptions {
  strictZero?: boolean | 'optional',
}

export function zIranianMobile(options?: MobileOptions) {
  return z
    .string()
    .refine(
      (val) => isIranianMobile(val, { strictZero: options?.strictZero }),
      { error: getMessage('mobile', options) },
    );
}

export function zSheba(options?: BaseOptions) {
  return z.string().refine((val) => isSheba(val), {
    error: getMessage('sheba', options),
  });
}

export function zPostalCode(options?: BaseOptions) {
  return z.string().refine((val) => isPostalCode(val), {
    error: getMessage('postalCode', options),
  });
}

export function zLandline(options?: BaseOptions) {
  return z.string().refine((val) => isLandline(val), {
    error: getMessage('landline', options),
  });
}

export function zBillId(options?: BaseOptions) {
  return z.string().refine((val) => isBillIdValid(val), {
    error: getMessage('billId', options),
  });
}

export function zPaymentId(options?: BaseOptions) {
  return z.string().refine((val) => val.length >= 6 && val.length <= 13, {
    error: getMessage('paymentId', options),
  });
}

export function zPlateNumber(options?: BaseOptions) {
  return z.string().refine((val) => isPlateNumber(val), {
    error: getMessage('plateNumber', options),
  });
}

export function zJalaliDate(options?: BaseOptions) {
  return z.string().refine((val) => isJalaliDate(val), {
    error: getMessage('date', options),
  });
}

export function zFinancial(options?: BaseOptions) {
  return z.string().refine((val) => isFinancialValue(val), {
    error: getMessage('financial', options),
  });
}

export function zCrypto(options?: CryptoOptions) {
  return z.string().refine((val) => isCryptoAddress(val, options?.ticker), {
    error: getMessage('crypto', options),
  });
}

export function preprocessNumber(schema: z.ZodTypeAny) {
  return z.preprocess((val) => {
    if (typeof val === 'string') {
      return verifyAndNormalize(val);
    }

    return val;
  }, schema);
}

export {
  isSheba,
  isLandline,
  isPassport,
  getBankInfo,
  getBillInfo,
  isMelliCode,
  getPlateInfo,
  isCardNumber,
  isJalaliDate,
  isPostalCode,
  numberToText,
  getCryptoInfo,
  isBillIdValid,
  isPlateNumber,
  formatCurrency,
  isShenaseMelli,
  getLandlineInfo,
  isCryptoAddress,
  isIranianMobile,
  getFinancialInfo,
  isFinancialValue,
  isPaymentIdValid,
  getJalaliDateInfo,
  getMobileOperator,
  getPostalCodeInfo,
  verifyAndNormalize,
  transformToCurrency,
};
export type {
  BankInfo,
  BillInfo,
  PlateInfo,
  CryptoInfo,
  BaseOptions,
  LandlineInfo,
  OperatorInfo,
  FinancialInfo,
  JalaliDateInfo,
  PostalCodeInfo,
};
