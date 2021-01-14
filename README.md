【起步】
首先使用 script 标签本地引入当前 js 脚本

```js
<script src="./JZS-Model_PC _main.js"></script>
```

【DOM 元素选择器】

使用$JZS()获取网页元素，类似于JQ的$()

```js
$JZS(".event");
//返回当前选择的DOM元素
```

【元素拖拽】
【JZS_drag】方法：

支持两个参数：

第一个参数 ele 是你点击的那个元素
第二个参数 dbele 是你拖动的那个元素

例子：

```js
JZS_drag($JZS(".ele"), $JZS(".dbele"));

// 点击 ele 元素，移动拖拽 abele 元素
```

注意： 需要给拖动的元素加入 position: fixed;

【鼠标跟随】

【JZS_mouseFollow】方法

三个参数

oTop

鼠标跟随样式当前元素

position: fixed

oX

鼠标样式的左侧距离 默认值是 15

非必传
oY

鼠标样式的右侧距离 默认值是 15

非必传
例子：

```js
JZS_mouseFollow($JZS(".css"));
```

注意： 需要给要跟随元素加入 position: fixed;

【获取当前浏览器名称】
【JZS_getBrowserInfo】方法：返回当前浏览器名称

例子：

```js
console.log(JZS_getBrowserInfo());
// 返回值： 谷歌浏览器
```

目前仅支持检测以下浏览器：

火狐，IE，UC，欧朋，百度，搜狗，微信，QQ，遨游，猎豹，360，谷歌，Edge，Safari

注： 如有其他需要，联系相关维护技术人员进行添加

【检测 Flsh 是否加载】
【JZS_hasUsableFlas】方法：返回一个布尔值

例子：

```js
console.log(JZS_hasUsableFlas());
// 返回 true 则代表浏览器开启Flsh
// 返回 false 则代表浏览器未开启Flsh
```

【检测浏览器是否为 Webkit 内核】
【JZS_detectWebkit】方法：返回一个布尔值

例子：

```js
console.log(JZS_detectWebkit());
// 返回 true 则代表浏览器为Webkit内核
// 返回 false 则代表浏览器不是Webkit内核
```

【Ajax 调用接口】
【$JZS_Ajax】方法：用于调用后台接口与后台进行通信

注意： 此方法为 Ajax 的二次封装，如果使用该方法遇到问题，请及时联系维护人员

例子：

```js
// 调用实例
$JZS_Ajax({
  type: "POST",
  url: "https:",
  dataType: "json",
  data: { val1: "abc", val2: 123, val3: "456" },
  beforeSend: function () {
    //some js code
  },
  success: function (msg) {
    console.log(msg);
  },
  error: function () {
    console.log("error");
  },
});
```

【JS 事件穿透 CSS 样式】
【JZS_cssPenetrate】方法：

情景模拟： 现在有一层透明蒙层，我们的需求是需要点击蒙层下方的按钮，这时就可以用到这个方法来穿透蒙层达到点击按钮的需求。

例子：

```js

JZS_cssPenetrate($JZS(ele))
//此时 当前 ele 元素已经不会受到遮挡，但依然保留当前样式
【获取声音分贝】
【JZS_decibel】方法：该方法返回录入声音的分贝值
```

使用情景：发送语音时声音音浪效果

注意：在谷歌等浏览器上需要先执行事件，走这个方法，因谷歌浏览器机制原因（防止突然发出声音，用户收到惊吓）。

例子：

```js
//火狐浏览器执行下面方法，控制台会实时打印当前声音分贝。可直接调用
JZS_decibel();

//谷歌浏览器需要先执行一个事件，如：click
<div onclick="JZS_decibel()"></div>;
```

【获取时间差】
【JZS_TimeCalculation】方法：

传参：

参数 类型 是否必传
开始时间

（2020-12-09）

String Yes
结束时间

（2022-08-12）

String Yes

返回值：

名称 类型 结果
timesString String 33 天 0 小时
timesStringCard String 33.0 天

注意：仅支持 yy-MM-dd 格式，支持传入时分秒。

例子：

```js

JZS_TimeCalculation("2020-08-09", "2020-09-11")
// 返回两个值 一个为带单位，一个为浮点数表示
【获取当前时间距离目标时间的值】
【JZS_getRaday】方法：
```

返回值：

名称 类型 描述
startTime String
当前时间

endTime String
传入相差时间

例子：

```js

JZS_getRaday(30)
//当前传入值为 30，所以是近 30 天，打印结果为 endTime: "2020-08-16" startTime: "2020-09-14"
【获取字符串中的数字】
【JZS_getStringInNumber】方法：返回当前字符串中所有数字，自动拼接。
```

例子：

```js

JZS_getStringInNumber("这是一段 78797 测试 hkk 文字 14544 请看 897 打印结果 435")
// 输出结果为 7879714544897435
【验证手机号格式是否正确】
【JZS_judgePhoneNum】方法：一个布尔值，true 则是通过验证，false 则是手机号格式不正确。
```

例子：

```js
JZS_judgePhoneNum(13592387753);
// 输出结果为 true
JZS_judgePhoneNum(12345612542);
// 输出结果为 false
```

【获取 String 内的文字】
【JZS_getInString】方法：

比如我需要获取：“王小明 16 岁了”中的“王小明”，即可用到该方法；

注意：该方法只会取到第一个数字之前的

例子：

```js
JZS_getInString("按 hhhhh 时枯鲁杜鹃 14544 哎算了看的见 897435");
// 输出结果为一个对象
```

调用轻提示

```js
_softlyTips({
  content: "请输入内容",
  time: 1000,
});
```

调用 dialog 弹窗

```js
_dialog.show({
  title: "测试",
  content: "男人不能说不行,铁子!",
  btns: ["我能行", "我不行"],
  shadeClose: false,
  animation: 2,
  confirm: () => {
    console.log("确认回调");
  },
  cancel: () => {
    console.log("取消回调");
  },
});
```
