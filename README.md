# Zod Iranian Utils

<div align="center">

![npm version](https://img.shields.io/npm/v/zod-ir?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/zod-ir?style=flat-square)
![license](https://img.shields.io/npm/l/zod-ir?style=flat-square)

**A lightweight, type-safe Zod extension for validating Iranian specific data.**
Compatible with **React Hook Form**, **Next.js**, and Node.js backends.

</div>

## Features ✨

- ✅ **National Code (Code Melli):** Validates using the official checksum algorithm.
- 💳 **Bank Card:** Validates 16-digit card numbers using the Luhn algorithm.
- 📱 **Mobile Number:** Validates Iranian mobile formats (`09xx`, `+989xx`, `9xx`).
- 🌍 **Bilingual:** Built-in error messages in **Persian (Farsi)** and **English**.
- 🌲 **Tree-shakable:** Import only what you need.
- 🛡️ **Zero Dependency:** (Only requires `zod` as a peer dependency).

---

## Installation 📦

You need to install `zod` and `zod-ir`:

```bash
npm install zod zod-ir
# or
yarn add zod zod-ir
# or
pnpm add zod zod-ir