//
//  MMRefresh.h
//  RNQuiltView
//
//  Created by lyricdon on 15/12/1.
//  Copyright © 2015年 mmslate. All rights reserved.
//

#import <UIKit/UIKit.h>
@class RNQuiltView;
@interface MMRefresh : UIView

@property (nonatomic, weak) RNQuiltView *quiltView;
@property (nonatomic, strong) UIScrollView *scrollView;

@property (nonatomic, assign, getter=isNeedRefresh) BOOL needRefresh;

+ (instancetype) refreshView;

@end
