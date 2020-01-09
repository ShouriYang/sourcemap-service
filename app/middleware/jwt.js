'use strict';
const JWT = require('jsonwebtoken');
module.exports = (options, app) => {
  return async function(ctx, next) {
    const token = ctx.request.headers.Authorization;
    // console.log(ctx.request.headers);
    console.log('token:' + token);
    // const method = ctx.method.toLowerCase();
    if (!token) {
      if (ctx.path === '/register' || ctx.path === '/login') {
        await next();
      } else {
        ctx.throw(401, '未登录，请先登录');
      }
    } else {
      // token存在
      let decodeToken;
      try {
        // 验证token
        decodeToken = JWT.verify(token, options.secret);
        console.log('decodetoken', decodeToken);
        if (!decodeToken || !decodeToken.userName) {
          ctx.throw(401, '没有权限，请登录');
        }
        console.log('decodetoken expire', decodeToken.expire);
        if (Date.now() - decodeToken.expire > 0) {
          ctx.throw(401, 'Token已经过期');
        }
        const user = await app.mysql.get('user', {
          userName: decodeToken.userName,
        });
        if (user) {
          await next();
        } else {
          ctx.throw(401, '用户信息验证失败');
        }
      } catch (e) {
        console.log(ctx.response);
      }
    }
  };
};
