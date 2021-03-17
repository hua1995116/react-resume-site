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
import { mdEditorRef, globalEditorCount } from "@src/utils/global";
import svgMap from "@src/utils/svgMap";
import { TUTORIALS_GUIDE, LOCAL_STORE } from '@src/utils/const';

const themes = [
  {
    id: "default",
    defaultColor: "#39393a",
    name: "默认（秋风同款）",
    src: "https://s3.qiufengh.com/muji/WechatIMG2702.png",
    isColor: true,
    defaultUrl: 'https://s3.qiufengh.com/muji/template/template1.pdf',
  },
  {
    id: "blue",
    defaultColor: "#5974D4",
    name: "极简色",
    src: "https://s3.qiufengh.com/muji/WechatIMG2703.png",
    isColor: true,
    defaultUrl: 'https://s3.qiufengh.com/muji/template/template2.pdf',
  },
  {
    id: "orange",
    defaultColor: "#39393a",
    name: "朝阳黄",
    src: "https://s3.qiufengh.com/muji/WechatIMG2704.png",
    isColor: false,
    defaultUrl: 'https://s3.qiufengh.com/muji/template/template3.pdf',
  },
  // {
  //   id: "pupple",
  //   defaultColor: "#36448f",
  //   name: "全彩风",
  //   src: "https://s3.qiufengh.com/muji/WechatIMG2705.jpg",
  //   isColor: true,
  //   defaultUrl: 'https://s3.qiufengh.com/muji/template/template4.pdf',
  // },
];

const default_theme = localStorage.getItem(LOCAL_STORE.MD_THEME) || themes[0].id;

const HeaderBar = () => {
  const { templateStore } = useStores();
  const [template, setTemplate] = useState(default_theme);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExportVisible, setIsExportVisible] = useState(false);
  const [isUsageVisible, setIsUsageVisible] = useState(false); 
  const formRef = useRef<FormInstance>(null);

  const handleOk = async () => {
    await getTheme(template);
    themes.map((item) => {
      if (template === item.id) {
        templateStore.setColor(item.defaultColor);
        document.body.style.setProperty("--bg", item.defaultColor);
        localStorage.setItem(LOCAL_STORE.MD_COLOR, item.defaultColor);
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
                localStorage.setItem(LOCAL_STORE.MD_THEME, item.id);
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
    const content = localStorage.getItem(LOCAL_STORE.MD_RESUME);
    if (content) {
      const htmlContent = markdownParserResume
        .render(content)
        .replace(/(\n|\r)/g, "");
      const theme = template;
      let hide = message.loading("正在为你生成简历...", 0);
      if (globalEditorCount < 2) {
        try {
          hide();
          const curThemes = themes.filter(item => item.id === theme);
          await downloadFetch(curThemes[0].defaultUrl, name ? `${name}.pdf` : "木及简历.pdf");
        } catch (e) {
          hide();
        }
        return;
      }
      const themeColor = getComputedStyle(document.body).getPropertyValue(
        "--bg"
      );
      try {
        let data = await getPdf({
          htmlContent,
          theme,
          themeColor,
          isMark,
        });
        await downloadFetch(data.url, name ? `${name}.pdf` : "木及简历.pdf");
        hide();
        message.success("恭喜你，导出成功!")
      } catch (e) {
        hide();
        message.error("生成简历出错，请稍再试!");
      }
    }
  };

  useEffect(() => {
    getTheme(default_theme);
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
        <a className="ant-dropdown-link rs-link" onClick={() => {
          setIsUsageVisible(true);
        }}>
          使用教程
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
        onOk={() => {
          setIsUsageVisible(false);
        }}
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
              exportPdf({
                ...values,
                isMark: false
              });
            }}
          >
            <Form.Item name="name" label="简历名称">
              <Input placeholder="不填则系统命名" />
            </Form.Item>
            {/* <Form.Item name="isMark" label="是否页尾" valuePropName="checked">
              <Switch />
            </Form.Item> */}
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default HeaderBar;
