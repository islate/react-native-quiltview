//
//  RNCellView.m
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import "RNCellView.h"

@implementation RNCellView

- (instancetype)initWithCoder:(NSCoder *)coder
{
    self = [super initWithCoder:coder];
    if (self) {
        _widthRatio = [coder decodeIntegerForKey:@"widthRatio"];
        _heightRatio = [coder decodeIntegerForKey:@"heightRatio"];
        _componentType = [coder decodeObjectForKey:@"componentType"];
    }
    return self;
}

- (void)encodeWithCoder:(NSCoder *)coder
{
    [super encodeWithCoder:coder];
    
    [coder encodeInteger:_widthRatio forKey:@"widthRatio"];
    [coder encodeInteger:_heightRatio forKey:@"heightRatio"];
    [coder encodeObject:_componentType forKey:@"componentType"];
}

@end
