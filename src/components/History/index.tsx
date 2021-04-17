import React, { useState } from 'react';
import { Modal, List, Tag, Popconfirm } from 'antd';
import { LOCAL_STORE } from '@src/utils/const';
import dayjs from 'dayjs';
import { HistoryLocalInfo } from '@src/utils/global';
import { mdEditorRef, renderViewStyle } from "@src/utils/global";
import { useStores } from "@src/store";
import { getTheme } from "@utils/changeThemes";
import "./index.less";


const History = () => {
  const localData = localStorage.getItem(LOCAL_STORE.MD_HISTORY);
  const data: HistoryLocalInfo[] = JSON.parse(localData || "[]").reverse() || [];
  const { templateStore } = useStores();
  const { setPreview, setTheme, setMdContent, setColor } = templateStore;
  const handleSelect = (md: string, theme: string, color: string) => {
    // 设置主题
    setTheme(theme);
    localStorage.setItem(LOCAL_STORE.MD_THEME, theme);
    // 设置颜色 
    setColor(color);
    localStorage.setItem(LOCAL_STORE.MD_COLOR, color);
    // 设置内容
    setMdContent(md)
    // 持久化设置
    localStorage.setItem(LOCAL_STORE.MD_RESUME, md);
    // 临时设置
    setTimeout(async () => {
      // 设置编辑器内容
      mdEditorRef && (mdEditorRef.setValue(md));
      // 拉取主题
      await getTheme(theme);
      document.body.style.setProperty("--bg", color);
      // 设置 html 渲染
      renderViewStyle(color)
    }, 300);

    setPreview(false);
  }
  const [ visible, setVisible ] = useState(false);
  return (
    <>
      <a
        className="ant-dropdown-link rs-link"
        onClick={(e) => {
          e.preventDefault();
          setVisible(true);
        }}
      >
        历史记录
      </a>
      <Modal
        title="历史记录"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
        width={1100}
        >
        <List
          className="history-list"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item
              actions={[
                <Popconfirm
                  title="确定使用此版本替换你当前编辑器中的内容吗?"
                  onConfirm={() => {
                    const { md, theme, color } = item;
                    handleSelect(md, theme, color);
                    setVisible(false);
                  }}
                  okText="决定了"
                  cancelText="再想想"
                >
                  <span className="btn btn-normal mr20">选择</span>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={""}
                title={dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')}
                description={item.md.slice(0, 800) + '...'}
              />
              <span className="hist">{ item.theme }</span>
              <Tag color={item.color}>{item.color}</Tag>
            </List.Item>
          )}
          ></List>
      </Modal>
    </>
  )
}

export default History;
