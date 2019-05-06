import httpUtils from '../config/http'
import address from './address.config'

const UserMsg = {
  // 实名认证
  realName: params => {
    return httpUtils.post(address.userMsg.realNameVerified, {
      data: params
    })
  },
  // 资金密码
  setfundpass: (params, imgCode) => {
    let url = `${address.userMsg.fundPass}?imgCode=${imgCode}`
    return httpUtils.post(url, {
      data: params
    })
  },
  // 修改登录密码
  changePass: (params, imgCode) => {
    let url = `${address.userMsg.loginPass}?imgCode=${imgCode}`
    return httpUtils.post(url, {
      data: params
    })
  },
  // 用户详情
  addUserDetails: params => {
    return httpUtils.post(address.userMsg.userDetial, {
      data: params
    })
  },
  // 用户信息
  userInfoDetails: params => {
    return httpUtils.get(address.userMsg.userSetInfo, {
      query: params
    })
  }
}

export default UserMsg
