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
#import "RCTScrollView.h"
#import "RCTUIManager.h"

@interface RNQuiltView (Private)

- (NSArray<NSDictionary *> *)calculateChildFramesData;

@end


@implementation RNQuiltViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
    return [[RNQuiltView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

RCT_EXPORT_VIEW_PROPERTY(sections, NSArray)


// RCTScrollViewManager
RCT_EXPORT_VIEW_PROPERTY(alwaysBounceHorizontal, BOOL)
RCT_EXPORT_VIEW_PROPERTY(alwaysBounceVertical, BOOL)
RCT_EXPORT_VIEW_PROPERTY(bounces, BOOL)
RCT_EXPORT_VIEW_PROPERTY(bouncesZoom, BOOL)
RCT_EXPORT_VIEW_PROPERTY(canCancelContentTouches, BOOL)
RCT_EXPORT_VIEW_PROPERTY(centerContent, BOOL)
RCT_EXPORT_VIEW_PROPERTY(automaticallyAdjustContentInsets, BOOL)
RCT_EXPORT_VIEW_PROPERTY(decelerationRate, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(directionalLockEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(keyboardDismissMode, UIScrollViewKeyboardDismissMode)
RCT_EXPORT_VIEW_PROPERTY(maximumZoomScale, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(minimumZoomScale, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(pagingEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(scrollsToTop, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsHorizontalScrollIndicator, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showsVerticalScrollIndicator, BOOL)
RCT_EXPORT_VIEW_PROPERTY(stickyHeaderIndices, NSIndexSet)
RCT_EXPORT_VIEW_PROPERTY(scrollEventThrottle, NSTimeInterval)
RCT_EXPORT_VIEW_PROPERTY(zoomScale, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(contentInset, UIEdgeInsets)
RCT_EXPORT_VIEW_PROPERTY(scrollIndicatorInsets, UIEdgeInsets)
RCT_EXPORT_VIEW_PROPERTY(snapToInterval, int)
RCT_EXPORT_VIEW_PROPERTY(snapToAlignment, NSString)
RCT_REMAP_VIEW_PROPERTY(contentOffset, scrollView.contentOffset, CGPoint)
RCT_EXPORT_VIEW_PROPERTY(onRefreshStart, RCTDirectEventBlock)

- (NSDictionary<NSString *, id> *)constantsToExport
{
    return @{
             @"DecelerationRate": @{
                     @"normal": @(UIScrollViewDecelerationRateNormal),
                     @"fast": @(UIScrollViewDecelerationRateFast),
                     },
             };
}

RCT_EXPORT_METHOD(getContentSize:(nonnull NSNumber *)reactTag
                  callback:(RCTResponseSenderBlock)callback)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RNQuiltView *> *viewRegistry) {
        
        RNQuiltView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNQuiltView class]]) {
            RCTLogError(@"Cannot find RNQuiltView with tag #%@", reactTag);
            return;
        }
        
        CGSize size = view.scrollView.contentSize;
        callback(@[@{
                       @"width" : @(size.width),
                       @"height" : @(size.height)
                       }]);
    }];
}

RCT_EXPORT_METHOD(calculateChildFrames:(nonnull NSNumber *)reactTag
                  callback:(RCTResponseSenderBlock)callback)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RNQuiltView *> *viewRegistry) {
        
        RNQuiltView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNQuiltView class]]) {
            RCTLogError(@"Cannot find RNQuiltView with tag #%@", reactTag);
            return;
        }
        
        NSArray<NSDictionary *> *childFrames = [view calculateChildFramesData];
        if (childFrames) {
            callback(@[childFrames]);
        }
    }];
}

RCT_EXPORT_METHOD(endRefreshing:(nonnull NSNumber *)reactTag)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, RNQuiltView *> *viewRegistry) {
        
        RNQuiltView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNQuiltView class]]) {
            RCTLogError(@"Cannot find RNQuiltView with tag #%@", reactTag);
            return;
        }
        
        [view endRefreshing];
    }];
}

RCT_EXPORT_METHOD(scrollTo:(nonnull NSNumber *)reactTag withOffset:(CGPoint)offset)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry){
        UIView *view = viewRegistry[reactTag];
        if ([view conformsToProtocol:@protocol(RCTScrollableProtocol)]) {
            [(id<RCTScrollableProtocol>)view scrollToOffset:offset animated:YES];
        } else {
            RCTLogError(@"tried to scrollToOffset: on non-RCTScrollableProtocol view %@ with tag #%@", view, reactTag);
        }
    }];
}

RCT_EXPORT_METHOD(scrollWithoutAnimationTo:(nonnull NSNumber *)reactTag withOffset:(CGPoint)offset)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry){
        UIView *view = viewRegistry[reactTag];
        if ([view conformsToProtocol:@protocol(RCTScrollableProtocol)]) {
            [(id<RCTScrollableProtocol>)view scrollToOffset:offset animated:NO];
        } else {
            RCTLogError(@"tried to scrollToOffset: on non-RCTScrollableProtocol view %@ with tag #%@", view, reactTag);
        }
    }];
}

RCT_EXPORT_METHOD(zoomToRect:(nonnull NSNumber *)reactTag withRect:(CGRect)rect)
{
    [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry){
        UIView *view = viewRegistry[reactTag];
        if ([view conformsToProtocol:@protocol(RCTScrollableProtocol)]) {
            [(id<RCTScrollableProtocol>)view zoomToRect:rect animated:YES];
        } else {
            RCTLogError(@"tried to zoomToRect: on non-RCTScrollableProtocol view %@ with tag #%@", view, reactTag);
        }
    }];
}

- (NSArray<NSString *> *)customDirectEventTypes
{
    return @[
             @"scrollBeginDrag",
             @"scroll",
             @"scrollEndDrag",
             @"scrollAnimationEnd",
             @"momentumScrollBegin",
             @"momentumScrollEnd",
             ];
}

@end
