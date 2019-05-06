import * as types from './types.js'
import account from '@/api/account'
import {
  getLocal
} from '@/utils/storage'
import {
  state
} from './mutations'

export default {
  // 用户登录
  login: ({
    commit
  }, userInfo, key) => {
    const merchantCode = getLocal('userInfo')
      ? getLocal('userInfo').merchantCode
      : ''
    const data = {
      userPhone: userInfo.username.trim(),
      userPass: userInfo.password,
      merchantCode: merchantCode
    }
    return new Promise((resolve, reject) => {
      account
        .login(data)
        .then(result => {
          commit(types.SET_TOKEN, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 用户注册
  register: ({
    commit
  }, userInfo) => {
    const data = {
      userPhone: userInfo.userphone,
      userPass: userInfo.password,
      templateType: '1',
      msgCode: userInfo.phoneCode,
      userName: '008',
      linksCode: userInfo.promoCode
    }
    const imgCode = userInfo.code
    return new Promise((resolve, reject) => {
      account
        .getRegister(data, imgCode)
        .then(result => {
          commit(types.REGISTER, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 登出
  logout: ({
    commit
  }) => {
    const userId = !state.userInfo.userId
      ? getLocal('userInfo').userId
      : state.userInfo.userId
    return new Promise((resolve, reject) => {
      account
        .logout({
          id: userId
        })
        .then(result => {
          commit(types.DELTOKEN, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 下级模板
  getMyTemplateList: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      account
        .myTemplateList(das)
        .then(result => {
          commit(types.TEMPLATEINFO, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 精准注册 代理
  accRegister: ({
    commit
  }, userInfo) => {
    const uuid = getLocal('userInfo')
      ? getLocal('userInfo').uuid
      : ''
    const userType = getLocal('userInfo')
      ? getLocal('userInfo').userType
      : ''
    const merchantCode = getLocal('userInfo')
      ? getLocal('userInfo').merchantCode
      : ''
    const data = {
      userType: userType,
      adduserType: userInfo.adduserType,
      userPhone: userInfo.userphone.trim(),
      merchantCode: merchantCode,
      templateType: '1',
      rebateType: userInfo.rebateType,
      tempInfo: userInfo.tempInfo,
      agentUuid: uuid
    }
    const imgCode = userInfo.code
    return new Promise((resolve, reject) => {
      account
        .getAccRegister(data, imgCode)
        .then(result => {
          commit(types.ACCREGISTER, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 精准注册 会员
  memRegister: ({
    commit
  }, userInfo) => {
    const uuid = getLocal('userInfo')
      ? getLocal('userInfo').uuid
      : ''
    const userType = getLocal('userInfo')
      ? getLocal('userInfo').userType
      : ''
    const merchantCode = getLocal('userInfo')
      ? getLocal('userInfo').merchantCode
      : ''
    const data = {
      userType: userType,
      adduserType: userInfo.adduserType,
      userPhone: userInfo.userphone.trim(),
      merchantCode: merchantCode,
      templateType: '1',
      agentUuid: uuid
    }
    const imgCode = userInfo.code
    return new Promise((resolve, reject) => {
      account
        .getMemRegister(data, imgCode)
        .then(result => {
          commit(types.MEMREGISTER, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 创建链接 代理
  acclinks: ({
    commit
  }, userInfo) => {
    const uuid = getLocal('userInfo') ? getLocal('userInfo').uuid : ''
    const merchantCode = getLocal('userInfo')
      ? getLocal('userInfo').merchantCode
      : ''
    const data = {
      agentUuid: uuid,
      merchantCode: merchantCode,
      type: userInfo.type,
      effictiveTime: userInfo.effictiveTime,
      rebateType: userInfo.rebateType,
      promotionType: userInfo.promotionType,
      tempInfo: userInfo.tempInfo,
      remark: '',
      status: '',
      domain: userInfo.domain
    }
    const imgCode = userInfo.code
    return new Promise((resolve, reject) => {
      account
        .getAcclink(data, imgCode)
        .then(result => {
          commit(types.ACCLINK, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 创建链接  会员
  memlink: ({
    commit
  }, userInfo) => {
    const uuid = getLocal('userInfo') ? getLocal('userInfo').uuid : ''
    const merchantCode = getLocal('userInfo')
      ? getLocal('userInfo').merchantCode
      : ''
    const data = {
      agentUuid: uuid,
      merchantCode: merchantCode,
      type: userInfo.type,
      effictiveTime: userInfo.effictiveTime,
      promotionType: userInfo.promotionType,
      rebateType: '',
      maxRegisterNum: userInfo.maxRegisterNum,
      remark: '',
      status: '',
      domain: userInfo.domain
    }
    return new Promise((resolve, reject) => {
      account
        .getMemlink(data)
        .then(result => {
          commit(types.MEMLINK, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 链接代理
  queryPage: ({
    commit
  }, params) => {
    const uuid = getLocal('userInfo') ? getLocal('userInfo').uuid : ''
    const data = {
      agentUuid: uuid,
      pageNo: params.pageNo,
      pageSize: params.pageSize,
      status: 1
    }
    return new Promise((resolve, reject) => {
      account
        .getQueryPage(data)
        .then(result => {
          commit(types.MANALINK, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 添加链接
  addQueryPage: ({
    commit
  }, das) => {
    const uuid = getLocal('userInfo') ? getLocal('userInfo').uuid : ''
    const data = {
      agentUuid: uuid,
      pageNo: das.pageNum,
      pageSize: das.pageSize,
      status: 1
    }
    return new Promise((resolve, reject) => {
      account
        .getQueryPage(data)
        .then(result => {
          commit(types.ADDMANALINK, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 修改链接管理
  spreadLinks: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      account
        .changeLinkInfo(das)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 单个链接查询
  singleLinks: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      account
        .singleLinks(das)
        .then(result => {
          commit(types.FINDSINGLELINK, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 删除链接
  updateLinks: ({
    commit
  }, userInfo) => {
    const data = {
      effictive: '',
      isdefault: '',
      remark: '',
      status: 0,
      maxRegisterNum: '',
      code: userInfo.code
    }
    return new Promise((resolve, reject) => {
      account
        .removeLink(data)
        .then(result => {
          commit(types.REMOVELINK, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 开户查询下级
  queryAllInvite: ({
    commit
  }, params) => {
    const data = {
      pageNo: params.pageNo,
      pageSize: params.pageSize,
      inviteUserUuid: params.inviteUserUuid,
      phone: '',
      agentTypes: ''
    }
    const refresh = params.refresh
    return new Promise((resolve, reject) => {
      account
        .queryByInvite(data)
        .then(result => {
          let resData = Object.assign({
            refresh: refresh
          }, {
            data: result
          })
          commit(types.QUERYINVITE, resData)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 佣金设置查询所有下级
  commissionAllInvite: ({
    commit
  }, params) => {
    const uuid = getLocal('userInfo') ? getLocal('userInfo').uuid : ''
    const data = {
      pageNo: params.pageNo,
      pageSize: params.pageSize,
      agentUuid: uuid,
      userPhone: params.userPhone,
      userType: params.userType
    }
    const refresh = params.refresh
    return new Promise((resolve, reject) => {
      account
        .queryByInvite(data)
        .then(result => {
          let resData = Object.assign({
            refresh: refresh
          }, {
            data: result
          })
          commit(types.COMQUERYINVITE, resData)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 追加用户下级
  addInvite: ({
    commit
  }, params) => {
    const uuid = getLocal('userInfo') ? getLocal('userInfo').uuid : ''
    const data = {
      pageNo: params.pageNo,
      pageSize: params.pageSize,
      inviteUserUuid: uuid,
      phone: params.phone,
      agentTypes: params.agentTypes
    }
    return new Promise((resolve, reject) => {
      account
        .queryByInvite(data)
        .then(result => {
          commit(types.ADDINVITE, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  queryByLevelInfo: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      const uuid = getLocal('userInfo') ? getLocal('userInfo').uuid : ''
      const data = {
        pageNo: das.pageNo,
        pageSize: das.pageSize,
        agentUuid: uuid,
        phone: das.userPhone,
        type: das.userType
      }
      account
        .queryByLevel(data)
        .then(result => {
          resolve(result)
          commit(types.QUERYBYLEVEL, result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  addByLevelInfo: ({
    commit
  }, das) => {
    const uuid = getLocal('userInfo') ? getLocal('userInfo').uuid : ''
    const data = {
      pageNo: das.pageNo,
      pageSize: das.pageSize,
      agentUuid: uuid,
      phone: das.userPhone,
      type: das.userType
    }
    return new Promise((resolve, reject) => {
      account
        .queryByInvite(data)
        .then(result => {
          commit(types.ADDQUERYBYLEVEL, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 升级代理
  updateAgent: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      account
        .UserToAgent(das)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 查询返点模板信息
  getInvitedTemplaInfo: ({
    commit
  }, params) => {
    const agentId = params.agentId
    return new Promise((resolve, reject) => {
      account
        .getInviteTempleInfo({
          agentId: agentId
        })
        .then(result => {
          commit(types.QUERYTEMPLATEINFO, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 更新下级模板信息
  updateAgTempInfo: ({
    commit
  }, params) => {
    return new Promise((resolve, reject) => {
      account
        .updateTempInfo(params)
        .then(result => {
          commit(types.UPDATETEMPINFO, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 查找红包
  findRedPacketList: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      account
        .getRedPacket()
        .then(result => {
          commit(types.FINDPACKET, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 获取红包
  lingquRedPacket: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      account
        .sendRedPacket(das)
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  backType: ({
    commit
  }) => {
    commit(types.BACKTYPE)
  }
}
