import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse("EILIEILI_KEY                    ");

export function Encrypt(str) {


    let srcs = CryptoJS.enc.Utf8.parse(str);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {

        // mode: CryptoJS.mode.ECB,
        mode: CryptoJS.mode.ECB,  // mode 与后台一致
        padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}



// AES 解密 ：字符串 key iv  返回base64

export function Decrypt(str) {


    let base64 = CryptoJS.enc.Base64.parse(str);
    let src = CryptoJS.enc.Base64.stringify(base64);

    var decrypt = CryptoJS.AES.decrypt(src, key, {

        // mode: CryptoJS.mode.ECB,
        mode: CryptoJS.mode.ECB, // 保持一致
        padding: CryptoJS.pad.Pkcs7
    });

    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
