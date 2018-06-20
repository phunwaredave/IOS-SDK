
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@protocol InterstitialAdDelegate<NSObject>

@required

- (void)interstitialAdDidLoad;

- (void)interstitialAdDidFailLoadingWithError:(NSError *)error;

- (void)interstitialAdCacheDidFailLoadingWithError:(NSError *)error;

@optional

- (void)interstitialAdViewDidAppear;

- (void)interstitialAdViewDidDisappear;

@end;

@interface InterstitialAdViewController : NSObject

@property (weak, nonatomic) id<InterstitialAdDelegate> delegate;

- (instancetype)initWithPlacementId:(NSString *)placementId;
- (instancetype)init DEPRECATED_ATTRIBUTE;

- (void)loadInterstitialAd;
- (void)showInterstitialAd;

@end
