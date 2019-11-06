import { EggAppConfig, PowerPartial } from 'egg'

/**
 * 单元测试配置
 * 测试用例文件，需要以[.test.ts]结尾
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
