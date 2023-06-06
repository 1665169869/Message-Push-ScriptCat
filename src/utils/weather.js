/*
 * @Author: 白羽
 * @Date: 2023-06-05 19:35:10
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-07 00:45:20
 * @FilePath: \scriptcat-push-weixin\src\utils\weather.js
 * @Description: 天气模块，获取中央气象台的接口进行封装
 */
import { WEATHER_CITY } from "../store/index";


/**
* 查询某个省份下的城市code代码 返回一个**Promise对象** 成功传参*response* 自行调用查看返回值
*/
export const weatherQueryReponse = (province = "广东省", city = "广州") => {
    return new Promise(async (resolve, reject) => {
        let provinceCode, cityCode;
        try {
            const resp = await provinceCodeQuery(); // 返回response
            const result = JSON.parse(resp.responseText); // 返回转换后的数组结果 如果异常就会被异常捕获
            // 如果请求成功，返回一个responseXML 不出意外的话是一个数组对象
            if (!(result instanceof Object)) {
                console.log(provinceCodes);
                throw new Error(`provinceCodes不是一个数组`);
            }
            provinceCode = (result.find(item => item.name.indexOf(province) !== -1))?.code || null;
            // 寻找对应省份的code代码 找到直接返回code 没找到直接返回null
        } catch (error) {
            reject(error);
        }

        try {
            const resp = await cityCodeQuery(); // 返回response
            const result = JSON.parse(resp.responseText); // 返回转换后的数组结果 如果异常就会被异常捕获
            // 如果请求成功，返回一个responseXML 不出意外的话是一个数组对象
            if (!(result instanceof Object)) {
                console.log(provinceCodes);
                throw new Error(`provinceCodes不是一个数组`);
            }
            cityCode = (result.find(item => {
                return item.city.indexOf(city) !== -1 && item.province.indexOf(province) !== -1
            }))?.code || null;
        } catch (error) {
            reject(error);
        }
        debugger;
        const url = `http://www.nmc.cn/rest/weather?stationid=${cityCode}&_=${Date.now()}`;
        GM_xmlhttpRequest({
            url,
            method: "GET",
            onload: resp => {
                resolve(resp);
            },
            onerror: err => {
                reject(err);
            }
        });
    });
}

/**
 * 查询某个省份下的城市code代码 返回一个**Promise对象** 成功传参*response*
 * @provinceCode 省份code代码 默认AGD 如果不知道请调用provinceCodeQuery查询
 * @result [{"code": "59287","province": "广东省","city": "广州","url": "/publish/forecast/AGD/guangzhou.html"}, ...]
*/
function cityCodeQuery(provinceCode = "AGD") {
    return new Promise((resolve, reject) => {
        const url = `http://www.nmc.cn/rest/province/${provinceCode}?_=${Date.now()}`;
        GM_xmlhttpRequest({
            url,
            method: "GET",
            onload: resp => {
                resolve(resp);
            },
            onerror: err => {
                reject(err);
            }
        })
    });
}


/**
 * 查询所有的省份code代码 返回一个**Promise对象** 成功传参*response*
*
* 例如返回如下：
*
* [{"code": "ABJ","name": "北京市","url": "/publish/forecast/ABJ.html"}, ...]
*/
function provinceCodeQuery() {
    return new Promise((resolve, reject) => {
        const url = `http://www.nmc.cn/rest/province/all?_=${Date.now()}`;
        GM_xmlhttpRequest({
            url,
            method: "GET",
            onload: resp => {
                resolve(resp);
            },
            onerror: err => {
                reject(err);
            }
        })
    });
}

/**
 * 获取天气城市信息
 * @param province {String}
 * @param city {String}
 */
const getWeatherCityInfo = (province, city) => {
    let prov = null
    if (province) {
        const provName = province.replace(/[省市]$/, '')
        prov = WEATHER_CITY.find((it) => it.city_name.indexOf(provName) !== -1)
    }
    if (!prov) {
        console.log(`您当前填写的province: 【${province}】, 找不到该城市或省份，城市天气可能会因此不准确。请知悉 `)
    }

    // 如果找到父级地区，则在父级地区中找
    if (city) {
        const cName = city.replace(/[市区县]$/, '')
        // 先后顺序县 => 区 => 市 => 无
        for (const name of '县|区|市|'.split('|')) {
            const c = WEATHER_CITY.find((it) => {
                if (prov) {
                    return it.pid === prov.id && it.city_name === `${cName}${name}`
                }
                return it.city_name === `${cName}${name}`
            })
            if (c) {
                return c
            }
        }
    }

    // city 找不到，那就返回prov的
    if (prov && prov.city_code) {
        return prov
    }

    return null
}

/**
 * 获取天气情况
 * @param {*} province 省份
 * @param {*} city 城市
 */

export const getWeather = async (province, city) => {

    const cityInfo = getWeatherCityInfo(province, city)
    if (!cityInfo) {
        console.error('配置文件中找不到相应的省份或城市')
        return {}
    }
    const url = `http://t.weather.itboy.net/api/weather/city/${cityInfo.city_code}`

    const res = await new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            url,
            headers: {
                'Content-Type': 'application/json',
            },
            method: "GET",
            responseType: "json",
            onload: resolve,
            onerror: reject
        });
    }).catch((err) => err);
    // const res = await axios.get(url, {
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // }).catch((err) => err)

    if (res.status === 200 && res.response && res.response.status === 200) {
        const commonInfo = res.response.data
        const info = commonInfo && commonInfo.forecast && commonInfo.forecast[0]
        if (!info) {
            console.error('天气情况: 找不到天气信息, 获取失败')
            return {}
        }

        const result = {
            // 湿度
            shidu: commonInfo.shidu,
            // PM2.5
            pm25: commonInfo.pm25,
            // PM1.0
            pm10: commonInfo.pm10,
            // 空气质量
            quality: commonInfo.quality,
            // 预防感冒提醒
            ganmao: commonInfo.ganmao,
            // 日出时间
            sunrise: info.sunrise,
            // 日落时间
            sunset: info.sunset,
            // 空气质量指数
            aqi: info.aqi,
            // 天气情况
            weather: info.type,
            // 最高温度
            maxTemperature: info.high.replace(/^高温\s*/, ''),
            // 最低温度
            minTemperature: info.low.replace(/^低温\s*/, ''),
            // 风向
            windDirection: info.fx,
            // 风力等级
            windScale: info.fl,
            // 温馨提示
            notice: info.notice,
        }
        return result;
    }
    console.error('天气情况获取失败', res)
    return {}
}
