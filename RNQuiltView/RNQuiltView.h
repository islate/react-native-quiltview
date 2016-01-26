//
//  RNQuiltView.h
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "RCTAutoInsetsProtocol.h"
#import "RCTEventDispatcher.h"
#import "RCTScrollableProtocol.h"
#import "RCTView.h"
#import "RCTScrollView.h"

extern CGFloat const ZINDEX_DEFAULT;
extern CGFloat const ZINDEX_STICKY_HEADER;

@class RCTEventDispatcher;

@interface RNQuiltView : RCTView <UIScrollViewDelegate, RCTScrollableProtocol, RCTAutoInsetsProtocol>

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@property (nonatomic, copy) NSMutableArray *sections;

- (void)invalidateLayout;


// RCTAutoInsetsProtocol
@property (nonatomic, assign) UIEdgeInsets contentInset;
@property (nonatomic, assign) BOOL automaticallyAdjustContentInsets;

// RCTScrollableProtocol
@property (nonatomic, weak) NSObject<UIScrollViewDelegate> *nativeScrollDelegate;
@property (nonatomic, assign) CGSize contentSize;

// RCTScrollView

/**
 * The `RCTScrollView` may have at most one single subview. This will ensure
 * that the scroll view's `contentSize` will be efficiently set to the size of
 * the single subview's frame. That frame size will be determined somewhat
 * efficiently since it will have already been computed by the off-main-thread
 * layout system.
 */
@property (nonatomic, readonly) UIView *contentView;

/**
 * The underlying scrollView (TODO: can we remove this?)
 */
@property (nonatomic, readonly) UIScrollView *scrollView;

@property (nonatomic, assign) NSTimeInterval scrollEventThrottle;
@property (nonatomic, assign) BOOL centerContent;
@property (nonatomic, assign) int snapToInterval;
@property (nonatomic, copy) NSString *snapToAlignment;
@property (nonatomic, copy) NSIndexSet *stickyHeaderIndices;
@property (nonatomic, copy) RCTDirectEventBlock onRefreshStart;

- (void)endRefreshing;

@end
