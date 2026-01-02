const ERROR_MESSAGES = {
  fa: {
    melliCode: 'کد ملی نامعتبر است',
    shenaseMelli: 'شناسه ملی نامعتبر است',
    passport: 'شماره گذرنامه نامعتبر است',
    cardNumber: 'شماره کارت نامعتبر است',
    mobile: 'شماره موبایل نامعتبر است',
    sheba: 'شماره شبا نامعتبر است',
    postalCode: 'کد پستی نامعتبر است',
    landline: 'شماره تلفن ثابت نامعتبر است',
    billId: 'شناسه قبض نامعتبر است',
    paymentId: 'شناسه پرداخت نامعتبر است',
    plateNumber: 'پلاک خودرو نامعتبر است',
    date: 'تاریخ وارد شده نامعتبر است',
    financial: 'شماره کارت یا شبا معتبر نیست',
    crypto: 'آدرس کیف پول معتبر نیست',
    currency: 'فرمت مبلغ وارد شده صحیح نیست',
    currencyMin: 'مبلغ کمتر از حد مجاز است',
    currencyMax: 'مبلغ بیشتر از حد مجاز است',
  },
  en: {
    melliCode: 'Invalid national code',
    shenaseMelli: 'Invalid legal person ID (Shenase Melli)',
    passport: 'Invalid passport number',
    cardNumber: 'Invalid card number',
    mobile: 'Invalid mobile number',
    sheba: 'Invalid Sheba (IBAN) number',
    postalCode: 'Invalid postal code',
    landline: 'Invalid landline number',
    billId: 'Invalid Bill ID',
    paymentId: 'Invalid Payment ID',
    plateNumber: 'Invalid License Plate',
    date: 'Invalid Date',
    financial: 'Invalid Sheba (IBAN) number or card number',
    crypto: 'Invalid Wallet address',
    currency: 'Invalid currency format',
    currencyMin: 'Amount is below the minimum limit',
    currencyMax: 'Amount exceeds the maximum limit',
  },
} as const;

type Language = keyof typeof ERROR_MESSAGES;
type Key = keyof (typeof ERROR_MESSAGES)['fa'];

interface BaseOptions {
  message?: string,
  locale?: Language,
}

function getMessage(key: Key, options?: BaseOptions): string {
  if (options?.message) {
    return options.message;
  }

  const lang = options?.locale ?? 'fa';
  return ERROR_MESSAGES[lang][key];
}

export { getMessage, ERROR_MESSAGES };
export type { Language, BaseOptions };
