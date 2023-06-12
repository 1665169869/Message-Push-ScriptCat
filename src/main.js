/*
 * @Author: 白羽
 * @Date: 2023-06-05 16:48:42
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-12 23:34:26
 * @FilePath: \scriptcat-push-weixin\src\MAIN.js
 * @Description: 程序入口 微信推送定时小工具 - 脚本猫
 */
import APIs from "./utils/APIs";
import tamplates from "./tamplate/index";

const globalConfig = {
    // accessKey 唯一
    accessKey: "",
    // title 推送的标题
    title: "",
    // 推送内容 支持Html和Markdwon语法
    tamplate: "",
};
globalConfig.accessKey = GM_getValue("用户配置.AccessKey");
globalConfig.title = GM_getValue("用户配置.推送标题");
globalConfig.tamplate = tamplates[0];


const DATA = { // 用于存放数据
    uname: "宝宝",
    // 推送人昵称(随意)
    province: "广东",
    // 省份
    city: "广州",
    // 城市
    date: APIs.getDate(),
    // 日期 YYYY-MM-DD 星期d
    weather: { // 用于存储任何天气信息
        // 天气
        weather: "阵雨转多云",
        // 最高气温
        max_temperature: "25℃ ",
        // 最低气温
        min_temperature: "20℃ ",
        // 风向
        wind_direction: "持续东南风",
        // 风级
        wind_scale: "<3级",
        // 湿度
        humidity: "50%",
        // 日出时间
        sunrise_time: "06:20",
        // 日落时间
        sunset_time: "06:20",
        // 空气质量指数(Air quality index)
        aqi: "40",
        // 预防感冒提醒(Cold Prevention Reminder)
        cpr: "儿童、老年人及心脏、呼吸系统疾病患者人群应减少长时间或高强度户外锻炼",
        // 天气温馨语
        notice: "雨虽小，注意保暖别感",
        // PM2.5
        pm25: "36",
        // PM1.0
        pm10: "54",
    }
};


const push = new PushCat({
    accessKey: globalConfig.accessKey
});

/**
 * pushSend
 * @param {*} title 推送标题
 * @param {*} content 推送内容 会自动替换掉模板字符串
 * @returns {Promise} then(response) catch()
 */
const pushSend = (title, content, [target = {}]) => {
    content = APIs.replaceTemplate(DATA, content)
    return new Promise((resolve, reject) => {
        push.send(title, content, target).then(resp => {
            const { status, statusText } = resp;
            GM_log(`status_code: ${status} -- status_text: ${statusText}`);
            if (status == 200) {
                GM_log(resp.responseText, "info");
            }

            resolve(resp);
        }).catch(() => {
            GM_log("推送失败", "error");
            reject();
        });
    });
}


return new Promise(async (resolve) => {
    DATA.weather = await APIs.getWeather(DATA.province, DATA.city);

    pushSend().catch(() => {
        GM_notification({
            title: "推送失败",
            text: "推送失败 点我打开菜单",
            onclick() {
                CAT_userconfig();
            }
        })
    })
})

