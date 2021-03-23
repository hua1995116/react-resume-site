import React, { useState } from "react";
import { message, Tooltip } from "antd";
import "./index.less";

const OnePage = () => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      title={open ? '关闭一页纸模式' : '开启一页纸模式'}
      placement="left">
      <div
        className="rs-onepage"
        onClick={() => {
          const inner = document.querySelector('.rs-view-inner') as HTMLElement;
          if (!open) {
            inner.style.overflow = 'hidden';
            inner.style.height = '1114px';
            message.success('打开一页纸模式');
          } else {
            inner.style.overflow = 'visible';
            inner.style.height = 'auto';
            message.success('关闭一页纸模式');
          }
          setOpen(!open);
        }}
      >
        单页模式
        {/* <svg
          className="icon"
          aria-hidden="true"
          style={{
            fill: open ? '#fff' : '#333'
          }}
        >
          <use xlinkHref="#icon-wendang1" />
        </svg> */}
      </div>
    </Tooltip>
  );
};

export default OnePage;
