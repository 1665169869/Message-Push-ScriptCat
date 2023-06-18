/*
 * @Author: 白羽
 * @Date: 2023-06-05 20:47:21
 * @LastEditors: 白羽 1665169869@qq.com
 * @LastEditTime: 2023-06-18 01:14:14
 * @FilePath: \scriptcat-push-weixin\webpack.config.js
 * @Description: 
 */
const path = require('path');
const ScriptCatWebpackPlugin = require('scriptcat-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const template = `
🗓️{{DATA.date}}

{{DATA.uname}}，今天是我们在一起的第{{DATA.love_day}}天，爱你❤️
    
今日{{DATA.city}}天气☁️：{{DATA.weather.weather}}
当前温度🌡️: {{DATA.weather.temperature}}度
最低温度🌡️: {{DATA.weather.min_temperature}}
最高温度🌡️: {{DATA.weather.max_temperature}}

{{DATA.weather.notice}}

💌{{DATA.daily_one_sentences.earthy_love_words}}
`.trim();
const USERCONFIG = {
    "信息配置": {
        uname: {
            title: "推送人昵称",
            type: "text",
            description: "推送人昵称如：宝宝",
            default: "宝宝"
        },
        love_day: {
            title: "在一起时间",
            type: "text",
            description: "格式: YYYY-MM-DD 如: 2022-5-20"
        },
        province: {
            title: "省份",
            type: "text",
        },
        city: {
            title: "城市",
            type: "text",
        },
    },
    "推送设置": {
        accessKey: {
            title: "accessKey",
            type: "text",
            description: "sciprtpush accessKey"
        },
        push_title: {
            title: "推送标题",
            type: "text",
            description: "推送的标题 不支持模板字符串",
            default: "宝宝的专属推送"
        },
        push_content: {
            title: "推送内容",
            type: "textarea", // 等脚本猫更新支持长文本
            description: "推送的内容 支持模板字符串",
            default: template
        }
    }
}

const filename = "Message-Push-ScriptCat.user.js";
const d = new Date();
module.exports = {
    mode: "development",
    entry: "@/main.js",
    output: {
        filename,
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new ScriptCatWebpackPlugin({
            file: filename,
            name: "消息定时推送 -- 脚本猫",
            namespace: "https://bbs.tampermonkey.net.cn/",
            version: `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}${d.getHours()}${d.getMinutes()}`,
            description: "消息定时推送 -- 脚本猫 支持自定义模板，拥有模板字符串，程序员给女朋友的每日推送提醒，专属于程序员的浪漫~",
            author: "i白羽",
            metadata: {
                crontab: "* 10-23 once * *",
                grant: [
                    "GM_xmlhttpRequest",
                    "GM_log",
                    "GM_getValue",
                    "GM_notification",
                    "CAT_userConfig"
                ],
                require: [
                    "https://scriptcat.org/lib/946/%5E1.0.1/PushCat.js"
                ]
            }
        }, USERCONFIG),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, '@')],
                use: { loader: 'babel-loader', },
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.join(__dirname, "./src/")
        }
    }
}