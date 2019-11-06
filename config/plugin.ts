import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  static: true,

  // 路由映射拆分
  routerPlus: {
    enable: true,
    package: 'egg-router-plus'
  }
}

export default plugin
