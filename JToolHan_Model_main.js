// 获取页面元素
function _Han(event) {
  let element;
  if (document.querySelectorAll(event).length > 1) {
    element = document.querySelectorAll(event);
  } else {
    element = document.querySelectorAll(event)[0];
  }
  if (!document.querySelectorAll(event)[0]) {
    element = null;
  }
  return element;
}
// 拖动事件
// ele点击的那个
// dbele拖动的那个
// 整屏幕拖动加入position: fixed;
function _Handrag(ele, dbele) {
  ele.onmousedown = function (evt) {
    //获取事件对象，兼容写法
    var oEvent = evt || event;
    var disX = oEvent.clientX - dbele.offsetLeft;
    var disY = oEvent.clientY - dbele.offsetTop;
    //实时改变位置
    document.onmousemove = function (evt) {
      var evtUp = evt || event;
      leftX = evtUp.clientX - disX;
      topY = evtUp.clientY - disY;
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
      dbele.style.left = leftX + "px";
      dbele.style.top = topY + "px";
    };
    //停止拖动
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}
// 鼠标跟随事件
/*
    oTop 鼠标跟随样式的ele
    oX 鼠标样式的左侧距离 默认值是15
    oY 鼠标样式的右侧距离 默认值是15
    拖动加入position: fixed;
*/
function _HanMouseFollow(oTop, oX, oY) {
  // 默认值是 15
  if (oX === undefined) {
    oX = 15;
  }
  if (oY === undefined) {
    oY = 15;
  }
  document.onmousemove = function (evt) {
    var oEvent = evt || window.event;
    var scrollleft =
      document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrolltop =
      document.documentElement.scrollTop || document.body.scrollTop;
    oTop.style.left = oEvent.clientX + scrollleft + oX + "px";
    oTop.style.top = oEvent.clientY + scrolltop + oY + "px";
  };
}
/*
获取当前浏览器名称
*/
function _HanGetBrowserInfo() {
  var ua = navigator.userAgent.toLocaleLowerCase();
  var browserType = null;
  if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
    browserType = "IE";
    browserVersion =
      ua.match(/msie ([\d.]+)/) != null ?
      ua.match(/msie ([\d.]+)/)[1] :
      ua.match(/rv:([\d.]+)/)[1];
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
  } else if (
    ua.match(/tencenttraveler/) != null ||
    ua.match(/qqbrowse/) != null
  ) {
    if (ua.match(/qbcore/) !== null) {
      browserType = "微信";
    } else {
      browserType = "QQ";
    }
  } else if (ua.match(/maxthon/) != null) {
    browserType = "遨游";
  } else if (ua.match(/lbbrowser/) !== null) {
    browserType = "猎豹";
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
      browserType = "360";
    } else if (true360 == 2) {
      browserType = "谷歌";
    } else {
      browserType = "Edge";
    }
  } else if (ua.match(/safari/) != null) {
    browserType = "Safari";
  }
  return browserType + "浏览器";
}
//  检测 浏览器是否加载flash
function _HanHasUsableFlash() {
  var flashObj;
  if (typeof window.ActiveXObject != "undefined") {
    flashObj = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
  } else {
    flashObj = navigator.plugins["Shockwave Flash"];
  }
  return flashObj ? true : false;
}
// 检测浏览器是否是webkit内核
function _HanDetectWebkit() {
  return (function (w) {
    "use strict";
    var n = w.navigator,
      d = w.document;
    var r = [];
    r.isIE = "number" == typeof d.documentMode ? d.documentMode : false; //Trident
    r.isWebkit =
      "undefined" != typeof n.productSub && "20030107" == n.productSub;
    r.isChrome =
      "object" == typeof w.chrome ||
      (r.isWebkit && "string" == typeof n.vendor && /Google/.test(n.vendor));
    r.isBlink = (r.isChrome || r.isOpera) && !!w.CSS;
    w.browsecore = r;
    return r.isWebkit;
  })("undefined" != typeof window ? window : this);
}
// 提取字符串中的数字
function _HanGetStringInNumber(string) {
  return string.replace(/[^0-9]/gi, "");
}
// 提取中文字符
function _HanGetInString(string) {
  return /^\D+(?=\d)/.exec(string);
}
// 手机号正则
function _HanJudgePhoneNum(phone) {
  let r = /^1[3456789]\d{9}$/;
  return r.test(phone);
}
// 两个时间相减
//  开始时间 startDate  结束时间 endDate
//  yy-MM-dd 格式
//  获取使用时间
function _HanTimeCalculation(startDate, endDate) {
  if (endDate == null) {
    endDate = "1988-01-01";
  }
  var startDateRep = startDate.replace(/\-/g, "/");
  var endDateRep = endDate.replace(/\-/g, "/");
  var date1 = startDateRep; //开始时间;;
  var date2 = endDateRep; //结束时间
  var date3 = new Date(date2).getTime() - new Date(date1).getTime(); //时间差的毫秒数
  //计算出相差天数
  var days = Math.floor(date3 / (24 * 3600 * 1000));
  //计算出小时数
  var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000));
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  // console.log(leave2 / (60 * 1000)) round
  var minutes = Math.ceil(leave2 / (60 * 1000));
  var timesString = "";
  var timesStringCard = "";
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
    timesString = "--";
  }
  return {
    timesStringCard: timesStringCard,
    timesString: timesString,
  };
}
// 获取当前时间到X天之前的时间(这里是近30天)
// 返回当前时间 与 传入相差时间
function _HanGetRaday(currentDate) {
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
  var weekMonth =
    Date2.getMonth() + 1 > 10 ?
    Date2.getMonth() + 1 :
    "0" + (Date2.getMonth() + 1);
  var weekDate = Date2.getDate() > 10 ? Date2.getDate() : "0" + Date2.getDate();
  if (weekDate.length >= 3) {
    weekDate = Date2.getDate() > 10 ? Date2.getDate() : Date2.getDate();
  } else {
    weekDate = Date2.getDate() > 10 ? Date2.getDate() : "0" + Date2.getDate();
  }
  var oldData = weekYear + "-" + weekMonth + "-" + weekDate;
  return {
    startTime: nowData,
    endTime: oldData,
  };
}

