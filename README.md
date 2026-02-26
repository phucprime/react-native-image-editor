<p align="center">
  <img src="https://lh3.googleusercontent.com/dsJXfHnUx0qvZIB_80F-q0iN18eIqmx6g10bmsVN8R6nEnLQDKvJ9lXCbnPCgDEZMw=s180" width="80" />
</p>

<h1 align="center">@phucprime/react-native-image-editor</h1>

<p align="center">
  Native image editor for React Native — crop, draw, add text, stickers, and more.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@phucprime/react-native-image-editor"><img src="https://img.shields.io/npm/v/@phucprime/react-native-image-editor.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@phucprime/react-native-image-editor"><img src="https://img.shields.io/npm/dm/@phucprime/react-native-image-editor.svg?style=flat-square" alt="npm downloads" /></a>
  <a href="https://github.com/phucprime/react-native-image-editor/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@phucprime/react-native-image-editor.svg?style=flat-square" alt="license" /></a>
  <a href="https://github.com/phucprime/react-native-image-editor/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" /></a>
</p>

---

## Features

- **Cropping** — Resize and reframe images
- **Drawing** — Freehand drawing with color picker
- **Text** — Add text overlays with custom colors
- **Stickers** — Add image stickers from your app resources
- **Scaling & Rotating** — Transform any added element
- **Saving & Sharing** — Export edited images

## Demo

| iOS | Android |
| :-: | :-: |
| <img src="assets/ios.gif" width="300" /> | <img src="assets/android.gif" width="300" /> |

## Requirements

| Platform | Minimum Version |
| -------- | --------------- |
| iOS      | 13.0            |
| Android  | API 21 (5.0)    |
| React Native | >= 0.60     |

## Installation

```bash
npm install @phucprime/react-native-image-editor
# or
yarn add @phucprime/react-native-image-editor
```

### iOS Setup

1. Add to your `ios/Podfile`:

```ruby
use_native_modules!

# Required: Flipper must be disabled when using iOSPhotoEditor with use_frameworks!
flipper_config = FlipperConfiguration.disabled

use_frameworks! :linkage => :static
pod "iOSPhotoEditor", :git => "https://github.com/phucprime/photo-editor", :branch => "master"

post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name.include?('iOSPhotoEditor')
      target.build_configurations.each do |config|
        config.build_settings['SWIFT_VERSION'] = '5'
      end
    end
  end
end
```

2. Run `pod install` in the `ios/` directory.

3. Add to `Info.plist`:

```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Allow access to save edited photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Allow access to select photos for editing</string>
```

### Android Setup

1. Add JitPack repository to your root `android/build.gradle`:

```groovy
allprojects {
    repositories {
        // ...existing repos...
        maven { url "https://jitpack.io" }
    }
}
```

2. Add activities to `AndroidManifest.xml`:

```xml
<activity android:name="com.ahmedadeltito.photoeditor.PhotoEditorActivity" />
<activity android:name="com.yalantis.ucrop.UCropActivity" />
```

3. For saving to external storage:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

4. **JDK 17 required** (AGP 7.x is incompatible with JDK 21). Add to `android/gradle.properties`:

```properties
org.gradle.java.home=/path/to/your/jdk-17
```

> macOS Homebrew: `brew install openjdk@17`, then use `/opt/homebrew/Cellar/openjdk@17/<version>/libexec/openjdk.jdk/Contents/Home`

## Usage

### Promise-based (recommended)

```typescript
import { ImageEditor } from '@phucprime/react-native-image-editor';

try {
  const editedPath = await ImageEditor.edit('/path/to/image.jpg', {
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    stickers: ['sticker1', 'sticker2'],
  });
  console.log('Edited image saved to:', editedPath);
} catch (error) {
  console.log('Editor was cancelled');
}
```

### Callback-based

```typescript
import { ImageEditor } from '@phucprime/react-native-image-editor';

ImageEditor.open({
  path: '/path/to/image.jpg',
  onDone: (editedPath) => {
    console.log('Edited image saved to:', editedPath);
  },
  onCancel: (resultCode) => {
    console.log('Editor cancelled with code:', resultCode);
  },
});
```

> **Tip:** Use [react-native-fs](https://github.com/itinance/react-native-fs) to copy images into the app sandbox before editing.

## API Reference

### `ImageEditor.edit(path, options?): Promise<string>`

Opens the editor and returns a promise with the edited image path.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `path` | `string` | Path to the image file to edit |
| `options` | `object` | Optional configuration (see below) |

### `ImageEditor.open(config): void`

Opens the editor with callback-based API.

### Configuration

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `path` | `string` | *required* | Path to the image file |
| `colors` | `string[]` | 13 default colors | Hex color strings for draw/text palette |
| `stickers` | `string[]` | `[]` | Sticker image names from native resources |
| `hiddenControls` | `EditorControl[]` | `[]` | Controls to hide: `'text'`, `'clear'`, `'draw'`, `'save'`, `'share'`, `'sticker'`, `'crop'` |
| `languages` | `ImageEditorLanguage` | English defaults | UI localization strings |
| `onDone` | `(path: string) => void` | — | Callback when editing completes |
| `onCancel` | `(code: number) => void` | — | Callback when editing is cancelled |

## Stickers

Add sticker images to your native project:

- **iOS:** Add to the Resources folder
- **Android:** Add to the `drawable` folder

See the [Example](Example/) project for reference.

## Migrating from react-native-photo-editor

```diff
- import PhotoEditor from 'react-native-photo-editor';
+ import { ImageEditor } from '@phucprime/react-native-image-editor';

- PhotoEditor.Edit({ path: imagePath, onDone: handleDone });
+ ImageEditor.open({ path: imagePath, onDone: handleDone });
// or use the Promise API:
+ const result = await ImageEditor.edit(imagePath);
```

Update your iOS `Podfile`:

```diff
- pod 'RNPhotoEditor', :path => '../node_modules/react-native-photo-editor'
+ pod 'RNImageEditor', :path => '../node_modules/@phucprime/react-native-image-editor'
- pod 'iOSPhotoEditor', :git => 'https://github.com/prscX/photo-editor'
+ pod 'iOSPhotoEditor', :git => 'https://github.com/phucprime/photo-editor'
```

## Troubleshooting

### React Native Firebase v6+

If using Firebase with `use_frameworks!`, add to your `Podfile`:

```ruby
$RNFirebaseAsStaticFramework = true
```

### Kotlin Metadata Version Mismatch (Gradle 8.x + RN 0.72)

Add `-Xskip-metadata-version-check` to `node_modules/@react-native/gradle-plugin/build.gradle.kts`:

```kotlin
tasks.withType<KotlinCompile> {
  kotlinOptions {
    freeCompilerArgs += listOf("-Xskip-metadata-version-check")
  }
}
```

## Credits

- Android Photo Editor: [eventtus/photo-editor-android](https://github.com/eventtus/photo-editor-android)
- iOS Photo Editor: [eventtus/photo-editor](https://github.com/eventtus/photo-editor)
- Original library: [prscX/react-native-photo-editor](https://github.com/prscX/react-native-photo-editor)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[Apache 2.0](LICENSE)
