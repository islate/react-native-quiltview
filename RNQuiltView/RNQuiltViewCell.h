//
//  RNQuiltViewCell.h
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RNCellView.h"
@class RNCellView;

@interface RNQuiltViewCell : UICollectionViewCell

/* 在set方法中将cellView加为子视图 */
@property (nonatomic, weak) RNCellView *cellView;

@end
