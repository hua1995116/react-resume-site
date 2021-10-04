export const themes = [
  {
    id: "default",
    defaultColor: "#39393a",
    name: "默认（秋风同款）",
    src: "https://s3.qiufeng.blue/muji/1616691252491.jpg",
    isColor: true,
    defaultUrl: "https://s3.qiufeng.blue/muji/template/template1.pdf",
  },
  {
    id: "blue",
    defaultColor: "#5974D4",
    name: "极简色",
    src: "https://s3.qiufeng.blue/muji/1616691336866.jpg",
    isColor: true,
    defaultUrl: "https://s3.qiufeng.blue/muji/template/template2.pdf",
  },
  {
    id: "orange",
    defaultColor: "#39393a",
    name: "朝阳黄",
    src: "https://s3.qiufeng.blue/muji/1616691364694.jpg",
    isColor: false,
    defaultUrl: "https://s3.qiufeng.blue/muji/template/template3.pdf",
  },
  // {
  //   id: "pupple",
  //   defaultColor: "#36448f",
  //   name: "全彩风",
  //   src: "https://s3.qiufeng.blue/muji/WechatIMG2705.jpg",
  //   isColor: true,
  //   defaultUrl: 'https://s3.qiufeng.blue/muji/template/template4.pdf',
  // },
];

export const LOCAL_STORE = {
  MD_RESUME: "md-resume",
  MD_COUNT: "md-count",
  MD_THEME: "md-theme",
  MD_COLOR: "md-color",
  MD_THEME_LIST: "md-theme-list",
  MD_UPDATE_LOG: "md-update-log",
  MD_HISTORY: "md-history",
};

export const INIT_COLOR =
  localStorage.getItem(LOCAL_STORE.MD_COLOR) || "#39393a";

document.body.style.setProperty("--bg", INIT_COLOR);

export const UPDATE_LOG_VERSION = 4;

export const INIT_CONTENT = `
# 秋风 - 前端工程师

::: left
对一切前沿知识保持充分的好奇。

男/1995.12

浙江科技学院/信息与计算科学


本科/2018年毕业/党员

:::

::: right
[icon:blog https://qiufeng.blue](https://qiufeng.blue)

[icon:github https://github.com/hua1995116](https://github.com/hua1995116)

[icon:juejin 掘金](https://juejin.cn/user/923245497557111) 

[icon:email qiufenghyf@163.com](mailto:qiufenghyf@163.com)

icon:weixin qiufengblue

:::

## 介绍

于2015年开始接触前端，喜欢编码，有Geek精神，对代码有洁癖，喜欢接触前沿技术，爱折腾。

获得省、国家级竞赛奖项9项，(包含浙江省大学生多媒体竞赛一等奖1项)。
  
主持参与省、国家级项目4项；发表论文4篇，其中2篇EI索引。

## 工作

### 美团（2018.7-至今）

努力打工中...

### 杭州兑吧网络有限公司 - 实习 （2018.3-2018.7）
\`工程化\` \`基建搭建\`

前端架构组

- 前端错误监控系统(基建)(负责人) 接入量pv:3000w
  - web端js-sdk开发,无侵入式接入,压缩后仅2kb。
  - 收集端Node开发,分布式存储日志。
  - 阿里云日志服务分析,以及常用的数据分析。
  - echart搭建可视化平台。
- 前端性能监控系统(负责人) 接入pv: 1000w
  - web端js-sdk开发,支持自定义上报以及自动上报,无侵入式。
  - 收集端Node开发,Elasticsearch集群存储日志。
  - Elasticsearch的Node模块开发，封装按时间维度的查询聚合模块。
  - 可视化平台,利用redis缓存优化查询,淘汰算法共同协作。
- 落地页截图(Node项目)
  - 利用puppeteer开发截图。
  - 利用clustor多线程开发,速度从原来60分钟提高至8分钟，提高约7倍（300张截图）。
  - 开发自定义队列模式,避免Node端丢失请求。
- webpack插件(webpack-plugin-inner-script)地址
  - 自动将外链形式改写成内敛形式。

### 网易 - 实习 (2017.11-2018.3)
信息技术部

\`业务开发\` \`基建搭建\`

- 前端监控系统
  - 客户端监控载体端以及数据脚本开发
  - 基于highcharts的可视化图形界面开发
  - 平台的性能统计模块以及告警模块开发
  - 高并发下的redis设计以及错误信息识别过滤处理
- 内网准入系统
  - 采用TypeScript+ES6/7+React开发
  - 基本多层级树形结构的黑名单/白名单控制组件

### 51信用卡 - 实习(2017.6-2017.11)
金融产品组

- 开发维护产品51零用钱,h5端以及微信端,日活跃用户为20w+
- 微信端活动--黄金金挖矿工,吸粉2.5w+,活动期间日活跃用户1000+。
- 性能优化以及体验优化的开发。首屏优化，70%的用户1.5s内进入。
- 基于Vue的下拉刷新和图片懒加载组件开发

## 项目

### 实时聊天项目(webchat)
\`Vue2.0\` \`Websocket\` \`Node.JS\` \`MongoDB\`

Github地址：[https://github.com/hua1995116/webchat](https://github.com/hua1995116/webchat)（聊天室移动端，注册用户超过7000+，star将近1k）
  
负责前端构建,服务器架构,后端开发
  
- 经历过3次重构，注重性能优化与体验,在2.0版本，打开首页速度提高1倍。
- 采用了ES6/ES7的语法，采用axios请求统一处理
- 基于localStorage的缓存组件开发，可以设置有效时长，适用于Webapp
- 开发Loading，Alert，Confirm等组件
- 拥有日志系统以及消息的RSA算法加密
- 基于redis的请求监控，过滤恶意请求


## 技能
### Web基础

- 熟练掌握HTML5/CSS3,响应式布局和移动端开发
- 了解ES6/ES7,Webpack
- 有Antd Design,Element UI,Muse UI搭建项目经验
- 了解Hybrid开发以及Electron桌面开发,liunx服务器搭建经验,Nginx配置
- Mac开发用户，熟悉Git进行团队协作，对PS有一定基础

### 前端框架
- Vue开发过大型的应用,了解Vue原理与技术栈
- React以及React相关技术栈
### 后端相关
- 开发Node监控平台中间件
- 了解常用的Node模块
- 小型Node框架的搭建

### 数据库
- MongoDB
- Redis

`;

