# scriptcat-push-wexin

#### 介绍
微信推送定时小工具 - 脚本猫

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
|DATA.province|推送人省份|广东|
|DATA.city|推送人城市|广州|

### DATA.weather

> 支持的天气值

|名称|说明|示例值|
|--|--|--|
|DATA.weather.pm25|pm2.5||
|DATA.weather.pm10|pm1.0||
|DATA.weather.notice|