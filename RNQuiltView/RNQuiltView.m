//
//  RNQuiltView.m
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import "RNQuiltView.h"

#import "RCTConvert.h"
#import "RCTEventDispatcher.h"
#import "RCTUtils.h"
#import "UIView+React.h"
#import "JSONDataSource.h"
#import "RNCellView.h"
#import "RFQuiltLayout.h"
#import "RNCellModel.h"

#define HIDDENFLAG 4
#define MODULENUM 30

@interface RNQuiltView()<UICollectionViewDataSource, UICollectionViewDelegate, RFQuiltLayoutDelegate>
{
    id<RNQuiltViewDatasource> datasource;
}
@property (strong, nonatomic) NSMutableArray *selectedIndexes;
@property (strong, nonatomic) UICollectionView *collectionView;

// 组件的像素信息
@property (nonatomic, strong) RNCellModel *cellInfo;
// 组件数组
@property (nonatomic, strong) NSMutableArray *numbers;

@end

@implementation RNQuiltView
{
    RCTEventDispatcher *_eventDispatcher;
    NSArray *_items;
    NSMutableArray *_cells;
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
    // will not insert because we don't need to draw them
    //   [super insertSubview:subview atIndex:atIndex];
    
    // just add them to registry
    if ([subview isKindOfClass:[RNCellView class]]){
        RNCellView *cellView = (RNCellView *)subview;
        cellView.collectionView = self.collectionView;
        while (cellView.section >= [_cells count]){
            [_cells addObject:[NSMutableArray array]];
        }
        [_cells[cellView.section] addObject:subview];
        if (cellView.section == [_sections count]-1 && cellView.row == [_sections[cellView.section][@"count"] integerValue]-1){
            [self.collectionView reloadData];
        }
    }
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    RCTAssertParam(eventDispatcher);
    
    if ((self = [super initWithFrame:CGRectZero])) {
        _eventDispatcher = eventDispatcher;
        _cellHeight = 44;
        _cells = [NSMutableArray array];
        _autoFocus = YES;
        
       
        [self getScreenState:self.bounds.size];
        
        //        [self createCollectionView];
    }
    return self;
}


- (void)layoutSubviews
{
    [super layoutSubviews];
    
    [_collectionView setFrame:self.bounds];
    
    // 如果外部设置了值就不在自动计算
    if (!(self.pixelHeight || self.pixelWidth)) {
        [self getScreenState:self.bounds.size];
    }
    
}


#pragma mark - lazy load

-(UICollectionView *)collectionView
{
    if (_collectionView == nil) {
        RFQuiltLayout *layout = [RFQuiltLayout new];
        layout.direction = UICollectionViewScrollDirectionVertical;
        layout.delegate = self;
        // item像素
        layout.blockPixels = CGSizeMake(self.cellInfo.pixelWidth, self.cellInfo.pixelHeight);
        
        _collectionView = [[UICollectionView alloc] initWithFrame:self.bounds collectionViewLayout:layout];
        _collectionView.dataSource = self;
        _collectionView.delegate = self;
        
        [_collectionView registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:@"cell"];
        
        [self addSubview:_collectionView];
    }
    return _collectionView;
}

- (NSMutableArray *)numbers
{
    if(_numbers == nil)
    {
        int num = 0;
        _numbers = [@[] mutableCopy];
        for(; num < MODULENUM; num++)
        {
            [_numbers addObject:@(num)];
        }
    }
    return _numbers;
}

- (RNCellModel *)cellInfo
{
    if(_cellInfo == nil)
    {
        _cellInfo = [RNCellModel new];
    }
    return _cellInfo;
}


-(void)setPixelWidth:(CGFloat)pixelWidth
{
    _pixelWidth = pixelWidth;
    
    RFQuiltLayout *layout = (RFQuiltLayout *)self.collectionView.collectionViewLayout;
    layout.blockPixels = CGSizeMake(pixelWidth, layout.blockPixels.height);
}

-(void)setPixelHeight:(CGFloat)pixelHeight
{
    pixelHeight = pixelHeight;
    
    RFQuiltLayout *layout = (RFQuiltLayout *)self.collectionView.collectionViewLayout;
    layout.blockPixels = CGSizeMake(layout.blockPixels.width, pixelHeight);
}

/* 判断当前屏幕状态,并设定单元cell */
- (void)getScreenState:(CGSize)size
{
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
    
    
    // 修改布局属性
    RFQuiltLayout* layout = (RFQuiltLayout *)self.collectionView.collectionViewLayout;
    //    layout.prelayoutEverything = YES;
    layout.blockPixels = CGSizeMake(self.cellInfo.pixelWidth, self.cellInfo.pixelHeight);
}

#pragma mark - UICollectionViewDataSource

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    return self.numbers.count;
}

// The cell that is returned must be retrieved from a call to -dequeueReusableCellWithReuseIdentifier:forIndexPath:
- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    UICollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"cell" forIndexPath:indexPath];
    cell.backgroundColor = [self colorForNumber:self.numbers[indexPath.row]];
    
