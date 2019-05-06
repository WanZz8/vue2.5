import * as types from './types.js'
import UserMsg from '@/api/userMsg'
import publicMethod from '@/api/common'
import { getLocal } from '@/utils/storage'

export default {
  // 资金短信验证码
  getFunsPhoneCode: ({commit}, params) => {
    const merchantCode = getLocal('userInfo')
      ? getLocal('userInfo').merchantCode
      : ''
    const data = {
      phone: params.userphone.trim(),
      templateType: '4',
      merchantCode: merchantCode,
      imgCode: params.code
    }
    return new Promise((resolve, reject) => {
      publicMethod
        .phCode(data)
        .then(val => {
          commit(types.FUNDSPHONECODE, val)
          resolve(val)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 登录短信验证码
  getPassPhoneCode: ({commit}, params) => {
    const merchantCode = getLocal('userInfo')
      ? getLocal('userInfo').merchantCode
      : ''
    const data = {
      phone: params.userphone.trim(),
      templateType: params.templateType,
      merchantCode: merchantCode,
      imgCode: params.code
    }
    return new Promise((resolve, reject) => {
      publicMethod
        .phCode(data)
        .then(val => {
          commit(types.PASSPHONECODE, val)
          resolve(val)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 实名认证
  realNameVerified: ({ commit }, params) => {
    const userPhone = getLocal('userInfo')
      ? getLocal('userInfo').userPhone
      : ''
    const data = {
      realName: params.name.trim(),
      idCard: params.code,
      phone: userPhone
    }
    return new Promise((resolve, reject) => {
      UserMsg
        .realName(data)
        .then(result => {
          commit(types.REALNAME, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 设置资金密码
  setFundPass: ({ commit }, userInfo) => {
    const uuid = getLocal('userInfo')
      ? getLocal('userInfo').uuid
      : ''
    const merchantCode = getLocal('userInfo')
      ? getLocal('userInfo').merchantCode
      : ''
    const data = {
      phone: userInfo.userphone.trim(),
      merchantCode: merchantCode,
      templateType: '4',
      userId: uuid,
      fundpass: userInfo.password,
      msgCode: userInfo.phoneCode
    }
    const imgCode = userInfo.code
    return new Promise((resolve, reject) => {
      UserMsg
        .setfundpass(data, imgCode)
        .then(result => {
          commit(types.SETFUNDPASS, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 修改登录密码
  changePassword: ({ commit }, userInfo) => {
    const uuid = getLocal('userInfo')
      ? getLocal('userInfo').uuid
      : ''
    const merchantCode = getLocal('userInfo')
      ? getLocal('userInfo').merchantCode
      : ''
    const data = {
      phone: userInfo.userphone.trim(),
      merchantCode: merchantCode,
      templateType: userInfo.templateType, // '2' or '3'
      userId: uuid,
      pass: userInfo.password,
      msgCode: userInfo.phoneCode
    }
    const imgCode = userInfo.code
    return new Promise((resolve, reject) => {
      UserMsg
        .changePass(data, imgCode)
        .then(result => {
          commit(types.CHANGEPASS, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 设置用户详情
  setUserDetails: ({ commit }, userInfo) => {
    const data = {
      birthday: userInfo.date,
      introduction: '',
      qqNum: '',
      email: userInfo.emails,
      province: userInfo.areaName,
      city: userInfo.areaName,
      area: userInfo.areaName,
      addressDetail: userInfo.addressDetail
    }
    const imgCode = userInfo.code
    return new Promise((resolve, reject) => {
      UserMsg
        .addUserDetails(data, imgCode)
        .then(result => {
          commit(types.CHANGEPASS, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 用户安全中心信息详情
  userDetailsInfo: ({commit}) => {
    return new Promise((resolve, reject) => {
      UserMsg
        .userInfoDetails()
        .then(result => {
          commit(types.USERDETAILS, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
