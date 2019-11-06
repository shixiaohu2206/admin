import { IBoot } from 'egg'
import { Nuxt, Builder } from 'nuxt'
import config from './nuxt.config'

/**
 * mount nuxt.js
 */
const mountNuxt = async (env: string, debugNuxt: boolean): Promise<void> => {
  const nuxt = new Nuxt(config)

  if (env === 'local' && debugNuxt) {
    await new Builder(nuxt).build().catch((e: any) => {
      console.error(e)
      process.exit(1)
    })
  } else {
    await nuxt.ready()
  }

  return nuxt
}

export default class FooBoot implements IBoot {
  private app: any

  constructor(app: any) {
    this.app = app
  }

  async configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.

    const env = this.app.config.env
    const debugNuxt = this.app.config.debugNuxt || false

    // mount nuxt.js
    this.app.nuxt = await mountNuxt(env, debugNuxt)
  }
}
