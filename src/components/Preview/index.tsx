import React from 'react';
import htmlParser from 'rs-md-html-parser';
import { message } from "antd";
import { useStores } from "@src/store";
import { setHtmlView } from "@src/utils/global";
import "./index.less";

const Preview = () => {
  const { templateStore } = useStores();
  const handlePreview = () => {
    if (!templateStore.isPreview) {
      message.success('打开预览模式');
      templateStore.setPreview(!templateStore.isPreview);
      const rsViewer = document.querySelector(".rs-view") as HTMLElement;
      htmlParser(rsViewer);
    } else {
      message.success('关闭预览模式');
      // 重新宣传的逻辑
      setHtmlView(templateStore.color);
    }
  }
  return (
    <div onClick={handlePreview} className="rs-preview">
      预览
    </div>
  )
}

export default Preview;
