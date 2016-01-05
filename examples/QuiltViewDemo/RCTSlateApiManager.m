//
//  RCTSlateApiManager.m
//  QuiltViewDemo
//
//  Created by linyize on 16/1/5.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTSlateApiManager.h"

@implementation RCTSlateApiManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(fetchJSON:(NSString *)urlString callback:(RCTResponseSenderBlock)callback)
{
  NSLog(@"%@", urlString);
  if (!callback) {
    return;
  }
  
  NSURL *url = [NSURL URLWithString:urlString];
  NSURLSession *urlSession = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]];
  NSURLSessionDataTask * dataTask = [urlSession dataTaskWithURL:url
                                             completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
                                               NSLog(@"%@", error);
                                               if (error) {
                                                 callback(@[error, [NSNull null]]);
                                                 return;
                                               }
                                               
                                               NSError *jsonError = nil;
                                               
                                               id json = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&jsonError];
                                               if (jsonError) {
                                                 callback(@[jsonError, [NSNull null]]);
                                                 return;
                                               }
                                               callback(@[[NSNull null], json]);
                                      }];
  [dataTask resume];
}

@end
