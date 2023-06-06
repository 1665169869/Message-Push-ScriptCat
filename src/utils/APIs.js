/*
 * @Author: 白羽
 * @Date: 2023-06-05 19:34:50
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-06 23:13:41
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
    getCIBA
}