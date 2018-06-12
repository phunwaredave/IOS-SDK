
#import <UIKit/UIKit.h>

// 320x50 (standard) banner
extern const CGSize kPhunwareAdSizeBanner;

// 320x100 large banner
extern const CGSize kPhunwareAdSizeLargeBanner;

// 300x250 medium rectangel banner
extern const CGSize kPhunwareAdSizeIABMediumRectangle;

// 468x60 full size banner
extern const CGSize kPhunwareAdSizeIABFullSizeBanner;

// 728x90 leaderboard
extern const CGSize kPhunwareAdSizeIABLeaderBoard;

typedef NS_ENUM(NSInteger, SMAAdRequestCode) {
    SMAAdRequestDefaultCode = -1,
    SMAAdRequestIncorrectAdParameters
};

typedef NS_ENUM(NSInteger, SMAAdResponseCode) {
    SMAAdResponseDefaultCode = -1,
    SMAAdResponseSuccessful,
    SMAAdResponseBadURL,
    SMAAdResponseBadURLConnection,
    SMAAdResponseNetworkError,
    SMAAdResponseNonViewResponse,
    SMAAdResponseUnableToFill,
    SMAAdResponseAdViewIsHidden,
    SMAAdResponseFailToLoadHTMLResources
};

typedef NS_ENUM(NSInteger, SMALocationRequestCode) {
    SMADefaultCode = -1,
    SMALocationRequestDenied = 0,
    SMALocationRequestNotDetermined,
    SMALocationRequestDescriptionAbsent,
    SMALocationServicesNotEnabled,
};

typedef NS_ENUM(NSInteger, SMADeviceInfoCode) {
    SMAMacRequestFail = 0
};

typedef NS_ENUM(NSInteger, SMAAppInfoCode) {
    SMAAppInfoIsPurchasedFlagAbsent
};

