# Create Cipher

With the latest deprecation of `createCipher` in Node.JS in favor of `createCipheriv` I went digging to see how the original version got by without specifying the _initialisation vector_ `iv`.

After a lot of code spelunking the Node.JS source code `EVP_BytesToKey` was the answer.

This npm package with the same name [EVP_BytesToKey](https://www.npmjs.com/package/evp_bytestokey) is quite helpful.

It implements in javascript the same algorithm that is implemented in the OpenSSL C code.

## Quickstart

```bash
git clone https://github.com/neozenith/create-cipher
cd create-cipher
npm i
node index.js
```

**Output:**

```bash
{
  key: <Buffer b0 52 be 6f 06 a6 18 d4 8b c2 f5 ac 1d 38 69 bc>,
  iv: <Buffer ca 1d aa 04 cb 99 a2 13 42 f0 be 51 79 09 0e 05>
}
createCipher 2xa+Xa2vGwNyhgqQHMA+PT7lBl2Bbw+F9iAOmf2QJ+c=
createCipheriv 2xa+Xa2vGwNyhgqQHMA+PT7lBl2Bbw+F9iAOmf2QJ+c=
(node:55356) [DEP0106] DeprecationWarning: crypto.createCipher is deprecated.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

## !!!WARNING!!!

This algorithm for deriving key and initialisation vector uses MD5. This is computationally insecure and can be brute forced in very reasonable time frames.

This is for educational purposes.

Please use more secure methods for generating keys and initialisation vectors for your ciphers.

## How it works

It takes a target number of bits for the cipher key and a target number of bytes for the iv.

It takes the password (and an optional salt concatenated), then hashes that buffer of data.

It then takes a fragment of that hash and uses it to start filling the byte Buffers for `key` and `iv`.

Subsequent rounds reuse the hash concatenated with the password and salt to generate the next round hash.

With each round fragments of bytes are sipped out of the hash until the target amount of bytes have filled the `key` and `iv`.

Because the hash is added to subsequent rounds, it is what changes the suqsequent hash so a new semi random block of bytes can be consumed.

