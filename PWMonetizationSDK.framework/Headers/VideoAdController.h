
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@protocol VideoAdDelegate<NSObject>

@required

- (void)videoAdDidLoad;

- (void)videoAdDidFailLoadingWithError:(NSError *)error;

- (void)videoAdCacheDidFailLoadingWithError:(NSError *)error;

@optional

- (void)videoAdViewDidAppear;

- (void)videoAdViewDidDisappear;

@end

@interface VideoAdController : NSObject

@property (weak, nonatomic) id<VideoAdDelegate> videoAdDelegate;

// Set this property if your video event have REWARD/AMOUNT macros
@property (strong, nonatomic) NSString *rewardMacros;
@property (strong, nonatomic) NSString *amountMacros;

- (instancetype)initWithPlacementId:(NSString *)placementId;
- (instancetype)init DEPRECATED_ATTRIBUTE;

- (void)loadVideoAd;
- (void)showVideoAd;


@end