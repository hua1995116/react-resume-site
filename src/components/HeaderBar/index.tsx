import React, { useState, useEffect } from 'react';
import { Menu, Dropdown } from 'antd';
import "./index.less";
import { getTheme } from '@utils/changeThemes';

const HeaderBar = () => {
  const [template, setTemplate] = useState('default');
  const menu = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={(e) => {
          e.preventDefault()
          if (template !== 'default') {
            setTemplate('default');
            getTheme('default');
            document.body.style.setProperty('--bg', '#39393a');
          }
        }}>
          默认
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={(e) => {
          e.preventDefault()
          if (template !== 'blue') {
            setTemplate('blue');
            getTheme('blue');
            document.body.style.setProperty('--bg', '#5974D4');
          }
        }}>
          极简蓝
        </a>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    getTheme('default');
  }, []);
  return (
    <div className="rs-header-bar rs-link">
      <a className="rs-logo rs-link">
        ✍️ 木及简历
      </a>
      <a href="#" className="rs-link">
        文件
      </a>
      {/* <div className="rs-select-template"> */}
        <Dropdown overlay={menu} trigger={['click']}> 
          <a className="ant-dropdown-link rs-link" onClick={e => e.preventDefault()}>
            选择模板
          </a>
        </Dropdown>
      {/* </div> */}
    </div>
  )
}

export default HeaderBar;
