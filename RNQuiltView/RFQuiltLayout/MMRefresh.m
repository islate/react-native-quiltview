//
//  MMRefresh.m
//  RNQuiltView
//
//  Created by lyricdon on 15/12/1.
//  Copyright © 2015年 mmslate. All rights reserved.
//

#import "MMRefresh.h"
#import "RNQuiltView.h"
@interface MMRefresh ()

@property (nonatomic, strong) UIView *tipView;
@property (nonatomic, strong) UIImageView *loadingView;
@property (nonatomic, strong) UIImageView *tipIcon;



@end

@implementation MMRefresh
{
    NSLayoutConstraint *constraint;
    BOOL isRefreshing;
    
    RCTResponseSenderBlock _callbackBlock;
}

RCT_EXPORT_MODULE();

+ (instancetype)refreshView
{
    MMRefresh *refreshView = [[[NSBundle mainBundle] loadNibNamed:@"MMRefresh" owner:nil options:nil] lastObject];
    
    return refreshView;
}

-(void)setQuiltView:(RNQuiltView *)quiltView
{
    _quiltView = quiltView;
    
    constraint = quiltView.constraints.lastObject;
    _needRefresh = NO;
    isRefreshing = NO;
}

- (void)setScrollView:(UIScrollView *)scrollView
{
    // 正在刷新
    if (isRefreshing) return;
    
    _scrollView = scrollView;
    
    if (scrollView.contentOffset.y < 0 ) [self pullUpRefresh];
    
    if (scrollView.contentOffset.y + scrollView.frame.size.height > scrollView.contentSize.height)
    {
        [self pullDownRefresh];
    }
    
}

// 下拉
- (void)pullUpRefresh
{
    if ( _scrollView.contentOffset.y <= -60 ) {
        constraint.constant = 60;
        return;
    }else if (_scrollView.contentOffset.y >= 0)
    {
        constraint.constant = -20;
        return;
    }
    
    if (!_needRefresh)
    {
        // TODO下拉动画
        constraint.constant = - _scrollView.contentOffset.y;
    }else
    {
        isRefreshing = YES;
        NSLog(@"开始刷新");

        [self loadData:_callbackBlock];
    }
    
}

// 通过jsx 回调数据
RCT_EXPORT_METHOD(loadData:(RCTResponseSenderBlock) callback)
{
    self.tipView.hidden = YES;
    
    [UIView animateWithDuration:1.5 animations:^{
    
        self.loadingView.transform = CGAffineTransformRotate(self.loadingView.transform, M_PI);
        
    } completion:^(BOOL finished) {
        
        [UIView animateWithDuration:1 animations:^{
            self.alpha = 0;
        }completion:^(BOOL finished) {
            constraint.constant = -20;
            
            self.alpha = 1;
            self.tipView.hidden = NO;
            isRefreshing = NO;
            _needRefresh = NO;
            NSLog(@"刷新完成");
        }];
        
    }];
}

// 上拉
- (void)pullDownRefresh
{
    //    NSLog(@"上拉刷新");
}






@end
