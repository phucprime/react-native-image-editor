#import <React/RCTBridgeModule.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNPhotoEditorSpec/RNPhotoEditorSpec.h>
#endif

@interface RCT_EXTERN_MODULE(RNPhotoEditor, NSObject)

RCT_EXTERN_METHOD(Edit:(NSDictionary *)props
                  onDone:(RCTResponseSenderBlock)onDone
                  onCancel:(RCTResponseSenderBlock)onCancel)

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

@end

#ifdef RCT_NEW_ARCH_ENABLED
// Conform to the codegen-generated protocol for TurboModule support.
// The actual implementation is in RNPhotoEditor.swift; this declaration
// tells the compiler the Swift class satisfies the protocol.
@interface RNPhotoEditor () <NativeRNPhotoEditorSpec>
@end
#endif
