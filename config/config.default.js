/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1578385387984_9713';

  // add your middleware config here
  config.middleware = [ 'jwt' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.jwt = {
    secret: 'egg-api-jwt',
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'sourcemap-service',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // 配置csrf的跨域攻击
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:8080', 'http://localhost:3000', 'http://122.51.175.158' ],
  };
  return {
    ...config,
    ...userConfig,
  };
};
