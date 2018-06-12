//
//  PWMainViewController.m
//  PhunwareApp
//
//  Created by Vitaliy Stepanov on 06.06.2018.
//  Copyright © 2018 Phunware. All rights reserved.
//


#import "PWMainViewController.h"
#import "PWDetailsViewController.h"
#import "TableViewCell.h"

@interface PWMainViewController ()<UITableViewDelegate, UITableViewDataSource>

@property (strong, nonatomic) NSArray *arrayWithParams;
@end

@implementation PWMainViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    self.arrayWithParams = [NSArray arrayWithObjects:
                            @{@"adName" : @"Standart banner (320x50)", @"info" : @{@"adType" : @"banner", @"adSize" : NSStringFromCGSize(CGSizeMake(320.0, 50.0))}},
                            @{@"adName" : @"Large banner (320x100)", @"info" : @{@"adType" : @"banner", @"adSize" : NSStringFromCGSize(CGSizeMake(320.0, 100.0))}},
                            @{@"adName" : @"IAB Medium Rectangel bannner (300x250)", @"info" : @{@"adType" : @"banner", @"adSize" : NSStringFromCGSize(CGSizeMake(300.0, 250.0))}},
                            @{@"adName" : @"IAB Full size banner Tablets (468x60)", @"info" : @{@"adType" : @"banner", @"adSize" : NSStringFromCGSize(CGSizeMake(468.0, 60.0))}},
                            @{@"adName" : @"IAB Leaderboard (768x90)", @"info" : @{@"adType" : @"banner", @"adSize" : NSStringFromCGSize(CGSizeMake(768.0, 90.0))}},
                            @{@"adName" : @"Interstitial banner (full-screen)", @"info" : @{@"adType" : @"interstitial", @"adSize" : [NSNull null]}},
                            @{@"adName" : @"Video AD", @"info" : @{@"adType" : @"video", @"adSize" : [NSNull null]}},
                            @{@"adName" : @"Rewarded Video AD", @"info" : @{@"adType" : @"rewarded video", @"adSize" : [NSNull null]}},
                            nil];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.arrayWithParams.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    TableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell" forIndexPath:indexPath];
    cell.adNameLabel.text = [[self.arrayWithParams objectAtIndex:indexPath.row] objectForKey:@"adName"];
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    PWDetailsViewController *detailsViewController = [self.storyboard instantiateViewControllerWithIdentifier:@"DetailsViewController"];
    detailsViewController.adParamsDictionary = [[self.arrayWithParams objectAtIndex:indexPath.row] objectForKey:@"info"];
    
    [self.navigationController pushViewController:detailsViewController animated:YES];
}


@end
