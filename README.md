<div align="center">
  <h1>zod-ir</h1>
  <p>
    <strong>Comprehensive Zod validations for Iranian data structures</strong>
  </p>
  <p>
    A lightweight, TypeScript-first extension for Zod.
    <br />
    Compatible with React Hook Form, Next.js, NestJS, and Node.js.
  </p>
  
  <p>
    <a href="https://www.npmjs.com/package/zod-ir">
      <img src="https://img.shields.io/npm/v/zod-ir?style=flat-square&color=blue" alt="npm version" />
    </a>
    <a href="https://bundlephobia.com/result?p=zod-ir">
      <img src="https://img.shields.io/bundlephobia/minzip/zod-ir?style=flat-square&color=green" alt="bundle size" />
    </a>
    <a href="https://github.com/Reza-kh80/zod-ir/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/zod-ir?style=flat-square&color=orange" alt="license" />
    </a>
  </p>
</div>

<hr />

## Features ✨

- ✅ **National Code:** Validates using the official checksum algorithm.
- 🏢 **Shenase Melli:** Validates Legal Person ID (Company ID).
- 💳 **Bank Card:** Validates 16-digit card numbers (Luhn algorithm).
- 📱 **Mobile Number:** Validates `09xx`, `+989xx`, `9xx`.
- 🏦 **Sheba (IBAN):** Validates structure and checksum (ISO 7064).
- ✈️ **Passport:** Validates Iranian Passport numbers.
- 📮 **Postal Code:** Validates 10-digit Iranian postal codes.
- ☎️ **Landline:** Validates fixed line numbers with area codes.
- 🔄 **Auto-fix Digits:** Automatically converts Persian/Arabic digits and characters (ي, ك) to standard format.
- 🎨 **Metadata Extraction:** Extract **Bank Name/Color** from card numbers and **Operator Name** from mobiles.
- 🌍 **Bilingual:** Built-in error messages in **Persian** and **English**.

---

## Installation 📦

```bash
npm install zod zod-ir
# or
yarn add zod zod-ir
```

## Usage 🚀

1. Basic Validation & Auto-Fix
   This example shows how to validate a form and automatically convert Persian digits (e.g., ۰۹۱۲) to English.

```typescript
import { z } from "zod";
import {
  zMelliCode,
  zShenaseMelli,
  zIranianMobile,
  zCardNumber,
  zSheba,
  zPassport,
  preprocessNumber,
} from "zod-ir";

const UserSchema = z.object({
  // 1. National Code with Auto-Fix (Converts ۱۲۳ -> 123)
  nationalCode: preprocessNumber(zMelliCode()),

  // 2. Company ID (Shenase Melli)
  companyId: zShenaseMelli({ message: "شناسه ملی نامعتبر است" }),

  // 3. Mobile (Strict Mode: Must start with 0)
  mobile: zIranianMobile({ strictZero: true }),

  // 4. Bank Card
  card: zCardNumber(),

  // 5. Sheba (IBAN) - English Error
  iban: zSheba({ locale: "en" }),

  // 6. Passport
  passport: zPassport(),
});

// Example Usage
try {
  const result = UserSchema.parse({
    nationalCode: "۱۲۳۴۵۶۷۸۹۱", // User typed in Farsi
    companyId: "10100448712",
    mobile: "09121234567",
    card: "6362147010005732",
    iban: "IR330620000000202901868005",
    passport: "A12345678",
  });
  console.log("Valid Data:", result);
} catch (err) {
  console.log(err);
}
```

2. Extracting Metadata (New ✨)
   You can extract useful information like Bank Name, Brand Color, or Mobile Operator directly from your validated data.

```typescript
import { getBankInfo, getMobileOperator } from "zod-ir";

// --- Bank Info ---
const bank = getBankInfo("6037991155667788");
if (bank) {
  console.log(bank.name); // "Melli"
  console.log(bank.label); // "ملی"
  console.log(bank.color); // "#EF3F3E" (Great for UI backgrounds!)
  console.log(bank.formatted); // "6037-9911-5566-7788"
}

// --- Mobile Operator ---
const operator = getMobileOperator("09121234567");
if (operator) {
  console.log(operator.label); // "همراه اول"
}
```

3. Usage with React Hook Form 📋

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { zMelliCode, preprocessNumber } from "zod-ir";

const schema = z.object({
  // Automatically fixes Persian digits typed by user
  nationalId: preprocessNumber(zMelliCode({ message: "کد ملی صحیح نیست" })),
});

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input
        {...register("nationalId")}
        placeholder="کد ملی (حتی فارسی)"
        dir="auto"
      />
      <p style={{ color: "red" }}>{errors.nationalId?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## API Reference 📚

| Validator          | Description                                                        |
| :----------------- | :----------------------------------------------------------------- |
| `zMelliCode`       | Validates Iranian National Code (Melli Code).                      |
| `zShenaseMelli`    | Validates Legal Person ID (Company ID).                            |
| `zCardNumber`      | Validates 16-digit bank card numbers (Luhn).                       |
| `zIranianMobile`   | Validates Iranian mobile numbers.                                  |
| `zSheba`           | Validates IBAN (Sheba) structure and checksum.                     |
| `zPassport`        | Validates Iranian Passport numbers.                                |
| `zPostalCode`      | Validates 10-digit Iranian postal codes.                           |
| `zLandline`        | Validates landline phone numbers with area codes.                  |
| `preprocessNumber` | Utility: Wraps any validator to convert Persian digits to English. |

#### Options Interface

All validators accept an optional configuration object to customize behavior.

| Name         | Type                  | Description                                                |
| :----------- | :-------------------- | :--------------------------------------------------------- |
| `message`    | `string`              | Custom error message to display when validation fails.     |
| `locale`     | `"fa"`, `"en"`        | Language for the default error message (defaults to "fa"). |
| `strictZero` | `boolean`, `optional` | (Mobile Only) If true, input must start with 0.            |

## Metadata Helpers (New)

| Function                    | Return Type                               | Description                                                                    |
| :-------------------------- | :---------------------------------------- | ------------------------------------------------------------------------------ |
| `getBankInfo(card)`         | `{ name, label, color, logo, formatted }` | Returns bank details including **Logo URL** from card number.number.           |
| `getMobileOperator(mobile)` | `{ name, label, logo }`                   | Returns operator (MCI, Irancell...) including **Logo URL** from mobile number. |
| `verifyAndNormalize(str)`   | `string`                                  | Converts Persian/Arabic digits & chars (ي, ك) to standard English.             |

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

This project uses PNPM. To get started, clone the repo and run:
```bash
pnpm install
```

## Credits 🙏

- Bank and Operator logos are courtesy of [Zegond's Logos Project](https://github.com/zegond).

## License

MIT
