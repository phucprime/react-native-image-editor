# Contributing

Thank you for your interest in contributing to `@phucprime/react-native-image-editor`! Contributions are welcome and greatly appreciated.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/<your-username>/react-native-image-editor.git
   cd react-native-image-editor
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Build the library**:

   ```bash
   npm run build
   ```

## Development Workflow

### Running the Example App

```bash
cd Example
npm install

# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

### Available Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `npm run build`    | Compile TypeScript to `lib/`       |
| `npm run typecheck`| Run TypeScript type checking       |
| `npm run lint`     | Check code formatting with Prettier|
| `npm run format`   | Auto-format code with Prettier     |
| `npm run clean`    | Remove the `lib/` directory        |

### Project Structure

```
src/              → TypeScript source
lib/              → Compiled output (generated, gitignored)
ios/              → iOS native module (Objective-C)
android/          → Android native module (Java)
Example/          → React Native example app
```

## Submitting Changes

1. Create a new branch from `master`:

   ```bash
   git checkout -b feature/my-feature
   ```

2. Make your changes and ensure:
   - `npm run typecheck` passes
   - `npm run lint` passes
   - The Example app builds and runs on both platforms

3. Commit with a clear message:

   ```bash
   git commit -m "feat: add new feature description"
   ```

4. Push to your fork and open a **Pull Request** against `master`.

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation only
- `chore:` — Build process, CI, or tooling changes
- `refactor:` — Code change that neither fixes a bug nor adds a feature

## Reporting Issues

- Use [GitHub Issues](https://github.com/phucprime/react-native-image-editor/issues)
- Include React Native version, platform (iOS/Android), and reproduction steps
- Attach logs or screenshots when possible

## License

By contributing, you agree that your contributions will be licensed under the [Apache 2.0 License](LICENSE).
