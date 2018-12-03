"use strict";
const router = require('koa-router')();
router.prefix('/users');

router.post("/login", async (ctx, next) => {
    let form = ctx.request.body;
    let result = () => {
        return new Promise((resolve, reject) => {
            resolve({status: 200, msg: '这是使用 promise 返回的数据', data: form, code: 1});
        })
    };
    ctx.session.user = {a: "b"};
    ctx.response.body = await result();
});

router.post("/logout", async (ctx) => {
    delete ctx.session.user;
    let result = () => {
        return new Promise((resolve, reject) => {
            resolve({status: 200, msg: '这是使用 promise 返回的数据,logout', data: "success", code: 1});
        })
    };
    ctx.response.body = await result();
});

module.exports = router;