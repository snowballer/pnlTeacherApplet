import Url from './utils/api';


App({
  onLaunch: function () {
      //获取session_key和openid
      wx.login({
        success: res =>{
          wx.getUserInfo({
            success: function (res) {
              //保存本地用户信息
              wx.setStorageSync("userInfo", res.userInfo)
            }
          })
          if (res.code) {
            //发起网络请求
            wx.request({
              url: Url.baseUrl+'/applet/login',
              header: {
                'content-type': 'application/json'
              },
              data: {
                code: res.code,
              },
              success:function(res){
                console.log(res);
                const session_key = res.data.data.session_key;
                wx.setStorageSync('session_key', session_key);
                wx.switchTab({
                  url: '../myCourse/myCourse'
                });
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
  },
  globalData: {
    userInfo: null
  }
})