// 获取声音分贝
function _HanDecibel() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();
    // 获取用户的 media 信息
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
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
          console.log(Math.round(maxVal * 1000) * 4);
          // box.style.height = Math.round(maxVal * 1000) * 4 + "px";
        };
      })
      .catch((error) => {
        console.log("获取音频时好像出了点问题" + error);
      });
  } else {
    console.log("不支持获取媒体接口");
  }
}
// 元素穿透各种JS事件不遮挡
function _HanCssPenetrate(ele) {
  if (ele) {
    ele.style.pointerEvents = "none";
  } else {
    return console.error("参数不能为空!!");
  }
}

// 原生ajax 请求 封装工具类
function _HanAjax() {
  var ajaxData = {
    type: arguments[0].type || "GET",
    url: arguments[0].url || "",
    async: arguments[0].async == undefined ? "true" : `${arguments[0].async}`,
    data: arguments[0].data || null,
    dataType: arguments[0].dataType || "text",
    contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
    beforeSend: arguments[0].beforeSend || function () {},
    success: arguments[0].success || function () {},
    error: arguments[0].error || function () {},
  };
  ajaxData.url = window.globalConfig.baseURL + ajaxData.url; // 拼接当前请求头
  ajaxData.beforeSend();
  var xhr = _createxmlHttpRequest();
  xhr.responseType = ajaxData.dataType;
  xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
  xhr.setRequestHeader("Content-Type", ajaxData.contentType);
  // 判断get请求
  if (ajaxData.type.toLowerCase() == "get") {
    ajaxData.url += "?" + _params(ajaxData.data);
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.send(null);
  }
  // 判断post请求
  if (ajaxData.type.toLowerCase() == "post") {
    xhr.send(_convertData(ajaxData.data));
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        ajaxData.success(xhr.response);
      } else {
        ajaxData.error();
      }
    }
  };
}
//将对象序列化，将对象拼接成url字符串
function _params(data, type) {
  if (data == null) return data;
  if (data.data == undefined) {
    var arr = [];
    for (var i in data) {
      arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
    }
    return arr.join("&");
  } else {
    if (type.toLowerCase() == "post") {
      return JSON.stringify(data);
    } else {
      var arr = [];
      for (var i in data) {
        arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
      }
      return arr.join("&");
    }
  }
}

function _createxmlHttpRequest() {
  if (window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  }
}

function _convertData(data) {
  if (typeof data === "object") {
    var convertResult = "";
    for (var c in data) {
      convertResult += c + "=" + data[c] + "&";
    }
    convertResult = convertResult.substring(0, convertResult.length - 1);
    return convertResult;
  } else {
    return data;
  }
}

