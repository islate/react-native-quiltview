//
//  MMCollectionView.h
//  QuiltViewDemo
//
//  Created by lyricdon on 15/11/26.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RCTComponent.h"

@interface MMCollectionView : UIView <RCTComponent>

@property (nonatomic, assign) CGFloat pixelWidth;
@property (nonatomic, assign) CGFloat pixelHeight;


@end
