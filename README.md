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
- 🔄 **Auto-fix Digits:** Helper to automatically convert Persian/Arabic digits to English.
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

2. Usage with React Hook Form 📋

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

## License

MIT
