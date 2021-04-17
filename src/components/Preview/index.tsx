import React from 'react';
import htmlParser from 'rs-md-html-parser';
import { message, Switch, Tooltip } from "antd";
import { useStores } from "@src/store";
import { setHtmlView } from "@src/utils/global";
import { observer } from "mobx-react";
import "./index.less";

const Preview = observer(() => {
  const { templateStore } = useStores();
  const { isPreview, color, setPreview } = templateStore;
  const handlePreview = () => {
    const rsViewer = document.querySelector(".rs-view") as HTMLElement;
    if (!isPreview) {
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
    <Tooltip title="预览模式为最终pdf打印的样子">
      <div onClick={handlePreview} className="rs-preview">
        <span>{ isPreview ? "预览模式" : "编辑模式" }</span>
        <Switch size="small" checked={isPreview} onChange={() => {
          setPreview(!isPreview);
        }}/>
      </div>
    </Tooltip>
  )
});

export default Preview;
