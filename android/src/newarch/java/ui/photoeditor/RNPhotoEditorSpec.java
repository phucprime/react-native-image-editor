package ui.photoeditor;

import com.facebook.react.bridge.ReactApplicationContext;

/**
 * Base class for the new architecture (TurboModules).
 * Extends the codegen-generated NativeRNPhotoEditorSpec.
 */
abstract class RNPhotoEditorSpec extends NativeRNPhotoEditorSpec {
    RNPhotoEditorSpec(ReactApplicationContext context) {
        super(context);
    }
}
