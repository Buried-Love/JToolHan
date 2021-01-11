// 获取页面元素
function $JZS(event) {
  let element;
  if (document.querySelectorAll(event).length > 1) {
    element = document.querySelectorAll(event);
  } else {
    element = document.querySelectorAll(event)[0];
  }
  if (!document.querySelectorAll(event)[0]) {
    element = null
  }
  return element
}
// 拖动事件
// ele点击的那个
// dbele拖动的那个
// 整屏幕拖动加入position: fixed;
function JZS_drag(ele, dbele) {
  ele.onmousedown = function (evt) {
    //获取事件对象，兼容写法
    var oEvent = evt || event;
    var disX = oEvent.clientX - (dbele.offsetLeft);
    var disY = oEvent.clientY - (dbele.offsetTop);
    //实时改变位置
    document.onmousemove = function (evt) {
      var evtUp = evt || event;
      leftX = evtUp.clientX - disX
      topY = evtUp.clientY - disY
      // 右边判断是否超出
      if (leftX > document.documentElement.clientWidth - dbele.offsetWidth) {
        leftX = document.documentElement.clientWidth - dbele.offsetWidth;
      }
      // 左边判断是否超出
      if (leftX < 0) {
        leftX = 0;
      }
      if (topY > document.documentElement.clientHeight - dbele.offsetHeight) {
        topY = document.documentElement.clientHeight - dbele.offsetHeight;
      }
      if (topY < 0) {
        topY = 0;
      }
      dbele.style.left = leftX + 'px';
      dbele.style.top = topY + 'px';
    }
    //停止拖动
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
}
// 鼠标跟随事件
/*
    oTop 鼠标跟随样式的ele
    oX 鼠标样式的左侧距离 默认值是15
    oY 鼠标样式的右侧距离 默认值是15
    拖动加入position: fixed;
*/
function JZS_mouseFollow(oTop, oX, oY) {
  // 默认值是 15
  if (oX === undefined) {
    oX = 15
  }
  if (oY === undefined) {
    oY = 15
  }
  document.onmousemove = function (evt) {
    var oEvent = evt || window.event;
    var scrollleft = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
    oTop.style.left = oEvent.clientX + scrollleft + oX + "px";
    oTop.style.top = oEvent.clientY + scrolltop + oY + "px";
  }
}
/*
获取当前浏览器名称
*/
function JZS_getBrowserInfo() {
  var ua = navigator.userAgent.toLocaleLowerCase();
  var browserType = null;
  if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
    browserType = "IE";
    browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
  } else if (ua.match(/firefox/) != null) {
    browserType = "火狐";
  } else if (ua.match(/ubrowser/) != null) {
    browserType = "UC";
  } else if (ua.match(/opera/) != null) {
    browserType = "欧朋";
  } else if (ua.match(/bidubrowser/) != null) {
    browserType = "百度";
  } else if (ua.match(/metasr/) != null) {
    browserType = "搜狗";
  } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
    if (ua.match(/qbcore/) !== null) {
      browserType = "微信";
    } else {
      browserType = "QQ";
    }
  } else if (ua.match(/maxthon/) != null) {
    browserType = "遨游";
  } else if (ua.match(/lbbrowser/) !== null) {
    browserType = '猎豹';
  } else if (ua.match(/chrome/) != null) {
    var true360 = 360;
    var mimeTypes = navigator.mimeTypes;
    if (mimeTypes.length > 20) {
      true360 = 360;
    } else {
      if (ua.match(/edg/) != null) {
        true360 = 1;
      } else {
        true360 = 2;
      }
    }
    if (true360 == 360) {
      browserType = '360';
    } else if (true360 == 2) {
      browserType = '谷歌';
    } else {
      browserType = 'Edge';
    }
  } else if (ua.match(/safari/) != null) {
    browserType = "Safari";
  }
  return browserType + "浏览器"
}
//  检测 浏览器是否加载flash
function JZS_hasUsableFlash() {
  var flashObj;
  if (typeof window.ActiveXObject != "undefined") {
    flashObj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
  } else {
    flashObj = navigator.plugins['Shockwave Flash'];
  }
  return flashObj ? true : false;
}
// 检测浏览器是否是webkit内核
function JZS_detectWebkit() {
  return (function (w) {
    "use strict";
    var n = w.navigator,
      d = w.document;
    var r = [];
    r.isIE = ("number" == typeof d.documentMode) ? d.documentMode :
      false; //Trident    
    r.isWebkit = ("undefined" != typeof n.productSub && "20030107" == n.productSub);
    r.isChrome = ("object" == typeof w.chrome || (r.isWebkit && "string" == typeof n.vendor && /Google/
      .test(n.vendor)));
    r.isBlink = (r.isChrome || r.isOpera) && !!w.CSS;
    w.browsecore = r;
    return r.isWebkit
  })("undefined" != typeof window ? window : this);
}
// 提取字符串中的数字
function JZS_getStringInNumber(string) {
  return string.replace(/[^0-9]/ig, "");
}
// 提取中文字符
function JZS_getInString(string) {
  return /^\D+(?=\d)/.exec(string);
}
// 手机号正则
function JZS_judgePhoneNum(phone) {
  let r = /^1[3456789]\d{9}$/;
  return r.test(phone)
}
// 两个时间相减
//  开始时间 startDate  结束时间 endDate
//  yy-MM-dd 格式
//  获取使用时间
function JZS_TimeCalculation(startDate, endDate) {
  if (endDate == null) {
    endDate = "1988-01-01";
  };
  var startDateRep = startDate.replace(/\-/g, '/');
  var endDateRep = endDate.replace(/\-/g, '/');
  var date1 = startDateRep; //开始时间;;
  var date2 = endDateRep; //结束时间
  var date3 = new Date(date2).getTime() - new Date(date1).getTime(); //时间差的毫秒数    
  //计算出相差天数
  var days = Math.floor(date3 / (24 * 3600 * 1000))
  //计算出小时数
  var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  // console.log(leave2 / (60 * 1000)) round
  var minutes = Math.ceil(leave2 / (60 * 1000));
  var timesString = '';
  var timesStringCard = '';
  // 判断卡片时间
  if (days >= 1) {
    var daysNum = (days * 24 + hours) / 24;
    timesStringCard = daysNum.toFixed(1) + "天";
    timesString = days + "天 " + hours + "小时";
  } else if (hours == 0) {
    timesStringCard = minutes + "分钟";
    timesString = minutes + "分钟";
  } else {
    var hoursNum = (hours * 60 + minutes) / 60;
    timesStringCard = hoursNum.toFixed(1) + "小时";
    timesString = hours + "小时" + minutes + "分钟";
  }
  if (timesString.slice(0, 1) == "-") {
    timesString = "--"
  }
  return {
    timesStringCard: timesStringCard,
    timesString: timesString
  }
}
// 获取当前时间到X天之前的时间(这里是近30天)
// 返回当前时间 与 传入相差时间
function JZS_getRaday(currentDate) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  var nowData = year + "-" + month + "-" + day;
  var Date2 = new Date();
  Date2.setDate(Date2.getDate() - (currentDate - 1));
  var weekYear = Date2.getFullYear();
  var weekMonth = Date2.getMonth() + 1 > 10 ? Date2.getMonth() + 1 : '0' + (Date2.getMonth() + 1);
  var weekDate = Date2.getDate() > 10 ? Date2.getDate() : '0' + Date2.getDate();
  if (weekDate.length >= 3) {
    weekDate = Date2.getDate() > 10 ? Date2.getDate() : Date2.getDate();
  } else {
    weekDate = Date2.getDate() > 10 ? Date2.getDate() : '0' + Date2.getDate();
  }
  var oldData = weekYear + "-" + weekMonth + "-" + weekDate;
  return {
    startTime: nowData,
    endTime: oldData
  }
}

