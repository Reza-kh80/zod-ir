export const ERROR_MESSAGES = {
  fa: {
    melliCode: "کد ملی نامعتبر است",
    shenaseMelli: "شناسه ملی نامعتبر است",
    passport: "شماره گذرنامه نامعتبر است",
    cardNumber: "شماره کارت نامعتبر است",
    mobile: "شماره موبایل نامعتبر است",
    sheba: "شماره شبا نامعتبر است",
    postalCode: "کد پستی نامعتبر است",
    landline: "شماره تلفن ثابت نامعتبر است",
    billId: "شناسه قبض نامعتبر است",
    paymentId: "شناسه پرداخت نامعتبر است",
    plateNumber: "پلاک خودرو نامعتبر است",
    date: "تاریخ وارد شده نامعتبر است",
    financial: "شماره کارت یا شبا معتبر نیست"
  },
  en: {
    melliCode: "Invalid national code",
    shenaseMelli: "Invalid legal person ID (Shenase Melli)",
    passport: "Invalid passport number",
    cardNumber: "Invalid card number",
    mobile: "Invalid mobile number",
    sheba: "Invalid Sheba (IBAN) number",
    postalCode: "Invalid postal code",
    landline: "Invalid landline number",
    billId: "Invalid Bill ID",
    paymentId: "Invalid Payment ID",
    plateNumber: "Invalid License Plate",
    date: "Invalid Date",
    financial: "Invalid Sheba (IBAN) number or card number"
  },
} as const;

export type Language = keyof typeof ERROR_MESSAGES;

export interface BaseOptions {
  message?: string;
  locale?: Language;
}

export const getMessage = (
  key: keyof (typeof ERROR_MESSAGES)["fa"],
  options?: BaseOptions
): string => {
  if (options?.message) return options.message;
  const lang = options?.locale || "fa";
  return ERROR_MESSAGES[lang][key];
};
