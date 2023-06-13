/*
 * @Author: 白羽
 * @Date: 2023-06-05 16:48:42
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-13 21:47:13
 * @FilePath: \scriptcat-push-weixin\src\MAIN.js
 * @Description: 程序入口 微信推送定时小工具 - 脚本猫
 */
import APIs from "./utils/APIs";

const globalConfig = {
    // accessKey 唯一
    accessKey: "",
    // title 推送的标题
    title: "",
    // 推送内容 支持Html和Markdwon语法
    tamplate: "",
};
globalConfig.accessKey = GM_getValue("信息配置.accessKey", null);
globalConfig.title = GM_getValue("信息配置.push_title", "宝宝的专属推送");
globalConfig.province = GM_getValue("信息配置.province", null);
globalConfig.city = GM_getValue("信息配置.city", null);
globalConfig.uname = GM_getValue("信息配置.uname", "宝宝");
globalConfig.tamplate = `
🗓️{{DATA.date}}

{{DATA.uname}}，今天是我们在一起的第{{love_day.DATA}}天，爱你❤️
    
今日{{DATA.city}}天气☁️：{{DATA.weather.weather}}
当前温度🌡️: {{DATA.weather.temperature}}度
最低温度🌡️: {{DATA.weather.min_temperature}}
最高温度🌡️: {{DATA.weather.max_temperature}}

{{DATA.weather.notice}}

💌{{earthy_love_words.DATA}}
`.trim();

const globalData = { // 用于存放数据
    // 推送人昵称(随意)
    uname: globalConfig.uname,
    // 省份
    province: globalConfig.province,
    // 城市
    city: globalConfig.city,
    // 日期 YYYY-MM-DD 星期d
    date: APIs.getDate(),
    weather: { // 用于存储任何天气信息
        // 温度
        temperature: "24",
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
function pushSend(title, content, target = {}) {
    content = APIs.replaceTemplate(globalData, content)
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


new Promise(async (resolve) => {
    // globalData.weather
    globalData.weather = await APIs.getWeather(globalData.province, globalData.city);

    // 
    if (!globalConfig.accessKey) {
        GM_notification({
            title: "accessKey未设置",
            text: "accessKey为空 请设置accessKey",
        });
        resolve(CAT_userConfig());
    } else if (!globalConfig.province) {
        GM_notification({
            title: "未设置省份",
            text: "请设置推送人的省份",
        });
        resolve(CAT_userConfig());
    } else if (!globalConfig.city) {
        GM_notification({
            title: "未设置城市",
            text: "请设置推送人的城市",
        });
        resolve(CAT_userConfig());
    }

    pushSend(globalConfig.title, globalConfig.tamplate)
        .then(() => {
            GM_notification({
                title: "推送成功",
                text: "推送成功",
            })
        })
        .catch(() => {
            GM_notification({
                title: "推送失败",
                text: "推送失败 点我打开菜单",
                onclick() {
                    CAT_userConfig();
                }
            })
        });
    resolve();
})

