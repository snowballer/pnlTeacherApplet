const cardH = 56;
const gapH = 8;
const lessonlocked = "rgba(253,94,2,0.50)";
const lessonfree = "rgba(29,198,100,0.50)";
const lessontemp = " rgba(15,163,204,0.50)";

export  function fetchTop(hour,min,time){
  if(hour < 0 || hour > 23){
    return;
  }
  if(min < 0 || min > 60){
    return;
  }
  const ceilNum = (hour - time) * 2;
  let ceilStartT;
  //获取课程展示位置
  if (min < 30){
    ceilStartT = ceilNum * (cardH + gapH) + min/30 *cardH;
  }else {
    ceilStartT = ceilNum * (cardH + gapH) + gapH + min/30 *cardH;
  }
  return ceilStartT;
}

export function fetchHeight(min,duration){
  if(min < 0 || min > 60){
    return;
  }
  //获取课程展示高度
  let ceilH;
  if (duration === 25){
    if(min<=5){
      ceilH = duration/30 *cardH;
    }else if (min <30) {
      ceilH = duration/30 *cardH + Math.ceil(duration/30)*gapH;
    }else if (min <=35){
      ceilH = duration/30 *cardH;
    }else{
      ceilH = duration/30 *cardH + Math.ceil(duration/30)*gapH;
    }
  }
  if (duration === 50){
    if(min<=10){
      ceilH = duration/30 *cardH + Math.floor(duration/30)*gapH;
    }else if(min <30){
      ceilH = duration/30 *cardH + Math.ceil(duration/30)*gapH;
    }else if (min <=40) {
      ceilH = duration/30 *cardH + Math.floor(duration/30)*gapH;
    }else{
      ceilH = duration/30 *cardH + Math.ceil(duration/30)*gapH;
    }
  }
  return ceilH;
}

export function fetchColor(type){
  if (type===1){
    return lessonlocked;
  }
  if (type===2){
    return lessonfree;
  }
  if (type===3){
    return lessontemp;
  }
}

export function fetchImgSrc(type){
  if (type===1){
    return 'icn_lessonlocked';
  }
  if (type===2){
    return 'icn_lessonfree';
  }
  if (type===3){
    return 'icn_lessontemp';
  }
}

export function fetchDate(min,max){
  let years = [];
  let months = [];
  const minYear = parseInt(min.split('.')[0]);
  const minMonth = parseInt(min.split('.')[1]);
  const minDay = parseInt(min.split('.')[2]);
  const maxYear = parseInt(max.split('.')[0]);
  const maxMonth = parseInt(max.split('.')[1]);
  const maxDay = parseInt(max.split('.')[2]);
  if(minYear === maxYear ){
    let year = minYear;
    years.push(year);
    if(maxMonth > minMonth){
      for (let i = minMonth; i <= maxMonth; i++) {
        let month = i;
        months.push({year,month});
      }  
    }
  }
  if(maxYear > minYear){
    for (let i = minYear; i <= maxYear; i++) {
      years.push(i);
    }
    for (let j = minMonth; j <= 12; j++) {
      let year = minYear;
      let month = j;
      months.push({year,month});
    }
    for (let k = 1; k <= maxMonth; k++) {
      let year = maxYear;
      let month = k;
      months.push({year,month});
    }
  }
  
  months=months.map(item=>{
    let monthDays = new Date(item.year,item.month, 0).getDate();
    let days = [];
    if(item.month===minMonth){
      for(let i = minDay; i <= monthDays; i++){
        days.push(i);
      }
    }
    if(item.month===maxMonth){
      for(let i = 1; i <= maxDay; i++){
        days.push(i);
      }
    }
    if(item.month!==minMonth && item.month!==maxMonth){
      for(let i = 1; i <= monthDays; i++){
        days.push(i);
      }
    }
    return {...item,days};
  })

  return {years,months};
}

export function fetchPickerDate(startYear,startMonth,startDay,date){
  const months = date.months.filter(item=>{
    return item.year===startYear;
  }).map(item=>{
    return item.month;
  });
  const days = date.months.filter(item=>{
    return item.year===startYear&&item.month===startMonth;
  })[0].days;
  const yearIndex = date.years.indexOf(startYear);
  const monthIndex = months.indexOf(startMonth);
  const dayIndex = days.indexOf(startDay);
  return {
    months,
    days,
    yearIndex,
    monthIndex,
    dayIndex
  }
}