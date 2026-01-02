import { BILL_TYPES } from "../data/constants.ts";
import { verifyAndNormalize } from "../utils/verifyAndNormalize.ts";

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
  const nBill = verifyAndNormalize(billId);
  if (!/^\d{6,13}$/.test(nBill)) return false;
  const checkDigit = parseInt(nBill.slice(-1));
  const core = nBill.slice(0, -1);
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
      const amountCore = nPay.slice(0, -5);
      if (amountCore.length > 0) {
        amount = parseInt(amountCore) * 1000;
        formattedAmount = new Intl.NumberFormat("fa-IR").format(amount);
      }
    }
  }
  return { type: typeInfo, amount, formattedAmount, isValid };
}
