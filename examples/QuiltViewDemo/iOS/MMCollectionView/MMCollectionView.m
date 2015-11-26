//
//  MMCollectionView.m
//  QuiltViewDemo
//
//  Created by lyricdon on 15/11/26.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "MMCollectionView.h"
#import "RFQuiltLayout.h"
#import "cellModel.h"


#define HIDDENFLAG 4
#define MODULENUM 30

@interface MMCollectionView()<UICollectionViewDataSource,UICollectionViewDelegate,RFQuiltLayoutDelegate>

@property (strong, nonatomic) UICollectionView *collectionView;
// 组件的像素信息
@property (nonatomic, strong) cellModel *cellInfo;
// 组件数组
@property (nonatomic, strong) NSMutableArray *numbers;


@end

@implementation MMCollectionView

#pragma mark - lazy load

-(NSMutableArray *)numbers
{
  if (_numbers == nil) {
    int num = 0;
    _numbers = [@[] mutableCopy];
    for(; num < MODULENUM; num++) {
      [_numbers addObject:@(num)];
    }
  }
  return _numbers;
}

-(cellModel *)cellInfo
{
  if (_cellInfo == nil) {
    _cellInfo = [cellModel new];
  }
  return _cellInfo;
}



- (void)createTableView {
  
  RFQuiltLayout* layout = [RFQuiltLayout new];
  layout.direction = UICollectionViewScrollDirectionVertical;
  layout.delegate = self;
  layout.blockPixels = CGSizeMake(self.pixelWidth, self.pixelHeight);
  
  _collectionView = [[UICollectionView alloc] initWithFrame:CGRectZero collectionViewLayout:layout];
  _collectionView.dataSource = self;
  _collectionView.delegate = self;
  
  
  [self addSubview:_collectionView];
}



#pragma mark – RFQuiltLayoutDelegate

// 返回indexPath位置的 Size比
-(CGSize) collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout blockSizeForItemAtIndexPath:(NSIndexPath *)indexPath{
  
  // 第一个组件图片轮播器
  if (!(self.cellInfo.moduleTypeNum == HIDDENFLAG)){ // 1/3分屏时不显示轮播器,
    if (indexPath.row == 0) return CGSizeMake(8, 4);
  }
  // 根据组件大小,动态返回系数...
  if (indexPath.row % self.cellInfo.moduleTypeNum == 1) return CGSizeMake(4, 2);
  else if (indexPath.row % self.cellInfo.moduleTypeNum == 0) return CGSizeMake(4, 1);
  else return CGSizeMake(2, 2);
}

- (UIEdgeInsets)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout insetsForItemAtIndexPath:(NSIndexPath *)indexPath {
  
  // 默认有边距, 这里设置的数值,会在cell 的frame 中减掉
  return UIEdgeInsetsMake(10, 4, 0, 4);
}


#pragma mark - UICollectionView Delegate

- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath
{
  NSLog(@"do sth...");
}

#pragma mark - UICollectionView Datasource

- (NSInteger)collectionView:(UICollectionView *)view numberOfItemsInSection:(NSInteger)section {
  return self.numbers.count;
  
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)cv cellForItemAtIndexPath:(NSIndexPath *)indexPath {
  UICollectionViewCell *cell = [cv dequeueReusableCellWithReuseIdentifier:@"cell" forIndexPath:indexPath];
  cell.backgroundColor = [self colorForNumber:self.numbers[indexPath.row]];
  
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

/* 随机颜色 */
- (UIColor*) colorForNumber:(NSNumber*)num {
  return [UIColor colorWithHue:((19 * num.intValue) % 255)/255.f saturation:1.f brightness:1.f alpha:1.f];
}

/* 每次屏幕变化都会调用 */
-(void)viewWillTransitionToSize:(CGSize)size withTransitionCoordinator:(id<UIViewControllerTransitionCoordinator>)coordinator
{

  NSLog(@"viewWillTransitionToSize: %f",size.width);
  
  [self getScreenState:size];
  
  // 修改布局属性
  RFQuiltLayout* layout = (RFQuiltLayout *)self.collectionView.collectionViewLayout;
  //    layout.prelayoutEverything = YES;
  layout.blockPixels = CGSizeMake(self.cellInfo.pixelWidth, self.cellInfo.pixelHeight);
}

/* 判断当前屏幕状态,并设定单元cell */
- (void)getScreenState:(CGSize) size{
  
  // 获得当前屏幕的状态
  //    NSLog(@"trait.horizontalSizeClass: %tu %tu", self.traitCollection.horizontalSizeClass, self.traitCollection.verticalSizeClass);
  
  if (size.width == 1366) {      // 水平全屏
    [self.cellInfo updateCellWithTag:ScreenSize_1366];
  }else if (size.width == 981) {// 水平2/3
    [self.cellInfo updateCellWithTag:ScreenSize_981];
  }else if (size.width == 768) {
    [self.cellInfo updateCellWithTag:ScreenSize_768];
  }else if (size.width == 678) {// 水平1/2
    [self.cellInfo updateCellWithTag:ScreenSize_678];
  }else if (size.width == 694) {// 垂直2/3
    [self.cellInfo updateCellWithTag:ScreenSize_694];
  }else if (size.width == 639) {// 垂直2/3
    [self.cellInfo updateCellWithTag:ScreenSize_639];
  }else if (size.width == 507) {// 垂直1/3 水平1/3
    [self.cellInfo updateCellWithTag:ScreenSize_507];
  }else if (size.width == 438) {// 垂直1/3 水平1/3
    [self.cellInfo updateCellWithTag:ScreenSize_438];
  }
  else if (size.width == 375) {// 垂直1/3 水平1/3
    [self.cellInfo updateCellWithTag:ScreenSize_375];
  }
  else if (size.width == 320) {// 垂直1/3 水平1/3
    [self.cellInfo updateCellWithTag:ScreenSize_320];
  }
  else {                       // 默认垂直全屏
    [self.cellInfo updateCellWithTag:ScreenSize_1024];
  }
  
}


@end
