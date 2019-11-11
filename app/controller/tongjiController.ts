// import to from 'await-to-js'
import BaseController from './baseController'
// import { StatusCodeEnum } from '../interface/index'

export default class TongjiController extends BaseController {
  /**
   * 重定向到登陆地址
   */
  public async getLoginUrl() {
    const config = this.config.baidutongji
    const redirect_uri = 'http://admin.utone.xyz/api/getCode'
    const url = `http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=${config.api_key}&redirect_uri=${redirect_uri}&scope=basic&display=popup`
    this.success(url)
    // this.ctx.redirect(url)
  }

  /**
   * 获取code
   */
  public async getCode() {
    const code = this.ctx.query.code || ''
    const config = this.config.baidutongji
    const redirect_uri = 'http://admin.utone.xyz/api/getAccessToken'
    const url = `http://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code=${code}&client_id=${config.api_key}&client_secret=${config.secret_key}&redirect_uri=${redirect_uri}`
    this.success(url)
    // this.ctx.redirect(url)
  }

  /**
   * 获取ACCESS_TOKEN
   */
  public async getAccessToken() {
    this.success(this.ctx.body)
  }
}
