import {
  setLocal,
  clearALLlocal,
  clearALLsession,
  getLocal,
  getNoLocal
} from '@/utils/storage'
import {
  SET_TOKEN,
  DELTOKEN,
  REGISTER,
  ACCREGISTER,
  TEMPLATEINFO,
  MEMREGISTER,
  ACCLINK,
  MEMLINK,
  MANALINK,
  REMOVELINK,
  QUERYINVITE,
  COMQUERYINVITE,
  QUERYTEMPLATEINFO,
  UPDATETEMPINFO,
  ADDINVITE,
  FINDSINGLELINK,
  FINDPACKET,
  ADDMANALINK,
  QUERYBYLEVEL,
  ADDQUERYBYLEVEL,
  BACKTYPE
} from './types'

export const state = {
  token: '' || getNoLocal('token'),
  userInfo: getLocal('userInfo'),
  template: [],
  queryList: [],
  queryListTotal: 0,
  inviteList: [],
  inviteTotal: 0,
  comInviteList: [],
  comInviteTotal: 0,
  templateList: [], // 获取当前模板信息
  queryLink: '',
  redPacketList: '',
  getRedPacketList: '',
  userInviteList: [],
  fytype: []
}

export const mutations = {
  [SET_TOKEN](state, info) {
    if (info && info.status) {
      state.userInfo = info.data
      state.token = info.data.hasOwnProperty('token') ? info.data.token : ''
      if (info.data && info.data.token) {
        setLocal('userInfo', info.data)
        setLocal('token', info.data.token)
      }
    }
  },
  [DELTOKEN](state, res) {
    if (res && res.status) {
      state.token = ''
      state.userInfo = ''
      clearALLlocal()
      clearALLsession()
    } else {
      if (!res || (res && res.errorCode === 'LOGIN_INVALID')) {
        state.token = ''
        state.userInfo = ''
        clearALLlocal()
        clearALLsession()
      }
    }
  },
  [REGISTER](state, info) {
    if (info && info.status) {
      state.userInfo = info.data
      state.token = info.data.hasOwnProperty('token') ? info.data.token : ''
      if (info.data && info.data.token) {
        setLocal('userInfo', info.data)
        setLocal('token', info.data.token)
      }
    }
  },
  [TEMPLATEINFO](state, info) {
    if (info && info.status) {
      let das = info.data
      state.template = das
    }
  },
  [ACCREGISTER](state, info) {
    if (info && info.status) {}
  },
  [MEMREGISTER](state, info) {
    if (info && info.status) {}
  },
  [ACCLINK](state, info) {
    if (info && info.status) {}
  },
  [MEMLINK](state, info) {
    if (info && info.status) {}
  },
  [MANALINK](state, info) {
    if (info.status) {
      state.queryList = info.data.list
    }
  },
  [ADDMANALINK](state, info) {
    if (info.status) {
      state.queryList = state.queryList.concat(info.data.list)
    }
  },
  [REMOVELINK](state, info) {
    if (info && info.status) {}
  },
  [QUERYINVITE](state, info) {
    const {
      refresh,
      data
    } = info
    if (data && data.status) {
      if (data.data.list && data.data.list.length) {
        if (!refresh) {
          state.inviteList = data.data.list
          state.inviteTotal = data.data.total
        } else {
          let arr = data.data.list
          state.inviteList = state.inviteList.concat(arr)
          state.inviteTotal = data.data.total
        }
      }
    }
  },
  [COMQUERYINVITE](state, info) {
    let das = info.data
    if (das && das.status) {
      state.comInviteList = das.data.list
    }
  },
  [ADDINVITE](state, info) {
    if (info.status) {
      let das = info.data
      state.comInviteList = state.comInviteList.concat(das.list)
    }
  },
  [QUERYBYLEVEL](state, info) {
    let das = info.data
    if (info.status) {
      state.userInviteList = das.list
    }
  },
  [ADDQUERYBYLEVEL](state, info) {
    let das = info.data
    if (info.status) {
      state.userInviteList = state.userInviteList.concat(das.list)
    }
  },
  [FINDSINGLELINK](state, val) {
    if (val.status) {
      setLocal('linkData', val.data)
      state.queryLink = val.data
    }
  },
  [QUERYTEMPLATEINFO](state, info) {
    if (info && info.status) {
      let tpl = state.template.slice('')
      if (tpl.length > 0) {
        let das = []
        for (let i = 0; i < tpl.length; i++) {
          das = info.data
          das.map((item, idx) => {
            if (tpl[i].templateCode === item.templateCode) {
              item.maxRebate = tpl[i].rebate - 1
            }
            return item
          })
        }
        state.templateList = das
      }
    }
  },
  [UPDATETEMPINFO](state, info) {
    if (info && info.status) {
      //
    }
  },
  [FINDPACKET](state, val) {
    if (val.status) {
      state.getRedPacketList = val.data.result
    }
  },
  [BACKTYPE](state) {
    let checkListBox = []
    let getLocalInfo = getLocal('userInfo')
    if (!getLocalInfo) {
      return ''
    }
    if (getLocalInfo.rebateType === '1') {
      checkListBox = [{
        label: '手续费返佣',
        value: '1',
        disabled: true
      }]
    } else if (getLocalInfo.rebateType === '2') {
      checkListBox = [{
        label: '盈亏返佣',
        value: '2',
        disabled: true
      }]
    } else {
      checkListBox = [{
        label: '手续费返佣',
        value: '1'
      },
      {
        label: '盈亏返佣',
        value: '2'
      }
      ]
    }
    state.fytype = checkListBox
  }
}

export const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  template: state => state.template,
  queryList: state => state.queryList,
  queryListTotal: state => state.queryListTotal,
  inviteList: state => state.inviteList,
  inviteTotal: state => state.inviteTotal,
  comInviteList: state => state.comInviteList,
  comInviteTotal: state => state.comInviteTotal,
  templateList: state => state.templateList,
  queryLink: state => state.queryLink,
  getRedPacketList: state => state.getRedPacketList,
  userInviteList: state => state.userInviteList,
  fytype: state => state.fytype
}
