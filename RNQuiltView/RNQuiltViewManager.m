//
//  RNQuiltViewManager.m
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import "RNQuiltViewManager.h"
#import "RNQuiltView.h"
#import "RCTBridge.h"
#import "RCTConvert.h"

@implementation RNQuiltViewManager

RCT_EXPORT_MODULE()
- (UIView *)view
{
    return [[RNQuiltView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

RCT_EXPORT_VIEW_PROPERTY(pixelWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(pixelHeight, CGFloat)

RCT_EXPORT_VIEW_PROPERTY(sections, NSArray)
RCT_EXPORT_VIEW_PROPERTY(json, NSString)
RCT_EXPORT_VIEW_PROPERTY(editing, BOOL)
RCT_EXPORT_VIEW_PROPERTY(autoFocus, BOOL)
RCT_EXPORT_VIEW_PROPERTY(emptyInsets, BOOL)
RCT_EXPORT_VIEW_PROPERTY(filter, NSString)
RCT_EXPORT_VIEW_PROPERTY(selectedValue, id)
RCT_EXPORT_VIEW_PROPERTY(filterArgs, NSArray)
RCT_EXPORT_VIEW_PROPERTY(additionalItems, NSArray)
RCT_EXPORT_VIEW_PROPERTY(selectedIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(selectedSection, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(cellHeight, float)

RCT_EXPORT_VIEW_PROPERTY(textColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(selectedTextColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(detailTextColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(separatorColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(moveWithinSectionOnly, BOOL)

RCT_CUSTOM_VIEW_PROPERTY(contentInset, UIEdgeInsets, RNQuiltView) {
    [view setContentInset:[RCTConvert UIEdgeInsets:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(contentOffset, CGPoint, RNQuiltView) {
    [view setContentOffset:[RCTConvert CGPoint:json]];
}

RCT_CUSTOM_VIEW_PROPERTY(scrollIndicatorInsets, UIEdgeInsets, RNQuiltView) {
    [view setScrollIndicatorInsets:[RCTConvert UIEdgeInsets:json]];
}

/*
- (NSDictionary *)constantsToExport {
    return @{
             @"Style": @{
                     @"Plain": @(UITableViewStylePlain),
                     @"Grouped": @(UITableViewStyleGrouped)
                     },
             @"CellStyle": @{
                     @"Default": @(UITableViewCellStyleDefault),
                     @"Value1": @(UITableViewCellStyleValue1),
                     @"Value2": @(UITableViewCellStyleValue2),
                     @"Subtitle": @(UITableViewCellStyleSubtitle)
                     }
             };
}
 */

RCT_CUSTOM_VIEW_PROPERTY(fontSize, CGFloat, RNQuiltView)
{
    view.font = [RCTConvert UIFont:view.font withSize:json ?: @(defaultView.font.pointSize)];
}
RCT_CUSTOM_VIEW_PROPERTY(fontWeight, NSString, RNQuiltView)
{
    view.font = [RCTConvert UIFont:view.font withWeight:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(fontStyle, NSString, RNQuiltView)
{
    view.font = [RCTConvert UIFont:view.font withStyle:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(fontFamily, NSString, RNQuiltView)
{
    view.font = [RCTConvert UIFont:view.font withFamily:json ?: defaultView.font.familyName];
}

@end
