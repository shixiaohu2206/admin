import BaseMemberService from './baseMemberService'
import { StatusCodeEnum } from '../../interface/index'

export default class HadLoginService extends BaseMemberService {
  /**
   * 检测是否登陆
   */
  public async index() {
    const queryData = this.getQueryData()

    if (queryData) {
      try {
        const result = await this.fetchCusNo(queryData)

        if (result === null || result.data === null) {
          return {
            hadLogin: false,
            error: '無數據',
            errcode: StatusCodeEnum.NOFIND
          }
        } else {
          const hadLogin = result.data.items[0] ? true : false

          return {
            hadLogin,
            custNo: hadLogin ? result.data.items[0] : '',
            errcode: 0
          }
        }
      } catch (error) {
        return {
          hadLogin: false,
          error: error.statusText || '',
          errcode: error.status || StatusCodeEnum.SERVICEWRONG
        }
      }
    } else {
      return {
        hadLogin: false,
        error: '未登錄',
        errcode: StatusCodeEnum.PARAMWRONG
      }
    }
  }

  private getQueryData(): string | string[] {
    const cookies = this.ctx.cookies
    const reqBody = this.ctx.request.body

    let custNo: string | string[] = ''
    if (cookies && cookies.get('cust_no')) {
      custNo = cookies.get('cust_no')
    } else {
      custNo = (reqBody && reqBody.head && reqBody.head.auth) || ''
    }
    return custNo
  }
}
