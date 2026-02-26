<h1 align="center">

<p align="center">
  <img src="https://lh3.googleusercontent.com/dsJXfHnUx0qvZIB_80F-q0iN18eIqmx6g10bmsVN8R6nEnLQDKvJ9lXCbnPCgDEZMw=s180"/>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@phucprime/react-native-image-editor"><img src="http://img.shields.io/npm/v/react-native-image-editor.svg?style=flat" /></a>
  <a href="https://github.com/phucprime/react-native-image-editor/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" /></a>
  <a href="https://github.com/phucprime/react-native-image-editor#License"><img src="https://img.shields.io/npm/l/react-native-image-editor.svg?style=flat" /></a>
</p>

    ReactNative: Native Image Editor (Android/iOS)

If this project has helped you out, please support us with a star 🌟

</h1>
This library is a React Native bridge around native photo editor libraries. It allows you to edit any photo by providing below set of features:

- _**Cropping**_
- _**Adding Images -Stickers-**_
- _**Adding Text with Colors**_
- _**Drawing with Colors**_
- _**Scaling and Rotating Objects**_
- _**Deleting Objects**_
- _**Saving to Photos and Sharing**_
- _**Cool Animations**_

# Introduction

`@phucprime/react-native-image-editor` is a fork of the deprecated `react-native-photo-editor`. The original library had not been updated for a while and had several limitations, including inconsistent user interfaces between iOS and Android.

Seeing the need for a more maintained and consistent library, I decided to fork `react-native-photo-editor` and create `@phucprime/react-native-image-editor`.

The main goals of this library are:

- **Maintainability:** As the maintainer of this library, I aim to keep it up-to-date with the latest versions of React Native and the native photo editor libraries.

- **Consistency:** This library aims to provide a consistent user interface across both iOS and Android platforms. This not only provides a better user experience, but also makes it easier for developers to use.

## 📱 Demo

| iOS                                      | Android                                      |
| ---------------------------------------- | -------------------------------------------- |
| <img src="assets/ios.gif" width="400" /> | <img src="assets/android.gif" width="400" /> |

## Migrating from react-native-photo-editor

If you're currently using `react-native-photo-editor` and want to switch to this library, you can follow these steps:

1. **Uninstall the old library.** Run `npm uninstall react-native-photo-editor` or `yarn remove react-native-photo-editor`, depending on whether you're using npm or yarn.

2. **Install this library.** Run `npm install @phucprime/react-native-image-editor` or `yarn add @phucprime/react-native-image-editor`.

3. **Update your JavaScript files.** Replace all instances of `import PhotoEditor from 'react-native-photo-editor'` with `import ImageEditor from '@phucprime/react-native-image-editor'`.

4. **Update your Podfile.** If you're using iOS, make the following changes in your Podfile:

    Replace `pod 'RNPhotoEditor', :path => '../node_modules/react-native-photo-editor'` with `pod 'RNImageEditor', :path => '../node_modules/@phucprime/react-native-image-editor'`.

    Replace `pod 'iOSPhotoEditor', :git => 'https://github.com/prscX/photo-editor', :branch => 'master'` with `pod 'iOSPhotoEditor', :git => 'https://github.com/phucprime/photo-editor', :branch => 'master'`.

5. **Run `pod install`.** If you're using iOS, run `pod install` in your `ios` directory to install the new library.

Please note that the API of this library might be different from `react-native-photo-editor`. Make sure to update your code to use the new API.

## 📖 Getting started

`$ yarn add @phucprime/react-native-image-editor`

> This library is supported React Native V61 and above

- **iOS**

> **iOS Prerequisite:** Please make sure `CocoaPods` is installed on your system

    - Add the following to your `Podfile` -> `ios/Podfile` and run pod update:

```ruby
  use_native_modules!

  # Disable Flipper to avoid C++ header issues with newer Xcode versions
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

> **Note:** Flipper must be disabled (`FlipperConfiguration.disabled`) because `iOSPhotoEditor` requires `use_frameworks!`, and newer Xcode versions have C++ header incompatibilities with Flipper.

- Add below property to your info.list

```
	<key>NSPhotoLibraryAddUsageDescription</key>
	<string>Application needs permission to write photos...</string>

	<!-- If you are targeting devices running on iOS 10 or later, you'll also need to add: -->
	<key>NSPhotoLibraryUsageDescription</key>
	<string>iOS 10 needs permission to write photos...</string>
