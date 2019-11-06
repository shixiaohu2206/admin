/**
 * 跨域中间件
 *
 * @param options
 * @param app
 */
export default function(options: any, app: any) {
  return async (ctx: any, next: () => Promise<any>) => {
    const { res, req } = ctx
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('X-Powered-By', 'NodeJS')
    if (req.method === 'OPTIONS') return res.send(true)
    await next()
  }
}
