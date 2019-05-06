import httpUtils from '../config/http'
import address from './address.config'
// import deploy from '../config/basic.config'

const deposit = {
  getBalance: query => {
    return httpUtils.get(address.deposit.balance, {
      query: query
    })
  },
  getPayChannelList: query => {
    return httpUtils.get(address.deposit.payChannelList, {
      query: query
    })
  },
  getDeposit: params => {
    return httpUtils.post(address.deposit.deposit, {
      data: params
    })
  },
  getRecord: params => {
    return httpUtils.get(address.deposit.record, {
      query: params
    })
  },
  getTradeDetailType: query => {
    return httpUtils.get(address.deposit.tradeType, {
      query: query
    })
  },
  toWithdraw: params => {
    return httpUtils.post(address.deposit.withdraw, {
      data: params
    })
  },
  getTradeRecord: params => {
    return httpUtils.get(address.deposit.transactionRecord, {
      query: params
    })
  },
  getWithDrawRecord: params => {
    return httpUtils.get(address.deposit.withdrawRecord, {
      query: params
    })
  },
  getBankList: params => {
    return httpUtils.get(address.deposit.queryBankList, {
      query: params
    })
  },
  getAllBankList: params => {
    return httpUtils.post(address.deposit.queryBankInfo, {
      data: params
    })
  },
  AddBank: params => {
    return httpUtils.post(address.deposit.addBank, {
      data: params
    })
  },
  romeveBankId: params => {
    return httpUtils.post(address.deposit.closeBank, {
      data: params
    })
  }
}

export default deposit
