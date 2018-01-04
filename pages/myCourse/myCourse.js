import Url from '../../utils/api';
import {fetchTop,fetchHeight,fetchColor,fetchImgSrc} from '../../utils/calendar';

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
    showPopup:false,
    showPopCourse:false,
    pop_info:{}
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

    // console.log(daily_time);
    wx.request({
      url: Url.mockUrl+'/my-class/week-class-arrangement',
      success:function(res){
        console.log(res.data.data);
        const {teacher_info,header,body,apply_btn} = res.data.data;
        
        //初始展示时间
        const init_start_time = body.map(day=>{
          if(!day.open_time.includes(1) && day.classes.length===0){
            return -1;
          }
          if(day.classes.length!==0 && day.open_time.includes(1)){
            if(day.classes[0].start_hour <= Math.floor(day.open_time.indexOf(1)/2)){
              return day.classes[0].start_hour;
            }else{
              return Math.floor(day.open_time.indexOf(1)/2);
            }
          }
          if(!day.open_time.includes(1) && day.classes.length!==0){
            return day.classes[0].start_hour;
          }
          if(day.classes.length===0 && day.open_time.includes(1)){
            return Math.floor(day.open_time.indexOf(1)/2);
          }
        }).filter((item)=>{
          return item !== -1;
        }).sort((a,b)=>{
          return a-b;
        })[0];
  
        if(init_start_time < _this.data.default_start_time){
          _this.setData({
            start_time:init_start_time
          })
        }else{
          _this.setData({
            start_time:_this.data.default_start_time
          })
        }

        const daily_time = initDailyTime.slice(_this.data.start_time,_this.data.end_time+1);

        //课程展示详情
        let course_detail=[];
        body.map((course,col)=>{
          if(course.classes.length !== 0){
            course.classes.forEach(item=>{
              const col_width = 100;
              let top = fetchTop(item.start_hour,item.start_min,_this.data.start_time);
              top = top===0?0:`${top}rpx`;
              const height = fetchHeight(item.start_min,item.class_length);
              const color = fetchColor(item.class_type);
              const imgSrc = fetchImgSrc(item.class_type);
              const left = col===0?0:`${col_width*col}rpx` ; 
              const course_info = {...item,imgSrc,left,top,height,color};
              course_detail.push(course_info);
            })
          }
        });
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
  popCourse(e){
    if(timer){
      clearTimeout(timer);
    }
    this.setData({
      showPopup:true,
      pop_info:e.currentTarget.dataset.course
    })
    var timer = setTimeout(()=>{
      this.setData({
        showPopCourse:true
      })
    },100)
  },
  closeCourse(){
    this.setData({
      showPopCourse:false
    })
    var timer = setTimeout(()=>{
      this.setData({
        showPopup:false
      })
    },400)
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