import * as types from './types.js'
import deposit from '@/api/deposit'
import {
  getLocal
} from '@/utils/storage'

export default {
  // 余额
  balance: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      deposit
        .getBalance()
        .then(result => {
          commit(types.GETBALANCE, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 充值渠道
  payChannelList: ({
    commit
  }, params) => {
    return new Promise((resolve, reject) => {
      deposit
        .getPayChannelList()
        .then(result => {
          commit(types.CHANNELLIST, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 获取银行卡列表Id
  getQueryBankList: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      deposit
        .getBankList()
        .then(result => {
          commit(types.BANKLISTID, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 充值
  deposit: ({
    commit
  }, data) => {
    return new Promise((resolve, reject) => {
      deposit
        .getDeposit(data)
        .then(result => {
          // commit(types.GETDEPOSIT, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 提现
  withdraw: ({
    commit
  }, params) => {
    return new Promise((resolve, reject) => {
      deposit
        .toWithdraw(params)
        .then(result => {
          commit(types.WITHDRAW, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 充值记录
  record: ({
    commit
  }, params) => {
    const data = {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      status: params.status,
      startTime: params.startTime,
      endTime: params.endTime
    }
    return new Promise((resolve, reject) => {
      deposit
        .getRecord(data)
        .then(result => {
          commit(types.GETRECORD, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 追加充值记录
  addRecord: ({
    commit
  }, params) => {
    const data = {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      status: params.status,
      startTime: params.startTime,
      endTime: params.endTime
    }
    return new Promise((resolve, reject) => {
      deposit
        .getRecord(data)
        .then(result => {
          commit(types.ADDGETRECORD, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 交易明细
  tradeRecord: ({
    commit
  }, params) => {
    const data = !params.typeId || params.typeId === 0 ? {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      startTime: params.startTime,
      endTime: params.endTime,
      walletType: params.walletType
    } : {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      startTime: params.startTime,
      endTime: params.endTime,
      tradeType: params.typeId,
      walletType: params.walletType
    }
    return new Promise((resolve, reject) => {
      deposit
        .getTradeRecord(data)
        .then(result => {
          commit(types.GETTRADERECORD, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 追加交易明细
  addTradeRecord: ({
    commit
  }, params) => {
    const data = !params.typeId || params.typeId === 0 ? {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      startTime: params.startTime,
      endTime: params.endTime,
      walletType: params.walletType
    } : {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      startTime: params.startTime,
      endTime: params.endTime,
      tradeType: params.typeId,
      walletType: params.walletType
    }
    return new Promise((resolve, reject) => {
      deposit
        .getTradeRecord(data)
        .then(result => {
          commit(types.ADDGETTRADERECORD, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 交易明细类型
  tradeRecordType: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      deposit
        .getTradeDetailType(das)
        .then(result => {
          commit(types.GETTRADETYPE, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 提现记录
  withdrawRecord: ({
    commit
  }, params) => {
    const data = {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      status: params.stauts,
      startTime: params.startTime,
      endTime: params.endTime
    }
    return new Promise((resolve, reject) => {
      deposit
        .getWithDrawRecord(data)
        .then(result => {
          commit(types.GETWITHDRAW, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  addWithdrawRecord: ({
    commit
  }, params) => {
    const data = {
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      status: params.stauts,
      startTime: params.startTime,
      endTime: params.endTime
    }
    return new Promise((resolve, reject) => {
      deposit
        .getWithDrawRecord(data)
        .then(result => {
          commit(types.ADDGETWITHDRAW, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 获取已经绑定银行卡
  QueryBankInfo: ({
    commit
  }) => {
    const userId = getLocal('userInfo') ? getLocal('userInfo').uuid : ''
    return new Promise((resolve, reject) => {
      deposit
        .getAllBankList({
          userId: userId
        })
        .then(result => {
          commit(types.QUERYBANKLIST, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 删除某张银行卡
  closeBankId: ({
    commit
  }, params) => {
    const data = {
      bankId: params.bankId
    }
    return new Promise((resolve, reject) => {
      deposit
        .romeveBankId(data)
        .then(result => {
          commit(types.REMOVEBANK, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getTimeList: ({
    commit
  }) => {
    commit(types.GETTIMELIST)
  },
  // 添加银行卡
  addBankList: ({
    commit
  }, params) => {
    const uuid = getLocal('userInfo') ? getLocal('userInfo').uuid : ''
    const phone = getLocal('userInfo') ? getLocal('userInfo').userPhone : ''
    const data = {
      userUuid: uuid,
      bankType: 1,
      accountName: params.accountName,
      accountNum: params.accountNum,
      bank: params.bank,
      bankLand: params.bankLand,
      phone: phone,
      bankName: params.bankName,
      bankCode: params.bankCode
    }
    return new Promise((resolve, reject) => {
      deposit
        .AddBank(data)
        .then(result => {
          commit(types.ADDBANKLIST, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
