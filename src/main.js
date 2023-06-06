/*
 * @Author: 白羽
 * @Date: 2023-06-05 16:48:42
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-06 12:57:29
 * @FilePath: \scriptcat-push-weixin\src\MAIN.js
 * @Description: 微信推送定时小工具 - 脚本猫
 */
import APIs from "./js/APIs";
const text = `
## lorem12345

1. 你好
2. 再见

☁️：
{{weather}}
`;

const config = {
    accessKey: "57r91b2wgl4qmn97", // access_key
    title: `标题`, // 消息标题，最大长度为128
    content: text, //	消息内容，长度在2-4096之间
    target: {
        devices: "default" // default默认为推送工具箱公众号
    }
}

console.log(config);

const push = new PushCat({
    accessKey: config.accessKey
});

APIs.weatherQuery("广东省", "清远").then(resp => {
    if (resp.status == 200) {
        //  {"temperature":26.8,"temperatureDiff":-1.4,"airpressure":9999,"humidity":88,"rain":0,"rcomfort":72,"icomfort":1,"info":"晴","img":"0","feelst":24.8}
        //  返回如上Json
        //  |-------------------------------|
        //  | airpressure     |  未知       |
        //  | feelst          | 体感温度     |
        //  | humidity        | 相对湿度     |
        //  | icomfort        | 未知        |
        //  | rain            | 降雨量(mm)  |
        //  | info            | 天气(多云)  |
        //  | temperature     | 温度       |
        //  | info            | 天气(多云)  |
        //  | temperatureDiff | 未知       |
        //  | rcomfort        | 未知       |
        //  |-----------------------------|
        const { data: { real: { weather: weatherData } } } = JSON.parse(resp.responseText);

        let textContent = config.content.replace(/\{\{weather\}\}/, `\n清远 ${weatherData.info}\n当前温度：${weatherData.temperature}℃\n体感温度：${weatherData.feelst}℃\n相对湿度：${weatherData.humidity}℃`);
        pushSend(config.title,textContent);
    }
});

function pushSend(title, content, target = {}) {
    return new Promise((resolve, reject) => {
        push.send(title, content, target).then(resp => {
            const { status, statusText } = resp;
            GM_log(`status_code: ${status} -- status_text: ${statusText}`);
            if (status == 200) {
                GM_log(resp.responseText);
            }

            resolve(resp);
        }).catch(() => {
            GM_log("推送失败");
            reject();
        });
    });
}



// pushSend(config.title, config.content);