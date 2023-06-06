// pushcat自定义设备,可接收消息推送并通知
window.PushCatDevice = /** @class */ (function () {
    function PushCatDevice(param) {
        var _this = this;
        this.accessKey = param.accessKey;
        this.host = param.host || "https://sct.icodef.com/";
        this.lasttime = param.lasttime || Math.floor(new Date().getTime() / 1000);
        // 先注册设备
        GM_xmlhttpRequest({
            url: this.host + "openapi/v1/device/register?access_key=" + this.accessKey,
            method: "POST",
            data: JSON.stringify({
                name: param.name,
                describe: param.describe,
                tags: param.tags,
                auto_create: param.auto_create,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            onload: function (resp) {
                var data = JSON.parse(resp.responseText);
                if (data.code !== 0) {
                    _this.onerror && _this.onerror(data);
                }
                else {
                    // 第一个版本使用每分钟轮询的形式,以减少服务器压,后续缓存websocket
                    _this.timer = setInterval(function () {
                        GM_xmlhttpRequest({
                            url: _this.host +
                                "openapi/v1/message/pull?access_key=" +
                                _this.accessKey +
                                "&last_time=" +
                                _this.lasttime +
                                "&device_id=" +
                                data.data.id,
                            method: "GET",
                            onload: function (resp) {
                                var data = JSON.parse(resp.responseText);
                                if (data.code === 0) {
                                    _this.lasttime = Math.floor(new Date().getTime() / 1000);
                                    _this.onmessage && _this.onmessage(data.data.list);
                                }
                                else {
                                    _this.onerror && _this.onerror(data);
                                }
                            }
                        });
                    }, (param.check_interval || 60) * 1000);
                }
            },
        });
    }
    PushCatDevice.prototype.onMessage = function (callback) {
        this.onmessage = callback;
    };
    PushCatDevice.prototype.onError = function (callback) { };
    // TODO
    PushCatDevice.prototype.listen = function (callback, onerror) {
        // const ws = new WebSocket(this.host + "ws/" + this.accessKey);
        // ws.onmessage = (e) => {
        //   callback();
        // };
        // ws.onerror = (e) => {
        //   onerror();
        // };
    };
    PushCatDevice.prototype.stop = function () {
        clearInterval(this.timer);
    };
    return PushCatDevice;
}());
window.PushCat = /** @class */ (function () {
    function PushCat(param) {
        this.accessKey = param.accessKey;
        this.host = param.host || "https://sct.icodef.com/";
    }
    PushCat.prototype.send = function (title, content, target, options) {
        if ((options === null || options === void 0 ? void 0 : options.method) === "GET") {
            var searchParams_1 = new URLSearchParams();
            searchParams_1.append("access_key", this.accessKey);
            searchParams_1.append("title", title);
            searchParams_1.append("content", content);
            if (options === null || options === void 0 ? void 0 : options.parameters) {
                searchParams_1.append("parameters", JSON.stringify(options === null || options === void 0 ? void 0 : options.parameters));
            }
            if (target) {
                if (target.tags) {
                    target.tags.forEach(function (val) {
                        searchParams_1.append("tags", val);
                    });
                }
                else if (target.devices) {
                    target.devices.forEach(function (val) {
                        searchParams_1.append("devices", val);
                    });
                }
            }
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    url: this.host + "openapi/v1/message/send?" + searchParams_1,
                    method: "GET",
                    onload: function (resp) {
                        resolve(resp);
                    }, onerror: () => {
                        reject();
                    }
                })
            });
        }
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                url: this.host + "openapi/v1/message/send?access_key=" + this.accessKey,
                method: "POST",
                data: JSON.stringify({
                    title: title,
                    content: content,
                    device_names: target === null || target === void 0 ? void 0 : target.devices,
                    tags: target === null || target === void 0 ? void 0 : target.tags,
                    parameters: options === null || options === void 0 ? void 0 : options.parameters,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                onload: function (resp) {
                    resolve(resp);
                }, onerror: () => {
                    reject();
                }
            })
        });
    };
    return PushCat;
}());
