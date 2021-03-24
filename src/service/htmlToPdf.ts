import axios from 'axios';
const CryptoJS = require("crypto-js");

const SecretId = 'AKIDb2nLqpjfI77zjlx4j5k9wet9l4uerx4fypsj';
const SecretKey = 'f6Y8zy0E5uiI8X4Zl05zB8ht5a1ayi4qoYds7fEN';
const source = 'htmlToPDF';
const auth = "hmac id=\"" + SecretId + "\", algorithm=\"hmac-sha1\", headers=\"x-date source\", signature=\"";

export interface PdfParams {
    htmlContent: string
    theme: string
    themeColor: string
    isMark: boolean
    isOnePage: boolean
    pages: string
}

export async function getPdf(params: PdfParams) {
    const nowDate = new Date();
    const dateTime = nowDate.toUTCString();
    const signStr = "x-date: " + dateTime + "\n" + "source: " + source;
    let sign = CryptoJS.HmacSHA1(signStr, SecretKey);
    sign = CryptoJS.enc.Base64.stringify(sign);
    sign = auth + sign + "\"";
    let res = await axios({
        method: 'post',
        url: 'https://service-d1t5xx72-1303026468.gz.apigw.tencentcs.com/release/pdfTest', // 用户 API 的访问路径
        data: params,
        timeout: 15 * 1000,
        headers: {
            "Source": source,
            "X-Date": dateTime,
            "Authorization": sign
        },
        withCredentials: true,
    })
    return res.data;
}
