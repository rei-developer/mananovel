const Koa = require('koa')
const Logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const helmet = require('koa-helmet')
const api = require('./api')
const consola = require('consola')
const {Nuxt, Builder} = require('nuxt')

const app = new Koa()
const router = new Router()

const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

router
  .use(helmet())
  .use(Logger())
  .use(bodyParser())
  .use('/api', api.routes())

app
  .use(async (ctx, next) => {
    if (ctx.hostname == '54.150.28.20')
      ctx.throw(451, 'Unavailable For Legal Reasons')
    await next()
  })
  .use(router.routes())
  .use(router.allowedMethods())

const server = require('http').createServer(app.callback())

async function start() {
  const nuxt = new Nuxt(config)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 10000
  } = nuxt.options.server

  await nuxt.ready()

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false
    ctx.req.ctx = ctx
    nuxt.render(ctx.req, ctx.res)
  })

  server.listen(port, host)
  consola.ready(
    {message: `Server listening on http://${host}:${port}`, badge: true}
  )
}

start()
