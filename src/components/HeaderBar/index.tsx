import React, { useState, useEffect } from 'react';
import { Menu, Dropdown } from 'antd';
import "./index.less";
import { getTheme } from '@utils/changeThemes';
import { markdownParserResume } from '@utils/helper';

const HeaderBar = () => {
  const [template, setTemplate] = useState('default');
  const menu = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={async (e) => {
          e.preventDefault()
          if (template !== 'default') {
            setTemplate('default');
            await getTheme('default');
            document.body.style.setProperty('--bg', '#39393a');
          }
        }}>
          默认
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={async (e) => {
          e.preventDefault()
          if (template !== 'blue') {
            setTemplate('blue');
            await getTheme('blue');
            document.body.style.setProperty('--bg', '#5974D4');
          }
        }}>
          极简蓝
        </a>
      </Menu.Item>
    </Menu>
  );

  const feedbackMenu = (
    <Menu>
      <Menu.Item>
        <div className="rs-feed-group">
          <div className="rs-feed-group__wechat">
            <div className="rs-feed-group__text">微信群</div>
            <div className="bg"></div>
          </div>
          <div className="rs-feed-group__qq">
            <div className="rs-feed-group__text">qq群(699817990)</div>
            <div className="bg"></div>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  )

  const exportPdf = () => {
    const content = localStorage.getItem('md-resume');
    if (content) {
      const body = markdownParserResume.render(content);
      const styles = document.getElementById('rs-themes-data');
      const backgroundColor = getComputedStyle(document.body).getPropertyValue("--bg");
    }
  }

  useEffect(() => {
    getTheme('default');
  }, []);
  return (
    <div className="rs-header-bar rs-link">
      <div className="rs-header-bar__left">
        <a className="rs-logo rs-link">
          ✍️ 木及简历
        </a>
        <a href="#" className="rs-link">
          文件
        </a>
        <Dropdown overlay={menu} trigger={['click']}> 
          <a className="ant-dropdown-link rs-link" onClick={e => e.preventDefault()}>
            选择模板
          </a>
        </Dropdown>
        <a href="#" className="rs-link" onClick={ exportPdf }>
          导出 pdf
        </a>
      </div>
      <div className="rs-header-bar__right">
        {/* <a className="rs-link">
          交流与反馈
        </a> */}
        <Dropdown overlay={feedbackMenu}> 
          <a className="ant-dropdown-link rs-link" onClick={e => e.preventDefault()}>
            交流与反馈
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

export default HeaderBar;
