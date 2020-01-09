'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // 配置跨域插件
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 配置验证插件
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};
