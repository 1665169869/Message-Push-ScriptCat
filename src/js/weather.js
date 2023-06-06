/*
 * @Author: 白羽
 * @Date: 2023-06-05 19:35:10
 * @LastEditors: 白羽
 * @LastEditTime: 2023-06-06 13:03:02
 * @FilePath: \scriptcat-push-weixin\src\js\weather.js
 * @Description: 天气模块，获取中央气象台的接口进行封装
 */


/**
* 查询某个省份下的城市code代码 返回一个**Promise对象** 成功传参*response* 自行调用查看返回值
*/
function weatherQuery(province = "广东省", city = "广州") {
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

export default weatherQuery;