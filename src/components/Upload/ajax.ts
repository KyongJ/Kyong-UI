/**
 * 
 * @param {*} action 
 * @param {*} _option 
 * @param {*} xhr 几个对应的事件
 *  onloadstart	获取开始
    onprogress	数据传输进行中
    onabort	获取操作终止
    onerror	获取失败
    onload	获取成功
    ontimeout	获取操作在用户规定的时间内未完成
    onloadend	获取完成（不论成功与否）
 */

import {AjaxProps} from './interface'

// 解析错误
function getError(action: string, _option: AjaxProps, xhr: XMLHttpRequest) {
  const msg = `fail to post ${action} ${xhr.status}`
  const err: any = new Error(msg)
  err.status = xhr.status
  err.method = 'post'
  err.url = action
  return err
}

// 解析文本
function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export default function upload(option: AjaxProps) {
  const {action, data, filename, file, withCredentials, headers, onProgress, onError, onSuccess} = option
  let percent = 0
  if (typeof XMLHttpRequest === 'undefined') {
    return
  }

  const xhr = new XMLHttpRequest()

  // 返还上传进度
  if (xhr.upload) {
    // 手动重写上传进度事件
    xhr.upload.onprogress = function progress(e: ProgressEvent<EventTarget>) {
      if (e.total > 0) {
        percent = (e.loaded / e.total) * 100
      }
      onProgress(e, percent)
    }
  }

  // new一个表单对象
  const formData = new FormData()

  if (data) {
    Object.keys(data).map(key => {
      return formData.append(key, data[key])
    })
  }
  formData.append(filename, file)

  xhr.onerror = function error(e) {
    onError(e, undefined)
  }

  xhr.onload = function onload() {
    // 判断是否获取成功
    if (xhr.status < 200 || xhr.status >= 300) {
      // 如果失败了返回错误  并且执行回调错误钩子
      return onError(getError(action, option, xhr), getBody(xhr))
    }
    // 如果成功了就执行对应的成功事件  并且返回成功后的回调 res
    onSuccess(getBody(xhr))
  }

  // 初始化请求  第三个参数为是否异步
  xhr.open('post', action, true)

  // 处理withCredentials
  if (withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  // 处理headers
  for (const item in headers) {
    if (headers.item !== null) {
      xhr.setRequestHeader(item, headers[item])
    }
  }
  // 发送请求
  xhr.send(formData)
}