#warning TODO:...
    
    // 方块计数label
    UILabel* label = (id)[cell viewWithTag:5];
    if(!label) label = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 30, 20)];
    label.tag = 5;
    label.textColor = [UIColor blackColor];
    label.text = [NSString stringWithFormat:@"%@", self.numbers[indexPath.row]];
    label.backgroundColor = [UIColor clearColor];
    [cell addSubview:label];
    
    return cell;
}

#pragma mark - RFQuiltLayoutDelegate

- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout blockSizeForItemAtIndexPath:(NSIndexPath *)indexPath // defaults to 1x1
{
    // 第一个组件图片轮播器
    if (!(self.cellInfo.moduleTypeNum == HIDDENFLAG)){ // 1/3分屏时不显示轮播器,
        if (indexPath.row == 0) return CGSizeMake(8, 4);
    }
    // 根据组件大小,动态返回系数...
    if (indexPath.row % self.cellInfo.moduleTypeNum == 1) return CGSizeMake(4, 2);
    else if (indexPath.row % self.cellInfo.moduleTypeNum == 0) return CGSizeMake(4, 1);
    else return CGSizeMake(2, 2);
}

- (UIEdgeInsets)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout insetsForItemAtIndexPath:(NSIndexPath *)indexPath // defaults to uiedgeinsetszero
{
    // 默认有边距, 这里设置的数值,会在cell 的frame 中减掉
    return UIEdgeInsetsMake(10, 4, 0, 4);
}

#pragma mark - Private APIs



/*
- (void)createCollectionView
{
    
    RFQuiltLayout *layout = [RFQuiltLayout new];
    layout.direction = UICollectionViewScrollDirectionVertical;
    layout.delegate = self;
    // item像素
      layout.blockPixels = CGSizeMake(self.cellInfo.pixelWidth, self.cellInfo.pixelHeight);
    
    _collectionView = [[UICollectionView alloc] initWithFrame:self.bounds collectionViewLayout:layout];
    _collectionView.dataSource = self;
    _collectionView.delegate = self;
    _collectionView.allowsMultipleSelection = NO;
    _collectionView.contentInset = self.contentInset;
    _collectionView.contentOffset = self.contentOffset;
    _collectionView.scrollIndicatorInsets = self.scrollIndicatorInsets;
    _collectionView.backgroundColor = [UIColor clearColor];
    
    [_collectionView registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:@"cell"];

    [self addSubview:_collectionView];
}
*/

/* 随机颜色 */
- (UIColor*)colorForNumber:(NSNumber*)num
{
    return [UIColor colorWithHue:((19 * num.intValue) % 255)/255.f saturation:1.f brightness:1.f alpha:1.f];
}


#warning INVALID控制器方法,已经失效
/* 
// 每次屏幕变化都会调用
- (void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator
{
    [self getScreenState:size];
    
    // 修改布局属性
    RFQuiltLayout* layout = (RFQuiltLayout *)self.collectionView.collectionViewLayout;
    //    layout.prelayoutEverything = YES;
    layout.blockPixels = CGSizeMake(self.cellInfo.pixelWidth, self.cellInfo.pixelHeight);
}
*/












#pragma mark -

- (void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (self.emptyInsets)
    {
        // Remove separator inset
        if ([cell respondsToSelector:@selector(setSeparatorInset:)]) {
            [cell setSeparatorInset:UIEdgeInsetsZero];
        }
        
        // Prevent the cell from inheriting the Table View's margin settings
        if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)]) {
            [cell setPreservesSuperviewLayoutMargins:NO];
        }
        
        // Explictly set your cell's layout margins
        if ([cell respondsToSelector:@selector(setLayoutMargins:)]) {
            [cell setLayoutMargins:UIEdgeInsetsZero];
        }
    }
    if (self.font)
    {
        cell.detailTextLabel.font = self.font;
        cell.textLabel.font = self.font;
    }
    if (self.tintColor)
    {
        cell.tintColor = self.tintColor;
    }
    NSDictionary *item = [self dataForRow:indexPath.item section:indexPath.section];
    if (self.selectedTextColor && [item[@"selected"] intValue]){
        cell.textLabel.textColor = self.selectedTextColor;
        cell.detailTextLabel.textColor = self.selectedTextColor;
    } else {
        if (self.textColor){
            cell.textLabel.textColor = self.textColor;
            cell.detailTextLabel.textColor = self.textColor;
        }
        if (self.detailTextColor){
            cell.detailTextLabel.textColor = self.detailTextColor;
        }
        
    }
}

