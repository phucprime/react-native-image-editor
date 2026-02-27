package ui.photoeditor;

import com.facebook.react.bridge.ReactApplicationContext;

/**
 * New Architecture spec wrapper.
 * On New Architecture, this extends the codegen-generated NativeRNPhotoEditorSpec
 * which provides TurboModule integration with compile-time type validation.
 */
abstract class RNPhotoEditorSpec extends NativeRNPhotoEditorSpec {
    RNPhotoEditorSpec(ReactApplicationContext context) {
        super(context);
    }
}
