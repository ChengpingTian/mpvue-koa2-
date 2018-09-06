import config from './config'
export function get(url, data) {
  return request(url, "GET", data)
}
export function post(url,data) {
    return request(url,"POST", data)
  }

function request(url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url, //仅为示例，并非真实的接口地址
      success: function (res) {
        if (res.data.code == 0) {
          resolve(res.data.data)
        } else {
          // showMdal(res.data.data.msg)
          reject(res.data)
          console.log(res)
        }

      }
    })

  })

}
export function showMdal(text){
    wx.showModal({
        title: '提示',
        content:text,
        showCancel:false
    
      })
}
export function successTips(tetx) {
  wx.showToast({
    title: tetx,
    icon: 'success',
    duration: 2000
  })
}
