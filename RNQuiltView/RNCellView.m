//
//  RNCellView.m
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import "RNCellView.h"

#import "RCTConvert.h"
#import "RCTEventDispatcher.h"
#import "RCTUtils.h"
#import "UIView+React.h"

@implementation RNCellView
{
    RCTEventDispatcher *_eventDispatcher;
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    RCTAssertParam(eventDispatcher);
    
    if ((self = [super initWithFrame:CGRectZero])) {
        _eventDispatcher = eventDispatcher;
        _widthRatio = 0;
        _heightRatio = 0;
        
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(updateBlockPixels) name:@"UpdateBlockPixels" object:nil];
    }
    return self;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)updateBlockPixels
{
    if (self.superview) {
        [self setFrame:self.superview.bounds];
    }
}

- (void)setFrame:(CGRect)frame
{
    CGRect oldFrame = self.frame;
    
    [super setFrame:frame];
    
    if (oldFrame.size.width == frame.size.width) {
        return;
    }
    
    // 发送事件给js
    [_eventDispatcher sendInputEventWithName:@"sizeChange"
                                        body:@{@"target":self.reactTag,
                                               @"size":@{
                                                       @"width":@(frame.size.width),
                                                       @"height" : @(frame.size.height)
                                                       }
                                               }];
}

- (void)setWidthRatio:(NSInteger)widthRatio
{
    NSInteger oldRatio = _widthRatio;
    
    _widthRatio = widthRatio;
    
    if (oldRatio > 0 && oldRatio != widthRatio) {
        [[NSNotificationCenter defaultCenter] postNotificationName:@"CellSizeChange" object:nil];
    }
}

- (void)setHeightRatio:(NSInteger)heightRatio
{
    NSInteger oldRatio = _heightRatio;
    
    _heightRatio = heightRatio;
    
    if (oldRatio > 0 && oldRatio != heightRatio) {
        [[NSNotificationCenter defaultCenter] postNotificationName:@"CellSizeChange" object:nil];
    }
}

RCT_NOT_IMPLEMENTED(-initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(-initWithCoder:(NSCoder *)aDecoder)

@end
