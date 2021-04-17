import React from 'react';
import htmlParser from 'rs-md-html-parser';
import { message, Switch } from "antd";
import { useStores } from "@src/store";
import { setHtmlView } from "@src/utils/global";
import { observer } from "mobx-react";
import "./index.less";

const Preview = observer(() => {
  const { templateStore } = useStores();
  const { isPreview, color, setPreview } = templateStore;
  const handlePreview = () => {
    const rsViewer = document.querySelector(".rs-view") as HTMLElement;
    if (!templateStore.isPreview) {
      message.success('打开预览模式');
      htmlParser(rsViewer);
    } else {
      message.success('关闭预览模式');
      // 重新宣传的逻辑
      // templateStore.setHtml(setHtmlView(templateStore.color));
      rsViewer.innerHTML = setHtmlView(color);
      rsViewer.style.height = 'auto';
    }
    setPreview(!isPreview)
  }
  return (
    <div onClick={handlePreview} className="rs-preview">
      <span>{ isPreview ? "预览模式" : "编辑模式" }</span>
      <Switch size="small" checked={isPreview}/>
    </div>
  )
});

export default Preview;
