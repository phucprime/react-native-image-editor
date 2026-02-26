
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <UIKit/UIKit.h>
@import iOSPhotoEditor;

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNPhotoEditorSpec/RNPhotoEditorSpec.h>

@interface RNPhotoEditor : NSObject <NativeRNPhotoEditorSpec, PhotoEditorDelegate>
#else
@interface RNPhotoEditor : NSObject <RCTBridgeModule, PhotoEditorDelegate>
#endif

@end
