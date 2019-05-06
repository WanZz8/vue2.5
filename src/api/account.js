import httpUtils from '../config/http'
import address from './address.config'

const account = {
  // 登录
  login: (params) => {
    return httpUtils.post(address.account.login, {
      data: params
    })
  },
  // 测试加密
  addKey: (params) => {
    return httpUtils.post(address.common.test, {
      data: params
    })
  },
  // 注册
  getRegister: (params, imgCode) => {
    let url = `${address.account.register}?imgCode=${imgCode}`
    return httpUtils.post(url, {
      data: params
    })
  },
  // 精准注册 代理
  getAccRegister: (params, imgCode) => {
    let url = `${address.account.register}?imgCode=${imgCode}`
    return httpUtils.post(url, {
      data: params
    })
  },
  // 精准注册 会员
  getMemRegister: (params, imgCode) => {
    let url = `${address.account.register}?imgCode=${imgCode}`
    return httpUtils.post(url, {
      data: params
    })
  },
  // 精准注册 获取模板
  myTemplateList: query => {
    return httpUtils.get(address.agent.templeInfo, {
      query: query
    })
  },
  // 创建链接 代理
  getAcclink: (params, imgCode) => {
    let url = `${address.agent.addlink}?imgCode=${imgCode}`
    return httpUtils.post(url, {
      data: params
    })
  },
  // 创建链接 会员
  getMemlink: params => {
    return httpUtils.post(address.agent.addlink, {
      data: params
    })
  },
  // 链接管理
  getQueryPage: params => {
    return httpUtils.post(address.agent.queryPage, {
      data: params
    })
  },
  // 修改链接信息
  changeLinkInfo: params => {
    return httpUtils.post(address.agent.spreadLink, {
      data: params
    })
  },
  // 查询单个链接
  singleLinks: params => {
    return httpUtils.post(address.agent.singleLink, {
      data: params
    })
  },
  // 删除链接
  removeLink: params => {
    return httpUtils.post(address.agent.updateLink, {
      data: params
    })
  },
  // 升级代理
  UserToAgent: params => {
    return httpUtils.put(address.agent.updateUserToAgent, {
      data: params
    })
  },
  // 查询链接或者代理注册
  queryByInvite: params => {
    return httpUtils.post(address.agent.queryByInviteId, {
      data: params
    })
  },
  // 查询下级用户信息
  queryByLevel: query => {
    return httpUtils.get(address.agent.queryByLevel, {
      query: query
    })
  },
  // 查询红包
  getRedPacket: query => {
    return httpUtils.get(address.agent.findRedPacket, {
      query: query
    })
  },
  // 领取红包
  sendRedPacket: params => {
    return httpUtils.put(address.agent.getRedPacket, {
      data: params
    })
  },
  // 查询模板信息
  getInviteTempleInfo: query => {
    return httpUtils.get(address.agent.queryAgentTempInfo, {
      query: query
    })
  },
  // 更新模板信息
  updateTempInfo: params => {
    return httpUtils.put(address.agent.updateAgentTempInfo, {
      data: params
    })
  },
  forgetPwd: params => {
    return httpUtils.post(address.account.forgetPsw, {
      data: params
    })
  },
  // 登出
  logout: query => {
    return httpUtils.get(address.account.logout, {
      query: query
    })
  }
}

export default account
