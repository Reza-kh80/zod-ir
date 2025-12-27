# Contributing to zod-ir

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to `zod-ir`. These are mostly guidelines, not rules. Use your best judgment and feel free to propose changes to this document in a pull request.

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- PNPM (This project uses `pnpm` for package management)

### Installation

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/Reza-kh80/zod-ir.git](https://github.com/Reza-kh80/zod-ir.git)
   cd zod-ir

   ```

2. Install dependencies:

```bash
pnpm install
```

Development Workflow
Running Tests
We use Vitest for testing. Please ensure all tests pass before submitting a PR.

```bash
# Run tests once
pnpm test

# Run tests in watch mode (during development)
pnpm test --watch
```

Building the Project
To check if the project builds correctly:

```bash
pnpm build
```

Pull Request Process
Fork the repo and create your branch from main.

If you've added code that should be tested, add tests.

Ensure the test suite passes.

Make sure your code lints (if a linter is configured).

Format your commit messages using Conventional Commits.

Example: feat(identity): add new passport validation

Example: fix(bank): fix sheba regex for Mellat bank

Example: docs: update readme examples

Code Style
Use TypeScript for all logic.

Prefer functional programming patterns where possible (pure functions).

Keep external dependencies to zero.

Thank you for your contribution!
