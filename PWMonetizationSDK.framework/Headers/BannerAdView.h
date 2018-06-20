
#import <UIKit/UIKit.h>

@protocol BannerAdViewDelegate<NSObject>

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

typedef enum : NSInteger {
    kStandartSizeBanner,                    // 320x50 (standard) banner
    kLargeSizeBanner,                       // 320x100 large banner
    kIABMediumRectangelSizeBanner,          // 300x250 IAB medium rectangel banner
    kIABFullSizeBanner,                     // 468x60 IAB full size banner
    kIABLeaderboardSizeBanner               // 728x90 IAB leaderboard banner
} BannerSize;

@interface BannerAdView : UIView
@property (nonatomic, weak) id<BannerAdViewDelegate> delegate;
@property (nonatomic, assign, readonly) CGSize size;
@property (nonatomic, strong, readonly) NSString *placementId;

- (instancetype)initWithPlacementId:(NSString *)placementId size:(BannerSize)size;

- (instancetype)init DEPRECATED_ATTRIBUTE;

- (void)loadBannerAd;

- (void)showBannerAdView;

- (void)startAutomaticallyRefreshingContents;

- (void)stopAutomaticallyRefreshingContents;

@end
