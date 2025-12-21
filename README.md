<div align="center">
  <img src="zod-ir-logo.png" width="120" alt="zod-ir logo" style="border-radius: 15px" />
  <h1>zod-ir</h1>
  <p>
    <strong>The Ultimate Zod Extension for Iranian Data Structures</strong>
  </p>
  <p>
    Validation for National Code, Bank Cards, Sheba, Bills, License Plates, Crypto, and more.
    <br />
    Lightweight. Zero Dependencies. Type-Safe.
  </p>
  
  <p>
    <a href="https://www.npmjs.com/package/zod-ir">
      <img src="https://img.shields.io/npm/v/zod-ir?style=flat-square&color=3b82f6" alt="npm version" />
    </a>
    <a href="https://bundlephobia.com/result?p=zod-ir">
      <img src="https://img.shields.io/bundlephobia/minzip/zod-ir?style=flat-square&color=10b981" alt="bundle size" />
    </a>
    <a href="https://github.com/Reza-kh80/zod-ir/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/zod-ir?style=flat-square&color=f59e0b" alt="license" />
    </a>
  </p>
</div>

<hr />

## Why zod-ir? 🚀

Building forms in Iran requires specific validations (National Code algorithm, Bank Card Luhn, etc.). `zod-ir` brings these natively into **Zod**, with added superpowers like **Metadata Extraction** (Bank Names, Logos, Bill Types).

### Key Features ✨

- 🧠 **Smart Financial Validation:** Auto-detects **Card Number** vs **Sheba (IBAN)** and returns Bank Info & Logo.
- 📅 **Jalali Date (Solar Hijri):** Validates Persian dates with precise **Leap Year (Kabise)** calculation.
- 💎 **Crypto Support:** Validates **TRC20 (Tether)**, **ERC20**, and **Bitcoin** addresses.
- 💳 **Banking:** Validates Card Numbers & Sheba (ISO 7064).
- 🚗 **Vehicle:** Validates License Plates and detects **Province/City**.
- 🧾 **Utility Bills:** Validates Bill ID/Payment ID and calculates the **Amount**.
- 🆔 **Identity:** National Code (Melli Code), Legal Person ID (Shenase Melli), Passport.
- 📱 **Contact:** Mobile (MCI, Irancell...), Landline, Postal Code.

---

## Installation 📦

```bash
npm install zod zod-ir
# or
pnpm add zod zod-ir
# or
yarn add zod zod-ir
```

## Usage Examples 💡

1. Smart Financial Validation (New 🌟)

   Don't ask users for "Card" or "Sheba" separately. Use zFinancial to accept both!

```typescript
import { z } from "zod";
import { zFinancial, getFinancialInfo } from "zod-ir";

// 1. Validation Schema
const schema = z.object({
  destination: zFinancial({ message: "Invalid Card or Sheba" }),
});

// 2. Extract Metadata (Bank Name, Logo, Type)
const info = getFinancialInfo("6037991155667788");
// OR
const infoSheba = getFinancialInfo("IR120170000000123456789012");

console.log(info);
/* Output:
{
  type: "card", // or "sheba"
  isValid: true,
  bank: {
    name: "Melli",
    label: "ملی",
    color: "#EF3F3E",
    logo: "https://.../melli.svg",
    formatted: "6037-9911-..."
  }
}
*/
```

2. Crypto Wallet Validation (New 💎)

   Perfect for Fintech and Exchange apps. Supports TRC20 (USDT), ERC20, and BTC.

```typescript
import { zCrypto, getCryptoInfo } from "zod-ir";

const schema = z.object({
  // Accept any valid wallet (TRX, ETH, BTC)
  anyWallet: zCrypto(),

  // Strict: Accept ONLY Tether (TRC20)
  usdtWallet: zCrypto({
    ticker: "TRX",
    message: "Only TRC20 addresses allowed",
  }),
});

const details = getCryptoInfo("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
/* Output:
{
  ticker: "TRX",
  network: "TRC20",
  isValid: true
}
*/
```

3. Jalali Date Validation (New 📅)

   Validates Persian dates mathematically (checking days in month & leap years).

```typescript
import { zJalaliDate } from "zod-ir";

const schema = z.object({
  birthDate: zJalaliDate({ message: "Invalid date" }),
});

// ✅ Valid (Leap year)
schema.parse({ birthDate: "1403/12/30" });

// ❌ Invalid (1402 is not a leap year)
schema.parse({ birthDate: "1402/12/30" });
```

4. Comprehensive Form Example

   A full registration form handling Auto-fix (Persian digits), Mobile, and National Code.

```typescript
import { z } from "zod";
import {
  zMelliCode,
  zIranianMobile,
  zCardNumber,
  zBillId,
  zPaymentId,
  zPlateNumber,
  preprocessNumber, // Converts ۱۲۳ -> 123
} from "zod-ir";

const UserSchema = z.object({
  // Auto-convert Persian digits before validation
  nationalCode: preprocessNumber(zMelliCode()),

  mobile: zIranianMobile({ strictZero: true }),
  card: zCardNumber(),
  plate: zPlateNumber(), // e.g. 12م345-11

  // Utility Bill
  billId: zBillId(),
  paymentId: zPaymentId(),
});
```

## Metadata Helpers 🛠️

zod-ir isn't just for validation. It provides rich metadata for your UI.
| Function | Return Type | Description |
| :--------------------------- | :------------------------------------------- | ------------------------------------------------------------------------------ |
| `getFinancialInfo(val)` | `{ type, bank, isValid }` | Smart! Detects Card or Sheba, returns Bank Logo/Color. |
| `getBankInfo(card)` | `{ name, label, logo... }` | Details for Card Numbers. |
| `getCryptoInfo(addr)` | `{ ticker, network }` | Detects TRC20, ERC20, BTC networks. |
| `getMobileOperator(num)` | `{ name, label, logo }` | Returns Operator (MCI, Irancell...) & Logo. |
| `getBillInfo(id, payId)` | `{ type, amount... }` | Bill Type (Water/Gas), Amount calculation, Validity. |
| `getPlateInfo(plate)` | `{ province, city }` | Province and City of the license plate. |
| `getJalaliDateInfo(date)` | `{ year, month, isLeap }` | Deconstructs Jalali date & checks leap year. |

## API Reference 📚

Identity & Contact
| Validator | Description |
| :----------------- | :----------------------------------------------------------------- |
| `zMelliCode` | National Code (Code Melli) |
| `zShenaseMelli` | Legal Person ID (Company) |
| `zPassport` | Iranian Passport |
| `zIranianMobile` | Mobile (09xx, +989xx) |
| `zPostalCode` | 10-digit Postal Code |

Financial & Assets
| Validator | Description |
| :----------------- | :----------------------------------------------------------------- |
| `zFinancial` | Smart Input (Card OR Sheba) |
| `zCardNumber` | Bank Card Number (16 digits) |
| `zSheba` | IBAN (Sheba) |
| `zCrypto` | Crypto Wallet (TRX, ETH, BTC) |
| `zBillId` | Utility Bill ID |
| `zPaymentId` | Utility Payment ID |
| `zPlateNumber` | Vehicle License Plate |
| `zJalaliDate` | Persian Date (YYYY/MM/DD) |

## Contributing

Contributions are welcome! This project uses PNPM.

```bash
git clone https://github.com/Reza-kh80/zod-ir.git
pnpm install
pnpm test
```

## Credits 🙏

- Bank and Operator logos are courtesy of [Zegond's Logos Project](https://github.com/zegond).

## License

MIT
