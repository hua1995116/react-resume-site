import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, message } from 'antd';
import "./index.less";
import { getTheme } from '@utils/changeThemes';
import { markdownParserResume, downloadDirect } from '@utils/helper';
import { PdfParams, getPdf } from '@src/service/htmlToPdf';

// to get pdf url
const themes = [{
  id: 'default',
  defaultColor: '#39393a',
  name: '默认'
}, {
  id: 'blue',
  defaultColor: '#5974D4',
  name: '极简蓝'
}, {
  id: 'orange',
  defaultColor: '#39393a',
  name: '朝阳黄'
}, {
  id: 'pupple',
  defaultColor: '#36448f',
  name: '科技紫'
}]

const HeaderBar = () => {
  const [template, setTemplate] = useState('default');
  const menu = (
    <Menu>
      {
        themes.map(item => {
          return (
            <Menu.Item key={item.id}>
              <a rel="noopener noreferrer" onClick={async (e) => {
                e.preventDefault()
                if (template !== item.id) {
                  setTemplate(item.id);
                  await getTheme(item.id);
                  document.body.style.setProperty('--bg', item.defaultColor);
                }
              }}>
                {item.name}
              </a>
            </Menu.Item>
          )
        })
      }
    </Menu>
  )

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

  const filesMenu = (
    <Menu>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={async (e) => {
          e.preventDefault()
        }}>
          导入md
        </a>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={async (e) => {
          e.preventDefault()
        }}>
          导出md
        </a>
      </Menu.Item>
    </Menu>
  )

  const exportPdf = async () => {
    const content = localStorage.getItem('md-resume');
    if (content) {
      const htmlContent = markdownParserResume.render(content).replace(/(\n|\r)/g, '');
      const theme = template;
      const themeColor = getComputedStyle(document.body).getPropertyValue("--bg");
      let hide;
      try {
        hide = message.loading('正在为你生成简历...', 0);
        let data = await getPdf({
          htmlContent,
          theme,
          themeColor
        })
        downloadDirect(data.url, '木及简历.pdf');
        hide();
      } catch (e) {
        hide && hide();
        message.error('生成简历出错，请稍再试!')
      }
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
        <Dropdown overlay={filesMenu} trigger={['click']}> 
          <a className="ant-dropdown-link rs-link" onClick={e => e.preventDefault()}>
            文件
          </a>
        </Dropdown>
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
