//
//  RNQuiltViewManager.m
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import "RNQuiltViewManager.h"
#import "RNQuiltView.h"
#import "RCTBridge.h"
#import "RCTConvert.h"

@implementation RNQuiltViewManager

RCT_EXPORT_MODULE()
- (UIView *)view
{
    return [[RNQuiltView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

RCT_EXPORT_VIEW_PROPERTY(sections, NSArray)

@end
