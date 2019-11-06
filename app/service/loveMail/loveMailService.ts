import * as ejs from 'ejs'
import * as path from 'path'
import * as cheerio from 'cheerio' // 服务端dom操作模块
import * as superagent from 'superagent' // 请求代理模块
import * as nodemailer from 'nodemailer' // 发送邮件模块
import BaseService from '../baseService'

export default class LoveMailService extends BaseService {
  /**
   * 静态数据
   */
  private url = {
    one: 'http://wufazhuce.com/',
    moji: 'https://tianqi.moji.com/weather/china/fujian/fuzhou'
  }

  /**
   * 配置邮件模块
   */
  private transporter() {
    return nodemailer.createTransport({
      service: '126 ', // 邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
      port: 465,
      // secureConnection: true,
      auth: {
        user: this.config.mail.send_user, // 账户
        pass: this.config.mail.send_pass // smtp授权码
      }
    })
  }

  /**
   * 发送邮件
   */
  private sendMail(html: any) {
    const that = this

    const config = this.config.mail

    const sendToEmail = config.send_to

    const mailOptions0 = {
      from: `"${config.send_from_nike}" <${config.send_from_email}>`,
      to: sendToEmail[0],
      subject: config.send_subject,
      html
    }
    const mailOptions1 = {
      from: `"${config.send_from_nike}" <${config.send_from_email}>`,
      to: sendToEmail[1],
      subject: config.send_subject,
      html
    }

    const instance = this.transporter()

    // 发送邮件
    instance.sendMail(mailOptions0, (error: any, info: any) => {
      if (error) {
        that.ctx.logger.error(new Error(error))
      } else {
        that.ctx.logger.info(info)

        // 发送邮件
        instance.sendMail(mailOptions1, (error: any, info: any) => {
          if (error) {
            that.ctx.logger.error(new Error(error))
          } else {
            that.ctx.logger.info(info)
          }
        })
      }
    })
  }

  /**
   * 获取dome元素
   *
   * @param url
   */
  private getDom(url: string) {
    return new Promise((resolve, reject) => {
      superagent.get(url).end((err, res) => {
        if (err) return reject(err)
        return resolve(res)
      })
    }).catch(e => Promise.reject(e))
  }

  /**
   * 获取近日天气数据
   *
   * @param mojiDom
   * @param doms
   */
  private getWeatherData(mojiDom: any, doms: any) {
    const data: any = []
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < doms.length; i++) {
      data.push({
        // 天
        day: mojiDom(doms[i])
          .find('li:nth-child(1) a')
          .text(),
        // 天气图片
        weatherImg: mojiDom(doms[i])
          .find('li:nth-child(2) span img')
          .attr('src'),
        // 天气描述
        weatherDes: mojiDom(doms[i])
          .find('li:nth-child(2)')
          .text()
          .replace(/(^\s*)|(\s*$)/g, ''),
        // 温度
        temperature: mojiDom(doms[i])
          .find('li:nth-child(3)')
          .text()
          .replace(/(^\s*)|(\s*$)/g, ''),
        // 风级
        wind: `${mojiDom(doms[i])
          .find('li:nth-child(4) em')
          .text()}/${mojiDom(doms[i])
          .find('li:nth-child(4) b')
          .text()}`,
        // 适宜等级
        level: mojiDom(doms[i])
          .find('li:nth-child(5) strong')
          .text()
          .replace(/(^\s*)|(\s*$)/g, ''),
        // 颜色等级
        color_level: mojiDom(doms[i])
          .find('li:nth-child(5) strong')
          .attr('class')
      })
    }

    return data
  }

  /**
   * 处理合并数据
   */
  private combineData(): any {
    const that = this
    return Promise.all([this.getDom(that.url.one), this.getDom(that.url.moji)])
      .then((data: any) => {
        // 一日一图一句
        const oneDom = cheerio.load(data[0].text)
        const selectOneDom = oneDom('#carousel-one .carousel-inner .item')[0]
        const oneData = {
          imgSrc: oneDom(selectOneDom)
            .find('.fp-one-imagen')
            .attr('src'),
          text: oneDom(selectOneDom)
            .find('.fp-one-cita')
            .text()
            .replace(/(^\s*)|(\s*$)/g, '')
        }

        // 墨迹天气
        const mojiDom = cheerio.load(data[1].text)
        const mojiData = {
          // 湿度
          humidity: mojiDom(mojiDom('.wea_about')[0])
            .find('span')
            .text(),
          // 提示语
          tips: mojiDom(mojiDom('.wea_tips')[0])
            .find('em')
            .text(),
          // 获取近日天气
          weather: this.getWeatherData(mojiDom, mojiDom('.wrap .left .forecast .days'))
        }

        // 计算时间
        const date: any = {}
        // 当前时间戳
        const now = new Date().getTime()
        // 在一起时间
        date.together_time = Math.floor(
          (now - new Date(that.config.mail.together_time).getTime()) / (1000 * 60 * 60 * 24)
        )
        // 下一次见面
        date.nextmeet_time = Math.floor(
          (new Date(that.config.mail.nextmeet_time).getTime() - now) / (1000 * 60 * 60 * 24)
        )

        return { oneData, mojiData, date }
      })
      .catch(err => {
        if (err) that.ctx.logger.error(new Error(err))
      })
  }

  /**
   * 提供外部调用、订阅发送邮件
   */
  public subscribe() {
    const that = this

    that.combineData().then((data: any) => {
      ejs.renderFile(path.resolve(__dirname, 'mail.ejs'), { ...data }, (err: any, html: any) => {
        if (err) {
          that.ctx.logger.error(new Error(err))
        } else {
          that.sendMail(html)
        }
      })
    })
  }
}
