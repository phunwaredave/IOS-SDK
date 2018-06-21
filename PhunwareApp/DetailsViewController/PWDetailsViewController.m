//
//  PWDetailsViewController.m
//  PhunwareApp
//
//  Created by Vitaliy Stepanov on 06.06.2018.
//  Copyright © 2018 Phunware. All rights reserved.
//

#import "PWDetailsViewController.h"
#import <PWMonetizationSDK/PWMonetizationSDK.h>

@interface PWDetailsViewController ()<BannerAdViewDelegate, VideoAdDelegate, InterstitialAdDelegate>

@property (weak, nonatomic) IBOutlet UIView *bannerView;
@property (weak, nonatomic) IBOutlet UITextField *placementIdTextField;
@property (weak, nonatomic) IBOutlet UITextField *rewardMacrosTextField;
@property (weak, nonatomic) IBOutlet UITextField *amountMacrosTextField;

@property (strong, nonatomic) IBOutletCollection(NSLayoutConstraint) NSArray *widthContraint;
@property (strong, nonatomic) IBOutletCollection(NSLayoutConstraint) NSArray *heightContraint;

@property (strong, nonatomic) BannerAdView *bannerAd;
@property (assign, nonatomic) BannerSize size;

@property (strong, nonatomic) VideoAdController *videoAd;
@property (strong, nonatomic) InterstitialAdViewController *interstitialAd;

@end

@implementation PWDetailsViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
    if (![[self.adParamsDictionary objectForKey:@"adType"] isEqualToString:@"rewarded video"]) {
        self.rewardMacrosTextField.hidden = YES;
        self.amountMacrosTextField.hidden = YES;
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    
    [self updateLayout];
}

- (IBAction)loadAdButtonClick:(id)sender
{
    if ([[self.adParamsDictionary objectForKey:@"adType"] isEqualToString:@"banner"]) {
        [self.bannerAd removeFromSuperview];
        self.bannerAd = [[BannerAdView alloc] initWithPlacementId:self.placementIdTextField.text size:(BannerSize)[[self.adParamsDictionary objectForKey:@"adBannerSize"] integerValue]];
        [self.bannerView addSubview:self.bannerAd];
        self.bannerAd.delegate = self;
        [self.bannerAd loadBannerAd];
        [self.bannerAd startAutomaticallyRefreshingContents];
    } else if ([[self.adParamsDictionary objectForKey:@"adType"] isEqualToString:@"interstitial"]) {
        self.interstitialAd = [[InterstitialAdViewController alloc] initWithPlacementId:self.placementIdTextField.text];
        self.interstitialAd.delegate = self;
        [self.interstitialAd loadInterstitialAd];
    } else if ([[self.adParamsDictionary objectForKey:@"adType"] isEqualToString:@"video"]) {
        self.videoAd = [[VideoAdController alloc] initWithPlacementId:self.placementIdTextField.text];
        self.videoAd.videoAdDelegate = self;
        [self.videoAd loadVideoAd];
    } else if ([[self.adParamsDictionary objectForKey:@"adType"] isEqualToString:@"rewarded video"]) {
        self.videoAd = [[VideoAdController alloc] initWithPlacementId:self.placementIdTextField.text];
        self.videoAd.videoAdDelegate = self;
        self.videoAd.amountMacros = self.amountMacrosTextField.text;
        self.videoAd.rewardMacros = self.rewardMacrosTextField.text;
        [self.videoAd loadVideoAd];
    }
    
    [self.view endEditing:YES];
}

- (IBAction)showAdButtonClick:(id)sender
{
    if ([[self.adParamsDictionary objectForKey:@"adType"] isEqualToString:@"banner"]) {
        [self.bannerAd showBannerAdView];
    } else if ([[self.adParamsDictionary objectForKey:@"adType"] isEqualToString:@"interstitial"]) {
        [self.interstitialAd showInterstitialAd];
    } else if ([[self.adParamsDictionary objectForKey:@"adType"] isEqualToString:@"video"]) {
        [self.videoAd showVideoAd];
    } else if ([[self.adParamsDictionary objectForKey:@"adType"] isEqualToString:@"rewarded video"]) {
        [self.videoAd showVideoAd];
    }
    [self.view endEditing:YES];
}

- (void)showAlertWithMessage:(NSString *)string
{
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:nil message:string preferredStyle:UIAlertControllerStyleAlert];
    [self presentViewController:alert animated:YES completion:nil];
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [alert dismissViewControllerAnimated:YES completion:nil];
    });
}

- (void)updateLayout
{
    if ([[self.adParamsDictionary objectForKey:@"adType"] isEqualToString:@"banner"]) {
        for (NSLayoutConstraint *height in self.heightContraint) {
            height.constant = CGSizeFromString([self.adParamsDictionary objectForKey:@"adContainerSize"]).height;
        }
        for (NSLayoutConstraint *width in self.widthContraint) {
            width.constant = CGSizeFromString([self.adParamsDictionary objectForKey:@"adContainerSize"]).width;
            
        }
        [self.view setNeedsLayout];
    }
}

#pragma mark - PhunwareBannerAdViewDelegate Methods

- (void)bannerAdDidLoad
{
    [self showAlertWithMessage:@"Banner Ad View successful loaded."];
}

- (void)bannerAdDidFailLoadingWithError:(NSError *)error
{
    [self showAlertWithMessage:[NSString stringWithFormat:@"%@", error.localizedDescription]];
}

- (void)bannerAdCacheDidFailLoadingWithError:(NSError *)error
{
    [self showAlertWithMessage:[NSString stringWithFormat:@"%@", error.localizedDescription]];
}

- (void)bannerAdViewClicked
{
    NSLog(@"Banner Ad View was click");
}

- (void)bannerAdViewDidAppear
{
    NSLog(@"Banner Ad View did appear");
}

#pragma mark - PhunwareVideoAdDelegate Methods

- (void)videoAdDidLoad
{
    [self showAlertWithMessage:@"Video Ad successful loaded"];
}

- (void)videoAdDidFailLoadingWithError:(NSError *)error
{
    [self showAlertWithMessage:[NSString stringWithFormat:@"%@", error.localizedDescription]];
}

- (void)videoAdCacheDidFailLoadingWithError:(NSError *)error
{
    [self showAlertWithMessage:[NSString stringWithFormat:@"%@", error.localizedDescription]];
}

- (void)videoAdViewDidAppear
{
    NSLog(@"Video Ad View did appear");
}

- (void)videoAdViewDidDisappear
{
    NSLog(@"Video Ad View did disappear");
}

#pragma mark - PhunwareInterstitialAdDelegate Methods

- (void)interstitialAdDidLoad
{
    [self showAlertWithMessage:@"Interstitial Ad successful loaded"];
}

- (void)interstitialAdDidFailLoadingWithError:(NSError *)error
{
    [self showAlertWithMessage:[NSString stringWithFormat:@"%@", error.localizedDescription]];
}

- (void)interstitialAdCacheDidFailLoadingWithError:(NSError *)error
{
    [self showAlertWithMessage:[NSString stringWithFormat:@"%@", error.localizedDescription]];
}

- (void)interstitialAdViewDidAppear
{
    NSLog(@"Interstitial Ad View did appear");
}

- (void)interstitialAdViewDidDisappear
{
    NSLog(@"Interstitial Ad View did disappear");
}

@end
