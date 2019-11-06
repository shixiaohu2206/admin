import BaseService from '../baseService'

export default class BaseMemberService extends BaseService {
  public async fetchCusNo(queryData: string | string[]) {
    return await this.get(`${this.config.ezApi}/member/rest/v1/Member/stringDecode?text=${queryData}`)
  }
}
