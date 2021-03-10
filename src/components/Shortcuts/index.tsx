import React, { useState } from "react";
import { Modal, Button } from "antd";
import svgMap, { SvgType } from '@src/utils/svgMap';
import "./index.less";

const Shortcuts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title="图标快捷写法"
        visible={isModalVisible}
        onOk={handleOk}
        okText={"我知道了"}
        cancelText={"取消"}
        onCancel={handleCancel}
      >
        {
          (Object.keys(svgMap) as Array<SvgType>).map((item) => {
            return (
              <p key={item} className="rs-shortcuts-item">
                <span>icon:{item}</span> - 
                <span dangerouslySetInnerHTML={{
                  __html: svgMap[item]
                }}></span>
              </p>
            )
          })
        }
      </Modal>
      <div className="rs-shortcuts" onClick={() => {
        setIsModalVisible(true)
      }}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-ziyuank" />
        </svg>
      </div>
    </>
  );
};

export default Shortcuts;
