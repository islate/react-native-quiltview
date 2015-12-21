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
    return [[RNCellView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

RCT_EXPORT_VIEW_PROPERTY(widthRatio, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(heightRatio, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(componentType, NSString)

- (NSArray *) customDirectEventTypes {
    return @[
             @"onSizeChange"
             ];
}

@end
