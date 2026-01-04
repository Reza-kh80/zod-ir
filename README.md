<div align="center">
  <img src="zod-ir-logo.png" width="250"  alt="zod-ir logo" />

  <h1>The Ultimate Zod Utility for Iranian Data Structures</h1>
  <p>
    Validation for national code, bank cards, Sheba, bills, license plates, crypto, etc.
    <br />
    Lightweight • Zero Dependencies • Type-safe.
  </p>

  <div>
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
  </div>
</div>

<br />

## Why zod-ir? 🚀
Building forms for Iranian applications often involves validating specific local data structures like national codes, bank cards, and Sheba numbers. `zod-ir` seamlessly integrates these validations into **Zod**, while also offering powerful **Data Extraction** tools and a superior **Developer Experience**.

### Key Features ✨
- 🧠 **Smart Extraction:** go beyound validation and extract metadata. (get bank name from card number and city from landline/postal code).
- 🛠 **Standalone & Reusable:** Use validators either inside Zod schemas or as standalone utility functions.
- ⚡ **Zero Dependencies:** No heavy dependencies— lightweight and tree-shakeable.
- 🔗 **Compatibility:** Fully compatible with your existing Zod version (v3 and v4).
- 🧪 **Battle-Tested:** 100% test coverage for critical algorithms (national code, IBAN, etc.).

### Feature Highlights 🌟
- **Smart Financial:** auto-detects **card number** vs. **Sheba (IBAN)** and returns the corresponding bank info and logo.
- **Jalali Date:** validates Persian dates with precise **Leap Year (Kabisa)** calculation.
- **Crypto Support:** native validation for **TRC20**, **ERC20**, and **Bitcoin**.
- **Vehicle:** validates license plates and detects **province/city**.
- **Contact:** smartly detect the phone number operator (MCI, Irancell), **landline**, and postal code (smart city detection).

---

## Installation 📦
```bash
npm install zod zod-ir
# or
pnpm add zod zod-ir
# or
yarn add zod zod-ir
```

## Usage: Standalone Mode (Utilities) ⚒️
You don't need to use Zod! zod-ir exports all validation logic as pure functions—perfect for backend utilities or non-form logic.

```typescript
import { isMelliCode, getBankInfo, getLandlineInfo } from 'zod-ir';

// Validate national code anywhere
if (isMelliCode('0023456789')) {
  console.log('Valid user.');
}

// Extract details from bank card number
const bank = getBankInfo('6219861012345678');
console.log(bank.name); // "Saman"
console.log(bank.color); // "#46a0e6"

// Extract location from landline phone number
const location = getLandlineInfo('02122334455');
console.log(location.province_fa); // "تهران"
```

## Usage: Zod Schema Mode 💡

1. Smart Contact and Address <br />
Validate landlines and postal codes, and automatically extract province/city in both Persian and English.

```typescript
import * as z from 'zod';
import { zLandline, zPostalCode, getLandlineInfo, getPostalCodeInfo } from 'zod-ir';

const ValidationSchema = z.object({
  phone: zLandline({ message: 'Invalid landline number.' }),
  zip: zPostalCode(),
});

const phoneInfo = getLandlineInfo('02122334455');
console.log(phoneInfo);
/*
  {
    province: "Tehran",
    city: "Tehran",
    province_fa: "تهران",
    city_fa: "تهران"
  }
*/

// Extract metadata from postal code (smart range matching)
const zipInfo = getPostalCodeInfo('8391853612');
/*
  {
    province: { name: "اصفهان", slug: "Isfahan" },
    city: { name_fa: "نائین", name_en: "Naein" }
  }
*/
```

2. Smart Financial Validation <br />
Don't ask users for either card number or Sheba—use `zFinancial` to accept both!

```typescript
import * as z from 'zod';
import { zFinancial, getFinancialInfo } from 'zod-ir';

const ValidationSchema = z.object({
  destination: zFinancial({  message: 'Invalid card number or Sheba.' }),
});

// Extract metadata (bank name, Logo, type)
const info = getFinancialInfo('6037991155667788');
// OR
const infoSheba = getFinancialInfo('IR120170000000123456789012');

console.log(info);
/*
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

3. Crypto Wallet Validation <br />
Perfect for Fintech and exchange apps. Supports TRC20 (USDT), ERC20, and BTC.

```typescript
import { zCrypto, getCryptoInfo } from 'zod-ir';

const ValidationSchema = z.object({
  // Accept any valid wallet (TRX, ETH, BTC)
  anyWallet: zCrypto(),

  // Strict: only accept Tether (TRC20)
  usdtWallet: zCrypto({
    ticker: 'TRX',
    message: 'Only TRC20 addresses are allowed.',
  }),
});

const details = getCryptoInfo('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');
console.log(details);
/*
  {
    ticker: "TRX",
    network: "TRC20",
    isValid: true
  }
*/
```

4. Jalali Date Validation <br />
Validates Persian dates mathematically, checking days in each month and leap years.

```typescript
import { zJalaliDate } from 'zod-ir';

const ValidationSchema = z.object({
  birthDate: zJalaliDate({ message: 'Invalid date.' }),
});

// ✅ Valid (Leap Year)
ValidationSchema.parse({ birthDate: '1403/12/30' });

