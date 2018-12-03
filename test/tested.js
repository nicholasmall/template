"use strict";

function AjaxUtils() {
    this.initialObj = {
        url: "",
        data: {},
        type: "POSt",
        dataType: "JSON"
    };
}

AjaxUtils.prototype.requestPost = function (param) {
    param = $.extend({}, this.initialObj, param);
    console.log(param);
};

let t = new AjaxUtils();

t.requestPost({
    url: "www.baidu.com",
    data: {a: "A", b: "B"},
    type: "GET",
    dataType: "TXT"
});