// 获取声音分贝
function JZS_decibel() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();
    // 获取用户的 media 信息
    navigator.mediaDevices.getUserMedia({
      audio: true
    }).then((stream) => {
      // 将麦克风的声音输入这个对象 
      mediaStreamSource = audioContext.createMediaStreamSource(stream);
      // 创建一个音频分析对象，采样的缓冲区大小为4096，输入和输出都是单声道
      var scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
      // 将该分析对象与麦克风音频进行连接
      mediaStreamSource.connect(scriptProcessor);
      // 此举无甚效果，仅仅是因为解决 Chrome 自身的 bug
      scriptProcessor.connect(audioContext.destination);
      // 开始处理音频
      scriptProcessor.onaudioprocess = function (e) {
        // 获得缓冲区的输入音频，转换为包含了PCM通道数据的32位浮点数组
        let buffer = e.inputBuffer.getChannelData(0);
        // 获取缓冲区中最大的音量值
        let maxVal = Math.max.apply(Math, buffer);
        // 显示音量值
        console.log(Math.round(maxVal * 1000) * 4)
        // box.style.height = Math.round(maxVal * 1000) * 4 + "px";
      };
    }).catch((error) => {
      console.log('获取音频时好像出了点问题' + error)
    });
  } else {
    console.log('不支持获取媒体接口');
  }
}
// 元素穿透各种JS事件不遮挡
function JZS_cssPenetrate(ele) {
  if (ele) {
    ele.style.pointerEvents = "none";
  } else {
    return console.log("JZS_cssPenetrate:=====> 参数不能为空!!")
  }
}

// 二次封装Ajax
function $JZS_Ajax(data) {
  data.type = data.type || "get";
  data.async = data.async || true;
  data.data = data.data || null;
  var params = _params(data.data);
  //在路径后面添加时间戳加随机数防止浏览器缓存。
  data.url += (data.url.indexOf("?") > -1 ? "&" : "?") + "t=" + ((new Date()).getTime() + Math.random());
  if (data.type.toLowerCase() == "get" && params.length > 0) {
    data.url += "&" + params;
  }
  var xhr = new XMLHttpRequest();
  xhr.open(data.type, data.url, data.async);
  if (data.type.toLowerCase() == "post") {
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params)
  } else
    xhr.send(null);
  if (data.async) {
    xhr.onreadystatechange = function () {
      //响应状态为4，数据加载完毕。
      if (xhr.readyState == 4)
        callback();
    }
  } else
    //同步
    callback();

  function callback() {
    if (xhr.status == 200) {
      // data.success(xhr.responseText);
      data.success(JSON.parse(xhr.responseText));
    } else {
      data.error(JSON.parse(xhr.status));
    }
  }
  //将对象序列化，将对象拼接成url字符串
  function _params(data) {
    if (data == null)
      return data;
    var arr = [];
    for (var i in data) {
      arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
    }
    return arr.join("&");
  }
}