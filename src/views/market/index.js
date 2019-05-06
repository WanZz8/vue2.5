export default [{
  path: '/market',
  component: () => import('@/views/market/market'),
  name: 'market',
  meta: {
    title: '行情',
    keepAlive: false
  }
},
{
  path: '/market/list/:id',
  component: () => import('@/views/market/dynamicMarket/marketList'),
  name: 'list',
  meta: {
    title: '行情列表',
    keepAlive: false
  }
},
{
  path: '/market/charts',
  component: () => import('@/views/market/marketCharts/marketTrends'),
  name: 'charts',
  meta: {
    title: '行情走势',
    keepAlive: false
  }
}
]
