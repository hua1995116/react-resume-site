import React from "react";
import ShortInfo from "../components/ShortInfo/index";
import BlockInfo from "../components/BlockInfo/index";

interface Props {}

const Home: React.FC<Props> = (props) => {
  return (
    <div className="main">
      <div className="header">
        <ShortInfo></ShortInfo>
        <section></section>
      </div>
      <div className="container clear">
        <div className="con-left">
          <BlockInfo></BlockInfo>
          <br />
          <section className="con-work">
            <div className="con-head">
              <div className="con-title">
                <span className="con-title-l" />
                <h2 className="con-title-c">项目</h2>
                <span className="con-title-r" />
              </div>
            </div>
            <div className="con-item">
              <header className="item-title">
                <h3 className="item-name">
                  <a href="https://github.com/hua1995116/webchat">
                    实时聊天项目(webchat)
                  </a>
                </h3>
                {/* <span class="item-time">2017.11-至今</span> */}
                <a className="btn item-more">
                  Vue
                </a>
              </header>
              <div className="item-content">
                <p className="item-p">
                  在线地址：
                  <a href="https://www.qiufengh.com/">
                    https://www.qiufengh.com/
                  </a>
                  （聊天室移动端，注册用户超过7000+，star将近1k）
                </p>
                <p className="item-p">负责前端构建,服务器架构,后端开发</p>
                <ul className="item-ul">
                  <li className="item-li">
                    经历过3次重构，注重性能优化与体验,在2.0版本，打开首页速度提高1倍。
                  </li>
                  <li className="item-li">
                    采用了ES6/ES7的语法，采用axios请求统一处理
                  </li>
                  <li className="item-li">
                    基于localStorage的缓存组件开发，可以设置有效时长，适用于Webapp
                  </li>
                  <li className="item-li">开发Loading，Alert，Confirm等组件</li>
                  <li className="item-li">拥有日志系统以及消息的RSA算法加密</li>
                  <li className="item-li">基于redis的请求监控，过滤恶意请求</li>
                  {/* <li class="item-li">前端性能监控<a href="http://www.qiufengh.com/">http://www.qiufengh.com/</a></li> */}
                </ul>
              </div>
            </div>
          </section>
        </div>
        <div className="con-right">
          <div className="con-skill">
            <div className="con-head">
              <div className="con-title">
                <span className="con-title-l" />
                <h2 className="con-title-c">技能</h2>
                <span className="con-title-r" />
              </div>
            </div>
            <div className="con-item">
              <header className="item-title">
                <h3 className="item-name">Web基础</h3>
                {/* <span class="item-time">2017.11-至今</span> */}
                <a className="btn item-more">
                  熟练
                </a>
              </header>
              <div className="item-content">
                <ul className="item-ul">
                  <li className="item-li">
                    熟练掌握HTML5/CSS3,响应式布局和移动端开发
                  </li>
                  <li className="item-li">了解ES6/ES7,Webpack</li>
                  <li className="item-li">
                    有Antd Design,Element UI,Muse UI搭建项目经验
                  </li>
                  <li className="item-li">
                    了解Hybrid开发以及Electron桌面开发,liunx服务器搭建经验,Nginx配置
                  </li>
                  <li className="item-li">
                    Mac开发用户，熟悉Git进行团队协作，对PS有一定基础
                  </li>
                </ul>
              </div>
            </div>
            <div className="con-item">
              <header className="item-title">
                <h3 className="item-name">前端框架</h3>
                {/* <span class="item-time">2017.11-至今</span> */}
                <a className="btn item-more">熟练</a>
              </header>
              <div className="item-content">
                <ul className="item-ul">
                  <li className="item-li">
                    Vue开发过大型的应用,了解Vue原理与技术栈
                  </li>
                  <li className="item-li">React以及React相关技术栈</li>
                </ul>
              </div>
            </div>
            <div className="con-item">
              <header className="item-title">
                <h3 className="item-name">后端相关</h3>
                {/* <span class="item-time">2017.11-至今</span> */}
                <a className="btn item-more">熟练</a>
              </header>
              <div className="item-content">
                <ul className="item-ul">
                  <li className="item-li">开发Node监控平台中间件</li>
                  <li className="item-li">了解常用的Node模块</li>
                  <li className="item-li">小型Node框架的搭建</li>
                </ul>
              </div>
            </div>
            <div className="con-item">
              <header className="item-title">
                <h3 className="item-name">数据库</h3>
                {/* <span class="item-time">2017.11-至今</span> */}
                <a className="btn item-more">掌握</a>
              </header>
              <div className="item-content">
                <ul className="item-ul">
                  <li className="item-li">MongoDB</li>
                  <li className="item-li">Redis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
