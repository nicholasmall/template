"use strict";
const router = require('koa-router')();
const title = '首页';

router.get('/', async (ctx, next) => {
    // //判断登录
    if (!ctx.session.user) {
        await ctx.redirect('/loginPage')
    } else {
        const id = ctx.session.user;
        console.log(id);
        await ctx.render('index', {title, id});
    }
});

router.get("/loginPage", async (ctx) => {
    await ctx.render("login", {title: "登录", id: "register"});
});

router.get("/sendSocket", async (ctx) => {
    await ctx.render("sendSocket", {title: "测试发送推送信息"});
});


router.get("/receiveSocket", async (ctx) => {
    await ctx.render("receiveSocket", {title: "测试接收推送信息"});
});

router.get("/receiveSocketTow", async (ctx) => {
    await ctx.render("receiveSocketTow", {title: "测试接收推送信息"});
});


module.exports = router;