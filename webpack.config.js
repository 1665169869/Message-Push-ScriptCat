/*
 * @Author: 白羽
 * @Date: 2023-06-05 20:47:21
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-12 22:31:21
 * @FilePath: \scriptcat-push-weixin\webpack.config.js
 * @Description: 
 */
const path = require('path');
const ScriptCatWebpackPlugin = require('scriptcat-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const USERCONFIG = {
    "信息配置": {
        accessKey: {
            title: "accessKey",
            type: "text",
            description: "sciprtpush accessKey"
        },
        "推送标题": {
            title: "推送标题",
            type: "text",
            description: "推送的标题 不支持模板字符串",
            default: "宝宝的专属推送"
        }
    }
}

module.exports = {
    mode: "development",
    entry: "@/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scriptcat-push-weixin-user.js'
    },
    plugins: [
        new ScriptCatWebpackPlugin({
            file: "scriptcat-push-weixin-user.js",
            name: "微信推送定时小工具 - 脚本猫",
            namespace: "https://bbs.tampermonkey.net.cn/",
            version: "0.1.0",
            description: "PushCat浏览器端,可作为接收设备通知,也可以作为发送端推送消息至其它设备",
            author: "i白羽",
            metadata: {
                crontab: "* 10-23 once * *",
                grant: [
                    "GM_xmlhttpRequest",
                    "GM_log",
                    "GM_getValue"
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