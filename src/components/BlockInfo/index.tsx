import React from "react";

interface Props {}

const ShortInfo: React.FC<Props> = (props) => {
  return (
    <>
      <section className="con-job">
        <div className="con-head">
          <div className="con-title">
            <span className="con-title-l" />
            <h2 className="con-title-c">介绍</h2>
            <span className="con-title-r" />
          </div>
        </div>
        <div className="con-item">
          <div className="item-content">
            <p className="item-p">
              于2015年开始接触前端，喜欢编码，有Geek精神，对代码有洁癖，喜欢接触前沿技术，爱折腾。
            </p>
            <p className="item-p">
              获得省、国家级竞赛奖项9项，(包含浙江省大学生多媒体竞赛一等奖1项)。
            </p>
            <p className="item-p">
              主持参与省、国家级项目4项；发表论文4篇，其中2篇EI索引。
            </p>
          </div>
        </div>
      </section>
      <section className="con-job">
        <div className="con-head">
          <div className="con-title">
            <span className="con-title-l" />
            <h2 className="con-title-c">经验</h2>
            <span className="con-title-r" />
          </div>
        </div>
        <br />
        <br />
        <div className="con-item">
          <header className="item-title">
            <h3 className="item-name">杭州兑吧网络有限公司 - 实习</h3>
            <span className="item-time">2018.3-2018.7</span>
            <a href="" className="btn item-more">
              工作
            </a>
          </header>
          <div className="item-content">
            <p className="item-p">前端架构组</p>
            <ul className="item-ul">
              <li className="item-li">
                前端错误监控系统(基建)(负责人) 接入量pv:3000w
                <ul className="item-ul">
                  <li className="item-li">
                    web端js-sdk开发,无侵入式接入,压缩后仅2kb。
                  </li>
                  <li className="item-li">收集端Node开发,分布式存储日志。</li>
                  <li className="item-li">
                    阿里云日志服务分析,以及常用的数据分析。
                  </li>
                  <li className="item-li">echart搭建可视化平台。</li>
                </ul>
              </li>
              <li className="item-li">
                前端性能监控系统(负责人) 接入pv: 1000w
                <ul className="item-ul">
                  <li className="item-li">
                    web端js-sdk开发,支持自定义上报以及自动上报,无侵入式。
                  </li>
                  <li className="item-li">
                    收集端Node开发,Elasticsearch集群存储日志。
                  </li>
                  <li className="item-li">
                    Elasticsearch的Node模块开发，封装按时间维度的查询聚合模块。
                  </li>
                  <li className="item-li">
                    可视化平台,利用redis缓存优化查询,淘汰算法共同协作。
                  </li>
                </ul>
              </li>
              <li className="item-li">
                落地页截图(Node项目)
                <ul className="item-ul">
                  <li className="item-li">利用puppeteer开发截图。</li>
                  <li className="item-li">
                    利用clustor多线程开发,速度从原来60分钟提高至8分钟，提高约7倍（300张截图）。
                  </li>
                  <li className="item-li">
                    开发自定义队列模式,避免Node端丢失请求。
                  </li>
                </ul>
              </li>
              <li className="item-li">
                webpack插件(webpack-plugin-inner-script)
                <a href="https://www.npmjs.com/package/webpack-plugin-inner-script">
                  地址
                </a>
                <ul className="item-ul">
                  <li className="item-li">自动将外链形式改写成内敛形式。</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="con-item">
          <header className="item-title">
            <h3 className="item-name">网易 - 实习</h3>
            <span className="item-time">2017.11-2018.3</span>
            <a className="btn item-more">工作</a>
          </header>
          <div className="item-content">
            <p className="item-p">信息技术部</p>
            <ul className="item-ul">
              <li className="item-li">
                前端监控系统
                <ul className="item-ul">
                  <li className="item-li">客户端监控载体端以及数据脚本开发</li>
                  <li className="item-li">
                    基于highcharts的可视化图形界面开发
                  </li>
                  <li className="item-li">
                    平台的性能统计模块以及告警模块开发
                  </li>
                  <li className="item-li">
                    高并发下的redis设计以及错误信息识别过滤处理
                  </li>
                </ul>
              </li>
              <li className="item-li">
                内网准入系统
                <ul className="item-ul">
                  <li className="item-li">采用TypeScript+ES6/7+React开发</li>
                  <li className="item-li">
                    基本多层级树形结构的黑名单/白名单控制组件
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="con-item">
          <header className="item-title">
            <h3 className="item-name">51信用卡 - 实习</h3>
            <span className="item-time">2017.6-2017.11</span>
            <a className="btn item-more">
              工作
            </a>
          </header>
          <div className="item-content">
            <p className="item-p">金融产品组</p>
            <ul className="item-ul">
              <li className="item-li">
                开发维护产品
                <a href="http://android.myapp.com/myapp/detail.htm?apkName=com.enniu.lingyongqian&ADTAG=mobile">
                  51零用钱
                </a>
                ,h5端以及微信端,日活跃用户为20w+
              </li>
              <li className="item-li">
                微信端活动--黄金金挖矿工,吸粉2.5w+,活动期间日活跃用户1000+。
              </li>
              <li className="item-li">
                性能优化以及体验优化的开发。首屏优化，70%的用户1.5s内进入。
              </li>
              <li className="item-li">基于Vue的下拉刷新和图片懒加载组件开发</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShortInfo;
