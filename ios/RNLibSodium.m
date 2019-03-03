//
//  RCTSodium.m
//  RCTSodium
//
//  Created by Lyubomir Ivanov on 9/25/16.
//  Copyright © 2016 Lyubomir Ivanov. All rights reserved.
//

#import <Foundation/Foundation.h>


#import <sodium.h>
#import "RNLibSodium.h"

@implementation RNLibSodium

static bool isInitialized;
NSString * const ESODIUM = @"ESODIUM";
NSString * const ERR_BAD_KEY = @"BAD_KEY";
NSString * const ERR_BAD_MAC = @"BAD_MAC";
NSString * const ERR_BAD_MSG = @"BAD_MSG";
NSString * const ERR_BAD_NONCE = @"BAD_NONCE";
NSString * const ERR_BAD_SEED = @"BAD_SEED";
NSString * const ERR_BAD_SIG = @"BAD_SIG";
NSString * const ERR_FAILURE = @"FAILURE";

RCT_EXPORT_MODULE();
+ (void) initialize
{
  [super initialize];
  isInitialized = sodium_init() != -1;
}

- (NSData *)dataFromHexString:(NSString*)str {
  NSData* nsData = [str dataUsingEncoding:NSUTF8StringEncoding];
  const char* chars = [nsData bytes];
  int i = 0, len = nsData.length;
  
  NSMutableData *data = [NSMutableData dataWithCapacity:len / 2];
  char byteChars[3] = {'\0','\0','\0'};
  unsigned long wholeByte;
  
  while (i < len) {
    byteChars[0] = chars[i++];
    byteChars[1] = chars[i++];
    wholeByte = strtoul(byteChars, NULL, 16);
    [data appendBytes:&wholeByte length:1];
  }
  
  return data;
}
- (NSDictionary *)constantsToExport
{
  return @{
           @"crypto_secretbox_KEYBYTES": @ crypto_secretbox_KEYBYTES,
           @"crypto_secretbox_NONCEBYTES": @ crypto_secretbox_NONCEBYTES,
           @"crypto_secretbox_MACBYTES": @ crypto_secretbox_MACBYTES,
           @"crypto_auth_KEYBYTES": @crypto_auth_KEYBYTES,
           @"crypto_auth_BYTES": @crypto_auth_BYTES,
           @"crypto_box_PUBLICKEYBYTES": @crypto_box_PUBLICKEYBYTES,
           @"crypto_box_SECRETKEYBYTES": @crypto_box_SECRETKEYBYTES,
           @"crypto_box_NONCEBYTES": @crypto_box_NONCEBYTES,
           @"crypto_box_MACBYTES": @crypto_box_MACBYTES,
           @"crypto_sign_PUBLICKEYBYTES": @crypto_sign_PUBLICKEYBYTES,
           @"crypto_sign_SECRETKEYBYTES": @crypto_sign_SECRETKEYBYTES,
           @"crypto_sign_SEEDBYTES": @crypto_sign_SEEDBYTES,
           @"crypto_sign_BYTES": @crypto_sign_BYTES
           };
}

RCT_EXPORT_METHOD(crypto_box_easy:(NSString*)m n:(NSString*)n pk:(NSString*)pk sk:(NSString*)sk resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  const NSData *dns = [self dataFromHexString: n];
  const NSData *dpks =[self dataFromHexString: pk];
  const NSData *dsks =[self dataFromHexString: sk];
  
  const NSData *dm = [m dataUsingEncoding:NSUTF8StringEncoding];
  const NSData *dn = dns;
  const NSData *dpk = dpks;
  const NSData *dsk = dsks;
  
  unsigned long clen = crypto_box_MACBYTES + dm.length;
  unsigned char *dc = (unsigned char *) sodium_malloc(clen);
  
  
  if (dc == NULL) reject(ESODIUM,ERR_FAILURE,nil);
  else {
    int result = crypto_box_easy(dc,[dm bytes], dm.length, [dn bytes], [dpk bytes], [dsk bytes]);
    if (result != 0) {
      reject(ESODIUM,ERR_FAILURE,nil);
    } else {
      const NSData *res =[NSData dataWithBytesNoCopy:dc length:clen freeWhenDone:NO];
      
      NSUInteger capacity = res.length * 2;
      NSMutableString *sbuf = [NSMutableString stringWithCapacity:capacity];
      const unsigned char *buf = res.bytes;
      NSInteger i;
      for (i=0; i<res.length; ++i) {
        [sbuf appendFormat:@"%02lX", (unsigned long)buf[i]];
      }

      resolve([sbuf lowercaseString]);
      sodium_free(dc);
    }
  }
}

RCT_EXPORT_METHOD(randombytes_buf:(NSUInteger)size resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  unsigned char *buf = (unsigned char *) sodium_malloc((u_int32_t)size);
  if (buf == NULL) {
  reject(ESODIUM,ERR_FAILURE,nil);
  } else {
     randombytes_buf(buf,(u_int32_t)size);
    
    const NSData *res =[NSData dataWithBytesNoCopy:buf length:size freeWhenDone:NO];
    
    NSUInteger capacity = res.length * 2;
    NSMutableString *sbuf = [NSMutableString stringWithCapacity:capacity];
    const unsigned char *bufs = res.bytes;
    NSInteger i;
    for (i=0; i<res.length; ++i) {
      [sbuf appendFormat:@"%02lX", (unsigned long)bufs[i]];
    }
    
    resolve([sbuf lowercaseString]);
    sodium_free(buf);
  }
}

-(NSString *)getkey:(unsigned char *)k {
  unsigned long clen = crypto_box_PUBLICKEYBYTES;
  const NSData *res =[NSData dataWithBytesNoCopy:k length:clen freeWhenDone:NO];
 
  NSUInteger capacity = res.length * 2;
  NSMutableString *sbuf = [NSMutableString stringWithCapacity:capacity];
  const unsigned char *buf = res.bytes;
  NSInteger i;
  for (i=0; i<res.length; ++i) {
    [sbuf appendFormat:@"%02lX", (unsigned long)buf[i]];
  }
  return [sbuf lowercaseString];
}

RCT_EXPORT_METHOD(crypto_box_keypair:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
  unsigned char pk[crypto_box_PUBLICKEYBYTES],sk[crypto_box_SECRETKEYBYTES];
  if ( crypto_box_keypair(pk,sk) == 0) {
    NSString *pk64 = [self getkey: pk];
    NSString *sk64 = [self getkey: sk];
    if (!pk64 || !sk64) reject(ESODIUM,ERR_FAILURE,nil); else resolve(@{@"PublicKey":pk64, @"SecretKey":sk64});
  }
  else
    reject(ESODIUM,ERR_FAILURE,nil);
}

@end

