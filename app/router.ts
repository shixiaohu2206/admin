import { Application } from 'egg'

export default (app: Application) => {
  const { router, controller } = app

  // api前缀
  // 新增api路由时使用 apiRouter.get / apiRouter.post
  const apiRouter = router.namespace('/api')

  // 检测登陆态
  apiRouter.all('/hadLogin', controller.memberController.hadLogin)

  // 获取天气信息
  apiRouter.all('/getWeather', controller.weatherController.getWeather)

  // 重定向到登陆地址
  apiRouter.all('/getLoginUrl', controller.tongjiController.getLoginUrl)

  // 获取code
  apiRouter.all('/getCode', controller.tongjiController.getCode)

  // 获取ACCESS_TOKEN
  apiRouter.all('/getAccessToken', controller.tongjiController.getAccessToken)
}
