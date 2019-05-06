export default [{
  path: '/power/login',
  component: () => import('@/views/userAction/login/login'),
  name: 'login'
},
{
  path: '/power/register',
  component: () => import('@/views/userAction/register/register'),
  name: 'register',
  meta: {
    keepAlive: true
  }
},
{
  path: '/power/forget',
  component: () => import('@/views/userAction/forget/forget'),
  name: 'forget',
  meta: {
    keepAlive: true
  }
}
]