- (void)setSections:(NSArray *)sections
{
    _sections = [NSMutableArray arrayWithCapacity:[sections count]];
    
    // create selected indexes
    _selectedIndexes = [NSMutableArray arrayWithCapacity:[sections count]];
    
    BOOL found = NO;
    for (NSDictionary *section in sections){
        NSMutableDictionary *sectionData = [NSMutableDictionary dictionaryWithDictionary:section];
        NSMutableArray *allItems = [NSMutableArray array];
        if (self.additionalItems){
            [allItems addObjectsFromArray:self.additionalItems];
        }
        [allItems addObjectsFromArray:sectionData[@"items"]];
        
        NSMutableArray *items = [NSMutableArray arrayWithCapacity:[allItems count]];
        NSInteger selectedIndex = -1;
        for (NSDictionary *item in allItems){
            NSMutableDictionary *itemData = [NSMutableDictionary dictionaryWithDictionary:item];
            if ((itemData[@"selected"] && [itemData[@"selected"] intValue]) || (self.selectedValue && [self.selectedValue isEqual:item[@"value"]])){
                if(selectedIndex == -1)
                    selectedIndex = [items count];
                itemData[@"selected"] = @YES;
                found = YES;
            }
            [items addObject:itemData];
        }
        [_selectedIndexes addObject:[NSNumber numberWithUnsignedInteger:selectedIndex]];
        
        sectionData[@"items"] = items;
        [_sections addObject:sectionData];
    }
    [self.collectionView reloadData];
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return [_sections count];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    NSInteger count = [_sections[section][@"items"] count];
    // if we have custom cells, additional processing is necessary
    if ([self hasCustomCells:section]){
        if ([_cells count]<=section){
            return 0;
        }
        // don't display cells until their's height is not calculated (TODO: maybe it is possible to optimize??)
        for (RNCellView *view in _cells[section]){
            if (!view.componentHeight){
                return 0;
            }
        }
        count = [_cells[section] count];
    }
    return count;
}
/*
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];
    NSDictionary *item = [self dataForRow:indexPath.item section:indexPath.section];
    
    // check if it is standard cell or user-defined UI
    if (![self hasCustomCells:indexPath.section]){
        if (cell == nil) {
            cell = [[UITableViewCell alloc] initWithStyle:self.tableViewCellStyle reuseIdentifier:@"Cell"];
        }
        cell.textLabel.text = item[@"label"];
        cell.detailTextLabel.text = item[@"detail"];
    } else {
        //cell = ((RNCellView *)_cells[indexPath.section][indexPath.row]).quiltViewCell;
    }
    if (item[@"selected"] && [item[@"selected"] intValue]){
        cell.accessoryType = UITableViewCellAccessoryCheckmark;
    } else if ([item[@"arrow"] intValue]) {
        cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    } else {
        cell.accessoryType = UITableViewCellAccessoryNone;
    }
    return cell;
}
*/
- (NSMutableDictionary *)dataForRow:(NSInteger)row section:(NSInteger)section
{
    return (NSMutableDictionary *)_sections[section][@"items"][row];
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (![self hasCustomCells:indexPath.section])
    {
        return _cellHeight;
    }
    else
    {
        RNCellView *cell = (RNCellView *)_cells[indexPath.section][indexPath.row];
        CGFloat height =  cell.componentHeight;
        return height;
    }
    
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:NO];
    
    NSInteger selectedIndex = [self.selectedIndexes[indexPath.section] integerValue];
    NSMutableDictionary *oldValue = selectedIndex>=0 ?[self dataForRow:selectedIndex section:indexPath.section] : [NSMutableDictionary dictionaryWithDictionary:@{}];
    
    NSMutableDictionary *newValue = [self dataForRow:indexPath.item section:indexPath.section];
    newValue[@"target"] = self.reactTag;
    newValue[@"selectedIndex"] = [NSNumber numberWithInteger:indexPath.item];
    newValue[@"selectedSection"] = [NSNumber numberWithInteger:indexPath.section];
    
    
    [_eventDispatcher sendInputEventWithName:@"press" body:newValue];
    
    // unselect old, select new
    if ((oldValue[@"selected"] && [oldValue[@"selected"] intValue]) || self.selectedValue){
        [oldValue removeObjectForKey:@"selected"];
        [newValue setObject:@1 forKey:@"selected"];
        [self.collectionView reloadData];
    }
    self.selectedIndexes[indexPath.section] = [NSNumber numberWithInteger:indexPath.item];
}

- (BOOL)hasCustomCells:(NSInteger)section
{
    return [[_sections[section] valueForKey:@"customCells"] boolValue];
}


RCT_NOT_IMPLEMENTED(-initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(-initWithCoder:(NSCoder *)aDecoder)

- (void)setContentInset:(UIEdgeInsets)insets
{
    _contentInset = insets;
    _collectionView.contentInset = insets;
}

- (void)setContentOffset:(CGPoint)offset
{
    _contentOffset = offset;
    _collectionView.contentOffset = offset;
}

- (void)setScrollIndicatorInsets:(UIEdgeInsets)insets
{
    _scrollIndicatorInsets = insets;
    _collectionView.scrollIndicatorInsets = insets;
}

@end
