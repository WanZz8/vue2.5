const config = {
  // websocket链接
  // ws: 'ws://47.107.117.176:9095/ws',
  ws: 'wss://websocket.czjyfw.com/ws',
  // 底部路由
  footerUrl: [{
    routerName: '/home',
    cnName: ' '
  }, {
    routerName: '/market',
    cnName: '行情入口'
  }, {
    routerName: '/trade',
    cnName: '交易'
  }, {
    routerName: '/live',
    cnName: '资讯'
  }, {
    routerName: '/userCenter/home',
    cnName: '我的'
  }, {
    routerName: '/userCenter/recharge',
    cnName: '充值'
  }, {
    routerName: '/userCenter/RechargeRecord',
    cnName: '充值记录'
  }, {
    routerName: '/userCenter/MyBanlance',
    cnName: '我的钱包'
  }, {
    routerName: '/userCenter/withdraw',
    cnName: '提现'
  }, {
    routerName: '/userCenter/withdrawRecord',
    cnName: '提现记录'
  }, {
    routerName: '/userCenter/myBanks',
    cnName: '管理银行卡'
  }, {
    routerName: '/userCenter/addCard',
    cnName: '绑定银行卡'
  }, {
    routerName: '/userCenter/securityCenter',
    cnName: '安全中心'
  }, {
    routerName: '/userCenter/trandeDetails',
    cnName: '交易明细'
  }, {
    routerName: '/userCenter/openAccount',
    cnName: '开户'
  }, {
    routerName: '/userCenter/commission',
    cnName: '佣金设置'
  }, {
    routerName: '/userCenter/bindCard',
    cnName: '绑定银行卡'
  }, {
    routerName: '/userCenter/spreadLink',
    cnName: '推广管理'
  }, {
    routerName: '/userCenter/LinkDetails',
    cnName: '注册人数'
  }],
  // 换颜色
  colorList: [{
    className: 'default',
    colorNumber: '#6989ff'
  },
  {
    className: 'Red',
    colorNumber: '#DD2727'
  },
  {
    className: 'Orange',
    colorNumber: '#FF5000'
  },
  {
    className: 'Gary',
    colorNumber: '#666666'
  }
  ]
}
export default config
