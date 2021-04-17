import React from 'react';
import {
  Menu,
  Dropdown,
} from "antd";

const FeedBack = () => {
  const feedbackMenu = (
    <Menu>
      <Menu.Item>
        <div className="rs-feed-group">
          <div className="rs-feed-group__wechat">
            <div className="rs-feed-group__text">微信群(wx号: qiufengblue)</div>
            <div className="bg"></div>
          </div>
          <div className="rs-feed-group__qq">
            <div className="rs-feed-group__text">qq群(699817990)</div>
            <div className="bg"></div>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={feedbackMenu}>
      <a
        className="ant-dropdown-link rs-link"
        onClick={(e) => e.preventDefault()}
      >
        交流与反馈
      </a>
    </Dropdown>
  )
}

export default FeedBack;
