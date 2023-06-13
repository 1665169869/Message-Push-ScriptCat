/*
 * @Author: 白羽
 * @Date: 2023-06-07 00:16:38
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-13 12:24:48
 * @FilePath: \scriptcat-push-weixin\src\utils\other.js
 * @Description: 其他API接口
 */

import { TYPE_LIST } from "../store/index";

/**
 * 计算两个时间戳之差的小时数
 * @param {number} currentTime 这次的时间戳
 * @param {number} lastTime 上次的时间戳
 * @returns {number} 返回相差的小时数 有小数点
 */
export const getTimeDifference = (currentTime, lastTime) => {
    // 计算两个时间戳之间的差值（单位是毫秒）
    const timeDifference = currentTime - lastTime;

    // 如果相差不到1小时，则返回0
    if (timeDifference < 60 * 60 * 1000) {
        return 0;
    }

    // 将时间差转换为小时数，并保留一位小数
    const hourDifference = parseFloat((timeDifference / 1000 / 60 / 60).toFixed(1));

    // 返回小时数对应的数字，如果小于0则加上24
    return hourDifference >= 0 ? hourDifference : hourDifference + 24;
}

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


/**
 * 从沙雕APP开放接口中获取数据
 * @param {'chp' | 'pyq' | 'du'} type
 * @returns {Promise<String>}
 */
export const getWordsFromApiShadiao = async (type) => {
    const typeNameMap = {
        chp: '土味情话(彩虹屁)',
        pyq: '朋友圈文案',
        du: '毒鸡汤',
    }
    if (!['chp', 'pyq', 'du'].includes(type)) {
        console.error('type参数有误，应为chp, pyq, du的其中一个')
        return ''
    }
    const url = `https://api.shadiao.pro/${type}`;
    try {
        const res = await new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                url,
                method: "GET",
                responseType: "json",
                onload: resolve,
                onerror: reject
            });
        }).catch(err => err);
        return (res.response && res.response.data && res.response.data.text);
    } catch (error) {
        console.error(`${typeNameMap[type]}：发生错误`, error);
        return '';
    }


    // try {
    //     const res = await axios.get(url, {
    //         responseType: 'json',
    //     }).catch((err) => err)
    //     return (res.data && res.data.data && res.data.data.text) || ''
    // } catch (e) {
    //     console.error(`${typeNameMap[type]}：发生错误`, e)
    //     return ''
    // }
}

/**
 * 土味情话（彩虹屁）
 * @returns {Promise<String>} 土味情话(彩虹屁）内容
 */
export const getEarthyLoveWords = async () => {
    return getWordsFromApiShadiao('chp')
}

/**
 * 朋友圈文案
 * @returns {Promise<String>} 朋友圈文案内容
 */
export const getMomentCopyrighting = async () => {
    return getWordsFromApiShadiao('pyq')
}

/**
 * 毒鸡汤
 * @returns {Promise<String>} 毒鸡汤内容
 */
export const getPoisonChickenSoup = async () => {
    return getWordsFromApiShadiao('du')
}