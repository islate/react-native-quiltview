//
//  RNCellModel.h
//  RNQuiltView
//
//  Created by lyricdon on 15/11/20.
//  Copyright © 2015年 mmslate. All rights reserved.
//

#import <UIKit/UIKit.h>

// 屏幕宽度
typedef enum : NSUInteger {
    ScreenSize_1366,
    ScreenSize_1024,
    ScreenSize_981,
    ScreenSize_768,
    ScreenSize_694,
    ScreenSize_678,
    ScreenSize_639,
    ScreenSize_507,
    ScreenSize_438,
    ScreenSize_414,
    ScreenSize_375,
    ScreenSize_320
} ScreenSizeTag;

@interface RNCellModel : NSObject

// 组件像素宽
@property (nonatomic, assign) CGFloat pixelWidth;
// 组件像素宽
@property (nonatomic, assign) CGFloat pixelHeight;

// 设置cell像素
- (void)updateCellWithTag:(ScreenSizeTag)aTag;

@end
