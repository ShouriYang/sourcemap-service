'use strict';
// const utility = require('utility');
const Controller = require('egg').Controller;
const rule = {
  userName: { type: 'string', required: true, message: '必填项' },
  password: { type: 'string', required: true, message: '必填项' },
};
class UserController extends Controller {
  async find() {
    const { ctx } = this;
    const user = await ctx.service.user.find();
    ctx.body = user;
  }
  async register() {
    const { ctx } = this;
    const registerInfo = ctx.request.body;
    console.log(ctx.request.body);
    await ctx.validate(rule, registerInfo);
    const result = await ctx.service.user.register(registerInfo);
    ctx.body = result;
  }
  async login() {
    const { ctx } = this;
    const loginInfo = ctx.request.body;
    await ctx.validate(rule, loginInfo);
    // loginInfo.password = utility.md5(loginInfo.password);
    const result = await ctx.service.user.login(loginInfo);
    ctx.body = result;
  }
}

module.exports = UserController;
