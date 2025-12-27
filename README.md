<div align="center">
  <img src="zod-ir-logo.png" width="250"  alt="zod-ir logo" style="border-radius: 20px !important" />
  <p>
    <strong>The Ultimate Zod Utility for Iranian Data Structures</strong>
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
    <a href="https://github.com/Reza-kh80/zod-ir/stargazers">
      <img src="https://img.shields.io/github/stars/Reza-kh80/zod-ir?style=flat-square&label=stars&color=eab308" alt="GitHub stars" />
    </a>
    <a href="https://github.com/Reza-kh80/zod-ir/actions">
      <img src="https://img.shields.io/badge/tests-passing-2ea44f?style=flat-square" alt="Tests" />
    </a>
    <a href="https://zod.dev/?id=ecosystem">
      <img src="https://img.shields.io/badge/featured%20in-zod%20docs-3068b7?style=flat-square&logo=zod&logoColor=white" alt="Zod Ecosystem" />
    </a>
  </p>
</div>

<hr />

## Why zod-ir? 🚀

Building forms in Iran requires specific validations (National Code algorithm, Bank Card Luhn, etc.). `zod-ir` brings these natively into **Zod**, but goes beyond simple validation. It focuses on **Data Extraction** and **Developer Experience**.

### Key Features ✨

- 🧠 **Smart Extraction:** Don't just validate; extract metadata! (e.g., Get Bank Name from Card, City from Landline/Postal Code).
- 🛠 **Standalone & Reusable:** Use validators inside Zod schemas OR as standalone utility functions in your utils/backend.
- ⚡ **Zero Dependencies:** No heavy dependencies. Lightweight and Tree-shakeable.
- 🔗 **Peer Dependency Architecture:** Fully compatible with your existing Zod version (v3+).
- 🧪 **Battle-Tested:** 100% Test Coverage for critical algorithms (National Code, IBAN, etc.).

### Feature Highlights

- **Smart Financial:** Auto-detects **Card Number** vs **Sheba (IBAN)** and returns Bank Info & Logo.
- **Jalali Date:** Validates Persian dates with precise **Leap Year (Kabise)** calculation.
- **Crypto Support:** Native validation for **TRC20**, **ERC20**, and **Bitcoin** (No extra libs).
- **Vehicle:** Validates License Plates and detects **Province/City**.
- **Contact:** Mobile (MCI, Irancell...), **Landline (New ✨)**, Postal Code (with **Smart City Detection**).

---

## Installation 📦

```bash
npm install zod zod-ir
# or
pnpm add zod zod-ir
# or
yarn add zod zod-ir
```

## Usage: Standalone Mode (Utilities) 🛠️

You don't need to use Zod! zod-ir exports all validation logic as pure functions. Perfect for backend utilities or non-form logic.

```typescript
import { isMelliCode, getBankInfo, getLandlineInfo } from "zod-ir";

// 1. Validate National Code anywhere
if (isMelliCode("0023456789")) {
  console.log("Valid user!");
}

// 2. Get Bank Details directly
const bank = getBankInfo("6219861012345678");
console.log(bank.name); // "Saman"
console.log(bank.color); // "#46a0e6"

// 3. Extract Location from Phone
const location = getLandlineInfo("02122334455");
console.log(location.province_fa); // "تهران"
```

## Usage: Zod Schema Mode 💡

1. Smart Contact & Address (New 🌟)

   Validate Landlines and Postal Codes, and automatically extract Province/City in both Persian and English.

```typescript
import { z } from "zod";
import {
  zLandline,
  zPostalCode,
  getLandlineInfo,
  getPostalCodeInfo,
} from "zod-ir";

// 1. Validation Schema
const schema = z.object({
  phone: zLandline({ message: "Invalid landline number" }),
  zip: zPostalCode(),
});

// 2. Extract Metadata from Landline
const phoneInfo = getLandlineInfo("02122334455");
/* Output:
{
  province: "Tehran",
  city: "Tehran",
  province_fa: "تهران",
  city_fa: "تهران"
}
*/

// 3. Extract Metadata from Postal Code (Smart Range Matching)
const zipInfo = getPostalCodeInfo("8391853612");
/* Output:
{
  province: { name: "اصفهان", slug: "Isfahan" },
  city: { name_fa: "نائین", name_en: "Naein" }
}
*/
```

2. Smart Financial Validation (New 🌟)

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

3. Crypto Wallet Validation

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

4. Jalali Date Validation

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

5. Comprehensive Form Example

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
| `getLandlineInfo(num)` | `{ province, city... }` | Returns Province/City (FA & EN) for landlines. |
| `getPostalCodeInfo(code)` | `{ province, city }` | Returns Province/City based on postal code. |

## API Reference 📚

Identity & Contact
| Validator | Description |
| :----------------- | :----------------------------------------------------------------- |
| `zMelliCode` | National Code (Code Melli) |
| `zShenaseMelli` | Legal Person ID (Company) |
| `zPassport` | Iranian Passport |
| `zIranianMobile` | Mobile (09xx, +989xx) |
| `zPostalCode` | 10-digit Postal Code |
| `zLandline` | Landline Phone (021xx...) |

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
git clone [https://github.com/Reza-kh80/zod-ir.git](https://github.com/Reza-kh80/zod-ir.git)
pnpm install
pnpm test
```

## Credits 🙏

- Bank and Operator logos are courtesy of [Zegond's Logos Project](https://github.com/zegond).

## Support

`zod-ir` is an open-source project and free to use. If it saved you some time and you'd like to say thanks, you can support its development via crypto. It's completely optional but highly appreciated!

- **USDT (TRC20) / TRX:** `TWtnFa4xpvH9BvciSzw4hqXUDCibWhcYxX`
- **Bitcoin:** `bc1qf2ry7mpnvncwapgu0al3wkxm4jxecac3s3pmf0`

## License

MIT
