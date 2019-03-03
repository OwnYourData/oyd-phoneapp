import {NativeModules} from 'react-native';

const { Sodium } = NativeModules;

let SodiumAPI = {
    CRYPTO_BOX_SECRETKEYBYTES: Sodium.CRYPTO_BOX_SECRETKEYBYTES,
    CRYPTO_BOX_PUBLICKEYBYTES: Sodium.CRYPTO_BOX_PUBLICKEYBYTES,
    CRYPTO_BOX_SEEDBYTES: Sodium.CRYPTO_BOX_SEEDBYTES,
    CRYPTO_BOX_NONCEBYTES: Sodium.CRYPTO_BOX_NONCEBYTES,
    CRYPTO_SECRETBOX_KEYBYTES: Sodium.CRYPTO_SECRETBOX_KEYBYTES,
    CRYPTO_SECRETBOX_MACBYTES: Sodium.CRYPTO_SECRETBOX_MACBYTES,
    CRYPTO_SECRETBOX_NONCEBYTES: Sodium.CRYPTO_SECRETBOX_NONCEBYTES,
    CRYPTO_SIGN_BYTES: Sodium.CRYPTO_SIGN_BYTES,
    CRYPTO_SIGN_SEEDBYTES: Sodium.CRYPTO_SIGN_SEEDBYTES,
    CRYPTO_SIGN_SECRETKEYBYTES: Sodium.CRYPTO_SIGN_SECRETKEYBYTES,
    CRYPTO_SIGN_PUBLICKEYBYTES: Sodium.CRYPTO_SIGN_PUBLICKEYBYTES,
    CRYPTO_AUTH_BYTES: Sodium.CRYPTO_AUTH_BYTES,
    CRYPTO_AUTH_KEYBYTES: Sodium.CRYPTO_AUTH_KEYBYTES,
    
    randombytes: async(length :int) :string => {
        try {
            var randombytes = await Sodium.randombytes(length)
            return randombytes
        } catch (error) {
            return error
        }
    },
    crypto_box_keypair: async() :{
        PublicKey: string,
        SecretKey: string
    } => {
        try{
            var {PublicKey, SecretKey} = await Sodium.crypto_box_keypair()
            return {
                PublicKey: PublicKey,
                SecretKey: SecretKey
            }
        } catch(e) {
            return e
        }
    },
    crypto_box_seed_keypair: async(seed :string) :{
        PublicKey: string,
        SecretKey: string
    } => {
        try{
            var {PublicKey, SecretKey} = await Sodium.crypto_box_seed_keypair(seed)
            return {
                PublicKey: PublicKey,
                SecretKey: SecretKey
            }
        } catch(e) {
            return e
        }
    },
    crypto_box_easy: async(msg :string, nonce :string, publicKey :string, secretKey :string) :string => {
        try{
            var Cipher = await Sodium.crypto_box_easy(msg, nonce, publicKey, secretKey)
            return Cipher
        } catch(e) {
            return e
        }
    },
    crypto_box_open_easy: async(cipher :string, nonce :string, publicKey :string, secretKey :string) :string => {
        try{
            var msg = await Sodium.crypto_box_open_easy(cipher, nonce, publicKey, secretKey)
            return msg
        } catch(e) {
            return e
        }
    },
    crypto_sign_keypair: async() :{
        SigningKey: string,
        VerifyKey: string
    } => {
        try{
            var {SigningKey, VerifyKey} = await Sodium.crypto_sign_keypair()
            return {
                SigningKey: SigningKey,
                VerifyKey: VerifyKey
            }
        } catch(e) {
            return e
        }
    },
    crypto_sign_seed_keypair: async(seed :string) :{
        SigningKey: string,
        VerifyKey: string
    } => {
        try{
            var {SigningKey, VerifyKey} = await Sodium.crypto_sign_seed_keypair(seed)
            return {
                SigningKey: SigningKey,
                VerifyKey: VerifyKey
            }
        } catch(e) {
            return e
        }
    },
    crypto_sign: async(msg :string, secretKey :string) :string => {
        try {
            var Signature = await Sodium.crypto_sign(msg, secretKey)
            return Signature
        } catch(e) {
            return e
        }
    },
    crypto_sign_open: async(signature :string, secretKey :string) :string => {
        try {
            var message = await Sodium.crypto_sign_open(signature, secretKey)
            return message
        } catch(e) {
            return e
        }
    },
    crypto_sign_detached: async(msg :string, secretKey :string) :string => {
        try {
            var Signature = await Sodium.crypto_sign_detached(msg, secretKey)
            return Signature
        } catch(e) {
            return e
        }
    },
    crypto_sign_verify_detached: async(msg :string, signature :string, secretKey :string) :boolean => {
        try {
            var isValid = await Sodium.crypto_sign_verify_detached(signature, msg, secretKey)
            return isValid
        } catch(e) {
            return e
        }
    }, 
    crypto_secretbox_easy: async(message :string, nonce :string, secretKey :string) :string => {
        try {
            var cipher = await Sodium.crypto_secretbox_easy(message, nonce, secretKey)
            return cipher
        } catch (error) {
            return error
        }
    },
    crypto_secretbox_open_easy: async(cipher :string, nonce :string, secretKey :string) :string => {
        try {
            var message = Sodium.crypto_secretbox_open_easy(cipher, nonce, secretKey)
            return message
        } catch (error) {
            return error
        }
    },
    crypto_auth: async(input :string, key :string) :string => {
        try {
            var mac = await Sodium.crypto_auth(input, key)
            return mac
        } catch (error) {
            return error
        }
    },
    crypto_auth_verify: async(mac :string, input :string, key :string) :boolean => {
        try {
            var valid = await Sodium.crypto_auth_verify(mac, input, key)
            return valid
        } catch (error) {
            return error
        }
    }
}

module.exports = SodiumAPI