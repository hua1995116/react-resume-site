import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  Dropdown,
  message,
  Modal,
  Form,
  Switch,
  Input,
  FormInstance,
  Tag
} from "antd";

import "./index.less";
import { getTheme } from "@utils/changeThemes";
import { markdownParserResume, downloadDirect, downloadFetch, markdownParserArticle } from "@utils/helper";
import { getPdf } from "@src/service/htmlToPdf";
import { useStores } from "@src/store";
import { mdEditorRef } from "@src/utils/global";
import svgMap from "@src/utils/svgMap";
import { TUTORIALS_GUIDE } from '@src/utils/const';

const themes = [
  {
    id: "default",
    defaultColor: "#39393a",
    name: "默认（秋风同款）",
    src: "https://s3.qiufengh.com/muji/WechatIMG2702.png",
    isColor: true,
  },
  {
    id: "blue",
    defaultColor: "#5974D4",
    name: "极简色",
    src: "https://s3.qiufengh.com/muji/WechatIMG2703.png",
    isColor: true,
  },
  {
    id: "orange",
    defaultColor: "#39393a",
    name: "朝阳黄",
    src: "https://s3.qiufengh.com/muji/WechatIMG2704.png",
    isColor: false,
  },
  {
    id: "pupple",
    defaultColor: "#36448f",
    name: "全彩风",
    src: "https://s3.qiufengh.com/muji/WechatIMG2705.jpg",
    isColor: false,
  },
];

const HeaderBar = () => {
  const { templateStore } = useStores();
  const [template, setTemplate] = useState("default");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExportVisible, setIsExportVisible] = useState(false);
  const [isUsageVisible, setIsUsageVisible] = useState(true); 
  const formRef = useRef<FormInstance>(null);

  const handleOk = async () => {
    await getTheme(template);
    themes.map((item) => {
      if (template === item.id) {
        templateStore.setColor(item.defaultColor);
        document.body.style.setProperty("--bg", item.defaultColor);
      }
    });
    setIsModalVisible(false);
  };

  const uploadMdFile = (e: any) => {
    let resultFile = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(resultFile);
    reader.onload = (e) => {
      if (e.target?.result) {
          mdEditorRef && (mdEditorRef.setValue(e.target.result));
      }
    };
  };

  const exportMdFile = () => {
    const file = new Blob([templateStore.mdContent]);
    const url = URL.createObjectURL(file);
    downloadDirect(url, "木及简历.md");
  };

  const templateContent = (
    <div className="template-wrapper">
      {themes.map((item) => {
        return (
          <div
            className={`template ${item.id === template ? "active" : ""}`}
            key={item.id}
            onClick={(e) => {
              e.preventDefault();
              if (template !== item.id) {
                setTemplate(item.id);
              }
            }}
          >
            <img className="template-img" src={item.src}></img>
            <p className="template-title">{item.name}
              {item.isColor && <Tag color="#2db7f5">可换色</Tag>}
            </p>
          </div>
        );
      })}
    </div>
  );

  const feedbackMenu = (
    <Menu>
      <Menu.Item>
        <div className="rs-feed-group">
          <div className="rs-feed-group__wechat">
            <div className="rs-feed-group__text">微信群(wx号: qiufengblue)</div>
            <div className="bg"></div>
          </div>
          <div className="rs-feed-group__qq">
            <div className="rs-feed-group__text">qq群(699817990)</div>
            <div className="bg"></div>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  const filesMenu = (
    <Menu>
      <Menu.Item>
        <label htmlFor="uploadMdFile">
          <a rel="noopener noreferrer">导入md</a>
          <input
            type="file"
            id="uploadMdFile"
            accept=".md"
            className="uploadMd"
            onChange={uploadMdFile}
          ></input>
        </label>
      </Menu.Item>
      <Menu.Item>
        <a rel="noopener noreferrer" onClick={exportMdFile}>
          导出md
        </a>
      </Menu.Item>
    </Menu>
  );

  const handleExport = () => {
    formRef.current?.submit();
    setIsExportVisible(false);
  };

  const exportPdf = async ({
    name,
    isMark,
  }: {
    name: string;
    isMark: boolean;
  }) => {
    const content = localStorage.getItem("md-resume");
    if (content) {
      const htmlContent = markdownParserResume
        .render(content)
        .replace(/(\n|\r)/g, "");
      const theme = template;
      const themeColor = getComputedStyle(document.body).getPropertyValue(
        "--bg"
      );
      let hide;
      try {
        hide = message.loading("正在为你生成简历...", 0);
        let data = await getPdf({
          htmlContent,
          theme,
          themeColor,
          isMark,
        });
        await downloadFetch(data.url, `${name}.pdf` || "木及简历.pdf");
        hide();
        message.success("恭喜你，导出成功!")
      } catch (e) {
        hide && hide();
        message.error("生成简历出错，请稍再试!");
      }
    }
  };

  useEffect(() => {
    getTheme("default");
  }, []);
  return (
    <div className="rs-header-bar rs-link">
      <div className="rs-header-bar__left">
        <a className="rs-logo rs-link">✍️ 木及简历</a>
        <Dropdown overlay={filesMenu} trigger={["click"]}>
          <a
            className="ant-dropdown-link rs-link"
            onClick={(e) => e.preventDefault()}
          >
            文件
          </a>
        </Dropdown>
        <a className="ant-dropdown-link rs-link" onClick={() => {
          setIsModalVisible(true);
        }}>
          选择模板
        </a>
        <a
          href="#"
          className="rs-link"
          onClick={() => {
            setIsExportVisible(true);
          }}
        >
          导出 pdf
        </a>
        <a className="ant-dropdown-link rs-link" onClick={() => {}}>
          使用教程
        </a>
      </div>
      <div className="rs-header-bar__right">
        <a className="ant-dropdown-link rs-link" href="https://github.com/hua1995116/react-resume-site" target="_blank" dangerouslySetInnerHTML={{
          __html: svgMap['github']
        }}>
        </a>
        <Dropdown overlay={feedbackMenu}>
          <a
            className="ant-dropdown-link rs-link"
            onClick={(e) => e.preventDefault()}
          >
            交流与反馈
          </a>
        </Dropdown>
      </div>
      <Modal
        title="请选择模板"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        cancelText="取消"
        okText="确定"
        width={1100}
      >
        {templateContent}
      </Modal>
      <Modal
        title="使用教程"
        visible={isUsageVisible}
        width={700}
        onCancel={() => {
          setIsUsageVisible(false);
        }}
      >
        <div className="rs-article-container" dangerouslySetInnerHTML={{
          __html: markdownParserArticle.render(TUTORIALS_GUIDE)
        }}></div>
      </Modal>
      {isExportVisible && (
        <Modal
          title="导出确认"
          visible={isExportVisible}
          onOk={handleExport}
          onCancel={() => {
            setIsExportVisible(false);
          }}
          cancelText="取消"
          okText="确认"
        >
          <Form
            ref={formRef}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{
              isMark: true,
            }}
            onFinish={(values: any) => {
              exportPdf(values);
            }}
          >
            <Form.Item name="name" label="简历名称">
              <Input placeholder="不填则系统命名" />
            </Form.Item>
            <Form.Item name="isMark" label="是否页尾" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default HeaderBar;
