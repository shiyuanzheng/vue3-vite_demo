import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import isPlainObject from 'lodash-es/isPlainObject'
import { getToken } from '@/utils/cookie'
import { ElNotification } from 'element-plus'

const notificationError = (title, message) =>
  ElNotification.error({
    title: title,
    message: message,
    showClose: false,
    duration: 3500
  })

console.log(
  '%c [ import.meta.VITE_API_URL ] ',
  'font-size:13px; background:pink; color:#bf2c9f;',
  import.meta.env.VITE_API_URL
)

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : '/api',
  timeout: 1000 * 60,
  withCredentials: true
})

function alertError(code, errorMsg) {
  switch (code) {
    case 401:
    case 10001:
      notificationError('未认证', errorMsg || '认证信息验证失败，请重新登录')
      useUserStore()
        .setLogout()
        .then(() => {
          router.replace({ name: 'login' })
        })
      break
    case 403:
      notificationError('拒绝访问', errorMsg || '没有权限，服务器拒绝访问')
      break
    case 404:
      notificationError('资源未找到', errorMsg || '没有找到相应资源，请检查后重试')
      break
    case 405:
      notificationError('方法不支持', errorMsg || '不支持的请求类型，请检查后重试')
      break
    case 500:
      notificationError('服务器错误', errorMsg || '内部服务器异常，请联系系统管理员')
      break
    case 502:
      notificationError('网关错误', errorMsg || '网关错误，请联系系统管理员')
      break
    case 504:
      notificationError('链接超时', errorMsg || '网关连接超时，请稍后重试')
      break
    case 'timeout':
      notificationError('请求超时', '网络请求超时，请稍后重试')
      break
    case 'networkErr':
      notificationError('网络错误', '网络请求错误，请检查网络连接或联系系统管理员')
      break
    case 'businessAlert':
      notificationError('系统提示', errorMsg || '未知错误，请联系系统管理员')
      break
    default:
      notificationError('未知错误', errorMsg || '未知错误，请联系系统管理员')
      break
  }
}

const errorHandler = (error) => {
  console.log('%c [ error ] ', 'font-size:13px; background:pink; color:#bf2c9f;', error)
  const errRes = error.response
  if (error.code === 'ERR_CANCELED') Message.warning('资源请求已取消')
  else {
    if (errRes?.data instanceof Blob && errRes?.data?.type.toLowerCase().indexOf('json') !== -1) {
      const reader = new FileReader()
      reader.readAsText(errRes?.data, 'utf-8')
      reader.onload = function () {
        alertError(errRes.status, JSON.parse(reader.result).message)
      }
    } else {
      let code = 0
      try {
        code = errRes.data.status || errRes.status
      } catch (e) {
        if (error.toString().includes('timeout')) alertError('timeout')
        else alertError('networkErr')
        return Promise.reject(error)
      }
      const errorMsg = errRes && errRes.data.message
      alertError(code, errorMsg)
    }
  }

  return Promise.reject(error)
}

/**
 * 请求拦截
 */
/**
 * @description: http请求拦截器
 * @return { Object } http request config
 */
http.interceptors.request.use((config) => {
  if (getToken()) config.headers['token'] = getToken()

  config.headers['Accept-Language'] = 'zh-CN'

  // 默认参数
  var defaults = {}
  // 防止缓存，GET请求默认带_t参数
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: new Date().getTime()
    }
    const parameter = config.params
    config.paramsSerializer = (parameter) => qs.stringify(parameter, { arrayFormat: 'comma' })
  }
  if (isPlainObject(config.params)) {
    config.params = {
      ...defaults,
      ...config.params
    }
  }
  if (isPlainObject(config.data)) {
    config.data = {
      ...defaults,
      ...config.data
    }
    if (/^application\/x-www-form-urlencoded/.test(config.headers['content-type'])) {
      config.data = qs.stringify(config.data)
    }
  }
  return config
}, errorHandler)

/**
 * @description: http响应拦截，处理响应结果。自定义code 0为成功，其他为失败，并在失败时提示错误信息
 * @return { Object } http response
 */
http.interceptors.response.use((response) => {
  const customCode = Number(response.data.code)

  if (customCode && customCode !== 0) {
    if (customCode.toString().length === 5) alertError('businessAlert', response.data?.msg)
    else alertError(customCode, response.data?.msg)
    return Promise.reject(response.data.msg)
  }

  if (response?.headers['content-disposition']) {
    response.data['content-disposition'] = response.headers['content-disposition']
  }

  return response.data
}, errorHandler)

export default http
