export const INIT_COLOR = '#39393a';

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

[icon:github https://github.com/hua1995116]()

[icon:juejin 掘金](https://juejin.cn/user/923245497557111) 

[icon:email qiufenghyf@163.com](mailto:qiufenghyf@163.com)

icon:phone 178****8380

:::

## 介绍

于2015年开始接触前端，喜欢编码，有Geek精神，对代码有洁癖，喜欢接触前沿技术，爱折腾。

获得省、国家级竞赛奖项9项，(包含浙江省大学生多媒体竞赛一等奖1项)。
  
主持参与省、国家级项目4项；发表论文4篇，其中2篇EI索引。

## 工作

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

在线地址：[https://www.qiufengh.com/](https://www.qiufengh.com/)（聊天室移动端，注册用户超过7000+，star将近1k）
  
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
