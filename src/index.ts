import { NativeModules, Platform } from 'react-native';

const RNPhotoEditor = NativeModules.RNPhotoEditor;

/**
 * Localization strings for the image editor UI.
 */
export interface ImageEditorLanguage {
  /** Title for the "Done" button */
  doneTitle?: string;
  /** Title for the "Save" button */
  saveTitle?: string;
  /** Title for the "Clear All" button */
  clearAllTitle?: string;
  /** Title for the "Camera" option */
  cameraTitle?: string;
  /** Title for the "Gallery" option */
  galleryTitle?: string;
  /** Title for the upload dialog */
  uploadDialogTitle?: string;
  /** Title for the upload picker */
  uploadPickerTitle?: string;
  /** Message shown when directory creation fails */
  directoryCreateFail?: string;
  /** Message requesting media access permissions */
  accessMediaPermissionsMsg?: string;
  /** Label for the "Continue" button */
  continueTxt?: string;
  /** Label for the "Not Now" button */
  notNow?: string;
  /** Message shown when media access is denied */
  mediaAccessDeniedMsg?: string;
  /** Message shown when image save succeeds */
  saveImageSucceed?: string;
  /** Title for the "Eraser" tool */
  eraserTitle?: string;
}

/** Editor control types that can be shown or hidden. */
export type EditorControl =
  | 'text'
  | 'clear'
  | 'draw'
  | 'save'
  | 'share'
  | 'sticker'
  | 'crop';

/**
 * Configuration options for the image editor.
 */
export interface ImageEditorConfig {
  /** Path to the image file to edit (required). */
  path: string;

  /**
   * Array of hex color strings available for drawing and text.
   * @default ['#000000', '#808080', '#a9a9a9', '#FFFFFE', '#0000ff', '#00ff00', '#ff0000', '#ffff00', '#ffa500', '#800080', '#00ffff', '#a52a2a', '#ff00ff']
   */
  colors?: string[];

  /**
   * Array of sticker image names to show in the sticker picker.
   * Images must be added to native project resources.
   * - iOS: Add to Resources folder
   * - Android: Add to drawable folder
   * @default []
   */
  stickers?: string[];

  /**
   * Array of editor controls to hide.
   * @default []
   */
  hiddenControls?: EditorControl[];

  /**
   * Localization strings for the editor UI.
   */
  languages?: ImageEditorLanguage;

  /**
   * Callback invoked when editing is complete.
   * @param imagePath - The path to the edited image file.
   */
  onDone?: (imagePath: string) => void;

  /**
   * Callback invoked when editing is cancelled.
   * @param resultCode - The native result code.
   */
  onCancel?: (resultCode: number) => void;
}

/** Default color palette for the editor. */
const DEFAULT_COLORS: string[] = [
  '#000000',
  '#808080',
  '#a9a9a9',
  '#FFFFFE',
  '#0000ff',
  '#00ff00',
  '#ff0000',
  '#ffff00',
  '#ffa500',
  '#800080',
  '#00ffff',
  '#a52a2a',
  '#ff00ff',
];

/** Default localization strings. */
const DEFAULT_LANGUAGES: Required<ImageEditorLanguage> = {
  doneTitle: 'Done',
  saveTitle: 'Save',
  clearAllTitle: 'Clear all',
  cameraTitle: 'Camera',
  galleryTitle: 'Gallery',
  uploadDialogTitle: 'Upload Image',
  uploadPickerTitle: 'Select Picture',
  directoryCreateFail: 'Failed to create directory',
  accessMediaPermissionsMsg:
    'To attach photos, we need to access media on your device',
  continueTxt: 'Continue',
  notNow: 'NOT NOW',
  mediaAccessDeniedMsg: 'You denied storage access, no photos will be added.',
  saveImageSucceed: 'Image saved',
  eraserTitle: 'Eraser',
};

/**
 * React Native Image Editor - Native photo editing bridge for iOS and Android.
 *
 * @example
 * ```ts
 * import { ImageEditor } from '@phucprime/react-native-image-editor';
 *
 * // Callback-based usage
 * ImageEditor.open({
 *   path: '/path/to/image.jpg',
 *   onDone: (editedPath) => console.log('Edited:', editedPath),
 *   onCancel: () => console.log('Cancelled'),
 * });
 *
 * // Promise-based usage
 * const editedPath = await ImageEditor.edit('/path/to/image.jpg', {
 *   colors: ['#ff0000', '#00ff00', '#0000ff'],
 * });
 * ```
 */
class ImageEditor {
  /**
   * Open the image editor with callback-based API.
   *
   * @param config - Editor configuration options.
   */
  static open(config: ImageEditorConfig): void {
    const {
      stickers = [],
      hiddenControls = [],
      colors = DEFAULT_COLORS,
      languages,
      onDone,
      onCancel,
      ...rest
    } = config;

    const mergedLanguages = languages
      ? { ...DEFAULT_LANGUAGES, ...languages }
      : DEFAULT_LANGUAGES;

    RNPhotoEditor.Edit(
      {
        colors,
        hiddenControls,
        stickers,
        languages: mergedLanguages,
        ...rest,
      },
      (imagePath: string) => {
        onDone?.(imagePath);
      },
      (resultCode: number) => {
        onCancel?.(resultCode);
      },
    );
  }

  /**
   * Edit an image and return a promise with the edited image path.
   *
   * @param path - Path to the image file to edit.
   * @param options - Optional editor configuration (excluding path, onDone, onCancel).
   * @returns Promise that resolves with the edited image path, or rejects if cancelled.
   */
  static edit(
    path: string,
    options?: Omit<ImageEditorConfig, 'path' | 'onDone' | 'onCancel'>,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      ImageEditor.open({
        ...options,
        path,
        onDone: resolve,
        onCancel: (resultCode) =>
          reject(new Error(`Editor cancelled with code: ${resultCode}`)),
      });
    });
  }

  /**
   * @deprecated Use `ImageEditor.open()` instead. This method is kept for backward compatibility.
   */
  static Edit(config: ImageEditorConfig): void {
    ImageEditor.open(config);
  }
}

/**
 * @deprecated Use `ImageEditor` instead. `PhotoEditor` is an alias kept for backward compatibility.
 */
const PhotoEditor = ImageEditor;

export { ImageEditor, PhotoEditor };
export default ImageEditor;

// Re-export legacy types for backward compatibility
/** @deprecated Use `ImageEditorConfig` instead. */
export type PhotoEditorProps = ImageEditorConfig;
/** @deprecated Use `ImageEditorLanguage` instead. */
export type Language = ImageEditorLanguage;
