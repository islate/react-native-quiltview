//
//  MMRefresh.h
//  RNQuiltView
//
//  Created by lyricdon on 15/12/1.
//  Copyright © 2015年 mmslate. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RCTBridgeModule.h"
@class RNQuiltView;
@interface MMRefresh : UIView <RCTBridgeModule>

@property (nonatomic, weak) RNQuiltView *quiltView;
@property (nonatomic, strong) UIScrollView *scrollView;

@property (nonatomic, assign, getter=isNeedRefresh) BOOL needRefresh;

+ (instancetype) refreshView;

@end
