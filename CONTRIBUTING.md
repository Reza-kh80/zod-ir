# Contributing Guidelines
Thanks for taking the time to contribute!

## Getting Started
Before you start working on something, create an issue describing what you want to build. It's possible someone else is already working on something similar, or perhaps there is a reason that feature isn't implemented. The maintainers will point you in the right direction.

## Bug Reports
To report a bug, please [open a bug-report issue on GitHub](https://github.com/Reza-kh80/zod-ir/issues/new?template=bug_report.md).

## Feature Requests
To request a new feature, please [open a feature-request issue on GitHub](https://github.com/Reza-kh80/zod-ir/issues/new?template=feature_request.md).

## Development Workflow
1. Fork the repository, clone it on your local machine, and install the dependencies:
   ```bash
   git clone https://github.com/Reza-kh80/zod-ir.git

   cd zod-ir

   pnpm install
   ```

2. Create a new feature branch, make your changes, and stage them:
   ```bash
   git checkout -b feat/your-feature-name

   git add -A
   ```

3. Commit the staged changes with a descriptive commit message:
   ```bash
   git commit -m 'feat: add some feature'
   ```
   **Notice**: Commit messages should adhere to [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0). For more information, refer to the _.gitmessage_ file in the root directory or use the following command:
    ```bash
    git commit
    ```

4. Push your feature branch to the origin:
   ```bash
   git push origin feat/your-feature-name
   ```

5. Submit a pull request that explains your changes and references the related issue. Then, wait for a review and/or response from the maintainers.

## Project Structure
This project follows a modular architecture:
- `src/modules/*`: Core validation logic (e.g., `identity`, `financial`, `contact`).
- `src/data/*`: Static datasets (e.g., city codes, bank info).
- `src/utils/*`: Shared helper functions.

## Writing Tests
We strive for practical test coverage. Please ensure that any new implementation is accompanied by meaningful tests. For each module:

- Locate the corresponding test file in `src/modules/*.test.ts`. For example, `bill.test.ts` is associated with `bill.ts`.

- Add test cases covering both valid and invalid scenarios.

## License
By contributing to this repository, you agree to license your contribution under the [MIT license](LICENSE).
