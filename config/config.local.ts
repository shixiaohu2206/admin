import { EggAppConfig, PowerPartial } from 'egg'

/**
 * 本地开发配置
 */
export default () => {
  const config: PowerPartial<EggAppConfig> = {}

  // 本地调试Nuxt
  config.debugNuxt = false

  // logger
  config.logger = {
    consoleLevel: 'DEBUG'
  }

  // api domain
  const apiDomain = {
    javaApi: 'http://127.0.0.1:8080',
    ezApi: 'http://127.0.0.1:8080'
  }

  return {
    ...config,
    ...apiDomain
  }
}
