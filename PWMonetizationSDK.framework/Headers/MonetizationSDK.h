
#import <Foundation/Foundation.h>

@interface MonetizationSDK : NSObject

+ (void)start;

+ (void)GDPRconsentFlag:(BOOL)flag;

+ (BOOL)getGDPRconsentFlag;

@end
