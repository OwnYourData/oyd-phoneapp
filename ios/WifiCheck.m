//
//  WifiCheck.m
//  ownyourdata
//
//  Created by Emile Harmel on 11/05/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "Reachability.h"
#import "WifiCheck.h"

@implementation WifiCheck
RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(getWifi:
                  (RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  Reachability *reachability = [Reachability reachabilityForInternetConnection];
  [reachability startNotifier];
  
  NetworkStatus status = [reachability currentReachabilityStatus];
  
  if(status == NotReachable) {
    resolve(@"false");
    return;
      }
  if (status == ReachableViaWiFi)
      {
    resolve(@"true");
    return;
      }
  resolve(@"false");
}
@end

