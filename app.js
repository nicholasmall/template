"use strict";
const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const config = require('./pub/config/config.js');
const session = require('koa-session');

let ws = require("nodejs-websocket");

const index = require('./routes/IndexController');
const users = require('./routes/Userscontoller');

const app = new Koa();
// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.keys = ['Porschev'];
const redis_conf = {
    key: 'mall',
    maxAge: 60 * 60 * 30,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false
};

app.use(session(redis_conf, app));

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

app.listen(config.SERVER_PORT, () => {
    console.log(`Starting at port ${config.SERVER_PORT}!`);
    console.log("开始建立web socket 服务");

    let sendees = {};
    let keys = [];
    let server = ws.createServer(function (conn) {

        conn.on("text", function (data) {
            data = JSON.parse(data);
            if (data.state === 1) { // 声明接收对象
                keys.push(data.sendee);
                sendees[data.sendee] = conn;
                // sendees[data.sendee].send("success");
            } else if (data.state === 2) { // 发送消息
                if (sendees[data.sendee]) {
                    sendees[data.sendee].sendText(data.message);
                }
            } else if (data.state === 3) {
                keys.forEach((key) => {
                    sendees[key].sendText(data.message);
                })
            }
        });
        conn.on("close", function () {
            console.log("关闭连接")
        });
        conn.on("error", function () {
            console.log("异常关闭")
        });
    }).listen(config.WEB_SOCKET_PORT);

    console.log("WebSocket建立完毕 listen port " + config.WEB_SOCKET_PORT);
});