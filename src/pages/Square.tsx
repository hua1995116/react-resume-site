import React, { useState, useCallback, useEffect } from "react";
import { Modal, Tag, Popconfirm } from "antd";
import dayjs from 'dayjs';
import { downloadDirect } from "@utils/helper";
import { mdEditorRef, renderViewStyle } from "@src/utils/global";
import { useStores } from "@src/store";
import { LOCAL_STORE, themes } from '@src/utils/const';
import { getTheme } from "@utils/changeThemes";
import "./Square.less";
import axios from 'axios';

export interface TemplateItem {
  id: number;
  title: string;
  thumbnail: string;
  template: string;
  author: string;
  avatar: string;
  themeColor: string;
  theme: string;
  collect: number;
  updateTime: number;
}

// const list = []

const Square = () => {
  const { globalStore: { setCurTab }} = useStores();
  const [list, setList] = useState<TemplateItem[]>([]);
  const { templateStore } = useStores();
  const { setColor, setMdContent, setTheme } = templateStore;
  const [template, setTemplate] = useState<TemplateItem | null>(null);

  const handleCancel = useCallback(() => {
    setTemplate(null);
  }, []);

  const handleUse = useCallback(() => {

    if (template) {
      const { theme, themeColor, template : md } = template;
      // 设置主题
      setTheme(theme);
      localStorage.setItem(LOCAL_STORE.MD_THEME, theme);
      // 设置颜色 
      setColor(themeColor);
      localStorage.setItem(LOCAL_STORE.MD_COLOR, themeColor);
      // 设置内容
      setMdContent(md)
      // 持久化设置
      localStorage.setItem(LOCAL_STORE.MD_RESUME, md);
      // 跳转
      window.location.href = '#/';
      setCurTab('#/')
      // 临时设置
      setTimeout(async () => {
        // 设置编辑器内容
        mdEditorRef && (mdEditorRef.setValue(md));
        // 拉取主题
        await getTheme(theme);
        document.body.style.setProperty("--bg", themeColor);
        // 设置 html 渲染
        renderViewStyle(themeColor)
      }, 300);
    }
    
  }, [template, setColor]);

  useEffect(() => {
    const queryTemplate = async () => {
      const result = await axios.get('/data/template.json');
      const resultList = result.data.map((item: any) => ({...item, themeColor: themes.find(theme => item.theme === theme.id)?.defaultColor})) as TemplateItem[];
      setList(resultList);
    }
    queryTemplate();
  }, [])

  return (
    <div className="rs-square-container">
      {list.map((item) => {
        return (
          <div className="rs-square" key={item.id}>
            <div className="rs-square-bg"></div>
            <div
              className="rs-square-btn"
              onClick={() => {
                setTemplate(item);
              }}
            >
              查看模板
            </div>
            <img src={item.thumbnail} alt="" />
            <div className="rs-userInfo">
              <span>{item.title}</span>
            </div>
          </div>
        );
      })}
      {template && (
        <Modal
          bodyStyle={{
            backgroundColor: '#fafafb'
          }}
          title={template.title}
          visible={!!template}
          width={700}
          onCancel={handleCancel}
          footer={
            <div className="square-footer">
              <span className="btn btn-normal mr20" onClick={() => {
                const file = new Blob([template.template]);
                const url = URL.createObjectURL(file);
                downloadDirect(url, `${template.title}.md`);
              }}>下载md</span>
              <Popconfirm
                title="确定使用此模板替换你当前编辑器中的内容吗?"
                onConfirm={handleUse}
                okText="决定了"
                cancelText="再想想"
              >
                <span className="btn btn-normal mr20">使用模板</span>
              </Popconfirm>
            </div>
          }
        >
          <div className="square-modal">
            <div className="square-modal-left">
              <img src={template.thumbnail} alt=""/>
            </div>
            <div className="square-modal-right">
              <div className="top-info">
                <a href="">
                  <img src={template.avatar} alt=""/>
                </a>
                <div className="top-info-content">
                  <span className="info-text">作者: 秋风</span>
                  <span className="info-text">更新日期: {dayjs(template.updateTime).format('YYYY-MM-DD')}</span>
                </div>
              </div>
              <div className="top-list">
                <span className="info-text">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-shoucang1" />
                  </svg>
                  <span className="text">收藏</span>
                  <span className="value">{template.collect}+</span>
                </span>
                <span className="info-text">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-jingzi" />
                  </svg>
                  <span className="text">主题</span>
                  <span className="value">{template.theme}</span>
                </span>
                <span className="info-text">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-color" />
                  </svg>
                  <span className="text">主题色</span>
                  <span className="value"><Tag color={template.themeColor}>{template.themeColor}</Tag></span>
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Square;
