
#import <UIKit/UIKit.h>

@protocol PhunwareBannerAdViewDelegate<NSObject>

@required

- (void)bannerAdDidLoad;

- (void)bannerAdDidFailLoadingWithError:(NSError *)error;

- (void)bannerAdCacheDidFailLoadingWithError:(NSError *)error;

@optional

- (void)bannerAdViewDidAppear;

- (void)bannerAdViewClicked;

// By default = YES - Ad Container is requesting location (GPS or WiFi) everytime before sending ad request
- (BOOL)shouldRequestPreciseLocation;

// By default 30 seconds for auto refreshing Ad Container
- (NSInteger)autoRefreshInterval;

@end

@interface PhunwareBannerAdView : UIView
@property (nonatomic, weak)                         id<PhunwareBannerAdViewDelegate>     delegate;
@property (nonatomic, assign, readonly)             CGSize                          size;
@property (nonatomic, strong, readonly)             NSString                        *placementId;

- (instancetype)initWithPlacementId:(NSString *)placementId size:(CGSize)size;

- (instancetype)init DEPRECATED_ATTRIBUTE;

- (void)loadBannerAd;

- (void)showBannerAdView;

- (void)startAutomaticallyRefreshingContents;

- (void)stopAutomaticallyRefreshingContents;

@end
