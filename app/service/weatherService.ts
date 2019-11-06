import BaseService from './baseService'

export default class WeatherService extends BaseService {
  public async fetchWeather() {
    console.log(this.config)

    return await this.get(
      `https://www.tianqiapi.com/api/?appid=${this.config.appid}&appsecret=${this.config.appsecret}&cityid=101230101&version=v1`
    )
  }
}
