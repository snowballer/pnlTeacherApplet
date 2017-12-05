import Url from '../../utils/api';
import {fetchDate,fetchPickerDate} from '../../utils/calendar';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekTime:['周一','周二','周三','周四','周五','周六','周日'],
    min_exetime:'',
    max_exetime:'',
    last_apply_exetime:'',
    money:'',
    fixtime_code:'',
    time_grid:[],
    startTime:8,
    endTime:22,
    dailyTime:[],
    time_change:[],
    popTip:false,
    change_items:[],
    popPicker:false,
    showTopPicker:false,
    date: {},
    years: [],
    year: 2018,
    months: [],
    month: 0,
    days: [],
    day: 0,
    value: [],
    selectedDate: "",
    popCourse:false,
    showTopContent:false,
    student_class_list:[],
    last_apply_exetime:'',
    money:0,
    successVisible:false
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
    let timeArr = [];
    for (var i=0;i<336;i++){
      timeArr[i] = false;
    }
    this.setData({
      time_change:timeArr
    })
    const dailyTime = initDailyTime.slice(_this.data.startTime,_this.data.endTime+1);
    wx.request({
      url: Url.mockUrl+'/my-class/fixtime-table',
      success:function(res){
        console.log(res.data.data);
        const {min_exetime,max_exetime,last_apply_exetime,money,fixtime_code,time_grid} = res.data.data;
        const date = fetchDate(min_exetime,max_exetime);
        const years = date.years;
        const startYear = parseInt(min_exetime.split('.')[0]);
        const startMonth = parseInt(min_exetime.split('.')[1]);
        const startDay = parseInt(min_exetime.split('.')[2]);
        const PickerDate = fetchPickerDate(startYear,startMonth,startDay,date);
        
        _this.setData({
          min_exetime,
          max_exetime,
          last_apply_exetime,
          money,
          fixtime_code,
          time_grid,
          dailyTime,
          year:startYear,
          month:startMonth,
          day:startDay,
          years,
          date,
          months:PickerDate.months,
          days:PickerDate.days,
          value:[0,0,0],
          selectedDate:min_exetime
        })
      }
    }) 
  },

  changeDate(e) {
    const val = e.detail.value;
    const currentYear = this.data.years[val[0]];
    const months = this.data.date.months.filter(item=>{
      return item.year===currentYear;
    }).map(item=>{
      return item.month;
    });
    let currentMonth = 1;
    if(months.length-1 >= val[1]){
      currentMonth = months[val[1]];
    } 
    const days = this.data.date.months.filter(item=>{
      return item.year===currentYear&&item.month===currentMonth;
    })[0].days;
    const currentDay = days[val[2]];

    this.setData({
      months,
      days,
      year: currentYear,
      month: currentMonth,
      day: currentDay
    })
  },

  openPicker(){
    this.setData({
      popPicker:true
    })
    setTimeout(()=>{
      this.setData({
        showTopPicker:true
      })
    },100)
  },

  changeCourse(e){
    const {col,row,time}=e.currentTarget.dataset;
    let timeArr = this.data.time_change;
    const itemNum = 48*col +row;
    //弹出层判断
    if(!time[0] && !time[1]){
      this.setData({
        popTip:true
      });
      setTimeout(()=>{
        this.setData({
          popTip:false
        })
      },2000)
    }
    //可点击时段
    if(time[2]){
      timeArr[itemNum]=!timeArr[itemNum];
      this.setData({
        time_change:timeArr
      });
      let postChangeItems = [];
      for (var i=0;i<336;i++){
        if(this.data.time_change[i]){
          postChangeItems.push(i);
        }
      }
      this.setData({
        change_items:postChangeItems
      })
    }
  },

  confirmDatePicker(){
    const date = this.data.date;
    const startYear = this.data.year;
    const startMonth = this.data.month;
    const startDay = this.data.day;
    const PickerDate = fetchPickerDate(startYear,startMonth,startDay,date);
    const selectedDate = this.data.year+'.'+ this.data.month+'.'+ this.data.day;

    this.setData({
      selectedDate,
      months:PickerDate.months,
      days:PickerDate.days,
      showTopPicker:false,
      value:[PickerDate.yearIndex,PickerDate.monthIndex,PickerDate.dayIndex]
    })
    setTimeout(()=>{
      this.setData({
        popPicker:false
      })
    },400)
  },

  cancelDatePicker(){
    const date = this.data.date;
    const startYear = parseInt(this.data.selectedDate.split('.')[0]);
    const startMonth = parseInt(this.data.selectedDate.split('.')[1]);
    const startDay = parseInt(this.data.selectedDate.split('.')[2]);
    const PickerDate = fetchPickerDate(startYear,startMonth,startDay,date);

    this.setData({
      months:PickerDate.months,
      days:PickerDate.days,
      showTopPicker:false,
      value:[PickerDate.yearIndex,PickerDate.monthIndex,PickerDate.dayIndex]
    })
    setTimeout(()=>{
      this.setData({
        popPicker:false
      })
    },400)
  },

  postChangeItems(){
    if(this.data.change_items.length === 0){
      return;
    }
    const _this = this;
    console.log(this.data.change_items,233);
    wx.request({
      url: Url.mockUrl+'/my-class/get-conflict-class',
      success:function(res){
        const {student_class_list,last_apply_exetime,money}= res.data.data;
        console.log(res.data.data);
        _this.setData({
          popCourse:true,
          student_class_list,
          last_apply_exetime,
          money
        })
        setTimeout(()=>{
          _this.setData({
            showTopContent:true
          })
        },50)
      }
    })
  },

  cancelApplication(){
    this.setData({
      showTopContent:false
    })
    setTimeout(()=>{
      this.setData({
        popCourse:false
      })
    },400)
  },

  confirmApplication(){
    this.setData({
      successVisible:true
    });
    setTimeout(()=>{
      this.setData({
        successVisible:false
      })
      wx.request({
        url: Url.mockUrl+'/my-class/confirm-apply',
        success:function(res){
          console.log(res.data.data);
          const {time_apply}=res.data.data;
          wx.setStorageSync('time_apply', time_apply);
          wx.redirectTo({
            url: '../subSuccess/subSuccess'
          });
          // wx.redirectTo({
          //   url: '../subFail/subFail'
          // });
        }
      });
    },2000)
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