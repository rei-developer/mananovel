const RateLimit = require('koa2-ratelimit').RateLimit

module.exports.getUserLimiter = RateLimit.middleware({
  interval: 60 * 1000,
  max: 20,
  timeWait: 3 * 1000,
  message: "TOO_MANY_REQUEST"
})

module.exports.getUserSearchLimiter = RateLimit.middleware({
  interval: {min: 1},
  max: 180,
  message: "TOO_MANY_REQUEST"
})
