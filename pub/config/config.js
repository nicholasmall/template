"use strict";
/**
 * 配置文件
 */
//发布配置
const production = {

    //服务器端口
    SERVER_PORT : 3000,
    WEB_SOCKET_PORT:3001,
    //REDIS配置
    REDIS: {
        host: 'localhost',
        port: 6379,
        password: "abcd",
        maxAge: 3600000
    }

};

//开发配置
const development = {

    //服务器端口
    SERVER_PORT : 3000,
    WEB_SOCKET_PORT:3001,

    //REDIS配置
    REDIS: {
        host: 'localhost',
        port: 6379,
        password: "abcd",
        maxAge: 3600000
    }

};

module.exports = development;