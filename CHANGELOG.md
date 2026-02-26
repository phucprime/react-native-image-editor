# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-02-26

### Added

- **Promise-based API**: New `ImageEditor.edit()` method that returns a Promise.
- **Improved TypeScript types**: Full JSDoc documentation, exported `ImageEditorConfig`, `ImageEditorLanguage`, and `EditorControl` types.
- **Build system**: TypeScript compilation with `tsconfig.json` and `tsconfig.build.json`.
- **Code quality**: Added `.editorconfig`, `.prettierrc` for consistent formatting.
- **Documentation**: `CHANGELOG.md`, `CONTRIBUTING.md`.

### Changed

- **Renamed primary export**: `ImageEditor` is now the primary class (was `PhotoEditor`).
- **New `open()` method**: Replaces the old `Edit()` method (still available as deprecated).
- **Package structure**: Source moved to `src/`, compiled output in `lib/`.
- **iOS minimum**: Bumped iOS deployment target from 8.0 to 13.0.
- **Android defaults**: Updated fallback `compileSdkVersion` to 33, `minSdkVersion` to 21.
- **Android build.gradle**: Added `namespace`, replaced deprecated `lintOptions` with `lint`, bumped AGP fallback to 7.4.2.
- **package.json**: Added `types`, `files`, `react-native`, `source`, `peerDependencies`, `engines`, proper scripts.
- **Version**: Bumped to 1.0.0 for the fresh fork release.

### Deprecated

- `PhotoEditor` class — use `ImageEditor` instead.
- `PhotoEditor.Edit()` — use `ImageEditor.open()` or `ImageEditor.edit()` instead.
- `PhotoEditorProps` type — use `ImageEditorConfig` instead.

### Fixed

- TypeScript `index.d.ts` was out of sync with `index.tsx` — now generated from source.
- `languages` prop was missing from type definitions.

## [0.6.5] - Previous Release

- Forked from [ThienMD/react-native-image-editor](https://github.com/ThienMD/react-native-image-editor).
- Original fork of [prscX/react-native-photo-editor](https://github.com/prscX/react-native-photo-editor).
