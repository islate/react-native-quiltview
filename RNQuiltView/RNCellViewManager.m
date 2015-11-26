//
//  RNCellViewManager.m
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import "RNCellViewManager.h"
#import "RNCellView.h"

@implementation RNCellViewManager
RCT_EXPORT_MODULE()
- (UIView *)view
{
    return [[RNCellView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(row, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(section, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(componentHeight, float)
RCT_EXPORT_VIEW_PROPERTY(componentWidth, float)

@end
