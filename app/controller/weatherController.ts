import BaseController from './baseController'
import { StatusCodeEnum } from '../interface/index'

export default class WeatherController extends BaseController {
  public async getWeather() {
    try {
      const res = await this.service.weatherService.fetchWeather()
      if (res && res.status === 200 && res.data && res.data.data) {
        this.success(res.data.data)
      } else {
        this.error(StatusCodeEnum.WRONG, '无天气信息')
      }
    } catch (e) {
      this.error(StatusCodeEnum.WRONG, '天气信息报错', e)
    }
  }
}
