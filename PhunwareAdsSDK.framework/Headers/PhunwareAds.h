
#import <Foundation/Foundation.h>

@interface PhunwareAds : NSObject

+ (void)start;

+ (void)GDPRconsentFlag:(BOOL)flag;

+ (BOOL)getGDPRconsentFlag;

@end