// ❌ Invalid (1402 is not a Leap Year)
ValidationSchema.parse({ birthDate: '1402/12/30' });
```

5. Comprehensive Form Example <br />
A full registration form handling Auto-fix (Persian digits), Mobile, and National Code.

```typescript
import * as z from 'zod';
import {
  zMelliCode,
  zIranianMobile,
  zCardNumber,
  zBillId,
  zPaymentId,
  zPlateNumber,
  preprocessNumber, // Converts "۱۲۳" to 123
} from 'zod-ir';

const UserSchema = z.object({
  // Auto-convert Persian digits before validation
  nationalCode: preprocessNumber(zMelliCode()),

  mobile: zIranianMobile({ strictZero: true }),
  card: zCardNumber(),
  plate: zPlateNumber(), // e.g., "12م345-11"

  // Utility Bill
  billId: zBillId(),
  paymentId: zPaymentId(),
});
```

6. Smart Currency ₿ <br />
Automatically validates, parses, and formats currency input. It handles Persian text, numbers, and formatted strings (mixed).

```typescript
import { zToman, transformToCurrency, numberToText } from 'zod-ir';

const ValidationSchema = z.object({
  // Accepts inputs such as "2.5 میلیون" ,"2,500,000" ,"دو میلیون و پانصد"
  price: zToman({
    min: 1000,
    max: 50_000_000,
    message: 'Amount must be between 1,000 and 50 Million Tomans.',
  }),
});

// --- Utility Functions for UI ---

// Convert text/mixed to number (useful for database storage)
console.log(transformToCurrency('2 میلیون و پانصد')); // 2500000
console.log(transformToCurrency('سی صد')); // 300 (Auto-fixes typos)

// Convert number to Persian text (useful for UI display)
console.log(numberToText(2500000)); // "دو میلیون و پانصد هزار"
```

## Metadata Helpers 🛠️
zod-ir isn't just for validation—it also provides rich metadata for your UI.
| Function                  | Return Type                  | Description                                            |
| :------------------------ | :--------------------------- | ------------------------------------------------------ |
| `getFinancialInfo(val)`   | `{ type, bank, isValid }`    | Smart! Detects card or Sheba, returns bank logo/color. |
| `getBankInfo(card)`       | `{ name, label, logo, ... }` | Details for card numbers.                              |
| `getCryptoInfo(addr)`     | `{ ticker, network }`        | Detects TRC20, ERC20, and BTC networks.                |
| `getMobileOperator(num)`  | `{ name, label, logo }`      | Returns the operator (MCI, Irancell) and the Logo.     |
| `getBillInfo(id, payId)`  | `{ type, amount, ... }`      | Bill type (water, gas), amount calculation, validity.  |
| `getPlateInfo(plate)`     | `{ province, city }`         | Province and city of the license plate.                |
| `getJalaliDateInfo(date)` | `{ year, month, isLeap }`    | Deconstructs Jalali date and checks for Leap Years.    |
| `getLandlineInfo(num)`    | `{ province, city, ... }`    | Returns province/city (FA & EN) for landlines.         |
| `getPostalCodeInfo(code)` | `{ province, city }`         | Returns province/city based on the postal code.        |

## API Reference 📚
Identity & Contact
| Validator        | Description                      |
| :--------------- | :------------------------------- |
| `zMelliCode`     | National code (Melli code)       |
| `zShenaseMelli`  | Legal person ID (company)        |
| `zPassport`      | Iranian passport                 |
| `zIranianMobile` | Mobile number (09xx, +989xx)     |
| `zPostalCode`    | 10-digit postal code             |
| `zLandline`      | Landline phone number (021xx...) |

Financial & Assets
| Validator | Description |
| :------------- | :----------------------------------------- |
| `zFinancial`   | Smart input (card number or Sheba)         |
| `zCardNumber`  | Bank card number (16 digits)               |
| `zSheba`       | IBAN (Sheba)                               |
| `zCrypto`      | Crypto wallet (TRX, ETH, BTC)              |
| `zBillId`      | Utility bill ID                            |
| `zPaymentId`   | Utility payment ID                         |
| `zPlateNumber` | Vehicle license plate                      |
| `zJalaliDate`  | Persian date (YYYY/MM/DD)                  |
| `zToman`       | Automatically validates the currency input |

## Versining Policy 🏷️
This project adheres to [The Semantic Versioning Standard](https://semver.org).

## Contributing 🤝🏻
Any form of contribution is always appreciated! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## Credits 🙏🏻
Bank and operator logos are courtesy of [Zegond's Logos Project](https://github.com/zegond).

## Funding 🌱
`zod-ir` is an open-source project and free to use. If it saved you some time and you'd like to say thanks, you can support its development via crypto currency transactions. It's completely optional and highly appreciated!
- **USDT (TRC20) / TRX:** `TWtnFa4xpvH9BvciSzw4hqXUDCibWhcYxX`
- **Bitcoin:** `bc1qf2ry7mpnvncwapgu0al3wkxm4jxecac3s3pmf0`

## License 📃
[MIT](LICENSE) License © 2026-PRESENT — [Reza Kheradmandi](https://github.com/Reza-kh80)
