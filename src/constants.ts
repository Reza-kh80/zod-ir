export const ERROR_MESSAGES = {
  fa: {
    melliCode: "کد ملی نامعتبر است",
    cardNumber: "شماره کارت نامعتبر است",
    mobile: "شماره موبایل نامعتبر است",
    sheba: "شماره شبا نامعتبر است",
    postalCode: "کد پستی نامعتبر است",
    landline: "شماره تلفن ثابت نامعتبر است",
  },
  en: {
    melliCode: "Invalid national code",
    cardNumber: "Invalid card number",
    mobile: "Invalid mobile number",
    sheba: "Invalid Sheba (IBAN) number",
    postalCode: "Invalid postal code",
    landline: "Invalid landline number",
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
