
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@protocol PhunwareInterstitialAdDelegate<NSObject>

@required

- (void)interstitialAdDidLoad;

- (void)interstitialAdDidFailLoadingWithError:(NSError *)error;

- (void)interstitialAdCacheDidFailLoadingWithError:(NSError *)error;

@optional

- (void)interstitialAdViewDidAppear;

- (void)interstitialAdViewDidDisappear;

@end;

@interface PhunwareInterstitialAdViewController : NSObject

@property (weak, nonatomic) id<PhunwareInterstitialAdDelegate> delegate;

- (instancetype)initWithPlacementId:(NSString *)placementId;
- (instancetype)init DEPRECATED_ATTRIBUTE;

- (void)loadInterstitialAd;
- (void)showInterstitialAd;

@end
