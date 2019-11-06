import BaseController from './baseController'

export default class HadLogin extends BaseController {
  public async hadLogin() {
    const data = await this.service.member.hadLogin.index()
    let resp: object = {}

    if (data.hadLogin) {
      resp = {
        hadLogin: true,
        custNo: data.custNo,
        role: ''
      }

      this.success(resp)
    } else {
      resp = {
        hadLogin: false
      }

      this.error(data.errcode, data.error, resp)
    }
  }
}
