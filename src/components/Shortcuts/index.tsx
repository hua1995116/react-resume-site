import React, { useState } from "react";
import { Modal, message } from "antd";
import svgMap, { SvgType } from "@src/utils/svgMap";
import { copyText } from "@src/utils/helper";
import "./index.less";

const Shortcuts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCopy = (value: string) => {
    copyText(value, () => {
      message.success("复制成功，快去粘贴吧~");
    });
  };

  return (
    <>
      <Modal
        title="图标快捷写法(点击可快捷复制)"
        visible={isModalVisible}
        width={540}
        onOk={handleOk}
        okText={"我知道了"}
        cancelText={"取消"}
        onCancel={handleCancel}
      >
        {(Object.keys(svgMap) as Array<SvgType>).map((item) => {
          return (
            <div
              key={item}
              className="rs-shortcuts-item"
              onClick={() => {
                handleCopy(`icon:${item}`);
              }}
            >
              <p
                className="rs-shortcuts-item__icon"
                dangerouslySetInnerHTML={{
                  __html: svgMap[item],
                }}
              ></p>
              <p className="rs-shortcuts-item__text"> icon:{item}</p>
            </div>
          );
        })}
      </Modal>
      {/* <Tooltip title="icon快捷键">
        <div
          className="rs-shortcuts"
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-ziyuank" />
          </svg>
        </div>
      </Tooltip> */}
      <a
        className="ant-dropdown-link rs-link"
        onClick={(e) => {
          e.preventDefault();
          setIsModalVisible(true);
        }}
      >
        icon快捷键
      </a>
    </>
  );
};

export default Shortcuts;
