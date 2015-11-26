//
//  RNCellView.m
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import "RNCellView.h"

@implementation RNCellView

-(void)setCollectionView:(UICollectionView *)collectionView {
    _collectionView = collectionView;
    _quileViewCell = [[RNQuileViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"CustomCell"];
    _quileViewCell.cellView = self;
}

-(void)setComponentHeight:(float)componentHeight {
    _componentHeight = componentHeight;
    if (componentHeight){
        [_collectionView reloadData];
    }
}

@end
