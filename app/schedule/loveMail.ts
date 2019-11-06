/**
 * 定时发送邮件
 */
import { Subscription } from 'egg'

class LoveMail extends Subscription {
  /**
   * 定时任务配置
   */
  static get schedule() {
    return {
      /**
       *   *    *    *    *    *    *
       *   ┬    ┬    ┬    ┬    ┬    ┬
       *   │    │    │    │    │    |
       *   │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
       *   │    │    │    │    └───── month (1 - 12)
       *   │    │    │    └────────── day of month (1 - 31)
       *   │    │    └─────────────── hour (0 - 23)
       *   │    └──────────────────── minute (0 - 59)
       *   └───────────────────────── second (0 - 59, optional)
       */
      cron: '0 11 18 * * *', // 每天八点
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true, // 项目启动就执行一次定时任务
      cronOptions: {
        tz: 'Asia/Shanghai' // 时区
      }
    }
  }

  /**
   * 执行定时任务
   */
  public async subscribe() {
    this.ctx.service.loveMail.loveMailService.subscribe()
  }
}

export default LoveMail
