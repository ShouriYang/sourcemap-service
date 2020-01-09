'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const userRouter = require('./routers/user');
module.exports = app => {
  userRouter(app);
};