/*
轻提示
*/
function _HanSoftlyTips(dataObj) {
  if (typeof dataObj != "object") {
    console.error(
      "Error: The argument cannot be null or must be of type Object. 行不行啊铁子!"
    );
    return;
  }
  if (!dataObj.content) {
    console.error("Error: content of Null. 行不行啊铁子!");
    return;
  }
  let softlyTipsDom = document.querySelector(".softlyTipsDom");
  softlyTipsDom.innerHTML = "";
  let tipsDom = `<div class="softly_tips" style="position: fixed;left: 0;top: 0;
  display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;
  opacity: 0;transition: 0.5s all;pointer-events: none;background-color: #0000;z-index: 9999;">
  <div class="tips" style="width: auto;height: auto;max-width:180px;min-height: 35px;padding: 5px 15px;
  text-align: center;line-height: 25px;color: #fff;font-size: 14px;font-weight: 500;border-radius: 5px;
  background-color: #0009;">${dataObj.content}</div></div>`;
  softlyTipsDom.innerHTML += tipsDom;
  // 加载
  setTimeout(() => {
    if (document.querySelector(".softly_tips")) {
      document.querySelector(".softly_tips").style.opacity = 1;
    }
  }, 200);
  // 超时删除
  setTimeout(() => {
    if (document.querySelector(".softly_tips")) {
      document.querySelector(".softly_tips").style.opacity = 0;
      setTimeout(() => {
        if (document.querySelector(".softly_tips")) {
          document.querySelector(".softly_tips").remove();
        }
      }, 500);
    }
  }, (dataObj.time ? dataObj.time : 2000) + 500);
}

/*
  dialog弹窗

*/
let _HanDialog = (function () {
  // 节点类型
  let elem, dialogBodyBox, cancelBtn, confirmBtn;
  // 动画函数数组
  let animaArr = new Array(
    ["fadeIn", "fadeOut"],
    ["slideDown", "slideUp"],
    ["scaleIn", "scaleOut"]
  );
  // 当前动画类型
  let currAnimation = "";
  let getNeedElement = function () {
    // 一家人最重要是整整齐齐
    elem = document.querySelector(".dialog-wrapper");
    dialog = document.querySelector(".dialog");
    cancelBtn = document.querySelector(".cancel-btn");
    confirmBtn = document.querySelector(".confirm-btn");
  };
  // 打开弹窗
  let dialogVisible = function (options = {}) {
    // 默认参数
    let {
      title = "标题",
        content = "请填写内容!",
        skin = "",
        btns = ["确定"],
        confirm = null,
        cancel = null,
        shadeClose = true,
        animation = 2,
    } = options;
    // 皮肤类名
    let skinClass = skin ? ` ${skin}` : "";
    // 给当前动画类型赋值
    currAnimation = animation;
    // 生成按钮
    let btnTemp = "";
    btns.forEach((item, index) => {
      if (index == 2) return;
      let btnClass = index == 0 ? "confirm-btn" : "cancel-btn";
      let temp = `<div class="btn ${btnClass}">${item}</div>`;
      btnTemp += temp;
    });
    // 最终生成的HTML
    let dialogHtml = `
        <div class="dialog-wrapper fadeIn">
          <div class="dialog${skinClass} ${animaArr[currAnimation][0]}">
            <div class="title">${title}</div>
            <div class="content">${content}</div>
            <div class="buttons">${btnTemp}</div>
          </div>
        </div>
      `;
    // 添加到页面
    dialogBodyBox = document.querySelector(".dialog_bodyStore");
    dialogBodyBox.innerHTML += dialogHtml;
    // 获取所需要的节点
    getNeedElement();
    // 绑定事件
    bindEvent(confirm, cancel, shadeClose);
    return elem;
  };
  // 隐藏弹窗
  let hide = function () {
    elem.remove();
  };
  // 绑定事件
  let bindEvent = function (confirm, cancel, shadeClose) {
    // confirm按钮的回调
    confirmBtn &&
      confirmBtn.addEventListener(
        "click",
        (e) => {
          confirm && confirm();
          hide();
        },
        false
      );
    // cancel按钮的回调
    cancelBtn &&
      cancelBtn.addEventListener(
        "click",
        (e) => {
          cancel && cancel();
          hide();
        },
        false
      );
    // 是否开启点击遮罩关闭
    if (shadeClose) {
      elem.addEventListener("click", (e) => {
        let target = e.target || e.srcElement;
        // 检测class类名
        if (/dialog-wrapper/.test(target.className)) {
          hide();
        }
      });
    }
  };
  return {
    dialogVisible,
    hide,
  };
})();