// pages/SalaryList/SalaryList.js
var app = getApp();
//easymock数据public地址
var baseUrl=getApp().globalData.base_url;
Page({
  data: {
    yearIpt:'2017',
    monthIpt:'11',
    showMySalary:false,
    dataItems:'',
    detail:[]
  },
  onLoad: function (options) {
    var _this=this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    // 每日详情入口
    wx.request({
      url: baseUrl+'/salary-new/month-activity',
      success: function(res) {
        wx.hideLoading();
        _this.setData({
          showMySalary: true,
          dataItems:res.data.data,
          detail:res.data.data.detail
        });
        var money1=_this.data.detail[0].money;
        console.log(money1);
        if(money1>=0){
          console.log("大于dengyu0");
        }else{
          console.log('小于0');
        }
        console.log(_this.data.detail);
      }
    });
  },
  
})