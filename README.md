<div align="center">
  <h1>zod-ir</h1>
  <p>
    <strong>Comprehensive Zod validations for Iranian data structures</strong>
  </p>
  <p>
    A lightweight, TypeScript-first extension for Zod.
    <br />
    Compatible with React Hook Form, Next.js, and Node.js.
  </p>
  
  <p>
    <a href="[https://www.npmjs.com/package/zod-ir](https://www.npmjs.com/package/zod-ir)">
      <img src="[https://img.shields.io/npm/v/zod-ir?style=flat-square&color=blue](https://img.shields.io/npm/v/zod-ir?style=flat-square&color=blue)" alt="npm version" />
    </a>
    <a href="[https://bundlephobia.com/result?p=zod-ir](https://bundlephobia.com/result?p=zod-ir)">
      <img src="[https://img.shields.io/bundlephobia/minzip/zod-ir?style=flat-square&color=green](https://img.shields.io/bundlephobia/minzip/zod-ir?style=flat-square&color=green)" alt="bundle size" />
    </a>
    <a href="[https://www.npmjs.com/package/zod-ir](https://www.npmjs.com/package/zod-ir)">
      <img src="[https://img.shields.io/npm/l/zod-ir?style=flat-square&color=orange](https://img.shields.io/npm/l/zod-ir?style=flat-square&color=orange)" alt="license" />
    </a>
  </p>
</div>

<hr />

## Features ✨

* ✅ **National Code:** Validates using the official checksum algorithm.
* 💳 **Bank Card:** Validates 16-digit card numbers (Luhn algorithm).
* 📱 **Mobile Number:** Validates `09xx`, `+989xx`, `9xx`.
* 🏦 **Sheba (IBAN):** Validates structure and checksum (ISO 7064).
* 📮 **Postal Code:** Validates 10-digit Iranian postal codes.
* ☎️ **Landline:** Validates fixed line numbers with area codes.
* 🌍 **Bilingual:** Built-in error messages in **Persian** and **English**.

---

## Installation 📦

```bash
npm install zod zod-ir
# or
yarn add zod zod-ir
```

## Usage 🚀
1. Basic Validation
```typescript
import { z } from 'zod';
import { zMelliCode, zSheba, zIranianMobile, zCardNumber, zPostalCode, zLandline } from 'zod-ir';

const UserSchema = z.object({
  // Default Persian error message
  nationalCode: zMelliCode(),
  
  // Custom error message & Strict mode (must start with 0)
  mobile: zIranianMobile({ strictZero: true, message: "شماره موبایل اشتباه است" }),
  
  // English error message for Sheba
  iban: zSheba({ locale: "en" }),

  // Bank Card
  card: zCardNumber(),

  // Postal Code
  postal: zPostalCode(),

  // Landline (Phone)
  phone: zLandline(),
});

try {
  UserSchema.parse({
    nationalCode: "1234567891",
    mobile: "09121234567",
    iban: "IR120770000000000000000001",
    card: "6037991155667788",
    postal: "1234567890",
    phone: "02122334455"
  });
} catch (err) {
  console.log(err);
}
```
2. Usage with React Hook Form 📋
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { zMelliCode } from "zod-ir";

const schema = z.object({
  nationalId: zMelliCode({ message: "کد ملی صحیح نیست" })
});

export default function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(d => console.log(d))}>
      <input {...register("nationalId")} placeholder="Code Melli" />
      <p>{errors.nationalId?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## API Reference 📚

| Validator | Description | Options |
| :--- | :--- | :--- |
| `zMelliCode` | Validates Iranian National Code (Melli Code) | `message`, `locale` |
| `zCardNumber` | Validates 16-digit bank card numbers (Luhn algorithm) | `message`, `locale` |
| `zIranianMobile` | Validates Iranian mobile numbers | `strictZero`, `message`, `locale` |
| `zSheba` | Validates Sheba (IBAN) structure and checksum | `message`, `locale` |
| `zPostalCode` | Validates 10-digit Iranian postal codes | `message`, `locale` |
| `zLandline` | Validates landline phone numbers with area codes | `message`, `locale` |
