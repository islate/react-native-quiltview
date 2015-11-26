//
//  RNCellView.h
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RNQuiltViewCell.h"

@class RNQuiltViewCell;

@interface RNCellView : UIView

@property (nonatomic) NSInteger row;
@property (nonatomic) NSInteger section;
@property (nonatomic) float componentHeight;
@property (nonatomic) float componentWidth;
@property (nonatomic, weak) UICollectionView *collectionView;
@property (nonatomic, strong) RNQuiltViewCell *quiltViewCell;

@end
