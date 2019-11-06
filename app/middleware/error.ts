/**
 * Error中间件
 *
 * @param options
 * @param app
 */
export default function(options: any, app: any) {
  return async (ctx: any, next: () => Promise<any>) => {
    try {
      await next()
    } catch (e) {
      console.log(e)
    }
  }
}
