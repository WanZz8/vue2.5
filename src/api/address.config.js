let api = '/apis'
export default {
  account: {
    login: `${api}/login`,
    register: `${api}/accountOpen`,
    logout: `${api}/logout`
  },
  common: {
    imgCode: `${api}/verifyImg`,
    code: `${api}/sendMsg`,
    merchants: `${api}/console/subsystem/merchant`,
    announce: `${api}/console/subsystem/announce`,
    getPublicKey: `${api}/getPublicKey`,
    test: `${api}/test`
  },
  userMsg: {
    realNameVerified: `${api}/business/userVerified`, // 实名认证
    fundPass: `${api}/business/setFundPass`, // 修改资金密码
    loginPass: `${api}/business/setPass`, // 修改登录密码
    userDetial: `${api}/business/addUserDetial`, // 用户信息
    userSetInfo: `${api}/user/userInfo/checkUserInfo` // 获取用户安全中心详情
  },
  deposit: {
    balance: `${api}/trade/wallet/find/mine`, // 账户余额
    payChannelList: `${api}/business/getPayChannelList`, // 充值渠道
    deposit: `${api}/business/deposit`, // 充值
    record: `${api}/finance/deposit/find/page`, // 充值记录
    transactionRecord: `${api}/trade/flow/find/page`, // 交易明细
    withdrawRecord: `${api}/finance/withdraw/find/page`, // 提现记录,
    addBank: `${api}/business/addBank`, // 添加银行卡
    queryBankList: `${api}/finance/bank/find?status=1`, // 查询银行卡列表
    closeBank: `${api}/business/closeBank`, // 删除银行卡
    queryBankInfo: `${api}/business/queryBankInfo`, // 查询绑定银行卡
    withdraw: `${api}/business/withdraw`, // 提现
    tradeType: `${api}/trade/tradeType/find` // 交易明细类型
  },
  market: {
    template: `${api}/getHomeTemplate`, // 模板
    marketDetail: `${api}/business/getQuotaList` // 查询品种
  },
  buy: {
    getBusiness: `${api}/business/getQuotaInfo`, // 查止盈止损等
    submitOrder: `${api}/business/submitOrder`, // 现金市价
    entrustOrder: `${api}/business/entrustOrder`, // 现金指定价,
    // 积分买单
    submitIntegralOrder: `${api}/business/submitScoreOrder`, // 积分市价
    submitSimulationOrder: `${api}/business/entrustScoreOrder`, // 积分指定价
    // 模拟买单
    submitImitateOrder: `${api}/business/submitImitateOrder`, // 模拟市价
    submitAppointImitateOrder: `${api}/business/entrustImitateOrder` // 模拟指定价
  },
  agent: {
    templeInfo: `${api}/getHomeTemplate`, // 个人模板信息
    addlink: `${api}/business/addLink`, // 创建连接
    queryPage: `${api}/business/queryPage`, // 链接管理所有数据
    spreadLink: `${api}/business/updateLink`, // 链接管理修改
    updateLink: `${api}/business/updateLink`, // 删除链接
    singleLink: `${api}/business/queryLinkById`, // 查询单个链接
    queryByInviteId: `${api}/business/queryByInviteId`, // 查询所有下级
    queryByLevel: `${api}/user/userInfo/selectLowerLevel`, // 查询下级用户信息
    queryAgentTempInfo: `${api}/business/getMyTemplateList`, // 查询套餐信息
    updateAgentTempInfo: `${api}/product/agentTemplate/update`, // 更新代理模板
    findRedPacket: `${api}/trade/wallet/redBag/find`, // 红包查询
    getRedPacket: `${api}/trade/wallet/redBag/withdraw`, // 红包领取
    updateUserToAgent: `${api}/business/updateUserToAgent` // 升级代理
  },
  trade: {
    findCashEntrust: `${api}/order/cash/entrust/find/page`, // 现金委托
    findIntegralEntrust: `${api}/order/score/entrust/find/page`, // 积分委托
    findImitateEntrust: `${api}/order/imitate/entrust/find/page`, // 模拟委托

    finCashPosit: `${api}/order/cash/find/page`, // 现金持仓
    finIntegralPosit: `${api}/order/score/find/page`, // 积分持仓
    findImitatePosit: `${api}/order/imitate/find/page`, // 模拟持仓

    closeCashEntrust: `${api}/order/cash/entrust/close`, // 取消现金委托
    closeIntegralEntrust: `${api}/order/score/entrust/close`, // 取消积分委托
    closeImitateEntrust: `${api}/order/imitate/entrust/close`, // 取消模拟委托

    casehBackHand: `${api}/business/unwindAndReverse`, // 现金反手
    scoreBackHand: `${api}/business/unwindAndReverseScore`, // 积分反手
    imitateBackHand: `${api}/business/unwindAndReverseImitate`, // 模拟反手

    canlceCash: `${api}/order/cash/cancle `, // 手动平仓现金订单
    canlceScore: `${api}/order/score/cancle `, // 手动平仓积分订单
    canlceImitate: `${api}/order/imitate/cancle `, // 手动平仓模拟订单

    canlcaAll: `${api}/order/cash/cancleAll`, // 手动平仓所有现金订单
    canlcaAllScore: `${api}/order/score/cancleAll`, // 手动平仓所有积分订单
    canlcaAllImitate: `${api}/order/imitate/cancleAll`, // 手动平仓所有模拟订单

    updateLossPion: `${api}/order/cash/update`, // 更新现金止盈止损
    updateScoreLossPion: `${api}/order/score/update`, // 更新积分止盈止损
    updateImitateLossPion: `${api}/order/imitate/update`, // 更新模拟止盈止损

    findCashSettle: `${api}/order/cash/find/settle/page`, // 查询现金结算
    findScoreSettle: `${api}/order/score/find/settle/page`, // 查询积分结算
    findImitateSettle: `${api}/order/imitate/find/settle/page`, // 查询模拟结算

    singleCashSettle: `${api}/order/cash/find/info`, // 查询单个现金结算
    findIntegralSettles: `${api}/order/score/find/info`, // 查询单个积分结算
    singleImitateSettle: `${api}/order/imitate/find/info` // 查询单个模拟结算
  }
}
