//
//  RNQuiltView.m
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import "RNQuiltView.h"

//#import "MMRefresh.h"
#import "RCTConvert.h"
#import "RCTEventDispatcher.h"
#import "RCTUtils.h"
#import "UIView+React.h"
//#import "JSONDataSource.h"
#import "RNCellView.h"
#import "RFQuiltLayout.h"
#import "RNCellModel.h"
#import "RNQuiltViewCell.h"

@interface RNQuiltView()<UICollectionViewDataSource, UICollectionViewDelegate, RFQuiltLayoutDelegate>

@property (strong, nonatomic) NSMutableArray *selectedIndexes;
@property (strong, nonatomic) UICollectionView *collectionView;
//@property (strong, nonatomic) MMRefresh *refreshView;

// 组件的像素信息
@property (nonatomic, strong) RNCellModel *cellInfo;

@end

@implementation RNQuiltView
{
    RCTEventDispatcher *_eventDispatcher;
    RFQuiltLayout *_layout;
    NSMutableArray *_rncells;
    CGFloat _width;
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    RCTAssertParam(eventDispatcher);
    
    if ((self = [super initWithFrame:CGRectZero])) {
        _eventDispatcher = eventDispatcher;
        _rncells = [NSMutableArray array];
    }
    return self;
}


// 获得所有section的数据
- (void)setSections:(NSArray *)sections
{
    _sections = [NSMutableArray arrayWithCapacity:[sections count]];
    
    for (NSDictionary *section in sections){
        NSMutableDictionary *sectionData = [NSMutableDictionary dictionaryWithDictionary:section];
        
        NSMutableArray *allItems = [NSMutableArray array];
        [allItems addObjectsFromArray:sectionData[@"items"]];
        
        NSMutableArray *items = [NSMutableArray arrayWithCapacity:[allItems count]];
        
        for (NSDictionary *item in allItems){
            NSMutableDictionary *itemData = [NSMutableDictionary dictionaryWithDictionary:item];
            [items addObject:itemData];
        }
 
        sectionData[@"items"] = items;
        [_sections addObject:sectionData];
    }
    [self.collectionView reloadData];
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
    if ([subview isKindOfClass:[RNCellView class]])
    {
        RNCellView *cellView = (RNCellView *)subview;
        [_rncells addObject:cellView];
    }
}

- (void)layoutSubviews
{
    [super layoutSubviews];

    [_collectionView setFrame:self.bounds];
    
    [self getScreenState:self.bounds.size];
}

#pragma mark - lazy load

- (UICollectionView *)collectionView
{
    if (_collectionView == nil)
    {
        _layout = [RFQuiltLayout new];
        _layout.direction = UICollectionViewScrollDirectionVertical;
        _layout.delegate = self;
        // item像素
        _layout.blockPixels = CGSizeMake(self.cellInfo.pixelWidth, self.cellInfo.pixelHeight);
        
        _collectionView = [[UICollectionView alloc] initWithFrame:self.bounds collectionViewLayout:_layout];
        _collectionView.dataSource = self;
        _collectionView.delegate = self;
        _collectionView.backgroundColor = [UIColor clearColor];
        
        [self addSubview:_collectionView];
        
        [_collectionView registerClass:[RNQuiltViewCell class] forCellWithReuseIdentifier:@"Cell"];
    }
    return _collectionView;
}

//-(MMRefresh *)refreshView
//{
//    if(_refreshView == nil)
//    {
//        _refreshView = [MMRefresh refreshView];
//        [self addSubview:_refreshView];
//        // 添加约束
//        _refreshView.translatesAutoresizingMaskIntoConstraints = false;
//        [self addConstraint:[NSLayoutConstraint constraintWithItem:_refreshView attribute:NSLayoutAttributeRight relatedBy:NSLayoutRelationEqual toItem:self attribute:NSLayoutAttributeRight multiplier:1.0 constant:0]];
//        [self addConstraint:[NSLayoutConstraint constraintWithItem:_refreshView attribute:NSLayoutAttributeHeight relatedBy:NSLayoutRelationEqual toItem:nil attribute:NSLayoutAttributeNotAnAttribute multiplier:1 constant:60]];
//        [self addConstraint:[NSLayoutConstraint constraintWithItem:_refreshView attribute:NSLayoutAttributeLeft relatedBy:NSLayoutRelationEqual toItem:self attribute:NSLayoutAttributeLeft multiplier:1.0 constant:0]];
//        [self addConstraint:[NSLayoutConstraint constraintWithItem:_refreshView attribute:NSLayoutAttributeBottom relatedBy:NSLayoutRelationEqual toItem:self attribute:NSLayoutAttributeTop multiplier:1.0 constant:0]];
//        
//        _refreshView.quiltView = self;
//    }
//    return _refreshView;
//}

