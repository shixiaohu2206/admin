import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

/**
 * 默认配置、合并默认配置与环境配置
 */
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571104473102_9002'

  // 中间件，数组顺序即为中间件的加载顺序
  config.middleware = ['error', 'cors', 'nuxt']

  // csrf
  config.security = {
    csrf: {
      enable: false
    }
  }

  // logger
  config.logger = {
    outputJSON: true
  }

  // 天气appid
  config.weather = {
    appid: '38324244',
    appsecret: 'i2AYPqlP'
  }

  // 定时mail
  config.mail = {
    send_user: 'utone2206@126.com',
    send_pass: 'asjdr2206',
    send_from_nike: '虎虎',
    send_from_email: 'utone2206@126.com',
    send_to: ['yebinwen2206@163.com', 'asjdr123@163.com'],
    send_subject: '一封暖❤️小邮件',
    together_time: '2019-01-19',
    nextmeet_time: '2019-12-31'
  }

  // alinode
  config.alinode = {
    appid: '82081',
    secret: '2a08ca593e119e905cd0163a77251c29088a85cd'
  }

  // 百度统计
  config.baidutongji = {
    api_key: 'e3meh8A4bdWiUsTNV2KU3XQ9rEfesfIo', // API Key
    secret_key: 'Hahk4AEg4YW38Mxj0GO8Q6O2AAC24v3S' // Secret Key
  }

  // the return config will combines to EggAppConfig
  return {
    ...config
  }
}
