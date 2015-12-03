//
//  JSONDataSource.m
//  RNQuiltView
//
//  Created by linyize on 26.11.15.
//  Copyright (c) 2015 mmslate. All rights reserved.
//

#import "JSONDataSource.h"

@implementation JSONDataSource
-(id)initWithFilename:(NSString *)filename filter:(NSString *)filter args:(NSArray *)filterArgs {
    NSString *jsonPath = [[NSBundle mainBundle] pathForResource:filename
                                                         ofType:@"json"];
    
    NSAssert(jsonPath, @"Filename %@ doesn't exist within app bundle", filename);
    NSData *data = [NSData dataWithContentsOfFile:jsonPath];
    NSError *error = nil;
    id json = [NSJSONSerialization JSONObjectWithData:data
                                                               options:NSJSONReadingMutableContainers
                                                                 error:&error];
    
    NSAssert(error==nil, @"JSON Error %@", [error description]);
    //NSAssert([json isKindOfClass:[NSArray class]], @"JSON should be NSArray type");
    
    NSArray *sections = nil;
    if ([json isKindOfClass:[NSArray class]]) {
        sections = (NSArray *)json;
    }
    else
    {
        NSArray *components = [json objectForKey:@"components"];
        NSAssert([components isKindOfClass:[NSArray class]], @"JSON should be NSArray type");
        if ([components isKindOfClass:[NSArray class]])
        {
            sections = @[@{@"items":components}];
        }
    }
    
//    if (filter){
//        for (NSMutableDictionary *sections in json){
//            sections[@"items"] = [sections[@"items"] filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:filter argumentArray:filterArgs]];
//        }
//    }
    
    _sections = sections;
    return self;
}

-(id)initWithDictionary:(NSDictionary *)params {
  NSString *filename = params[@"filename"];
  NSAssert(filename, @"Filename should be defined");
    return [self initWithFilename:filename filter:params[@"filter"] args:params[@"args"]];
}


@end
