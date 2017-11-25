const cardH = 56;
const gapH = 8;
const lessonlocked = "rgba(253,94,2,0.50)";
const lessonfree = "rgba(29,198,100,0.50)";
const lessontemp = " rgba(15,163,204,0.50)";
const cancelShadow = "inset 0 0 0 2rpx #FD5E02";
const confirmShadow = "inset 0 0 0 2rpx #1DC664";
const cancelIcon = "icon-delete";
const confirmIcon = "icon-add";

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

export function fetchShadowColor(time,isChanged,isModify){
  if (!isModify){
    if (time[1] && isChanged){
      return cancelShadow;
    }
    if (!time[1] && time[0] && isChanged){
      return confirmShadow;
    }
  }
}

export function fetchIcon(time,isChanged,isModify){
  if (!isModify){
    if (time[1] && isChanged){
      return cancelIcon;
    }
    if (!time[1] && time[0] && isChanged){
      return confirmIcon;
    }
  }
}
