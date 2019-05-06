export default [{
  path: '/trade',
  component: () => import('@/views/trade/trades'),
  name: 'trade',
  meta: {
    title: '交易',
    keepAlive: false
  }
},
{
  path: '/trade/detail/:id',
  component: () => import('@/views/trade/settlement/detail'),
  name: 'detail',
  meta: {
    title: '交易详情',
    keepAlive: false
  }
}
]
