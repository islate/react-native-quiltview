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
    CGFloat _width;
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    RCTAssertParam(eventDispatcher);
    
    if ((self = [super initWithFrame:CGRectZero])) {
        _eventDispatcher = eventDispatcher;
        
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
    [self setFrame:self.superview.bounds];
}

- (void)setFrame:(CGRect)frame
{
    [super setFrame:frame];
    
    if (_width == frame.size.width) {
        return;
    }
    
    _width = frame.size.width;
    
    // 发送事件给js
    [_eventDispatcher sendInputEventWithName:@"sizeChange" body:@{@"target":self.reactTag, @"size":@{@"width":@(self.frame.size.width), @"height" : @(self.frame.size.height)}}];
}

RCT_NOT_IMPLEMENTED(-initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(-initWithCoder:(NSCoder *)aDecoder)

@end
