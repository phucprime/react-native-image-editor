<h1 align="center">@phucprime/react-native-image-editor</h1>

<p align="center">
  Native image editor for React Native — crop, draw, text, stickers, and more.<br/>
  Supports <strong>New Architecture</strong> (Fabric + TurboModules) and the classic bridge.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@phucprime/react-native-image-editor"><img src="https://img.shields.io/npm/v/@phucprime/react-native-image-editor.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@phucprime/react-native-image-editor"><img src="https://img.shields.io/npm/dm/@phucprime/react-native-image-editor.svg?style=flat-square" alt="npm downloads" /></a>
  <a href="https://github.com/phucprime/react-native-image-editor/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@phucprime/react-native-image-editor.svg?style=flat-square" alt="license" /></a>
</p>

---

| iOS | Android |
| :-: | :-: |
| <img src="assets/ios.gif" width="280" /> | <img src="assets/android.gif" width="280" /> |

## Compatibility

| | Minimum | Tested |
| --- | --- | --- |
| React Native | 0.73 | **0.78.2** |
| iOS | 13.0 | 18 |
| Android | API 24 | API 35 |
| Architecture | Old Arch ✅ | **New Arch ✅** |

> Requires **JDK 17** and **Gradle 8.x** for Android builds.

## Installation

```bash
npm install @phucprime/react-native-image-editor
# or
yarn add @phucprime/react-native-image-editor
```

### iOS

Add to your `Podfile`:

```ruby
use_frameworks! :linkage => :static
pod "iOSPhotoEditor", :git => "https://github.com/phucprime/photo-editor", :branch => "master"
```

Then run `pod install`.

Add to `Info.plist`:

```xml
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Allow access to save edited photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Allow access to select photos for editing</string>
```

### Android

Add JitPack to your root `android/build.gradle`:

```groovy
allprojects {
    repositories {
        maven { url "https://jitpack.io" }
    }
}
```

Add activities to `AndroidManifest.xml`:

```xml
<activity android:name="com.ahmedadeltito.photoeditor.PhotoEditorActivity" />
<activity android:name="com.yalantis.ucrop.UCropActivity" />
```

## Usage

### Promise API (recommended)

```typescript
import { ImageEditor } from '@phucprime/react-native-image-editor';

const editedPath = await ImageEditor.edit('/path/to/image.jpg', {
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  stickers: ['sticker1', 'sticker2'],
});
```

### Callback API

```typescript
ImageEditor.open({
  path: '/path/to/image.jpg',
  onDone: (path) => console.log('Saved:', path),
  onCancel: () => console.log('Cancelled'),
});
```

## Options

| Property | Type | Description |
| -------- | ---- | ----------- |
| `path` | `string` | Path to the image file |
| `colors` | `string[]` | Hex colors for draw/text palette |
| `stickers` | `string[]` | Sticker image names from native resources |
| `hiddenControls` | `string[]` | Hide: `'text'` `'clear'` `'draw'` `'save'` `'share'` `'sticker'` `'crop'` |
| `languages` | `object` | UI localization strings |

> **Tip:** Use [react-native-fs](https://github.com/itinance/react-native-fs) to copy images into the app sandbox before editing.

## Stickers

- **iOS** — Add images to the Resources folder
- **Android** — Add images to the `drawable` folder

See the [Example](Example/) project for a working setup.

## Credits

Based on [prscX/react-native-photo-editor](https://github.com/prscX/react-native-photo-editor), with photo editor SDKs by [eventtus](https://github.com/eventtus).

## License

[Apache 2.0](LICENSE)
