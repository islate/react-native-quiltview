//
//  MMCollectionManager.m
//  QuiltViewDemo
//
//  Created by lyricdon on 15/11/26.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "MMCollectionManager.h"
#import "MMCollectionView.h"

@implementation MMCollectionManager


RCT_EXPORT_MODULE(CollectionView)

-(UIView<RCTComponent> *)view
{
  return [[MMCollectionView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(pixelWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(pixelHeight, CGFloat)

@end
