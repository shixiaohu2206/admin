import webpack = require('webpack')

const config = {
  mode: 'universal', // 服务器渲染
  // mode: 'spa', // 客户端渲染

  srcDir: 'client/',

  // 页面header设置
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/static/favicon.ico' }]
  },

  // 自定义进度条
  loading: { color: '#fff' },

  // 全局CSS
  css: ['element-ui/lib/theme-chalk/index.css'],

  // 挂载app前需要加载的插件
  plugins: ['@/plugins/element-ui', '@/plugins/vue-tools', '@/plugins/vue-tools.client', '@/plugins/vendor.client'],

  // nuxt.js 模块
  buildModules: [],
  modules: [],

  build: {
    transpile: [/^element-ui/],
    cache: true,
    parallel: true,
    // 添加插件
    plugins: [
      new webpack.ProvidePlugin({
        _: 'underscore'
      })
    ],
    // 拓展webpack配置
    extend() {}
  },

  // 是否启用redis session
  useRedisSession: true
}

export default config
