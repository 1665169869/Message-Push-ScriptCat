<!--
 * @Author: 白羽
 * @Date: 2023-06-06 13:03:50
 * @LastEditors: 白羽
 * @LastEditTime: 2023-07-01 18:38:03
 * @FilePath: \Message-Push-ScriptCat\README.md
 * @Description: 
-->
# Message-Push-ScriptCat

## 介绍
消息定时推送 -- 脚本猫

脚本猫上的是经过webpack打包压缩后的代码，如需源代码请前往下方👇

> 开源仓库地址

[gitee](https://gitee.com/baiyu16/scriptcat-push-wexin/)

[github](https://github.com/1665169869/scriptcat-push-weixin)

## 食用方法

首先你得安装浏览器扩展[ScriptCat](https://scriptcat.org/)

安装好扩展后访问[消息定时推送 -- 脚本猫](https://scriptcat.org/script-show-page/1101)

安装脚本，然后在脚本猫扩展里找到消息定时推送的脚本设置修改相关设置即可

### AccessKey

访问[脚本猫的工具箱](https://sct.icodef.com/)获取

## 模板字符串

> 食用方法： **{{}}** 来使用模板字符串 比如:

```js
"{{DATA.city}}" // 替换成 "广州"
```

### DATA

|名称|说明|
|--|--|
|DATA|全局globalData树 所有值存放在这|

|名称|说明|示例值|
|--|--|--|
|DATA.uname|推送人昵称|宝宝|
|DATA.date|日期时间|YYYY-MM-DD 星期d|
|DATA.province|推送人省份|广东|
|DATA.city|推送人城市|广州|
|DATA.love_day|在一起时间 {Int} (最低第一天)|521|

### 天气信息 DATA.weather

> 支持的天气值

|名称|说明|示例值|
|--|--|--|
|DATA.weather.temperature|温度|24|
|DATA.weather.weather|天气|阵雨转多云|
|DATA.weather.pm25|pm2.5|36|
|DATA.weather.pm10|pm1.0|54|
|DATA.weather.notice|天气温馨语|雨虽小，注意保暖别感|
|DATA.weather.cpr|预防感冒提醒|儿童、老年人及心脏、呼吸系统疾病患者人群应减少长时间或高强度户外锻炼|
|DATA.weather.aqi|空气质量指数|40|
|DATA.weather.sunrise_time|日出时间|06:20|
|DATA.weather.sunset_time|日落时间|06:20|
|DATA.weather.humidity|湿度|50%|
|DATA.weather.wind_scale|风级|<3级|
|DATA.weather.wind_direction|风向|持续东南风|
|DATA.weather.min_temperature|最低气温|20℃|
|DATA.weather.max_temperature|最高气温|20℃|


### 每日N句 DATA.daily_one_sentences

|名称|说明|示例值|
|--|--|--|
|DATA.daily_one_sentences.note_en|金山每日一句-英文|Nothing in this world that's worth having comes easy.|
|DATA.daily_one_sentences.note_cn|金山每日一句-中文|这世界上凡是值得拥有的东西，都不易获得。|
|DATA.daily_one_sentences.moment_copyrighting|朋友圈文案|错过太阳就不要再错过月亮了|
|DATA.daily_one_sentences.earthy_love_words|土味情话(彩虹屁)|我今晚会很忙，忙着跟你过日子|
|DATA.daily_one_sentences.poison_chicken_soup|毒鸡汤|我从不以强凌弱，我欺负他之前，真不晓得他比我弱。|