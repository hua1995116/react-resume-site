import React, { useState, useEffect, useRef, useCallback } from "react";
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
import htmlParser from 'rs-md-html-parser';
import "./index.less";
import { getTheme } from "@utils/changeThemes";
import { downloadDirect, downloadFetch, markdownParserArticle } from "@utils/helper";
import { getPdf } from "@src/service/htmlToPdf";
import { useStores } from "@src/store";
import { mdEditorRef, globalEditorCount, updateTempalte, renderViewStyle } from "@src/utils/global";
import { TUTORIALS_GUIDE, LOCAL_STORE, UPDATE_CONTENT, UPDATE_LOG_VERSION } from '@src/utils/const';
import { observer } from "mobx-react";
import { themes } from '@utils/const';
import Shortcuts from "@src/components/Shortcuts";
import History from "@src/components/History";

const is_update = +(localStorage.getItem(LOCAL_STORE.MD_UPDATE_LOG) || 0) >= UPDATE_LOG_VERSION ? false : true;

const HeaderBar = observer(() => {
  const { templateStore } = useStores();
  const { setTempTheme , tempTheme, theme, color, setColor, setTheme, setPreview, mdContent, isPreview } = templateStore;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExportVisible, setIsExportVisible] = useState(false);
  const [isUsageVisible, setIsUsageVisible] = useState(false);
  const [isUpdateVisible, setIsUpdateVisible] = useState(is_update);

  const formRef = useRef<FormInstance>(null);

  const handleOk = async () => {
    // 更新模板
    await updateTempalte(tempTheme, color, setColor);
    // 设置模板
    setTheme(tempTheme);
    // 关闭弹窗
    setIsModalVisible(false);
  };

  const uploadMdFile = useCallback((e: any) => {
    let resultFile = e.target.files[0];
    var reader = new FileReader();
    reader.readAsText(resultFile);
    reader.onload = (e) => {
      if (e.target?.result) {
        mdEditorRef && (mdEditorRef.setValue(e.target.result));
        setPreview(false);
        renderViewStyle(color);
      }
    };
  }, []);

  const exportMdFile = useCallback(() => {
    const file = new Blob([mdContent]);
    const url = URL.createObjectURL(file);
    downloadDirect(url, "木及简历.md");
  }, [mdContent]);

  const templateContent = (
    <div className="template-wrapper">
      {themes.map((item) => {
        return (
          <div
            className={`template ${item.id === tempTheme ? "active" : ""}`}
            key={item.id}
            onClick={(e) => {
              e.preventDefault();
              setTempTheme(item.id);
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
    isOnePage,
    isMark,
  }: {
    name: string;
    isOnePage: boolean;
    isMark: boolean;
  }) => {
    // 设置渲染
    const rsViewer = document.querySelector(".rs-view") as HTMLElement;
    if (!isPreview) {
      setPreview(true);
      htmlParser(rsViewer);
    }
    const pages = rsViewer.dataset.pages || '1';
    const rsLine = document.querySelectorAll('.rs-line-split');
    rsLine.forEach(item => item.parentNode?.removeChild(item));
    const content = localStorage.getItem(LOCAL_STORE.MD_RESUME);

    if (content) {
      const htmlContent = document.querySelector('.rs-view-inner')?.innerHTML.replace(/(\n|\r)/g, "");
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
          htmlContent: String(htmlContent),
          theme,
          themeColor,
          isMark,
          isOnePage,
          pages
        });
        await downloadFetch(data.url, name ? `${name}.pdf` : "木及简历.pdf");
        hide();
        message.success("恭喜你，导出成功!")
      } catch (e) {
        hide();
        message.error("生成简历出错，请稍再试!");
      }
      setPreview(false);
      renderViewStyle(color);
    }
  };

  useEffect(() => {
    getTheme(theme);
  }, []);
  return (
    <div className="rs-header-bar rs-link">
      <div className="rs-header-bar__left">
        {/* <a className="rs-logo rs-link">
          <img src="https://s3.qiufeng.blue/muji/muji-logo.jpg" alt=""/>
          木及简历
        </a> */}
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
        <Shortcuts></Shortcuts>
        <History></History>
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
      <Modal
        title="请选择模板"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setTempTheme(theme);
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
        cancelText="取消"
        okText="确定"
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
      {<Modal
        title="更新日志"
        visible={isUpdateVisible}
        cancelText="取消"
        okText="确定"
        width={700}
        onOk={() => {
          localStorage.setItem(LOCAL_STORE.MD_UPDATE_LOG, `${UPDATE_LOG_VERSION}`);
          setIsUpdateVisible(false);
        }}
        onCancel={() => {
          localStorage.setItem(LOCAL_STORE.MD_UPDATE_LOG, `${UPDATE_LOG_VERSION}`);
          setIsUpdateVisible(false);
        }}
      >
        <div className="rs-article-container" dangerouslySetInnerHTML={{
          __html: markdownParserArticle.render(UPDATE_CONTENT)
        }}></div>
      </Modal>}
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
            labelCol={{ span: 6 }}
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
            <Form.Item name="isOnePage" label="是否一页纸" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
});

export default HeaderBar;
