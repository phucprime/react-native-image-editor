package ui.photoeditor;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReadableMap;

/**
 * Old Architecture compatibility spec.
 * On Old Architecture (bridge mode), this extends ReactContextBaseJavaModule directly.
 * The concrete module (RNPhotoEditorModule) extends this class.
 */
abstract class RNPhotoEditorSpec extends ReactContextBaseJavaModule {
    RNPhotoEditorSpec(ReactApplicationContext context) {
        super(context);
    }

    public abstract void Edit(ReadableMap props, Callback onDone, Callback onCancel);
}
