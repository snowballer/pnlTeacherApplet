import Url from '../../utils/api';
import {fetchTop,fetchHeight,fetchColor} from '../../utils/calendar';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_info:{},
    header:[],
    body:[],
    apply_btn:"",
    start_time:0,
    end_time:23,
    default_start_time:8,
    daily_time:[],
    course_detail:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    let initDailyTime = [];
    for (var i = 0; i < 24; i++) {
      initDailyTime.push(i);
    }
    const daily_time = initDailyTime.slice(this.data.start_time,this.data.end_time+1);
    console.log(daily_time);
    wx.request({
      url: Url.mockUrl+'/my-class/week-class-arrangement',
      success:function(res){
        console.log(res.data.data);
        const {teacher_info,header,body,apply_btn} = res.data.data;
        let course_detail=[];
        body.map((course,col)=>{
          if(course.classes.length !== 0){
            course.classes.forEach(item=>{
              const col_width = 100;
              const top = fetchTop(item.start_hour,item.start_min,0);
              const height = fetchHeight(item.start_min,item.class_length);
              const color = fetchColor(item.class_type);
              const left = col===0?0:`${col_width*col}rpx` ; 
              const course_info = {...item,left,top,height,color};
              course_detail.push(course_info);
            })
          }
        })
        console.log(course_detail);
        _this.setData({
          teacher_info,
          header,
          body,
          apply_btn,
          daily_time,
          course_detail
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})