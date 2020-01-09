'use strict';
const Service = require('egg').Service;
const JWT = require('jsonwebtoken');
const utility = require('utility');
class UserService extends Service {
  async find() {
    const result = await this.app.mysql.select('user');
    return result;
  }
  async register(registerInfo) {
    const res = {};
    const { app } = this;
    // content值为null
    const content = await app.mysql.get('user', {
      username: registerInfo.userName,
    });
    console.log(content);
    if (content) {
      res.code = -2;
      res.msg = '注册失败，已经有相同的用户名了';
    } else {
      registerInfo.password = utility.md5(registerInfo.password);
      const result = await app.mysql.insert('user', registerInfo);
      console.log(result.affectedRows);
      if (result.affectedRows === 1) {
        res.code = 1;
        res.msg = '注册成功';
      } else {
        res.code = -1;
        res.msg = '注册失败';
      }
    }
    return res;
  }
  async login(loginInfo) {
    const { app } = this;
    const res = {};
    const isExist = await app.mysql.get('user', {
      userName: loginInfo.userName,
    });
    loginInfo.password = utility.md5(loginInfo.password);
    if (!isExist) {
      res.code = -2;
      res.msg = '用户不存在';
    } else {
      const result = await app.mysql.get('user', loginInfo);
      console.log('result' + JSON.stringify(result));
      if (!result) {
        res.code = -1;
        res.msg = '用户信息不正确';
      } else {
        // 如果用户信息正确的话，签发token
        const token = JWT.sign({
          userName: result.userName,
        },
        this.config.jwt.secret, {
          expiresIn: 60 * 60,
        });
        res.data = result.username;
        res.code = 1;
        res.token = token;
        res.msg = '登录成功';
      }
    }
    console.log(res);
    return res;
  }
}
module.exports = UserService;

