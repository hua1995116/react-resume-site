import React from 'react';
import FeedBack from '../FeedBack';
import "./index.less";

const HeaderCommonBar = () => {
  return (
    <div className="rsC-header">
      <div className="rsC-header__logo">
        <h1>
          <a href="/">
            <img src="https://s3.qiufengh.com/muji/muji-logo-v2.jpg" alt="" />
            <span>木及简历</span>
          </a>
        </h1>
      </div>
      <div className="rsC-header__menu">
        <ul>
          <li className="nav-li current"><a href="#/square">模板中心</a></li>
          <li className="nav-li"><a href="#/">编辑器</a></li>
          <li className="nav-li">
            <FeedBack></FeedBack>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderCommonBar;
