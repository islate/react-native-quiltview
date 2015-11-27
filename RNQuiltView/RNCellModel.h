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
    ScreenSize_375,
    ScreenSize_320
} ScreenSizeTag;

/*
// 屏幕状态
typedef enum : NSUInteger {
    HerizontalFull, // 水平全屏
    HerizontalTwoThirds, // 水平2/3
    HerizontalHalf, // 水平1/2
    VerticalFull,   // 垂直全屏
    VerticalTwoThirds, // 垂直2/3
    AllOneThirds,   // 垂直1/3  水平1/3
    AllRegular
} ScreenTag;
*/

@interface RNCellModel : NSObject

// 组件像素宽
@property (nonatomic, assign) CGFloat pixelWidth;
// 组件像素宽
@property (nonatomic, assign) CGFloat pixelHeight;
// 组件类型数量
@property (nonatomic, assign) NSInteger moduleTypeNum;

// 设置cell像素
- (void)updateCellWithTag:(ScreenSizeTag) aTag;

@end
