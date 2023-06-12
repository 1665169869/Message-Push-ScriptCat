/*
 * @Author: 白羽
 * @Date: 2023-06-05 19:34:50
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-12 21:35:05
 * @FilePath: \scriptcat-push-weixin\src\utils\APIs.js
 * @Description: 
 */
import { weatherQueryReponse, getWeather } from "./weather";
import { getCIBA } from "./other";
import { PushCat } from "./PushCat";

const sendMessageReply = (accessKey, title = null, textContent = null) => {

}

export default {
    /**
    * 查询某个省份下的城市code代码 返回一个**Promise对象** 成功传参*response* 自行调用查看返回值
    */
    weatherQueryReponse,
    getWeather,
    sendMessageReply,
    getCIBA,
    /**
     * 替换模板字符串{{DATA.*}}
     * @param {object} DATA 正则表达式会搜寻{{DATA.*}}的模板字符串 所以请将数据全部存放到这
     * @param {string} str 需要替换的文本
     * @returns {string} 返回被替换的文本
     */
    replaceTemplate(DATA = {}, str = "") {
        const regex = /\{\{(DATA\..*)\}\}/gm
        let match;
        while ((match = regex.exec(tamplate)) !== null) {
            str = str.replace(match[0], eval(match[0]));
        }
        return str
    },
    /**
     * 
     * @returns {string} 返回日期 YYYY-MM-DD 星期d
     */
    getDate() {
        const dt = new Date();
        let yyyy = dt.getFullYear();
        let dd = String(dt.getDate());
        let mm = String(dt.getMonth() + 1);
        dd = dd <= 9 ? `0${dd}` : dd;
        mm = mm <= 9 ? `0${mm}` : mm;
        let day = dt.getDay();
        switch (day) {
            case 1:
                day = "星期一";
                break;
            case 2:
                day = "星期二";
                break;
            case 3:
                day = "星期三";
                break;
            case 4:
                day = "星期四";
                break;
            case 5:
                day = "星期五";
                break;
            case 6:
                day = "星期六";
                break;
            case 0:
                day = "星期日";
                break;
            default:
                break;
        }
        return `${yyyy}-${mm}-${dd} ${day}`; // 日期 YYYY-MM-DD 星期d
    }
}