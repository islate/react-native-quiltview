//
//  RNCellView.h
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RNCellView : UIView <NSCoding>

@property (nonatomic) NSInteger row;
@property (nonatomic) NSInteger section;

@property (nonatomic) NSInteger widthRatio;
@property (nonatomic) NSInteger heightRatio;

@property (nonatomic, strong) NSString *componentType;

@end
