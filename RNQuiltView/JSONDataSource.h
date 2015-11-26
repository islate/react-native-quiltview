//
//  JSONDataSource.h
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RNQuiltView.h"

@interface JSONDataSource : NSObject<RNQuiltViewDatasource>

-(id)initWithDictionary:(NSDictionary *)params;
-(id)initWithFilename:(NSString *)file filter:(NSString *)filter args:(NSArray *)args;
@property (nonatomic, strong) NSArray *sections;
@end
