/*
 * @Author: 白羽
 * @Date: 2023-06-10 13:58:38
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-13 00:26:21
 * @FilePath: \scriptcat-push-weixin\src\tamplate\index.js
 * @Description: 这里是用于存放推送模板的数组
 */

const template = `
🗓️{{DATA.date}}

{{DATA.uname}}，今天是我们在一起的第{{love_day.DATA}}天，爱你❤️
    
今日{{DATA.city}}天气☁️：{{DATA.weather.weather}}
当前温度🌡️: {{DATA.weather.temperature}}度
最低温度🌡️: {{DATA.weather.min_temperature}}
最高温度🌡️: {{DATA.weather.max_temperature}}

{{DATA.weather.notice}}

💌{{DATA.daily_one_sentences.earthy_love_words}}
`.trim();

module.exports = template;