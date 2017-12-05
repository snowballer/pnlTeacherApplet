// pages/MySalary/MySalary.js
//获取应用实例
var app = getApp();
var common = require("../../utils/date.js");
//easymock数据public地址
var baseUrl=getApp().globalData.base_url;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    CalendarData:[],
    showMySalary:false,
    dataItems:'',
    current_time:'',
    yearIpt:'',
    monthIpt:'',
    allowArr:[],
    handleType:'',
    middleDataLeft:"",
    middleDataMid:'',
    middleDataRig:'',
    // minddle tab切换  
    currentTab: 0,
  },
  onLoad: function (options) {
    var _this=this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    //日期tab处逻辑
    const date = new Date();
    this.current_time = date.getFullYear()+'.'+(date.getMonth()+ 1);
    console.log(this.current_time);
    if(wx.getStorageSync("passData") && wx.getStorageSync("daySalary")){
      const dateStore = JSON.parse(wx.getStorageSync("passData"));
      this.setData({
        yearIpt:dateStore.year,
        monthIpt:dateStore.month,
        handleType:'dateStore'
      })
      wx.removeStorageSync('daySalary');
    }
    else{
      //切换年月份按钮数据
      _this.setData({
        yearIpt:date.getFullYear(),
        monthIpt: date.getMonth()+ 1,
        handleType:'created'
      })
    };
    //easymock数据public地址
    var baseUrl=getApp().globalData.base_url;
    // 薪资主入口
    wx.request({
      url: baseUrl+'/salary-new/total-salary',
      success: function(res) {
        wx.hideLoading();
        _this.setData({
          showMySalary: true,
          dataItems:res.data,
          allowArr:res.data.click_day,
          CalendarData:common.createCalendar(_this.data.yearIpt, _this.data.monthIpt - 1, res.data.click_day)
        });
      }
    });
    wx.request({
      url: baseUrl+'/salary-new/basic-salary',
      success: res=> {
        _this.setData({
          middleDataLeft:res.data.data
        });
      }
    })
  },
  //Tab Area基本薪资请假扣款模块
  SwichSalary:function(e){
    var _this=this;
      if( this.data.currentTab === e.currentTarget.id ) {
        return false;  
      } else {
        _this.setData({  
          currentTab:e.currentTarget.id  
        })
      }
      const currentId=e.currentTarget.id;
      switch(currentId)
      {
      case '0':
        wx.request({
          url: baseUrl+'/salary-new/basic-salary',
          success: res=> {
            _this.setData({
              middleDataLeft:res.data.data
            });
          }
        });
        break;
        case '1':
          wx.request({
            url: baseUrl+'/salary-new/leave-punish',
            success: res=> {
              _this.setData({
                middleDataMid:res.data.data
              });
            }
          });
        case '2':
          wx.request({
            url: baseUrl+'/salary-new/punish',
            success: res=> {
              _this.setData({
                middleDataRig:res.data.data
              });
            }
          })
      }
  },
  BindChange:function(e){
    var _this=this; 
    _this.setData({ currentTab: e.detail.current });
  },
  //可点击日期点击事件
  allowClick:function(e) {
    wx.navigateTo({
      url: '../SalaryList/SalaryList'
    });
  },
  activePage:function(e) {
    wx.navigateTo({
      url: '../Activity/Activity'
    });
  },
  /**生命周期函数--监听页面显示*/
  onShow: function () {
  },

  /**生命周期函数--监听页面隐藏*/
  onHide: function () {

  
  },
  /**生命周期函数--监听页面卸载*/
  onUnload: function () {
    
  },
  /**页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {
  
  },
  /**页面上拉触底事件的处理函数*/
  onReachBottom: function () {
  
  },
  /** 用户点击右上角分享*/
  onShareAppMessage: function () {
  
  }
})