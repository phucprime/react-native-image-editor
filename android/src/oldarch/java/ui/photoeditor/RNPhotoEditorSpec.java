package ui.photoeditor;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

/**
 * Base class for the old architecture (legacy bridge).
 * Extends ReactContextBaseJavaModule directly.
 */
abstract class RNPhotoEditorSpec extends ReactContextBaseJavaModule {
    RNPhotoEditorSpec(ReactApplicationContext context) {
        super(context);
    }
}
