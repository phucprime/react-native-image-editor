#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNPhotoEditor, NSObject)

RCT_EXTERN_METHOD(Edit:(NSDictionary *)props
                  onDone:(RCTResponseSenderBlock)onDone
                  onCancel:(RCTResponseSenderBlock)onCancel)

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

@end
