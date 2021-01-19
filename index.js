const crypto = require('crypto');
const EVP_BytesToKey = require('evp_bytestokey')

const cryptoKey = 'supersecretKey';
const iv = null; //Buffer.from('');
const cipherMode = 'aes-128-cbc';
const keys = EVP_BytesToKey(cryptoKey, null, 128, 16);
console.log(keys);
const clientSecret = 'My secret message';

const cipher = crypto.createCipher(cipherMode, cryptoKey);
let cryptedClientSecret = cipher.update(clientSecret, 'utf8', 'base64');
cryptedClientSecret += cipher.final('base64');

console.log('createCipher', cryptedClientSecret);

const cipherIV = crypto.createCipheriv(cipherMode, keys.key, keys.iv);
let cryptedClientSecretIV = cipherIV.update(clientSecret, 'utf8', 'base64');
cryptedClientSecretIV += cipherIV.final('base64');

console.log('createCipheriv', cryptedClientSecretIV);



