//薪资页面对比日期年月大小函数
//1代表大于，2代表等于，3代表小于
export function compareDate(firstDate,secondDate) {
  const firstYear = firstDate.split('.')[0];
  const firstMonth = firstDate.split('.')[1];
  const secondYear = secondDate.split('.')[0];
  const secondMonth = secondDate.split('.')[1];
  if(firstYear === secondYear){
    if (firstMonth > secondMonth) {
      return 1;
    } else if (firstMonth === secondMonth) {
      return 2;
    }else{
      return 3;
    }
  }
  if(firstYear > secondYear){
    return 1;
  }
  if(firstYear < secondYear){
    return 3;
  }
}

//日历
export function createCalendar(year, month, _arr) {
  //打印空格
  var newDate = new Date(year, month, 1);

  var week = newDate.getDay(); //得到星期几

  var howManyDay = new Date(year, month + 1, 0).getDate();
  var lastDays = new Date(year, month, 0).getDate();
  var dateArr = [];

  var newArr = [];
  //上个月不可点击日期
  for(var i = lastDays - week + 1; i <= lastDays; i++) { //打印空格
    newArr.push({
      type: 1,
      vals: i
    })
  }
  //当前月可点击日期
  for(var i = 1; i <= howManyDay; i++) {
    let _type = 2;
    for (let j in _arr) {
      if(i == _arr[j]) {
        _type = 3;
      }
    }
    newArr.push({
      type: _type,
      vals: i
    });
  }
  //下个月不可点击日期
  var lastKong = 7 - (howManyDay + week) % 7;
  if(lastKong != 0) {
    for(var i = 1; i <= lastKong; i++) {
      newArr.push({
        type: 1,
        vals: i
      })
    }
  }
  return newArr;
}
