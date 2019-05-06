// import UserRouter from '@/views/userCenter/会员中心路由'
// eslint-disable-next-line
import Power from '@/views/userAction'
import Market from '@/views/market'
import Trade from '@/views/trade'
const Home = () => import('@/views/home/home')
const UserCenter = () => import('@/views/userCenter/userHome/userCenter')
const LayoutRouter = () => import('@/views/shitu.vue')
// 充值
const Recharge = () => import('@/views/userCenter/memberCenter/recharge/recharge')

// 银行转账
const BankTransfer = () => import('@/views/userCenter/memberCenter/recharge/subpage/bankTransfer')
// 充值记录
const RechargeRecord = () => import('@/views/userCenter/memberCenter/rechargeRecord/rechargeRecord')
// 交易明细
const TrandeDetails = () => import('@/views/userCenter/memberCenter/trandeDetail/')
// 提现
const Withdraw = () => import('@/views/userCenter/memberCenter/withdraw/withdraw')
// 提现记录
const WithdrawRecord = () => import('@/views/userCenter/memberCenter/withdrawRecord/withdrawRecord')
// 资金账户
const Funds = () => import('@/views/userCenter/memberCenter/fund/fund')
// 我的钱包
const MyBanlance = () => import('@/views/userCenter/memberCenter/balance/balance')
// 任务中心
const Task = () => import('@/views/userCenter/memberCenter/task/task')
// 邀请好友
const Invite = () => import('@/views/userCenter/memberCenter/invite/invite')
// 我的优惠券
const Discounts = () => import('@/views/userCenter/memberCenter/discounts/discounts')
// 我的银行卡
const MyBanks = () => import('@/views/userCenter/memberCenter/myBanks/myBanks')
// 绑定银行卡
const BindCard = () => import('@/views/userCenter/memberCenter/bindCard/bindCard')
// 添加银行卡
const AddCard = () => import('@/views/userCenter/memberCenter/addCard/addCard')
// 设置
const Setting = () => import('@/views/userCenter/memberCenter/setting/setting')
const CgCr = () => import('@/views/userCenter/memberCenter/bgColor/index')
// 个人资料
const Info = () => import('@/views/userCenter/memberCenter/info/info')
// 修改登录密码
const ChangeFundsPassword = () => import('@/views/userCenter/memberCenter/changeFundPass/changeFundPass')
// 用户反馈
const FeedBack = () => import('@/views/userCenter/memberCenter/feedback/feedback')
// 我的客服
// const Service = () => import('@/views/userCenter/memberCenter/service/service')
// 用户协议
const Agreement = () => import('@/views/userCenter/memberCenter/agreement/agreement')
// 分享
const Share = () => import('@/views/userCenter/memberCenter/share/share')
// 安全中心
const SecurityCenter = () => import('@/views/userCenter/memberCenter/securityCenter/securityCenter')
// 实名认证
const RealName = () => import('@/views/userCenter/memberCenter/realName/realName')
// 绑定银行卡
const BindWithdrawal = () => import('@/views/userCenter/memberCenter/bindWithdrawal/bindWithdrawal')
// 修改登录密码
const ChangePassword = () => import('@/views/userCenter/memberCenter/changePassword/changePassword')
// 设置资金密码
const FundsPassword = () => import('@/views/userCenter/memberCenter/fundsPassword/fundsPassword')
// 代理中心
// 开户
const OpenAccount = () => import('@/views/userCenter/memberCenter/openAccount/openAccount')
// 链接管理
const SpreadLink = () => import('@/views/userCenter/memberCenter/spreadLink/spreadLink')
// 修改链接管理
const ChangeLink = () => import('@/views/userCenter/memberCenter/spreadLink/changeLink')
// 链接管理人数
const LinkDetails = () => import('@/views/userCenter/memberCenter/linkDetails/linkDetails')
// 佣金设置
const Commission = () => import('@/views/userCenter/memberCenter/commission/commission')
// 返点收入
const Rebate = () => import('@/views/userCenter/memberCenter/rebate/rebate')
// 红包
const RedPacket = () => import('@/views/userCenter/memberCenter/redPacket/redPacket')
const Download = () => import('@/views/userCenter/memberCenter/download/download')
// 资讯
const Live = () => import('@/views/live')
// 客服
const Service = () => import('@/views/outherPage/service')
// 公告
const Notice = () => import('@/views/outherPage/notice')
// 活动
const RuleOfActivity = () => import('@/views/outherPage/ruleOfActivity')
// app推广
const AppSpread = () => import('@/views/userCenter/memberCenter/spreadLink/app/app')
// 链接推广
const LinkSpread = () => import('@/views/userCenter/memberCenter/spreadLink/link/link')
const Lower = () => import('@/views/userCenter/memberCenter/lower/index')
const OrderList = () => import('@/views/userCenter/memberCenter/order/index')
const vueRouter = [{
  path: '/home',
  component: Home,
  name: 'home'
},
{
  path: '/power',
  component: LayoutRouter,
  children: Power
},
{
  path: '/market',
  component: LayoutRouter,
  children: Market
},
{
  path: '/trade',
  component: LayoutRouter,
  children: Trade
},
{
  path: '/live',
  component: Live,
  name: 'live'
},
{
  path: '/service',
  component: Service,
  name: 'Service'
},
{
  path: '/notice',
  component: Notice,
  name: 'notice'
},
{
  path: '/activityRule',
  component: RuleOfActivity,
  name: 'activityRule'
},
{
  path: '/userCenter',
  redirect: '/userCenter/home',
  component: LayoutRouter,
  name: 'UserCenter',
  children: [{
    path: '/userCenter/home',
    component: UserCenter
  },
  {
    path: '/userCenter/lower',
    component: Lower
  },
  {
    path: '/userCenter/orderList',
    component: OrderList
  },
  {
    path: '/userCenter/trandeDetails',
    component: TrandeDetails
  },
  {
    path: '/userCenter/recharge',
    component: Recharge
  },
  {
    path: '/userCenter/BankTransfer',
    component: BankTransfer
  },
  {
    path: '/userCenter/RechargeRecord',
    component: RechargeRecord
  },
  {
    path: '/userCenter/withdraw',
    component: Withdraw
  },
  {
    path: '/userCenter/withdrawRecord',
    component: WithdrawRecord
  },
  {
    path: '/userCenter/funds',
    component: Funds
  },
  {
    path: '/userCenter/MyBanlance',
    component: MyBanlance
  },
  {
    path: '/userCenter/task',
    component: Task
  },
  {
    path: '/userCenter/invite',
    component: Invite
  },
  {
    path: '/userCenter/discounts',
    component: Discounts
  },
  {
    path: '/userCenter/setting',
    component: Setting
  },
  {
    path: '/userCenter/info',
    component: Info
  },
  {
    path: '/userCenter/ChangeFundsPassword',
    component: ChangeFundsPassword
  },
  {
    path: '/userCenter/feedback',
    component: FeedBack
  },
  {
    path: '/userCenter/setColor',
    component: CgCr
  },
  {
    path: '/userCenter/agreement',
    component: Agreement
  },
  {
    path: '/userCenter/myBanks',
    component: MyBanks
  },
  {
    path: '/userCenter/bindCard',
    component: BindCard
  },
  {
    path: '/userCenter/addCard',
    component: AddCard
  },
  {
    path: '/userCenter/share',
    component: Share
  },
  {
    path: '/userCenter/securityCenter',
    component: SecurityCenter
  },
  {
    path: '/userCenter/realName',
    component: RealName
  },
  {
    path: '/userCenter/bindWithdrawal',
    component: BindWithdrawal
  },
  {
    path: '/userCenter/changePassword',
    component: ChangePassword
  },
  {
    path: '/userCenter/fundsPassword',
    component: FundsPassword
  },
  {
    path: '/userCenter/openAccount',
    component: OpenAccount
  },
  {
    path: '/userCenter/spreadLink',
    component: SpreadLink
  },
  {
    path: '/userCenter/appSpread',
    component: AppSpread
  },
  {
    path: 'userCenter/linkSpread',
    component: LinkSpread
  },
  {
    path: '/userCenter/changeLink',
    component: ChangeLink
  },
  {
    path: '/userCenter/LinkDetails',
    component: LinkDetails
  },
  {
    path: '/userCenter/commission',
    component: Commission
  },
  {
    path: '/userCenter/rebate',
    component: Rebate
  },
  {
    path: '/userCenter/redPacket',
    component: RedPacket
  },
  {
    path: '/userCenter/download',
    component: Download
  }
  ]
},
  // { path: '/login', redirect: '/home', hidden: true }
{
  path: '*',
  redirect: '/home',
  hidden: true
}
]

export default vueRouter
