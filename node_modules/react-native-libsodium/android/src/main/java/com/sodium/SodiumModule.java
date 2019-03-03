package com.sodium;

/**
 * Created by Donus on 12/13/2017.
 */
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import org.libsodium.jni.encoders.Encoder;
import org.libsodium.jni.keys.SigningKey;
import org.libsodium.jni.keys.VerifyKey;

import java.util.HashMap;
import java.util.Map;

import static org.libsodium.jni.NaCl.sodium;

public class SodiumModule extends ReactContextBaseJavaModule {

    public static  final int CRYPTO_BOX_SECRETKEYBYTES = 32;
    public static  final int CRYPTO_BOX_PUBLICKEYBYTES = 32;
    public static  final int CRYPTO_BOX_SEEDBYTES = 32;
    public static  final int CRYPTO_BOX_NONCEBYTES = 24;

    public static  final int CRYPTO_SECRETBOX_KEYBYTES = 32;
    public static  final int CRYPTO_SECRETBOX_MACBYTES = 16;
    public static  final int CRYPTO_SECRETBOX_NONCEBYTES = 24;

    public static  final int CRYPTO_SIGN_BYTES = 64;
    public static  final int CRYPTO_SIGN_SEEDBYTES = 32;
    public static  final int CRYPTO_SIGN_SECRETKEYBYTES = 64;
    public static  final int CRYPTO_SIGN_PUBLICKEYBYTES = 32;

    public static  final int CRYPTO_AUTH_BYTES = 32;
    public static  final int CRYPTO_AUTH_KEYBYTES = 32;


    public SodiumModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Sodium";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("CRYPTO_BOX_SECRETKEYBYTES", CRYPTO_BOX_SECRETKEYBYTES);
        constants.put("CRYPTO_BOX_PUBLICKEYBYTES", CRYPTO_BOX_PUBLICKEYBYTES);
        constants.put("CRYPTO_BOX_SEEDBYTES", CRYPTO_BOX_SEEDBYTES);
        constants.put("CRYPTO_BOX_NONCEBYTES", CRYPTO_BOX_NONCEBYTES);
        constants.put("CRYPTO_SECRETBOX_KEYBYTES", CRYPTO_SECRETBOX_KEYBYTES);
        constants.put("CRYPTO_SECRETBOX_MACBYTES", CRYPTO_SECRETBOX_MACBYTES);
        constants.put("CRYPTO_SECRETBOX_NONCEBYTES", CRYPTO_SECRETBOX_NONCEBYTES);
        constants.put("CRYPTO_SIGN_SEEDBYTES", CRYPTO_SIGN_SEEDBYTES);
        constants.put("CRYPTO_SIGN_SECRETKEYBYTES", CRYPTO_SIGN_SECRETKEYBYTES);
        constants.put("CRYPTO_SIGN_PUBLICKEYBYTES", CRYPTO_SIGN_PUBLICKEYBYTES);
        constants.put("CRYPTO_AUTH_BYTES", CRYPTO_SIGN_PUBLICKEYBYTES);
        constants.put("CRYPTO_AUTH_KEYBYTES", CRYPTO_AUTH_KEYBYTES);

