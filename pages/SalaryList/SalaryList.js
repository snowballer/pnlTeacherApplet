// pages/SalaryList/SalaryList.js
var app = getApp();
//easymock数据public地址
var baseUrl=getApp().globalData.base_url;
Page({
  data: {
    showMySalary:false,
    dataItems:'',
    event_list:[]
  },
  onLoad: function (options) {
    var _this=this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    // 每日详情入口
    wx.request({
      url: baseUrl+'/salary-new/daily-detail/2017/11/1',
      success: function(res) {
        console.log(res);
        wx.hideLoading();
        _this.setData({
          showMySalary: true,
          dataItems:res.data.data,
          event_list:res.data.data.event_list
        });
      }
    });
  },
  
})