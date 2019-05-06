import * as types from './types.js'
import publicMethod from '@/api/common'

export default {
  // 换颜色
  changeColor: ({
    commit
  }, val) => {
    commit(types.CHANGETHEME, val)
  },
  current: ({
    commit
  }) => {
    commit(types.CURRENT)
  },
  // loading
  showLoading: ({
    commit
  }) => {
    commit(types.SHOWLOADING)
  },
  hideLoading: ({
    commit
  }) => {
    commit(types.HIDELOADING)
  },
  // 图形验证码
  getImgCode: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      publicMethod
        .authCode()
        .then(val => {
          commit(types.GETIMGCODE, val)
          resolve(val)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 短信验证码
  getPhoneCode: ({
    commit
  }, params) => {
    const data = {
      phone: params.userphone.trim(),
      templateType: '1',
      merchantCode: '20',
      imgCode: params.code
    }
    return new Promise((resolve, reject) => {
      publicMethod
        .phCode(data, data.imgCode)
        .then(val => {
          commit(types.GETPHCODE, val)
          resolve(val)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 品牌信息
  getMerchantInfo: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod
        .merchantInfos(das)
        .then(val => {
          commit(types.GETSERVICE, val)
          resolve(val)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 公告
  getNotice: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod
        .noteAnnounce(das)
        .then(val => {
          commit(types.GETNOTICE, val)
          resolve(val)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 公钥
  publicKey: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      publicMethod
        .getPublicKeys()
        .then(val => {
          commit(types.GETPUBLICKEY, val)
          resolve(val)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
