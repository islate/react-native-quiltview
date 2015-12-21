//
//  RNCellView.h
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import <UIKit/UIKit.h>

@class RCTEventDispatcher;

@interface RNCellView : UIView

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@property (nonatomic) NSInteger widthRatio;
@property (nonatomic) NSInteger heightRatio;
@property (nonatomic, strong) NSString *componentType;

@end
