module.exports = {
  proxy: {
    '/apis': {
      //将www.exaple.com印射为/apis
      target: 'http://cxx.99qupai.com/apis/',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/apis': '/'
      }
    },
    '/group1': {
      target: 'http://tmk.bingtl.com/apis',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/group1': '/'
      }
    }
  }
}
