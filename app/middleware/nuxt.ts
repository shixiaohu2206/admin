/**
 * Nuxt中间件
 *
 * 除api接口的请求，都会使用nuxt渲染
 * @param options
 * @param app
 */
export default function(options: any, app: any) {
  return async (ctx: any, next: () => Promise<any>) => {
    await next()

    const { res, req } = ctx
    if (ctx.isApi !== true) {
      return await new Promise((resolve, reject) => {
        ctx.app.nuxt.render(req, res, promise => {
          ctx.res.on('close', resolve)
          ctx.res.on('finish', resolve)
          promise.then(resolve).catch(reject)
        })
      })
    }
  }
}
