"use strict";

function AjaxUtils() {
    this.initialObj = {
        url: "",
        data: {},
        type: "POSt",
        dataType: "JSON",
    };
}


AjaxUtils.prototype.requestPost = function (param) {
    param = object.assign(this.initialObj, param);

    $.ajax({
        url: "",

    })
};