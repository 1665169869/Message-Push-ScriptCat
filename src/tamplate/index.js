/*
 * @Author: 白羽
 * @Date: 2023-06-10 13:58:38
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-13 00:26:21
 * @FilePath: \scriptcat-push-weixin\src\tamplate\index.js
 * @Description: 这里是用于存放推送模板的数组
 */
export const template = `
🗓️{{date.DATA}}

今天是我们在一起的第{{love_day.DATA}}天，爱你❤️
    
今日{{DATA.city}}天气☁️：{{tian_api_weather_weather_0.DATA}}
温度🌡️: {{tian_api_weather_lowest_0.DATA}}-{{tian_api_weather_highest_0.DATA}}
紫外线强度指数☀️: {{tian_api_weather_uv_index_0.DATA}}
穿衣指数👚: {{tian_api_weather_tips_0.DATA}}
    
💌{{earthy_love_words.DATA}}
`.trim()