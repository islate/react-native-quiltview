//
//  RNQuiltViewCell.m
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import "RNQuiltViewCell.h"

@implementation RNQuiltViewCell


-(void)setCellView:(RNCellView *)cellView {
    _cellView = cellView;
    [self.contentView addSubview:cellView];
}

-(void)setFrame:(CGRect)frame {
    [super setFrame:frame];
    [_cellView setFrame:CGRectMake(0, 0, frame.size.width, frame.size.height)];
}

// Called by the collection view before the instance is returned from the reuse queue.
-(void)prepareForReuse
{
    [super prepareForReuse];
//    self.cellView.collectionView.cells
    NSLog(@" I'm reuse : %@",self);
}

@end
