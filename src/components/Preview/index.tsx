import React from 'react';
import htmlParser from 'rs-md-html-parser';
import { message } from "antd";
import { useStores } from "@src/store";
import { setHtmlView } from "@src/utils/global";
import { observer } from "mobx-react";
import "./index.less";

const Preview = observer(() => {
  const { templateStore } = useStores();
  const handlePreview = () => {
    const rsViewer = document.querySelector(".rs-view") as HTMLElement;
    if (!templateStore.isPreview) {
      message.success('打开预览模式');
      htmlParser(rsViewer);
    } else {
      message.success('关闭预览模式');
      // 重新宣传的逻辑
      // templateStore.setHtml(setHtmlView(templateStore.color));
      console.log(setHtmlView(templateStore.color));
      rsViewer.innerHTML = setHtmlView(templateStore.color);
    }
    templateStore.setPreview(!templateStore.isPreview)
  }
  return (
    <div onClick={handlePreview} className="rs-preview" style={{backgroundColor: templateStore.isPreview ? '#fdcece' : '#fff'}}>
      预览
    </div>
  )
});

export default Preview;