export const TUTORIALS_GUIDE = `
## 1.标题层级该怎么写？

木及简历可以写出很多漂亮的主题简历，但是同时我们也 Markdown 扩展了一些额外的解析规则，因此也会对写法有一定的规范。

建议在写简历过程中，使用**一级标题**来写在开头，常用来描述整体的主旨与标题，常用的就是，求职者的姓名 + 求职岗位的模式

例如: 

\\# 秋风 - 前端工程师

这样不仅能能让面试官一眼就看到你这份简历的用途，因为在实际过程中，有很多同学没有很好地注明投递的方向，很容易造成投递方向错误。

在写内容过程中，建议使用**二级标题**来写。

例如: 

\\## 教育背景 

\\## 工作经验

\\## 项目经验

\\## 基础技能

![1615716349000](https://s3.qiufeng.blue/blog/1615716349000.jpg)



## 2.如何写左右结构？
由于在 Markdown 中直接写左右结构比较困难，因此我们扩展了 Markdown 的基础语法。这个抒写语法，对于 Markdown 重度使用者也不是什么高级的语法， VuePress、React官网等各大社区网站中都有用到。

示例:

![WechatIMG30782](https://s3.qiufeng.blue/blog/WechatIMG30782.png)


## 3.换主题颜色？

在部分模板中，你可以通过更换自己所喜欢的主题色。

点击预览的右上方按钮，可以进行更换主题色景。

![1615716042526](https://s3.qiufeng.blue/blog/1615716042526.jpg)

注意，只有标记可换色的模板才可以进行更换主题色。

![1615716378016](https://s3.qiufeng.blue/blog/1615716378016.jpg)


## 4.遇到生成失败问题

建议重新点击导出 pdf，如果遇到 5 次以上可不使用，建议咨询客服。

## 5.客服咨询

你在使用中有任何问题，可以添加技术客服微信（qiufengblue）进行咨询，技术客服会拉你进入讨论群，讨论群中包含且不限于，本项目的未来发展、问题解答以及功能更新。


`;

export const UPDATE_CONTENT = `
由于产品正在建设初期，希望广大网友能够多多提供一些建议，你们的建议使我们前进的动力。
<img src="https://s3.qiufeng.blue/blog/1618197167151.jpg" style="width:200px" />

## 2021.04.17
- 增加简历模板中心
- 更新 logo
- 优化首页排版方式
- 优化编辑模式预览模式的切换
- 增加历史记录

## 2021.03.28
- 修复因center标签引起的渲染位置错误
- 修改了list列表的拆分方式
- 修复了引插入图片引起导出不一致情况
- 修复渐变主题下的导出不一致情况

## 2021.03.22
- 修复 tag 的间距问题
- 增加预览功能，预览可查看导出后的排版样式

## 2021.03.20
- 修复导出pdf后，在mac下复制错乱问题
- 增加固定A4大小预览
- 增加内置渲染插件
- 增加更新提示
- 增加一页纸导出模式

## 2021.03.16
- 优化主题的间距样式
- 导出后的增加边距

## 2021.03.15 
- 支持多套模板切换主题
- 支持快捷icon输入
- 支持导出pdf
- 支持 markdown 导入/导出
- 加入使用教程说明

`;
