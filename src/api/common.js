import httpUtils from '../config/http'
import address from './address.config'
// import deploy from '../config/basic.config'

const publicMethod = {
  // 图形验证码
  authCode: query => {
    return httpUtils.post(address.common.imgCode, {
      data: query,
      options: {
        headers: {
          // endType: deploy.type,
          'Content-Type': 'application/json; charset=UTF-8'
          // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    })
  },
  // 短信验证码
  phCode: (params) => {
    let url = `${address.common.code}?imgCode=${params.imgCode}`
    return httpUtils.post(url, {
      data: params
    })
    // return httpUtils.post(address.common.code, {
    //   data: query,
    //   options: {
    //     headers: {
    // endType: deploy.type,
    // 'Content-Type': 'application/json; charset=UTF-8'
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //     }
    //   }
    // })
  },
  // 客服
  merchantInfos: query => {
    return httpUtils.get(address.common.merchants, {
      query: query
    })
  },
  // 公告
  noteAnnounce: query => {
    return httpUtils.get(address.common.announce, {
      query: query
    })
  },
  // 获取公钥
  getPublicKeys: query => {
    return httpUtils.get(address.common.getPublicKey, {
      query: query
    })
  }
}

export default publicMethod