        return constants;
    }

    private  byte[] toByte(String s) {
        return Encoder.HEX.decode(s);
    }

    private  String toString(byte[] b){
        return Encoder.HEX.encode(b);
    }

    private boolean verifyLength(String input, int expected, Promise promise) {
        boolean result = input.length() == expected;
        if(!result) {
            promise.reject("Error length ", ""+input.length());
        }
        return result;
    }

    @ReactMethod
    public void randombytes(int length, Promise promise) {
        byte[] buffer = new byte[length];
        sodium().randombytes(buffer, length);
        promise.resolve(toString(buffer));
    }

    @ReactMethod
    public void crypto_box_keypair(Promise promise){
        byte[] bpublicKey = new byte[CRYPTO_BOX_PUBLICKEYBYTES];
        byte[] bsecretKey = new byte[CRYPTO_BOX_SECRETKEYBYTES];
        sodium().crypto_box_keypair(bpublicKey, bsecretKey);
        WritableMap map = Arguments.createMap();
        map.putString("PublicKey", toString(bpublicKey));
        map.putString("SecretKey",  toString(bsecretKey));
        promise.resolve(map);
    }

    @ReactMethod
    public void crypto_box_seed_keypair(String seed, Promise promise){
        byte[] bpublicKey = new byte[CRYPTO_BOX_PUBLICKEYBYTES];
        byte[] bsecretKey = new byte[CRYPTO_BOX_SECRETKEYBYTES];
        byte[] bseed = toByte(seed);
        sodium().crypto_box_seed_keypair(bpublicKey, bsecretKey, bseed);
        WritableMap map = Arguments.createMap();
        map.putString("PublicKey", toString(bpublicKey));
        map.putString("SecretKey", toString(bsecretKey));
        promise.resolve(map);
    }

    @ReactMethod
    public void crypto_box_easy(String message, String nonce, String publicKey, String secretKey, Promise promise) {
        byte[] bpublicKey = toByte(publicKey);
        byte[] bprivateKey = toByte(secretKey);
        byte[] bmessage = message.getBytes();
        byte[] bnonce = toByte(nonce);
        byte[] cipher = new byte[bmessage.length + CRYPTO_SECRETBOX_MACBYTES];
        sodium().crypto_box_easy(cipher, bmessage, bmessage.length, bnonce, bpublicKey, bprivateKey);
        promise.resolve(toString(cipher));
    }

    @ReactMethod
    public void crypto_box_open_easy(String ciphertext, String nonce, String publicKey, String secretKey, Promise promise){
        byte[] bpublicKey = toByte(publicKey);
        byte[] bprivateKey = toByte(secretKey);
        byte[] bciphertext = toByte(ciphertext);
        byte[] bnonce = toByte(nonce);
        byte[] decipher = new byte[bciphertext.length - CRYPTO_SECRETBOX_MACBYTES];
        sodium().crypto_box_open_easy(decipher, bciphertext, bciphertext.length, bnonce, bpublicKey, bprivateKey);
        try{
            String message = new String(decipher, "UTF-8");
            promise.resolve(message);
        } catch(Exception e) {
            promise.reject("Error :", e.getMessage());
        }
    }

    @ReactMethod
    public void crypto_sign_keypair(Promise promise){
        byte[] bsigningKey = new byte[CRYPTO_SIGN_SECRETKEYBYTES];
        byte[] bverifyKey = new byte[CRYPTO_SIGN_PUBLICKEYBYTES];
        sodium().crypto_sign_keypair(bverifyKey, bsigningKey);
        WritableMap map = Arguments.createMap();
        map.putString("SigningKey", toString(bsigningKey));
        map.putString("VerifyKey", toString(bverifyKey));
        promise.resolve(map);
    }

    @ReactMethod
    public void crypto_sign_seed_keypair(String seed, Promise promise){
        byte[] bsigningKey = new byte[CRYPTO_SIGN_SECRETKEYBYTES];
        byte[] bverifyKey = new byte[CRYPTO_SIGN_PUBLICKEYBYTES];
        byte[] bseed = toByte(seed);
        sodium().crypto_sign_seed_keypair(bverifyKey, bsigningKey, bseed);
        WritableMap map = Arguments.createMap();
        map.putString("SigningKey", toString(bsigningKey));
        map.putString("VerifyKey", toString(bverifyKey));
        promise.resolve(map);
    }

    @ReactMethod
    public void crypto_sign(String message, String signingKey, Promise promise){
        byte[] bmessage = message.getBytes();
        byte[] bsigningKey = toByte(signingKey);
        byte[] signed_message = new byte[bmessage.length + CRYPTO_SIGN_BYTES];
        int[] bufferLen = new int[1];
        sodium().crypto_sign(signed_message, bufferLen, bmessage, bmessage.length, bsigningKey);
        promise.resolve(toString(signed_message));
    }

    @ReactMethod
    public void crypto_sign_open(String signature, String verifyKey, Promise promise){
        byte[] bsignature = toByte(signature);
        byte[] bverifyKey = toByte(verifyKey);
        byte[] unsigned_message = new byte[bsignature.length - CRYPTO_SIGN_BYTES];
        int[] bufferLen = new int[1];
        if (sodium().crypto_sign_open(unsigned_message, bufferLen, bsignature, bsignature.length, bverifyKey) != 0){
            promise.reject("Error","Cannot open the message. Please provide the right key or signed message.");
        } else {
            try{
                String message = new String(unsigned_message, "UTF-8");
                promise.resolve(message);
            } catch(Exception e) {
                promise.reject("Error :", e.getMessage());
            }
        }
    }

    @ReactMethod
    public void crypto_sign_detached(String message, String signingKey, Promise promise) {
        byte[] bmessage = message.getBytes();
        byte[] bsigningKey = toByte(signingKey);
        byte[] signature = new byte[CRYPTO_SIGN_BYTES];
        int[] bufferLen = new int[1];
        sodium().crypto_sign_detached(signature, bufferLen, bmessage, bmessage.length, bsigningKey);
        promise.resolve(toString(signature));
    }

    @ReactMethod
    public void crypto_sign_verify_detached(String signature, String message, String verifyKey, Promise promise) {
        byte[] bmessage = message.getBytes();
        byte[] bverifyKey = toByte(verifyKey);
        byte[] bsignature = toByte(signature);
        if (sodium().crypto_sign_verify_detached(bsignature, bmessage, bmessage.length, bverifyKey) != 0) {
            promise.resolve(false);
        } else {
            promise.resolve(true);
        }
    }

    @ReactMethod
    public void crypto_secretbox_easy(String message, String nonce, String key, Promise promise) {
        byte[] bkey = toByte(key);
        byte[] bmessage = message.getBytes();
        byte[] bnonce = nonce.getBytes();
        byte[] ct = new byte[CRYPTO_SECRETBOX_MACBYTES + bmessage.length];
        sodium().crypto_secretbox_easy(ct, bmessage, bmessage.length, bnonce, bkey);
        promise.resolve(toString(ct));
    }

    @ReactMethod
    public void crypto_secretbox_open_easy(String cipher, String nonce, String key, Promise promise) {
        byte[] bkey = toByte(key);
        byte[] bcipher = toByte(cipher);
        byte[] bnonce = nonce.getBytes();
        byte[] ct = new byte[bcipher.length];
        sodium().crypto_secretbox_open_easy(ct, bcipher, bcipher.length, bnonce, bkey);
        try{
            String message = new String(ct, "UTF-8");
            promise.resolve(message);
        } catch(Exception e) {
            promise.reject("Error : ", e.getMessage());
        }
    }

    @ReactMethod
    public void crypto_auth(String input, String key, Promise promise){
        byte[] bmac = new byte[CRYPTO_AUTH_BYTES];
        byte[] binput = input.getBytes();
        byte[] bkey = toByte(key);
        sodium().crypto_auth(bmac, binput, binput.length, bkey);
        promise.resolve(toString(bmac));
    }
    @ReactMethod
    public void crypto_auth_verify(String mac, String input, String key, Promise promise){
        byte[] bmac = toByte(mac);
        byte[] binput = input.getBytes();
        byte[] bkey = toByte(key);
        if (sodium().crypto_auth_verify(bmac, binput, binput.length, bkey) != 0 ) {
            promise.resolve(false);
        } else {
            promise.resolve(true);
        }
    }
}