- (RNCellModel *)cellInfo
{
    if(_cellInfo == nil)
    {
        _cellInfo = [RNCellModel new];
    }
    return _cellInfo;
}

#pragma mark - UICollectionViewDataSource

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    if (_sections.count == 0) {
        return 0;
    }
    NSInteger count = [_sections[section][@"items"] count];
    return count;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    RNQuiltViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"Cell" forIndexPath:indexPath];
    RNCellView *cellView = nil;
    
    if (indexPath.row < _rncells.count) {
        cellView = [_rncells objectAtIndex:indexPath.row];
    }
    
    cell.cellView = cellView;
    
    cell.backgroundColor = [self colorForNumber:@(indexPath.item)];

    return cell;
}

//#pragma mark - collectionView delegate
//
//- (void)scrollViewDidScroll:(UIScrollView *)scrollView
//{
//    self.refreshView.scrollView = scrollView;
//}
//
//- (void)scrollViewDidEndDragging:(UIScrollView *)scrollView willDecelerate:(BOOL)decelerate
//{
//    if ( scrollView.contentOffset.y <= -60) {
//        self.refreshView.needRefresh = YES;
//        self.refreshView.scrollView = scrollView;
//        NSLog(@"需要刷新");
//    }
//}


#pragma mark - RFQuiltLayoutDelegate

- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout blockSizeForItemAtIndexPath:(NSIndexPath *)indexPath // defaults to 1x1
{
    if (indexPath.row >= _rncells.count) {
        return CGSizeMake(4, 1);
    }
    RNCellView *cellView = [_rncells objectAtIndex:indexPath.row];
    if (cellView == nil) {
        return CGSizeMake(4, 1);
    }
    return CGSizeMake(cellView.widthRatio, cellView.heightRatio);
}

- (UIEdgeInsets)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout insetsForItemAtIndexPath:(NSIndexPath *)indexPath // defaults to uiedgeinsetszero
{
    // 默认有边距, 这里设置的数值,会在cell 的frame 中减掉
    if (collectionView.bounds.size.width > 414) {
        return UIEdgeInsetsMake(2, 2, 2, 2);
    }
    return UIEdgeInsetsMake(0, 0, 1, 0);
//    return UIEdgeInsetsZero;
}

/* 判断当前屏幕状态,并设定单元cell */
- (void)getScreenState:(CGSize)size
{
    if (_width == size.width) {
        return;
    }
    
    switch ((int)size.width) {
        case 1366:
            [self.cellInfo updateCellWithTag:ScreenSize_1366];
            break;
        case 981:
            [self.cellInfo updateCellWithTag:ScreenSize_981];
            break;
        case 768:
            [self.cellInfo updateCellWithTag:ScreenSize_768];
            break;
        case 694:
            [self.cellInfo updateCellWithTag:ScreenSize_694];
            break;
        case 678:
            [self.cellInfo updateCellWithTag:ScreenSize_678];
            break;
        case 639:
            [self.cellInfo updateCellWithTag:ScreenSize_639];
            break;
        case 507:
            [self.cellInfo updateCellWithTag:ScreenSize_507];
            break;
        case 438:
            [self.cellInfo updateCellWithTag:ScreenSize_438];
            break;
        case 414:
            [self.cellInfo updateCellWithTag:ScreenSize_414];
            break;
        case 375:
            [self.cellInfo updateCellWithTag:ScreenSize_375];
            break;
        case 320:
            [self.cellInfo updateCellWithTag:ScreenSize_320];
            break;
        default:    // 默认pro 竖屏 1024宽
            [self.cellInfo updateCellWithTag:ScreenSize_1024];
            break;
    }
    
    _width = size.width;
    
    // 修改布局属性
    _layout.blockPixels = CGSizeMake(self.cellInfo.pixelWidth, self.cellInfo.pixelHeight);
    
    // 通知各个Cell修正大小 （解决了旋转和分屏的样式适配）
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [[NSNotificationCenter defaultCenter] postNotificationName:@"UpdateBlockPixels" object:nil];
    });
}

#pragma mark - Private APIs

/* 随机颜色 */
- (UIColor*)colorForNumber:(NSNumber*)num
{
    return [UIColor colorWithHue:((19 * num.intValue) % 255)/255.f saturation:1.f brightness:1.f alpha:1.f];
}

- (NSDictionary *)dataForRow:(NSInteger)row section:(NSInteger)section
{
    return (NSDictionary *)_sections[section][@"items"][row];
}

RCT_NOT_IMPLEMENTED(-initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(-initWithCoder:(NSCoder *)aDecoder)


@end
