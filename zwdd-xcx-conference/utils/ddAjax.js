

export function ddRequest(method = "POST", url, data) {
  var _this=this;
  let app = getApp();

  let userId=app.globalData.userId; 
  return new Promise((resolve, reject) => {
    my.httpRequest({
      url: url,
      method: method,
      data: data,
      dataType: 'json',
      headers:{
           "Content-Type": "application/json",
            "userId":userId
      },
      success: function (res) {
        console.log('success',res);
        resolve(res)
      },
      fail: function (res) {
        console.log('fail',res);
        my.redirectTo({
          url: '/pages/error/error'
      })
        reject(res)
      },
      complete: function (res) {
        console.log('complete',res);
        my.hideLoading();
      }
    });
  })
}


