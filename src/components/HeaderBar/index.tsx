import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, message, Modal } from 'antd';

import "./index.less";
import { getTheme } from '@utils/changeThemes';
import { markdownParserResume, downloadDirect } from '@utils/helper';
import { PdfParams, getPdf } from '@src/service/htmlToPdf';

// to get pdf url
const themes = [{
  id: 'default',
  defaultColor: '#39393a',
  name: '默认（秋风同款）',
  src:'https://s3.qiufengh.com/muji/WechatIMG2702.png'
}, {
  id: 'blue',
  defaultColor: '#5974D4',
  name: '极简色',
  src:'https://s3.qiufengh.com/muji/WechatIMG2703.png'
}, {
  id: 'orange',
  defaultColor: '#39393a',
  name: '朝阳黄',
  src:'https://s3.qiufengh.com/muji/WechatIMG2704.png'
},{
  id: 'pupple',
  defaultColor: '#36448f',
  name: '全彩风',
  src:'https://s3.qiufengh.com/muji/WechatIMG2705.jpg'
},]
const HeaderBar = () => {
  const [template, setTemplate] = useState('default');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async() => {
    await getTheme(template);
    themes.map(item => {
      if(template === item.id) {
        document.body.style.setProperty('--bg', item.defaultColor);
      }
    })
    setIsModalVisible(false);
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const templateContent = (
    <div className="template-wrapper">
      {
        themes.map(item => {
          return (
            <div className={`template ${item.id === template? 'active': ''}`}  key={item.id} onClick={(e) => {
              e.preventDefault()
              if (template !== item.id) {
                setTemplate(item.id);
              }
            }}>
              <img className="template-img" src={item.src}></img>
              <p className="template-title">{item.name}</p>
            </div>
          )
        })
      }
    </div>
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
          <a className="ant-dropdown-link rs-link" onClick={showModal}>
            选择模板
          </a>
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
      <Modal title="请选择模板" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} cancelText="取消" okText="确定" width={1100}>
        {templateContent}
      </Modal>
    </div>
  )
}

export default HeaderBar;
