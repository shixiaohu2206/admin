import { Controller, Context } from 'egg'
import { StatusCodeEnum } from '../interface/index'

export default class BaseController extends Controller {
  protected constructor(ctx: Context) {
    super(ctx)
    this.ctx.isApi = true // 标识请求api接口
  }

  /**
   * 成功返回
   * @param data 返回数据
   */
  protected success(data: any) {
    this.ctx.body = {
      data,
      head: {
        errcode: 0,
        timestamp: new Date().getTime()
      }
    }
  }

  /**
   * 错误返回
   *
   * @param data    返回数据
   * @param errcode 错误码
   * @param error   错误信息
   */
  protected error(errcode: StatusCodeEnum, error: string, data?: any) {
    this.ctx.body = {
      data,
      head: {
        errcode: errcode || StatusCodeEnum.NOFIND,
        error: error || '',
        timestamp: new Date().getTime()
      }
    }
  }
}
