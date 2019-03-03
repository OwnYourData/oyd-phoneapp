#import <React/RCTBridgeModule.h>

@interface RNLibSodium : NSObject <RCTBridgeModule>
-(NSString*) hexFromStr:(NSString*)str;
@end

