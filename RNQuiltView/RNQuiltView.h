//
//  RNQuiltView.h
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import <UIKit/UIKit.h>
@class RCTEventDispatcher;

@protocol RNQuiltViewDatasource <NSObject>

// create method with params dictionary
-(id)initWithDictionary:(NSDictionary *)params ;

// array of NSDictionary objects (sections) passed to RCTTableViewDatasource (each section should contain "items" value as NSArray of inner items (NSDictionary)
-(NSArray *)sections;

@end

@interface RNQuiltView : UIView

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@property (nonatomic, copy) NSMutableArray *sections;
@property (nonatomic, copy) NSArray *additionalItems;
@property (nonatomic, strong) NSString *json;
@property (nonatomic, strong) NSString *filter;
@property (nonatomic, strong) NSArray *filterArgs;
@property (nonatomic, strong) id selectedValue;
@property (nonatomic) float cellHeight;

@property (nonatomic) BOOL customCells;
@property (nonatomic) BOOL editing;
@property (nonatomic) BOOL emptyInsets;
@property (nonatomic) BOOL moveWithinSectionOnly;
@property (nonatomic, assign) UIEdgeInsets contentInset;
@property (nonatomic, assign) CGPoint contentOffset;
@property (nonatomic, assign) UIEdgeInsets scrollIndicatorInsets;
@property (nonatomic, strong) UIFont *font;

@property (nonatomic, strong) UIColor *textColor;
@property (nonatomic, strong) UIColor *tintColor;
@property (nonatomic, strong) UIColor *selectedTextColor;
@property (nonatomic, strong) UIColor *detailTextColor;
@property (nonatomic, strong) UIColor *separatorColor;
@property (nonatomic) BOOL autoFocus;

// 默认不需要修改,一旦修改以此数据为准(不赋值则会根据屏幕大小匹配写好的字典设置数值)
@property (nonatomic, assign) CGFloat pixelWidth;
@property (nonatomic, assign) CGFloat pixelHeight;

// TODO系数
@property (nonatomic, assign) NSInteger heightRatio;
@property (nonatomic, assign) NSInteger widthRatio;


@end
