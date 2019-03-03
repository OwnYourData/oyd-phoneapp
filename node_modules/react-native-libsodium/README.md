# react-native-libsodium
libsodium wrapper for React Native

ReMark : Currently support only Android because I don't have a Mac Pro or Macbook or whatever Mac (just Mac fish burger).

## Contribute
Just pull request!

## Install

```
yarn add react-native-libsodium
```

```
react-native link
```


## Android Config
 * AndroidManifest.xml

 ```
<manifest
    ...

    xmlns:tools="http://schemas.android.com/tools"

    ...>

    <application

        ...

        tools:replace="android:allowBackup"

        ...>

        ...

    </application>

    ...

</manifest>
 ```

* android/app/build.gradle

```
android {
    compileSdkVersion 25
    buildToolsVersion "25.0.3"
...
    defaultConfig {
      targetSdkVersion 25
```

## Example
```
(async() => {
    let keybob = await Sodium.crypto_box_keypair()
    let keyalice = await Sodium.crypto_box_keypair()
    let nonce = await Sodium.randombytes(Sodium.CRYPTO_BOX_NONCEBYTES)
    let cipher = await Sodium.crypto_box_easy("I miss you Bob", nonce, keybob.PublicKey, keyalice.SecretKey)
    Sodium.crypto_box_open_easy(cipher, nonce, keyalice.PublicKey, keybob.SecretKey).then(console.log) // /(>///<)\

    let keysig = await Sodium.crypto_sign_keypair()
    let sig = await Sodium.crypto_sign_detached("My name is donus.", keysig.SigningKey)
    Sodium.crypto_sign_verify_detached("My name is donus.", sig, keysig.VerifyKey).then(console.log)

    let sign = await Sodium.crypto_sign("Are you sure you goona use this?", keysig.SigningKey)
    Sodium.crypto_sign_open(sign, keysig.VerifyKey).then(console.log)
})()
```
## Provide API
all api using async

## randombytes(length:int) return string
//use to random generate nonce, seed, etc.
* length : output length
* return : randombytes in hex string format

### crypto_box_keypair() return { PublicKey: string, SecretKey: string }
* return : box keypair in hex string format

### crypto_box_seed_keypair(seed:string) return { PublicKey: string, SecretKey: string }
* seed : seed size CRYPTO_BOX_SEEDBYTES
* return : box keypair in hex string format

### crypto_box_easy(msg :string, nonce :string, publicKey :string, secretKey :string) return string
* msg : message
* nonce : randome string size CRYPTO_BOX_NONCEBYTES
* publickey : receiver's publickey in hex string format
* secretkey : sender's secretkey in hex string format
* return : cipher in hex string format

### (cipher :string, nonce :string, publicKey :string, secretKey :string) return string
* msg : message
* nonce : randome string size CRYPTO_BOX_NONCEBYTES
* publickey : sender's publickey in hex string format
* secretkey : receiver's secretkey in hex string format
* return : original message

### crypto_sign_keypair() return { SigningKey: string, VerifyKey: string }
* return : ed25519 keypair in hex string format

### crypto_sign_seed_keypair(seed :string) return { SigningKey: string, VerifyKey: string }
* seed : seed size CRYPTO_SIGN_SEEDBYTES
* return : ed25519 keypair in hex string format

### crypto_sign(msg :string, secretKey :string) return string
* msg : message
* secretkey : signer's ed25519 secretkey in hex string format
* return : ed25519 signed message (size msg.length + CRYPTO_SIGN_BYTES)

### crypto_sign_open(signature :string, secretKey :string) return string
* signature : ed25519 signed message
* secretKey : signer's ed25519 secretkey in hex string format
* return : original message

### crypto_sign_detached(msg :string, secretKey :string) return string
* msg : message
* secretkey : signer's ed25519 secretkey in hex string format
* return : ed25519 signature (size CRYPTO_SIGN_BYTES)

## crypto_sign_verify_detached(msg :string, signature :string, secretKey :string) return boolean
* msg : original message
* signature : ed25519 signature
* secretKey : signer's ed25519 secretkey in hex string format
* return : signature validation

### crypto_secretbox_easy(message :string, nonce :string, secretKey :string) return string
* message : message
* nonce : randome string size CRYPTO_SECRETBOX_NONCEBYTES
* secretKey : secretKey
* return : cipher

### crypto_secretbox_open_easy(cipher :string, nonce :string, secretKey :string) return string
* cipher : cipher from above api
* nonce : randome string size CRYPTO_SECRETBOX_NONCEBYTES
* secretKey : same as above api
* return : original message for sure!
### crypto_auth(input :string, key :string) return string
https://download.libsodium.org/doc/secret-key_cryptography/secret-key_authentication.html
### crypto_auth_verify(mac :string, input :string, key :string) return boolean
https://download.libsodium.org/doc/secret-key_cryptography/secret-key_authentication.html

## Next Step
more libsodium api wrapper and support ios

## Credit
joshjdevl/libsodium-jni (https://github.com/joshjdevl/libsodium-jni)