```

- **Android**

1.  Add JitPack repository to both `buildscript` and `allprojects` in your root `android/build.gradle`:

```groovy
buildscript {
    repositories {
        google()
        mavenCentral()
        maven { url "https://jitpack.io" }
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url "https://jitpack.io" }
    }
}
```

2.  **JDK 17 required:** AGP 7.x is incompatible with JDK 21 (bundled with newer Android Studio). Add this to `android/gradle.properties`:

```properties
org.gradle.java.home=/path/to/your/jdk-17
```

> On macOS with Homebrew: `/opt/homebrew/Cellar/openjdk@17/17.x.x/libexec/openjdk.jdk/Contents/Home`
> Install if needed: `brew install openjdk@17`

3.  **Gradle plugin Kotlin metadata fix:** If using Gradle 8.x with React Native 0.72, the bundled Kotlin stdlib (1.9.x) is newer than the gradle-plugin's Kotlin (1.7.x). Add `-Xskip-metadata-version-check` to `node_modules/@react-native/gradle-plugin/build.gradle.kts`:

```kotlin
tasks.withType<KotlinCompile> {
  kotlinOptions {
    // ...existing options...
    freeCompilerArgs += listOf("-Xskip-metadata-version-check")
  }
}
```

4.  Add below activities in your `AndroidManifest.xml`:

```xml
<activity android:name="com.ahmedadeltito.photoeditor.PhotoEditorActivity" />
<activity android:name="com.yalantis.ucrop.UCropActivity" />
```

5.  To save image to the public external storage, add to your manifest:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## ⛄️ Stickers

If you want stickers, please add them to your native project:

- **iOS:** Add stickers to iOS Resources folder
- **Android:** Add stickers to app `drawable` folder

> Refer Example project for the same.

## 💻 Usage

```
import ImageEditor from '@phucprime/react-native-image-editor'

ImageEditor.Edit({
    path: RNFS.DocumentDirectoryPath + "/photo.jpg"
});
```

> - Purpose of this library is to edit photos which are within app sandbox, we recommend to move captured image to app sandbox then using RNFS share image path with library for the edit.

> - Example: If we capture image through cameraRoll then we should first move image to app sandbox using RNFS then share app storage path with the editor.

## 💡 Props

- **General(iOS & Android)**

| Prop              | Type               | Default                                                                                                                 | Note                                                                                       |
| ----------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `path: mandatory` | `string`           |                                                                                                                         | Specify image path you want to edit                                                        |
| `hiddenControls`  | `array`            |                                                                                                                         | Specify editor controls you want to hide `[clear, crop, draw, save, share, sticker, text]` |
| `stickers`        | `array`            |                                                                                                                         | Specify stickers you want to show in stickers picker                                       |
| `languages`       | `object`           |                                                                                                                         | Specify languages you want to show in text editor                                          |
| `colors`          | `array: HEX-COLOR` | `[#000000, #808080, #a9a9a9, #FFFFFF, #0000ff, #00ff00, #ff0000, #ffff00, #ffa500, #800080, #00ffff, #a52a2a, #ff00ff]` | Specify colors you want to show for draw/text                                              |
| `onDone`          | `func`             |                                                                                                                         | Specify done callback                                                                      |
| `onCancel`        | `func`             |                                                                                                                         | Specify cancel callback                                                                    |

## 🔧 Troubleshooting

### If using React Native Firebase v6+ or facing any of the following issues: [#104](https://github.com/phucprime/react-native-image-editor/issues/104), [#93](https://github.com/phucprime/react-native-image-editor/issues/93)

- Add the following to your `podfile -> ios/podfile` and run `pod install`

```
pre_install do |installer|
  installer.pod_targets.each do |pod|
    if pod.name.start_with?('RNFB')
      def pod.build_type;
        Pod::BuildType.static_library
      end
    end
  end
end
```

- If the above doesn't work, try the following and and re-run `pod install`:

As [@react-native-firebase documentation](https://rnfirebase.io/#allow-ios-static-frameworks) you should add following to top of the Podfile for Allow iOS Static Frameworks

```
$RNFirebaseAsStaticFramework = true
```

### [**swift*FORCE_LOAD*$\_swiftUniformTypeIdentifiers / **swift*FORCE_LOAD*$\_swiftCoreMIDI](https://github.com/phucprime/react-native-image-editor/issues/171)

## ✨ Credits

- Android Image Editor: [eventtus/photo-editor-android](https://github.com/eventtus/photo-editor-android)
- iOS Image Editor: [eventtus/photo-editor](https://github.com/eventtus/photo-editor)
- react-native-photo-editor: [prscX/react-native-photo-editor](https://github.com/prscX/react-native-photo-editor)

## 🤔 How to contribute

Have an idea? Found a bug? Please raise to [ISSUES](https://github.com/phucprime/react-native-image-editor/issues).
Contributions are welcome and are greatly appreciated! Every little bit helps, and credit will always be given.

## 💫 Where is this library used?

If you are using this library in one of your projects, add it in this list below. ✨

## 💖 Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously, this takes time. You can integrate and use these projects in your applications for free! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

- Starring and sharing the projects you like 🚀
- If you're feeling especially charitable, please follow [prscX](https://github.com/prscX) on GitHub.
