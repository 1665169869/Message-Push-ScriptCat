/*
 * @Author: 白羽
 * @Date: 2023-06-07 00:16:38
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-07 00:42:38
 * @FilePath: \scriptcat-push-weixin\src\utils\other.js
 * @Description: 
 */

import { TYPE_LIST } from "../store/index";


/**
 * 金山词霸每日一句
 * @returns
 */
export const getCIBA = async () => {
    const url = 'http://open.iciba.com/dsapi/'
    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    }
    const res = await new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            url,
            headers,
            method: "GET",
            responseType: "json",
            onload: resolve,
            onerror: reject
        });
    }).catch(err => err);
    // const res = await axios.get(url, {
    //     headers
    // }).catch((err) => err)

    if (res.status === 200 && res) {
        return res.response;
    }
    console.error('金山词霸每日一句: 发生错误', res);
    return {};
}


/**
 * 获取下一休息日tts
 * @returns
 */
export const getHolidaytts = async () => {
    let result = "";
    const url = 'https://wangxinleo.cn/api/wx-push/holiday/getHolidaytts';
    const res = await new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            url,
            method: "GET",
            responseType: "json",
            onload: resolve,
            onerror: reject
        });
    }).catch(err => err);
    // const res = await axios.get(url).catch((err) => err)

    if (res.status === 200 && res.response && res.response.code === 0) {
        result = res.response.tts;
        return result;
    }
    console.error('获取下一休息日tts: 发生错误', res);
    return result;
}

/**
 * 每日一言
 * @param {*} type
 * @returns
 */
export const getOneTalk = async (type) => {

    const filterQuery = TYPE_LIST.filter((item) => item.name === type)
    const query = filterQuery.length ? filterQuery[0].type : TYPE_LIST[randomNum(0, 7)].type
    const url = `https://v1.hitokoto.cn/?c=${query}`
    const res = await new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            url,
            method: "GET",
            responseType: "json",
            onload: resolve,
            onerror: reject
        });
    }).catch(err => err);
    // const res = await axios.get(url).catch((err) => err)

    if (res && res.status === 200) {
        return res.response;
    }

    console.error('每日一言: 发生错误', res);
    return {};
}
