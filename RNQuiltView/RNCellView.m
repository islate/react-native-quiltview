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
//    _quiltViewCell = [[RNQuiltViewCell alloc] init];
    _quiltViewCell.cellView = self;
}


+ (instancetype)cellViewWithDict:(NSDictionary *)dict
{
    id cellView = [[self alloc] init];
    [cellView setValuesForKeysWithDictionary:dict];
    return cellView;
}

-(void)setValue:(id)value forUndefinedKey:(NSString *)key
{}

@end
