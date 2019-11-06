import { Service } from 'egg'

export default class BaseService extends Service {
  /**
   * GET请求
   */
  protected async get(url: string) {
    return await this.ctx.curl(url, {
      dataType: 'json',
      timeout: 3000
    })
  }

  /**
   * POST请求
   */
  protected async post(url: string, data: object) {
    return await this.ctx.curl(url, {
      method: 'POST',

      // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
      dataType: 'json',

      // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
      contentType: 'json',

      data
    })
  }
}
