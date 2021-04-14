import React, { useState } from "react";
import { Modal, Tag } from "antd";
import "./Square.less";

export interface TemplateItem {
  title: string;
  thumbnail: string;
  template: string;
  author: string;
  avatar: string;
  themeColor: string;
  theme: string;
}

const list = [
  {
    title: "带证件照的简历模板",
    thumbnail: "https://s3.qiufengh.com/muji/1616691252491.jpg",
    template: ``,
    author: "秋风",
    avatar:
      "http://thirdwx.qlogo.cn/mmopen/AaXu8jcgbEIwqMs22mDMDFlgwdGAQJR9DbX4PDMmSVqOSoJ2aibQXibHy5U9DOcPUfSicrYIFfqEX7EKwxZjKrwfHay3HQDTHLl/132",
    themeColor: "#39393a",
    theme: "默认（秋风同款）",
  },
] as TemplateItem[];

const Square = () => {
  const [template, setTemplate] = useState<TemplateItem | null>(null);
  // const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setTemplate(null);
    // setIsModalVisible(false);
  };
  return (
    <div className="rs-square-container">
      {list.map((item) => {
        return (
          <div className="rs-square">
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
          onOk={handleOk}
          width={700}
          onCancel={handleCancel}
          footer={
            <div className="square-footer">
              <span className="btn btn-normal mr20">拷贝md</span>
              <span className="btn btn-normal mr20">使用模板</span>
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
                  <span className="info-text">更新日期: 2021-04-15</span>
                </div>
              </div>
              <div className="top-list">
                <span className="info-text">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-shoucang1" />
                  </svg>
                  <span className="text">收藏</span>
                  <span className="value">1</span>
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
                  <span className="value"><Tag color="#39393a">{template.themeColor}</Tag></span>
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
