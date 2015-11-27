//
//  RNCellModel.m
//  RNQuiltView
//
//  Created by lyricdon on 15/11/20.
//  Copyright © 2015年 mmslate. All rights reserved.
//

#import "RNCellModel.h"

@implementation RNCellModel

- (void)updateCellWithTag:(ScreenSizeTag)aTag
{
    NSDictionary *dict = [NSDictionary dictionary];
    // 所有PAD上出现的尺寸
    switch (aTag) {
        case ScreenSize_1366:// 1366
            dict = @{@"pixelWidth":@"130.0",
                     @"pixelHeight":@"130.0",
                     @"moduleTypeNum":@"3"};
            break;
            
        case ScreenSize_1024:// 1024
        case ScreenSize_981: // 981
            dict = @{@"pixelWidth":@"120.0",
                     @"pixelHeight":@"120.0",
                     @"moduleTypeNum":@"3"};
            break;
            
        case ScreenSize_768: // 768
            dict = @{@"pixelWidth":@"90.0",
                     @"pixelHeight":@"90.0",
                     @"moduleTypeNum":@"3"};
            break;
            
        case ScreenSize_694: // 694
            dict = @{@"pixelWidth":@"82.0",
                     @"pixelHeight":@"82.0",
                     @"moduleTypeNum":@"3"};
            break;
            
        case ScreenSize_678: // 678
            dict = @{@"pixelWidth":@"80.0",
                    @"pixelHeight":@"80.0",
                    @"moduleTypeNum":@"3"};
        break;
            
        case ScreenSize_639: // 639
            dict = @{@"pixelWidth":@"75.0",
                     @"pixelHeight":@"75.0",
                     @"moduleTypeNum":@"3"};
            break;
            
        case ScreenSize_507: //507
            dict = @{@"pixelWidth":@"60.0",
                     @"pixelHeight":@"60.0",
                     @"moduleTypeNum":@"3"};
            break;
            
        case ScreenSize_438: //438   没有轮播器
            dict = @{@"pixelWidth":@"100.0",
                     @"pixelHeight":@"100.0",
                     @"moduleTypeNum":@"4"};
            break;
            
        case ScreenSize_375: //375   没有轮播器
            dict = @{@"pixelWidth":@"80.0",
                     @"pixelHeight":@"80.0",
                     @"moduleTypeNum":@"4"};
            break;
            
        case ScreenSize_320: //320
            dict = @{@"pixelWidth":@"35.0",
                     @"pixelHeight":@"35.0",
                     @"moduleTypeNum":@"3"};
            break;
       
            default:
            NSLog(@"屏幕类型未识别!");
        }
    
    [self setValuesForKeysWithDictionary:dict];
}


@end
