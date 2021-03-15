import React, { useState } from 'react';
import { Modal, Tooltip } from 'antd';
import { markdownParserResume } from "@utils/helper";
import "./index.less";

const createLine = (className: string, top: string) => {
  const line = document.createElement('div');
  line.className = className;
  line.style.top = top;
  return line;
}

let previewList: HTMLElement[] = [];
// 可能需要加锁

const Preview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [html, setHtml] = useState('');

  const handlePreview = () => {
    setIsVisible(true);
    const md = localStorage.getItem('md-resume') || '';
    setHtml(markdownParserResume.render(md));
    setTimeout(() => {
      const previewDom = document.getElementById('rs-preview');
      const height = previewDom?.offsetHeight || 0;
      const firstLeft = height - (1122 - 36 - 2);
      if (firstLeft > 0) {
        const line = createLine('rs-preview-line', `${1122 - 36 - 2}px`);
        previewDom?.appendChild(line);
        previewList.push(line);
        const count = firstLeft / (1122 - 36 * 2 - 2);
        for (let i = 0; i < count; i++) {
          const line = createLine('rs-preview-line', `${1122 - 36 - 2 + 1048 * i}px`);
          previewDom?.appendChild(line);
          previewList.push(line);
        }
      }
    }, 500);
  }

  const cancelPreview = () => {
    setIsVisible(false);
    previewList.forEach(item => {
      item.parentNode?.removeChild(item);
    });
    previewList = [];
  }

  return (
    <>
      <Tooltip title="pdf 预览">
        <div className="rs-pdf-preview" onClick={handlePreview}>
          <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-preview" />
          </svg>
        </div>
      </Tooltip>
      { isVisible && <Modal
        title="pdf 预览"
        visible={isVisible}
        onOk={cancelPreview}
        onCancel={cancelPreview}
        bodyStyle={{
          padding: 0
        }}
        cancelText="取消"
        okText="确定"
        width={794}
      >
        <div id="rs-preview" className="rs-view" dangerouslySetInnerHTML={{
          __html: html
        }}>
        </div>
      </Modal>}
    </>
  )
}

export default Preview;
