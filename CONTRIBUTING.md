# Contributing to zod-ir

First off, thanks for taking the time to contribute! 🎉

When it comes to open source, there are different ways you can contribute, all of which are valuable. Here are a few guidelines that should help you as you prepare your contribution.

## Initial Steps

Before you start working on a contribution, **create an issue** describing what you want to build. It's possible someone else is already working on something similar, or perhaps there is a reason that feature isn't implemented. The maintainers will point you in the right direction.

## Development

The following steps will get you setup to contribute changes to this repo:

1. **Fork** this repo to your own GitHub account.

2. **Clone** your forked repo:

   ```bash
   git clone [https://github.com/YOUR_USERNAME/zod-ir.git](https://github.com/YOUR_USERNAME/zod-ir.git)
   cd zod-ir

   ```

3. Install dependencies (We use `pnpm`):

   ```bash
   pnpm install
   ```

4. Create a branch for your changes:

   ```bash
   git checkout -b feat/your-feature-name
   ```

## Project Structure

The project follows a modular architecture:

- `src/modules/*`: Core validation logic (e.g., `identity`, `financial`, `contact`).
- `src/data/*`: Static datasets (e.g., city codes, bank info).
- `src/utils/*`: Shared helper functions.

## Commands

`pnpm build`

- Bundles the project using `tsup` to `dist/`.
- Run this to ensure your changes build correctly without errors.

`pnpm test`

- Runs all unit tests using **Vitest**.
- **Crucial:** Please ensure all tests pass before submitting a PR.

`pnpm test --watch`

- Runs tests in watch mode. Useful during development to see immediate feedback.

## Writing Tests

`zod-ir` aims for high test coverage. After implementing your contribution, please write tests for it.

- Locate the corresponding test file in `src/modules/*.test.ts` (e.g., if you edited `bill.ts`, check `bill.test.ts`).

- Add test cases covering both valid and invalid scenarios.

## Commit Messages

We follow the [Conventional](https://www.conventionalcommits.org) Commits specification. This helps us generate changelogs automatically.

**Format:** `<type>(<scope>): <description>`

Examples:

- `feat(financial): add support for new bank bin`

- `fix(identity): correct validation logic for passport`

- `docs: update readme examples`

- `chore: update dependencies`

## Submitting a Pull Request

1. Push your changes to your fork: `git push origin feat/your-feature-name`

2. Go to [zod-ir Pull Requests](https://github.com/Reza-kh80/zod-ir/pulls) and create a new PR.

3. Describe your changes and link the related issue (e.g., "Closes #12").

4. Wait for the maintainers to review. We tried to be fast! ⚡

## License

By contributing your code to the zod-ir GitHub repository, you agree to license your contribution under the MIT license.
