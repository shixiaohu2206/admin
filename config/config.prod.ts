import { EggAppConfig, PowerPartial } from 'egg'

/**
 * 生成环境配置
 */
export default () => {
  const config: PowerPartial<EggAppConfig> = {}

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
